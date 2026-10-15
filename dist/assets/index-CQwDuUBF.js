(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const ya="modulepreload",_a=function(e){return"/"+e},ct={},wa=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),r=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(c=>{if(c=_a(c),c in ct)return;ct[c]=!0;const d=c.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":ya,d||(l.as="script"),l.crossOrigin="",l.href=c,r&&l.setAttribute("nonce",r),document.head.appendChild(l),d)return new Promise((h,f)=>{l.addEventListener("load",h),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return s.then(i=>{for(const r of i||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})};function $a(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:n,onRegisterError:i}=e;let r,c;const d=async(l=!0)=>{await c};async function m(){if("serviceWorker"in navigator){if(r=await wa(async()=>{const{Workbox:l}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:l}},[]).then(({Workbox:l})=>new l("/sw.js",{scope:"/",type:"classic"})).catch(l=>{i==null||i(l)}),!r)return;r.addEventListener("activated",l=>{(l.isUpdate||l.isExternal)&&window.location.reload()}),r.addEventListener("installed",l=>{l.isUpdate||o==null||o()}),r.register({immediate:t}).then(l=>{n?n("/sw.js",l):s==null||s(l)}).catch(l=>{i==null||i(l)})}}return c=m(),d}const M={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",backupBannerSnoozedUntil:"memoriza:backupBannerSnoozedUntil",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function At(){return localStorage.getItem(M.selectedProfileId)}function Me(e){e?localStorage.setItem(M.selectedProfileId,e):localStorage.removeItem(M.selectedProfileId)}function qt(){const e=localStorage.getItem(M.theme);return e==="light"||e==="dark"?e:"system"}function Ea(e){e==="system"?localStorage.removeItem(M.theme):localStorage.setItem(M.theme,e)}function Tt(){return localStorage.getItem(M.lastExportAt)}function lt(e){localStorage.setItem(M.lastExportAt,e)}function xa(){return localStorage.getItem(M.backupBannerSnoozedUntil)}function Sa(){return localStorage.getItem(M.storagePersistRequested)==="1"}function ka(){localStorage.setItem(M.storagePersistRequested,"1")}const La="19:00";function Aa(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??La}function qa(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function Ct(){return localStorage.getItem(M.githubToken)??""}function dt(e){e.trim()?localStorage.setItem(M.githubToken,e.trim()):localStorage.removeItem(M.githubToken)}function It(){return localStorage.getItem(M.githubGistId)??""}function De(e){e?localStorage.setItem(M.githubGistId,e):localStorage.removeItem(M.githubGistId)}function Mt(){return localStorage.getItem(M.githubLastSyncAt)}function Dt(e){e?localStorage.setItem(M.githubLastSyncAt,e):localStorage.removeItem(M.githubLastSyncAt)}function Nt(){return localStorage.getItem(M.githubAutoSync)==="1"}function Ta(e){e?localStorage.setItem(M.githubAutoSync,"1"):localStorage.removeItem(M.githubAutoSync)}function Ze(){return localStorage.getItem(M.notasOrdem)==="titulo"?"titulo":"data"}function Ca(e){e==="titulo"?localStorage.setItem(M.notasOrdem,"titulo"):localStorage.removeItem(M.notasOrdem)}function Pt(){const e=qt();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function Ia(e){Ea(e),Pt()}function Ma(){return qt()}async function Da(){var e;if(!Sa()&&(ka(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const Ne=(e,t)=>t.some(a=>e instanceof a);let ut,mt;function Na(){return ut||(ut=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pa(){return mt||(mt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pe=new WeakMap,xe=new WeakMap,he=new WeakMap;function ja(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{a(ee(e.result)),s()},i=()=>{o(e.error),s()};e.addEventListener("success",n),e.addEventListener("error",i)});return he.set(t,e),t}function za(e){if(Pe.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{a(),s()},i=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});Pe.set(e,t)}let je={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return Pe.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return ee(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function jt(e){je=e(je)}function Ra(e){return Pa().includes(e)?function(...t){return e.apply(ze(this),t),ee(this.request)}:function(...t){return ee(e.apply(ze(this),t))}}function Fa(e){return typeof e=="function"?Ra(e):(e instanceof IDBTransaction&&za(e),Ne(e,Na())?new Proxy(e,je):e)}function ee(e){if(e instanceof IDBRequest)return ja(e);if(xe.has(e))return xe.get(e);const t=Fa(e);return t!==e&&(xe.set(e,t),he.set(t,e)),t}const ze=e=>he.get(e);function Oa(e,t,{blocked:a,upgrade:o,blocking:s,terminated:n}={}){const i=indexedDB.open(e,t),r=ee(i);return o&&i.addEventListener("upgradeneeded",c=>{o(ee(i.result),c.oldVersion,c.newVersion,ee(i.transaction),c)}),a&&i.addEventListener("blocked",c=>a(c.oldVersion,c.newVersion,c)),r.then(c=>{n&&c.addEventListener("close",()=>n()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),r}const Ha=["get","getKey","getAll","getAllKeys","count"],Ba=["put","add","delete","clear"],Se=new Map;function pt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Se.get(t))return Se.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=Ba.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||Ha.includes(a)))return;const n=async function(i,...r){const c=this.transaction(i,s?"readwrite":"readonly");let d=c.store;return o&&(d=d.index(r.shift())),(await Promise.all([d[a](...r),s&&c.done]))[0]};return Se.set(t,n),n}jt(e=>({...e,get:(t,a,o)=>pt(t,a)||e.get(t,a,o),has:(t,a)=>!!pt(t,a)||e.has(t,a)}));const Ua=["continue","continuePrimaryKey","advance"],vt={},Re=new WeakMap,zt=new WeakMap,Va={get(e,t){if(!Ua.includes(t))return e[t];let a=vt[t];return a||(a=vt[t]=function(...o){Re.set(this,zt.get(this)[t](...o))}),a}};async function*Ga(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,Va);for(zt.set(a,t),he.set(a,ze(t));t;)yield a,t=await(Re.get(a)||t.continue()),Re.delete(a)}function ft(e,t){return t===Symbol.asyncIterator&&Ne(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&Ne(e,[IDBIndex,IDBObjectStore])}jt(e=>({...e,get(t,a,o){return ft(t,a)?Ga:e.get(t,a,o)},has(t,a){return ft(t,a)||e.has(t,a)}}));const Ka="memoriza",Wa=2;let ke;function S(){return ke||(ke=Oa(Ka,Wa,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}}})),ke}function te(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const Xe="Europe/London",Za=new Intl.DateTimeFormat("en-CA",{timeZone:Xe,year:"numeric",month:"2-digit",day:"2-digit"});function O(e=new Date){return Za.format(e)}function Q(){return O(new Date)}function ce(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function R(){return new Date().toISOString()}function Y(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function Xa(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:Xe,weekday:"short",day:"2-digit",month:"2-digit"})}function bt(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Qa(e){const t=new Date(e),a=O(t),o=t.toLocaleTimeString("pt-BR",{timeZone:Xe,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function Qe(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function G(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const Ja="00000000-0000-4000-8000-000000000001";async function Je(){return(await(await S()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function Ya(){return Je()}async function eo(e){return(await S()).get("perfis",e)}async function Rt(e){const t=await S(),a=await t.getAll("perfis"),o=R(),n={id:a.length===0?Ja:te(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",n),n}async function to(e,t){const a=await S(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=R(),await a.put("perfis",o))}async function ao(e){const t=await S(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const n of a){const i=await t.getAllFromIndex("temas","espaco_id",n.id);o+=i.length;for(const r of i)s+=(await t.getAllFromIndex("notas","tema_id",r.id)).length}return{espacos:a.length,temas:o,notas:s}}async function oo(e){const t=await S(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(m=>t.getAllFromIndex("temas","espaco_id",m.id)))).flat(),i=(await Promise.all(s.map(m=>t.getAllFromIndex("notas","tema_id",m.id)))).flat(),c=(await Promise.all(i.map(m=>t.getAllFromIndex("itens_revisao","nota_id",m.id)))).flat(),d=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await d.objectStore("perfis").delete(e);for(const m of a)await d.objectStore("espacos").delete(m.id);for(const m of s)await d.objectStore("temas").delete(m.id);for(const m of i)await d.objectStore("notas").delete(m.id);for(const m of c)await d.objectStore("itens_revisao").delete(m.id);await d.done}const Ft=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),so=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function no(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function Fe(e){return so.get(no(e))??null}function Ot(e){return e.length>0&&e.every(t=>Fe(t)!==null)}function Ht(e,t,a){if(a){const o=Fe(e),s=Fe(t);if(o!==s)return o-s}return Ft.compare(e,t)}function Bt(e){const t=Ot(e);return[...e].sort((a,o)=>Ht(a,o,t))}function io(e,t){return Ft.compare(e,t)}function ae(e,t){const a=Ot(e.map(t));return[...e].sort((o,s)=>Ht(t(o),t(s),a))}async function Ut(e){const a=await(await S()).getAllFromIndex("notas","tema_id",e);return Ze()==="titulo"?ae(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function gt(e){return(await S()).get("notas",e)}async function ro(e){const t=await S(),a=await t.getAllFromIndex("temas","espaco_id",e);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).map(i=>({nota:i,tema:s}))))).flat()}async function co(e,t){const a=await S(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const n=R(),i={id:te(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:n,atualizado_em:n},r={id:te(),nota_id:i.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:G(Q(),1),status:"pendente",streak_facil:0,criado_em:n,atualizado_em:n},c=a.transaction(["notas","itens_revisao"],"readwrite");return await c.objectStore("notas").put(i),await c.objectStore("itens_revisao").put(r),await c.done,i}async function lo(e,t){const a=await S(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=R(),await a.put("notas",o))}async function uo(e){const t=await S(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=R(),await t.put("notas",a),a.favorito):!1}async function mo(e){const t=await S(),a=await t.getAllFromIndex("itens_revisao","nota_id",e),o=t.transaction(["notas","itens_revisao"],"readwrite");await o.objectStore("notas").delete(e);for(const s of a)await o.objectStore("itens_revisao").delete(s.id);await o.done}async function Vt(){var n;const e=await S(),a=(await e.getAll("notas")).filter(i=>!("titulo"in i)||!i.titulo);if(a.length===0)return 0;const o=R(),s=e.transaction("notas","readwrite");for(const i of a)await s.store.put({...i,titulo:((n=i.fonte)==null?void 0:n.trim())||"Sem título",titulo_revisado:!1,favorito:i.favorito??!1,atualizado_em:o});return await s.done,a.length}function v(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ie(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const Gt="_sem-categoria_";function po(e){return e.trim()===""?Gt:encodeURIComponent(e)}function vo(e){return e===Gt?"":decodeURIComponent(e)}function fo(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function bo(){const e=fo();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:vo(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function go(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function C(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function ho(e){C(e)}function yo(e){window.addEventListener("hashchange",e)}function se(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function I(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const _o={hoje:se('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:se('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:se('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:se('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:se('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:se('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},x={backup:I('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:I('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:I('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:I('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:I('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:I('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:I('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:I('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:I('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:I('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:I('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:I('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:I('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:I('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:I('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:I('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:I('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:I('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:I('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:I('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:I('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:I('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:I('<path d="M20 6L9 17l-5-5"/>'),chart:I('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:I('<path d="M4 6h16M4 12h11M4 18h6"/>')};async function wo(e,t){var r,c,d;const a=await Je(),o=a.length===0;e.innerHTML=`
    <div class="profile-picker">
      <div>
        <div class="profile-picker__title">Quem é você?</div>
        <p class="profile-picker__subtitle">
          ${o?"Primeiro uso neste aparelho — crie seu perfil pra começar. Cada pessoa que usar o app aqui cria o próprio depois.":"Escolha seu perfil para ver suas próprias revisões."}
        </p>
      </div>
      ${a.length>0?`
        <div class="profile-grid" role="list">
          ${a.map(m=>`
            <button class="profile-card" role="listitem" data-id="${v(m.id)}">
              <span class="profile-avatar" aria-hidden="true">${v($o(m.nome))}</span>
              <span class="profile-card__name">${v(m.nome)}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(m=>{m.addEventListener("click",()=>{const l=m.dataset.id,h=a.find(f=>f.id===l);h&&t(h)})});const s=e.querySelector("#form-novo-perfil-picker"),n=e.querySelector("#input-novo-perfil-picker");o&&n.focus(),(r=e.querySelector("#btn-novo-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="block",n.focus()}),(c=e.querySelector("#btn-cancelar-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="none"});const i=async()=>{const m=n.value.trim();if(!m)return;const l=await Rt(m);t(l)};(d=e.querySelector("#btn-salvar-perfil-picker"))==null||d.addEventListener("click",i),n.addEventListener("keydown",m=>{m.key==="Enter"&&i()})}function $o(e){return e.trim().slice(0,1).toUpperCase()}const ne=["1","7","30","180"],Le={1:1,7:7,30:30,180:180};function Eo(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=ne.indexOf(e);if(t==="dificil"){const d=ne[Math.max(0,s-1)];return{estagio:d,streak_facil:0,data_agendada:G(o,Le[d]),aposentado:!1}}if(t==="medio"){const d=ne[Math.min(ne.length-1,s+1)];return{estagio:d,streak_facil:0,data_agendada:G(o,Le[d]),aposentado:!1}}const n=a+1,i=s+2,r=i<=ne.length-1?ne[i]:"consulta",c=n>=2?"consulta":r;return c==="consulta"?{estagio:"consulta",streak_facil:n,aposentado:!0}:{estagio:c,streak_facil:n,data_agendada:G(o,Le[c]),aposentado:!1}}async function Kt(e){const t=await S(),a=Q(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(b=>b.data_agendada<=a),n=Array.from(new Set(s.map(b=>b.nota_id))),i=await Promise.all(n.map(b=>t.get("notas",b))),r=new Map(i.filter(b=>!!b).map(b=>[b.id,b])),c=Array.from(new Set(Array.from(r.values()).map(b=>b.tema_id))),d=await Promise.all(c.map(b=>t.get("temas",b))),m=new Map(d.filter(b=>!!b).map(b=>[b.id,b])),l=Array.from(new Set(Array.from(m.values()).map(b=>b.espaco_id))),h=await Promise.all(l.map(b=>t.get("espacos",b))),f=new Map(h.filter(b=>!!b).map(b=>[b.id,b])),p=[];for(const b of s){const $=r.get(b.nota_id),L=$&&m.get($.tema_id),E=L&&f.get(L.espaco_id);!$||!L||!E||p.push({item:b,nota:$,tema:L,espaco:E})}return p.sort((b,$)=>b.tema.criado_em.localeCompare($.tema.criado_em)||b.nota.criado_em.localeCompare($.nota.criado_em)),p}async function xo(e,t,a){const o=await S(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const n=Q(),i=Eo(s.estagio,t,s.streak_facil,n),r=R(),c={...s,status:"feita",avaliacao:t,data_concluida:n,duracao_segundos:a,atualizado_em:r},d={id:te(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:i.estagio,data_agendada:i.aposentado?n:i.data_agendada,status:i.aposentado?"feita":"pendente",streak_facil:i.streak_facil,criado_em:r,atualizado_em:r},m=o.transaction("itens_revisao","readwrite");return await m.store.put(c),await m.store.put(d),await m.done,i}async function So(e){const t=await S(),a=Q();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function ko(e){const t=await S(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(i=>i.status==="pendente");if(a.length===0)return;const o=Q(),s=R(),n=t.transaction("itens_revisao","readwrite");for(const i of a)await n.store.put({...i,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await n.done}const ye=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],ht={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},Lo=new RegExp(`\\[([^\\]]+)\\]\\{(${ye.join("|")})\\}`,"g");function Oe(e){let t=v(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(Lo,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Ao(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,n=s[s.length-1];a.push({level:o.level,nodes:n?n.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function Wt(e){return`<ul>${e.map(t=>`<li>${Oe(t.text)}${t.children.length>0?Wt(t.children):""}</li>`).join("")}</ul>`}function _e(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(Wt(Ao(o))),o=[])}let n=[];function i(){n.length>0&&(a.push(`<p>${Oe(n.join(`
`)).replace(/\n/g,"<br>")}</p>`),n=[])}for(const r of t){const c=r.trim();if(c===""){i(),s();continue}const d=/^(#{1,3})\s+(.*)$/.exec(c);if(d){i(),s();const l=d[1].length;a.push(`<h${l}>${Oe(d[2])}</h${l}>`);continue}const m=/^[-*]\s+(.*)$/.exec(c);if(m){i();const l=r.length-r.trimStart().length;o.push({level:Math.floor(l/2),text:m[1]});continue}s(),n.push(c)}return i(),s(),a.join(`
`)}function Ye(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(Ye).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=ye.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function He(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...He(s,t+1));continue}if(s.tagName!=="LI")continue;const n=s,i=Array.from(n.children).filter(d=>d.tagName==="UL"),r=n.cloneNode(!0);r.querySelectorAll("ul").forEach(d=>d.remove());const c=Ye(r).trim();c&&a.push(`${"  ".repeat(t)}- ${c}`);for(const d of i)a.push(...He(d,t+1));o=n}return a}function yt(e){if(e.tagName==="UL")return He(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=Ye(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function qo(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=yt(o);s.length>0&&t.push(s.join(`
`))}else t.push(...yt(o))}return t.filter(Boolean).join(`

`)}const To=30;function Zt(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=G(Q(),To);return e.validade_ate<=t}const Co=8;function Io(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function Mo(e){return Io(e)%Co}function D(e){return`var(--accent-${Mo(e)})`}const Do=5*60;let H=null;function Xt(){H&&(document.hidden?H.retomadoEm!=null&&(H.acumuladoMs+=Date.now()-H.retomadoEm,H.retomadoEm=null):H.retomadoEm==null&&(H.retomadoEm=Date.now()))}function No(e){H&&H.itemId===e||(ve(),H={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",Xt))}function Po(){if(!H)return;let e=H.acumuladoMs;return H.retomadoEm!=null&&(e+=Date.now()-H.retomadoEm),Math.min(Do,Math.round(e/1e3))}function ve(){H&&document.removeEventListener("visibilitychange",Xt),H=null}function Qt(e){const t=Q();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${ce(e.data_agendada,t)} dia(s)">${x.alert} atrasada</span>`}async function _t(e,t){const a=await Kt(t.perfilId);await fe(e,t,a)}async function fe(e,t,a){var d;ve(),window.scrollTo({top:0});const o=await So(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>C("espacos"));return}const i=new Set(a.map(m=>m.espaco.id)).size>1,r=new Map;for(const m of a){const l=r.get(m.tema.id)??[];l.push(m),r.set(m.tema.id,l)}const c=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=c+Array.from(r.values()).map(m=>{const l=m[0].tema,h=m[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${D(l.id)}">
            <span class="color-dot" style="--dot-color:${D(l.id)}"></span>
            ${v(l.nome)}
            ${i?`<span class="queue-group__espaco"> · ${v(h.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${m.map(f=>`
              <button class="item-row" data-id="${v(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${D(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${x.star} `:""}${v(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${Qt(f.item)}
                ${Zt(f.nota)?`<span class="badge badge--muted">${x.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(m=>{m.addEventListener("click",()=>{const l=a.find(h=>h.item.id===m.dataset.id);l&&Jt(e,t,l,a,o)})})}function Jt(e,t,a,o,s=0,n=!1){var d,m,l;No(a.item.id),n||window.scrollTo({top:0});const i=Zt(a.nota),r=s+o.length,c=r>0?Math.round(s/r*100):0;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" data-voltar type="button">← Voltar à fila</button>
      <button class="link" data-editar type="button" style="margin-left:auto;">${x.pen} Editar nota</button>
    </div>

    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-progress" title="${s} de ${r} revisadas hoje">
        <div class="review-progress__track"><div class="review-progress__fill" style="width:${c}%"></div></div>
        <span class="review-progress__label">${s} de ${r} revisadas hoje</span>
      </div>
      <div class="review-card__meta">
        ${v(a.tema.nome)}${n&&a.nota.fonte?` · ${v(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${x.star} `:""}${v(a.nota.titulo||"(sem título)")}
        ${Qt(a.item)}
      </div>

      ${i?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${n?`
        <div class="review-card__content markdown-preview">${_e(a.nota.conteudo)}</div>
        <div class="review-actions">
          <button class="btn btn--review-dificil" data-avaliacao="dificil" type="button">${x.caraTriste}<span>Difícil</span></button>
          <button class="btn btn--review-medio" data-avaliacao="medio" type="button">${x.caraNeutra}<span>Médio</span></button>
          <button class="btn btn--review-facil" data-avaliacao="facil" type="button">${x.caraFeliz}<span>Fácil</span></button>
        </div>
        <p class="review-legend">Fácil = lembrei na hora · Médio = com esforço · Difícil = não lembrei</p>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(d=e.querySelector("[data-voltar]"))==null||d.addEventListener("click",()=>void fe(e,t,o)),(m=e.querySelector("[data-editar]"))==null||m.addEventListener("click",()=>{ve(),C(`notas/${a.nota.id}`)}),(l=e.querySelector("#btn-revelar"))==null||l.addEventListener("click",()=>{Jt(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(h=>{h.addEventListener("click",async()=>{const f=h.dataset.avaliacao,p=Po();ve();const b=await xo(a.item.id,f,p),$=await Kt(t.perfilId);b.aposentado?jo(e,t,$):await fe(e,t,$)})})}function jo(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${x.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void fe(e,t,a))}function Yt(e){return e.trim().toLowerCase()}function et(e){const t=new Map;for(const n of e){const i=n.categoria.trim(),r=Yt(i),c=t.get(r);c?c.itens.push(n):t.set(r,{display:i,itens:[n]})}const a=Array.from(t.values()).map(n=>({categoria:n.display,itens:n.itens})),o=a.map(n=>n.categoria),s=new Map;Bt(o.filter(n=>n!=="")).forEach((n,i)=>s.set(n,i)),a.sort((n,i)=>n.categoria===""&&i.categoria!==""?1:i.categoria===""&&n.categoria!==""?-1:(s.get(n.categoria)??0)-(s.get(i.categoria)??0));for(const n of a)n.itens.length>1&&(n.itens=ae(n.itens,i=>i.nome));return a}function tt(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=Yt(o);t.has(s)||t.set(s,o)}return Bt(Array.from(t.values()))}async function ea(e){const a=await(await S()).getAllFromIndex("espacos","perfil_id",e);return ae(a,o=>o.nome)}const zo=["Cursos","Livros","Bíblia"];async function ta(e){const t=await ea(e);return tt([...zo,...t.map(a=>a.categoria)])}async function at(e){return(await S()).get("espacos",e)}async function Ro(e,t,a){const o=await S(),s=R(),n={id:te(),perfil_id:e,nome:t,categoria:a,criado_em:s,atualizado_em:s,arquivado:!1};return await o.put("espacos",n),n}async function Fo(e,t,a){const o=await S(),s=await o.get("espacos",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=R(),await o.put("espacos",s))}async function Be(e,t){const a=await S(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?R():void 0,o.atualizado_em=R(),await a.put("espacos",o))}async function aa(e){const t=await S(),a=await t.getAllFromIndex("temas","espaco_id",e);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).length;return{temas:a.length,notas:o}}async function oa(e){const t=await S(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(c=>t.getAllFromIndex("notas","tema_id",c.id)))).flat(),i=(await Promise.all(s.map(c=>t.getAllFromIndex("itens_revisao","nota_id",c.id)))).flat(),r=t.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");await r.objectStore("espacos").delete(e);for(const c of a)await r.objectStore("temas").delete(c.id);for(const c of s)await r.objectStore("notas").delete(c.id);for(const c of i)await r.objectStore("itens_revisao").delete(c.id);await r.done}function oe(e){return new Promise(t=>{var n,i;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${v(e.title)}</div>
        <p class="modal__message">${v(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${v(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${v(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=r=>{r.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(r){document.removeEventListener("keydown",o),a.remove(),t(r)}(n=a.querySelector("#modal-confirm"))==null||n.addEventListener("click",()=>s(!0)),(i=a.querySelector("#modal-cancel"))==null||i.addEventListener("click",()=>s(!1)),a.addEventListener("click",r=>{r.target===a&&s(!1)})})}function be(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${v(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${v(a)}">${v(a)}</button>`).join("")}
    </div>
  `}function ot(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ie(o),o.focus()})})})}async function ue(e,t){var m,l,h,f;const a=await ea(t.perfilId),o=a.filter(p=>!p.arquivado),s=a.filter(p=>p.arquivado),n=await Ho(a.map(p=>p.id)),i=et(o),r=await ta(t.perfilId);e.innerHTML=`
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
        ${be(r,"input-categoria-espaco")}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-espaco" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-espaco" type="button">Cancelar</button>
      </div>
    </div>

    ${o.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.bookOpen}</div>
        <div class="empty-state__title">Nenhum espaço de estudo ainda</div>
        <p class="empty-state__hint">Crie um espaço (ex: "Curso de Investimentos") para organizar seus temas e notas.</p>
        <button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-espaco" type="button">Criar o primeiro espaço</button>
      </div>
    `:i.map(p=>`
      <details class="category-group">
        <summary class="category-group__title" ${p.categoria?`style="--group-accent:${D(p.categoria.toLowerCase())}"`:""}>
          <span class="category-group__label">
            ${p.categoria?`<span class="color-dot" style="--dot-color:${D(p.categoria.toLowerCase())}"></span>`:""}
            ${v(p.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${p.itens.map(b=>Oo(b,n.get(b.id)??0)).join("")}
        </div>
      </details>
    `).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(p=>`
            <div class="item-row" data-id="${v(p.id)}">
              <button class="item-row__main" data-open="${v(p.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title">${v(p.nome)}</span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${v(p.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,ot(e);const c=e.querySelector("#form-novo-espaco"),d=()=>{var p;c.style.display="block",(p=e.querySelector("#input-nome-espaco"))==null||p.focus()};(m=e.querySelector("#btn-novo-espaco"))==null||m.addEventListener("click",d),(l=e.querySelector("#btn-empty-novo-espaco"))==null||l.addEventListener("click",d),(h=e.querySelector("#btn-cancelar-espaco"))==null||h.addEventListener("click",()=>{c.style.display="none"}),(f=e.querySelector("#btn-salvar-espaco"))==null||f.addEventListener("click",async()=>{const p=e.querySelector("#input-nome-espaco"),b=e.querySelector("#input-categoria-espaco"),$=p.value.trim();if(!$)return;const L=await Ro(t.perfilId,$,b.value.trim());C(`espacos/${L.id}`)}),e.querySelectorAll("[data-open]").forEach(p=>{p.addEventListener("click",()=>C(`espacos/${p.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(p=>{p.addEventListener("click",async()=>{await Be(p.dataset.archive,!0),ue(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(p=>{p.addEventListener("click",async()=>{await Be(p.dataset.unarchive,!1),ue(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(p=>{p.addEventListener("click",async()=>{const b=p.dataset.excluir,$=p.dataset.nome??"",L=await aa(b);await oe({title:`Excluir "${$}"?`,message:`Isso vai apagar ${L.temas} tema(s) e ${L.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await oa(b),ue(e,t))})})}function Oo(e,t){return`
    <div class="item-row" data-id="${v(e.id)}" style="--row-accent:${D(e.id)}">
      <button class="item-row__main" data-open="${v(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title">${v(e.nome)}</span>
        <span class="item-row__meta">${t} tema(s)</span>
      </button>
      <div class="item-row__actions">
        <button class="btn btn--secondary btn--sm" data-archive="${v(e.id)}" type="button" title="As revisões já agendadas continuam normalmente — só some da lista principal">Arquivar</button>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button data-excluir="${v(e.id)}" data-nome="${v(e.nome)}" class="danger" type="button">Excluir</button>
          </div>
        </details>
      </div>
    </div>
  `}async function Ho(e){const t=await S(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function sa(e){const a=await(await S()).getAllFromIndex("temas","espaco_id",e);return ae(a,o=>o.nome)}async function na(e){return(await S()).get("temas",e)}async function Bo(e,t,a){const o=await S(),s=R(),n={id:te(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",n),n}async function Uo(e,t,a){const o=await S(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=R(),await o.put("temas",s))}async function Vo(e){const t=await S(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=R(),await t.put("temas",a),a.favorito):!1}async function Go(e){return{notas:(await(await S()).getAllFromIndex("notas","tema_id",e)).length}}async function Ko(e){const t=await S(),a=await t.getAllFromIndex("notas","tema_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat(),n=t.transaction(["temas","notas","itens_revisao"],"readwrite");await n.objectStore("temas").delete(e);for(const i of a)await n.objectStore("notas").delete(i.id);for(const i of s)await n.objectStore("itens_revisao").delete(i.id);await n.done}function Wo(e,t){let a=e.has(t)?t:G(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=G(a,-1);return o}function Zo(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const Xo=5;async function Qo(e){const t=await S(),a=Q(),o=G(a,-6),[s,n]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))]),i=s.filter(u=>u.avaliacao),r=i.filter(u=>u.data_concluida===a),c=r.length,d=r.reduce((u,k)=>u+(k.duracao_segundos??0),0),m=i.filter(u=>u.data_concluida&&u.data_concluida>=o&&u.data_concluida<=a).length,l=["1","7","30","180"].map(u=>({estagio:u,count:n.filter(k=>k.estagio===u).length})),h=[];for(let u=1;u<=7;u++){const k=G(a,u);h.push({data:k,count:n.filter(j=>j.data_agendada===k).length})}const f=G(a,-29),p=i.filter(u=>u.data_concluida>=f),b={facil:p.filter(u=>u.avaliacao==="facil").length,medio:p.filter(u=>u.avaliacao==="medio").length,dificil:p.filter(u=>u.avaliacao==="dificil").length,total:0};b.total=b.facil+b.medio+b.dificil;const $=new Set(i.map(u=>u.data_concluida)),L=Wo($,a),E=[];for(let u=6;u>=0;u--)E.push($.has(G(a,-u)));const N=i.filter(u=>u.estagio==="consulta").length,P=i.filter(u=>u.avaliacao==="dificil"),W=Array.from(new Set(P.map(u=>u.nota_id))),B=await Promise.all(W.map(u=>t.get("notas",u))),Z=new Map(B.filter(u=>!!u).map(u=>[u.id,u.tema_id])),K=new Map;for(const u of P){const k=Z.get(u.nota_id);k&&K.set(k,(K.get(k)??0)+1)}const U=Array.from(K.keys()),T=(await Promise.all(U.map(u=>t.get("temas",u)))).filter(u=>!!u).map(u=>({temaId:u.id,temaNome:u.nome,count:K.get(u.id)})).sort((u,k)=>k.count-u.count).slice(0,Xo),A=await t.getAllFromIndex("espacos","perfil_id",e),_=A.filter(u=>!u.arquivado).length,z=(await Promise.all(A.map(u=>t.getAllFromIndex("temas","espaco_id",u.id)))).flat(),V=z.length,y=(await Promise.all(z.map(u=>t.getAllFromIndex("notas","tema_id",u.id)))).reduce((u,k)=>u+k.length,0);return{revisoesHoje:c,revisoesUltimos7Dias:m,streakDias:L,diasAtivosUltimos7:E,rankingDificeis:T,espacosAtivos:_,totalTemas:V,totalNotas:y,itensEmConsulta:N,porEstagio:l,tempoHojeSegundos:d,cargaProximos7:h,retencao30:b}}async function Jo(e){const t=await S(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("notas","tema_id",i.id)))).flat();return(await Promise.all(s.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat().reduce((i,r)=>i+(r.duracao_segundos??0),0)}async function Yo(e){const t=await S(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,n)=>s+(n.duracao_segundos??0),0)}function ia(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${v(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${v(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=n=>{n.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()})}const wt=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}];function es(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function ra(e,t,a,o){var s;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra testar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o);return}ts(e,t,a,o)}function ts(e,t,a,o){var s;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Voltar</button>
    </div>
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <h2 style="margin:0;">Avaliação aleatória — ${v(a)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse rápido com notas aleatórias, sem afetar sua fila de revisão. ${t.length} nota(s) no total — escolha quantas:
        </p>
        <div class="stack">
          ${wt.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const i=wt.find(c=>c.key===n.dataset.tier),r=es(t).slice(0,Math.min(i.n,t.length));Ue(e,r,0,a,o)})})}function Ue(e,t,a,o,s,n=!1){var r,c,d;if(a>=t.length){as(e,t.length,o,s);return}const i=t[a];e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Encerrar avaliação</button>
    </div>
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${v(i.tema.nome)} · ${a+1} de ${t.length}</div>
      <div class="review-card__titulo">${i.nota.favorito?`${x.star} `:""}${v(i.nota.titulo||"(sem título)")}</div>
      ${n?`
        <div class="review-card__content markdown-preview">${_e(i.nota.conteudo)}</div>
        <button class="btn btn--primary" id="btn-proxima" type="button">${a+1<t.length?"Próxima":"Terminar"}</button>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(r=e.querySelector("#btn-sair-avaliacao"))==null||r.addEventListener("click",s),(c=e.querySelector("#btn-revelar"))==null||c.addEventListener("click",()=>{Ue(e,t,a,o,s,!0)}),(d=e.querySelector("#btn-proxima"))==null||d.addEventListener("click",()=>{Ue(e,t,a+1,o,s,!1)})}function as(e,t,a,o){var s;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${x.confete}</div>
      <h2 style="margin:0;">Repasse concluído</h2>
      <p class="text-muted" style="margin:0;">
        Você passou por ${t} nota(s) de ${v(a)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `,(s=e.querySelector("#btn-terminar"))==null||s.addEventListener("click",o)}function st(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.colorKey?`<span class="color-dot" style="--dot-color:${D(t.colorKey)}"></span>`:""}${v(t.label)}`,n=a===e.length-1,i=t.route&&!n?`<button class="link" data-crumb="${v(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?i:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${i}`}).join("")}
    </div>
  `}function nt(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>C(t.dataset.crumb))})}async function me(e,t){var $,L,E,N,P,W,B,Z,K,U,w,T,A;const a=await at(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await sa(t),s=await os(o.map(_=>_.id)),n=et(o),i=await ta(a.perfil_id),r=tt(o.map(_=>_.categoria)),c=[...o].sort((_,q)=>q.criado_em.localeCompare(_.criado_em))[0],d=(($=c==null?void 0:c.categoria)==null?void 0:$.trim())||void 0,m=((L=c==null?void 0:c.nome)==null?void 0:L.trim())||void 0;e.innerHTML=`
    ${st([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,colorKey:a.id}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${D(a.id)}"></span>${v(a.nome)}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-editar" type="button">Editar</button>
        <button class="btn btn--secondary btn--sm" id="btn-arquivar" type="button" ${a.arquivado?"":'title="As revisões já agendadas continuam normalmente — só some da lista principal"'}>
          ${a.arquivado?"Reativar":"Arquivar"}
        </button>
        <a class="btn btn--secondary btn--sm" href="#/espacos/${v(a.id)}/pdf">PDF</a>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-detalhes" type="button">${x.info} Detalhes</button>
            <button id="btn-avaliar" type="button">${x.dice} Avaliação aleatória</button>
            <button id="btn-excluir" class="danger" type="button">Excluir espaço</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-espaco" style="display:none" class="card content-narrow">
      <div class="field">
        <label class="field__label" for="input-nome-espaco-editar">Nome</label>
        <input class="input" id="input-nome-espaco-editar" type="text" value="${v(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${v(a.categoria)}" maxlength="80" />
        ${be(i,"input-categoria-espaco-editar")}
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
        <input class="input${m?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${v(m??"")}" />
        ${m?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema">Categoria (opcional)</label>
        <input class="input${d?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${v(d??"")}" />
        ${d?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${be(r,"input-categoria-tema")}
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
        <div class="empty-state__icon" aria-hidden="true">${x.folder}</div>
        <div class="empty-state__title">Nenhum tema neste espaço ainda</div>
        <p class="empty-state__hint">Temas organizam as notas dentro de um espaço — ex: "Renda Fixa", "Renda Variável".</p>
        ${a.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-tema" type="button">Criar o primeiro tema</button>'}
      </div>
    `:n.map(_=>`
      <details class="category-group">
        <summary class="category-group__title" ${_.categoria?`style="--group-accent:${D(_.categoria.toLowerCase())}"`:""}>
          <span class="category-group__label">
            ${_.categoria?`<span class="color-dot" style="--dot-color:${D(_.categoria.toLowerCase())}"></span>`:""}
            ${v(_.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${v(_.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${v(po(_.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${_.itens.map(q=>`
            <button class="item-row" data-open="${v(q.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${D(_.categoria?_.categoria.toLowerCase():q.id)}">
              <span class="item-row__main">
                <span class="item-row__title">${q.favorito?`${x.star} `:""}${v(q.nome)}</span>
                <span class="item-row__meta">${s.get(q.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `).join("")}
  `,nt(e),ot(e),e.querySelectorAll("[data-pdf-categoria]").forEach(_=>{_.addEventListener("click",q=>{q.preventDefault(),q.stopPropagation(),C(`espacos/${t}/pdf/${_.dataset.pdfCategoria}`)})}),(E=e.querySelector("#btn-arquivar"))==null||E.addEventListener("click",async()=>{!a.arquivado&&!await oe({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await Be(a.id,!a.arquivado),me(e,t))});const l=e.querySelector("#form-editar-espaco");(N=e.querySelector("#btn-editar"))==null||N.addEventListener("click",()=>{var _;l.style.display="block",(_=e.querySelector("#input-nome-espaco-editar"))==null||_.focus()}),(P=e.querySelector("#btn-cancelar-edicao"))==null||P.addEventListener("click",()=>{l.style.display="none"}),(W=e.querySelector("#btn-salvar-edicao"))==null||W.addEventListener("click",async()=>{const _=e.querySelector("#input-nome-espaco-editar").value.trim(),q=e.querySelector("#input-categoria-espaco-editar").value.trim();_&&(await Fo(a.id,_,q),me(e,t))}),(B=e.querySelector("#btn-detalhes"))==null||B.addEventListener("click",async()=>{const _=Array.from(s.values()).reduce((u,k)=>u+k,0),q=O(),z=await Jo(a.id);let V,g,y;if(a.arquivado&&a.arquivado_em){const u=ce(O(new Date(a.criado_em)),O(new Date(a.arquivado_em)));V=String(u),g="Dias até arquivar",y=`Criado em ${Y(a.criado_em)} · arquivado em ${Y(a.arquivado_em)}`}else if(a.arquivado)V="—",g="Duração",y=`Criado em ${Y(a.criado_em)} · arquivado antes desse registro de data existir`;else{const u=ce(O(new Date(a.criado_em)),q);V=String(u),g=u===1?"Dia ativo":"Dias ativo",y=`Criado em ${Y(a.criado_em)}`}ia({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${o.length}</div>
            <div class="stat-tile__label">Temas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${_}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Qe(z)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${V}</div>
            <div class="stat-tile__label">${g}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${y} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(Z=e.querySelector("#btn-avaliar"))==null||Z.addEventListener("click",async()=>{const _=await ro(a.id);ra(e,_,a.nome,()=>me(e,t))}),(K=e.querySelector("#btn-excluir"))==null||K.addEventListener("click",async()=>{const _=await aa(a.id);await oe({title:`Excluir "${a.nome}"?`,message:`Isso vai apagar ${_.temas} tema(s) e ${_.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await oa(a.id),C("espacos"))});const h=e.querySelector("#form-novo-tema"),f=()=>{var _;h&&(h.style.display="block"),(_=e.querySelector("#input-nome-tema"))==null||_.focus()};(U=e.querySelector("#btn-novo-tema"))==null||U.addEventListener("click",f),(w=e.querySelector("#btn-empty-novo-tema"))==null||w.addEventListener("click",f),(T=e.querySelector("#btn-cancelar-tema"))==null||T.addEventListener("click",()=>{h&&(h.style.display="none")});const p=e.querySelector("#input-nome-tema");m&&p&&p.addEventListener("input",()=>ie(p),{once:!0});const b=e.querySelector("#input-categoria-tema");d&&b&&b.addEventListener("input",()=>ie(b),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(_=>{_.addEventListener("click",q=>{var z;q.preventDefault(),q.stopPropagation(),h&&(h.style.display="block"),b&&(b.value=_.dataset.novoTemaCategoria,ie(b)),(z=e.querySelector("#input-nome-tema"))==null||z.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(A=e.querySelector("#btn-salvar-tema"))==null||A.addEventListener("click",async()=>{const _=e.querySelector("#input-nome-tema"),q=e.querySelector("#input-categoria-tema"),z=_.value.trim();if(!z)return;const V=await Bo(t,z,q.value.trim());C(`temas/${V.id}`)}),e.querySelectorAll("[data-open]").forEach(_=>{_.addEventListener("click",()=>C(`temas/${_.dataset.open}`))})}async function os(e){const t=await S(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function ss(e){const t=await S(),a=await t.get("espacos",e);if(!a)return;const o=await t.getAllFromIndex("temas","espaco_id",e),s=et(o),n=Ze()==="titulo",i=[];for(const r of s){const c=[];for(const d of r.itens){const m=await t.getAllFromIndex("notas","tema_id",d.id);n?ae(m,h=>h.titulo):m.sort((h,f)=>h.criado_em.localeCompare(f.criado_em));const l=[];for(const h of m){const p=(await t.getAllFromIndex("itens_revisao","nota_id",h.id)).map(b=>b.avaliacao).filter(b=>!!b);l.push({nota:h,fraca:Zo(p)})}c.push({tema:d,notas:l})}i.push({categoria:r.categoria,temas:c})}return{espaco:a,grupos:i}}function Ae(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${ye.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const $t=["•","◦","▪"];function ca(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${Ae(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const n=Math.floor((t.length-t.trimStart().length)/2),i=$t[Math.min(n,$t.length-1)];return`${"  ".repeat(n)}${i} ${Ae(s[1])}`}return Ae(a)}).join(`
`)}function ns(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",ca(e.conteudo)),t.join(`
`).trim()}function is(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of t)if(o.temas.length!==0){a.push("",`▸ ${(o.categoria||"Sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.tema.favorito?"⭐ ":""}*${s.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const n of s.notas){const i=`${n.nota.favorito?"⭐ ":""}${n.fraca?"⚠ ":""}`;a.push("",`${i}*${n.nota.titulo||"(sem título)"}*`),n.nota.fonte&&a.push(`_${n.nota.fonte}_`),a.push(ca(n.nota.conteudo))}}}return a.join(`
`).trim()}async function rs(e,t,a){var c,d;const o=await ss(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,n=a===void 0?o.grupos:o.grupos.filter(m=>m.categoria===a),i=is(s,n);e.innerHTML=`
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
        <span class="color-dot" style="--dot-color:${D(s.id)}"></span>${v(s.nome)}
      </h1>
      <p class="pdf-meta">
        ${a!==void 0?`Categoria: ${v(a||"Sem categoria")} · `:""}Gerado em ${Y(O()+"T00:00:00Z")}
      </p>

      ${n.every(m=>m.temas.length===0)?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:n.map(m=>{const l=m.categoria?m.categoria.toLowerCase():s.id;return`
        <section class="pdf-category" style="--cat-accent:${D(l)}">
          <div class="pdf-category__title">
            <span class="color-dot" style="--dot-color:${D(l)}"></span>${v(m.categoria||"Sem categoria")}
          </div>
          ${m.temas.map(h=>{const f=h.tema.categoria?h.tema.categoria.toLowerCase():h.tema.id;return`
            <section class="pdf-tema" style="--tema-accent:${D(f)}">
              <div class="pdf-tema__title">${h.tema.favorito?`${x.star} `:""}${v(h.tema.nome)}</div>
              ${h.notas.length===0?'<p class="text-muted">Sem notas.</p>':h.notas.map(p=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${p.nota.favorito?`${x.star} `:""}${p.fraca?`${x.alert} Reforçar — `:""}${v(p.nota.titulo||"(sem título)")}
                  </div>
                  ${p.nota.fonte?`<div class="pdf-nota__meta">${v(p.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${_e(p.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `}).join("")}
        </section>
      `}).join("")}
    </article>
  `,(c=e.querySelector("[data-back]"))==null||c.addEventListener("click",()=>C(`espacos/${t}`)),(d=e.querySelector("#btn-imprimir"))==null||d.addEventListener("click",()=>window.print());const r=e.querySelector("#btn-copiar");r==null||r.addEventListener("click",async()=>{const m=r.textContent;try{await navigator.clipboard.writeText(i),r.textContent="Copiado!"}catch{r.textContent="Não foi possível copiar"}setTimeout(()=>{r.textContent=m},1800)})}async function pe(e,t){var d,m,l,h,f,p,b,$,L;const a=await na(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await at(a.espaco_id),s=await Ut(t),n=o?await sa(o.id):[],i=tt(n.map(E=>E.categoria)),r=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${st([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${D(r)}"></span>${a.favorito?`${x.star} `:""}${v(a.nome)}
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
            <button id="btn-detalhes-tema" type="button">${x.info} Detalhes</button>
            <button id="btn-avaliar-tema" type="button">${x.dice} Avaliação aleatória</button>
            <button id="btn-excluir-tema" class="danger" type="button">Excluir tema</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-tema" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-nome-tema-editar">Nome</label>
        <input class="input" id="input-nome-tema-editar" type="text" value="${v(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-tema-editar" type="text" value="${v(a.categoria)}" maxlength="80" />
        ${be(i,"input-categoria-tema-editar")}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${o!=null&&o.arquivado?`<div class="banner banner--warning"><span>O espaço "${v(o.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`:""}

    ${s.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${o!=null&&o.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>'}
      </div>
    `:`
      <div class="item-list">
        ${s.map(E=>`
          <button class="item-row" data-open="${v(E.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${D(r)}">
            <span class="item-row__main">
              <span class="item-row__title">${E.favorito?`${x.star} `:""}${v(E.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${v(E.fonte||"Sem fonte")}${E.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${E.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,nt(e),ot(e),(d=e.querySelector("#btn-nova-nota"))==null||d.addEventListener("click",()=>C(`temas/${t}/nova-nota`)),(m=e.querySelector("#btn-empty-nova-nota"))==null||m.addEventListener("click",()=>C(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(E=>{E.addEventListener("click",()=>C(`notas/${E.dataset.open}`))}),(l=e.querySelector("#btn-favoritar-tema"))==null||l.addEventListener("click",async()=>{await Vo(a.id),pe(e,t)}),(h=e.querySelector("#btn-detalhes-tema"))==null||h.addEventListener("click",async()=>{const E=await Yo(a.id),N=ce(O(new Date(a.criado_em)),O());ia({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Qe(E)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${N}</div>
            <div class="stat-tile__label">${N===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${Y(a.criado_em)}</p>
      `})}),(f=e.querySelector("#btn-avaliar-tema"))==null||f.addEventListener("click",()=>{const E=s.map(N=>({nota:N,tema:a}));ra(e,E,a.nome,()=>pe(e,t))});const c=e.querySelector("#form-editar-tema");(p=e.querySelector("#btn-editar-tema"))==null||p.addEventListener("click",()=>{var E;c.style.display="block",(E=e.querySelector("#input-nome-tema-editar"))==null||E.focus()}),(b=e.querySelector("#btn-cancelar-edicao-tema"))==null||b.addEventListener("click",()=>{c.style.display="none"}),($=e.querySelector("#btn-salvar-edicao-tema"))==null||$.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-tema-editar").value.trim(),N=e.querySelector("#input-categoria-tema-editar").value.trim();E&&(await Uo(a.id,E,N),pe(e,t))}),(L=e.querySelector("#btn-excluir-tema"))==null||L.addEventListener("click",async()=>{const E=await Go(a.id);await oe({title:`Excluir "${a.nome}"?`,message:`Isso vai apagar ${E.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await Ko(a.id),C(`espacos/${a.espaco_id}`))})}function le(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${v(e)}</div>
    </details>
  `}let we=!1,Ve=null;function cs(e){we=e}function Et(){we=!1}function ls(e){Ve=e}function re(){return we?Ve?Ve():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function ds(){window.addEventListener("beforeunload",e=>{we&&(e.preventDefault(),e.returnValue="")})}const us={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function qe(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function ge(e,t){var w,T,A,_,q,z,V;const a=t.mode==="nova"?t.temaId:(w=await gt(t.notaId))==null?void 0:w.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await na(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await at(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${v(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(T=e.querySelector("#btn-voltar-arquivado"))==null||T.addEventListener("click",()=>C(`temas/${a}`));return}const n=t.mode==="editar"?await gt(t.notaId):void 0,i=n?await ms(n.id):!1,r=t.mode==="nova"?(await Ut(a)).at(-1):void 0,c=r==null?void 0:r.titulo,d=r==null?void 0:r.fonte;e.innerHTML=`
    ${st([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(n==null?void 0:n.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&n?`<div class="section-header__meta text-muted">Criada em ${Y(n.criado_em)}${n.atualizado_em!==n.criado_em?` · Editada em ${Y(n.atualizado_em)}`:""}</div>`:""}
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

    <div class="content-narrow" style="max-width:900px;">
    <div class="card stack">
      <div class="field">
        <label class="field__label" for="input-titulo">Título${le('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${c?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${v((n==null?void 0:n.titulo)??c??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${c?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${le("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${d?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${v((n==null?void 0:n.fonte)??d??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${d?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${le("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
        <div class="editor-toolbar" role="toolbar" aria-label="Formatação do conteúdo">
          <button type="button" class="editor-toolbar__btn" data-cmd="bold" title="Negrito (Ctrl+B)" aria-label="Negrito"><strong>N</strong></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="italic" title="Itálico (Ctrl+I)" aria-label="Itálico"><em>I</em></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="underline" title="Sublinhado (Ctrl+U)" aria-label="Sublinhado"><u>U</u></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="strikeThrough" title="Tachado (Ctrl+S)" aria-label="Tachado"><s>S</s></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="insertUnorderedList" title="Lista com marcadores (Tab indenta, Shift+Tab volta)" aria-label="Lista com marcadores">☰</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="createLink" title="Link (Ctrl+K)" aria-label="Link">🔗</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="removeFormat" title="Limpar formatação" aria-label="Limpar formatação">⌫</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <button type="button" class="editor-toolbar__btn" data-cmd="undo" title="Desfazer (Ctrl+Z)" aria-label="Desfazer">${x.undo}</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="redo" title="Refazer (Ctrl+Y ou Ctrl+Shift+Z)" aria-label="Refazer">${x.redo?x.redo:x.undo}</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <div class="color-picker" role="group" aria-label="Cor do texto">
            ${ye.map(g=>`<button type="button" class="color-picker__swatch" data-cor="${g}" style="--dot-color:${us[g]}" title="${v(ht[g])}" aria-label="${v(ht[g])}"></button>`).join("")}
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
        >${n!=null&&n.conteudo?_e(n.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${n!=null&&n.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${le("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
        </div>
      </div>

      <div class="field" id="wrapper-validade" style="display:${n!=null&&n.pode_desatualizar?"flex":"none"};">
        <label class="field__label" for="input-validade">Válido até</label>
        <input class="input" id="input-validade" type="date" value="${v((n==null?void 0:n.validade_ate)??"")}" style="max-width: 200px;" />
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
  `;const m=`temas/${a}`;nt(e),(A=e.querySelector("#btn-cancelar"))==null||A.addEventListener("click",()=>{re()&&(Et(),C(m))});const l=e.querySelector("#input-conteudo"),h=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),p=()=>cs(!0);h.addEventListener("input",p),f.addEventListener("input",p),l.addEventListener("input",p),ls(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),c&&h.addEventListener("input",()=>ie(h),{once:!0}),d&&f.addEventListener("input",()=>ie(f),{once:!0}),l.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function b(g){var u,k;let y=((k=(u=window.getSelection())==null?void 0:u.getRangeAt(0))==null?void 0:k.commonAncestorContainer)??null;for(;y&&y!==l;){if(y instanceof HTMLElement&&y.tagName===g)return!0;y=y.parentNode}return!1}function $(){const g=window.getSelection();if(!g||g.rangeCount===0)return;let y=g.getRangeAt(0).commonAncestorContainer;for(;y&&y!==l;){if(y instanceof HTMLElement&&y.tagName==="LI"){const u=document.createRange();u.selectNodeContents(y),u.collapse(!1),g.removeAllRanges(),g.addRange(u);return}y=y.parentNode}}function L(){l.querySelectorAll("p").forEach(g=>{g.querySelector("ul")&&g.replaceWith(...Array.from(g.childNodes))})}function E(){const g=window.getSelection(),y=g.getRangeAt(0);y.deleteContents();const u=document.createElement("br");y.insertNode(u);const k=document.createTextNode("​");u.after(k);const j=document.createRange();return j.setStart(k,1),j.collapse(!0),g.removeAllRanges(),g.addRange(j),{br:u,ancora:k}}function N(){if(!P)return;const{br:g,ancora:y}=P;if(P=null,!document.contains(y))return;const u=y.parentNode;if(!u)return;const k=Array.from(u.childNodes).indexOf(y);y.remove();const j=window.getSelection();if(!j||!document.contains(g))return;const F=document.createRange();F.setStart(u,k),F.collapse(!0),j.removeAllRanges(),j.addRange(F)}let P=null;l.addEventListener("keydown",g=>{if(g.key!=="Enter"||g.shiftKey||g.ctrlKey||g.metaKey||g.altKey||b("LI")){P=null;return}g.preventDefault(),P&&document.contains(P.br)?(P.ancora.remove(),P.br.remove(),document.execCommand("insertParagraph"),P=null):P=E()}),l.addEventListener("mousedown",()=>{P=null}),l.addEventListener("keydown",g=>{g.key!=="Tab"||!b("LI")||(g.preventDefault(),N(),document.execCommand(g.shiftKey?"outdent":"indent"),L())});function W(){var g;l.classList.toggle("is-empty",!((g=l.textContent)!=null&&g.trim()))}l.addEventListener("input",()=>{if(l.childNodes.length===0){l.innerHTML="<p><br></p>";const g=l.firstChild,y=document.createRange();y.setStart(g,0),y.collapse(!0);const u=window.getSelection();u==null||u.removeAllRanges(),u==null||u.addRange(y)}W()}),W(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(g=>{g.addEventListener("mousedown",y=>y.preventDefault()),g.addEventListener("click",()=>{N();const y=g.dataset.cmd;if(y==="strikeThrough")document.execCommand("strikeThrough");else if(y==="createLink"){const u=window.getSelection();if(!u||u.isCollapsed){l.focus();return}const k=prompt("URL do link:","https://");k&&k.trim()&&document.execCommand("createLink",!1,k.trim())}else y==="removeFormat"?document.execCommand("removeFormat"):document.execCommand(y);y==="insertUnorderedList"&&(L(),$()),l.focus(),U()})}),e.querySelectorAll(".color-picker__swatch").forEach(g=>{g.addEventListener("mousedown",y=>y.preventDefault()),g.addEventListener("click",()=>{N();const y=g.dataset.cor,u=window.getSelection();if(!u||u.rangeCount===0||u.isCollapsed)return;const k=u.getRangeAt(0);if(!l.contains(k.commonAncestorContainer))return;const j=k.extractContents();qe(j);const F=document.createElement("span");F.className=`text-color text-color--${y}`,F.appendChild(j),k.insertNode(F),u.removeAllRanges();const X=document.createRange();X.selectNodeContents(F),u.addRange(X),l.focus()})});const B=e.querySelector("[data-cor-limpar]");B.addEventListener("mousedown",g=>g.preventDefault()),B.addEventListener("click",()=>{N();const g=window.getSelection();if(!g||g.rangeCount===0)return;const y=g.getRangeAt(0);if(l.contains(y.commonAncestorContainer)){if(y.collapsed){let u=y.commonAncestorContainer;for(;u&&u!==l;){if(u instanceof HTMLElement&&u.classList.contains("text-color")){const k=u.parentNode;if(k){const j=document.createDocumentFragment();Array.from(u.childNodes).forEach(F=>j.appendChild(F)),k.replaceChild(j,u),qe(k)}break}u=u.parentNode}}else{const u=y.extractContents();qe(u),y.insertNode(u)}l.focus()}});const Z=e.querySelector("#input-pode-desatualizar"),K=e.querySelector("#wrapper-validade");Z.addEventListener("change",()=>{K.style.display=Z.checked?"flex":"none"});function U(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(y=>{const u=y.dataset.cmd;try{u==="bold"||u==="italic"||u==="underline"||u==="strikeThrough"||u==="insertUnorderedList"?y.setAttribute("aria-pressed",document.queryCommandState(u)?"true":"false"):y.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===l&&U()}),l.addEventListener("keyup",U),l.addEventListener("mouseup",U),l.addEventListener("focus",U),l.addEventListener("keydown",g=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?g.metaKey:g.ctrlKey))return;let k=!0;switch(g.key.toLowerCase()){case"b":g.preventDefault(),document.execCommand("bold");break;case"i":g.preventDefault(),document.execCommand("italic");break;case"u":g.preventDefault(),document.execCommand("underline");break;case"s":g.preventDefault(),document.execCommand("strikeThrough");break;case"k":g.preventDefault(),N();const j=window.getSelection();if(j&&!j.isCollapsed){const F=prompt("URL do link:","https://");F&&F.trim()&&document.execCommand("createLink",!1,F.trim())}break;case"z":g.preventDefault(),g.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":g.preventDefault(),document.execCommand("redo");break;default:k=!1}k&&U()}),(_=e.querySelector("#btn-salvar"))==null||_.addEventListener("click",async()=>{const g=h.value.trim(),y=qo(l).trim();let u=null;const k=(X,ha)=>{var rt;X.classList.add("input--error"),X.setAttribute("aria-invalid","true");const Ee=(rt=X.closest(".field"))==null?void 0:rt.querySelector(".field__error");Ee&&(Ee.textContent=ha,Ee.style.display="block"),u||(u=X)},j=X=>{X.classList.remove("input--error"),X.removeAttribute("aria-invalid")};if(g||k(h,"Informe um título para a nota."),y||k(l,"Informe o conteúdo da nota."),u){u.focus();return}j(h),j(l);const F={titulo:g,conteudo:y,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:Z.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await co(a,F):await lo(t.notaId,F),Et(),C(m)}),t.mode==="editar"&&n){(q=e.querySelector("#btn-favoritar-nota"))==null||q.addEventListener("click",async()=>{await uo(n.id),ge(e,t)}),(z=e.querySelector("#btn-parar-revisar"))==null||z.addEventListener("click",async()=>{await ko(n.id),ge(e,t)});const g=e.querySelector("#btn-compartilhar-nota");g==null||g.addEventListener("click",async()=>{const y=ns(n);if(navigator.share){try{await navigator.share({title:n.titulo||"Nota",text:y})}catch{}return}const u=g.textContent;try{await navigator.clipboard.writeText(y),g.textContent="Copiado!"}catch{g.textContent="Não foi possível copiar"}setTimeout(()=>{g.textContent=u},1800)}),(V=e.querySelector("#btn-excluir-nota"))==null||V.addEventListener("click",async()=>{await oe({title:"Excluir esta nota?",message:`Isso vai apagar a nota e todo o seu histórico de revisões.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await mo(n.id),C(m))})}}async function ms(e){return(await(await S()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function ps(e){return e.length===10?e:O(new Date(e))}function vs(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function fs(e){const t=new Set;for(const a of e)a&&t.add(ps(a));return t}function la(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Te(e){return e.size}function bs(e,t,a=365,o=O()){const s=G(o,-a+1),n=[];let i=s;for(;i<=o;)n.push({date:i,count:(e.has(i)?1:0)+(t.has(i)?1:0),hasRevisao:e.has(i),hasCriacao:t.has(i)}),i=G(i,1);const r=Te(e),c=Te(t),d=Te(la(e,t));return{days:n,totalDiasRevisao:r,totalDiasCriacao:c,totalDiasAtividade:d}}async function da(e){const t=await S(),a=O(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const E=await t.getAllFromIndex("espacos","perfil_id",e),P=(await Promise.all(E.map(B=>t.getAllFromIndex("temas","espaco_id",B.id)))).flat();return(await Promise.all(P.map(B=>t.getAllFromIndex("notas","tema_id",B.id)))).flat()})()]),n=o.filter(E=>E.data_concluida).map(E=>E.data_concluida),i=vs(n),r=fs(s.map(E=>E.criado_em)),c=o.filter(E=>E.data_concluida===a).length,d=s.filter(E=>O(new Date(E.criado_em))===a).length,m=a.slice(0,4),l=a.slice(5,7),h=`${m}-${l}`,f=n.filter(E=>E.startsWith(h)).length,p=s.filter(E=>O(new Date(E.criado_em)).startsWith(h)).length,b=i.size,$=r.size,L=la(i,r).size;return{datasRevisaoSet:i,datasCriacaoSet:r,totalDiasRevisao:b,totalDiasCriacao:$,totalDiasAtividade:L,notasCriadasHoje:d,revisoesFeitasHoje:c,notasCriadasEsteMes:p,revisoesFeitasEsteMes:f}}async function gs(e,t=365){const a=await da(e);return bs(a.datasRevisaoSet,a.datasCriacaoSet,t)}function hs(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function ys(e,t,a){var r;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const n=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let c=0;c<n;c++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const c of e)s.push(c),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((r=o.at(-1))==null?void 0:r.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(c=>`
          <div class="heatmap__col">
            ${c.map(d=>`
              <div class="heatmap__cell heatmap__cell--${hs(d.count)}${d.date?"":" heatmap__cell--empty"}" title="${d.date?`${d.date}${d.count?` · ${d.count} atividade(s)`:""}${d.hasRevisao&&d.hasCriacao?" (revisão + criação)":d.hasRevisao?" (revisão)":d.hasCriacao?" (criação)":""}`:""}"></div>
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
        ${v(String(t))} dias estudados · ${v(String(a))} dias com criação de notas · ${v(String(e.filter(c=>c.count>0).length))} dias com atividade nos últimos ${v(String(e.length))} dias
      </p>
    </div>
  `}const _s={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function ws(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function $s(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Es(e,t){const a=await Qo(t.perfilId),o=await da(t.perfilId),s=await gs(t.perfilId,365),n=["dom","seg","ter","qua","qui","sex","sáb"],i=new Date().getDay(),r=Math.max(1,...a.cargaProximos7.map(d=>d.count)),c=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null;e.innerHTML=`
    <div class="tabs" role="tablist" aria-label="Painel">
      <button class="tabs__tab" role="tab" aria-selected="true" data-tab="visao">Visão geral</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="evolucao">Evolução</button>
    </div>

    <div id="tab-visao" role="tabpanel">
      <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

      <div class="streak-hero">
        <div class="streak-hero__flame" aria-hidden="true">${x.flame}</div>
        <div class="streak-hero__count">${a.streakDias}</div>
        <div class="streak-hero__label">${a.streakDias===1?"dia seguido estudando":"dias seguidos estudando"}</div>
        <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${a.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
          ${a.diasAtivosUltimos7.map((d,m)=>{const l=(i-(6-m)+7)%7;return`
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
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Qe(a.tempoHojeSegundos)}</div>
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
            <div class="stage-tile__label">${_s[d.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${x.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(d=>`${d.count} em ${$s(d.data)}`).join(", ")}">
        ${a.cargaProximos7.map(d=>{const m=ws(d.data);return`
            <div class="load-chart__col">
              <div class="load-chart__val">${d.count}</div>
              <div class="load-chart__bar">
                <div class="load-chart__fill" style="height: ${d.count/r*100}%"></div>
              </div>
              <div class="load-chart__label">${m}</div>
            </div>
          `}).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Retenção · últimos 30 dias</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">% de Fácil, Médio e Difícil nas revisões feitas — o quanto você realmente está lembrando.</p>
      ${a.retencao30.total===0?'<p class="text-muted">Ainda não há avaliações em 30 dias.</p>':`
        <div class="retention-bar" role="img" aria-label="Fácil ${c.facil}%, Médio ${c.medio}%, Difícil ${c.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${c.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${c.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${c.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${c.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${c.medio}%</span>
          <span class="badge badge--success">Fácil ${c.facil}%</span>
          <span class="text-muted" style="font-size: var(--font-size-xs);">${a.retencao30.total} avaliada(s)</span>
        </div>
      `}

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Temas com mais "Difícil"</span>
      </div>
      ${a.rankingDificeis.length===0?'<p class="text-muted">Nenhuma avaliação "Difícil" registrada ainda.</p>':`
        <div class="rank-list">
          ${a.rankingDificeis.map((d,m)=>`
            <div class="rank-row">
              <span>${m+1}. ${v(d.temaNome)}</span>
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
      ${ys(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `,e.querySelectorAll(".tabs__tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(m=>{m.setAttribute("aria-selected",String(m===d))}),e.querySelector("#tab-visao").style.display=d.dataset.tab==="visao"?"block":"none",e.querySelector("#tab-evolucao").style.display=d.dataset.tab==="evolucao"?"block":"none"})})}async function xs(e){const t=await S(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id))),s=[],n=[],i=new Map;for(let d=0;d<a.length;d++){const m=a[d],l=o[d];for(const h of l)i.set(h.id,m),h.favorito&&s.push({tema:h,espaco:m})}const r=o.flat(),c=await Promise.all(r.map(d=>t.getAllFromIndex("notas","tema_id",d.id)));for(let d=0;d<r.length;d++){const m=r[d],l=c[d],h=i.get(m.id);if(h)for(const f of l)f.favorito&&n.push({nota:f,tema:m,espaco:h})}return{temas:ae(s,d=>d.tema.nome),notas:ae(n,d=>d.nota.titulo||d.tema.nome)}}async function Ss(e,t){var i;const{temas:a,notas:o}=await xs(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(i=e.querySelector("#btn-empty-espacos"))==null||i.addEventListener("click",()=>C("espacos"));return}const s=new Map;for(const r of a){const c=s.get(r.espaco.id)??{espacoId:r.espaco.id,espacoNome:r.espaco.nome,itens:[]};c.itens.push(r),s.set(r.espaco.id,c)}const n=new Map;for(const r of o){const c=n.get(r.tema.id)??{temaNome:r.tema.nome,espacoId:r.espaco.id,espacoNome:r.espaco.nome,itens:[]};c.itens.push(r),n.set(r.tema.id,c)}e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(r=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${D(r.espacoId)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            <span class="color-dot" style="--dot-color:${D(r.espacoId)}"></span>${v(r.espacoNome)}
          </div>
          <div class="item-list">
            ${r.itens.map(c=>`
              <button class="item-row" data-tema="${v(c.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${D(r.espacoId)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${v(c.tema.nome)}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}

    ${o.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${a.length>0?"var(--space-6)":"0"};">Notas favoritas</div>
      ${Array.from(n.values()).map(r=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${D(r.espacoId)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            <span class="color-dot" style="--dot-color:${D(r.espacoId)}"></span>${v(r.temaNome)} <span class="queue-group__espaco"> · ${v(r.espacoNome)}</span>
          </div>
          <div class="item-list">
            ${r.itens.map(c=>`
              <button class="item-row" data-nota="${v(c.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${D(r.espacoId)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${v(c.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${v(c.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(r=>{r.addEventListener("click",()=>C(`temas/${r.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(r=>{r.addEventListener("click",()=>C(`notas/${r.dataset.nota}`))})}const ks=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Ls=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,As=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,qs=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      organizada em vez de virar uma lista solta.</p>`},{titulo:"Temas — os assuntos/aulas dentro de um Espaço",corpoHtml:`<p>Dentro de um Espaço, um Tema é um assunto específico ou uma aula. Exemplo
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
      ☰ pra transformar a linha numa lista com marcadores, ou uma das bolinhas (azul/vermelho/
      verde/rosa) pra colorir. O ✕ remove a cor de um trecho já colorido. O corretor
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
      vale.</p>`}];function Ts(e){e.innerHTML=`
    <div class="content-narrow">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${ks}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Ls}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${As}</pre>
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

      ${qs.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function Cs(e,t){const a=new Map(e.map(r=>[r.id,r])),o=[];let s=0,n=0,i=0;for(const r of t){const c=a.get(r.id);c?r.atualizado_em>c.atualizado_em?(a.set(r.id,r),o.push(r),n++):i++:(a.set(r.id,r),o.push(r),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:n,mantidos:i}}function Is(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const Ms=["perfis","espacos","temas","notas","itens_revisao"],it="memoriza-export",ua=1;async function Ds(){const e=await S(),[t,a,o,s,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:n}}async function Ns(e){const t=await S(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(l=>l.id)),i=(await t.getAll("temas")).filter(l=>s.has(l.espaco_id)),r=new Set(i.map(l=>l.id)),d=(await t.getAll("notas")).filter(l=>r.has(l.tema_id)),m=await t.getAllFromIndex("itens_revisao","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:i,notas:d,itens_revisao:m}}async function Ps(e){const t=await Ns(e);return{formato:it,versao:ua,exportado_em:R(),escopo:"perfil",perfil_id:e,dados:t}}async function Ge(){const e=await Ds();return{formato:it,versao:ua,exportado_em:R(),escopo:"todos",dados:e}}function js(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${Qa(e.exportado_em)}.json`}function xt(e){const t=js(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function ma(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==it||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function pa(e){const t=await S(),a={};for(const o of Ms){const s=await t.getAll(o),n=e.dados[o],i=Cs(s,n??[]);if(i.toWrite.length>0){const r=t.transaction(o,"readwrite");for(const c of i.toWrite)await r.store.put(c);await r.done}a[o]={criados:i.criados,atualizados:i.atualizados,mantidos:i.mantidos}}return await Vt(),{...Is(Object.values(a)),porLoja:a}}function zs(e){return e.replace(/-/g,"")}function Rs(e,t){const[a,o]=t.split(":");return`${zs(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function Fs(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function Os(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function Hs(e){const t=Rs(Q(),e),a=Fs(new Date),o=Os("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${te()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function Bs(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const Us="https://api.github.com",Vs="Memoriza — sincronização de anotações",$e="memoriza-sync.json";function Gs(e){return(t,a={})=>fetch(`${Us}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function Ks(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&$e in s.files))==null?void 0:o.id)??null}async function Ws(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:Vs,public:!1,files:{[$e]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function Zs(e,t){var s,n;const a=await e(`/gists/${t}`);return a.ok?((n=(s=(await a.json()).files)==null?void 0:s[$e])==null?void 0:n.content)??null:null}async function Xs(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[$e]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function va(e){const t=Gs(e);let a=It();if(!a){const i=await Ks(t);i&&(a=i,De(i))}let o=null,s=!1,n=await Ge();if(a){const i=await Zs(t,a);if(i)try{const r=ma(i);o=await pa(r),n=await Ge(),s=!0}catch{}}return a?await Xs(t,a,JSON.stringify(n)):(a=await Ws(t,JSON.stringify(n)),De(a)),Dt(R()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??Qs(),push:!0,mesclouRemoto:s}}function Qs(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function Js(e){const t=Mt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const Ys=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],en=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}];async function J(e,t){var b,$,L,E,N,P,W,B,Z,K,U;const a=Ma(),o=Tt(),s=await Je(),n=Aa(t.perfil.id),i=Ct(),r=Nt(),c=Mt(),d=It(),m=Ze();e.innerHTML=`
    <div class="stack content-narrow">
      <section class="settings-section">
        <div class="settings-section__title">${x.user} Perfil</div>
        <div class="card">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">${v(t.perfil.nome)}</div>
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
        <div class="settings-section__title">${x.users} Gerenciar perfis</div>
        <div class="card stack">
          <div>
            ${s.map(w=>`
              <div class="settings-list-row" data-perfil-id="${v(w.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${v(w.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${v(w.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${v(w.id)}" data-nome="${v(w.nome)}" class="danger" type="button">Excluir perfil</button>
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
        <div class="settings-section__title">${x.moon} Aparência</div>
        <div class="card">
          <div class="settings-list-row">
            <div class="settings-row__label">Tema</div>
            <div class="segmented" id="tema-opcoes" role="group" aria-label="Tema">
              ${Ys.map(w=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-theme="${w.value}"
                  aria-pressed="${w.value===a}"
                >${w.label}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${x.ordenar} Ordenação</div>
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
              ${en.map(w=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${w.value}"
                  aria-pressed="${w.value===m}"
                >${w.label}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${x.database} Dados</div>
        <div class="card stack">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Exportar backup</div>
              <p class="settings-row__desc">
                Gera um arquivo .json para guardar em outro lugar (Drive, e-mail, etc).
                ${o?`Último export: ${v(bt(o))}.`:"Nenhum export feito ainda."}
              </p>
            </div>
          </div>
          <div class="stack" style="flex-direction: row; flex-wrap: wrap; gap: var(--space-3);">
            <button class="btn btn--primary btn--sm" id="btn-export-profile" type="button">
              Exportar meu perfil (${v(t.perfil.nome)})
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
        <div class="settings-section__title">${x.sync} Sincronização em nuvem</div>
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
                value="${v(i)}"
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
              ${x.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${c?`<div class="banner banner--success" style="margin-bottom:0;">${x.check} Última sincronização: ${v(bt(c))}${d?".":""}</div>`:i?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
          </div>

          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Sincronização automática</div>
              <p class="settings-row__desc">Ao abrir o app, se a última sincronização tiver mais de 30 min, roda sozinha em segundo plano.</p>
            </div>
            <input type="checkbox" id="sync-auto" class="toggle-checkbox" ${r?"checked":""} aria-label="Sincronização automática" />
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${x.clock} Lembretes</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            O Memoriza não envia notificações. Escolha um horário e baixe um lembrete diário
            para o app de Calendário/Lembretes do seu celular.
          </p>
          <div class="field" style="max-width: 160px;">
            <label class="field__label" for="input-hora-lembrete">Horário</label>
            <input class="input" id="input-hora-lembrete" type="time" value="${v(n)}" />
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

  `,(b=e.querySelector("#btn-switch-profile"))==null||b.addEventListener("click",()=>{t.onSwitchProfile()}),($=e.querySelector("#btn-como-usar"))==null||$.addEventListener("click",()=>C("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(w=>{w.addEventListener("click",()=>{const T=w.dataset.theme;Ia(T),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(A=>{A.setAttribute("aria-pressed",String(A===w))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(w=>{w.addEventListener("click",()=>{Ca(w.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(T=>{T.setAttribute("aria-pressed",String(T===w))})})}),(L=e.querySelector("#btn-export-profile"))==null||L.addEventListener("click",async()=>{const w=await Ps(t.perfil.id);xt(w),lt(w.exportado_em),J(e,t)}),(E=e.querySelector("#btn-export-all"))==null||E.addEventListener("click",async()=>{const w=await Ge();xt(w),lt(w.exportado_em),J(e,t)});const l=e.querySelector("#import-file");(N=e.querySelector("#btn-import"))==null||N.addEventListener("click",()=>{l==null||l.click()}),l==null||l.addEventListener("change",async()=>{const w=e.querySelector("#import-summary"),[T]=l.files??[];if(!(!T||!w))try{const A=await T.text(),_=ma(A),q=await pa(_);w.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${q.criados} criados, ${q.atualizados} atualizados,
          ${q.mantidos} mantidos como estavam.
        </div>
      `}catch(A){w.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${v(A instanceof Error?A.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{l.value=""}});const h=e.querySelector("#form-novo-perfil");(P=e.querySelector("#btn-novo-perfil"))==null||P.addEventListener("click",()=>{var w;h.style.display="block",(w=e.querySelector("#input-novo-perfil"))==null||w.focus()}),(W=e.querySelector("#btn-cancelar-perfil"))==null||W.addEventListener("click",()=>{h.style.display="none"}),(B=e.querySelector("#btn-salvar-perfil"))==null||B.addEventListener("click",async()=>{const T=e.querySelector("#input-novo-perfil").value.trim();T&&(await Rt(T),J(e,t))}),e.querySelectorAll("[data-renomear]").forEach(w=>{w.onclick=()=>{var g;const T=w.dataset.renomear,A=e.querySelector(`[data-perfil-id="${T}"]`),_=A==null?void 0:A.querySelector("[data-view-nome]");if(!A||!_)return;const q=((g=_.textContent)==null?void 0:g.trim())??"";_.innerHTML=`
        <input class="input" type="text" value="${v(q)}" maxlength="60" style="max-width:200px;" />
      `;const z=_.querySelector("input");z.focus(),z.select(),w.textContent="Salvar";const V=async()=>{const y=z.value.trim();y&&(await to(T,y),T===t.perfil.id&&(t.perfil={...t.perfil,nome:y})),J(e,t)};z.addEventListener("keydown",y=>{y.key==="Enter"&&V()}),w.onclick=V}}),e.querySelectorAll("[data-excluir-perfil]").forEach(w=>{w.addEventListener("click",async()=>{const T=w.dataset.excluirPerfil,A=w.dataset.nome??"",_=await ao(T);await oe({title:`Excluir o perfil "${A}"?`,message:`Isso vai apagar ${_.espacos} espaço(s), ${_.temas} tema(s) e ${_.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await oo(T),T===t.perfil.id?t.onSwitchProfile():J(e,t))})}),(Z=e.querySelector("#btn-baixar-lembrete"))==null||Z.addEventListener("click",()=>{const w=e.querySelector("#input-hora-lembrete").value||"19:00";qa(t.perfil.id,w),Bs(Hs(w))});const f=e.querySelector("#sync-status"),p=e.querySelector("#btn-sync-now");p==null||p.addEventListener("click",async()=>{const T=e.querySelector("#input-github-token").value.trim();if(!T){f&&(f.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}dt(T),p.disabled=!0,f&&(f.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Sincronizando…</div>`);try{const A=await va(T);if(f){const _=[A.criados>0?`${A.criados} novo(s)`:null,A.atualizados>0?`${A.atualizados} atualizado(s)`:null].filter(Boolean);f.innerHTML=`
          <div class="banner banner--success" role="status">
            ${x.check} Sincronizado!${_.length>0?` ${_.join(", ")} baixado(s).`:""}
            ${A.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}J(e,t)}catch(A){p.disabled=!1,f&&(f.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${v(A instanceof Error?A.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(K=e.querySelector("#btn-limpar-token"))==null||K.addEventListener("click",async()=>{await oe({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(dt(""),De(""),Dt(""),J(e,t))}),(U=e.querySelector("#sync-auto"))==null||U.addEventListener("change",w=>{Ta(w.target.checked)})}let Ce=null;async function St(){if(!(!("wakeLock"in navigator)||document.hidden))try{Ce=await navigator.wakeLock.request("screen"),Ce.addEventListener("release",()=>{Ce=null})}catch{}}function tn(){St(),document.addEventListener("visibilitychange",()=>{document.hidden||St()})}const fa="v1.4",an="Memoriza",ba=`${an} ${fa}`,de=24;function Ke(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Ie(e,t){const a=Ke(t);return e.some(o=>Ke(o).includes(a))}function on(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),n=t.toLowerCase();let i=s.indexOf(n);i===-1&&(i=0);const r=Math.max(0,i-a),c=Math.min(o.length,i+n.length+a);return(r>0?"…":"")+o.slice(r,c)+(c<o.length?"…":"")}async function sn(e,t){const a=t.trim();if(!a)return[];const o=Ke(a);if(!o)return[];const s=await S(),n=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),r=(await Promise.all(n.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),c=new Map(n.map(f=>[f.id,f])),m=(await Promise.all(r.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),l=[];for(const f of n)if(Ie([f.nome,f.categoria],o)&&(l.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),l.length>=de))return l;const h=new Map(r.map(f=>[f.id,f]));for(const f of r)if(Ie([f.nome,f.categoria],o)){const p=c.get(f.espaco_id);if(l.push({kind:"tema",id:f.id,titulo:f.nome,meta:`Tema${p?` · ${p.nome}`:""}`}),l.length>=de)return l}for(const f of m){if(!Ie([f.titulo,f.fonte,f.conteudo],o))continue;const p=h.get(f.tema_id),b=p&&c.get(p.espaco_id),$=[...b?[b.nome]:[],...p?[p.nome]:[]].join(" · ");if(l.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:$?`Nota · ${$}`:"Nota",snippet:f.conteudo?on(f.conteudo,o):void 0}),l.length>=de)return l}return l.sort((f,p)=>{const b=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,$=`${p.titulo.toLowerCase()} ${p.meta.toLowerCase()}`;return io(b,$)}),l.slice(0,de)}const nn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function kt(e,t){const a=v(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const n=v(e.slice(0,s)),i=v(e.slice(s,s+o.length)),r=v(e.slice(s+o.length));return`${n}<mark>${i}</mark>${r}`}async function ga(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
    <div class="search-panel">
      <div class="search-field">
        <span class="search-field__icon" aria-hidden="true">${x.search}</span>
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],n=-1,i,r=!1;function c(){r||(r=!0,t.remove(),document.removeEventListener("keydown",h))}function d(p){s.length!==0&&(n=(n+p+s.length)%s.length,s.forEach((b,$)=>{const L=$===n;b.el.classList.toggle("is-active",L),b.el.setAttribute("aria-selected",String(L)),L&&b.el.scrollIntoView({block:"nearest"})}))}function m(p){const b=s.find(L=>L.el===p);if(!b)return;c();const $=b.resultado;$.kind==="espaco"?C(`espacos/${$.id}`):$.kind==="tema"?C(`temas/${$.id}`):C(`notas/${$.id}`)}function l(p){sn(e,p).then(b=>{if(!r){if(n=-1,s=[],b.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${v(p.trim())}".</p>`;return}o.innerHTML="";for(const $ of b){const L=document.createElement("button");L.type="button",L.className=`search-result search-result--${$.kind}`,L.setAttribute("role","option"),L.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${$.kind==="espaco"?x.folder:$.kind==="tema"?x.bookOpen:x.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${kt($.titulo,p)}</span>
            <span class="search-result__meta">${v(nn[$.kind])} · ${v($.meta)}</span>
            ${$.snippet?`<span class="search-result__snippet">${kt($.snippet,p)}</span>`:""}
          </span>
        `,L.addEventListener("click",()=>m(L)),o.appendChild(L),s.push({el:L,resultado:$})}}})}function h(p){p.key==="Escape"&&(p.preventDefault(),c())}a.addEventListener("input",()=>{i&&clearTimeout(i),i=setTimeout(()=>l(a.value),120)}),a.addEventListener("keydown",p=>{p.key==="ArrowDown"?(p.preventDefault(),d(1)):p.key==="ArrowUp"?(p.preventDefault(),d(-1)):p.key==="Enter"&&n>=0?(p.preventDefault(),m(s[n].el)):p.key==="Escape"&&(p.preventDefault(),c())}),t.addEventListener("mousedown",p=>{p.target===t&&c()}),document.addEventListener("keydown",h),a.focus(),l("")}const Lt=14,rn=30,cn=30,ln=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],dn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function un(e){yo(()=>We(e)),await We(e),vn(),tn(),mn(),pn()}function mn(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=At();t&&ga(t)}})}async function pn(){const e=Ct();if(!(!e||!Nt())&&Js(cn))try{await va(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function vn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function We(e){var c,d,m;const t=At(),a=t?await eo(t):void 0;if(!a){Me(null),e.innerHTML='<div id="profile-screen"></div>';const l=e.querySelector("#profile-screen");await wo(l,async h=>{Me(h.id),C("hoje"),await We(e)});return}const o=bo(),s=go(o),n=await bn(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${ln.map(l=>`
          <button
            class="app-nav__item"
            data-route="${l.route}"
            ${l.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${_o[l.route]}</span>
            <span>${l.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${dn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${x.search}</button>
            ${n?`<button class="app-header__backup-alert${n.urgente?" is-urgent":""}" id="btn-backup-alert" type="button" title="${v(n.mensagem)}" aria-label="${v(n.mensagem)}">${x.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${v(Xa(O()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${x.help}</button>
            <span class="app-header__profile" title="Memoriza ${fa}">${v(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${v(ba)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(l=>{l.addEventListener("click",()=>{re()&&ho(l.dataset.route)})}),(c=e.querySelector("#btn-ajuda"))==null||c.addEventListener("click",()=>{re()&&(location.hash==="#/ajuda"?history.back():C("ajuda"))}),(d=e.querySelector("#btn-busca"))==null||d.addEventListener("click",()=>{re()&&ga(a.id)}),(m=e.querySelector("#btn-backup-alert"))==null||m.addEventListener("click",()=>{re()&&C("config")});const i=e.querySelector("#screen-content"),r=document.createElement("div");r.className="screen-container",i.appendChild(r),r.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await fn(r,o,a),r.classList.remove("screen-enter"),r.offsetWidth,r.classList.add("screen-enter")}catch(l){console.error("Erro ao renderizar tela:",l),r.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function fn(e,t,a){switch(t.name){case"hoje":await _t(e,{perfilId:a.id});break;case"espacos":await ue(e,{perfilId:a.id});break;case"espaco":await me(e,t.id);break;case"espaco-pdf":await rs(e,t.id,t.categoria);break;case"painel":await Es(e,{perfilId:a.id});break;case"favoritos":await Ss(e,{perfilId:a.id});break;case"ajuda":Ts(e);break;case"tema":await pe(e,t.id);break;case"nota-nova":await ge(e,{mode:"nova",temaId:t.temaId});break;case"nota":await ge(e,{mode:"editar",notaId:t.id});break;case"config":await J(e,{perfil:a,onSwitchProfile:()=>{Me(null),C("perfil")}});break;default:await _t(e,{perfilId:a.id})}}async function bn(e){const t=O(),a=xa();if(a&&t<a||!await gn(e.id))return null;const o=Tt(),s=o?ce(O(new Date(o)),t):1/0;if(s<=Lt)return null;const n=o!==null&&s>rn,i=`${o?`Faz mais de ${Lt} dias desde o último backup.`:"Você ainda não exportou um backup."} Toque pra exportar em Configurações — os dados só existem neste aparelho.`;return{urgente:n,mensagem:i}}async function gn(e){const t=await S();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${ba}%c rodando`,"font-weight:bold;","");Pt();$a({immediate:!0});async function hn(){ds(),await Ya(),await Vt(),await Da();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await un(e)}hn();
