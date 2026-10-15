(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const Qa="modulepreload",Ja=function(e){return"/"+e},jt={},Ya=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(r=>{if(r=Ja(r),r in jt)return;jt[r]=!0;const d=r.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${u}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":Qa,d||(l.as="script"),l.crossOrigin="",l.href=r,c&&l.setAttribute("nonce",c),document.head.appendChild(l),d)return new Promise((b,f)=>{l.addEventListener("load",b),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function n(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return s.then(i=>{for(const c of i||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};function eo(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:n,onRegisterError:i}=e;let c,r;const d=async(l=!0)=>{await r};async function u(){if("serviceWorker"in navigator){if(c=await Ya(async()=>{const{Workbox:l}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:l}},[]).then(({Workbox:l})=>new l("/sw.js",{scope:"/",type:"classic"})).catch(l=>{i==null||i(l)}),!c)return;c.addEventListener("activated",l=>{(l.isUpdate||l.isExternal)&&window.location.reload()}),c.addEventListener("installed",l=>{l.isUpdate||o==null||o()}),c.register({immediate:t}).then(l=>{n?n("/sw.js",l):s==null||s(l)}).catch(l=>{i==null||i(l)})}}return r=u(),d}const z={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function ta(){return localStorage.getItem(z.selectedProfileId)}function Ye(e){e?localStorage.setItem(z.selectedProfileId,e):localStorage.removeItem(z.selectedProfileId)}function aa(){const e=localStorage.getItem(z.theme);return e==="light"||e==="dark"?e:"system"}function to(e){e==="system"?localStorage.removeItem(z.theme):localStorage.setItem(z.theme,e)}function ao(){return localStorage.getItem(z.lastExportAt)}function zt(e){localStorage.setItem(z.lastExportAt,e)}function oo(){return localStorage.getItem(z.storagePersistRequested)==="1"}function so(){localStorage.setItem(z.storagePersistRequested,"1")}const no="19:00";function io(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??no}function ro(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function gt(){return localStorage.getItem(z.githubToken)??""}function Pt(e){e.trim()?localStorage.setItem(z.githubToken,e.trim()):localStorage.removeItem(z.githubToken)}function Ne(){return localStorage.getItem(z.githubGistId)??""}function et(e){e?localStorage.setItem(z.githubGistId,e):localStorage.removeItem(z.githubGistId)}function bt(){return localStorage.getItem(z.githubLastSyncAt)}function ht(e){e?localStorage.setItem(z.githubLastSyncAt,e):localStorage.removeItem(z.githubLastSyncAt)}function oa(){return localStorage.getItem(z.githubAutoSync)!=="0"}function co(e){e?localStorage.removeItem(z.githubAutoSync):localStorage.setItem(z.githubAutoSync,"0")}function yt(){return localStorage.getItem(z.notasOrdem)==="titulo"?"titulo":"data"}function lo(e){e==="titulo"?localStorage.setItem(z.notasOrdem,"titulo"):localStorage.removeItem(z.notasOrdem)}function sa(){const e=aa();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function uo(e){to(e),sa()}function mo(){return aa()}async function po(){var e;if(!oo()&&(so(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const tt=(e,t)=>t.some(a=>e instanceof a);let Rt,Ft;function vo(){return Rt||(Rt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fo(){return Ft||(Ft=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const at=new WeakMap,Be=new WeakMap,je=new WeakMap;function go(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{a(re(e.result)),s()},i=()=>{o(e.error),s()};e.addEventListener("success",n),e.addEventListener("error",i)});return je.set(t,e),t}function bo(e){if(at.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{a(),s()},i=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});at.set(e,t)}let ot={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return at.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return re(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function na(e){ot=e(ot)}function ho(e){return fo().includes(e)?function(...t){return e.apply(st(this),t),re(this.request)}:function(...t){return re(e.apply(st(this),t))}}function yo(e){return typeof e=="function"?ho(e):(e instanceof IDBTransaction&&bo(e),tt(e,vo())?new Proxy(e,ot):e)}function re(e){if(e instanceof IDBRequest)return go(e);if(Be.has(e))return Be.get(e);const t=yo(e);return t!==e&&(Be.set(e,t),je.set(t,e)),t}const st=e=>je.get(e);function _o(e,t,{blocked:a,upgrade:o,blocking:s,terminated:n}={}){const i=indexedDB.open(e,t),c=re(i);return o&&i.addEventListener("upgradeneeded",r=>{o(re(i.result),r.oldVersion,r.newVersion,re(i.transaction),r)}),a&&i.addEventListener("blocked",r=>a(r.oldVersion,r.newVersion,r)),c.then(r=>{n&&r.addEventListener("close",()=>n()),s&&r.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const wo=["get","getKey","getAll","getAllKeys","count"],$o=["put","add","delete","clear"],Ve=new Map;function Ot(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ve.get(t))return Ve.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=$o.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||wo.includes(a)))return;const n=async function(i,...c){const r=this.transaction(i,s?"readwrite":"readonly");let d=r.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[a](...c),s&&r.done]))[0]};return Ve.set(t,n),n}na(e=>({...e,get:(t,a,o)=>Ot(t,a)||e.get(t,a,o),has:(t,a)=>!!Ot(t,a)||e.has(t,a)}));const Eo=["continue","continuePrimaryKey","advance"],Ht={},nt=new WeakMap,ia=new WeakMap,xo={get(e,t){if(!Eo.includes(t))return e[t];let a=Ht[t];return a||(a=Ht[t]=function(...o){nt.set(this,ia.get(this)[t](...o))}),a}};async function*So(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,xo);for(ia.set(a,t),je.set(a,st(t));t;)yield a,t=await(nt.get(a)||t.continue()),nt.delete(a)}function Bt(e,t){return t===Symbol.asyncIterator&&tt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&tt(e,[IDBIndex,IDBObjectStore])}na(e=>({...e,get(t,a,o){return Bt(t,a)?So:e.get(t,a,o)},has(t,a){return Bt(t,a)||e.has(t,a)}}));const ko="memoriza",Ao=3;let Ue;function k(){return Ue||(Ue=_o(ko,Ao,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}e.objectStoreNames.contains("snapshots")||e.createObjectStore("snapshots",{keyPath:"id"})}})),Ue}function se(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const _t="Europe/London",Lo=new Intl.DateTimeFormat("en-CA",{timeZone:_t,year:"numeric",month:"2-digit",day:"2-digit"});function F(e=new Date){return Lo.format(e)}function Z(){return F(new Date)}function ye(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function P(){return new Date().toISOString()}function oe(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function qo(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:_t,weekday:"short",day:"2-digit",month:"2-digit"})}function _e(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function To(e){const t=new Date(e),a=F(t),o=t.toLocaleTimeString("pt-BR",{timeZone:_t,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function wt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function K(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const Mo="00000000-0000-4000-8000-000000000001";async function $t(){return(await(await k()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function Co(){return $t()}async function Io(e){return(await k()).get("perfis",e)}async function ra(e){const t=await k(),a=await t.getAll("perfis"),o=P(),n={id:a.length===0?Mo:se(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",n),n}async function Do(e,t){const a=await k(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=P(),await a.put("perfis",o))}async function No(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const n of a){const i=await t.getAllFromIndex("temas","espaco_id",n.id);o+=i.length;for(const c of i)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function jo(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(u=>t.getAllFromIndex("temas","espaco_id",u.id)))).flat(),i=(await Promise.all(s.map(u=>t.getAllFromIndex("notas","tema_id",u.id)))).flat(),r=(await Promise.all(i.map(u=>t.getAllFromIndex("itens_revisao","nota_id",u.id)))).flat(),d=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await d.objectStore("perfis").delete(e);for(const u of a)await d.objectStore("espacos").delete(u.id);for(const u of s)await d.objectStore("temas").delete(u.id);for(const u of i)await d.objectStore("notas").delete(u.id);for(const u of r)await d.objectStore("itens_revisao").delete(u.id);await d.done}const ca=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),zo=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function Po(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function it(e){return zo.get(Po(e))??null}function la(e){return e.length>0&&e.every(t=>it(t)!==null)}function da(e,t,a){if(a){const o=it(e),s=it(t);if(o!==s)return o-s}return ca.compare(e,t)}function ua(e){const t=la(e);return[...e].sort((a,o)=>da(a,o,t))}function Ro(e,t){return ca.compare(e,t)}function ce(e,t){const a=la(e.map(t));return[...e].sort((o,s)=>da(t(o),t(s),a))}const ma=30;function pe(e,t=P()){return{...e,excluido:!0,excluido_em:t,atualizado_em:t}}function de(e,t=P()){const a={...e};return delete a.excluido,delete a.excluido_em,a.atualizado_em=t,a}async function Fo(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=new Map(a.map(r=>[r.id,r])),s=(await Promise.all(a.map(r=>t.getAllFromIndex("temas","espaco_id",r.id)))).flat(),n=new Map(s.map(r=>[r.id,r])),i=(await Promise.all(s.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat(),c=[];for(const r of a){if(!r.excluido)continue;const d=s.filter(l=>l.espaco_id===r.id),u=new Set(d.map(l=>l.id));c.push({tipo:"espaco",id:r.id,nome:r.nome,contexto:r.categoria||"Sem categoria",excluido_em:r.excluido_em,temas:d.filter(l=>l.excluido).length,notas:i.filter(l=>u.has(l.tema_id)&&l.excluido).length})}for(const r of s){if(!r.excluido)continue;const d=o.get(r.espaco_id);!d||d.excluido||c.push({tipo:"tema",id:r.id,nome:r.nome,contexto:d.nome,excluido_em:r.excluido_em,notas:i.filter(u=>u.tema_id===r.id&&u.excluido).length})}for(const r of i){if(!r.excluido)continue;const d=n.get(r.tema_id);if(!d||d.excluido)continue;const u=o.get(d.espaco_id);!u||u.excluido||c.push({tipo:"nota",id:r.id,nome:r.titulo||"(sem título)",contexto:d.nome,excluido_em:r.excluido_em})}return c.sort((r,d)=>(d.excluido_em??"").localeCompare(r.excluido_em??""))}async function Oo(e,t){const a=await k(),o=P();if(e==="nota"){const r=await a.get("notas",t);if(!r)return;await a.put("notas",de(r,o));return}if(e==="tema"){const r=await a.get("temas",t);if(!r)return;const d=(await a.getAllFromIndex("notas","tema_id",t)).filter(l=>l.excluido),u=a.transaction(["temas","notas"],"readwrite");await u.objectStore("temas").put(de(r,o));for(const l of d)await u.objectStore("notas").put(de(l,o));await u.done;return}const s=await a.get("espacos",t);if(!s)return;const n=(await a.getAllFromIndex("temas","espaco_id",t)).filter(r=>r.excluido),i=(await Promise.all(n.map(r=>a.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>r.excluido),c=a.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(de(s,o));for(const r of n)await c.objectStore("temas").put(de(r,o));for(const r of i)await c.objectStore("notas").put(de(r,o));await c.done}async function Ae(e,t){const a=await k();if(e==="nota"){const i=await a.getAllFromIndex("itens_revisao","nota_id",t),c=a.transaction(["notas","itens_revisao"],"readwrite");await c.objectStore("notas").delete(t);for(const r of i)await c.objectStore("itens_revisao").delete(r.id);await c.done;return}let o;if(e==="tema")o=await a.getAllFromIndex("notas","tema_id",t);else{const i=await a.getAllFromIndex("temas","espaco_id",t);o=(await Promise.all(i.map(c=>a.getAllFromIndex("notas","tema_id",c.id)))).flat()}const s=(await Promise.all(o.map(i=>a.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat(),n=a.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");if(e==="tema")await n.objectStore("temas").delete(t);else{const i=await a.getAllFromIndex("temas","espaco_id",t);await n.objectStore("espacos").delete(t);for(const c of i)await n.objectStore("temas").delete(c.id)}for(const i of o)await n.objectStore("notas").delete(i.id);for(const i of s)await n.objectStore("itens_revisao").delete(i.id);await n.done}async function Ho(){const e=await k(),t=K(Z(),-ma),a=i=>!!i.excluido&&!!i.excluido_em&&i.excluido_em.slice(0,10)<t,o=(await e.getAll("espacos")).filter(a),s=(await e.getAll("temas")).filter(a),n=(await e.getAll("notas")).filter(a);for(const i of o)await Ae("espaco",i.id);for(const i of s)await Ae("tema",i.id);for(const i of n)await Ae("nota",i.id)}async function pa(e){const a=(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido);return yt()==="titulo"?ce(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function Vt(e){return(await k()).get("notas",e)}async function Bo(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).filter(i=>!i.excluido).map(i=>({nota:i,tema:s}))))).flat()}async function Vo(e,t){const a=await k(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const n=P(),i={id:se(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:n,atualizado_em:n},c={id:se(),nota_id:i.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:K(Z(),1),status:"pendente",streak_facil:0,criado_em:n,atualizado_em:n},r=a.transaction(["notas","itens_revisao"],"readwrite");return await r.objectStore("notas").put(i),await r.objectStore("itens_revisao").put(c),await r.done,i}async function Uo(e,t){const a=await k(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=P(),await a.put("notas",o))}async function Go(e){const t=await k(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=P(),await t.put("notas",a),a.favorito):!1}async function Ko(e){const t=await k(),a=await t.get("notas",e);a&&await t.put("notas",pe(a))}async function va(){var n;const e=await k(),a=(await e.getAll("notas")).filter(i=>!("titulo"in i)||!i.titulo);if(a.length===0)return 0;const o=P(),s=e.transaction("notas","readwrite");for(const i of a)await s.store.put({...i,titulo:((n=i.fonte)==null?void 0:n.trim())||"Sem título",titulo_revisado:!1,favorito:i.favorito??!1,atualizado_em:o});return await s.done,a.length}function Wo(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,n=0,i=0;for(const c of t){const r=a.get(c.id);r?c.atualizado_em>r.atualizado_em?(a.set(c.id,c),o.push(c),n++):i++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:n,mantidos:i}}function Zo(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const Xo=["perfis","espacos","temas","notas","itens_revisao"],Et="memoriza-export",fa=1;async function Qo(){const e=await k(),[t,a,o,s,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:n}}async function Jo(e){const t=await k(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(l=>l.id)),i=(await t.getAll("temas")).filter(l=>s.has(l.espaco_id)),c=new Set(i.map(l=>l.id)),d=(await t.getAll("notas")).filter(l=>c.has(l.tema_id)),u=await t.getAllFromIndex("itens_revisao","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:i,notas:d,itens_revisao:u}}async function Yo(e){const t=await Jo(e);return{formato:Et,versao:fa,exportado_em:P(),escopo:"perfil",perfil_id:e,dados:t}}async function we(){const e=await Qo();return{formato:Et,versao:fa,exportado_em:P(),escopo:"todos",dados:e}}function es(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${To(e.exportado_em)}.json`}function Ut(e){const t=es(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function ze(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==Et||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Pe(e){const t=await k(),a={};for(const o of Xo){const s=await t.getAll(o),n=e.dados[o],i=Wo(s,n??[]);if(i.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const r of i.toWrite)await c.store.put(r);await c.done}a[o]={criados:i.criados,atualizados:i.atualizados,mantidos:i.mantidos}}return await va(),{...Zo(Object.values(a)),porLoja:a}}const ts=8,as=20,os=10;function ss(e){return e.slice(0,10)}function ns(e,t){const[a,o,s]=e.split("-").map(Number),n=new Date(Date.UTC(a,o-1,s));return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function is(e){const[t,a,o]=e.split("-").map(Number),s=new Date(Date.UTC(t,a-1,o)),n=s.getUTCDay();return s.setUTCDate(s.getUTCDate()-(n+6)%7),s.toISOString().slice(0,10)}function rs(e,t){const a=new Set,o=(d,u)=>u.criado_em.localeCompare(d.criado_em),s=e.filter(d=>d.automatico).sort(o),n=e.filter(d=>!d.automatico).sort(o),i=ns(t,-6),c=new Set;let r=0;for(const d of s){const u=ss(d.criado_em);let l;if(u>=i)l=!0;else{const b=is(u);l=!c.has(b)&&c.size<ts,l&&c.add(b)}if(l&&r<as){r++;continue}a.add(d.id)}for(const d of n.slice(os))a.add(d.id);return[...a]}async function rt(e={}){const t=await k(),a=JSON.stringify(await we()),o=e.automatico??!1,s={id:se(),criado_em:P(),automatico:o,titulo:e.titulo??(o?"Automático":"Manual"),bytes:a.length,conteudo:a};return await t.put("snapshots",s),await us(),s}async function cs(){return(await(await k()).getAll("snapshots")).sort((a,o)=>o.criado_em.localeCompare(a.criado_em))}async function ls(e){await(await k()).delete("snapshots",e)}async function ds(e){const a=await(await k()).get("snapshots",e);if(!a)throw new Error("Snapshot não encontrado.");return Pe(ze(a.conteudo))}async function us(){const e=await k(),t=rs(await e.getAll("snapshots"),Z());if(t.length===0)return;const a=e.transaction("snapshots","readwrite");for(const o of t)await a.store.delete(o);await a.done}async function ms(){const e=await k(),t=Z();return(await e.getAll("snapshots")).some(o=>o.automatico&&o.criado_em.slice(0,10)===t)?null:rt({automatico:!0})}function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ve(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const ga="_sem-categoria_";function ps(e){return e.trim()===""?ga:encodeURIComponent(e)}function vs(e){return e===ga?"":decodeURIComponent(e)}function fs(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function gs(){const e=fs();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:vs(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function bs(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function M(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function hs(e){M(e)}function ys(e){window.addEventListener("hashchange",e)}function ue(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function D(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const _s={hoje:ue('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:ue('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:ue('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:ue('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:ue('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:ue('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},S={backup:D('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:D('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:D('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:D('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:D('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:D('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:D('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:D('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:D('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:D('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:D('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:D('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:D('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:D('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:D('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:D('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:D('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:D('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:D('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:D('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:D('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:D('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:D('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:D('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:D('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:D('<path d="M20 6L9 17l-5-5"/>'),chart:D('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:D('<path d="M4 6h16M4 12h11M4 18h6"/>'),trash:D('<path d="M4 7h16"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6M14 11v6"/>')};async function ws(e,t){var c,r,d;const a=await $t(),o=a.length===0;e.innerHTML=`
    <div class="profile-picker">
      <div>
        <div class="profile-picker__title">Quem é você?</div>
        <p class="profile-picker__subtitle">
          ${o?"Primeiro uso neste aparelho — crie seu perfil pra começar. Cada pessoa que usar o app aqui cria o próprio depois.":"Escolha seu perfil para ver suas próprias revisões."}
        </p>
      </div>
      ${a.length>0?`
        <div class="profile-grid" role="list">
          ${a.map(u=>`
            <button class="profile-card" role="listitem" data-id="${p(u.id)}">
              <span class="profile-avatar" aria-hidden="true">${p($s(u.nome))}</span>
              <span class="profile-card__name">${p(u.nome)}</span>
            </button>
          `).join("")}
        </div>
      `:""}
      <div id="form-novo-perfil-picker" class="card content-narrow" style="text-align:left; width:100%; ${o?"":"display:none;"}">
        <div class="field">
          <label class="field__label" for="input-novo-perfil-picker">${o?"Seu nome":"Nome do novo perfil"}</label>
          <input class="input" id="input-novo-perfil-picker" type="text" maxlength="60" />
        </div>
        <div class="form-actions" style="margin-top: var(--space-3);">
          <button class="btn btn--primary btn--sm" id="btn-salvar-perfil-picker" type="button">Criar perfil</button>
          ${o?"":'<button class="btn btn--secondary btn--sm" id="btn-cancelar-perfil-picker" type="button">Cancelar</button>'}
        </div>
      </div>
      ${o?"":'<button class="btn btn--secondary btn--sm" id="btn-novo-perfil-picker" type="button" style="align-self:center;">+ Sou outra pessoa, criar meu perfil</button>'}
    </div>
  `,e.querySelectorAll(".profile-card").forEach(u=>{u.addEventListener("click",()=>{const l=u.dataset.id,b=a.find(f=>f.id===l);b&&t(b)})});const s=e.querySelector("#form-novo-perfil-picker"),n=e.querySelector("#input-novo-perfil-picker");o&&n.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",n.focus()}),(r=e.querySelector("#btn-cancelar-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="none"});const i=async()=>{const u=n.value.trim();if(!u)return;const l=await ra(u);t(l)};(d=e.querySelector("#btn-salvar-perfil-picker"))==null||d.addEventListener("click",i),n.addEventListener("keydown",u=>{u.key==="Enter"&&i()})}function $s(e){return e.trim().slice(0,1).toUpperCase()}const me=["1","7","30","180"],Ge={1:1,7:7,30:30,180:180};function Es(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=me.indexOf(e);if(t==="dificil"){const d=me[Math.max(0,s-1)];return{estagio:d,streak_facil:0,data_agendada:K(o,Ge[d]),aposentado:!1}}if(t==="medio"){const d=me[Math.min(me.length-1,s+1)];return{estagio:d,streak_facil:0,data_agendada:K(o,Ge[d]),aposentado:!1}}const n=a+1,i=s+2,c=i<=me.length-1?me[i]:"consulta",r=n>=2?"consulta":c;return r==="consulta"?{estagio:"consulta",streak_facil:n,aposentado:!0}:{estagio:r,streak_facil:n,data_agendada:K(o,Ge[r]),aposentado:!1}}async function ba(e){const t=await k(),a=Z(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(h=>h.data_agendada<=a),n=Array.from(new Set(s.map(h=>h.nota_id))),i=await Promise.all(n.map(h=>t.get("notas",h))),c=new Map(i.filter(h=>!!h).map(h=>[h.id,h])),r=Array.from(new Set(Array.from(c.values()).map(h=>h.tema_id))),d=await Promise.all(r.map(h=>t.get("temas",h))),u=new Map(d.filter(h=>!!h).map(h=>[h.id,h])),l=Array.from(new Set(Array.from(u.values()).map(h=>h.espaco_id))),b=await Promise.all(l.map(h=>t.get("espacos",h))),f=new Map(b.filter(h=>!!h).map(h=>[h.id,h])),E=[];for(const h of s){const v=c.get(h.nota_id),A=v&&u.get(v.tema_id),x=A&&f.get(A.espaco_id);!v||!A||!x||v.excluido||A.excluido||x.excluido||E.push({item:h,nota:v,tema:A,espaco:x})}return E.sort((h,v)=>h.tema.criado_em.localeCompare(v.tema.criado_em)||h.nota.criado_em.localeCompare(v.nota.criado_em)),E}async function xs(e,t,a){const o=await k(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const n=Z(),i=Es(s.estagio,t,s.streak_facil,n),c=P(),r={...s,status:"feita",avaliacao:t,data_concluida:n,duracao_segundos:a,atualizado_em:c},d={id:se(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:i.estagio,data_agendada:i.aposentado?n:i.data_agendada,status:i.aposentado?"feita":"pendente",streak_facil:i.streak_facil,criado_em:c,atualizado_em:c},u=o.transaction("itens_revisao","readwrite");return await u.store.put(r),await u.store.put(d),await u.done,i}async function Ss(e){const t=await k(),a=Z();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function ks(e){const t=await k(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(i=>i.status==="pendente");if(a.length===0)return;const o=Z(),s=P(),n=t.transaction("itens_revisao","readwrite");for(const i of a)await n.store.put({...i,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await n.done}const Re=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],Gt={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},As=new RegExp(`\\[([^\\]]+)\\]\\{(${Re.join("|")})\\}`,"g");function ct(e){let t=p(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(As,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Ls(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,n=s[s.length-1];a.push({level:o.level,nodes:n?n.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function ha(e){return`<ul>${e.map(t=>`<li>${ct(t.text)}${t.children.length>0?ha(t.children):""}</li>`).join("")}</ul>`}function Fe(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(ha(Ls(o))),o=[])}let n=[];function i(){n.length>0&&(a.push(`<p>${ct(n.join(`
`)).replace(/\n/g,"<br>")}</p>`),n=[])}for(const c of t){const r=c.trim();if(r===""){i(),s();continue}const d=/^(#{1,3})\s+(.*)$/.exec(r);if(d){i(),s();const l=d[1].length;a.push(`<h${l}>${ct(d[2])}</h${l}>`);continue}const u=/^[-*]\s+(.*)$/.exec(r);if(u){i();const l=c.length-c.trimStart().length;o.push({level:Math.floor(l/2),text:u[1]});continue}s(),n.push(r)}return i(),s(),a.join(`
`)}function xt(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(xt).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Re.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function lt(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...lt(s,t+1));continue}if(s.tagName!=="LI")continue;const n=s,i=Array.from(n.children).filter(d=>d.tagName==="UL"),c=n.cloneNode(!0);c.querySelectorAll("ul").forEach(d=>d.remove());const r=xt(c).trim();r&&a.push(`${"  ".repeat(t)}- ${r}`);for(const d of i)a.push(...lt(d,t+1));o=n}return a}function Kt(e){if(e.tagName==="UL")return lt(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=xt(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function qs(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=Kt(o);s.length>0&&t.push(s.join(`
`))}else t.push(...Kt(o))}return t.filter(Boolean).join(`

`)}const Ts=30;function ya(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=K(Z(),Ts);return e.validade_ate<=t}const le=8;function Ms(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function St(e){return Ms(e)%le}function R(e){return`var(--accent-${St(e)})`}function _a(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function kt(e){return e?e.toLowerCase():"\0sem-categoria"}function wa(e){return Cs(e.map(kt))}function Cs(e){const t=new Set,a=new Map;for(const o of e){let s=St(o);for(let n=0;n<le&&t.has(s);n++)s=(s+1)%le;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function $a(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=St(o.id);for(let n=0;n<le&&t.has(s);n++)s=(s+1)%le;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const Is=5*60;let B=null;function Ea(){B&&(document.hidden?B.retomadoEm!=null&&(B.acumuladoMs+=Date.now()-B.retomadoEm,B.retomadoEm=null):B.retomadoEm==null&&(B.retomadoEm=Date.now()))}function Ds(e){B&&B.itemId===e||(Me(),B={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",Ea))}function Ns(){if(!B)return;let e=B.acumuladoMs;return B.retomadoEm!=null&&(e+=Date.now()-B.retomadoEm),Math.min(Is,Math.round(e/1e3))}function Me(){B&&document.removeEventListener("visibilitychange",Ea),B=null}function xa(e){const t=Z();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${ye(e.data_agendada,t)} dia(s)">${S.alert} atrasada</span>`}async function Wt(e,t){const a=await ba(t.perfilId);await Ce(e,t,a)}async function Ce(e,t,a){var d;Me(),window.scrollTo({top:0});const o=await Ss(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>M("espacos"));return}const i=new Set(a.map(u=>u.espaco.id)).size>1,c=new Map;for(const u of a){const l=c.get(u.tema.id)??[];l.push(u),c.set(u.tema.id,l)}const r=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=r+Array.from(c.values()).map(u=>{const l=u[0].tema,b=u[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${R(l.id)}">
            <span class="color-dot" style="--dot-color:${R(l.id)}"></span>
            ${p(l.nome)}
            ${i?`<span class="queue-group__espaco"> · ${p(b.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${u.map(f=>`
              <button class="item-row" data-id="${p(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${R(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${S.star} `:""}${p(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${xa(f.item)}
                ${ya(f.nota)?`<span class="badge badge--muted">${S.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(u=>{u.addEventListener("click",()=>{const l=a.find(b=>b.item.id===u.dataset.id);l&&Sa(e,t,l,a,o)})})}function Sa(e,t,a,o,s=0,n=!1){var d,u,l;Ds(a.item.id),n||window.scrollTo({top:0});const i=ya(a.nota),c=s+o.length,r=c>0?Math.round(s/c*100):0;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" data-voltar type="button">← Voltar à fila</button>
      <button class="link" data-editar type="button" style="margin-left:auto;">${S.pen} Editar nota</button>
    </div>

    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-progress" title="${s} de ${c} revisadas hoje">
        <div class="review-progress__track"><div class="review-progress__fill" style="width:${r}%"></div></div>
        <span class="review-progress__label">${s} de ${c} revisadas hoje</span>
      </div>
      <div class="review-card__meta">
        ${p(a.tema.nome)}${n&&a.nota.fonte?` · ${p(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${S.star} `:""}${p(a.nota.titulo||"(sem título)")}
        ${xa(a.item)}
      </div>

      ${i?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${n?`
        <div class="review-card__content markdown-preview">${Fe(a.nota.conteudo)}</div>
        <div class="review-actions">
          <button class="btn btn--review-dificil" data-avaliacao="dificil" type="button">${S.caraTriste}<span>Difícil</span></button>
          <button class="btn btn--review-medio" data-avaliacao="medio" type="button">${S.caraNeutra}<span>Médio</span></button>
          <button class="btn btn--review-facil" data-avaliacao="facil" type="button">${S.caraFeliz}<span>Fácil</span></button>
        </div>
        <p class="review-legend">Fácil = lembrei na hora · Médio = com esforço · Difícil = não lembrei</p>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(d=e.querySelector("[data-voltar]"))==null||d.addEventListener("click",()=>void Ce(e,t,o)),(u=e.querySelector("[data-editar]"))==null||u.addEventListener("click",()=>{Me(),M(`notas/${a.nota.id}`)}),(l=e.querySelector("#btn-revelar"))==null||l.addEventListener("click",()=>{Sa(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(b=>{b.addEventListener("click",async()=>{const f=b.dataset.avaliacao,E=Ns();Me();const h=await xs(a.item.id,f,E),v=await ba(t.perfilId);h.aposentado?js(e,t,v):await Ce(e,t,v)})})}function js(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${S.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void Ce(e,t,a))}function ka(e){return e.trim().toLowerCase()}function At(e){const t=new Map;for(const n of e){const i=n.categoria.trim(),c=ka(i),r=t.get(c);r?r.itens.push(n):t.set(c,{display:i,itens:[n]})}const a=Array.from(t.values()).map(n=>({categoria:n.display,itens:n.itens})),o=a.map(n=>n.categoria),s=new Map;ua(o.filter(n=>n!=="")).forEach((n,i)=>s.set(n,i)),a.sort((n,i)=>n.categoria===""&&i.categoria!==""?1:i.categoria===""&&n.categoria!==""?-1:(s.get(n.categoria)??0)-(s.get(i.categoria)??0));for(const n of a)n.itens.length>1&&(n.itens=ce(n.itens,i=>i.nome));return a}function Lt(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=ka(o);t.has(s)||t.set(s,o)}return ua(Array.from(t.values()))}async function Aa(e){const a=await(await k()).getAllFromIndex("espacos","perfil_id",e);return ce(a.filter(o=>!o.excluido),o=>o.nome)}const zs=["Cursos","Livros","Bíblia"];async function La(e){const t=await Aa(e);return Lt([...zs,...t.map(a=>a.categoria)])}async function qt(e){return(await k()).get("espacos",e)}function qa(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function Ps(e,t,a,o={}){const s=await k(),n=P(),i={id:se(),perfil_id:e,nome:t,categoria:a,criado_em:n,atualizado_em:n,arquivado:!1};return qa(i,o),await s.put("espacos",i),i}async function Rs(e,t,a,o={}){const s=await k(),n=await s.get("espacos",e);n&&(n.nome=t,n.categoria=a,qa(n,o),n.atualizado_em=P(),await s.put("espacos",n))}async function dt(e,t){const a=await k(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?P():void 0,o.atualizado_em=P(),await a.put("espacos",o))}async function Ta(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).filter(n=>!n.excluido).length;return{temas:a.length,notas:o}}async function Ma(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(r=>!r.excluido),n=(await Promise.all(o.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>!r.excluido),i=P(),c=t.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(pe(a,i));for(const r of o)await c.objectStore("temas").put(pe(r,i));for(const r of n)await c.objectStore("notas").put(pe(r,i));await c.done}function ae(e){return new Promise(t=>{var n,i;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${p(e.title)}</div>
        <p class="modal__message">${p(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${p(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${p(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(n=a.querySelector("#modal-confirm"))==null||n.addEventListener("click",()=>s(!0)),(i=a.querySelector("#modal-cancel"))==null||i.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function Ie(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${p(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${p(a)}">${p(a)}</button>`).join("")}
    </div>
  `}function Tt(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ve(o),o.focus()})})})}function N(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Ca="livro",Ia=[{chave:"pasta",label:"Categoria",svg:N('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:N('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:N('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:N('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:N('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:N('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:N('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:N('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:N('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:N('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:N('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:N('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:N('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:N('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:N('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:N('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:N('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:N('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:N('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:N('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:N('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:N('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:N('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:N('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:N('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:N('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:N('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:N('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:N('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],ut=new Map(Ia.map(e=>[e.chave,e]));function ne(e){return e&&ut.get(e)||ut.get(Ca)}const Fs=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function Os(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Mt(e){var a;const t=Os(e);if(t.trim())return(a=Fs.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function ge(e){return e.icone&&ut.has(e.icone)?e.icone:Mt(`${e.nome??""} ${e.categoria??""}`)??Ca}const Hs="pasta";function Da(e){return Mt(e)??Hs}const Zt=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function Na(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${ie(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${Ia.map(s=>`
          <button
            type="button"
            class="espaco-icon-btn${s.chave===a?" is-selected":""}"
            data-icone="${ie(s.chave)}"
            title="${ie(s.label)}"
            aria-label="${ie(s.label)}"
            aria-pressed="${s.chave===a}"
          >${s.svg}</button>
        `).join("")}
      </div>
      <input type="hidden" id="${ie(t)}-icone" value="${ie(a??"")}" />

      <span class="field__label" style="margin-top: var(--space-4);">Cor</span>
      <div class="espaco-visual__cores" role="group" aria-label="Cor do espaço">
        <button
          type="button"
          class="color-swatch color-swatch--auto${typeof o!="number"?" is-selected":""}"
          data-cor=""
          title="Automática"
          aria-label="Cor automática"
          aria-pressed="${typeof o!="number"}"
        >A</button>
        ${Array.from({length:le},(s,n)=>`
          <button
            type="button"
            class="color-swatch${o===n?" is-selected":""}"
            data-cor="${n}"
            style="--swatch: var(--accent-${n});"
            title="${Zt[n]??`Cor ${n}`}"
            aria-label="${Zt[n]??`Cor ${n}`}"
            aria-pressed="${o===n}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${ie(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function ja(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${fe(a)}"]`);if(!s)return;const n=s.querySelector(`#${fe(a)}-icone`),i=s.querySelector(`#${fe(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),r=l=>{n&&(n.value=l);for(const b of c){const f=b.dataset.icone===l;b.classList.toggle("is-selected",f),b.setAttribute("aria-pressed",String(f))}};let d=!1;for(const l of c)l.addEventListener("click",()=>{d=!0,r(l.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(l=>{l.addEventListener("click",()=>{i&&(i.value=l.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(b=>{const f=b===l;b.classList.toggle("is-selected",f),b.setAttribute("aria-pressed",String(f))})})});const u=()=>{if(d)return;const l=Mt(o());for(const b of c)b.classList.toggle("is-suggested",!!l&&b.dataset.icone===l);l&&r(l)};u(),e.querySelectorAll('input[type="text"]').forEach(l=>{l.addEventListener("input",u)})}function za(e,t){var i,c;const a=e.querySelector(`[data-espaco-visual="${fe(t)}"]`),o=(i=a==null?void 0:a.querySelector(`#${fe(t)}-icone`))==null?void 0:i.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${fe(t)}-cor`))==null?void 0:c.value.trim(),n={};if(o&&(n.icone=o),s!==void 0&&s!==""){const r=Number(s);Number.isInteger(r)&&r>=0&&r<le&&(n.cor=r)}return n}function ie(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function fe(e){return e.replace(/["\\]/g,"\\$&")}async function Le(e,t){var b,f,E,h;const a=await Aa(t.perfilId),o=a.filter(v=>!v.arquivado),s=a.filter(v=>v.arquivado),n=await Vs(a.map(v=>v.id)),i=At(o),c=$a(o),r=wa(i.map(v=>v.categoria)),d=await La(t.perfilId);e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap; margin-bottom: var(--space-4);">
      <p class="screen-hint" style="margin:0;">Cada Espaço é um curso, um livro ou um estudo — agrupe por categoria pra manter organizado.</p>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Novo espaço</button>
    </div>

    <div id="form-novo-espaco" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-nome-espaco">Nome do espaço</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Curso de Investimentos" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco" type="text" placeholder="Ex: Cursos, Livros, Estudos" maxlength="80" />
        ${Ie(d,"input-categoria-espaco")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${Na({prefix:"novo-espaco"})}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-espaco" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-espaco" type="button">Cancelar</button>
      </div>
    </div>

    ${o.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.bookOpen}</div>
        <div class="empty-state__title">Nenhum espaço de estudo ainda</div>
        <p class="empty-state__hint">Crie um espaço (ex: "Curso de Investimentos") para organizar seus temas e notas.</p>
        <button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-espaco" type="button">Criar o primeiro espaço</button>
      </div>
    `:i.map(v=>{const A=v.itens.length===1?v.itens[0]:null,x=A?c.get(A.id)??R(A.id):r.get(kt(v.categoria))??R(v.categoria),C=ne(A?ge(A):Da(v.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${x}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${x}" aria-hidden="true">${C.svg}</span>
            ${p(v.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${v.itens.map(j=>Bs(j,n.get(j.id)??0,c.get(j.id)??R(j.id))).join("")}
        </div>
      </details>
    `}).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(v=>`
            <div class="item-row" data-id="${p(v.id)}">
              <button class="item-row__main" data-open="${p(v.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${R(v.id)}" aria-hidden="true">${ne(ge(v)).svg}</span>
                  <span class="item-row__title">${p(v.nome)}</span>
                </span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${p(v.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,Tt(e),ja(e,{prefix:"novo-espaco",getTexto:()=>{var v,A;return`${((v=e.querySelector("#input-nome-espaco"))==null?void 0:v.value)??""} ${((A=e.querySelector("#input-categoria-espaco"))==null?void 0:A.value)??""}`}});const u=e.querySelector("#form-novo-espaco"),l=()=>{var v;u.style.display="block",(v=e.querySelector("#input-nome-espaco"))==null||v.focus()};(b=e.querySelector("#btn-novo-espaco"))==null||b.addEventListener("click",l),(f=e.querySelector("#btn-empty-novo-espaco"))==null||f.addEventListener("click",l),(E=e.querySelector("#btn-cancelar-espaco"))==null||E.addEventListener("click",()=>{u.style.display="none"}),(h=e.querySelector("#btn-salvar-espaco"))==null||h.addEventListener("click",async()=>{const v=e.querySelector("#input-nome-espaco"),A=e.querySelector("#input-categoria-espaco"),x=v.value.trim();if(!x)return;const C=await Ps(t.perfilId,x,A.value.trim(),za(e,"novo-espaco"));M(`espacos/${C.id}`)}),e.querySelectorAll("[data-open]").forEach(v=>{v.addEventListener("click",()=>M(`espacos/${v.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(v=>{v.addEventListener("click",async()=>{await dt(v.dataset.archive,!0),Le(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(v=>{v.addEventListener("click",async()=>{await dt(v.dataset.unarchive,!1),Le(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(v=>{v.addEventListener("click",async()=>{const A=v.dataset.excluir,x=v.dataset.nome??"",C=await Ta(A);await ae({title:`Excluir "${x}"?`,message:`Isso manda pra Lixeira o espaço com ${C.temas} tema(s) e ${C.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ma(A),Le(e,t))})})}function Bs(e,t,a){const o=ne(ge(e));return`
    <div class="item-row" data-id="${p(e.id)}" style="--row-accent:${a}">
      <button class="item-row__main" data-open="${p(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${a}" aria-hidden="true">${o.svg}</span>
          <span class="item-row__title">${p(e.nome)}</span>
        </span>
        <span class="item-row__meta">${t} tema(s)</span>
      </button>
      <div class="item-row__actions">
        <button class="btn btn--secondary btn--sm" data-archive="${p(e.id)}" type="button" title="As revisões já agendadas continuam normalmente — só some da lista principal">Arquivar</button>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button data-excluir="${p(e.id)}" data-nome="${p(e.nome)}" class="danger" type="button">Excluir</button>
          </div>
        </details>
      </div>
    </div>
  `}async function Vs(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function Pa(e){const a=await(await k()).getAllFromIndex("temas","espaco_id",e);return ce(a.filter(o=>!o.excluido),o=>o.nome)}async function Ra(e){return(await k()).get("temas",e)}async function Us(e,t,a){const o=await k(),s=P(),n={id:se(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",n),n}async function Gs(e,t,a){const o=await k(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=P(),await o.put("temas",s))}async function Ks(e){const t=await k(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=P(),await t.put("temas",a),a.favorito):!1}async function Ws(e){return{notas:(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido).length}}async function Zs(e){const t=await k(),a=await t.get("temas",e);if(!a)return;const o=(await t.getAllFromIndex("notas","tema_id",e)).filter(i=>!i.excluido),s=P(),n=t.transaction(["temas","notas"],"readwrite");await n.objectStore("temas").put(pe(a,s));for(const i of o)await n.objectStore("notas").put(pe(i,s));await n.done}function Xs(e,t){let a=e.has(t)?t:K(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=K(a,-1);return o}function Qs(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const Js=5;async function Ys(e){const t=await k(),a=Z(),o=K(a,-6),[s,n,i,c,r]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"])),t.getAll("notas"),t.getAll("temas"),t.getAll("espacos")]),d=new Map(i.map(_=>[_.id,_])),u=new Map(c.map(_=>[_.id,_])),l=new Map(r.map(_=>[_.id,_])),b=_=>{const H=d.get(_.nota_id);if(!H||H.excluido)return!1;const be=u.get(H.tema_id);if(!be||be.excluido)return!1;const Nt=l.get(be.espaco_id);return!!Nt&&!Nt.excluido},f=s.filter(_=>_.avaliacao&&b(_)),E=n.filter(b),h=f.filter(_=>_.data_concluida===a),v=h.length,A=h.reduce((_,H)=>_+(H.duracao_segundos??0),0),x=f.filter(_=>_.data_concluida&&_.data_concluida>=o&&_.data_concluida<=a).length,C=["1","7","30","180"].map(_=>({estagio:_,count:E.filter(H=>H.estagio===_).length})),j=[];for(let _=1;_<=7;_++){const H=K(a,_);j.push({data:H,count:E.filter(be=>be.data_agendada===H).length})}const X=K(a,-29),O=f.filter(_=>_.data_concluida>=X),V={facil:O.filter(_=>_.avaliacao==="facil").length,medio:O.filter(_=>_.avaliacao==="medio").length,dificil:O.filter(_=>_.avaliacao==="dificil").length,total:0};V.total=V.facil+V.medio+V.dificil;const Y=new Set(f.map(_=>_.data_concluida)),G=Xs(Y,a),Q=[];for(let _=6;_>=0;_--)Q.push(Y.has(K(a,-_)));const ee=f.filter(_=>_.estagio==="consulta").length,J=f.filter(_=>_.avaliacao==="dificil"),te=Array.from(new Set(J.map(_=>_.nota_id))),g=await Promise.all(te.map(_=>t.get("notas",_))),L=new Map(g.filter(_=>!!_).map(_=>[_.id,_.tema_id])),y=new Map;for(const _ of J){const H=L.get(_.nota_id);H&&y.set(H,(y.get(H)??0)+1)}const m=Array.from(y.keys()),w=(await Promise.all(m.map(_=>t.get("temas",_)))).filter(_=>!!_).map(_=>({temaId:_.id,temaNome:_.nome,count:y.get(_.id)})).sort((_,H)=>H.count-_.count).slice(0,Js),q=r.filter(_=>_.perfil_id===e&&!_.excluido),I=q.filter(_=>!_.arquivado).length,U=(await Promise.all(q.map(_=>t.getAllFromIndex("temas","espaco_id",_.id)))).flat().filter(_=>!_.excluido),He=U.length,xe=(await Promise.all(U.map(_=>t.getAllFromIndex("notas","tema_id",_.id)))).flat().filter(_=>!_.excluido).length;return{revisoesHoje:v,revisoesUltimos7Dias:x,streakDias:G,diasAtivosUltimos7:Q,rankingDificeis:w,espacosAtivos:I,totalTemas:He,totalNotas:xe,itensEmConsulta:ee,porEstagio:C,tempoHojeSegundos:A,cargaProximos7:j,retencao30:V}}async function en(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("notas","tema_id",i.id)))).flat();return(await Promise.all(s.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat().reduce((i,c)=>i+(c.duracao_segundos??0),0)}async function tn(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,n)=>s+(n.duracao_segundos??0),0)}function Fa(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${p(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${p(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=n=>{n.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()})}const Xt=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}];function an(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function Oa(e,t,a,o){var s;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra testar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o);return}on(e,t,a,o)}function on(e,t,a,o){var s;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Voltar</button>
    </div>
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
        <h2 style="margin:0;">Avaliação aleatória — ${p(a)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse rápido com notas aleatórias, sem afetar sua fila de revisão. ${t.length} nota(s) no total — escolha quantas:
        </p>
        <div class="stack">
          ${Xt.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const i=Xt.find(r=>r.key===n.dataset.tier),c=an(t).slice(0,Math.min(i.n,t.length));mt(e,c,0,a,o)})})}function mt(e,t,a,o,s,n=!1){var c,r,d;if(a>=t.length){sn(e,t.length,o,s);return}const i=t[a];e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Encerrar avaliação</button>
    </div>
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${p(i.tema.nome)} · ${a+1} de ${t.length}</div>
      <div class="review-card__titulo">${i.nota.favorito?`${S.star} `:""}${p(i.nota.titulo||"(sem título)")}</div>
      ${n?`
        <div class="review-card__content markdown-preview">${Fe(i.nota.conteudo)}</div>
        <button class="btn btn--primary" id="btn-proxima" type="button">${a+1<t.length?"Próxima":"Terminar"}</button>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{mt(e,t,a,o,s,!0)}),(d=e.querySelector("#btn-proxima"))==null||d.addEventListener("click",()=>{mt(e,t,a+1,o,s,!1)})}function sn(e,t,a,o){var s;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${S.confete}</div>
      <h2 style="margin:0;">Repasse concluído</h2>
      <p class="text-muted" style="margin:0;">
        Você passou por ${t} nota(s) de ${p(a)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `,(s=e.querySelector("#btn-terminar"))==null||s.addEventListener("click",o)}function Ct(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${ne(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${R(t.colorKey)}"></span>`:""}${p(t.label)}`,n=a===e.length-1,i=t.route&&!n?`<button class="link" data-crumb="${p(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?i:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${i}`}).join("")}
    </div>
  `}function It(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>M(t.dataset.crumb))})}async function qe(e,t){var C,j,X,O,V,Y,G,Q,ee,J,te,g,L;const a=await qt(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await Pa(t),s=await nn(o.map(y=>y.id)),n=At(o),i=await La(a.perfil_id),c=Lt(o.map(y=>y.categoria)),r=[...o].sort((y,m)=>m.criado_em.localeCompare(y.criado_em))[0],d=((C=r==null?void 0:r.categoria)==null?void 0:C.trim())||void 0,u=((j=r==null?void 0:r.nome)==null?void 0:j.trim())||void 0,l=_a(a.cor,R(a.id)),b=ne(ge(a)),f=wa(n.map(y=>y.categoria));e.innerHTML=`
    ${Ct([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:b.chave,iconColor:l}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${l}" aria-hidden="true">${b.svg}</span>${p(a.nome)}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-editar" type="button">Editar</button>
        <button class="btn btn--secondary btn--sm" id="btn-arquivar" type="button" ${a.arquivado?"":'title="As revisões já agendadas continuam normalmente — só some da lista principal"'}>
          ${a.arquivado?"Reativar":"Arquivar"}
        </button>
        <a class="btn btn--secondary btn--sm" href="#/espacos/${p(a.id)}/pdf">PDF</a>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-detalhes" type="button">${S.info} Detalhes</button>
            <button id="btn-avaliar" type="button">${S.dice} Avaliação aleatória</button>
            <button id="btn-excluir" class="danger" type="button">Excluir espaço</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-espaco" style="display:none" class="card content-narrow">
      <div class="field">
        <label class="field__label" for="input-nome-espaco-editar">Nome</label>
        <input class="input" id="input-nome-espaco-editar" type="text" value="${p(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${p(a.categoria)}" maxlength="80" />
        ${Ie(i,"input-categoria-espaco-editar")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${Na({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao" type="button">Cancelar</button>
      </div>
    </div>

    ${a.arquivado?'<div class="banner banner--warning"><span>Este espaço está arquivado — não é possível criar novos temas ou notas nele, mas as revisões já agendadas continuam normalmente.</span></div>':""}

    ${a.arquivado?"":`
    <div id="form-novo-tema" style="display:none" class="card content-narrow">
      <p class="screen-hint" style="margin-top:0;">Um Tema é um assunto ou aula dentro deste Espaço — não precisa de categoria se não fizer sentido agrupar.</p>
      <div class="field">
        <label class="field__label" for="input-nome-tema">Nome do tema</label>
        <input class="input${u?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${p(u??"")}" />
        ${u?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema">Categoria (opcional)</label>
        <input class="input${d?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${p(d??"")}" />
        ${d?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${Ie(c,"input-categoria-tema")}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-tema" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-tema" type="button">Cancelar</button>
      </div>
    </div>
    <button class="btn btn--primary btn--sm" id="btn-novo-tema" type="button" style="margin-bottom: var(--space-5);">+ Novo tema</button>
    `}

    ${o.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.folder}</div>
        <div class="empty-state__title">Nenhum tema neste espaço ainda</div>
        <p class="empty-state__hint">Temas organizam as notas dentro de um espaço — ex: "Renda Fixa", "Renda Variável".</p>
        ${a.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-tema" type="button">Criar o primeiro tema</button>'}
      </div>
    `:n.map(y=>{const m=f.get(kt(y.categoria))??R(y.categoria||"sem-categoria"),$=ne(Da(y.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${m}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${m}" aria-hidden="true">${$.svg}</span>
            ${p(y.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${p(y.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${p(ps(y.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${y.itens.map(w=>`
            <button class="item-row" data-open="${p(w.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${m}">
              <span class="item-row__main">
                <span class="item-row__title">${w.favorito?`${S.star} `:""}${p(w.nome)}</span>
                <span class="item-row__meta">${s.get(w.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,It(e),Tt(e),ja(e,{prefix:"editar-espaco",getTexto:()=>{var y,m;return`${((y=e.querySelector("#input-nome-espaco-editar"))==null?void 0:y.value)??""} ${((m=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:m.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(y=>{y.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),M(`espacos/${t}/pdf/${y.dataset.pdfCategoria}`)})}),(X=e.querySelector("#btn-arquivar"))==null||X.addEventListener("click",async()=>{!a.arquivado&&!await ae({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await dt(a.id,!a.arquivado),qe(e,t))});const E=e.querySelector("#form-editar-espaco");(O=e.querySelector("#btn-editar"))==null||O.addEventListener("click",()=>{var y;E.style.display="block",(y=e.querySelector("#input-nome-espaco-editar"))==null||y.focus()}),(V=e.querySelector("#btn-cancelar-edicao"))==null||V.addEventListener("click",()=>{E.style.display="none"}),(Y=e.querySelector("#btn-salvar-edicao"))==null||Y.addEventListener("click",async()=>{const y=e.querySelector("#input-nome-espaco-editar").value.trim(),m=e.querySelector("#input-categoria-espaco-editar").value.trim();y&&(await Rs(a.id,y,m,za(e,"editar-espaco")),qe(e,t))}),(G=e.querySelector("#btn-detalhes"))==null||G.addEventListener("click",async()=>{const y=Array.from(s.values()).reduce((T,U)=>T+U,0),m=F(),$=await en(a.id);let w,q,I;if(a.arquivado&&a.arquivado_em){const T=ye(F(new Date(a.criado_em)),F(new Date(a.arquivado_em)));w=String(T),q="Dias até arquivar",I=`Criado em ${oe(a.criado_em)} · arquivado em ${oe(a.arquivado_em)}`}else if(a.arquivado)w="—",q="Duração",I=`Criado em ${oe(a.criado_em)} · arquivado antes desse registro de data existir`;else{const T=ye(F(new Date(a.criado_em)),m);w=String(T),q=T===1?"Dia ativo":"Dias ativo",I=`Criado em ${oe(a.criado_em)}`}Fa({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${o.length}</div>
            <div class="stat-tile__label">Temas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${y}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${wt($)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${w}</div>
            <div class="stat-tile__label">${q}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${I} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(Q=e.querySelector("#btn-avaliar"))==null||Q.addEventListener("click",async()=>{const y=await Bo(a.id);Oa(e,y,a.nome,()=>qe(e,t))}),(ee=e.querySelector("#btn-excluir"))==null||ee.addEventListener("click",async()=>{const y=await Ta(a.id);await ae({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o espaço com ${y.temas} tema(s) e ${y.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ma(a.id),M("espacos"))});const h=e.querySelector("#form-novo-tema"),v=()=>{var y;h&&(h.style.display="block"),(y=e.querySelector("#input-nome-tema"))==null||y.focus()};(J=e.querySelector("#btn-novo-tema"))==null||J.addEventListener("click",v),(te=e.querySelector("#btn-empty-novo-tema"))==null||te.addEventListener("click",v),(g=e.querySelector("#btn-cancelar-tema"))==null||g.addEventListener("click",()=>{h&&(h.style.display="none")});const A=e.querySelector("#input-nome-tema");u&&A&&A.addEventListener("input",()=>ve(A),{once:!0});const x=e.querySelector("#input-categoria-tema");d&&x&&x.addEventListener("input",()=>ve(x),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(y=>{y.addEventListener("click",m=>{var $;m.preventDefault(),m.stopPropagation(),h&&(h.style.display="block"),x&&(x.value=y.dataset.novoTemaCategoria,ve(x)),($=e.querySelector("#input-nome-tema"))==null||$.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(L=e.querySelector("#btn-salvar-tema"))==null||L.addEventListener("click",async()=>{const y=e.querySelector("#input-nome-tema"),m=e.querySelector("#input-categoria-tema"),$=y.value.trim();if(!$)return;const w=await Us(t,$,m.value.trim());M(`temas/${w.id}`)}),e.querySelectorAll("[data-open]").forEach(y=>{y.addEventListener("click",()=>M(`temas/${y.dataset.open}`))})}async function nn(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function rn(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(c=>!c.excluido),s=At(o),n=yt()==="titulo",i=[];for(const c of s){const r=[];for(const d of c.itens){const u=(await t.getAllFromIndex("notas","tema_id",d.id)).filter(b=>!b.excluido);n?ce(u,b=>b.titulo):u.sort((b,f)=>b.criado_em.localeCompare(f.criado_em));const l=[];for(const b of u){const E=(await t.getAllFromIndex("itens_revisao","nota_id",b.id)).map(h=>h.avaliacao).filter(h=>!!h);l.push({nota:b,fraca:Qs(E)})}r.push({tema:d,notas:l})}i.push({categoria:c.categoria,temas:r})}return{espaco:a,grupos:i}}function Ke(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Re.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const Qt=["•","◦","▪"];function Ha(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${Ke(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const n=Math.floor((t.length-t.trimStart().length)/2),i=Qt[Math.min(n,Qt.length-1)];return`${"  ".repeat(n)}${i} ${Ke(s[1])}`}return Ke(a)}).join(`
`)}function cn(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",Ha(e.conteudo)),t.join(`
`).trim()}function ln(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of t)if(o.temas.length!==0){a.push("",`▸ ${(o.categoria||"Sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.tema.favorito?"⭐ ":""}*${s.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const n of s.notas){const i=`${n.nota.favorito?"⭐ ":""}${n.fraca?"⚠ ":""}`;a.push("",`${i}*${n.nota.titulo||"(sem título)"}*`),n.nota.fonte&&a.push(`_${n.nota.fonte}_`),a.push(Ha(n.nota.conteudo))}}}return a.join(`
`).trim()}async function dn(e,t,a){var u,l;const o=await rn(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,n=a===void 0?o.grupos:o.grupos.filter(b=>b.categoria===a),i=ln(s,n),c=_a(s.cor,R(s.id)),r=ne(ge(s));e.innerHTML=`
    <div class="pdf-toolbar no-print">
      <button class="btn btn--secondary btn--sm" data-back type="button">← Voltar</button>
      <button class="btn btn--primary btn--sm" id="btn-imprimir" type="button">Imprimir / Salvar como PDF</button>
      <button class="btn btn--secondary btn--sm" id="btn-copiar" type="button">Copiar texto</button>
      <span class="text-muted" style="font-size: var(--font-size-sm);">
        "Imprimir" e depois "Salvar como PDF" (ou similar) gera o arquivo. "Copiar texto" é pra colar direto numa conversa, ex: WhatsApp.
      </span>
    </div>

    <article class="pdf-page">
      <h1>
        <span class="espaco-icon-inline" style="--badge-accent:${c}" aria-hidden="true">${r.svg}</span>${p(s.nome)}
      </h1>
      <p class="pdf-meta">
        ${a!==void 0?`Categoria: ${p(a||"Sem categoria")} · `:""}Gerado em ${oe(F()+"T00:00:00Z")}
      </p>

      ${n.every(b=>b.temas.length===0)?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:n.map(b=>{const f=b.categoria?b.categoria.toLowerCase():s.id;return`
        <section class="pdf-category" style="--cat-accent:${R(f)}">
          <div class="pdf-category__title">
            <span class="color-dot" style="--dot-color:${R(f)}"></span>${p(b.categoria||"Sem categoria")}
          </div>
          ${b.temas.map(E=>{const h=E.tema.categoria?E.tema.categoria.toLowerCase():E.tema.id;return`
            <section class="pdf-tema" style="--tema-accent:${R(h)}">
              <div class="pdf-tema__title">${E.tema.favorito?`${S.star} `:""}${p(E.tema.nome)}</div>
              ${E.notas.length===0?'<p class="text-muted">Sem notas.</p>':E.notas.map(v=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${v.nota.favorito?`${S.star} `:""}${v.fraca?`${S.alert} Reforçar — `:""}${p(v.nota.titulo||"(sem título)")}
                  </div>
                  ${v.nota.fonte?`<div class="pdf-nota__meta">${p(v.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${Fe(v.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `}).join("")}
        </section>
      `}).join("")}
    </article>
  `,(u=e.querySelector("[data-back]"))==null||u.addEventListener("click",()=>M(`espacos/${t}`)),(l=e.querySelector("#btn-imprimir"))==null||l.addEventListener("click",()=>window.print());const d=e.querySelector("#btn-copiar");d==null||d.addEventListener("click",async()=>{const b=d.textContent;try{await navigator.clipboard.writeText(i),d.textContent="Copiado!"}catch{d.textContent="Não foi possível copiar"}setTimeout(()=>{d.textContent=b},1800)})}async function Te(e,t){var d,u,l,b,f,E,h,v,A;const a=await Ra(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await qt(a.espaco_id),s=await pa(t),n=o?await Pa(o.id):[],i=Lt(n.map(x=>x.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${Ct([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${R(c)}"></span>${a.favorito?`${S.star} `:""}${p(a.nome)}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-favoritar-tema" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
          ${a.favorito?"★ Favorito":"☆ Favoritar"}
        </button>
        <button class="btn btn--secondary btn--sm" id="btn-editar-tema" type="button">Editar</button>
        ${o!=null&&o.arquivado?"":'<button class="btn btn--primary btn--sm" id="btn-nova-nota" type="button">+ Nova nota</button>'}
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-detalhes-tema" type="button">${S.info} Detalhes</button>
            <button id="btn-avaliar-tema" type="button">${S.dice} Avaliação aleatória</button>
            <button id="btn-excluir-tema" class="danger" type="button">Excluir tema</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-tema" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-nome-tema-editar">Nome</label>
        <input class="input" id="input-nome-tema-editar" type="text" value="${p(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-tema-editar" type="text" value="${p(a.categoria)}" maxlength="80" />
        ${Ie(i,"input-categoria-tema-editar")}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${o!=null&&o.arquivado?`<div class="banner banner--warning"><span>O espaço "${p(o.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`:""}

    ${s.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${o!=null&&o.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>'}
      </div>
    `:`
      <div class="item-list">
        ${s.map(x=>`
          <button class="item-row" data-open="${p(x.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${R(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${x.favorito?`${S.star} `:""}${p(x.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${p(x.fonte||"Sem fonte")}${x.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${x.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,It(e),Tt(e),(d=e.querySelector("#btn-nova-nota"))==null||d.addEventListener("click",()=>M(`temas/${t}/nova-nota`)),(u=e.querySelector("#btn-empty-nova-nota"))==null||u.addEventListener("click",()=>M(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(x=>{x.addEventListener("click",()=>M(`notas/${x.dataset.open}`))}),(l=e.querySelector("#btn-favoritar-tema"))==null||l.addEventListener("click",async()=>{await Ks(a.id),Te(e,t)}),(b=e.querySelector("#btn-detalhes-tema"))==null||b.addEventListener("click",async()=>{const x=await tn(a.id),C=ye(F(new Date(a.criado_em)),F());Fa({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${wt(x)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${C}</div>
            <div class="stat-tile__label">${C===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${oe(a.criado_em)}</p>
      `})}),(f=e.querySelector("#btn-avaliar-tema"))==null||f.addEventListener("click",()=>{const x=s.map(C=>({nota:C,tema:a}));Oa(e,x,a.nome,()=>Te(e,t))});const r=e.querySelector("#form-editar-tema");(E=e.querySelector("#btn-editar-tema"))==null||E.addEventListener("click",()=>{var x;r.style.display="block",(x=e.querySelector("#input-nome-tema-editar"))==null||x.focus()}),(h=e.querySelector("#btn-cancelar-edicao-tema"))==null||h.addEventListener("click",()=>{r.style.display="none"}),(v=e.querySelector("#btn-salvar-edicao-tema"))==null||v.addEventListener("click",async()=>{const x=e.querySelector("#input-nome-tema-editar").value.trim(),C=e.querySelector("#input-categoria-tema-editar").value.trim();x&&(await Gs(a.id,x,C),Te(e,t))}),(A=e.querySelector("#btn-excluir-tema"))==null||A.addEventListener("click",async()=>{const x=await Ws(a.id);await ae({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o tema com ${x.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Zs(a.id),M(`espacos/${a.espaco_id}`))})}function Se(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${p(e)}</div>
    </details>
  `}let Oe=!1,pt=null;function un(e){Oe=e}function Jt(){Oe=!1}function mn(e){pt=e}function he(){return Oe?pt?pt():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function pn(){window.addEventListener("beforeunload",e=>{Oe&&(e.preventDefault(),e.returnValue="")})}const vn={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function We(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function De(e,t){var Q,ee,J,te,g,L,y;const a=t.mode==="nova"?t.temaId:(Q=await Vt(t.notaId))==null?void 0:Q.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await Ra(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await qt(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${p(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(ee=e.querySelector("#btn-voltar-arquivado"))==null||ee.addEventListener("click",()=>M(`temas/${a}`));return}const n=t.mode==="editar"?await Vt(t.notaId):void 0,i=n?await fn(n.id):!1,c=t.mode==="nova"?(await pa(a)).at(-1):void 0,r=c==null?void 0:c.titulo,d=c==null?void 0:c.fonte;e.innerHTML=`
    ${Ct([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(n==null?void 0:n.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&n?`<div class="section-header__meta text-muted">Criada em ${oe(n.criado_em)}${n.atualizado_em!==n.criado_em?` · Editada em ${oe(n.atualizado_em)}`:""}</div>`:""}
      </div>
      ${t.mode==="editar"?`
        <div class="section-header__actions">
          <button class="btn btn--secondary btn--sm" id="btn-favoritar-nota" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
            ${n!=null&&n.favorito?"★ Favorito":"☆ Favoritar"}
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-compartilhar-nota" type="button" title="Compartilhar o texto desta nota">
            Compartilhar
          </button>
          <details class="item-menu">
            <summary aria-label="Mais opções">⋯</summary>
            <div class="item-menu__panel">
              <button id="btn-excluir-nota" class="danger" type="button">Excluir nota</button>
            </div>
          </details>
        </div>
      `:""}
    </div>

    <p class="screen-hint">Título = o que puxa sua memória · Conteúdo = a explicação completa · Fonte = de onde veio.</p>

    ${t.mode==="editar"&&n&&!n.titulo_revisado?'<div class="banner banner--warning"><span>Esta nota foi migrada automaticamente — revise o título abaixo (hoje ele é uma cópia da Fonte antiga).</span></div>':""}

    <div class="content-narrow content-wide">
    <div class="card stack">
      <div class="field">
        <label class="field__label" for="input-titulo">Título${Se('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${r?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${p((n==null?void 0:n.titulo)??r??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${r?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${Se("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${d?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${p((n==null?void 0:n.fonte)??d??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${d?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${Se("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
        <div class="editor-toolbar" role="toolbar" aria-label="Formatação do conteúdo">
          <button type="button" class="editor-toolbar__btn" data-cmd="bold" title="Negrito (Ctrl+B)" aria-label="Negrito"><strong>N</strong></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="italic" title="Itálico (Ctrl+I)" aria-label="Itálico"><em>I</em></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="underline" title="Sublinhado (Ctrl+U)" aria-label="Sublinhado"><u>U</u></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="strikeThrough" title="Tachado (Ctrl+S)" aria-label="Tachado"><s>S</s></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="insertUnorderedList" title="Lista com marcadores (Tab indenta, Shift+Tab volta)" aria-label="Lista com marcadores">☰</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="createLink" title="Link (Ctrl+K)" aria-label="Link">🔗</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="removeFormat" title="Limpar formatação" aria-label="Limpar formatação">⌫</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <button type="button" class="editor-toolbar__btn" data-cmd="undo" title="Desfazer (Ctrl+Z)" aria-label="Desfazer">${S.undo}</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="redo" title="Refazer (Ctrl+Y ou Ctrl+Shift+Z)" aria-label="Refazer">${S.redo?S.redo:S.undo}</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <div class="color-picker" role="group" aria-label="Cor do texto">
            ${Re.map(m=>`<button type="button" class="color-picker__swatch" data-cor="${m}" style="--dot-color:${vn[m]}" title="${p(Gt[m])}" aria-label="${p(Gt[m])}"></button>`).join("")}
            <button type="button" class="editor-toolbar__btn" data-cor-limpar title="Remover cor" aria-label="Remover cor">✕</button>
          </div>
        </div>
        <div
          class="markdown-preview editor-conteudo"
          id="input-conteudo"
          contenteditable="true"
          spellcheck="true"
          autocorrect="on"
          autocapitalize="sentences"
          lang="pt-BR"
          data-placeholder="Escreva aqui a explicação completa..."
        >${n!=null&&n.conteudo?Fe(n.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${n!=null&&n.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${Se("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
        </div>
      </div>

      <div class="field" id="wrapper-validade" style="display:${n!=null&&n.pode_desatualizar?"flex":"none"};">
        <label class="field__label" for="input-validade">Válido até</label>
        <input class="input" id="input-validade" type="date" value="${p((n==null?void 0:n.validade_ate)??"")}" style="max-width: 200px;" />
      </div>

      <div class="form-actions">
        <button class="btn btn--primary" id="btn-salvar" type="button">Salvar</button>
        <button class="btn btn--secondary" id="btn-cancelar" type="button">Cancelar</button>
      </div>
    </div>

    ${t.mode==="editar"&&n?`
      <div class="card stack" style="margin-top: var(--space-5);">
        <div class="settings-row__label">Revisão</div>
        ${i?`
          <p class="text-muted">Essa nota está na fila de revisão normalmente.</p>
          <div class="form-actions">
            <button class="btn btn--secondary btn--sm" id="btn-parar-revisar" type="button">Parar de revisar</button>
          </div>
        `:'<p class="text-muted">Essa nota não está mais na fila de revisão (estágio "consulta").</p>'}
      </div>
    `:""}
    </div>
  `;const u=`temas/${a}`;It(e),(J=e.querySelector("#btn-cancelar"))==null||J.addEventListener("click",()=>{he()&&(Jt(),M(u))});const l=e.querySelector("#input-conteudo"),b=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),E=()=>un(!0);b.addEventListener("input",E),f.addEventListener("input",E),l.addEventListener("input",E),mn(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),r&&b.addEventListener("input",()=>ve(b),{once:!0}),d&&f.addEventListener("input",()=>ve(f),{once:!0}),l.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function h(m){var w,q;let $=((q=(w=window.getSelection())==null?void 0:w.getRangeAt(0))==null?void 0:q.commonAncestorContainer)??null;for(;$&&$!==l;){if($ instanceof HTMLElement&&$.tagName===m)return!0;$=$.parentNode}return!1}function v(){const m=window.getSelection();if(!m||m.rangeCount===0)return;let $=m.getRangeAt(0).commonAncestorContainer;for(;$&&$!==l;){if($ instanceof HTMLElement&&$.tagName==="LI"){const w=document.createRange();w.selectNodeContents($),w.collapse(!1),m.removeAllRanges(),m.addRange(w);return}$=$.parentNode}}function A(){l.querySelectorAll("p").forEach(m=>{m.querySelector("ul")&&m.replaceWith(...Array.from(m.childNodes))})}function x(){const m=window.getSelection(),$=m.getRangeAt(0);$.deleteContents();const w=document.createElement("br");$.insertNode(w);const q=document.createTextNode("​");w.after(q);const I=document.createRange();return I.setStart(q,1),I.collapse(!0),m.removeAllRanges(),m.addRange(I),{br:w,ancora:q}}function C(){if(!j)return;const{br:m,ancora:$}=j;if(j=null,!document.contains($))return;const w=$.parentNode;if(!w)return;const q=Array.from(w.childNodes).indexOf($);$.remove();const I=window.getSelection();if(!I||!document.contains(m))return;const T=document.createRange();T.setStart(w,q),T.collapse(!0),I.removeAllRanges(),I.addRange(T)}let j=null;l.addEventListener("keydown",m=>{if(m.key!=="Enter"||m.shiftKey||m.ctrlKey||m.metaKey||m.altKey||h("LI")){j=null;return}m.preventDefault(),j&&document.contains(j.br)?(j.ancora.remove(),j.br.remove(),document.execCommand("insertParagraph"),j=null):j=x()}),l.addEventListener("mousedown",()=>{j=null}),l.addEventListener("keydown",m=>{m.key!=="Tab"||!h("LI")||(m.preventDefault(),C(),document.execCommand(m.shiftKey?"outdent":"indent"),A())});function X(){var m;l.classList.toggle("is-empty",!((m=l.textContent)!=null&&m.trim()))}l.addEventListener("input",()=>{if(l.childNodes.length===0){l.innerHTML="<p><br></p>";const m=l.firstChild,$=document.createRange();$.setStart(m,0),$.collapse(!0);const w=window.getSelection();w==null||w.removeAllRanges(),w==null||w.addRange($)}X()}),X(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(m=>{m.addEventListener("mousedown",$=>$.preventDefault()),m.addEventListener("click",()=>{C();const $=m.dataset.cmd;if($==="strikeThrough")document.execCommand("strikeThrough");else if($==="createLink"){const w=window.getSelection();if(!w||w.isCollapsed){l.focus();return}const q=prompt("URL do link:","https://");q&&q.trim()&&document.execCommand("createLink",!1,q.trim())}else $==="removeFormat"?document.execCommand("removeFormat"):document.execCommand($);$==="insertUnorderedList"&&(A(),v()),l.focus(),G()})}),e.querySelectorAll(".color-picker__swatch").forEach(m=>{m.addEventListener("mousedown",$=>$.preventDefault()),m.addEventListener("click",()=>{C();const $=m.dataset.cor,w=window.getSelection();if(!w||w.rangeCount===0||w.isCollapsed)return;const q=w.getRangeAt(0);if(!l.contains(q.commonAncestorContainer))return;const I=q.extractContents();We(I);const T=document.createElement("span");T.className=`text-color text-color--${$}`,T.appendChild(I),q.insertNode(T),w.removeAllRanges();const U=document.createRange();U.selectNodeContents(T),w.addRange(U),l.focus()})});const O=e.querySelector("[data-cor-limpar]");O.addEventListener("mousedown",m=>m.preventDefault()),O.addEventListener("click",()=>{C();const m=window.getSelection();if(!m||m.rangeCount===0)return;const $=m.getRangeAt(0);if(l.contains($.commonAncestorContainer)){if($.collapsed){let w=$.commonAncestorContainer;for(;w&&w!==l;){if(w instanceof HTMLElement&&w.classList.contains("text-color")){const q=w.parentNode;if(q){const I=document.createDocumentFragment();Array.from(w.childNodes).forEach(T=>I.appendChild(T)),q.replaceChild(I,w),We(q)}break}w=w.parentNode}}else{const w=$.extractContents();We(w),$.insertNode(w)}l.focus()}});const V=e.querySelector("#input-pode-desatualizar"),Y=e.querySelector("#wrapper-validade");V.addEventListener("change",()=>{Y.style.display=V.checked?"flex":"none"});function G(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach($=>{const w=$.dataset.cmd;try{w==="bold"||w==="italic"||w==="underline"||w==="strikeThrough"||w==="insertUnorderedList"?$.setAttribute("aria-pressed",document.queryCommandState(w)?"true":"false"):$.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===l&&G()}),l.addEventListener("keyup",G),l.addEventListener("mouseup",G),l.addEventListener("focus",G),l.addEventListener("keydown",m=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?m.metaKey:m.ctrlKey))return;let q=!0;switch(m.key.toLowerCase()){case"b":m.preventDefault(),document.execCommand("bold");break;case"i":m.preventDefault(),document.execCommand("italic");break;case"u":m.preventDefault(),document.execCommand("underline");break;case"s":m.preventDefault(),document.execCommand("strikeThrough");break;case"k":m.preventDefault(),C();const I=window.getSelection();if(I&&!I.isCollapsed){const T=prompt("URL do link:","https://");T&&T.trim()&&document.execCommand("createLink",!1,T.trim())}break;case"z":m.preventDefault(),m.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":m.preventDefault(),document.execCommand("redo");break;default:q=!1}q&&G()}),(te=e.querySelector("#btn-salvar"))==null||te.addEventListener("click",async()=>{const m=b.value.trim(),$=qs(l).trim();let w=null;const q=(U,He)=>{var xe;U.classList.add("input--error"),U.setAttribute("aria-invalid","true");const Ee=(xe=U.closest(".field"))==null?void 0:xe.querySelector(".field__error");Ee&&(Ee.textContent=He,Ee.style.display="block"),w||(w=U)},I=U=>{U.classList.remove("input--error"),U.removeAttribute("aria-invalid")};if(m||q(b,"Informe um título para a nota."),$||q(l,"Informe o conteúdo da nota."),w){w.focus();return}I(b),I(l);const T={titulo:m,conteudo:$,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:V.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await Vo(a,T):await Uo(t.notaId,T),Jt(),M(u)}),t.mode==="editar"&&n){(g=e.querySelector("#btn-favoritar-nota"))==null||g.addEventListener("click",async()=>{await Go(n.id),De(e,t)}),(L=e.querySelector("#btn-parar-revisar"))==null||L.addEventListener("click",async()=>{await ks(n.id),De(e,t)});const m=e.querySelector("#btn-compartilhar-nota");m==null||m.addEventListener("click",async()=>{const $=cn(n);if(navigator.share){try{await navigator.share({title:n.titulo||"Nota",text:$})}catch{}return}const w=m.textContent;try{await navigator.clipboard.writeText($),m.textContent="Copiado!"}catch{m.textContent="Não foi possível copiar"}setTimeout(()=>{m.textContent=w},1800)}),(y=e.querySelector("#btn-excluir-nota"))==null||y.addEventListener("click",async()=>{await ae({title:"Excluir esta nota?",message:"A nota vai pra Lixeira e dá pra restaurar em Configurações → Lixeira por até 30 dias."})&&(await Ko(n.id),M(u))})}}async function fn(e){return(await(await k()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function gn(e){return e.length===10?e:F(new Date(e))}function bn(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function hn(e){const t=new Set;for(const a of e)a&&t.add(gn(a));return t}function Ba(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Ze(e){return e.size}function yn(e,t,a=365,o=F()){const s=K(o,-a+1),n=[];let i=s;for(;i<=o;)n.push({date:i,count:(e.has(i)?1:0)+(t.has(i)?1:0),hasRevisao:e.has(i),hasCriacao:t.has(i)}),i=K(i,1);const c=Ze(e),r=Ze(t),d=Ze(Ba(e,t));return{days:n,totalDiasRevisao:c,totalDiasCriacao:r,totalDiasAtividade:d}}async function Va(e){const t=await k(),a=F(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const x=await t.getAllFromIndex("espacos","perfil_id",e),j=(await Promise.all(x.map(O=>t.getAllFromIndex("temas","espaco_id",O.id)))).flat();return(await Promise.all(j.map(O=>t.getAllFromIndex("notas","tema_id",O.id)))).flat()})()]),n=o.filter(x=>x.data_concluida).map(x=>x.data_concluida),i=bn(n),c=hn(s.map(x=>x.criado_em)),r=o.filter(x=>x.data_concluida===a).length,d=s.filter(x=>F(new Date(x.criado_em))===a).length,u=a.slice(0,4),l=a.slice(5,7),b=`${u}-${l}`,f=n.filter(x=>x.startsWith(b)).length,E=s.filter(x=>F(new Date(x.criado_em)).startsWith(b)).length,h=i.size,v=c.size,A=Ba(i,c).size;return{datasRevisaoSet:i,datasCriacaoSet:c,totalDiasRevisao:h,totalDiasCriacao:v,totalDiasAtividade:A,notasCriadasHoje:d,revisoesFeitasHoje:r,notasCriadasEsteMes:E,revisoesFeitasEsteMes:f}}async function _n(e,t=365){const a=await Va(e);return yn(a.datasRevisaoSet,a.datasCriacaoSet,t)}function wn(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function $n(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const n=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let r=0;r<n;r++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const r of e)s.push(r),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(r=>`
          <div class="heatmap__col">
            ${r.map(d=>`
              <div class="heatmap__cell heatmap__cell--${wn(d.count)}${d.date?"":" heatmap__cell--empty"}" title="${d.date?`${d.date}${d.count?` · ${d.count} atividade(s)`:""}${d.hasRevisao&&d.hasCriacao?" (revisão + criação)":d.hasRevisao?" (revisão)":d.hasCriacao?" (criação)":""}`:""}"></div>
            `).join("")}
          </div>
        `).join("")}
      </div>
      <div class="heatmap__legend">
        <span class="text-muted">Menor</span>
        <span class="heatmap__cell heatmap__cell--0"></span>
        <span class="heatmap__cell heatmap__cell--1"></span>
        <span class="heatmap__cell heatmap__cell--2"></span>
        <span class="heatmap__cell heatmap__cell--3"></span>
        <span class="heatmap__cell heatmap__cell--4"></span>
        <span class="text-muted">Maior</span>
      </div>
      <p class="screen-hint" style="margin: var(--space-2) 0 0;">
        ${p(String(t))} dias estudados · ${p(String(a))} dias com criação de notas · ${p(String(e.filter(r=>r.count>0).length))} dias com atividade nos últimos ${p(String(e.length))} dias
      </p>
    </div>
  `}const En={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function xn(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Sn(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function kn(e,t){const a=await Ys(t.perfilId),o=await Va(t.perfilId),s=await _n(t.perfilId,365),n=["dom","seg","ter","qua","qui","sex","sáb"],i=new Date().getDay(),c=Math.max(1,...a.cargaProximos7.map(d=>d.count)),r=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null;e.innerHTML=`
    <div class="tabs" role="tablist" aria-label="Painel">
      <button class="tabs__tab" role="tab" aria-selected="true" data-tab="visao">Visão geral</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="evolucao">Evolução</button>
    </div>

    <div id="tab-visao" role="tabpanel">
      <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

      <div class="streak-hero">
        <div class="streak-hero__flame" aria-hidden="true">${S.flame}</div>
        <div class="streak-hero__count">${a.streakDias}</div>
        <div class="streak-hero__label">${a.streakDias===1?"dia seguido estudando":"dias seguidos estudando"}</div>
        <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${a.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
          ${a.diasAtivosUltimos7.map((d,u)=>{const l=(i-(6-u)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${d?"streak-hero__day--ativo":""}"></span>
                  <span class="streak-hero__day-label">${n[l]}</span>
                </span>
              `}).join("")}
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-tile">
          <div class="stat-tile__value">${a.revisoesHoje}</div>
          <div class="stat-tile__label">Revisões hoje</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${wt(a.tempoHojeSegundos)}</div>
          <div class="stat-tile__label">Tempo hoje</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${a.revisoesUltimos7Dias}</div>
          <div class="stat-tile__label">Revisões (últimos 7 dias)</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${a.streakDias}</div>
          <div class="stat-tile__label">Dias seguidos</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${a.espacosAtivos}</div>
          <div class="stat-tile__label">Espaços ativos</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${a.totalTemas}</div>
          <div class="stat-tile__label">Temas</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${a.totalNotas}</div>
          <div class="stat-tile__label">Notas</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${a.itensEmConsulta}</div>
          <div class="stat-tile__label">Aposentadas</div>
        </div>
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Onde suas notas estão na escada</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Quantas notas pendentes estão hoje em cada estágio — quanto mais em 30/180 dias, melhor sua retenção.</p>
      <div class="stage-grid">
        ${a.porEstagio.map(d=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${d.count}</div>
            <div class="stage-tile__label">${En[d.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${S.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(d=>`${d.count} em ${Sn(d.data)}`).join(", ")}">
        ${a.cargaProximos7.map(d=>{const u=xn(d.data);return`
            <div class="load-chart__col">
              <div class="load-chart__val">${d.count}</div>
              <div class="load-chart__bar">
                <div class="load-chart__fill" style="height: ${d.count/c*100}%"></div>
              </div>
              <div class="load-chart__label">${u}</div>
            </div>
          `}).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Retenção · últimos 30 dias</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">% de Fácil, Médio e Difícil nas revisões feitas — o quanto você realmente está lembrando.</p>
      ${a.retencao30.total===0?'<p class="text-muted">Ainda não há avaliações em 30 dias.</p>':`
        <div class="retention-bar" role="img" aria-label="Fácil ${r.facil}%, Médio ${r.medio}%, Difícil ${r.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${r.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${r.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${r.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${r.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${r.medio}%</span>
          <span class="badge badge--success">Fácil ${r.facil}%</span>
          <span class="text-muted" style="font-size: var(--font-size-xs);">${a.retencao30.total} avaliada(s)</span>
        </div>
      `}

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Temas com mais "Difícil"</span>
      </div>
      ${a.rankingDificeis.length===0?'<p class="text-muted">Nenhuma avaliação "Difícil" registrada ainda.</p>':`
        <div class="rank-list">
          ${a.rankingDificeis.map((d,u)=>`
            <div class="rank-row">
              <span>${u+1}. ${p(d.temaNome)}</span>
              <span class="badge badge--danger">${d.count}× difícil</span>
            </div>
          `).join("")}
        </div>
      `}
    </div>

    <div id="tab-evolucao" role="tabpanel" style="display:none;">
      <p class="screen-hint" style="margin-top:0;">Quanto você estuda (revisões) e o ritmo de inclusão de notas ao longo do tempo.</p>

      <div class="stat-grid">
        <div class="stat-tile">
          <div class="stat-tile__value">${o.totalDiasRevisao}</div>
          <div class="stat-tile__label">Total de dias estudados</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${o.totalDiasAtividade}</div>
          <div class="stat-tile__label">Total de dias com atividade</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${o.revisoesFeitasHoje}</div>
          <div class="stat-tile__label">Revisões hoje</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${o.notasCriadasHoje}</div>
          <div class="stat-tile__label">Notas criadas hoje</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${o.revisoesFeitasEsteMes}</div>
          <div class="stat-tile__label">Revisões neste mês</div>
        </div>
        <div class="stat-tile">
          <div class="stat-tile__value">${o.notasCriadasEsteMes}</div>
          <div class="stat-tile__label">Notas criadas neste mês</div>
        </div>
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Atividade nos últimos 365 dias</span>
      </div>
      ${$n(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `,e.querySelectorAll(".tabs__tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(u=>{u.setAttribute("aria-selected",String(u===d))}),e.querySelector("#tab-visao").style.display=d.dataset.tab==="visao"?"block":"none",e.querySelector("#tab-evolucao").style.display=d.dataset.tab==="evolucao"?"block":"none"})})}async function An(e){const t=await k(),a=(await t.getAllFromIndex("espacos","perfil_id",e)).filter(d=>!d.excluido),o=await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id))),s=[],n=[],i=new Map;for(let d=0;d<a.length;d++){const u=a[d],l=o[d].filter(b=>!b.excluido);for(const b of l)i.set(b.id,u),b.favorito&&s.push({tema:b,espaco:u})}const c=o.flat().filter(d=>!d.excluido),r=await Promise.all(c.map(d=>t.getAllFromIndex("notas","tema_id",d.id)));for(let d=0;d<c.length;d++){const u=c[d],l=r[d].filter(f=>!f.excluido),b=i.get(u.id);if(b)for(const f of l)f.favorito&&n.push({nota:f,tema:u,espaco:b})}return{temas:ce(s,d=>d.tema.nome),notas:ce(n,d=>d.nota.titulo||d.tema.nome)}}async function Ln(e,t){var d;const{temas:a,notas:o}=await An(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>M("espacos"));return}const s=new Map;for(const u of a){const l=s.get(u.espaco.id)??{espaco:u.espaco,itens:[]};l.itens.push(u),s.set(u.espaco.id,l)}const n=new Map;for(const u of o){const l=n.get(u.tema.id)??{temaNome:u.tema.nome,espaco:u.espaco,itens:[]};l.itens.push(u),n.set(u.tema.id,l)}const i=new Map;for(const u of a)i.set(u.espaco.id,u.espaco);for(const u of o)i.set(u.espaco.id,u.espaco);const c=$a([...i.values()]),r=u=>{const l=c.get(u.id)??R(u.id),b=ne(ge(u));return`<span class="espaco-icon-inline" style="--badge-accent:${l}" aria-hidden="true">${b.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??R(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${p(u.espaco.nome)}
          </div>
          <div class="item-list">
            ${u.itens.map(l=>`
              <button class="item-row" data-tema="${p(l.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??R(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${S.star} ${p(l.tema.nome)}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}

    ${o.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${a.length>0?"var(--space-6)":"0"};">Notas favoritas</div>
      ${Array.from(n.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??R(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${p(u.temaNome)} <span class="queue-group__espaco"> · ${p(u.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${u.itens.map(l=>`
              <button class="item-row" data-nota="${p(l.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??R(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${S.star} ${p(l.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${p(l.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(u=>{u.addEventListener("click",()=>M(`temas/${u.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(u=>{u.addEventListener("click",()=>M(`notas/${u.dataset.nota}`))})}const qn=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Tn=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,Mn=`Espaço: MGD9 (categoria: Cursos)
  Tema: Módulo 1 — Fundamentos (categoria: Fundamentos)
    Nota → Título: "O que a aula 1 explica sobre X?"
           Conteúdo: resumo da aula 1
           Fonte: "Aula 1"
    Nota → Título: "O que a aula 2 explica sobre Y?"
           Conteúdo: resumo da aula 2
           Fonte: "Aula 2"
  Tema: Módulo 2 — Avançado (categoria: Avançado)
    Nota → Título: "O que a aula 1 do módulo 2 explica?"
           Conteúdo: resumo da aula
           Fonte: "Aula 1"`,Cn=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
      anotações e sua fila de revisão não se misturam com a de outra pessoa. Exemplo: no
      laptop de casa, Fernando e a esposa têm perfis separados; no celular de cada um, só
      existe o próprio perfil.</p>`},{titulo:'Espaços — a "gaveta" de cada assunto grande',corpoHtml:`<p>Um Espaço é a categoria mais ampla de tudo que você quer aprender: um curso,
      um livro, um estudo contínuo. Exemplos reais:</p>
      <ul>
        <li>"Curso de Investimentos" — um curso com começo, meio e fim.</li>
        <li>"Livro: Quem Pensa Enriquece" — um livro que você está lendo, também vai terminar.</li>
        <li>"Bíblia" — um estudo que nunca termina, sempre vai existir.</li>
      </ul>
      <p>Use a <strong>categoria</strong> do Espaço para agrupar por tipo — ex: categoria
      "Cursos" para o curso de investimentos, categoria "Livros" para os livros, categoria
      "Bíblia" pra estudos bíblicos. Essas três já aparecem sugeridas na hora de criar um
      Espaço novo, mesmo antes de você ter usado alguma — mas é só sugestão, digite o que
      quiser. Assim que você tiver mais de um curso ou mais livros, a tela de Espaços continua
      organizada em vez de virar uma lista solta.</p>
      <p>Cada Espaço também tem um <strong>ícone</strong> e uma <strong>cor</strong> — escolha na
      hora de criar (ou depois, em Editar). Conforme você digita o nome/categoria, o app sugere
      ícones prováveis (ex: "Bíblia" → igreja, "Curso" → capa de formatura, "Livro" → pilha de
      livros). A cor ajuda a bater o olho e achar cada Espaço mais rápido.</p>`},{titulo:"Temas — os assuntos/aulas dentro de um Espaço",corpoHtml:`<p>Dentro de um Espaço, um Tema é um assunto específico ou uma aula. Exemplo
      real: dentro do Espaço "Curso de Investimentos", os Temas "Riscos" e "Vieses" são
      aulas de um mesmo módulo. Use a <strong>categoria</strong> do Tema pra marcar o
      módulo — ex: categoria "Faixa Branca" nos dois, porque são do mesmo módulo do curso.
      No dia seguinte, quando a aula for sobre outro assunto do mesmo módulo, crie um Tema
      novo com a mesma categoria. As categorias sugeridas aqui são só as já usadas <strong>
      neste mesmo Espaço</strong> — o "Faixa Branca" de um curso não aparece sugerido dentro
      de outro curso diferente, pra não misturar vocabulário de assuntos que não têm nada a
      ver. Pra ajudar a lembrar como foi feito da última vez, os campos Nome e Categoria já
      vêm preenchidos com os do último Tema criado neste Espaço — aparecem em <strong>laranja
      </strong> pra deixar claro que é só uma sugestão a conferir, não um valor já
      confirmado.</p>
      <p>No menu "⋯" de um Tema tem os mesmos dois atalhos que existem no nível do Espaço:
      <strong>Detalhes</strong> (quantas notas, tempo total revisando e há quantos dias esse
      Tema existe) e <strong>Avaliação aleatória</strong> (repasse rápido só com as notas
      deste Tema, sem afetar a fila de revisão).</p>`},{titulo:"Notas — o que você anota",corpoHtml:`<p>Cada Nota tem três partes, e a diferença entre elas importa:</p>
      <ul>
        <li><strong>Título</strong>: uma frase curta ou pergunta que puxa sua memória, antes
        de você ver a resposta. Exemplo: "O que é Duration e Convexity?" — não escreva algo
        vago aqui, tipo só "Aula 4", porque é isso que aparece primeiro na hora de revisar,
        pra você tentar lembrar antes de ver a resposta.</li>
        <li><strong>Conteúdo</strong>: a explicação completa, o que você realmente aprendeu.
        Exemplo: "Duration mede a sensibilidade do preço de um título à mudança na taxa de
        juros; Convexity mede como essa sensibilidade muda..." (aparece só depois que você
        tenta lembrar).</li>
        <li><strong>Fonte</strong>: de onde veio, pra referência. Exemplo: "Aula 4, slide 12"
        ou "Livro, página 87". Aparece junto com o conteúdo, não antes.</li>
      </ul>
      <p>Ao criar uma Nota nova, Título e Fonte já vêm preenchidos (em <strong>laranja</strong>)
      com o que foi usado na última Nota deste mesmo Tema — útil quando o padrão se repete,
      tipo "Aula 1", "Aula 2"... Edite antes de salvar; assim que você digitar algo, a cor
      laranja some.</p>
      <p>O campo <strong>Conteúdo</strong> é um editor de texto simples: selecione um trecho
      e use os botões acima dele — <strong>N</strong> para negrito, <em>I</em> para itálico,
      ☰ pra transformar a linha numa lista com marcadores, ou uma das bolinhas de cor
      (azul, vermelho, verde, rosa, amarelo, laranja, roxo, cinza) pra colorir. O ✕ remove
      a cor de um trecho já colorido. O corretor
      ortográfico do navegador/celular funciona normalmente aí.</p>
      <p>Enter simples só quebra a linha (pra continuar escrevendo sem abrir um parágrafo
      novo); apertar Enter de novo, sem escrever nada no meio, cria um parágrafo de verdade
      (com mais espaço acima). Dentro de uma lista, Enter cria um novo item, e <strong>Tab</strong>
      indenta o item atual como sub-item da lista (Shift+Tab volta pro nível anterior).</p>`},{titulo:'"Esse conteúdo pode ficar desatualizado?"',corpoHtml:`<p>Marque isso em notas sobre coisas que mudam com o tempo — taxas, leis,
      limites. Exemplo: uma nota sobre "teto de isenção do Imposto de Renda em 2026" deveria
      ter isso marcado, com a data de validade preenchida. Assim, quando essa nota voltar
      pra revisão depois que a data passar, o app avisa "isso pode estar desatualizado —
      confirme antes de confiar", em vez de você reforçar uma informação que já mudou.</p>`},{titulo:"Revisão (tela Hoje)",corpoHtml:`<p>Todo dia, a fila "Hoje" mostra as notas que estão programadas pra revisão.
      Primeiro aparece só o Título — tente lembrar da resposta de cabeça antes de revelar.
      Depois de revelar o conteúdo, avalie: <strong>Fácil</strong> (lembrou na hora — vai
      demorar mais pra essa nota voltar), <strong>Médio</strong> (lembrou com esforço —
      segue o ritmo normal), <strong>Difícil</strong> (não lembrou ou lembrou errado — essa
      nota volta mais cedo pra reforçar).</p>
      <p>Enquanto você revisa, o app mede quanto tempo a tela ficou em foco em cada nota (pausa
      se você trocar de aba/app no meio) — isso alimenta o "Tempo hoje" no Painel e o "Tempo
      revisando" nos Detalhes de cada Espaço. Não precisa fazer nada pra isso funcionar.</p>`},{titulo:"Favoritos",corpoHtml:`<p>Marque como favorito um Tema ou uma Nota que for especialmente importante
      pra você — algo que quer conseguir achar rápido sem precisar navegar pelos Espaços.
      Exemplo: a fórmula de Yield to Maturity que você usa toda hora, ou o Tema inteiro
      sobre "Vieses" porque foi o que mais te marcou no curso.</p>`},{titulo:"Arquivar × Excluir um Espaço",corpoHtml:`<p><strong>Arquivar</strong> é para quando você termina um curso ou um livro,
      mas ainda quer ser cobrado a revisar o que aprendeu no longo prazo (D+180 continua
      funcionando) — só some da lista principal e não permite criar nota nova ali. Pede
      confirmação antes, pra evitar clique sem querer, mas dá pra reativar quando quiser.
      <strong>Excluir</strong> é definitivo, apaga tudo (Temas, Notas, histórico de
      revisão) — use só se criou algo por engano.</p>
      <p>O botão <strong>Detalhes</strong> (no menu "⋯" do Espaço) mostra um resumo:
      quantos Temas e Notas, quanto tempo total você já passou revisando notas daquele
      Espaço, e há quantos dias ele está ativo (ou quanto tempo levou até ser arquivado).</p>`},{titulo:"Painel",corpoHtml:`<p>Mostra sua sequência de dias estudando (streak), quanto tempo você estudou
      hoje, quantas notas estão em cada estágio da escada de revisão (1/7/30/180 dias — quanto
      mais em 30/180, melhor sua retenção), e o ranking dos Temas onde você mais marcou
      "Difícil" — geralmente esses são os pontos fracos reais, que a sensação de "acho que já
      sei" não mostra sozinha.</p>`},{titulo:"Exportar em PDF",corpoHtml:`<p>Bom momento pra usar: quando terminar um módulo do curso, terminar o
      livro, ou só quiser um resumo pra imprimir/consultar sem abrir o app. Gera um
      documento organizado por módulo (categoria) e Tema, na ordem que você aprendeu.</p>`},{titulo:"Lembrete no celular",corpoHtml:`<p>Em Configurações, escolha o horário que você quer ser lembrado, e baixe o
      lembrete — ele vira um evento recorrente no seu Calendário/Lembretes nativo. Se
      quiser mudar o horário depois, baixe de novo e apague o antigo lá no Calendário.</p>`},{titulo:"Exportar / Importar dados",corpoHtml:`<p>Use pra levar seus dados de um aparelho pro outro (ex: do celular pro
      laptop), ou como backup. Exportar gera um arquivo; importar esse arquivo mescla com o
      que já existe no aparelho, sem apagar nada — o mais recente de cada item é o que
      vale.</p>`},{titulo:"Lixeira",corpoHtml:`<p>Quando você exclui um Espaço, Tema ou Nota, ele não some de vez: vai pra
      Lixeira, em Configurações. Lá dá pra <b>restaurar</b> a qualquer momento — se excluiu o
      Espaço, volta com os Temas e Notas junto. Depois de 30 dias o item é apagado sozinho,
      ou você pode <b>Excluir de vez</b> na hora, se quiser.</p>`},{titulo:"Snapshots locais",corpoHtml:`<p>Além do backup exportado e da nuvem, o Memoriza guarda uma cópia própria
      aqui neste aparelho, sozinho, uma vez por dia. Em Configurações → Snapshots locais dá pra
      criar uma na hora e <b>restaurar</b> uma versão anterior (mesclando com os dados atuais,
      sem apagar nada). As cópias mais antigas são descartadas com o tempo pra não ocupar
      espaço.</p>`},{titulo:"Histórico do backup na nuvem",corpoHtml:`<p>Se você usa a sincronização com o GitHub, todo backup já gravado fica no
      histórico do Gist. Em Configurações → Sincronização, abra <b>Histórico do backup na
      nuvem</b> para ver as versões e trazer uma de volta, se precisar.</p>`}];function In(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${qn}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Tn}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${Mn}</pre>
          </div>
        </div>
        <p class="settings-row__desc" style="margin-bottom:0;">
          Repare: <strong>um Tema não precisa ter categoria</strong>, e você escolhe o quão
          "fino" cada nível fica. No Exemplo 1, um Tema é uma aula, e a categoria agrupa as
          aulas do mesmo módulo. No Exemplo 3, um Tema já <strong>é</strong> o módulo inteiro,
          categoria vira um jeito extra de agrupar módulos (ex: por dificuldade), e cada Nota
          é uma aula daquele módulo. Nenhum dos dois está certo ou errado — use o que fizer
          mais sentido pra como você quer revisar depois.
        </p>
      </div>

      ${Cn.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function Dn(e){return e.replace(/-/g,"")}function Nn(e,t){const[a,o]=t.split(":");return`${Dn(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function jn(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function zn(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function Pn(e){const t=Nn(Z(),e),a=jn(new Date),o=zn("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${se()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function Rn(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const Fn="https://api.github.com",On="Memoriza — sincronização de anotações",$e="memoriza-sync.json";function Dt(e){return(t,a={})=>fetch(`${Fn}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function Hn(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&$e in s.files))==null?void 0:o.id)??null}async function Bn(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:On,public:!1,files:{[$e]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function Vn(e,t){var s,n;const a=await e(`/gists/${t}`);return a.ok?((n=(s=(await a.json()).files)==null?void 0:s[$e])==null?void 0:n.content)??null:null}async function Ua(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[$e]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function Ga(e){const t=Dt(e);let a=Ne();if(!a){const i=await Hn(t);i&&(a=i,et(i))}let o=null,s=!1,n=await we();if(a){const i=await Vn(t,a);if(i)try{const c=ze(i);o=await Pe(c),n=await we(),s=!0}catch{}}return a?await Ua(t,a,JSON.stringify(n)):(a=await Bn(t,JSON.stringify(n)),et(a)),ht(P()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??Ka(),push:!0,mesclouRemoto:s}}async function Un(e,t=30){const a=Ne();if(!a)throw new Error("Nenhum backup sincronizado ainda.");const s=await Dt(e)(`/gists/${a}`);if(!s.ok)throw new Error("Não foi possível ler o histórico do backup. Confira o token.");return((await s.json()).history??[]).slice(0,t).map(i=>({version:i.version,committed_at:i.committed_at}))}async function Gn(e,t,a,o){var c;const s=await e(`/gists/${a}/${o}`);if(!s.ok)return null;const i=(c=(await s.json()).files)==null?void 0:c[$e];if(!i)return null;if(i.truncated&&i.raw_url){const r=await fetch(i.raw_url,{headers:{Authorization:`Bearer ${t}`}});return r.ok?r.text():null}return i.content??null}async function Kn(e,t){const a=Dt(e),o=Ne();if(!o)throw new Error("Nenhum backup sincronizado ainda.");const s=await Gn(a,e,o,t);if(!s)throw new Error("Não foi possível ler essa versão do backup.");const n=await Pe(ze(s)),i=await we();return await Ua(a,o,JSON.stringify(i)),ht(P()),{...n,porLoja:n.porLoja??Ka(),push:!0,mesclouRemoto:!0}}function Ka(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function Wn(e){const t=bt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const Zn=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],Xn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}],Qn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function Jn(e){const t=[`${Qn[e.tipo]} em ${e.contexto}`];return e.temas&&t.push(`${e.temas} tema(s)`),e.notas&&t.push(`${e.notas} nota(s)`),e.excluido_em&&t.push(`excluído em ${_e(e.excluido_em)}`),t.join(" · ")}function Yn(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function ei(e){const t=`${_e(e.criado_em)} · ${Yn(e.bytes)}`;return`${e.automatico?"Automático":"Manual"} · ${t}`}function ti(e){return _e(e.committed_at)}async function W(e,t){var x,C,j,X,O,V,Y,G,Q,ee,J,te;const a=mo(),o=ao(),s=await $t(),n=io(t.perfil.id),i=gt(),c=oa(),r=bt(),d=Ne(),u=yt(),l=await Fo(t.perfil.id),b=await cs();e.innerHTML=`
    <div class="stack content-narrow content-wide">
      <section class="settings-section">
        <div class="settings-section__title">${S.user} Perfil</div>
        <div class="card">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">${p(t.perfil.nome)}</div>
              <div class="settings-row__desc">Perfil atual neste aparelho</div>
            </div>
            <button class="btn btn--secondary btn--sm" id="btn-switch-profile" type="button">Trocar de perfil</button>
          </div>
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Como Usar</div>
              <div class="settings-row__desc">Exemplos reais de Espaço, Tema, Nota e o resto do app</div>
            </div>
            <button class="btn btn--secondary btn--sm" id="btn-como-usar" type="button">Abrir</button>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.users} Gerenciar perfis</div>
        <div class="card stack">
          <div>
            ${s.map(g=>`
              <div class="settings-list-row" data-perfil-id="${p(g.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${p(g.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${p(g.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${p(g.id)}" data-nome="${p(g.nome)}" class="danger" type="button">Excluir perfil</button>
                      </div>
                    </details>
                  `:""}
                </div>
              </div>
            `).join("")}
          </div>
          <div id="form-novo-perfil" style="display:none;">
            <div class="field">
              <label class="field__label" for="input-novo-perfil">Nome do novo perfil</label>
              <input class="input" id="input-novo-perfil" type="text" maxlength="60" />
            </div>
            <div class="form-actions" style="margin-top: var(--space-3);">
              <button class="btn btn--primary btn--sm" id="btn-salvar-perfil" type="button">Adicionar</button>
              <button class="btn btn--secondary btn--sm" id="btn-cancelar-perfil" type="button">Cancelar</button>
            </div>
          </div>
          <button class="btn btn--secondary btn--sm" id="btn-novo-perfil" type="button" style="align-self: flex-start;">+ Adicionar perfil</button>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.moon} Aparência</div>
        <div class="card">
          <div class="settings-list-row">
            <div class="settings-row__label">Tema</div>
            <div class="segmented" id="tema-opcoes" role="group" aria-label="Tema">
              ${Zn.map(g=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-theme="${g.value}"
                  aria-pressed="${g.value===a}"
                >${g.label}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.ordenar} Ordenação</div>
        <div class="card">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Notas dentro do Tema</div>
              <p class="settings-row__desc">
                Como as Notas são listadas. Espaços, Temas e categorias já seguem sempre o
                nome — em ordem do calendário quando são meses, e com os números como números
                ("Aula 2" antes de "Aula 10"). A exportação em PDF segue esta escolha.
              </p>
            </div>
            <div class="segmented" id="notas-ordem" role="group" aria-label="Ordenação das notas">
              ${Xn.map(g=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${g.value}"
                  aria-pressed="${g.value===u}"
                >${g.label}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.database} Dados</div>
        <div class="card stack">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Exportar backup</div>
              <p class="settings-row__desc">
                Gera um arquivo .json para guardar em outro lugar (Drive, e-mail, etc).
                ${o?`Último export: ${p(_e(o))}.`:"Nenhum export feito ainda."}
              </p>
            </div>
          </div>
          <div class="stack" style="flex-direction: row; flex-wrap: wrap; gap: var(--space-3);">
            <button class="btn btn--primary btn--sm" id="btn-export-profile" type="button">
              Exportar meu perfil (${p(t.perfil.nome)})
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-export-all" type="button">
              Exportar todos os perfis
            </button>
          </div>

          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Importar backup</div>
              <p class="settings-row__desc">
                Mescla um arquivo .json exportado antes. Dados locais mais recentes nunca são
                substituídos, e nada local é apagado.
              </p>
            </div>
          </div>
          <div>
            <button class="btn btn--secondary btn--sm" id="btn-import" type="button">Escolher arquivo…</button>
            <input type="file" accept="application/json" id="import-file" class="visually-hidden" />
          </div>
          <div id="import-summary" role="status"></div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.clock} Snapshots locais</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Cópias de segurança guardadas neste aparelho, sem depender da nuvem. Uma é criada
            sozinha ao abrir o app (uma por dia) e fica disponível por aqui. Restaurar
            <b>mescla</b> com os dados atuais — nunca apaga nada.
          </p>
          <div style="display:flex; gap: var(--space-3); flex-wrap:wrap;">
            <button class="btn btn--secondary btn--sm" id="btn-snapshot-criar" type="button">Criar snapshot agora</button>
          </div>
          <div id="snapshot-status" role="status"></div>
          ${b.length===0?'<p class="text-muted" style="margin:0;">Nenhum snapshot ainda.</p>':`<div>
                  ${b.map(g=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${p(ei(g))}</div>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-snapshot-restaurar="${p(g.id)}" type="button">Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-snapshot-remover="${p(g.id)}" type="button">Apagar</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${ma} dias o item é
            removido de vez, sozinho.
          </p>
          ${l.length===0?'<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>':`<div>
                  ${l.map(g=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${p(g.nome)}</div>
                        <p class="settings-row__desc">${p(Jn(g))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${p(g.id)}" data-tipo="${g.tipo}" type="button">${S.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${p(g.id)}" data-tipo="${g.tipo}" data-nome="${p(g.nome)}" type="button">Excluir de vez</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.sync} Sincronização em nuvem</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Um canto seguro do GitHub só seu (Gist privado) guarda uma cópia sincronizada do
            app — sem servidores intermediários, direto do seu navegador. O backup é mesclado:
            dados mais novos vencem e nada local é apagado.
          </p>
          <div class="field">
            <label class="field__label" for="input-github-token">Personal Access Token (GitHub)</label>
            <div style="display:flex; gap: var(--space-2); flex-wrap:wrap;">
              <input
                class="input" id="input-github-token" type="password" autocomplete="off"
                placeholder="ghp_…  (permissão só de Gist)"
                value="${p(i)}"
                style="max-width: 340px;"
              />
              <button class="btn btn--secondary btn--sm" id="btn-limpar-token" type="button" title="Remove o token deste navegador">Limpar</button>
            </div>
            <p class="settings-row__desc" style="margin-top: var(--space-1);">
              Como criar: github.com → Settings → Developer settings → Personal access tokens →
              “Tokens (classic)” → Generate new token → marque só <b>gist</b> → Generate.
              O token fica salvo <b>apenas neste navegador</b>, nunca é enviado a mais ninguém.
            </p>
          </div>

          <div>
            <button class="btn btn--primary btn--sm" id="btn-sync-now" type="button" style="align-self:flex-start;">
              ${S.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${r?`<div class="banner banner--success" style="margin-bottom:0;">${S.check} Última sincronização: ${p(_e(r))}${d?".":""}</div>`:i?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
          </div>

          <details id="gist-historico">
            <summary class="settings-row__label" style="cursor:pointer;">Histórico do backup na nuvem</summary>
            <div class="stack" style="margin-top: var(--space-3);">
              <p class="settings-row__desc" style="margin:0;">
                O GitHub guarda todas as versões já gravadas no Gist. Dá pra trazer uma antiga
                de volta — a restauração <b>mescla</b> com o que já existe local.
              </p>
              <div>
                <button class="btn btn--secondary btn--sm" id="btn-gist-revisoes" type="button">${S.sync} Carregar histórico</button>
              </div>
              <div id="gist-revisoes" role="status"></div>
            </div>
          </details>

          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Sincronização automática</div>
              <p class="settings-row__desc">Ao abrir o app, se a última sincronização tiver mais de 30 min, roda sozinha em segundo plano.</p>
            </div>
            <input type="checkbox" id="sync-auto" class="toggle-checkbox" ${c?"checked":""} aria-label="Sincronização automática" />
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${S.clock} Lembretes</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            O Memoriza não envia notificações. Escolha um horário e baixe um lembrete diário
            para o app de Calendário/Lembretes do seu celular.
          </p>
          <div class="field" style="max-width: 160px;">
            <label class="field__label" for="input-hora-lembrete">Horário</label>
            <input class="input" id="input-hora-lembrete" type="time" value="${p(n)}" />
          </div>
          <button class="btn btn--primary btn--sm" id="btn-baixar-lembrete" type="button" style="align-self:flex-start;">
            Baixar lembrete para o celular
          </button>
          <p class="settings-row__desc" style="margin:0;">
            Depois de adicionado, esse lembrete passa a ser gerenciado direto no app de
            Calendário/Lembretes do celular — editar horário ou cancelar se faz por lá, sem
            conexão contínua com o Memoriza. Se trocar o horário aqui depois, baixe um novo
            arquivo e apague o antigo manualmente no Calendário.
          </p>
        </div>
      </section>
    </div>

  `,(x=e.querySelector("#btn-switch-profile"))==null||x.addEventListener("click",()=>{t.onSwitchProfile()}),(C=e.querySelector("#btn-como-usar"))==null||C.addEventListener("click",()=>M("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(g=>{g.addEventListener("click",()=>{const L=g.dataset.theme;uo(L),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(y=>{y.setAttribute("aria-pressed",String(y===g))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(g=>{g.addEventListener("click",()=>{lo(g.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(L=>{L.setAttribute("aria-pressed",String(L===g))})})}),(j=e.querySelector("#btn-export-profile"))==null||j.addEventListener("click",async()=>{const g=await Yo(t.perfil.id);Ut(g),zt(g.exportado_em),W(e,t)}),(X=e.querySelector("#btn-export-all"))==null||X.addEventListener("click",async()=>{const g=await we();Ut(g),zt(g.exportado_em),W(e,t)});const f=e.querySelector("#import-file");(O=e.querySelector("#btn-import"))==null||O.addEventListener("click",()=>{f==null||f.click()}),f==null||f.addEventListener("change",async()=>{const g=e.querySelector("#import-summary"),[L]=f.files??[];if(!(!L||!g))try{const y=await L.text(),m=ze(y);await rt({titulo:"Antes de importar"});const $=await Pe(m);g.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${$.criados} criados, ${$.atualizados} atualizados,
          ${$.mantidos} mantidos como estavam.
        </div>
      `}catch(y){g.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${p(y instanceof Error?y.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{f.value=""}});const E=e.querySelector("#form-novo-perfil");(V=e.querySelector("#btn-novo-perfil"))==null||V.addEventListener("click",()=>{var g;E.style.display="block",(g=e.querySelector("#input-novo-perfil"))==null||g.focus()}),(Y=e.querySelector("#btn-cancelar-perfil"))==null||Y.addEventListener("click",()=>{E.style.display="none"}),(G=e.querySelector("#btn-salvar-perfil"))==null||G.addEventListener("click",async()=>{const L=e.querySelector("#input-novo-perfil").value.trim();L&&(await ra(L),W(e,t))}),e.querySelectorAll("[data-renomear]").forEach(g=>{g.onclick=()=>{var I;const L=g.dataset.renomear,y=e.querySelector(`[data-perfil-id="${L}"]`),m=y==null?void 0:y.querySelector("[data-view-nome]");if(!y||!m)return;const $=((I=m.textContent)==null?void 0:I.trim())??"";m.innerHTML=`
        <input class="input" type="text" value="${p($)}" maxlength="60" style="max-width:200px;" />
      `;const w=m.querySelector("input");w.focus(),w.select(),g.textContent="Salvar";const q=async()=>{const T=w.value.trim();T&&(await Do(L,T),L===t.perfil.id&&(t.perfil={...t.perfil,nome:T})),W(e,t)};w.addEventListener("keydown",T=>{T.key==="Enter"&&q()}),g.onclick=q}}),e.querySelectorAll("[data-excluir-perfil]").forEach(g=>{g.addEventListener("click",async()=>{const L=g.dataset.excluirPerfil,y=g.dataset.nome??"",m=await No(L);await ae({title:`Excluir o perfil "${y}"?`,message:`Isso vai apagar ${m.espacos} espaço(s), ${m.temas} tema(s) e ${m.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await jo(L),L===t.perfil.id?t.onSwitchProfile():W(e,t))})}),(Q=e.querySelector("#btn-baixar-lembrete"))==null||Q.addEventListener("click",()=>{const g=e.querySelector("#input-hora-lembrete").value||"19:00";ro(t.perfil.id,g),Rn(Pn(g))});const h=e.querySelector("#sync-status"),v=e.querySelector("#btn-sync-now");v==null||v.addEventListener("click",async()=>{const L=e.querySelector("#input-github-token").value.trim();if(!L){h&&(h.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Pt(L),v.disabled=!0,h&&(h.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Sincronizando…</div>`);try{const y=await Ga(L);if(h){const m=[y.criados>0?`${y.criados} novo(s)`:null,y.atualizados>0?`${y.atualizados} atualizado(s)`:null].filter(Boolean);h.innerHTML=`
          <div class="banner banner--success" role="status">
            ${S.check} Sincronizado!${m.length>0?` ${m.join(", ")} baixado(s).`:""}
            ${y.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}W(e,t)}catch(y){v.disabled=!1,h&&(h.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${p(y instanceof Error?y.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(ee=e.querySelector("#btn-limpar-token"))==null||ee.addEventListener("click",async()=>{await ae({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Pt(""),et(""),ht(""),W(e,t))}),(J=e.querySelector("#sync-auto"))==null||J.addEventListener("change",g=>{co(g.target.checked)}),e.querySelectorAll("[data-restaurar]").forEach(g=>{g.addEventListener("click",async()=>{g.disabled=!0,await Oo(g.dataset.tipo,g.dataset.restaurar),W(e,t)})}),e.querySelectorAll("[data-expurgar]").forEach(g=>{g.addEventListener("click",async()=>{const L=g.dataset.nome??"";await ae({title:`Excluir "${L}" de vez?`,message:"O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia."})&&(g.disabled=!0,await Ae(g.dataset.tipo,g.dataset.expurgar),W(e,t))})}),(te=e.querySelector("#btn-snapshot-criar"))==null||te.addEventListener("click",async()=>{const g=e.querySelector("#btn-snapshot-criar");g.disabled=!0,await rt({}),W(e,t);const L=e.querySelector("#snapshot-status");L&&(L.innerHTML=`<div class="banner banner--success" role="status">${S.check} Snapshot criado.</div>`)}),e.querySelectorAll("[data-snapshot-restaurar]").forEach(g=>{g.addEventListener("click",async()=>{if(!await ae({title:"Restaurar este snapshot?",message:"Os dados do snapshot serão mesclados com os atuais. Nada local é apagado."}))return;g.disabled=!0,await ds(g.dataset.snapshotRestaurar);const y=e.querySelector("#snapshot-status");y&&(y.innerHTML=`<div class="banner banner--success" role="status">${S.check} Snapshot restaurado (mesclado).</div>`)})}),e.querySelectorAll("[data-snapshot-remover]").forEach(g=>{g.addEventListener("click",async()=>{await ls(g.dataset.snapshotRemover),W(e,t)})});const A=e.querySelector("#btn-gist-revisoes");A==null||A.addEventListener("click",async()=>{const g=e.querySelector("#gist-revisoes"),y=e.querySelector("#input-github-token").value.trim()||i;if(!(!y||!g)){A.disabled=!0,g.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Carregando…</div>`;try{const m=await Un(y);if(m.length===0){g.innerHTML='<div class="banner banner--muted" role="status">Ainda não há versões anteriores.</div>';return}g.innerHTML=`
        <div>
          ${m.map($=>`
            <div class="settings-list-row">
              <div class="settings-row__label">${p(ti($))}</div>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-gist-restaurar="${p($.version)}" type="button">Restaurar</button>
              </div>
            </div>
          `).join("")}
        </div>
      `,ai(e,y,g)}catch(m){g.innerHTML=`<div class="banner banner--warning" role="alert">${p(m instanceof Error?m.message:"Não foi possível carregar o histórico.")}</div>`}finally{A.disabled=!1}}})}function ai(e,t,a){e.querySelectorAll("[data-gist-restaurar]").forEach(o=>{o.addEventListener("click",async()=>{if(await ae({title:"Restaurar esta versão do backup?",message:"A versão escolhida será mesclada com os dados atuais e o backup na nuvem será atualizado. Nada local é apagado."})){o.disabled=!0,a.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Restaurando…</div>`;try{const n=await Kn(t,o.dataset.gistRestaurar);a.innerHTML=`<div class="banner banner--success" role="status">${S.check} Backup restaurado: ${n.criados} criado(s), ${n.atualizados} atualizado(s).</div>`}catch(n){a.innerHTML=`<div class="banner banner--warning" role="alert">${p(n instanceof Error?n.message:"Não foi possível restaurar.")}</div>`}}})})}let Xe=null;async function Yt(){if(!(!("wakeLock"in navigator)||document.hidden))try{Xe=await navigator.wakeLock.request("screen"),Xe.addEventListener("release",()=>{Xe=null})}catch{}}function oi(){Yt(),document.addEventListener("visibilitychange",()=>{document.hidden||Yt()})}const Wa="v1.9",si="Memoriza",Za=`${si} ${Wa}`,ke=24;function vt(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Qe(e,t){const a=vt(t);return e.some(o=>vt(o).includes(a))}function ni(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),n=t.toLowerCase();let i=s.indexOf(n);i===-1&&(i=0);const c=Math.max(0,i-a),r=Math.min(o.length,i+n.length+a);return(c>0?"…":"")+o.slice(c,r)+(r<o.length?"…":"")}async function ii(e,t){const a=t.trim();if(!a)return[];const o=vt(a);if(!o)return[];const s=await k(),n=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(n.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),r=new Map(n.map(f=>[f.id,f])),u=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),l=[];for(const f of n)if(Qe([f.nome,f.categoria],o)&&(l.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),l.length>=ke))return l;const b=new Map(c.map(f=>[f.id,f]));for(const f of c)if(Qe([f.nome,f.categoria],o)){const E=r.get(f.espaco_id);if(l.push({kind:"tema",id:f.id,titulo:f.nome,meta:`Tema${E?` · ${E.nome}`:""}`}),l.length>=ke)return l}for(const f of u){if(!Qe([f.titulo,f.fonte,f.conteudo],o))continue;const E=b.get(f.tema_id),h=E&&r.get(E.espaco_id),v=[...h?[h.nome]:[],...E?[E.nome]:[]].join(" · ");if(l.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:v?`Nota · ${v}`:"Nota",snippet:f.conteudo?ni(f.conteudo,o):void 0}),l.length>=ke)return l}return l.sort((f,E)=>{const h=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,v=`${E.titulo.toLowerCase()} ${E.meta.toLowerCase()}`;return Ro(h,v)}),l.slice(0,ke)}const ri={espaco:"Espaço",tema:"Tema",nota:"Nota"};function ea(e,t){const a=p(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const n=p(e.slice(0,s)),i=p(e.slice(s,s+o.length)),c=p(e.slice(s+o.length));return`${n}<mark>${i}</mark>${c}`}async function Xa(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
    <div class="search-panel">
      <div class="search-field">
        <span class="search-field__icon" aria-hidden="true">${S.search}</span>
        <input
          class="input search-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="Buscar espaços, temas e notas…"
          aria-label="Buscar"
        />
        <kbd class="search-kbd">esc</kbd>
      </div>
      <div class="search-results" role="listbox" aria-label="Resultados"></div>
    </div>
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],n=-1,i,c=!1;function r(){c||(c=!0,t.remove(),document.removeEventListener("keydown",b))}function d(E){s.length!==0&&(n=(n+E+s.length)%s.length,s.forEach((h,v)=>{const A=v===n;h.el.classList.toggle("is-active",A),h.el.setAttribute("aria-selected",String(A)),A&&h.el.scrollIntoView({block:"nearest"})}))}function u(E){const h=s.find(A=>A.el===E);if(!h)return;r();const v=h.resultado;v.kind==="espaco"?M(`espacos/${v.id}`):v.kind==="tema"?M(`temas/${v.id}`):M(`notas/${v.id}`)}function l(E){ii(e,E).then(h=>{if(!c){if(n=-1,s=[],h.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${p(E.trim())}".</p>`;return}o.innerHTML="";for(const v of h){const A=document.createElement("button");A.type="button",A.className=`search-result search-result--${v.kind}`,A.setAttribute("role","option"),A.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${v.kind==="espaco"?S.folder:v.kind==="tema"?S.bookOpen:S.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${ea(v.titulo,E)}</span>
            <span class="search-result__meta">${p(ri[v.kind])} · ${p(v.meta)}</span>
            ${v.snippet?`<span class="search-result__snippet">${ea(v.snippet,E)}</span>`:""}
          </span>
        `,A.addEventListener("click",()=>u(A)),o.appendChild(A),s.push({el:A,resultado:v})}}})}function b(E){E.key==="Escape"&&(E.preventDefault(),r())}a.addEventListener("input",()=>{i&&clearTimeout(i),i=setTimeout(()=>l(a.value),120)}),a.addEventListener("keydown",E=>{E.key==="ArrowDown"?(E.preventDefault(),d(1)):E.key==="ArrowUp"?(E.preventDefault(),d(-1)):E.key==="Enter"&&n>=0?(E.preventDefault(),u(s[n].el)):E.key==="Escape"&&(E.preventDefault(),r())}),t.addEventListener("mousedown",E=>{E.target===t&&r()}),document.addEventListener("keydown",b),a.focus(),l("")}const Je=7,ci=30,li=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],di={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function ui(e){ys(()=>ft(e)),await ft(e),vi(),oi(),mi(),pi()}function mi(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=ta();t&&Xa(t)}})}async function pi(){const e=gt();if(!(!e||!oa())&&Wn(ci))try{await Ga(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function vi(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function ft(e){var r,d,u;const t=ta(),a=t?await Io(t):void 0;if(!a){Ye(null),e.innerHTML='<div id="profile-screen"></div>';const l=e.querySelector("#profile-screen");await ws(l,async b=>{Ye(b.id),M("hoje"),await ft(e)});return}const o=gs(),s=bs(o),n=await gi(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${li.map(l=>`
          <button
            class="app-nav__item"
            data-route="${l.route}"
            ${l.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${_s[l.route]}</span>
            <span>${l.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${di[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${S.search}</button>
            ${n?`<button class="app-header__backup-alert${n.urgente?" is-urgent":""}" id="btn-sync-alert" type="button" title="${p(n.mensagem)}" aria-label="${p(n.mensagem)}">${S.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${p(qo(F()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${S.help}</button>
            <span class="app-header__profile" title="Memoriza ${Wa}">${p(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${p(Za)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(l=>{l.addEventListener("click",()=>{he()&&hs(l.dataset.route)})}),(r=e.querySelector("#btn-ajuda"))==null||r.addEventListener("click",()=>{he()&&(location.hash==="#/ajuda"?history.back():M("ajuda"))}),(d=e.querySelector("#btn-busca"))==null||d.addEventListener("click",()=>{he()&&Xa(a.id)}),(u=e.querySelector("#btn-sync-alert"))==null||u.addEventListener("click",()=>{he()&&M("config")});const i=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",i.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await fi(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(l){console.error("Erro ao renderizar tela:",l),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function fi(e,t,a){switch(t.name){case"hoje":await Wt(e,{perfilId:a.id});break;case"espacos":await Le(e,{perfilId:a.id});break;case"espaco":await qe(e,t.id);break;case"espaco-pdf":await dn(e,t.id,t.categoria);break;case"painel":await kn(e,{perfilId:a.id});break;case"favoritos":await Ln(e,{perfilId:a.id});break;case"ajuda":In(e);break;case"tema":await Te(e,t.id);break;case"nota-nova":await De(e,{mode:"nova",temaId:t.temaId});break;case"nota":await De(e,{mode:"editar",notaId:t.id});break;case"config":await W(e,{perfil:a,onSwitchProfile:()=>{Ye(null),M("perfil")}});break;default:await Wt(e,{perfilId:a.id})}}async function gi(e){if(!await bi(e.id))return null;if(!gt())return{urgente:!1,mensagem:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};const a=bt();if(!a)return{urgente:!1,mensagem:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."};const o=F(),s=ye(F(new Date(a)),o);return s<=Je?null:{urgente:s>Je*2,mensagem:`Faz mais de ${Je} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}}async function bi(e){const t=await k();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${Za}%c rodando`,"font-weight:bold;","");sa();eo({immediate:!0});async function hi(){pn(),await Co(),await va(),await Ho(),await ms().catch(()=>{}),await po();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await ui(e)}hi();
