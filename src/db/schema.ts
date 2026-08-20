import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Espaco, ItemRevisao, Nota, Perfil, Tema } from '../types';

interface MemorizaDB extends DBSchema {
  perfis: {
    key: string;
    value: Perfil;
  };
  espacos: {
    key: string;
    value: Espaco;
    indexes: { perfil_id: string };
  };
  temas: {
    key: string;
    value: Tema;
    indexes: { espaco_id: string };
  };
  notas: {
    key: string;
    value: Nota;
    indexes: { tema_id: string };
  };
  itens_revisao: {
    key: string;
    value: ItemRevisao;
    indexes: { perfil_id: string; nota_id: string };
  };
}

const DB_NAME = 'memoriza';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<MemorizaDB>> | undefined;

export function getDB(): Promise<IDBPDatabase<MemorizaDB>> {
  if (!dbPromise) {
    dbPromise = openDB<MemorizaDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('perfis')) {
          db.createObjectStore('perfis', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('espacos')) {
          const store = db.createObjectStore('espacos', { keyPath: 'id' });
          store.createIndex('perfil_id', 'perfil_id');
        }
        if (!db.objectStoreNames.contains('temas')) {
          const store = db.createObjectStore('temas', { keyPath: 'id' });
          store.createIndex('espaco_id', 'espaco_id');
        }
        if (!db.objectStoreNames.contains('notas')) {
          const store = db.createObjectStore('notas', { keyPath: 'id' });
          store.createIndex('tema_id', 'tema_id');
        }
        if (!db.objectStoreNames.contains('itens_revisao')) {
          const store = db.createObjectStore('itens_revisao', { keyPath: 'id' });
          store.createIndex('perfil_id', 'perfil_id');
          store.createIndex('nota_id', 'nota_id');
        }
      },
    });
  }
  return dbPromise;
}

export type { MemorizaDB };
