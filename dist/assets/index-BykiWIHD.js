(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const Ka="modulepreload",Wa=function(e){return"/"+e},Tt={},Za=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(r=>{if(r=Wa(r),r in Tt)return;Tt[r]=!0;const d=r.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${u}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":Ka,d||(l.as="script"),l.crossOrigin="",l.href=r,c&&l.setAttribute("nonce",c),document.head.appendChild(l),d)return new Promise((g,f)=>{l.addEventListener("load",g),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function n(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return s.then(i=>{for(const c of i||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};function Xa(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:n,onRegisterError:i}=e;let c,r;const d=async(l=!0)=>{await r};async function u(){if("serviceWorker"in navigator){if(c=await Za(async()=>{const{Workbox:l}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:l}},[]).then(({Workbox:l})=>new l("/sw.js",{scope:"/",type:"classic"})).catch(l=>{i==null||i(l)}),!c)return;c.addEventListener("activated",l=>{(l.isUpdate||l.isExternal)&&window.location.reload()}),c.addEventListener("installed",l=>{l.isUpdate||o==null||o()}),c.register({immediate:t}).then(l=>{n?n("/sw.js",l):s==null||s(l)}).catch(l=>{i==null||i(l)})}}return r=u(),d}const z={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function Zt(){return localStorage.getItem(z.selectedProfileId)}function We(e){e?localStorage.setItem(z.selectedProfileId,e):localStorage.removeItem(z.selectedProfileId)}function Xt(){const e=localStorage.getItem(z.theme);return e==="light"||e==="dark"?e:"system"}function Qa(e){e==="system"?localStorage.removeItem(z.theme):localStorage.setItem(z.theme,e)}function Ja(){return localStorage.getItem(z.lastExportAt)}function Mt(e){localStorage.setItem(z.lastExportAt,e)}function Ya(){return localStorage.getItem(z.storagePersistRequested)==="1"}function eo(){localStorage.setItem(z.storagePersistRequested,"1")}const to="19:00";function ao(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??to}function oo(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function mt(){return localStorage.getItem(z.githubToken)??""}function Ct(e){e.trim()?localStorage.setItem(z.githubToken,e.trim()):localStorage.removeItem(z.githubToken)}function Qt(){return localStorage.getItem(z.githubGistId)??""}function Ze(e){e?localStorage.setItem(z.githubGistId,e):localStorage.removeItem(z.githubGistId)}function pt(){return localStorage.getItem(z.githubLastSyncAt)}function Jt(e){e?localStorage.setItem(z.githubLastSyncAt,e):localStorage.removeItem(z.githubLastSyncAt)}function Yt(){return localStorage.getItem(z.githubAutoSync)!=="0"}function so(e){e?localStorage.removeItem(z.githubAutoSync):localStorage.setItem(z.githubAutoSync,"0")}function vt(){return localStorage.getItem(z.notasOrdem)==="titulo"?"titulo":"data"}function no(e){e==="titulo"?localStorage.setItem(z.notasOrdem,"titulo"):localStorage.removeItem(z.notasOrdem)}function ea(){const e=Xt();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function io(e){Qa(e),ea()}function ro(){return Xt()}async function co(){var e;if(!Ya()&&(eo(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const Xe=(e,t)=>t.some(a=>e instanceof a);let It,Dt;function lo(){return It||(It=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function uo(){return Dt||(Dt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Qe=new WeakMap,ze=new WeakMap,Ce=new WeakMap;function mo(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{a(ie(e.result)),s()},i=()=>{o(e.error),s()};e.addEventListener("success",n),e.addEventListener("error",i)});return Ce.set(t,e),t}function po(e){if(Qe.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{a(),s()},i=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});Qe.set(e,t)}let Je={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return Qe.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return ie(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function ta(e){Je=e(Je)}function vo(e){return uo().includes(e)?function(...t){return e.apply(Ye(this),t),ie(this.request)}:function(...t){return ie(e.apply(Ye(this),t))}}function fo(e){return typeof e=="function"?vo(e):(e instanceof IDBTransaction&&po(e),Xe(e,lo())?new Proxy(e,Je):e)}function ie(e){if(e instanceof IDBRequest)return mo(e);if(ze.has(e))return ze.get(e);const t=fo(e);return t!==e&&(ze.set(e,t),Ce.set(t,e)),t}const Ye=e=>Ce.get(e);function go(e,t,{blocked:a,upgrade:o,blocking:s,terminated:n}={}){const i=indexedDB.open(e,t),c=ie(i);return o&&i.addEventListener("upgradeneeded",r=>{o(ie(i.result),r.oldVersion,r.newVersion,ie(i.transaction),r)}),a&&i.addEventListener("blocked",r=>a(r.oldVersion,r.newVersion,r)),c.then(r=>{n&&r.addEventListener("close",()=>n()),s&&r.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const bo=["get","getKey","getAll","getAllKeys","count"],ho=["put","add","delete","clear"],Re=new Map;function Nt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Re.get(t))return Re.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=ho.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||bo.includes(a)))return;const n=async function(i,...c){const r=this.transaction(i,s?"readwrite":"readonly");let d=r.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[a](...c),s&&r.done]))[0]};return Re.set(t,n),n}ta(e=>({...e,get:(t,a,o)=>Nt(t,a)||e.get(t,a,o),has:(t,a)=>!!Nt(t,a)||e.has(t,a)}));const yo=["continue","continuePrimaryKey","advance"],jt={},et=new WeakMap,aa=new WeakMap,_o={get(e,t){if(!yo.includes(t))return e[t];let a=jt[t];return a||(a=jt[t]=function(...o){et.set(this,aa.get(this)[t](...o))}),a}};async function*wo(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,_o);for(aa.set(a,t),Ce.set(a,Ye(t));t;)yield a,t=await(et.get(a)||t.continue()),et.delete(a)}function Pt(e,t){return t===Symbol.asyncIterator&&Xe(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&Xe(e,[IDBIndex,IDBObjectStore])}ta(e=>({...e,get(t,a,o){return Pt(t,a)?wo:e.get(t,a,o)},has(t,a){return Pt(t,a)||e.has(t,a)}}));const $o="memoriza",xo=2;let Fe;function k(){return Fe||(Fe=go($o,xo,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}}})),Fe}function re(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const ft="Europe/London",Eo=new Intl.DateTimeFormat("en-CA",{timeZone:ft,year:"numeric",month:"2-digit",day:"2-digit"});function H(e=new Date){return Eo.format(e)}function te(){return H(new Date)}function ye(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function R(){return new Date().toISOString()}function ae(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function So(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:ft,weekday:"short",day:"2-digit",month:"2-digit"})}function tt(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Lo(e){const t=new Date(e),a=H(t),o=t.toLocaleTimeString("pt-BR",{timeZone:ft,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function gt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function X(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const ko="00000000-0000-4000-8000-000000000001";async function bt(){return(await(await k()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function Ao(){return bt()}async function qo(e){return(await k()).get("perfis",e)}async function oa(e){const t=await k(),a=await t.getAll("perfis"),o=R(),n={id:a.length===0?ko:re(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",n),n}async function To(e,t){const a=await k(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=R(),await a.put("perfis",o))}async function Mo(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const n of a){const i=await t.getAllFromIndex("temas","espaco_id",n.id);o+=i.length;for(const c of i)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function Co(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(u=>t.getAllFromIndex("temas","espaco_id",u.id)))).flat(),i=(await Promise.all(s.map(u=>t.getAllFromIndex("notas","tema_id",u.id)))).flat(),r=(await Promise.all(i.map(u=>t.getAllFromIndex("itens_revisao","nota_id",u.id)))).flat(),d=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await d.objectStore("perfis").delete(e);for(const u of a)await d.objectStore("espacos").delete(u.id);for(const u of s)await d.objectStore("temas").delete(u.id);for(const u of i)await d.objectStore("notas").delete(u.id);for(const u of r)await d.objectStore("itens_revisao").delete(u.id);await d.done}const sa=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),Io=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function Do(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function at(e){return Io.get(Do(e))??null}function na(e){return e.length>0&&e.every(t=>at(t)!==null)}function ia(e,t,a){if(a){const o=at(e),s=at(t);if(o!==s)return o-s}return sa.compare(e,t)}function ra(e){const t=na(e);return[...e].sort((a,o)=>ia(a,o,t))}function No(e,t){return sa.compare(e,t)}function ce(e,t){const a=na(e.map(t));return[...e].sort((o,s)=>ia(t(o),t(s),a))}const ca=30;function pe(e,t=R()){return{...e,excluido:!0,excluido_em:t,atualizado_em:t}}function de(e,t=R()){const a={...e};return delete a.excluido,delete a.excluido_em,a.atualizado_em=t,a}async function jo(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=new Map(a.map(r=>[r.id,r])),s=(await Promise.all(a.map(r=>t.getAllFromIndex("temas","espaco_id",r.id)))).flat(),n=new Map(s.map(r=>[r.id,r])),i=(await Promise.all(s.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat(),c=[];for(const r of a){if(!r.excluido)continue;const d=s.filter(l=>l.espaco_id===r.id),u=new Set(d.map(l=>l.id));c.push({tipo:"espaco",id:r.id,nome:r.nome,contexto:r.categoria||"Sem categoria",excluido_em:r.excluido_em,temas:d.filter(l=>l.excluido).length,notas:i.filter(l=>u.has(l.tema_id)&&l.excluido).length})}for(const r of s){if(!r.excluido)continue;const d=o.get(r.espaco_id);!d||d.excluido||c.push({tipo:"tema",id:r.id,nome:r.nome,contexto:d.nome,excluido_em:r.excluido_em,notas:i.filter(u=>u.tema_id===r.id&&u.excluido).length})}for(const r of i){if(!r.excluido)continue;const d=n.get(r.tema_id);if(!d||d.excluido)continue;const u=o.get(d.espaco_id);!u||u.excluido||c.push({tipo:"nota",id:r.id,nome:r.titulo||"(sem título)",contexto:d.nome,excluido_em:r.excluido_em})}return c.sort((r,d)=>(d.excluido_em??"").localeCompare(r.excluido_em??""))}async function Po(e,t){const a=await k(),o=R();if(e==="nota"){const r=await a.get("notas",t);if(!r)return;await a.put("notas",de(r,o));return}if(e==="tema"){const r=await a.get("temas",t);if(!r)return;const d=(await a.getAllFromIndex("notas","tema_id",t)).filter(l=>l.excluido),u=a.transaction(["temas","notas"],"readwrite");await u.objectStore("temas").put(de(r,o));for(const l of d)await u.objectStore("notas").put(de(l,o));await u.done;return}const s=await a.get("espacos",t);if(!s)return;const n=(await a.getAllFromIndex("temas","espaco_id",t)).filter(r=>r.excluido),i=(await Promise.all(n.map(r=>a.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>r.excluido),c=a.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(de(s,o));for(const r of n)await c.objectStore("temas").put(de(r,o));for(const r of i)await c.objectStore("notas").put(de(r,o));await c.done}async function Ee(e,t){const a=await k();if(e==="nota"){const i=await a.getAllFromIndex("itens_revisao","nota_id",t),c=a.transaction(["notas","itens_revisao"],"readwrite");await c.objectStore("notas").delete(t);for(const r of i)await c.objectStore("itens_revisao").delete(r.id);await c.done;return}let o;if(e==="tema")o=await a.getAllFromIndex("notas","tema_id",t);else{const i=await a.getAllFromIndex("temas","espaco_id",t);o=(await Promise.all(i.map(c=>a.getAllFromIndex("notas","tema_id",c.id)))).flat()}const s=(await Promise.all(o.map(i=>a.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat(),n=a.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");if(e==="tema")await n.objectStore("temas").delete(t);else{const i=await a.getAllFromIndex("temas","espaco_id",t);await n.objectStore("espacos").delete(t);for(const c of i)await n.objectStore("temas").delete(c.id)}for(const i of o)await n.objectStore("notas").delete(i.id);for(const i of s)await n.objectStore("itens_revisao").delete(i.id);await n.done}async function zo(){const e=await k(),t=X(te(),-ca),a=i=>!!i.excluido&&!!i.excluido_em&&i.excluido_em.slice(0,10)<t,o=(await e.getAll("espacos")).filter(a),s=(await e.getAll("temas")).filter(a),n=(await e.getAll("notas")).filter(a);for(const i of o)await Ee("espaco",i.id);for(const i of s)await Ee("tema",i.id);for(const i of n)await Ee("nota",i.id)}async function la(e){const a=(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido);return vt()==="titulo"?ce(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function zt(e){return(await k()).get("notas",e)}async function Ro(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).filter(i=>!i.excluido).map(i=>({nota:i,tema:s}))))).flat()}async function Fo(e,t){const a=await k(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const n=R(),i={id:re(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:n,atualizado_em:n},c={id:re(),nota_id:i.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:X(te(),1),status:"pendente",streak_facil:0,criado_em:n,atualizado_em:n},r=a.transaction(["notas","itens_revisao"],"readwrite");return await r.objectStore("notas").put(i),await r.objectStore("itens_revisao").put(c),await r.done,i}async function Oo(e,t){const a=await k(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=R(),await a.put("notas",o))}async function Ho(e){const t=await k(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=R(),await t.put("notas",a),a.favorito):!1}async function Bo(e){const t=await k(),a=await t.get("notas",e);a&&await t.put("notas",pe(a))}async function da(){var n;const e=await k(),a=(await e.getAll("notas")).filter(i=>!("titulo"in i)||!i.titulo);if(a.length===0)return 0;const o=R(),s=e.transaction("notas","readwrite");for(const i of a)await s.store.put({...i,titulo:((n=i.fonte)==null?void 0:n.trim())||"Sem título",titulo_revisado:!1,favorito:i.favorito??!1,atualizado_em:o});return await s.done,a.length}function m(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ve(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const ua="_sem-categoria_";function Vo(e){return e.trim()===""?ua:encodeURIComponent(e)}function Uo(e){return e===ua?"":decodeURIComponent(e)}function Go(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function Ko(){const e=Go();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:Uo(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function Wo(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function M(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function Zo(e){M(e)}function Xo(e){window.addEventListener("hashchange",e)}function ue(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function I(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Qo={hoje:ue('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:ue('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:ue('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:ue('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:ue('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:ue('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},S={backup:I('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:I('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:I('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:I('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:I('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:I('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:I('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:I('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:I('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:I('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:I('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:I('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:I('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:I('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:I('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:I('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:I('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:I('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:I('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:I('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:I('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:I('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:I('<path d="M20 6L9 17l-5-5"/>'),chart:I('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:I('<path d="M4 6h16M4 12h11M4 18h6"/>'),trash:I('<path d="M4 7h16"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6M14 11v6"/>')};async function Jo(e,t){var c,r,d;const a=await bt(),o=a.length===0;e.innerHTML=`
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
            <button class="profile-card" role="listitem" data-id="${m(u.id)}">
              <span class="profile-avatar" aria-hidden="true">${m(Yo(u.nome))}</span>
              <span class="profile-card__name">${m(u.nome)}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(u=>{u.addEventListener("click",()=>{const l=u.dataset.id,g=a.find(f=>f.id===l);g&&t(g)})});const s=e.querySelector("#form-novo-perfil-picker"),n=e.querySelector("#input-novo-perfil-picker");o&&n.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",n.focus()}),(r=e.querySelector("#btn-cancelar-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="none"});const i=async()=>{const u=n.value.trim();if(!u)return;const l=await oa(u);t(l)};(d=e.querySelector("#btn-salvar-perfil-picker"))==null||d.addEventListener("click",i),n.addEventListener("keydown",u=>{u.key==="Enter"&&i()})}function Yo(e){return e.trim().slice(0,1).toUpperCase()}const me=["1","7","30","180"],Oe={1:1,7:7,30:30,180:180};function es(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=me.indexOf(e);if(t==="dificil"){const d=me[Math.max(0,s-1)];return{estagio:d,streak_facil:0,data_agendada:X(o,Oe[d]),aposentado:!1}}if(t==="medio"){const d=me[Math.min(me.length-1,s+1)];return{estagio:d,streak_facil:0,data_agendada:X(o,Oe[d]),aposentado:!1}}const n=a+1,i=s+2,c=i<=me.length-1?me[i]:"consulta",r=n>=2?"consulta":c;return r==="consulta"?{estagio:"consulta",streak_facil:n,aposentado:!0}:{estagio:r,streak_facil:n,data_agendada:X(o,Oe[r]),aposentado:!1}}async function ma(e){const t=await k(),a=te(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(b=>b.data_agendada<=a),n=Array.from(new Set(s.map(b=>b.nota_id))),i=await Promise.all(n.map(b=>t.get("notas",b))),c=new Map(i.filter(b=>!!b).map(b=>[b.id,b])),r=Array.from(new Set(Array.from(c.values()).map(b=>b.tema_id))),d=await Promise.all(r.map(b=>t.get("temas",b))),u=new Map(d.filter(b=>!!b).map(b=>[b.id,b])),l=Array.from(new Set(Array.from(u.values()).map(b=>b.espaco_id))),g=await Promise.all(l.map(b=>t.get("espacos",b))),f=new Map(g.filter(b=>!!b).map(b=>[b.id,b])),w=[];for(const b of s){const v=c.get(b.nota_id),L=v&&u.get(v.tema_id),x=L&&f.get(L.espaco_id);!v||!L||!x||v.excluido||L.excluido||x.excluido||w.push({item:b,nota:v,tema:L,espaco:x})}return w.sort((b,v)=>b.tema.criado_em.localeCompare(v.tema.criado_em)||b.nota.criado_em.localeCompare(v.nota.criado_em)),w}async function ts(e,t,a){const o=await k(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const n=te(),i=es(s.estagio,t,s.streak_facil,n),c=R(),r={...s,status:"feita",avaliacao:t,data_concluida:n,duracao_segundos:a,atualizado_em:c},d={id:re(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:i.estagio,data_agendada:i.aposentado?n:i.data_agendada,status:i.aposentado?"feita":"pendente",streak_facil:i.streak_facil,criado_em:c,atualizado_em:c},u=o.transaction("itens_revisao","readwrite");return await u.store.put(r),await u.store.put(d),await u.done,i}async function as(e){const t=await k(),a=te();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function os(e){const t=await k(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(i=>i.status==="pendente");if(a.length===0)return;const o=te(),s=R(),n=t.transaction("itens_revisao","readwrite");for(const i of a)await n.store.put({...i,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await n.done}const Ie=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],Rt={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},ss=new RegExp(`\\[([^\\]]+)\\]\\{(${Ie.join("|")})\\}`,"g");function ot(e){let t=m(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(ss,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function ns(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,n=s[s.length-1];a.push({level:o.level,nodes:n?n.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function pa(e){return`<ul>${e.map(t=>`<li>${ot(t.text)}${t.children.length>0?pa(t.children):""}</li>`).join("")}</ul>`}function De(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(pa(ns(o))),o=[])}let n=[];function i(){n.length>0&&(a.push(`<p>${ot(n.join(`
`)).replace(/\n/g,"<br>")}</p>`),n=[])}for(const c of t){const r=c.trim();if(r===""){i(),s();continue}const d=/^(#{1,3})\s+(.*)$/.exec(r);if(d){i(),s();const l=d[1].length;a.push(`<h${l}>${ot(d[2])}</h${l}>`);continue}const u=/^[-*]\s+(.*)$/.exec(r);if(u){i();const l=c.length-c.trimStart().length;o.push({level:Math.floor(l/2),text:u[1]});continue}s(),n.push(r)}return i(),s(),a.join(`
`)}function ht(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(ht).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Ie.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function st(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...st(s,t+1));continue}if(s.tagName!=="LI")continue;const n=s,i=Array.from(n.children).filter(d=>d.tagName==="UL"),c=n.cloneNode(!0);c.querySelectorAll("ul").forEach(d=>d.remove());const r=ht(c).trim();r&&a.push(`${"  ".repeat(t)}- ${r}`);for(const d of i)a.push(...st(d,t+1));o=n}return a}function Ft(e){if(e.tagName==="UL")return st(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=ht(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function is(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=Ft(o);s.length>0&&t.push(s.join(`
`))}else t.push(...Ft(o))}return t.filter(Boolean).join(`

`)}const rs=30;function va(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=X(te(),rs);return e.validade_ate<=t}const le=8;function cs(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function yt(e){return cs(e)%le}function O(e){return`var(--accent-${yt(e)})`}function fa(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function _t(e){return e?e.toLowerCase():"\0sem-categoria"}function ga(e){return ls(e.map(_t))}function ls(e){const t=new Set,a=new Map;for(const o of e){let s=yt(o);for(let n=0;n<le&&t.has(s);n++)s=(s+1)%le;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function ba(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=yt(o.id);for(let n=0;n<le&&t.has(s);n++)s=(s+1)%le;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const ds=5*60;let U=null;function ha(){U&&(document.hidden?U.retomadoEm!=null&&(U.acumuladoMs+=Date.now()-U.retomadoEm,U.retomadoEm=null):U.retomadoEm==null&&(U.retomadoEm=Date.now()))}function us(e){U&&U.itemId===e||(Ae(),U={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",ha))}function ms(){if(!U)return;let e=U.acumuladoMs;return U.retomadoEm!=null&&(e+=Date.now()-U.retomadoEm),Math.min(ds,Math.round(e/1e3))}function Ae(){U&&document.removeEventListener("visibilitychange",ha),U=null}function ya(e){const t=te();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${ye(e.data_agendada,t)} dia(s)">${S.alert} atrasada</span>`}async function Ot(e,t){const a=await ma(t.perfilId);await qe(e,t,a)}async function qe(e,t,a){var d;Ae(),window.scrollTo({top:0});const o=await as(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
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
  `;e.innerHTML=r+Array.from(c.values()).map(u=>{const l=u[0].tema,g=u[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${O(l.id)}">
            <span class="color-dot" style="--dot-color:${O(l.id)}"></span>
            ${m(l.nome)}
            ${i?`<span class="queue-group__espaco"> · ${m(g.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${u.map(f=>`
              <button class="item-row" data-id="${m(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${O(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${S.star} `:""}${m(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${ya(f.item)}
                ${va(f.nota)?`<span class="badge badge--muted">${S.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(u=>{u.addEventListener("click",()=>{const l=a.find(g=>g.item.id===u.dataset.id);l&&_a(e,t,l,a,o)})})}function _a(e,t,a,o,s=0,n=!1){var d,u,l;us(a.item.id),n||window.scrollTo({top:0});const i=va(a.nota),c=s+o.length,r=c>0?Math.round(s/c*100):0;e.innerHTML=`
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
        ${m(a.tema.nome)}${n&&a.nota.fonte?` · ${m(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${S.star} `:""}${m(a.nota.titulo||"(sem título)")}
        ${ya(a.item)}
      </div>

      ${i?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${n?`
        <div class="review-card__content markdown-preview">${De(a.nota.conteudo)}</div>
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
  `,(d=e.querySelector("[data-voltar]"))==null||d.addEventListener("click",()=>void qe(e,t,o)),(u=e.querySelector("[data-editar]"))==null||u.addEventListener("click",()=>{Ae(),M(`notas/${a.nota.id}`)}),(l=e.querySelector("#btn-revelar"))==null||l.addEventListener("click",()=>{_a(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(g=>{g.addEventListener("click",async()=>{const f=g.dataset.avaliacao,w=ms();Ae();const b=await ts(a.item.id,f,w),v=await ma(t.perfilId);b.aposentado?ps(e,t,v):await qe(e,t,v)})})}function ps(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${S.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void qe(e,t,a))}function wa(e){return e.trim().toLowerCase()}function wt(e){const t=new Map;for(const n of e){const i=n.categoria.trim(),c=wa(i),r=t.get(c);r?r.itens.push(n):t.set(c,{display:i,itens:[n]})}const a=Array.from(t.values()).map(n=>({categoria:n.display,itens:n.itens})),o=a.map(n=>n.categoria),s=new Map;ra(o.filter(n=>n!=="")).forEach((n,i)=>s.set(n,i)),a.sort((n,i)=>n.categoria===""&&i.categoria!==""?1:i.categoria===""&&n.categoria!==""?-1:(s.get(n.categoria)??0)-(s.get(i.categoria)??0));for(const n of a)n.itens.length>1&&(n.itens=ce(n.itens,i=>i.nome));return a}function $t(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=wa(o);t.has(s)||t.set(s,o)}return ra(Array.from(t.values()))}async function $a(e){const a=await(await k()).getAllFromIndex("espacos","perfil_id",e);return ce(a.filter(o=>!o.excluido),o=>o.nome)}const vs=["Cursos","Livros","Bíblia"];async function xa(e){const t=await $a(e);return $t([...vs,...t.map(a=>a.categoria)])}async function xt(e){return(await k()).get("espacos",e)}function Ea(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function fs(e,t,a,o={}){const s=await k(),n=R(),i={id:re(),perfil_id:e,nome:t,categoria:a,criado_em:n,atualizado_em:n,arquivado:!1};return Ea(i,o),await s.put("espacos",i),i}async function gs(e,t,a,o={}){const s=await k(),n=await s.get("espacos",e);n&&(n.nome=t,n.categoria=a,Ea(n,o),n.atualizado_em=R(),await s.put("espacos",n))}async function nt(e,t){const a=await k(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?R():void 0,o.atualizado_em=R(),await a.put("espacos",o))}async function Sa(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).filter(n=>!n.excluido).length;return{temas:a.length,notas:o}}async function La(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(r=>!r.excluido),n=(await Promise.all(o.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>!r.excluido),i=R(),c=t.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(pe(a,i));for(const r of o)await c.objectStore("temas").put(pe(r,i));for(const r of n)await c.objectStore("notas").put(pe(r,i));await c.done}function oe(e){return new Promise(t=>{var n,i;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${m(e.title)}</div>
        <p class="modal__message">${m(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${m(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${m(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(n=a.querySelector("#modal-confirm"))==null||n.addEventListener("click",()=>s(!0)),(i=a.querySelector("#modal-cancel"))==null||i.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function Te(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${m(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${m(a)}">${m(a)}</button>`).join("")}
    </div>
  `}function Et(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ve(o),o.focus()})})})}function D(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const ka="livro",Aa=[{chave:"pasta",label:"Categoria",svg:D('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:D('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:D('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:D('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:D('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:D('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:D('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:D('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:D('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:D('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:D('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:D('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:D('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:D('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:D('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:D('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:D('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:D('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:D('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:D('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:D('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:D('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:D('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:D('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:D('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:D('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:D('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:D('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:D('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],it=new Map(Aa.map(e=>[e.chave,e]));function se(e){return e&&it.get(e)||it.get(ka)}const bs=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function hs(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function St(e){var a;const t=hs(e);if(t.trim())return(a=bs.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function ge(e){return e.icone&&it.has(e.icone)?e.icone:St(`${e.nome??""} ${e.categoria??""}`)??ka}const ys="pasta";function qa(e){return St(e)??ys}const Ht=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function Ta(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${ne(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${Aa.map(s=>`
          <button
            type="button"
            class="espaco-icon-btn${s.chave===a?" is-selected":""}"
            data-icone="${ne(s.chave)}"
            title="${ne(s.label)}"
            aria-label="${ne(s.label)}"
            aria-pressed="${s.chave===a}"
          >${s.svg}</button>
        `).join("")}
      </div>
      <input type="hidden" id="${ne(t)}-icone" value="${ne(a??"")}" />

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
            title="${Ht[n]??`Cor ${n}`}"
            aria-label="${Ht[n]??`Cor ${n}`}"
            aria-pressed="${o===n}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${ne(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function Ma(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${fe(a)}"]`);if(!s)return;const n=s.querySelector(`#${fe(a)}-icone`),i=s.querySelector(`#${fe(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),r=l=>{n&&(n.value=l);for(const g of c){const f=g.dataset.icone===l;g.classList.toggle("is-selected",f),g.setAttribute("aria-pressed",String(f))}};let d=!1;for(const l of c)l.addEventListener("click",()=>{d=!0,r(l.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(l=>{l.addEventListener("click",()=>{i&&(i.value=l.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(g=>{const f=g===l;g.classList.toggle("is-selected",f),g.setAttribute("aria-pressed",String(f))})})});const u=()=>{if(d)return;const l=St(o());for(const g of c)g.classList.toggle("is-suggested",!!l&&g.dataset.icone===l);l&&r(l)};u(),e.querySelectorAll('input[type="text"]').forEach(l=>{l.addEventListener("input",u)})}function Ca(e,t){var i,c;const a=e.querySelector(`[data-espaco-visual="${fe(t)}"]`),o=(i=a==null?void 0:a.querySelector(`#${fe(t)}-icone`))==null?void 0:i.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${fe(t)}-cor`))==null?void 0:c.value.trim(),n={};if(o&&(n.icone=o),s!==void 0&&s!==""){const r=Number(s);Number.isInteger(r)&&r>=0&&r<le&&(n.cor=r)}return n}function ne(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function fe(e){return e.replace(/["\\]/g,"\\$&")}async function Se(e,t){var g,f,w,b;const a=await $a(t.perfilId),o=a.filter(v=>!v.arquivado),s=a.filter(v=>v.arquivado),n=await ws(a.map(v=>v.id)),i=wt(o),c=ba(o),r=ga(i.map(v=>v.categoria)),d=await xa(t.perfilId);e.innerHTML=`
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
        ${Te(d,"input-categoria-espaco")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${Ta({prefix:"novo-espaco"})}
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
    `:i.map(v=>{const L=v.itens.length===1?v.itens[0]:null,x=L?c.get(L.id)??O(L.id):r.get(_t(v.categoria))??O(v.categoria),C=se(L?ge(L):qa(v.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${x}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${x}" aria-hidden="true">${C.svg}</span>
            ${m(v.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${v.itens.map(N=>_s(N,n.get(N.id)??0,c.get(N.id)??O(N.id))).join("")}
        </div>
      </details>
    `}).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(v=>`
            <div class="item-row" data-id="${m(v.id)}">
              <button class="item-row__main" data-open="${m(v.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${O(v.id)}" aria-hidden="true">${se(ge(v)).svg}</span>
                  <span class="item-row__title">${m(v.nome)}</span>
                </span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${m(v.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,Et(e),Ma(e,{prefix:"novo-espaco",getTexto:()=>{var v,L;return`${((v=e.querySelector("#input-nome-espaco"))==null?void 0:v.value)??""} ${((L=e.querySelector("#input-categoria-espaco"))==null?void 0:L.value)??""}`}});const u=e.querySelector("#form-novo-espaco"),l=()=>{var v;u.style.display="block",(v=e.querySelector("#input-nome-espaco"))==null||v.focus()};(g=e.querySelector("#btn-novo-espaco"))==null||g.addEventListener("click",l),(f=e.querySelector("#btn-empty-novo-espaco"))==null||f.addEventListener("click",l),(w=e.querySelector("#btn-cancelar-espaco"))==null||w.addEventListener("click",()=>{u.style.display="none"}),(b=e.querySelector("#btn-salvar-espaco"))==null||b.addEventListener("click",async()=>{const v=e.querySelector("#input-nome-espaco"),L=e.querySelector("#input-categoria-espaco"),x=v.value.trim();if(!x)return;const C=await fs(t.perfilId,x,L.value.trim(),Ca(e,"novo-espaco"));M(`espacos/${C.id}`)}),e.querySelectorAll("[data-open]").forEach(v=>{v.addEventListener("click",()=>M(`espacos/${v.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(v=>{v.addEventListener("click",async()=>{await nt(v.dataset.archive,!0),Se(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(v=>{v.addEventListener("click",async()=>{await nt(v.dataset.unarchive,!1),Se(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(v=>{v.addEventListener("click",async()=>{const L=v.dataset.excluir,x=v.dataset.nome??"",C=await Sa(L);await oe({title:`Excluir "${x}"?`,message:`Isso manda pra Lixeira o espaço com ${C.temas} tema(s) e ${C.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await La(L),Se(e,t))})})}function _s(e,t,a){const o=se(ge(e));return`
    <div class="item-row" data-id="${m(e.id)}" style="--row-accent:${a}">
      <button class="item-row__main" data-open="${m(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${a}" aria-hidden="true">${o.svg}</span>
          <span class="item-row__title">${m(e.nome)}</span>
        </span>
        <span class="item-row__meta">${t} tema(s)</span>
      </button>
      <div class="item-row__actions">
        <button class="btn btn--secondary btn--sm" data-archive="${m(e.id)}" type="button" title="As revisões já agendadas continuam normalmente — só some da lista principal">Arquivar</button>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button data-excluir="${m(e.id)}" data-nome="${m(e.nome)}" class="danger" type="button">Excluir</button>
          </div>
        </details>
      </div>
    </div>
  `}async function ws(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function Ia(e){const a=await(await k()).getAllFromIndex("temas","espaco_id",e);return ce(a.filter(o=>!o.excluido),o=>o.nome)}async function Da(e){return(await k()).get("temas",e)}async function $s(e,t,a){const o=await k(),s=R(),n={id:re(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",n),n}async function xs(e,t,a){const o=await k(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=R(),await o.put("temas",s))}async function Es(e){const t=await k(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=R(),await t.put("temas",a),a.favorito):!1}async function Ss(e){return{notas:(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido).length}}async function Ls(e){const t=await k(),a=await t.get("temas",e);if(!a)return;const o=(await t.getAllFromIndex("notas","tema_id",e)).filter(i=>!i.excluido),s=R(),n=t.transaction(["temas","notas"],"readwrite");await n.objectStore("temas").put(pe(a,s));for(const i of o)await n.objectStore("notas").put(pe(i,s));await n.done}function ks(e,t){let a=e.has(t)?t:X(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=X(a,-1);return o}function As(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const qs=5;async function Ts(e){const t=await k(),a=te(),o=X(a,-6),[s,n,i,c,r]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"])),t.getAll("notas"),t.getAll("temas"),t.getAll("espacos")]),d=new Map(i.map(h=>[h.id,h])),u=new Map(c.map(h=>[h.id,h])),l=new Map(r.map(h=>[h.id,h])),g=h=>{const V=d.get(h.nota_id);if(!V||V.excluido)return!1;const be=u.get(V.tema_id);if(!be||be.excluido)return!1;const qt=l.get(be.espaco_id);return!!qt&&!qt.excluido},f=s.filter(h=>h.avaliacao&&g(h)),w=n.filter(g),b=f.filter(h=>h.data_concluida===a),v=b.length,L=b.reduce((h,V)=>h+(V.duracao_segundos??0),0),x=f.filter(h=>h.data_concluida&&h.data_concluida>=o&&h.data_concluida<=a).length,C=["1","7","30","180"].map(h=>({estagio:h,count:w.filter(V=>V.estagio===h).length})),N=[];for(let h=1;h<=7;h++){const V=X(a,h);N.push({data:V,count:w.filter(be=>be.data_agendada===V).length})}const Q=X(a,-29),B=f.filter(h=>h.data_concluida>=Q),G={facil:B.filter(h=>h.avaliacao==="facil").length,medio:B.filter(h=>h.avaliacao==="medio").length,dificil:B.filter(h=>h.avaliacao==="dificil").length,total:0};G.total=G.facil+G.medio+G.dificil;const Y=new Set(f.map(h=>h.data_concluida)),W=ks(Y,a),J=[];for(let h=6;h>=0;h--)J.push(Y.has(X(a,-h)));const _=f.filter(h=>h.estagio==="consulta").length,q=f.filter(h=>h.avaliacao==="dificil"),T=Array.from(new Set(q.map(h=>h.nota_id))),F=await Promise.all(T.map(h=>t.get("notas",h))),Z=new Map(F.filter(h=>!!h).map(h=>[h.id,h.tema_id])),E=new Map;for(const h of q){const V=Z.get(h.nota_id);V&&E.set(V,(E.get(V)??0)+1)}const p=Array.from(E.keys()),y=(await Promise.all(p.map(h=>t.get("temas",h)))).filter(h=>!!h).map(h=>({temaId:h.id,temaNome:h.nome,count:E.get(h.id)})).sort((h,V)=>V.count-h.count).slice(0,qs),A=r.filter(h=>h.perfil_id===e&&!h.excluido),j=A.filter(h=>!h.arquivado).length,K=(await Promise.all(A.map(h=>t.getAllFromIndex("temas","espaco_id",h.id)))).flat().filter(h=>!h.excluido),Pe=K.length,we=(await Promise.all(K.map(h=>t.getAllFromIndex("notas","tema_id",h.id)))).flat().filter(h=>!h.excluido).length;return{revisoesHoje:v,revisoesUltimos7Dias:x,streakDias:W,diasAtivosUltimos7:J,rankingDificeis:y,espacosAtivos:j,totalTemas:Pe,totalNotas:we,itensEmConsulta:_,porEstagio:C,tempoHojeSegundos:L,cargaProximos7:N,retencao30:G}}async function Ms(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("notas","tema_id",i.id)))).flat();return(await Promise.all(s.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat().reduce((i,c)=>i+(c.duracao_segundos??0),0)}async function Cs(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,n)=>s+(n.duracao_segundos??0),0)}function Na(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${m(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${m(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=n=>{n.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()})}const Bt=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}];function Is(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function ja(e,t,a,o){var s;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra testar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o);return}Ds(e,t,a,o)}function Ds(e,t,a,o){var s;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Voltar</button>
    </div>
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
        <h2 style="margin:0;">Avaliação aleatória — ${m(a)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse rápido com notas aleatórias, sem afetar sua fila de revisão. ${t.length} nota(s) no total — escolha quantas:
        </p>
        <div class="stack">
          ${Bt.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const i=Bt.find(r=>r.key===n.dataset.tier),c=Is(t).slice(0,Math.min(i.n,t.length));rt(e,c,0,a,o)})})}function rt(e,t,a,o,s,n=!1){var c,r,d;if(a>=t.length){Ns(e,t.length,o,s);return}const i=t[a];e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Encerrar avaliação</button>
    </div>
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${m(i.tema.nome)} · ${a+1} de ${t.length}</div>
      <div class="review-card__titulo">${i.nota.favorito?`${S.star} `:""}${m(i.nota.titulo||"(sem título)")}</div>
      ${n?`
        <div class="review-card__content markdown-preview">${De(i.nota.conteudo)}</div>
        <button class="btn btn--primary" id="btn-proxima" type="button">${a+1<t.length?"Próxima":"Terminar"}</button>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{rt(e,t,a,o,s,!0)}),(d=e.querySelector("#btn-proxima"))==null||d.addEventListener("click",()=>{rt(e,t,a+1,o,s,!1)})}function Ns(e,t,a,o){var s;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${S.confete}</div>
      <h2 style="margin:0;">Repasse concluído</h2>
      <p class="text-muted" style="margin:0;">
        Você passou por ${t} nota(s) de ${m(a)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `,(s=e.querySelector("#btn-terminar"))==null||s.addEventListener("click",o)}function Lt(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${se(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${O(t.colorKey)}"></span>`:""}${m(t.label)}`,n=a===e.length-1,i=t.route&&!n?`<button class="link" data-crumb="${m(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?i:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${i}`}).join("")}
    </div>
  `}function kt(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>M(t.dataset.crumb))})}async function Le(e,t){var C,N,Q,B,G,Y,W,J,_,q,T,F,Z;const a=await xt(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await Ia(t),s=await js(o.map(E=>E.id)),n=wt(o),i=await xa(a.perfil_id),c=$t(o.map(E=>E.categoria)),r=[...o].sort((E,p)=>p.criado_em.localeCompare(E.criado_em))[0],d=((C=r==null?void 0:r.categoria)==null?void 0:C.trim())||void 0,u=((N=r==null?void 0:r.nome)==null?void 0:N.trim())||void 0,l=fa(a.cor,O(a.id)),g=se(ge(a)),f=ga(n.map(E=>E.categoria));e.innerHTML=`
    ${Lt([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:g.chave,iconColor:l}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${l}" aria-hidden="true">${g.svg}</span>${m(a.nome)}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-editar" type="button">Editar</button>
        <button class="btn btn--secondary btn--sm" id="btn-arquivar" type="button" ${a.arquivado?"":'title="As revisões já agendadas continuam normalmente — só some da lista principal"'}>
          ${a.arquivado?"Reativar":"Arquivar"}
        </button>
        <a class="btn btn--secondary btn--sm" href="#/espacos/${m(a.id)}/pdf">PDF</a>
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
        <input class="input" id="input-nome-espaco-editar" type="text" value="${m(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${m(a.categoria)}" maxlength="80" />
        ${Te(i,"input-categoria-espaco-editar")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${Ta({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
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
        <input class="input${u?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${m(u??"")}" />
        ${u?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema">Categoria (opcional)</label>
        <input class="input${d?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${m(d??"")}" />
        ${d?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${Te(c,"input-categoria-tema")}
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
    `:n.map(E=>{const p=f.get(_t(E.categoria))??O(E.categoria||"sem-categoria"),$=se(qa(E.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${p}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${p}" aria-hidden="true">${$.svg}</span>
            ${m(E.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${m(E.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${m(Vo(E.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${E.itens.map(y=>`
            <button class="item-row" data-open="${m(y.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${p}">
              <span class="item-row__main">
                <span class="item-row__title">${y.favorito?`${S.star} `:""}${m(y.nome)}</span>
                <span class="item-row__meta">${s.get(y.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,kt(e),Et(e),Ma(e,{prefix:"editar-espaco",getTexto:()=>{var E,p;return`${((E=e.querySelector("#input-nome-espaco-editar"))==null?void 0:E.value)??""} ${((p=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:p.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(E=>{E.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),M(`espacos/${t}/pdf/${E.dataset.pdfCategoria}`)})}),(Q=e.querySelector("#btn-arquivar"))==null||Q.addEventListener("click",async()=>{!a.arquivado&&!await oe({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await nt(a.id,!a.arquivado),Le(e,t))});const w=e.querySelector("#form-editar-espaco");(B=e.querySelector("#btn-editar"))==null||B.addEventListener("click",()=>{var E;w.style.display="block",(E=e.querySelector("#input-nome-espaco-editar"))==null||E.focus()}),(G=e.querySelector("#btn-cancelar-edicao"))==null||G.addEventListener("click",()=>{w.style.display="none"}),(Y=e.querySelector("#btn-salvar-edicao"))==null||Y.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-espaco-editar").value.trim(),p=e.querySelector("#input-categoria-espaco-editar").value.trim();E&&(await gs(a.id,E,p,Ca(e,"editar-espaco")),Le(e,t))}),(W=e.querySelector("#btn-detalhes"))==null||W.addEventListener("click",async()=>{const E=Array.from(s.values()).reduce((P,K)=>P+K,0),p=H(),$=await Ms(a.id);let y,A,j;if(a.arquivado&&a.arquivado_em){const P=ye(H(new Date(a.criado_em)),H(new Date(a.arquivado_em)));y=String(P),A="Dias até arquivar",j=`Criado em ${ae(a.criado_em)} · arquivado em ${ae(a.arquivado_em)}`}else if(a.arquivado)y="—",A="Duração",j=`Criado em ${ae(a.criado_em)} · arquivado antes desse registro de data existir`;else{const P=ye(H(new Date(a.criado_em)),p);y=String(P),A=P===1?"Dia ativo":"Dias ativo",j=`Criado em ${ae(a.criado_em)}`}Na({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${o.length}</div>
            <div class="stat-tile__label">Temas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${E}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${gt($)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${y}</div>
            <div class="stat-tile__label">${A}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${j} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(J=e.querySelector("#btn-avaliar"))==null||J.addEventListener("click",async()=>{const E=await Ro(a.id);ja(e,E,a.nome,()=>Le(e,t))}),(_=e.querySelector("#btn-excluir"))==null||_.addEventListener("click",async()=>{const E=await Sa(a.id);await oe({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o espaço com ${E.temas} tema(s) e ${E.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await La(a.id),M("espacos"))});const b=e.querySelector("#form-novo-tema"),v=()=>{var E;b&&(b.style.display="block"),(E=e.querySelector("#input-nome-tema"))==null||E.focus()};(q=e.querySelector("#btn-novo-tema"))==null||q.addEventListener("click",v),(T=e.querySelector("#btn-empty-novo-tema"))==null||T.addEventListener("click",v),(F=e.querySelector("#btn-cancelar-tema"))==null||F.addEventListener("click",()=>{b&&(b.style.display="none")});const L=e.querySelector("#input-nome-tema");u&&L&&L.addEventListener("input",()=>ve(L),{once:!0});const x=e.querySelector("#input-categoria-tema");d&&x&&x.addEventListener("input",()=>ve(x),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(E=>{E.addEventListener("click",p=>{var $;p.preventDefault(),p.stopPropagation(),b&&(b.style.display="block"),x&&(x.value=E.dataset.novoTemaCategoria,ve(x)),($=e.querySelector("#input-nome-tema"))==null||$.focus(),b==null||b.scrollIntoView({behavior:"smooth",block:"start"})})}),(Z=e.querySelector("#btn-salvar-tema"))==null||Z.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-tema"),p=e.querySelector("#input-categoria-tema"),$=E.value.trim();if(!$)return;const y=await $s(t,$,p.value.trim());M(`temas/${y.id}`)}),e.querySelectorAll("[data-open]").forEach(E=>{E.addEventListener("click",()=>M(`temas/${E.dataset.open}`))})}async function js(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function Ps(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(c=>!c.excluido),s=wt(o),n=vt()==="titulo",i=[];for(const c of s){const r=[];for(const d of c.itens){const u=(await t.getAllFromIndex("notas","tema_id",d.id)).filter(g=>!g.excluido);n?ce(u,g=>g.titulo):u.sort((g,f)=>g.criado_em.localeCompare(f.criado_em));const l=[];for(const g of u){const w=(await t.getAllFromIndex("itens_revisao","nota_id",g.id)).map(b=>b.avaliacao).filter(b=>!!b);l.push({nota:g,fraca:As(w)})}r.push({tema:d,notas:l})}i.push({categoria:c.categoria,temas:r})}return{espaco:a,grupos:i}}function He(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Ie.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const Vt=["•","◦","▪"];function Pa(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${He(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const n=Math.floor((t.length-t.trimStart().length)/2),i=Vt[Math.min(n,Vt.length-1)];return`${"  ".repeat(n)}${i} ${He(s[1])}`}return He(a)}).join(`
`)}function zs(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",Pa(e.conteudo)),t.join(`
`).trim()}function Rs(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of t)if(o.temas.length!==0){a.push("",`▸ ${(o.categoria||"Sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.tema.favorito?"⭐ ":""}*${s.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const n of s.notas){const i=`${n.nota.favorito?"⭐ ":""}${n.fraca?"⚠ ":""}`;a.push("",`${i}*${n.nota.titulo||"(sem título)"}*`),n.nota.fonte&&a.push(`_${n.nota.fonte}_`),a.push(Pa(n.nota.conteudo))}}}return a.join(`
`).trim()}async function Fs(e,t,a){var u,l;const o=await Ps(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,n=a===void 0?o.grupos:o.grupos.filter(g=>g.categoria===a),i=Rs(s,n),c=fa(s.cor,O(s.id)),r=se(ge(s));e.innerHTML=`
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
        <span class="espaco-icon-inline" style="--badge-accent:${c}" aria-hidden="true">${r.svg}</span>${m(s.nome)}
      </h1>
      <p class="pdf-meta">
        ${a!==void 0?`Categoria: ${m(a||"Sem categoria")} · `:""}Gerado em ${ae(H()+"T00:00:00Z")}
      </p>

      ${n.every(g=>g.temas.length===0)?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:n.map(g=>{const f=g.categoria?g.categoria.toLowerCase():s.id;return`
        <section class="pdf-category" style="--cat-accent:${O(f)}">
          <div class="pdf-category__title">
            <span class="color-dot" style="--dot-color:${O(f)}"></span>${m(g.categoria||"Sem categoria")}
          </div>
          ${g.temas.map(w=>{const b=w.tema.categoria?w.tema.categoria.toLowerCase():w.tema.id;return`
            <section class="pdf-tema" style="--tema-accent:${O(b)}">
              <div class="pdf-tema__title">${w.tema.favorito?`${S.star} `:""}${m(w.tema.nome)}</div>
              ${w.notas.length===0?'<p class="text-muted">Sem notas.</p>':w.notas.map(v=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${v.nota.favorito?`${S.star} `:""}${v.fraca?`${S.alert} Reforçar — `:""}${m(v.nota.titulo||"(sem título)")}
                  </div>
                  ${v.nota.fonte?`<div class="pdf-nota__meta">${m(v.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${De(v.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `}).join("")}
        </section>
      `}).join("")}
    </article>
  `,(u=e.querySelector("[data-back]"))==null||u.addEventListener("click",()=>M(`espacos/${t}`)),(l=e.querySelector("#btn-imprimir"))==null||l.addEventListener("click",()=>window.print());const d=e.querySelector("#btn-copiar");d==null||d.addEventListener("click",async()=>{const g=d.textContent;try{await navigator.clipboard.writeText(i),d.textContent="Copiado!"}catch{d.textContent="Não foi possível copiar"}setTimeout(()=>{d.textContent=g},1800)})}async function ke(e,t){var d,u,l,g,f,w,b,v,L;const a=await Da(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await xt(a.espaco_id),s=await la(t),n=o?await Ia(o.id):[],i=$t(n.map(x=>x.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${Lt([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${O(c)}"></span>${a.favorito?`${S.star} `:""}${m(a.nome)}
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
        <input class="input" id="input-nome-tema-editar" type="text" value="${m(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-tema-editar" type="text" value="${m(a.categoria)}" maxlength="80" />
        ${Te(i,"input-categoria-tema-editar")}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${o!=null&&o.arquivado?`<div class="banner banner--warning"><span>O espaço "${m(o.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`:""}

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
          <button class="item-row" data-open="${m(x.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${O(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${x.favorito?`${S.star} `:""}${m(x.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${m(x.fonte||"Sem fonte")}${x.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${x.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,kt(e),Et(e),(d=e.querySelector("#btn-nova-nota"))==null||d.addEventListener("click",()=>M(`temas/${t}/nova-nota`)),(u=e.querySelector("#btn-empty-nova-nota"))==null||u.addEventListener("click",()=>M(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(x=>{x.addEventListener("click",()=>M(`notas/${x.dataset.open}`))}),(l=e.querySelector("#btn-favoritar-tema"))==null||l.addEventListener("click",async()=>{await Es(a.id),ke(e,t)}),(g=e.querySelector("#btn-detalhes-tema"))==null||g.addEventListener("click",async()=>{const x=await Cs(a.id),C=ye(H(new Date(a.criado_em)),H());Na({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${gt(x)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${C}</div>
            <div class="stat-tile__label">${C===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${ae(a.criado_em)}</p>
      `})}),(f=e.querySelector("#btn-avaliar-tema"))==null||f.addEventListener("click",()=>{const x=s.map(C=>({nota:C,tema:a}));ja(e,x,a.nome,()=>ke(e,t))});const r=e.querySelector("#form-editar-tema");(w=e.querySelector("#btn-editar-tema"))==null||w.addEventListener("click",()=>{var x;r.style.display="block",(x=e.querySelector("#input-nome-tema-editar"))==null||x.focus()}),(b=e.querySelector("#btn-cancelar-edicao-tema"))==null||b.addEventListener("click",()=>{r.style.display="none"}),(v=e.querySelector("#btn-salvar-edicao-tema"))==null||v.addEventListener("click",async()=>{const x=e.querySelector("#input-nome-tema-editar").value.trim(),C=e.querySelector("#input-categoria-tema-editar").value.trim();x&&(await xs(a.id,x,C),ke(e,t))}),(L=e.querySelector("#btn-excluir-tema"))==null||L.addEventListener("click",async()=>{const x=await Ss(a.id);await oe({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o tema com ${x.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ls(a.id),M(`espacos/${a.espaco_id}`))})}function $e(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${m(e)}</div>
    </details>
  `}let Ne=!1,ct=null;function Os(e){Ne=e}function Ut(){Ne=!1}function Hs(e){ct=e}function he(){return Ne?ct?ct():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function Bs(){window.addEventListener("beforeunload",e=>{Ne&&(e.preventDefault(),e.returnValue="")})}const Vs={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function Be(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function Me(e,t){var J,_,q,T,F,Z,E;const a=t.mode==="nova"?t.temaId:(J=await zt(t.notaId))==null?void 0:J.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await Da(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await xt(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${m(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(_=e.querySelector("#btn-voltar-arquivado"))==null||_.addEventListener("click",()=>M(`temas/${a}`));return}const n=t.mode==="editar"?await zt(t.notaId):void 0,i=n?await Us(n.id):!1,c=t.mode==="nova"?(await la(a)).at(-1):void 0,r=c==null?void 0:c.titulo,d=c==null?void 0:c.fonte;e.innerHTML=`
    ${Lt([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(n==null?void 0:n.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&n?`<div class="section-header__meta text-muted">Criada em ${ae(n.criado_em)}${n.atualizado_em!==n.criado_em?` · Editada em ${ae(n.atualizado_em)}`:""}</div>`:""}
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
        <label class="field__label" for="input-titulo">Título${$e('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${r?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${m((n==null?void 0:n.titulo)??r??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${r?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${$e("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${d?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${m((n==null?void 0:n.fonte)??d??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${d?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${$e("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
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
            ${Ie.map(p=>`<button type="button" class="color-picker__swatch" data-cor="${p}" style="--dot-color:${Vs[p]}" title="${m(Rt[p])}" aria-label="${m(Rt[p])}"></button>`).join("")}
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
        >${n!=null&&n.conteudo?De(n.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${n!=null&&n.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${$e("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
        </div>
      </div>

      <div class="field" id="wrapper-validade" style="display:${n!=null&&n.pode_desatualizar?"flex":"none"};">
        <label class="field__label" for="input-validade">Válido até</label>
        <input class="input" id="input-validade" type="date" value="${m((n==null?void 0:n.validade_ate)??"")}" style="max-width: 200px;" />
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
  `;const u=`temas/${a}`;kt(e),(q=e.querySelector("#btn-cancelar"))==null||q.addEventListener("click",()=>{he()&&(Ut(),M(u))});const l=e.querySelector("#input-conteudo"),g=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),w=()=>Os(!0);g.addEventListener("input",w),f.addEventListener("input",w),l.addEventListener("input",w),Hs(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),r&&g.addEventListener("input",()=>ve(g),{once:!0}),d&&f.addEventListener("input",()=>ve(f),{once:!0}),l.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function b(p){var y,A;let $=((A=(y=window.getSelection())==null?void 0:y.getRangeAt(0))==null?void 0:A.commonAncestorContainer)??null;for(;$&&$!==l;){if($ instanceof HTMLElement&&$.tagName===p)return!0;$=$.parentNode}return!1}function v(){const p=window.getSelection();if(!p||p.rangeCount===0)return;let $=p.getRangeAt(0).commonAncestorContainer;for(;$&&$!==l;){if($ instanceof HTMLElement&&$.tagName==="LI"){const y=document.createRange();y.selectNodeContents($),y.collapse(!1),p.removeAllRanges(),p.addRange(y);return}$=$.parentNode}}function L(){l.querySelectorAll("p").forEach(p=>{p.querySelector("ul")&&p.replaceWith(...Array.from(p.childNodes))})}function x(){const p=window.getSelection(),$=p.getRangeAt(0);$.deleteContents();const y=document.createElement("br");$.insertNode(y);const A=document.createTextNode("​");y.after(A);const j=document.createRange();return j.setStart(A,1),j.collapse(!0),p.removeAllRanges(),p.addRange(j),{br:y,ancora:A}}function C(){if(!N)return;const{br:p,ancora:$}=N;if(N=null,!document.contains($))return;const y=$.parentNode;if(!y)return;const A=Array.from(y.childNodes).indexOf($);$.remove();const j=window.getSelection();if(!j||!document.contains(p))return;const P=document.createRange();P.setStart(y,A),P.collapse(!0),j.removeAllRanges(),j.addRange(P)}let N=null;l.addEventListener("keydown",p=>{if(p.key!=="Enter"||p.shiftKey||p.ctrlKey||p.metaKey||p.altKey||b("LI")){N=null;return}p.preventDefault(),N&&document.contains(N.br)?(N.ancora.remove(),N.br.remove(),document.execCommand("insertParagraph"),N=null):N=x()}),l.addEventListener("mousedown",()=>{N=null}),l.addEventListener("keydown",p=>{p.key!=="Tab"||!b("LI")||(p.preventDefault(),C(),document.execCommand(p.shiftKey?"outdent":"indent"),L())});function Q(){var p;l.classList.toggle("is-empty",!((p=l.textContent)!=null&&p.trim()))}l.addEventListener("input",()=>{if(l.childNodes.length===0){l.innerHTML="<p><br></p>";const p=l.firstChild,$=document.createRange();$.setStart(p,0),$.collapse(!0);const y=window.getSelection();y==null||y.removeAllRanges(),y==null||y.addRange($)}Q()}),Q(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(p=>{p.addEventListener("mousedown",$=>$.preventDefault()),p.addEventListener("click",()=>{C();const $=p.dataset.cmd;if($==="strikeThrough")document.execCommand("strikeThrough");else if($==="createLink"){const y=window.getSelection();if(!y||y.isCollapsed){l.focus();return}const A=prompt("URL do link:","https://");A&&A.trim()&&document.execCommand("createLink",!1,A.trim())}else $==="removeFormat"?document.execCommand("removeFormat"):document.execCommand($);$==="insertUnorderedList"&&(L(),v()),l.focus(),W()})}),e.querySelectorAll(".color-picker__swatch").forEach(p=>{p.addEventListener("mousedown",$=>$.preventDefault()),p.addEventListener("click",()=>{C();const $=p.dataset.cor,y=window.getSelection();if(!y||y.rangeCount===0||y.isCollapsed)return;const A=y.getRangeAt(0);if(!l.contains(A.commonAncestorContainer))return;const j=A.extractContents();Be(j);const P=document.createElement("span");P.className=`text-color text-color--${$}`,P.appendChild(j),A.insertNode(P),y.removeAllRanges();const K=document.createRange();K.selectNodeContents(P),y.addRange(K),l.focus()})});const B=e.querySelector("[data-cor-limpar]");B.addEventListener("mousedown",p=>p.preventDefault()),B.addEventListener("click",()=>{C();const p=window.getSelection();if(!p||p.rangeCount===0)return;const $=p.getRangeAt(0);if(l.contains($.commonAncestorContainer)){if($.collapsed){let y=$.commonAncestorContainer;for(;y&&y!==l;){if(y instanceof HTMLElement&&y.classList.contains("text-color")){const A=y.parentNode;if(A){const j=document.createDocumentFragment();Array.from(y.childNodes).forEach(P=>j.appendChild(P)),A.replaceChild(j,y),Be(A)}break}y=y.parentNode}}else{const y=$.extractContents();Be(y),$.insertNode(y)}l.focus()}});const G=e.querySelector("#input-pode-desatualizar"),Y=e.querySelector("#wrapper-validade");G.addEventListener("change",()=>{Y.style.display=G.checked?"flex":"none"});function W(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach($=>{const y=$.dataset.cmd;try{y==="bold"||y==="italic"||y==="underline"||y==="strikeThrough"||y==="insertUnorderedList"?$.setAttribute("aria-pressed",document.queryCommandState(y)?"true":"false"):$.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===l&&W()}),l.addEventListener("keyup",W),l.addEventListener("mouseup",W),l.addEventListener("focus",W),l.addEventListener("keydown",p=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?p.metaKey:p.ctrlKey))return;let A=!0;switch(p.key.toLowerCase()){case"b":p.preventDefault(),document.execCommand("bold");break;case"i":p.preventDefault(),document.execCommand("italic");break;case"u":p.preventDefault(),document.execCommand("underline");break;case"s":p.preventDefault(),document.execCommand("strikeThrough");break;case"k":p.preventDefault(),C();const j=window.getSelection();if(j&&!j.isCollapsed){const P=prompt("URL do link:","https://");P&&P.trim()&&document.execCommand("createLink",!1,P.trim())}break;case"z":p.preventDefault(),p.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":p.preventDefault(),document.execCommand("redo");break;default:A=!1}A&&W()}),(T=e.querySelector("#btn-salvar"))==null||T.addEventListener("click",async()=>{const p=g.value.trim(),$=is(l).trim();let y=null;const A=(K,Pe)=>{var we;K.classList.add("input--error"),K.setAttribute("aria-invalid","true");const _e=(we=K.closest(".field"))==null?void 0:we.querySelector(".field__error");_e&&(_e.textContent=Pe,_e.style.display="block"),y||(y=K)},j=K=>{K.classList.remove("input--error"),K.removeAttribute("aria-invalid")};if(p||A(g,"Informe um título para a nota."),$||A(l,"Informe o conteúdo da nota."),y){y.focus();return}j(g),j(l);const P={titulo:p,conteudo:$,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:G.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await Fo(a,P):await Oo(t.notaId,P),Ut(),M(u)}),t.mode==="editar"&&n){(F=e.querySelector("#btn-favoritar-nota"))==null||F.addEventListener("click",async()=>{await Ho(n.id),Me(e,t)}),(Z=e.querySelector("#btn-parar-revisar"))==null||Z.addEventListener("click",async()=>{await os(n.id),Me(e,t)});const p=e.querySelector("#btn-compartilhar-nota");p==null||p.addEventListener("click",async()=>{const $=zs(n);if(navigator.share){try{await navigator.share({title:n.titulo||"Nota",text:$})}catch{}return}const y=p.textContent;try{await navigator.clipboard.writeText($),p.textContent="Copiado!"}catch{p.textContent="Não foi possível copiar"}setTimeout(()=>{p.textContent=y},1800)}),(E=e.querySelector("#btn-excluir-nota"))==null||E.addEventListener("click",async()=>{await oe({title:"Excluir esta nota?",message:"A nota vai pra Lixeira e dá pra restaurar em Configurações → Lixeira por até 30 dias."})&&(await Bo(n.id),M(u))})}}async function Us(e){return(await(await k()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function Gs(e){return e.length===10?e:H(new Date(e))}function Ks(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function Ws(e){const t=new Set;for(const a of e)a&&t.add(Gs(a));return t}function za(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Ve(e){return e.size}function Zs(e,t,a=365,o=H()){const s=X(o,-a+1),n=[];let i=s;for(;i<=o;)n.push({date:i,count:(e.has(i)?1:0)+(t.has(i)?1:0),hasRevisao:e.has(i),hasCriacao:t.has(i)}),i=X(i,1);const c=Ve(e),r=Ve(t),d=Ve(za(e,t));return{days:n,totalDiasRevisao:c,totalDiasCriacao:r,totalDiasAtividade:d}}async function Ra(e){const t=await k(),a=H(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const x=await t.getAllFromIndex("espacos","perfil_id",e),N=(await Promise.all(x.map(B=>t.getAllFromIndex("temas","espaco_id",B.id)))).flat();return(await Promise.all(N.map(B=>t.getAllFromIndex("notas","tema_id",B.id)))).flat()})()]),n=o.filter(x=>x.data_concluida).map(x=>x.data_concluida),i=Ks(n),c=Ws(s.map(x=>x.criado_em)),r=o.filter(x=>x.data_concluida===a).length,d=s.filter(x=>H(new Date(x.criado_em))===a).length,u=a.slice(0,4),l=a.slice(5,7),g=`${u}-${l}`,f=n.filter(x=>x.startsWith(g)).length,w=s.filter(x=>H(new Date(x.criado_em)).startsWith(g)).length,b=i.size,v=c.size,L=za(i,c).size;return{datasRevisaoSet:i,datasCriacaoSet:c,totalDiasRevisao:b,totalDiasCriacao:v,totalDiasAtividade:L,notasCriadasHoje:d,revisoesFeitasHoje:r,notasCriadasEsteMes:w,revisoesFeitasEsteMes:f}}async function Xs(e,t=365){const a=await Ra(e);return Zs(a.datasRevisaoSet,a.datasCriacaoSet,t)}function Qs(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function Js(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const n=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let r=0;r<n;r++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const r of e)s.push(r),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(r=>`
          <div class="heatmap__col">
            ${r.map(d=>`
              <div class="heatmap__cell heatmap__cell--${Qs(d.count)}${d.date?"":" heatmap__cell--empty"}" title="${d.date?`${d.date}${d.count?` · ${d.count} atividade(s)`:""}${d.hasRevisao&&d.hasCriacao?" (revisão + criação)":d.hasRevisao?" (revisão)":d.hasCriacao?" (criação)":""}`:""}"></div>
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
        ${m(String(t))} dias estudados · ${m(String(a))} dias com criação de notas · ${m(String(e.filter(r=>r.count>0).length))} dias com atividade nos últimos ${m(String(e.length))} dias
      </p>
    </div>
  `}const Ys={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function en(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function tn(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function an(e,t){const a=await Ts(t.perfilId),o=await Ra(t.perfilId),s=await Xs(t.perfilId,365),n=["dom","seg","ter","qua","qui","sex","sáb"],i=new Date().getDay(),c=Math.max(1,...a.cargaProximos7.map(d=>d.count)),r=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null;e.innerHTML=`
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
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${gt(a.tempoHojeSegundos)}</div>
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
            <div class="stage-tile__label">${Ys[d.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${S.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(d=>`${d.count} em ${tn(d.data)}`).join(", ")}">
        ${a.cargaProximos7.map(d=>{const u=en(d.data);return`
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
              <span>${u+1}. ${m(d.temaNome)}</span>
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
      ${Js(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `,e.querySelectorAll(".tabs__tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(u=>{u.setAttribute("aria-selected",String(u===d))}),e.querySelector("#tab-visao").style.display=d.dataset.tab==="visao"?"block":"none",e.querySelector("#tab-evolucao").style.display=d.dataset.tab==="evolucao"?"block":"none"})})}async function on(e){const t=await k(),a=(await t.getAllFromIndex("espacos","perfil_id",e)).filter(d=>!d.excluido),o=await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id))),s=[],n=[],i=new Map;for(let d=0;d<a.length;d++){const u=a[d],l=o[d].filter(g=>!g.excluido);for(const g of l)i.set(g.id,u),g.favorito&&s.push({tema:g,espaco:u})}const c=o.flat().filter(d=>!d.excluido),r=await Promise.all(c.map(d=>t.getAllFromIndex("notas","tema_id",d.id)));for(let d=0;d<c.length;d++){const u=c[d],l=r[d].filter(f=>!f.excluido),g=i.get(u.id);if(g)for(const f of l)f.favorito&&n.push({nota:f,tema:u,espaco:g})}return{temas:ce(s,d=>d.tema.nome),notas:ce(n,d=>d.nota.titulo||d.tema.nome)}}async function sn(e,t){var d;const{temas:a,notas:o}=await on(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>M("espacos"));return}const s=new Map;for(const u of a){const l=s.get(u.espaco.id)??{espaco:u.espaco,itens:[]};l.itens.push(u),s.set(u.espaco.id,l)}const n=new Map;for(const u of o){const l=n.get(u.tema.id)??{temaNome:u.tema.nome,espaco:u.espaco,itens:[]};l.itens.push(u),n.set(u.tema.id,l)}const i=new Map;for(const u of a)i.set(u.espaco.id,u.espaco);for(const u of o)i.set(u.espaco.id,u.espaco);const c=ba([...i.values()]),r=u=>{const l=c.get(u.id)??O(u.id),g=se(ge(u));return`<span class="espaco-icon-inline" style="--badge-accent:${l}" aria-hidden="true">${g.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??O(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${m(u.espaco.nome)}
          </div>
          <div class="item-list">
            ${u.itens.map(l=>`
              <button class="item-row" data-tema="${m(l.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??O(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${S.star} ${m(l.tema.nome)}</span>
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
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??O(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${m(u.temaNome)} <span class="queue-group__espaco"> · ${m(u.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${u.itens.map(l=>`
              <button class="item-row" data-nota="${m(l.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??O(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${S.star} ${m(l.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${m(l.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(u=>{u.addEventListener("click",()=>M(`temas/${u.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(u=>{u.addEventListener("click",()=>M(`notas/${u.dataset.nota}`))})}const nn=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,rn=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,cn=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,ln=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      ou você pode <b>Excluir de vez</b> na hora, se quiser.</p>`}];function dn(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${nn}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${rn}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${cn}</pre>
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

      ${ln.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function un(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,n=0,i=0;for(const c of t){const r=a.get(c.id);r?c.atualizado_em>r.atualizado_em?(a.set(c.id,c),o.push(c),n++):i++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:n,mantidos:i}}function mn(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const pn=["perfis","espacos","temas","notas","itens_revisao"],At="memoriza-export",Fa=1;async function vn(){const e=await k(),[t,a,o,s,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:n}}async function fn(e){const t=await k(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(l=>l.id)),i=(await t.getAll("temas")).filter(l=>s.has(l.espaco_id)),c=new Set(i.map(l=>l.id)),d=(await t.getAll("notas")).filter(l=>c.has(l.tema_id)),u=await t.getAllFromIndex("itens_revisao","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:i,notas:d,itens_revisao:u}}async function gn(e){const t=await fn(e);return{formato:At,versao:Fa,exportado_em:R(),escopo:"perfil",perfil_id:e,dados:t}}async function lt(){const e=await vn();return{formato:At,versao:Fa,exportado_em:R(),escopo:"todos",dados:e}}function bn(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${Lo(e.exportado_em)}.json`}function Gt(e){const t=bn(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function Oa(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==At||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Ha(e){const t=await k(),a={};for(const o of pn){const s=await t.getAll(o),n=e.dados[o],i=un(s,n??[]);if(i.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const r of i.toWrite)await c.store.put(r);await c.done}a[o]={criados:i.criados,atualizados:i.atualizados,mantidos:i.mantidos}}return await da(),{...mn(Object.values(a)),porLoja:a}}function hn(e){return e.replace(/-/g,"")}function yn(e,t){const[a,o]=t.split(":");return`${hn(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function _n(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function wn(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function $n(e){const t=yn(te(),e),a=_n(new Date),o=wn("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${re()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function xn(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const En="https://api.github.com",Sn="Memoriza — sincronização de anotações",je="memoriza-sync.json";function Ln(e){return(t,a={})=>fetch(`${En}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function kn(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&je in s.files))==null?void 0:o.id)??null}async function An(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:Sn,public:!1,files:{[je]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function qn(e,t){var s,n;const a=await e(`/gists/${t}`);return a.ok?((n=(s=(await a.json()).files)==null?void 0:s[je])==null?void 0:n.content)??null:null}async function Tn(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[je]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function Ba(e){const t=Ln(e);let a=Qt();if(!a){const i=await kn(t);i&&(a=i,Ze(i))}let o=null,s=!1,n=await lt();if(a){const i=await qn(t,a);if(i)try{const c=Oa(i);o=await Ha(c),n=await lt(),s=!0}catch{}}return a?await Tn(t,a,JSON.stringify(n)):(a=await An(t,JSON.stringify(n)),Ze(a)),Jt(R()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??Mn(),push:!0,mesclouRemoto:s}}function Mn(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function Cn(e){const t=pt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const In=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],Dn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}],Nn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function jn(e){const t=[`${Nn[e.tipo]} em ${e.contexto}`];return e.temas&&t.push(`${e.temas} tema(s)`),e.notas&&t.push(`${e.notas} nota(s)`),e.excluido_em&&t.push(`excluído em ${tt(e.excluido_em)}`),t.join(" · ")}async function ee(e,t){var v,L,x,C,N,Q,B,G,Y,W,J;const a=ro(),o=Ja(),s=await bt(),n=ao(t.perfil.id),i=mt(),c=Yt(),r=pt(),d=Qt(),u=vt(),l=await jo(t.perfil.id);e.innerHTML=`
    <div class="stack content-narrow content-wide">
      <section class="settings-section">
        <div class="settings-section__title">${S.user} Perfil</div>
        <div class="card">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">${m(t.perfil.nome)}</div>
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
            ${s.map(_=>`
              <div class="settings-list-row" data-perfil-id="${m(_.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${m(_.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${m(_.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${m(_.id)}" data-nome="${m(_.nome)}" class="danger" type="button">Excluir perfil</button>
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
              ${In.map(_=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-theme="${_.value}"
                  aria-pressed="${_.value===a}"
                >${_.label}</button>
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
              ${Dn.map(_=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${_.value}"
                  aria-pressed="${_.value===u}"
                >${_.label}</button>
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
                ${o?`Último export: ${m(tt(o))}.`:"Nenhum export feito ainda."}
              </p>
            </div>
          </div>
          <div class="stack" style="flex-direction: row; flex-wrap: wrap; gap: var(--space-3);">
            <button class="btn btn--primary btn--sm" id="btn-export-profile" type="button">
              Exportar meu perfil (${m(t.perfil.nome)})
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
        <div class="settings-section__title">${S.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${ca} dias o item é
            removido de vez, sozinho.
          </p>
          ${l.length===0?'<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>':`<div>
                  ${l.map(_=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(_.nome)}</div>
                        <p class="settings-row__desc">${m(jn(_))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${m(_.id)}" data-tipo="${_.tipo}" type="button">${S.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${m(_.id)}" data-tipo="${_.tipo}" data-nome="${m(_.nome)}" type="button">Excluir de vez</button>
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
                value="${m(i)}"
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
            ${r?`<div class="banner banner--success" style="margin-bottom:0;">${S.check} Última sincronização: ${m(tt(r))}${d?".":""}</div>`:i?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
          </div>

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
            <input class="input" id="input-hora-lembrete" type="time" value="${m(n)}" />
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

  `,(v=e.querySelector("#btn-switch-profile"))==null||v.addEventListener("click",()=>{t.onSwitchProfile()}),(L=e.querySelector("#btn-como-usar"))==null||L.addEventListener("click",()=>M("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(_=>{_.addEventListener("click",()=>{const q=_.dataset.theme;io(q),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(T=>{T.setAttribute("aria-pressed",String(T===_))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(_=>{_.addEventListener("click",()=>{no(_.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(q=>{q.setAttribute("aria-pressed",String(q===_))})})}),(x=e.querySelector("#btn-export-profile"))==null||x.addEventListener("click",async()=>{const _=await gn(t.perfil.id);Gt(_),Mt(_.exportado_em),ee(e,t)}),(C=e.querySelector("#btn-export-all"))==null||C.addEventListener("click",async()=>{const _=await lt();Gt(_),Mt(_.exportado_em),ee(e,t)});const g=e.querySelector("#import-file");(N=e.querySelector("#btn-import"))==null||N.addEventListener("click",()=>{g==null||g.click()}),g==null||g.addEventListener("change",async()=>{const _=e.querySelector("#import-summary"),[q]=g.files??[];if(!(!q||!_))try{const T=await q.text(),F=Oa(T),Z=await Ha(F);_.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${Z.criados} criados, ${Z.atualizados} atualizados,
          ${Z.mantidos} mantidos como estavam.
        </div>
      `}catch(T){_.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${m(T instanceof Error?T.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{g.value=""}});const f=e.querySelector("#form-novo-perfil");(Q=e.querySelector("#btn-novo-perfil"))==null||Q.addEventListener("click",()=>{var _;f.style.display="block",(_=e.querySelector("#input-novo-perfil"))==null||_.focus()}),(B=e.querySelector("#btn-cancelar-perfil"))==null||B.addEventListener("click",()=>{f.style.display="none"}),(G=e.querySelector("#btn-salvar-perfil"))==null||G.addEventListener("click",async()=>{const q=e.querySelector("#input-novo-perfil").value.trim();q&&(await oa(q),ee(e,t))}),e.querySelectorAll("[data-renomear]").forEach(_=>{_.onclick=()=>{var $;const q=_.dataset.renomear,T=e.querySelector(`[data-perfil-id="${q}"]`),F=T==null?void 0:T.querySelector("[data-view-nome]");if(!T||!F)return;const Z=(($=F.textContent)==null?void 0:$.trim())??"";F.innerHTML=`
        <input class="input" type="text" value="${m(Z)}" maxlength="60" style="max-width:200px;" />
      `;const E=F.querySelector("input");E.focus(),E.select(),_.textContent="Salvar";const p=async()=>{const y=E.value.trim();y&&(await To(q,y),q===t.perfil.id&&(t.perfil={...t.perfil,nome:y})),ee(e,t)};E.addEventListener("keydown",y=>{y.key==="Enter"&&p()}),_.onclick=p}}),e.querySelectorAll("[data-excluir-perfil]").forEach(_=>{_.addEventListener("click",async()=>{const q=_.dataset.excluirPerfil,T=_.dataset.nome??"",F=await Mo(q);await oe({title:`Excluir o perfil "${T}"?`,message:`Isso vai apagar ${F.espacos} espaço(s), ${F.temas} tema(s) e ${F.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await Co(q),q===t.perfil.id?t.onSwitchProfile():ee(e,t))})}),(Y=e.querySelector("#btn-baixar-lembrete"))==null||Y.addEventListener("click",()=>{const _=e.querySelector("#input-hora-lembrete").value||"19:00";oo(t.perfil.id,_),xn($n(_))});const w=e.querySelector("#sync-status"),b=e.querySelector("#btn-sync-now");b==null||b.addEventListener("click",async()=>{const q=e.querySelector("#input-github-token").value.trim();if(!q){w&&(w.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Ct(q),b.disabled=!0,w&&(w.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Sincronizando…</div>`);try{const T=await Ba(q);if(w){const F=[T.criados>0?`${T.criados} novo(s)`:null,T.atualizados>0?`${T.atualizados} atualizado(s)`:null].filter(Boolean);w.innerHTML=`
          <div class="banner banner--success" role="status">
            ${S.check} Sincronizado!${F.length>0?` ${F.join(", ")} baixado(s).`:""}
            ${T.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}ee(e,t)}catch(T){b.disabled=!1,w&&(w.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${m(T instanceof Error?T.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(W=e.querySelector("#btn-limpar-token"))==null||W.addEventListener("click",async()=>{await oe({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Ct(""),Ze(""),Jt(""),ee(e,t))}),(J=e.querySelector("#sync-auto"))==null||J.addEventListener("change",_=>{so(_.target.checked)}),e.querySelectorAll("[data-restaurar]").forEach(_=>{_.addEventListener("click",async()=>{_.disabled=!0,await Po(_.dataset.tipo,_.dataset.restaurar),ee(e,t)})}),e.querySelectorAll("[data-expurgar]").forEach(_=>{_.addEventListener("click",async()=>{const q=_.dataset.nome??"";await oe({title:`Excluir "${q}" de vez?`,message:"O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia."})&&(_.disabled=!0,await Ee(_.dataset.tipo,_.dataset.expurgar),ee(e,t))})})}let Ue=null;async function Kt(){if(!(!("wakeLock"in navigator)||document.hidden))try{Ue=await navigator.wakeLock.request("screen"),Ue.addEventListener("release",()=>{Ue=null})}catch{}}function Pn(){Kt(),document.addEventListener("visibilitychange",()=>{document.hidden||Kt()})}const Va="v1.8",zn="Memoriza",Ua=`${zn} ${Va}`,xe=24;function dt(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Ge(e,t){const a=dt(t);return e.some(o=>dt(o).includes(a))}function Rn(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),n=t.toLowerCase();let i=s.indexOf(n);i===-1&&(i=0);const c=Math.max(0,i-a),r=Math.min(o.length,i+n.length+a);return(c>0?"…":"")+o.slice(c,r)+(r<o.length?"…":"")}async function Fn(e,t){const a=t.trim();if(!a)return[];const o=dt(a);if(!o)return[];const s=await k(),n=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(n.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),r=new Map(n.map(f=>[f.id,f])),u=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),l=[];for(const f of n)if(Ge([f.nome,f.categoria],o)&&(l.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),l.length>=xe))return l;const g=new Map(c.map(f=>[f.id,f]));for(const f of c)if(Ge([f.nome,f.categoria],o)){const w=r.get(f.espaco_id);if(l.push({kind:"tema",id:f.id,titulo:f.nome,meta:`Tema${w?` · ${w.nome}`:""}`}),l.length>=xe)return l}for(const f of u){if(!Ge([f.titulo,f.fonte,f.conteudo],o))continue;const w=g.get(f.tema_id),b=w&&r.get(w.espaco_id),v=[...b?[b.nome]:[],...w?[w.nome]:[]].join(" · ");if(l.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:v?`Nota · ${v}`:"Nota",snippet:f.conteudo?Rn(f.conteudo,o):void 0}),l.length>=xe)return l}return l.sort((f,w)=>{const b=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,v=`${w.titulo.toLowerCase()} ${w.meta.toLowerCase()}`;return No(b,v)}),l.slice(0,xe)}const On={espaco:"Espaço",tema:"Tema",nota:"Nota"};function Wt(e,t){const a=m(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const n=m(e.slice(0,s)),i=m(e.slice(s,s+o.length)),c=m(e.slice(s+o.length));return`${n}<mark>${i}</mark>${c}`}async function Ga(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],n=-1,i,c=!1;function r(){c||(c=!0,t.remove(),document.removeEventListener("keydown",g))}function d(w){s.length!==0&&(n=(n+w+s.length)%s.length,s.forEach((b,v)=>{const L=v===n;b.el.classList.toggle("is-active",L),b.el.setAttribute("aria-selected",String(L)),L&&b.el.scrollIntoView({block:"nearest"})}))}function u(w){const b=s.find(L=>L.el===w);if(!b)return;r();const v=b.resultado;v.kind==="espaco"?M(`espacos/${v.id}`):v.kind==="tema"?M(`temas/${v.id}`):M(`notas/${v.id}`)}function l(w){Fn(e,w).then(b=>{if(!c){if(n=-1,s=[],b.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${m(w.trim())}".</p>`;return}o.innerHTML="";for(const v of b){const L=document.createElement("button");L.type="button",L.className=`search-result search-result--${v.kind}`,L.setAttribute("role","option"),L.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${v.kind==="espaco"?S.folder:v.kind==="tema"?S.bookOpen:S.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${Wt(v.titulo,w)}</span>
            <span class="search-result__meta">${m(On[v.kind])} · ${m(v.meta)}</span>
            ${v.snippet?`<span class="search-result__snippet">${Wt(v.snippet,w)}</span>`:""}
          </span>
        `,L.addEventListener("click",()=>u(L)),o.appendChild(L),s.push({el:L,resultado:v})}}})}function g(w){w.key==="Escape"&&(w.preventDefault(),r())}a.addEventListener("input",()=>{i&&clearTimeout(i),i=setTimeout(()=>l(a.value),120)}),a.addEventListener("keydown",w=>{w.key==="ArrowDown"?(w.preventDefault(),d(1)):w.key==="ArrowUp"?(w.preventDefault(),d(-1)):w.key==="Enter"&&n>=0?(w.preventDefault(),u(s[n].el)):w.key==="Escape"&&(w.preventDefault(),r())}),t.addEventListener("mousedown",w=>{w.target===t&&r()}),document.addEventListener("keydown",g),a.focus(),l("")}const Ke=7,Hn=30,Bn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],Vn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function Un(e){Xo(()=>ut(e)),await ut(e),Wn(),Pn(),Gn(),Kn()}function Gn(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=Zt();t&&Ga(t)}})}async function Kn(){const e=mt();if(!(!e||!Yt())&&Cn(Hn))try{await Ba(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function Wn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function ut(e){var r,d,u;const t=Zt(),a=t?await qo(t):void 0;if(!a){We(null),e.innerHTML='<div id="profile-screen"></div>';const l=e.querySelector("#profile-screen");await Jo(l,async g=>{We(g.id),M("hoje"),await ut(e)});return}const o=Ko(),s=Wo(o),n=await Xn(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${Bn.map(l=>`
          <button
            class="app-nav__item"
            data-route="${l.route}"
            ${l.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${Qo[l.route]}</span>
            <span>${l.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${Vn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${S.search}</button>
            ${n?`<button class="app-header__backup-alert${n.urgente?" is-urgent":""}" id="btn-sync-alert" type="button" title="${m(n.mensagem)}" aria-label="${m(n.mensagem)}">${S.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${m(So(H()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${S.help}</button>
            <span class="app-header__profile" title="Memoriza ${Va}">${m(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${m(Ua)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(l=>{l.addEventListener("click",()=>{he()&&Zo(l.dataset.route)})}),(r=e.querySelector("#btn-ajuda"))==null||r.addEventListener("click",()=>{he()&&(location.hash==="#/ajuda"?history.back():M("ajuda"))}),(d=e.querySelector("#btn-busca"))==null||d.addEventListener("click",()=>{he()&&Ga(a.id)}),(u=e.querySelector("#btn-sync-alert"))==null||u.addEventListener("click",()=>{he()&&M("config")});const i=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",i.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await Zn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(l){console.error("Erro ao renderizar tela:",l),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function Zn(e,t,a){switch(t.name){case"hoje":await Ot(e,{perfilId:a.id});break;case"espacos":await Se(e,{perfilId:a.id});break;case"espaco":await Le(e,t.id);break;case"espaco-pdf":await Fs(e,t.id,t.categoria);break;case"painel":await an(e,{perfilId:a.id});break;case"favoritos":await sn(e,{perfilId:a.id});break;case"ajuda":dn(e);break;case"tema":await ke(e,t.id);break;case"nota-nova":await Me(e,{mode:"nova",temaId:t.temaId});break;case"nota":await Me(e,{mode:"editar",notaId:t.id});break;case"config":await ee(e,{perfil:a,onSwitchProfile:()=>{We(null),M("perfil")}});break;default:await Ot(e,{perfilId:a.id})}}async function Xn(e){if(!await Qn(e.id))return null;if(!mt())return{urgente:!1,mensagem:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};const a=pt();if(!a)return{urgente:!1,mensagem:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."};const o=H(),s=ye(H(new Date(a)),o);return s<=Ke?null:{urgente:s>Ke*2,mensagem:`Faz mais de ${Ke} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}}async function Qn(e){const t=await k();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${Ua}%c rodando`,"font-weight:bold;","");ea();Xa({immediate:!0});async function Jn(){Bs(),await Ao(),await da(),await zo(),await co();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await Un(e)}Jn();
