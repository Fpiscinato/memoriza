// Gera os ícones PNG do PWA (letra "M" sobre fundo arredondado) sem dependências externas.
// Uso: node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'icons');

const BG = [37, 99, 235, 255]; // azul primário (#2563eb)
const FG = [255, 255, 255, 255]; // branco

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function buildPixels(size, maskable) {
  const pixels = new Uint8Array(size * size * 4);
  const pad = maskable ? size * 0.2 : size * 0.08; // safe zone maior para ícones maskable
  const radius = maskable ? size * 0.0 : size * 0.22; // maskable preenche todo o quadrado
  const stroke = size * 0.085;

  const gx1 = size * 0.28;
  const gx2 = size * 0.72;
  const gyTop = size * 0.3;
  const gyBottom = size * 0.72;
  const gyValley = gyTop + (gyBottom - gyTop) * 0.58;
  const gxMid = (gx1 + gx2) / 2;

  const segments = [
    [gx1, gyTop, gx1, gyBottom],
    [gx2, gyTop, gx2, gyBottom],
    [gx1, gyTop, gxMid, gyValley],
    [gx2, gyTop, gxMid, gyValley],
  ];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      let insideBg = true;
      if (!maskable) {
        insideBg = isInsideRoundedSquare(x, y, pad, size - pad, radius);
      }

      let color = BG;
      if (insideBg) {
        for (const [x1, y1, x2, y2] of segments) {
          if (distToSegment(x + 0.5, y + 0.5, x1, y1, x2, y2) <= stroke / 2) {
            color = FG;
            break;
          }
        }
      } else {
        color = [0, 0, 0, 0];
      }

      pixels[idx] = color[0];
      pixels[idx + 1] = color[1];
      pixels[idx + 2] = color[2];
      pixels[idx + 3] = color[3];
    }
  }
  return pixels;
}

function isInsideRoundedSquare(x, y, x0, x1, r) {
  const y0 = x0;
  const y1 = x1;
  if (x >= x0 + r && x <= x1 - r) return y >= y0 && y <= y1;
  if (y >= y0 + r && y <= y1 - r) return x >= x0 && x <= x1;
  const cx = x < x0 + r ? x0 + r : x1 - r;
  const cy = y < y0 + r ? y0 + r : y1 - r;
  return Math.hypot(x - cx, y - cy) <= r;
}

function encodePng(size, pixels) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = chunk('IHDR', ihdrData);

  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 4);
    raw[rowStart] = 0; // filtro "none"
    raw.set(pixels.subarray(y * size * 4, (y + 1) * size * 4), rowStart + 1);
  }
  const idatData = deflateSync(raw);
  const idat = chunk('IDAT', idatData);

  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function generate(size, maskable, filename) {
  const pixels = buildPixels(size, maskable);
  const png = encodePng(size, pixels);
  writeFileSync(join(OUT_DIR, filename), png);
  console.log('gerado', filename);
}

generate(192, false, 'icon-192.png');
generate(512, false, 'icon-512.png');
generate(512, true, 'icon-512-maskable.png');
