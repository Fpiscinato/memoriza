(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const Ra="modulepreload",Fa=function(e){return"/"+e},wt={},Oa=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(l=>{if(l=Fa(l),l in wt)return;wt[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const r=document.createElement("link");if(r.rel=u?"stylesheet":Ra,u||(r.as="script"),r.crossOrigin="",r.href=l,c&&r.setAttribute("nonce",c),document.head.appendChild(r),u)return new Promise((h,g)=>{r.addEventListener("load",h),r.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return s.then(i=>{for(const c of i||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};function Ha(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:n,onRegisterError:i}=e;let c,l;const u=async(r=!0)=>{await l};async function d(){if("serviceWorker"in navigator){if(c=await Oa(async()=>{const{Workbox:r}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:r}},[]).then(({Workbox:r})=>new r("/sw.js",{scope:"/",type:"classic"})).catch(r=>{i==null||i(r)}),!c)return;c.addEventListener("activated",r=>{(r.isUpdate||r.isExternal)&&window.location.reload()}),c.addEventListener("installed",r=>{r.isUpdate||o==null||o()}),c.register({immediate:t}).then(r=>{n?n("/sw.js",r):s==null||s(r)}).catch(r=>{i==null||i(r)})}}return l=d(),u}const P={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function Ot(){return localStorage.getItem(P.selectedProfileId)}function Fe(e){e?localStorage.setItem(P.selectedProfileId,e):localStorage.removeItem(P.selectedProfileId)}function Ht(){const e=localStorage.getItem(P.theme);return e==="light"||e==="dark"?e:"system"}function Ba(e){e==="system"?localStorage.removeItem(P.theme):localStorage.setItem(P.theme,e)}function Va(){return localStorage.getItem(P.lastExportAt)}function $t(e){localStorage.setItem(P.lastExportAt,e)}function Ua(){return localStorage.getItem(P.storagePersistRequested)==="1"}function Ga(){localStorage.setItem(P.storagePersistRequested,"1")}const Ka="19:00";function Wa(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??Ka}function Za(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function ot(){return localStorage.getItem(P.githubToken)??""}function Et(e){e.trim()?localStorage.setItem(P.githubToken,e.trim()):localStorage.removeItem(P.githubToken)}function Bt(){return localStorage.getItem(P.githubGistId)??""}function Oe(e){e?localStorage.setItem(P.githubGistId,e):localStorage.removeItem(P.githubGistId)}function st(){return localStorage.getItem(P.githubLastSyncAt)}function Vt(e){e?localStorage.setItem(P.githubLastSyncAt,e):localStorage.removeItem(P.githubLastSyncAt)}function Ut(){return localStorage.getItem(P.githubAutoSync)!=="0"}function Xa(e){e?localStorage.removeItem(P.githubAutoSync):localStorage.setItem(P.githubAutoSync,"0")}function nt(){return localStorage.getItem(P.notasOrdem)==="titulo"?"titulo":"data"}function Qa(e){e==="titulo"?localStorage.setItem(P.notasOrdem,"titulo"):localStorage.removeItem(P.notasOrdem)}function Gt(){const e=Ht();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function Ja(e){Ba(e),Gt()}function Ya(){return Ht()}async function eo(){var e;if(!Ua()&&(Ga(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const He=(e,t)=>t.some(a=>e instanceof a);let xt,St;function to(){return xt||(xt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ao(){return St||(St=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Be=new WeakMap,Te=new WeakMap,xe=new WeakMap;function oo(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{a(oe(e.result)),s()},i=()=>{o(e.error),s()};e.addEventListener("success",n),e.addEventListener("error",i)});return xe.set(t,e),t}function so(e){if(Be.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{a(),s()},i=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});Be.set(e,t)}let Ve={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return Be.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return oe(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Kt(e){Ve=e(Ve)}function no(e){return ao().includes(e)?function(...t){return e.apply(Ue(this),t),oe(this.request)}:function(...t){return oe(e.apply(Ue(this),t))}}function io(e){return typeof e=="function"?no(e):(e instanceof IDBTransaction&&so(e),He(e,to())?new Proxy(e,Ve):e)}function oe(e){if(e instanceof IDBRequest)return oo(e);if(Te.has(e))return Te.get(e);const t=io(e);return t!==e&&(Te.set(e,t),xe.set(t,e)),t}const Ue=e=>xe.get(e);function ro(e,t,{blocked:a,upgrade:o,blocking:s,terminated:n}={}){const i=indexedDB.open(e,t),c=oe(i);return o&&i.addEventListener("upgradeneeded",l=>{o(oe(i.result),l.oldVersion,l.newVersion,oe(i.transaction),l)}),a&&i.addEventListener("blocked",l=>a(l.oldVersion,l.newVersion,l)),c.then(l=>{n&&l.addEventListener("close",()=>n()),s&&l.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const co=["get","getKey","getAll","getAllKeys","count"],lo=["put","add","delete","clear"],Me=new Map;function kt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Me.get(t))return Me.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=lo.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||co.includes(a)))return;const n=async function(i,...c){const l=this.transaction(i,s?"readwrite":"readonly");let u=l.store;return o&&(u=u.index(c.shift())),(await Promise.all([u[a](...c),s&&l.done]))[0]};return Me.set(t,n),n}Kt(e=>({...e,get:(t,a,o)=>kt(t,a)||e.get(t,a,o),has:(t,a)=>!!kt(t,a)||e.has(t,a)}));const uo=["continue","continuePrimaryKey","advance"],Lt={},Ge=new WeakMap,Wt=new WeakMap,mo={get(e,t){if(!uo.includes(t))return e[t];let a=Lt[t];return a||(a=Lt[t]=function(...o){Ge.set(this,Wt.get(this)[t](...o))}),a}};async function*po(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,mo);for(Wt.set(a,t),xe.set(a,Ue(t));t;)yield a,t=await(Ge.get(a)||t.continue()),Ge.delete(a)}function At(e,t){return t===Symbol.asyncIterator&&He(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&He(e,[IDBIndex,IDBObjectStore])}Kt(e=>({...e,get(t,a,o){return At(t,a)?po:e.get(t,a,o)},has(t,a){return At(t,a)||e.has(t,a)}}));const vo="memoriza",fo=2;let Ce;function L(){return Ce||(Ce=ro(vo,fo,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}}})),Ce}function se(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const it="Europe/London",go=new Intl.DateTimeFormat("en-CA",{timeZone:it,year:"numeric",month:"2-digit",day:"2-digit"});function O(e=new Date){return go.format(e)}function J(){return O(new Date)}function ve(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function F(){return new Date().toISOString()}function ee(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function bo(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:it,weekday:"short",day:"2-digit",month:"2-digit"})}function qt(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function ho(e){const t=new Date(e),a=O(t),o=t.toLocaleTimeString("pt-BR",{timeZone:it,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function rt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function K(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const yo="00000000-0000-4000-8000-000000000001";async function ct(){return(await(await L()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function _o(){return ct()}async function wo(e){return(await L()).get("perfis",e)}async function Zt(e){const t=await L(),a=await t.getAll("perfis"),o=F(),n={id:a.length===0?yo:se(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",n),n}async function $o(e,t){const a=await L(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=F(),await a.put("perfis",o))}async function Eo(e){const t=await L(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const n of a){const i=await t.getAllFromIndex("temas","espaco_id",n.id);o+=i.length;for(const c of i)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function xo(e){const t=await L(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id)))).flat(),i=(await Promise.all(s.map(d=>t.getAllFromIndex("notas","tema_id",d.id)))).flat(),l=(await Promise.all(i.map(d=>t.getAllFromIndex("itens_revisao","nota_id",d.id)))).flat(),u=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await u.objectStore("perfis").delete(e);for(const d of a)await u.objectStore("espacos").delete(d.id);for(const d of s)await u.objectStore("temas").delete(d.id);for(const d of i)await u.objectStore("notas").delete(d.id);for(const d of l)await u.objectStore("itens_revisao").delete(d.id);await u.done}const Xt=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),So=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function ko(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function Ke(e){return So.get(ko(e))??null}function Qt(e){return e.length>0&&e.every(t=>Ke(t)!==null)}function Jt(e,t,a){if(a){const o=Ke(e),s=Ke(t);if(o!==s)return o-s}return Xt.compare(e,t)}function Yt(e){const t=Qt(e);return[...e].sort((a,o)=>Jt(a,o,t))}function Lo(e,t){return Xt.compare(e,t)}function ne(e,t){const a=Qt(e.map(t));return[...e].sort((o,s)=>Jt(t(o),t(s),a))}async function ea(e){const a=await(await L()).getAllFromIndex("notas","tema_id",e);return nt()==="titulo"?ne(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function Tt(e){return(await L()).get("notas",e)}async function Ao(e){const t=await L(),a=await t.getAllFromIndex("temas","espaco_id",e);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).map(i=>({nota:i,tema:s}))))).flat()}async function qo(e,t){const a=await L(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const n=F(),i={id:se(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:n,atualizado_em:n},c={id:se(),nota_id:i.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:K(J(),1),status:"pendente",streak_facil:0,criado_em:n,atualizado_em:n},l=a.transaction(["notas","itens_revisao"],"readwrite");return await l.objectStore("notas").put(i),await l.objectStore("itens_revisao").put(c),await l.done,i}async function To(e,t){const a=await L(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=F(),await a.put("notas",o))}async function Mo(e){const t=await L(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=F(),await t.put("notas",a),a.favorito):!1}async function Co(e){const t=await L(),a=await t.getAllFromIndex("itens_revisao","nota_id",e),o=t.transaction(["notas","itens_revisao"],"readwrite");await o.objectStore("notas").delete(e);for(const s of a)await o.objectStore("itens_revisao").delete(s.id);await o.done}async function ta(){var n;const e=await L(),a=(await e.getAll("notas")).filter(i=>!("titulo"in i)||!i.titulo);if(a.length===0)return 0;const o=F(),s=e.transaction("notas","readwrite");for(const i of a)await s.store.put({...i,titulo:((n=i.fonte)==null?void 0:n.trim())||"Sem título",titulo_revisado:!1,favorito:i.favorito??!1,atualizado_em:o});return await s.done,a.length}function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function de(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const aa="_sem-categoria_";function Io(e){return e.trim()===""?aa:encodeURIComponent(e)}function Do(e){return e===aa?"":decodeURIComponent(e)}function No(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function Po(){const e=No();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:Do(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function jo(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function T(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function zo(e){T(e)}function Ro(e){window.addEventListener("hashchange",e)}function ce(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function D(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Fo={hoje:ce('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:ce('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:ce('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:ce('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:ce('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:ce('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},x={backup:D('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:D('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:D('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:D('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:D('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:D('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:D('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:D('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:D('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:D('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:D('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:D('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:D('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:D('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:D('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:D('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:D('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:D('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:D('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:D('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:D('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:D('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:D('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:D('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:D('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:D('<path d="M20 6L9 17l-5-5"/>'),chart:D('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:D('<path d="M4 6h16M4 12h11M4 18h6"/>')};async function Oo(e,t){var c,l,u;const a=await ct(),o=a.length===0;e.innerHTML=`
    <div class="profile-picker">
      <div>
        <div class="profile-picker__title">Quem é você?</div>
        <p class="profile-picker__subtitle">
          ${o?"Primeiro uso neste aparelho — crie seu perfil pra começar. Cada pessoa que usar o app aqui cria o próprio depois.":"Escolha seu perfil para ver suas próprias revisões."}
        </p>
      </div>
      ${a.length>0?`
        <div class="profile-grid" role="list">
          ${a.map(d=>`
            <button class="profile-card" role="listitem" data-id="${p(d.id)}">
              <span class="profile-avatar" aria-hidden="true">${p(Ho(d.nome))}</span>
              <span class="profile-card__name">${p(d.nome)}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(d=>{d.addEventListener("click",()=>{const r=d.dataset.id,h=a.find(g=>g.id===r);h&&t(h)})});const s=e.querySelector("#form-novo-perfil-picker"),n=e.querySelector("#input-novo-perfil-picker");o&&n.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",n.focus()}),(l=e.querySelector("#btn-cancelar-perfil-picker"))==null||l.addEventListener("click",()=>{s.style.display="none"});const i=async()=>{const d=n.value.trim();if(!d)return;const r=await Zt(d);t(r)};(u=e.querySelector("#btn-salvar-perfil-picker"))==null||u.addEventListener("click",i),n.addEventListener("keydown",d=>{d.key==="Enter"&&i()})}function Ho(e){return e.trim().slice(0,1).toUpperCase()}const le=["1","7","30","180"],Ie={1:1,7:7,30:30,180:180};function Bo(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=le.indexOf(e);if(t==="dificil"){const u=le[Math.max(0,s-1)];return{estagio:u,streak_facil:0,data_agendada:K(o,Ie[u]),aposentado:!1}}if(t==="medio"){const u=le[Math.min(le.length-1,s+1)];return{estagio:u,streak_facil:0,data_agendada:K(o,Ie[u]),aposentado:!1}}const n=a+1,i=s+2,c=i<=le.length-1?le[i]:"consulta",l=n>=2?"consulta":c;return l==="consulta"?{estagio:"consulta",streak_facil:n,aposentado:!0}:{estagio:l,streak_facil:n,data_agendada:K(o,Ie[l]),aposentado:!1}}async function oa(e){const t=await L(),a=J(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(b=>b.data_agendada<=a),n=Array.from(new Set(s.map(b=>b.nota_id))),i=await Promise.all(n.map(b=>t.get("notas",b))),c=new Map(i.filter(b=>!!b).map(b=>[b.id,b])),l=Array.from(new Set(Array.from(c.values()).map(b=>b.tema_id))),u=await Promise.all(l.map(b=>t.get("temas",b))),d=new Map(u.filter(b=>!!b).map(b=>[b.id,b])),r=Array.from(new Set(Array.from(d.values()).map(b=>b.espaco_id))),h=await Promise.all(r.map(b=>t.get("espacos",b))),g=new Map(h.filter(b=>!!b).map(b=>[b.id,b])),y=[];for(const b of s){const f=c.get(b.nota_id),S=f&&d.get(f.tema_id),w=S&&g.get(S.espaco_id);!f||!S||!w||y.push({item:b,nota:f,tema:S,espaco:w})}return y.sort((b,f)=>b.tema.criado_em.localeCompare(f.tema.criado_em)||b.nota.criado_em.localeCompare(f.nota.criado_em)),y}async function Vo(e,t,a){const o=await L(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const n=J(),i=Bo(s.estagio,t,s.streak_facil,n),c=F(),l={...s,status:"feita",avaliacao:t,data_concluida:n,duracao_segundos:a,atualizado_em:c},u={id:se(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:i.estagio,data_agendada:i.aposentado?n:i.data_agendada,status:i.aposentado?"feita":"pendente",streak_facil:i.streak_facil,criado_em:c,atualizado_em:c},d=o.transaction("itens_revisao","readwrite");return await d.store.put(l),await d.store.put(u),await d.done,i}async function Uo(e){const t=await L(),a=J();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function Go(e){const t=await L(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(i=>i.status==="pendente");if(a.length===0)return;const o=J(),s=F(),n=t.transaction("itens_revisao","readwrite");for(const i of a)await n.store.put({...i,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await n.done}const Se=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],Mt={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},Ko=new RegExp(`\\[([^\\]]+)\\]\\{(${Se.join("|")})\\}`,"g");function We(e){let t=p(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(Ko,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Wo(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,n=s[s.length-1];a.push({level:o.level,nodes:n?n.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function sa(e){return`<ul>${e.map(t=>`<li>${We(t.text)}${t.children.length>0?sa(t.children):""}</li>`).join("")}</ul>`}function ke(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(sa(Wo(o))),o=[])}let n=[];function i(){n.length>0&&(a.push(`<p>${We(n.join(`
`)).replace(/\n/g,"<br>")}</p>`),n=[])}for(const c of t){const l=c.trim();if(l===""){i(),s();continue}const u=/^(#{1,3})\s+(.*)$/.exec(l);if(u){i(),s();const r=u[1].length;a.push(`<h${r}>${We(u[2])}</h${r}>`);continue}const d=/^[-*]\s+(.*)$/.exec(l);if(d){i();const r=c.length-c.trimStart().length;o.push({level:Math.floor(r/2),text:d[1]});continue}s(),n.push(l)}return i(),s(),a.join(`
`)}function lt(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(lt).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Se.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function Ze(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...Ze(s,t+1));continue}if(s.tagName!=="LI")continue;const n=s,i=Array.from(n.children).filter(u=>u.tagName==="UL"),c=n.cloneNode(!0);c.querySelectorAll("ul").forEach(u=>u.remove());const l=lt(c).trim();l&&a.push(`${"  ".repeat(t)}- ${l}`);for(const u of i)a.push(...Ze(u,t+1));o=n}return a}function Ct(e){if(e.tagName==="UL")return Ze(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=lt(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function Zo(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=Ct(o);s.length>0&&t.push(s.join(`
`))}else t.push(...Ct(o))}return t.filter(Boolean).join(`

`)}const Xo=30;function na(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=K(J(),Xo);return e.validade_ate<=t}const ie=8;function Qo(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function dt(e){return Qo(e)%ie}function R(e){return`var(--accent-${dt(e)})`}function ia(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function ut(e){return e?e.toLowerCase():"\0sem-categoria"}function ra(e){return Jo(e.map(ut))}function Jo(e){const t=new Set,a=new Map;for(const o of e){let s=dt(o);for(let n=0;n<ie&&t.has(s);n++)s=(s+1)%ie;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function ca(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=dt(o.id);for(let n=0;n<ie&&t.has(s);n++)s=(s+1)%ie;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const Yo=5*60;let H=null;function la(){H&&(document.hidden?H.retomadoEm!=null&&(H.acumuladoMs+=Date.now()-H.retomadoEm,H.retomadoEm=null):H.retomadoEm==null&&(H.retomadoEm=Date.now()))}function es(e){H&&H.itemId===e||(_e(),H={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",la))}function ts(){if(!H)return;let e=H.acumuladoMs;return H.retomadoEm!=null&&(e+=Date.now()-H.retomadoEm),Math.min(Yo,Math.round(e/1e3))}function _e(){H&&document.removeEventListener("visibilitychange",la),H=null}function da(e){const t=J();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${ve(e.data_agendada,t)} dia(s)">${x.alert} atrasada</span>`}async function It(e,t){const a=await oa(t.perfilId);await we(e,t,a)}async function we(e,t,a){var u;_e(),window.scrollTo({top:0});const o=await Uo(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(u=e.querySelector("#btn-empty-espacos"))==null||u.addEventListener("click",()=>T("espacos"));return}const i=new Set(a.map(d=>d.espaco.id)).size>1,c=new Map;for(const d of a){const r=c.get(d.tema.id)??[];r.push(d),c.set(d.tema.id,r)}const l=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=l+Array.from(c.values()).map(d=>{const r=d[0].tema,h=d[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${R(r.id)}">
            <span class="color-dot" style="--dot-color:${R(r.id)}"></span>
            ${p(r.nome)}
            ${i?`<span class="queue-group__espaco"> · ${p(h.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${d.map(g=>`
              <button class="item-row" data-id="${p(g.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${R(g.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${g.nota.favorito?`${x.star} `:""}${p(g.nota.titulo||"(sem título)")}</span>
                </span>
                ${da(g.item)}
                ${na(g.nota)?`<span class="badge badge--muted">${x.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(d=>{d.addEventListener("click",()=>{const r=a.find(h=>h.item.id===d.dataset.id);r&&ua(e,t,r,a,o)})})}function ua(e,t,a,o,s=0,n=!1){var u,d,r;es(a.item.id),n||window.scrollTo({top:0});const i=na(a.nota),c=s+o.length,l=c>0?Math.round(s/c*100):0;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" data-voltar type="button">← Voltar à fila</button>
      <button class="link" data-editar type="button" style="margin-left:auto;">${x.pen} Editar nota</button>
    </div>

    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-progress" title="${s} de ${c} revisadas hoje">
        <div class="review-progress__track"><div class="review-progress__fill" style="width:${l}%"></div></div>
        <span class="review-progress__label">${s} de ${c} revisadas hoje</span>
      </div>
      <div class="review-card__meta">
        ${p(a.tema.nome)}${n&&a.nota.fonte?` · ${p(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${x.star} `:""}${p(a.nota.titulo||"(sem título)")}
        ${da(a.item)}
      </div>

      ${i?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${n?`
        <div class="review-card__content markdown-preview">${ke(a.nota.conteudo)}</div>
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
  `,(u=e.querySelector("[data-voltar]"))==null||u.addEventListener("click",()=>void we(e,t,o)),(d=e.querySelector("[data-editar]"))==null||d.addEventListener("click",()=>{_e(),T(`notas/${a.nota.id}`)}),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{ua(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(h=>{h.addEventListener("click",async()=>{const g=h.dataset.avaliacao,y=ts();_e();const b=await Vo(a.item.id,g,y),f=await oa(t.perfilId);b.aposentado?as(e,t,f):await we(e,t,f)})})}function as(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${x.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void we(e,t,a))}function ma(e){return e.trim().toLowerCase()}function mt(e){const t=new Map;for(const n of e){const i=n.categoria.trim(),c=ma(i),l=t.get(c);l?l.itens.push(n):t.set(c,{display:i,itens:[n]})}const a=Array.from(t.values()).map(n=>({categoria:n.display,itens:n.itens})),o=a.map(n=>n.categoria),s=new Map;Yt(o.filter(n=>n!=="")).forEach((n,i)=>s.set(n,i)),a.sort((n,i)=>n.categoria===""&&i.categoria!==""?1:i.categoria===""&&n.categoria!==""?-1:(s.get(n.categoria)??0)-(s.get(i.categoria)??0));for(const n of a)n.itens.length>1&&(n.itens=ne(n.itens,i=>i.nome));return a}function pt(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=ma(o);t.has(s)||t.set(s,o)}return Yt(Array.from(t.values()))}async function pa(e){const a=await(await L()).getAllFromIndex("espacos","perfil_id",e);return ne(a,o=>o.nome)}const os=["Cursos","Livros","Bíblia"];async function va(e){const t=await pa(e);return pt([...os,...t.map(a=>a.categoria)])}async function vt(e){return(await L()).get("espacos",e)}function fa(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function ss(e,t,a,o={}){const s=await L(),n=F(),i={id:se(),perfil_id:e,nome:t,categoria:a,criado_em:n,atualizado_em:n,arquivado:!1};return fa(i,o),await s.put("espacos",i),i}async function ns(e,t,a,o={}){const s=await L(),n=await s.get("espacos",e);n&&(n.nome=t,n.categoria=a,fa(n,o),n.atualizado_em=F(),await s.put("espacos",n))}async function Xe(e,t){const a=await L(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?F():void 0,o.atualizado_em=F(),await a.put("espacos",o))}async function ga(e){const t=await L(),a=await t.getAllFromIndex("temas","espaco_id",e);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).length;return{temas:a.length,notas:o}}async function ba(e){const t=await L(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(l=>t.getAllFromIndex("notas","tema_id",l.id)))).flat(),i=(await Promise.all(s.map(l=>t.getAllFromIndex("itens_revisao","nota_id",l.id)))).flat(),c=t.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");await c.objectStore("espacos").delete(e);for(const l of a)await c.objectStore("temas").delete(l.id);for(const l of s)await c.objectStore("notas").delete(l.id);for(const l of i)await c.objectStore("itens_revisao").delete(l.id);await c.done}function re(e){return new Promise(t=>{var n,i;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${p(e.title)}</div>
        <p class="modal__message">${p(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${p(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${p(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(n=a.querySelector("#modal-confirm"))==null||n.addEventListener("click",()=>s(!0)),(i=a.querySelector("#modal-cancel"))==null||i.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function $e(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${p(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${p(a)}">${p(a)}</button>`).join("")}
    </div>
  `}function ft(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,de(o),o.focus()})})})}function C(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const ha="livro",ya=[{chave:"pasta",label:"Categoria",svg:C('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:C('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:C('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:C('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:C('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:C('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:C('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:C('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:C('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:C('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:C('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:C('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:C('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:C('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:C('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:C('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:C('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:C('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:C('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:C('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:C('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:C('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:C('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:C('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:C('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:C('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:C('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:C('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:C('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],Qe=new Map(ya.map(e=>[e.chave,e]));function te(e){return e&&Qe.get(e)||Qe.get(ha)}const is=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function rs(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function gt(e){var a;const t=rs(e);if(t.trim())return(a=is.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function me(e){return e.icone&&Qe.has(e.icone)?e.icone:gt(`${e.nome??""} ${e.categoria??""}`)??ha}const cs="pasta";function _a(e){return gt(e)??cs}const Dt=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function wa(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${ae(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${ya.map(s=>`
          <button
            type="button"
            class="espaco-icon-btn${s.chave===a?" is-selected":""}"
            data-icone="${ae(s.chave)}"
            title="${ae(s.label)}"
            aria-label="${ae(s.label)}"
            aria-pressed="${s.chave===a}"
          >${s.svg}</button>
        `).join("")}
      </div>
      <input type="hidden" id="${ae(t)}-icone" value="${ae(a??"")}" />

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
        ${Array.from({length:ie},(s,n)=>`
          <button
            type="button"
            class="color-swatch${o===n?" is-selected":""}"
            data-cor="${n}"
            style="--swatch: var(--accent-${n});"
            title="${Dt[n]??`Cor ${n}`}"
            aria-label="${Dt[n]??`Cor ${n}`}"
            aria-pressed="${o===n}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${ae(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function $a(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${ue(a)}"]`);if(!s)return;const n=s.querySelector(`#${ue(a)}-icone`),i=s.querySelector(`#${ue(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),l=r=>{n&&(n.value=r);for(const h of c){const g=h.dataset.icone===r;h.classList.toggle("is-selected",g),h.setAttribute("aria-pressed",String(g))}};let u=!1;for(const r of c)r.addEventListener("click",()=>{u=!0,l(r.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(r=>{r.addEventListener("click",()=>{i&&(i.value=r.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(h=>{const g=h===r;h.classList.toggle("is-selected",g),h.setAttribute("aria-pressed",String(g))})})});const d=()=>{if(u)return;const r=gt(o());for(const h of c)h.classList.toggle("is-suggested",!!r&&h.dataset.icone===r);r&&l(r)};d(),e.querySelectorAll('input[type="text"]').forEach(r=>{r.addEventListener("input",d)})}function Ea(e,t){var i,c;const a=e.querySelector(`[data-espaco-visual="${ue(t)}"]`),o=(i=a==null?void 0:a.querySelector(`#${ue(t)}-icone`))==null?void 0:i.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${ue(t)}-cor`))==null?void 0:c.value.trim(),n={};if(o&&(n.icone=o),s!==void 0&&s!==""){const l=Number(s);Number.isInteger(l)&&l>=0&&l<ie&&(n.cor=l)}return n}function ae(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function ue(e){return e.replace(/["\\]/g,"\\$&")}async function be(e,t){var h,g,y,b;const a=await pa(t.perfilId),o=a.filter(f=>!f.arquivado),s=a.filter(f=>f.arquivado),n=await ds(a.map(f=>f.id)),i=mt(o),c=ca(o),l=ra(i.map(f=>f.categoria)),u=await va(t.perfilId);e.innerHTML=`
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
        ${$e(u,"input-categoria-espaco")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${wa({prefix:"novo-espaco"})}
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
    `:i.map(f=>{const S=f.itens.length===1?f.itens[0]:null,w=S?c.get(S.id)??R(S.id):l.get(ut(f.categoria))??R(f.categoria),M=te(S?me(S):_a(f.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${w}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${w}" aria-hidden="true">${M.svg}</span>
            ${p(f.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${f.itens.map(I=>ls(I,n.get(I.id)??0,c.get(I.id)??R(I.id))).join("")}
        </div>
      </details>
    `}).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(f=>`
            <div class="item-row" data-id="${p(f.id)}">
              <button class="item-row__main" data-open="${p(f.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${R(f.id)}" aria-hidden="true">${te(me(f)).svg}</span>
                  <span class="item-row__title">${p(f.nome)}</span>
                </span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${p(f.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,ft(e),$a(e,{prefix:"novo-espaco",getTexto:()=>{var f,S;return`${((f=e.querySelector("#input-nome-espaco"))==null?void 0:f.value)??""} ${((S=e.querySelector("#input-categoria-espaco"))==null?void 0:S.value)??""}`}});const d=e.querySelector("#form-novo-espaco"),r=()=>{var f;d.style.display="block",(f=e.querySelector("#input-nome-espaco"))==null||f.focus()};(h=e.querySelector("#btn-novo-espaco"))==null||h.addEventListener("click",r),(g=e.querySelector("#btn-empty-novo-espaco"))==null||g.addEventListener("click",r),(y=e.querySelector("#btn-cancelar-espaco"))==null||y.addEventListener("click",()=>{d.style.display="none"}),(b=e.querySelector("#btn-salvar-espaco"))==null||b.addEventListener("click",async()=>{const f=e.querySelector("#input-nome-espaco"),S=e.querySelector("#input-categoria-espaco"),w=f.value.trim();if(!w)return;const M=await ss(t.perfilId,w,S.value.trim(),Ea(e,"novo-espaco"));T(`espacos/${M.id}`)}),e.querySelectorAll("[data-open]").forEach(f=>{f.addEventListener("click",()=>T(`espacos/${f.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(f=>{f.addEventListener("click",async()=>{await Xe(f.dataset.archive,!0),be(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(f=>{f.addEventListener("click",async()=>{await Xe(f.dataset.unarchive,!1),be(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(f=>{f.addEventListener("click",async()=>{const S=f.dataset.excluir,w=f.dataset.nome??"",M=await ga(S);await re({title:`Excluir "${w}"?`,message:`Isso vai apagar ${M.temas} tema(s) e ${M.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await ba(S),be(e,t))})})}function ls(e,t,a){const o=te(me(e));return`
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
  `}async function ds(e){const t=await L(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function xa(e){const a=await(await L()).getAllFromIndex("temas","espaco_id",e);return ne(a,o=>o.nome)}async function Sa(e){return(await L()).get("temas",e)}async function us(e,t,a){const o=await L(),s=F(),n={id:se(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",n),n}async function ms(e,t,a){const o=await L(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=F(),await o.put("temas",s))}async function ps(e){const t=await L(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=F(),await t.put("temas",a),a.favorito):!1}async function vs(e){return{notas:(await(await L()).getAllFromIndex("notas","tema_id",e)).length}}async function fs(e){const t=await L(),a=await t.getAllFromIndex("notas","tema_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat(),n=t.transaction(["temas","notas","itens_revisao"],"readwrite");await n.objectStore("temas").delete(e);for(const i of a)await n.objectStore("notas").delete(i.id);for(const i of s)await n.objectStore("itens_revisao").delete(i.id);await n.done}function gs(e,t){let a=e.has(t)?t:K(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=K(a,-1);return o}function bs(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const hs=5;async function ys(e){const t=await L(),a=J(),o=K(a,-6),[s,n]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))]),i=s.filter(m=>m.avaliacao),c=i.filter(m=>m.data_concluida===a),l=c.length,u=c.reduce((m,k)=>m+(k.duracao_segundos??0),0),d=i.filter(m=>m.data_concluida&&m.data_concluida>=o&&m.data_concluida<=a).length,r=["1","7","30","180"].map(m=>({estagio:m,count:n.filter(k=>k.estagio===m).length})),h=[];for(let m=1;m<=7;m++){const k=K(a,m);h.push({data:k,count:n.filter(N=>N.data_agendada===k).length})}const g=K(a,-29),y=i.filter(m=>m.data_concluida>=g),b={facil:y.filter(m=>m.avaliacao==="facil").length,medio:y.filter(m=>m.avaliacao==="medio").length,dificil:y.filter(m=>m.avaliacao==="dificil").length,total:0};b.total=b.facil+b.medio+b.dificil;const f=new Set(i.map(m=>m.data_concluida)),S=gs(f,a),w=[];for(let m=6;m>=0;m--)w.push(f.has(K(a,-m)));const M=i.filter(m=>m.estagio==="consulta").length,I=i.filter(m=>m.avaliacao==="dificil"),X=Array.from(new Set(I.map(m=>m.nota_id))),B=await Promise.all(X.map(m=>t.get("notas",m))),Q=new Map(B.filter(m=>!!m).map(m=>[m.id,m.tema_id])),W=new Map;for(const m of I){const k=Q.get(m.nota_id);k&&W.set(k,(W.get(k)??0)+1)}const V=Array.from(W.keys()),q=(await Promise.all(V.map(m=>t.get("temas",m)))).filter(m=>!!m).map(m=>({temaId:m.id,temaNome:m.nome,count:W.get(m.id)})).sort((m,k)=>k.count-m.count).slice(0,hs),A=await t.getAllFromIndex("espacos","perfil_id",e),z=A.filter(m=>!m.arquivado).length,G=(await Promise.all(A.map(m=>t.getAllFromIndex("temas","espaco_id",m.id)))).flat(),E=G.length,_=(await Promise.all(G.map(m=>t.getAllFromIndex("notas","tema_id",m.id)))).reduce((m,k)=>m+k.length,0);return{revisoesHoje:l,revisoesUltimos7Dias:d,streakDias:S,diasAtivosUltimos7:w,rankingDificeis:q,espacosAtivos:z,totalTemas:E,totalNotas:_,itensEmConsulta:M,porEstagio:r,tempoHojeSegundos:u,cargaProximos7:h,retencao30:b}}async function _s(e){const t=await L(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("notas","tema_id",i.id)))).flat();return(await Promise.all(s.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat().reduce((i,c)=>i+(c.duracao_segundos??0),0)}async function ws(e){const t=await L(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,n)=>s+(n.duracao_segundos??0),0)}function ka(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${p(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${p(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=n=>{n.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()})}const Nt=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}];function $s(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function La(e,t,a,o){var s;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra testar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o);return}Es(e,t,a,o)}function Es(e,t,a,o){var s;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Voltar</button>
    </div>
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <h2 style="margin:0;">Avaliação aleatória — ${p(a)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse rápido com notas aleatórias, sem afetar sua fila de revisão. ${t.length} nota(s) no total — escolha quantas:
        </p>
        <div class="stack">
          ${Nt.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const i=Nt.find(l=>l.key===n.dataset.tier),c=$s(t).slice(0,Math.min(i.n,t.length));Je(e,c,0,a,o)})})}function Je(e,t,a,o,s,n=!1){var c,l,u;if(a>=t.length){xs(e,t.length,o,s);return}const i=t[a];e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Encerrar avaliação</button>
    </div>
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${p(i.tema.nome)} · ${a+1} de ${t.length}</div>
      <div class="review-card__titulo">${i.nota.favorito?`${x.star} `:""}${p(i.nota.titulo||"(sem título)")}</div>
      ${n?`
        <div class="review-card__content markdown-preview">${ke(i.nota.conteudo)}</div>
        <button class="btn btn--primary" id="btn-proxima" type="button">${a+1<t.length?"Próxima":"Terminar"}</button>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(l=e.querySelector("#btn-revelar"))==null||l.addEventListener("click",()=>{Je(e,t,a,o,s,!0)}),(u=e.querySelector("#btn-proxima"))==null||u.addEventListener("click",()=>{Je(e,t,a+1,o,s,!1)})}function xs(e,t,a,o){var s;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${x.confete}</div>
      <h2 style="margin:0;">Repasse concluído</h2>
      <p class="text-muted" style="margin:0;">
        Você passou por ${t} nota(s) de ${p(a)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `,(s=e.querySelector("#btn-terminar"))==null||s.addEventListener("click",o)}function bt(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${te(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${R(t.colorKey)}"></span>`:""}${p(t.label)}`,n=a===e.length-1,i=t.route&&!n?`<button class="link" data-crumb="${p(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?i:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${i}`}).join("")}
    </div>
  `}function ht(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>T(t.dataset.crumb))})}async function he(e,t){var M,I,X,B,Q,W,V,$,q,A,z,U,G;const a=await vt(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await xa(t),s=await Ss(o.map(E=>E.id)),n=mt(o),i=await va(a.perfil_id),c=pt(o.map(E=>E.categoria)),l=[...o].sort((E,v)=>v.criado_em.localeCompare(E.criado_em))[0],u=((M=l==null?void 0:l.categoria)==null?void 0:M.trim())||void 0,d=((I=l==null?void 0:l.nome)==null?void 0:I.trim())||void 0,r=ia(a.cor,R(a.id)),h=te(me(a)),g=ra(n.map(E=>E.categoria));e.innerHTML=`
    ${bt([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:h.chave,iconColor:r}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${r}" aria-hidden="true">${h.svg}</span>${p(a.nome)}
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
        <input class="input" id="input-nome-espaco-editar" type="text" value="${p(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${p(a.categoria)}" maxlength="80" />
        ${$e(i,"input-categoria-espaco-editar")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${wa({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
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
        <input class="input${d?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${p(d??"")}" />
        ${d?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema">Categoria (opcional)</label>
        <input class="input${u?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${p(u??"")}" />
        ${u?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${$e(c,"input-categoria-tema")}
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
    `:n.map(E=>{const v=g.get(ut(E.categoria))??R(E.categoria||"sem-categoria"),_=te(_a(E.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${v}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${v}" aria-hidden="true">${_.svg}</span>
            ${p(E.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${p(E.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${p(Io(E.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${E.itens.map(m=>`
            <button class="item-row" data-open="${p(m.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${v}">
              <span class="item-row__main">
                <span class="item-row__title">${m.favorito?`${x.star} `:""}${p(m.nome)}</span>
                <span class="item-row__meta">${s.get(m.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,ht(e),ft(e),$a(e,{prefix:"editar-espaco",getTexto:()=>{var E,v;return`${((E=e.querySelector("#input-nome-espaco-editar"))==null?void 0:E.value)??""} ${((v=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:v.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(E=>{E.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),T(`espacos/${t}/pdf/${E.dataset.pdfCategoria}`)})}),(X=e.querySelector("#btn-arquivar"))==null||X.addEventListener("click",async()=>{!a.arquivado&&!await re({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await Xe(a.id,!a.arquivado),he(e,t))});const y=e.querySelector("#form-editar-espaco");(B=e.querySelector("#btn-editar"))==null||B.addEventListener("click",()=>{var E;y.style.display="block",(E=e.querySelector("#input-nome-espaco-editar"))==null||E.focus()}),(Q=e.querySelector("#btn-cancelar-edicao"))==null||Q.addEventListener("click",()=>{y.style.display="none"}),(W=e.querySelector("#btn-salvar-edicao"))==null||W.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-espaco-editar").value.trim(),v=e.querySelector("#input-categoria-espaco-editar").value.trim();E&&(await ns(a.id,E,v,Ea(e,"editar-espaco")),he(e,t))}),(V=e.querySelector("#btn-detalhes"))==null||V.addEventListener("click",async()=>{const E=Array.from(s.values()).reduce((j,Z)=>j+Z,0),v=O(),_=await _s(a.id);let m,k,N;if(a.arquivado&&a.arquivado_em){const j=ve(O(new Date(a.criado_em)),O(new Date(a.arquivado_em)));m=String(j),k="Dias até arquivar",N=`Criado em ${ee(a.criado_em)} · arquivado em ${ee(a.arquivado_em)}`}else if(a.arquivado)m="—",k="Duração",N=`Criado em ${ee(a.criado_em)} · arquivado antes desse registro de data existir`;else{const j=ve(O(new Date(a.criado_em)),v);m=String(j),k=j===1?"Dia ativo":"Dias ativo",N=`Criado em ${ee(a.criado_em)}`}ka({title:a.nome,bodyHtml:`
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
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${rt(_)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${m}</div>
            <div class="stat-tile__label">${k}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${N} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),($=e.querySelector("#btn-avaliar"))==null||$.addEventListener("click",async()=>{const E=await Ao(a.id);La(e,E,a.nome,()=>he(e,t))}),(q=e.querySelector("#btn-excluir"))==null||q.addEventListener("click",async()=>{const E=await ga(a.id);await re({title:`Excluir "${a.nome}"?`,message:`Isso vai apagar ${E.temas} tema(s) e ${E.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await ba(a.id),T("espacos"))});const b=e.querySelector("#form-novo-tema"),f=()=>{var E;b&&(b.style.display="block"),(E=e.querySelector("#input-nome-tema"))==null||E.focus()};(A=e.querySelector("#btn-novo-tema"))==null||A.addEventListener("click",f),(z=e.querySelector("#btn-empty-novo-tema"))==null||z.addEventListener("click",f),(U=e.querySelector("#btn-cancelar-tema"))==null||U.addEventListener("click",()=>{b&&(b.style.display="none")});const S=e.querySelector("#input-nome-tema");d&&S&&S.addEventListener("input",()=>de(S),{once:!0});const w=e.querySelector("#input-categoria-tema");u&&w&&w.addEventListener("input",()=>de(w),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(E=>{E.addEventListener("click",v=>{var _;v.preventDefault(),v.stopPropagation(),b&&(b.style.display="block"),w&&(w.value=E.dataset.novoTemaCategoria,de(w)),(_=e.querySelector("#input-nome-tema"))==null||_.focus(),b==null||b.scrollIntoView({behavior:"smooth",block:"start"})})}),(G=e.querySelector("#btn-salvar-tema"))==null||G.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-tema"),v=e.querySelector("#input-categoria-tema"),_=E.value.trim();if(!_)return;const m=await us(t,_,v.value.trim());T(`temas/${m.id}`)}),e.querySelectorAll("[data-open]").forEach(E=>{E.addEventListener("click",()=>T(`temas/${E.dataset.open}`))})}async function Ss(e){const t=await L(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function ks(e){const t=await L(),a=await t.get("espacos",e);if(!a)return;const o=await t.getAllFromIndex("temas","espaco_id",e),s=mt(o),n=nt()==="titulo",i=[];for(const c of s){const l=[];for(const u of c.itens){const d=await t.getAllFromIndex("notas","tema_id",u.id);n?ne(d,h=>h.titulo):d.sort((h,g)=>h.criado_em.localeCompare(g.criado_em));const r=[];for(const h of d){const y=(await t.getAllFromIndex("itens_revisao","nota_id",h.id)).map(b=>b.avaliacao).filter(b=>!!b);r.push({nota:h,fraca:bs(y)})}l.push({tema:u,notas:r})}i.push({categoria:c.categoria,temas:l})}return{espaco:a,grupos:i}}function De(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Se.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const Pt=["•","◦","▪"];function Aa(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${De(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const n=Math.floor((t.length-t.trimStart().length)/2),i=Pt[Math.min(n,Pt.length-1)];return`${"  ".repeat(n)}${i} ${De(s[1])}`}return De(a)}).join(`
`)}function Ls(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",Aa(e.conteudo)),t.join(`
`).trim()}function As(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of t)if(o.temas.length!==0){a.push("",`▸ ${(o.categoria||"Sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.tema.favorito?"⭐ ":""}*${s.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const n of s.notas){const i=`${n.nota.favorito?"⭐ ":""}${n.fraca?"⚠ ":""}`;a.push("",`${i}*${n.nota.titulo||"(sem título)"}*`),n.nota.fonte&&a.push(`_${n.nota.fonte}_`),a.push(Aa(n.nota.conteudo))}}}return a.join(`
`).trim()}async function qs(e,t,a){var d,r;const o=await ks(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,n=a===void 0?o.grupos:o.grupos.filter(h=>h.categoria===a),i=As(s,n),c=ia(s.cor,R(s.id)),l=te(me(s));e.innerHTML=`
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
        <span class="espaco-icon-inline" style="--badge-accent:${c}" aria-hidden="true">${l.svg}</span>${p(s.nome)}
      </h1>
      <p class="pdf-meta">
        ${a!==void 0?`Categoria: ${p(a||"Sem categoria")} · `:""}Gerado em ${ee(O()+"T00:00:00Z")}
      </p>

      ${n.every(h=>h.temas.length===0)?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:n.map(h=>{const g=h.categoria?h.categoria.toLowerCase():s.id;return`
        <section class="pdf-category" style="--cat-accent:${R(g)}">
          <div class="pdf-category__title">
            <span class="color-dot" style="--dot-color:${R(g)}"></span>${p(h.categoria||"Sem categoria")}
          </div>
          ${h.temas.map(y=>{const b=y.tema.categoria?y.tema.categoria.toLowerCase():y.tema.id;return`
            <section class="pdf-tema" style="--tema-accent:${R(b)}">
              <div class="pdf-tema__title">${y.tema.favorito?`${x.star} `:""}${p(y.tema.nome)}</div>
              ${y.notas.length===0?'<p class="text-muted">Sem notas.</p>':y.notas.map(f=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${f.nota.favorito?`${x.star} `:""}${f.fraca?`${x.alert} Reforçar — `:""}${p(f.nota.titulo||"(sem título)")}
                  </div>
                  ${f.nota.fonte?`<div class="pdf-nota__meta">${p(f.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${ke(f.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `}).join("")}
        </section>
      `}).join("")}
    </article>
  `,(d=e.querySelector("[data-back]"))==null||d.addEventListener("click",()=>T(`espacos/${t}`)),(r=e.querySelector("#btn-imprimir"))==null||r.addEventListener("click",()=>window.print());const u=e.querySelector("#btn-copiar");u==null||u.addEventListener("click",async()=>{const h=u.textContent;try{await navigator.clipboard.writeText(i),u.textContent="Copiado!"}catch{u.textContent="Não foi possível copiar"}setTimeout(()=>{u.textContent=h},1800)})}async function ye(e,t){var u,d,r,h,g,y,b,f,S;const a=await Sa(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await vt(a.espaco_id),s=await ea(t),n=o?await xa(o.id):[],i=pt(n.map(w=>w.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${bt([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${R(c)}"></span>${a.favorito?`${x.star} `:""}${p(a.nome)}
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
        <input class="input" id="input-nome-tema-editar" type="text" value="${p(a.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-tema-editar" type="text" value="${p(a.categoria)}" maxlength="80" />
        ${$e(i,"input-categoria-tema-editar")}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${o!=null&&o.arquivado?`<div class="banner banner--warning"><span>O espaço "${p(o.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`:""}

    ${s.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${o!=null&&o.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>'}
      </div>
    `:`
      <div class="item-list">
        ${s.map(w=>`
          <button class="item-row" data-open="${p(w.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${R(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${w.favorito?`${x.star} `:""}${p(w.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${p(w.fonte||"Sem fonte")}${w.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${w.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,ht(e),ft(e),(u=e.querySelector("#btn-nova-nota"))==null||u.addEventListener("click",()=>T(`temas/${t}/nova-nota`)),(d=e.querySelector("#btn-empty-nova-nota"))==null||d.addEventListener("click",()=>T(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(w=>{w.addEventListener("click",()=>T(`notas/${w.dataset.open}`))}),(r=e.querySelector("#btn-favoritar-tema"))==null||r.addEventListener("click",async()=>{await ps(a.id),ye(e,t)}),(h=e.querySelector("#btn-detalhes-tema"))==null||h.addEventListener("click",async()=>{const w=await ws(a.id),M=ve(O(new Date(a.criado_em)),O());ka({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${rt(w)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${M}</div>
            <div class="stat-tile__label">${M===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${ee(a.criado_em)}</p>
      `})}),(g=e.querySelector("#btn-avaliar-tema"))==null||g.addEventListener("click",()=>{const w=s.map(M=>({nota:M,tema:a}));La(e,w,a.nome,()=>ye(e,t))});const l=e.querySelector("#form-editar-tema");(y=e.querySelector("#btn-editar-tema"))==null||y.addEventListener("click",()=>{var w;l.style.display="block",(w=e.querySelector("#input-nome-tema-editar"))==null||w.focus()}),(b=e.querySelector("#btn-cancelar-edicao-tema"))==null||b.addEventListener("click",()=>{l.style.display="none"}),(f=e.querySelector("#btn-salvar-edicao-tema"))==null||f.addEventListener("click",async()=>{const w=e.querySelector("#input-nome-tema-editar").value.trim(),M=e.querySelector("#input-categoria-tema-editar").value.trim();w&&(await ms(a.id,w,M),ye(e,t))}),(S=e.querySelector("#btn-excluir-tema"))==null||S.addEventListener("click",async()=>{const w=await vs(a.id);await re({title:`Excluir "${a.nome}"?`,message:`Isso vai apagar ${w.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await fs(a.id),T(`espacos/${a.espaco_id}`))})}function fe(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${p(e)}</div>
    </details>
  `}let Le=!1,Ye=null;function Ts(e){Le=e}function jt(){Le=!1}function Ms(e){Ye=e}function pe(){return Le?Ye?Ye():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function Cs(){window.addEventListener("beforeunload",e=>{Le&&(e.preventDefault(),e.returnValue="")})}const Is={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function Ne(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function Ee(e,t){var $,q,A,z,U,G,E;const a=t.mode==="nova"?t.temaId:($=await Tt(t.notaId))==null?void 0:$.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await Sa(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await vt(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${p(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(q=e.querySelector("#btn-voltar-arquivado"))==null||q.addEventListener("click",()=>T(`temas/${a}`));return}const n=t.mode==="editar"?await Tt(t.notaId):void 0,i=n?await Ds(n.id):!1,c=t.mode==="nova"?(await ea(a)).at(-1):void 0,l=c==null?void 0:c.titulo,u=c==null?void 0:c.fonte;e.innerHTML=`
    ${bt([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(n==null?void 0:n.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&n?`<div class="section-header__meta text-muted">Criada em ${ee(n.criado_em)}${n.atualizado_em!==n.criado_em?` · Editada em ${ee(n.atualizado_em)}`:""}</div>`:""}
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
        <label class="field__label" for="input-titulo">Título${fe('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${l?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${p((n==null?void 0:n.titulo)??l??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${l?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${fe("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${u?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${p((n==null?void 0:n.fonte)??u??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${u?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${fe("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
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
            ${Se.map(v=>`<button type="button" class="color-picker__swatch" data-cor="${v}" style="--dot-color:${Is[v]}" title="${p(Mt[v])}" aria-label="${p(Mt[v])}"></button>`).join("")}
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
        >${n!=null&&n.conteudo?ke(n.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${n!=null&&n.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${fe("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
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
  `;const d=`temas/${a}`;ht(e),(A=e.querySelector("#btn-cancelar"))==null||A.addEventListener("click",()=>{pe()&&(jt(),T(d))});const r=e.querySelector("#input-conteudo"),h=e.querySelector("#input-titulo"),g=e.querySelector("#input-fonte"),y=()=>Ts(!0);h.addEventListener("input",y),g.addEventListener("input",y),r.addEventListener("input",y),Ms(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),l&&h.addEventListener("input",()=>de(h),{once:!0}),u&&g.addEventListener("input",()=>de(g),{once:!0}),r.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function b(v){var m,k;let _=((k=(m=window.getSelection())==null?void 0:m.getRangeAt(0))==null?void 0:k.commonAncestorContainer)??null;for(;_&&_!==r;){if(_ instanceof HTMLElement&&_.tagName===v)return!0;_=_.parentNode}return!1}function f(){const v=window.getSelection();if(!v||v.rangeCount===0)return;let _=v.getRangeAt(0).commonAncestorContainer;for(;_&&_!==r;){if(_ instanceof HTMLElement&&_.tagName==="LI"){const m=document.createRange();m.selectNodeContents(_),m.collapse(!1),v.removeAllRanges(),v.addRange(m);return}_=_.parentNode}}function S(){r.querySelectorAll("p").forEach(v=>{v.querySelector("ul")&&v.replaceWith(...Array.from(v.childNodes))})}function w(){const v=window.getSelection(),_=v.getRangeAt(0);_.deleteContents();const m=document.createElement("br");_.insertNode(m);const k=document.createTextNode("​");m.after(k);const N=document.createRange();return N.setStart(k,1),N.collapse(!0),v.removeAllRanges(),v.addRange(N),{br:m,ancora:k}}function M(){if(!I)return;const{br:v,ancora:_}=I;if(I=null,!document.contains(_))return;const m=_.parentNode;if(!m)return;const k=Array.from(m.childNodes).indexOf(_);_.remove();const N=window.getSelection();if(!N||!document.contains(v))return;const j=document.createRange();j.setStart(m,k),j.collapse(!0),N.removeAllRanges(),N.addRange(j)}let I=null;r.addEventListener("keydown",v=>{if(v.key!=="Enter"||v.shiftKey||v.ctrlKey||v.metaKey||v.altKey||b("LI")){I=null;return}v.preventDefault(),I&&document.contains(I.br)?(I.ancora.remove(),I.br.remove(),document.execCommand("insertParagraph"),I=null):I=w()}),r.addEventListener("mousedown",()=>{I=null}),r.addEventListener("keydown",v=>{v.key!=="Tab"||!b("LI")||(v.preventDefault(),M(),document.execCommand(v.shiftKey?"outdent":"indent"),S())});function X(){var v;r.classList.toggle("is-empty",!((v=r.textContent)!=null&&v.trim()))}r.addEventListener("input",()=>{if(r.childNodes.length===0){r.innerHTML="<p><br></p>";const v=r.firstChild,_=document.createRange();_.setStart(v,0),_.collapse(!0);const m=window.getSelection();m==null||m.removeAllRanges(),m==null||m.addRange(_)}X()}),X(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(v=>{v.addEventListener("mousedown",_=>_.preventDefault()),v.addEventListener("click",()=>{M();const _=v.dataset.cmd;if(_==="strikeThrough")document.execCommand("strikeThrough");else if(_==="createLink"){const m=window.getSelection();if(!m||m.isCollapsed){r.focus();return}const k=prompt("URL do link:","https://");k&&k.trim()&&document.execCommand("createLink",!1,k.trim())}else _==="removeFormat"?document.execCommand("removeFormat"):document.execCommand(_);_==="insertUnorderedList"&&(S(),f()),r.focus(),V()})}),e.querySelectorAll(".color-picker__swatch").forEach(v=>{v.addEventListener("mousedown",_=>_.preventDefault()),v.addEventListener("click",()=>{M();const _=v.dataset.cor,m=window.getSelection();if(!m||m.rangeCount===0||m.isCollapsed)return;const k=m.getRangeAt(0);if(!r.contains(k.commonAncestorContainer))return;const N=k.extractContents();Ne(N);const j=document.createElement("span");j.className=`text-color text-color--${_}`,j.appendChild(N),k.insertNode(j),m.removeAllRanges();const Z=document.createRange();Z.selectNodeContents(j),m.addRange(Z),r.focus()})});const B=e.querySelector("[data-cor-limpar]");B.addEventListener("mousedown",v=>v.preventDefault()),B.addEventListener("click",()=>{M();const v=window.getSelection();if(!v||v.rangeCount===0)return;const _=v.getRangeAt(0);if(r.contains(_.commonAncestorContainer)){if(_.collapsed){let m=_.commonAncestorContainer;for(;m&&m!==r;){if(m instanceof HTMLElement&&m.classList.contains("text-color")){const k=m.parentNode;if(k){const N=document.createDocumentFragment();Array.from(m.childNodes).forEach(j=>N.appendChild(j)),k.replaceChild(N,m),Ne(k)}break}m=m.parentNode}}else{const m=_.extractContents();Ne(m),_.insertNode(m)}r.focus()}});const Q=e.querySelector("#input-pode-desatualizar"),W=e.querySelector("#wrapper-validade");Q.addEventListener("change",()=>{W.style.display=Q.checked?"flex":"none"});function V(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(_=>{const m=_.dataset.cmd;try{m==="bold"||m==="italic"||m==="underline"||m==="strikeThrough"||m==="insertUnorderedList"?_.setAttribute("aria-pressed",document.queryCommandState(m)?"true":"false"):_.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===r&&V()}),r.addEventListener("keyup",V),r.addEventListener("mouseup",V),r.addEventListener("focus",V),r.addEventListener("keydown",v=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?v.metaKey:v.ctrlKey))return;let k=!0;switch(v.key.toLowerCase()){case"b":v.preventDefault(),document.execCommand("bold");break;case"i":v.preventDefault(),document.execCommand("italic");break;case"u":v.preventDefault(),document.execCommand("underline");break;case"s":v.preventDefault(),document.execCommand("strikeThrough");break;case"k":v.preventDefault(),M();const N=window.getSelection();if(N&&!N.isCollapsed){const j=prompt("URL do link:","https://");j&&j.trim()&&document.execCommand("createLink",!1,j.trim())}break;case"z":v.preventDefault(),v.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":v.preventDefault(),document.execCommand("redo");break;default:k=!1}k&&V()}),(z=e.querySelector("#btn-salvar"))==null||z.addEventListener("click",async()=>{const v=h.value.trim(),_=Zo(r).trim();let m=null;const k=(Z,za)=>{var _t;Z.classList.add("input--error"),Z.setAttribute("aria-invalid","true");const qe=(_t=Z.closest(".field"))==null?void 0:_t.querySelector(".field__error");qe&&(qe.textContent=za,qe.style.display="block"),m||(m=Z)},N=Z=>{Z.classList.remove("input--error"),Z.removeAttribute("aria-invalid")};if(v||k(h,"Informe um título para a nota."),_||k(r,"Informe o conteúdo da nota."),m){m.focus();return}N(h),N(r);const j={titulo:v,conteudo:_,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:Q.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await qo(a,j):await To(t.notaId,j),jt(),T(d)}),t.mode==="editar"&&n){(U=e.querySelector("#btn-favoritar-nota"))==null||U.addEventListener("click",async()=>{await Mo(n.id),Ee(e,t)}),(G=e.querySelector("#btn-parar-revisar"))==null||G.addEventListener("click",async()=>{await Go(n.id),Ee(e,t)});const v=e.querySelector("#btn-compartilhar-nota");v==null||v.addEventListener("click",async()=>{const _=Ls(n);if(navigator.share){try{await navigator.share({title:n.titulo||"Nota",text:_})}catch{}return}const m=v.textContent;try{await navigator.clipboard.writeText(_),v.textContent="Copiado!"}catch{v.textContent="Não foi possível copiar"}setTimeout(()=>{v.textContent=m},1800)}),(E=e.querySelector("#btn-excluir-nota"))==null||E.addEventListener("click",async()=>{await re({title:"Excluir esta nota?",message:`Isso vai apagar a nota e todo o seu histórico de revisões.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await Co(n.id),T(d))})}}async function Ds(e){return(await(await L()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function Ns(e){return e.length===10?e:O(new Date(e))}function Ps(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function js(e){const t=new Set;for(const a of e)a&&t.add(Ns(a));return t}function qa(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Pe(e){return e.size}function zs(e,t,a=365,o=O()){const s=K(o,-a+1),n=[];let i=s;for(;i<=o;)n.push({date:i,count:(e.has(i)?1:0)+(t.has(i)?1:0),hasRevisao:e.has(i),hasCriacao:t.has(i)}),i=K(i,1);const c=Pe(e),l=Pe(t),u=Pe(qa(e,t));return{days:n,totalDiasRevisao:c,totalDiasCriacao:l,totalDiasAtividade:u}}async function Ta(e){const t=await L(),a=O(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const w=await t.getAllFromIndex("espacos","perfil_id",e),I=(await Promise.all(w.map(B=>t.getAllFromIndex("temas","espaco_id",B.id)))).flat();return(await Promise.all(I.map(B=>t.getAllFromIndex("notas","tema_id",B.id)))).flat()})()]),n=o.filter(w=>w.data_concluida).map(w=>w.data_concluida),i=Ps(n),c=js(s.map(w=>w.criado_em)),l=o.filter(w=>w.data_concluida===a).length,u=s.filter(w=>O(new Date(w.criado_em))===a).length,d=a.slice(0,4),r=a.slice(5,7),h=`${d}-${r}`,g=n.filter(w=>w.startsWith(h)).length,y=s.filter(w=>O(new Date(w.criado_em)).startsWith(h)).length,b=i.size,f=c.size,S=qa(i,c).size;return{datasRevisaoSet:i,datasCriacaoSet:c,totalDiasRevisao:b,totalDiasCriacao:f,totalDiasAtividade:S,notasCriadasHoje:u,revisoesFeitasHoje:l,notasCriadasEsteMes:y,revisoesFeitasEsteMes:g}}async function Rs(e,t=365){const a=await Ta(e);return zs(a.datasRevisaoSet,a.datasCriacaoSet,t)}function Fs(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function Os(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const n=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let l=0;l<n;l++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const l of e)s.push(l),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(l=>`
          <div class="heatmap__col">
            ${l.map(u=>`
              <div class="heatmap__cell heatmap__cell--${Fs(u.count)}${u.date?"":" heatmap__cell--empty"}" title="${u.date?`${u.date}${u.count?` · ${u.count} atividade(s)`:""}${u.hasRevisao&&u.hasCriacao?" (revisão + criação)":u.hasRevisao?" (revisão)":u.hasCriacao?" (criação)":""}`:""}"></div>
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
        ${p(String(t))} dias estudados · ${p(String(a))} dias com criação de notas · ${p(String(e.filter(l=>l.count>0).length))} dias com atividade nos últimos ${p(String(e.length))} dias
      </p>
    </div>
  `}const Hs={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function Bs(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Vs(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Us(e,t){const a=await ys(t.perfilId),o=await Ta(t.perfilId),s=await Rs(t.perfilId,365),n=["dom","seg","ter","qua","qui","sex","sáb"],i=new Date().getDay(),c=Math.max(1,...a.cargaProximos7.map(u=>u.count)),l=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null;e.innerHTML=`
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
          ${a.diasAtivosUltimos7.map((u,d)=>{const r=(i-(6-d)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${u?"streak-hero__day--ativo":""}"></span>
                  <span class="streak-hero__day-label">${n[r]}</span>
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
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${rt(a.tempoHojeSegundos)}</div>
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
        ${a.porEstagio.map(u=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${u.count}</div>
            <div class="stage-tile__label">${Hs[u.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${x.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(u=>`${u.count} em ${Vs(u.data)}`).join(", ")}">
        ${a.cargaProximos7.map(u=>{const d=Bs(u.data);return`
            <div class="load-chart__col">
              <div class="load-chart__val">${u.count}</div>
              <div class="load-chart__bar">
                <div class="load-chart__fill" style="height: ${u.count/c*100}%"></div>
              </div>
              <div class="load-chart__label">${d}</div>
            </div>
          `}).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Retenção · últimos 30 dias</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">% de Fácil, Médio e Difícil nas revisões feitas — o quanto você realmente está lembrando.</p>
      ${a.retencao30.total===0?'<p class="text-muted">Ainda não há avaliações em 30 dias.</p>':`
        <div class="retention-bar" role="img" aria-label="Fácil ${l.facil}%, Médio ${l.medio}%, Difícil ${l.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${l.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${l.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${l.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${l.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${l.medio}%</span>
          <span class="badge badge--success">Fácil ${l.facil}%</span>
          <span class="text-muted" style="font-size: var(--font-size-xs);">${a.retencao30.total} avaliada(s)</span>
        </div>
      `}

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Temas com mais "Difícil"</span>
      </div>
      ${a.rankingDificeis.length===0?'<p class="text-muted">Nenhuma avaliação "Difícil" registrada ainda.</p>':`
        <div class="rank-list">
          ${a.rankingDificeis.map((u,d)=>`
            <div class="rank-row">
              <span>${d+1}. ${p(u.temaNome)}</span>
              <span class="badge badge--danger">${u.count}× difícil</span>
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
      ${Os(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `,e.querySelectorAll(".tabs__tab").forEach(u=>{u.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(d=>{d.setAttribute("aria-selected",String(d===u))}),e.querySelector("#tab-visao").style.display=u.dataset.tab==="visao"?"block":"none",e.querySelector("#tab-evolucao").style.display=u.dataset.tab==="evolucao"?"block":"none"})})}async function Gs(e){const t=await L(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=await Promise.all(a.map(u=>t.getAllFromIndex("temas","espaco_id",u.id))),s=[],n=[],i=new Map;for(let u=0;u<a.length;u++){const d=a[u],r=o[u];for(const h of r)i.set(h.id,d),h.favorito&&s.push({tema:h,espaco:d})}const c=o.flat(),l=await Promise.all(c.map(u=>t.getAllFromIndex("notas","tema_id",u.id)));for(let u=0;u<c.length;u++){const d=c[u],r=l[u],h=i.get(d.id);if(h)for(const g of r)g.favorito&&n.push({nota:g,tema:d,espaco:h})}return{temas:ne(s,u=>u.tema.nome),notas:ne(n,u=>u.nota.titulo||u.tema.nome)}}async function Ks(e,t){var u;const{temas:a,notas:o}=await Gs(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(u=e.querySelector("#btn-empty-espacos"))==null||u.addEventListener("click",()=>T("espacos"));return}const s=new Map;for(const d of a){const r=s.get(d.espaco.id)??{espaco:d.espaco,itens:[]};r.itens.push(d),s.set(d.espaco.id,r)}const n=new Map;for(const d of o){const r=n.get(d.tema.id)??{temaNome:d.tema.nome,espaco:d.espaco,itens:[]};r.itens.push(d),n.set(d.tema.id,r)}const i=new Map;for(const d of a)i.set(d.espaco.id,d.espaco);for(const d of o)i.set(d.espaco.id,d.espaco);const c=ca([...i.values()]),l=d=>{const r=c.get(d.id)??R(d.id),h=te(me(d));return`<span class="espaco-icon-inline" style="--badge-accent:${r}" aria-hidden="true">${h.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(d=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(d.espaco.id)??R(d.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${l(d.espaco)}${p(d.espaco.nome)}
          </div>
          <div class="item-list">
            ${d.itens.map(r=>`
              <button class="item-row" data-tema="${p(r.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(d.espaco.id)??R(d.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${p(r.tema.nome)}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}

    ${o.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${a.length>0?"var(--space-6)":"0"};">Notas favoritas</div>
      ${Array.from(n.values()).map(d=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(d.espaco.id)??R(d.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${l(d.espaco)}${p(d.temaNome)} <span class="queue-group__espaco"> · ${p(d.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${d.itens.map(r=>`
              <button class="item-row" data-nota="${p(r.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(d.espaco.id)??R(d.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${p(r.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${p(r.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(d=>{d.addEventListener("click",()=>T(`temas/${d.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(d=>{d.addEventListener("click",()=>T(`notas/${d.dataset.nota}`))})}const Ws=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Zs=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,Xs=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,Qs=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      vale.</p>`}];function Js(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${Ws}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Zs}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${Xs}</pre>
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

      ${Qs.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function Ys(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,n=0,i=0;for(const c of t){const l=a.get(c.id);l?c.atualizado_em>l.atualizado_em?(a.set(c.id,c),o.push(c),n++):i++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:n,mantidos:i}}function en(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const tn=["perfis","espacos","temas","notas","itens_revisao"],yt="memoriza-export",Ma=1;async function an(){const e=await L(),[t,a,o,s,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:n}}async function on(e){const t=await L(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(r=>r.id)),i=(await t.getAll("temas")).filter(r=>s.has(r.espaco_id)),c=new Set(i.map(r=>r.id)),u=(await t.getAll("notas")).filter(r=>c.has(r.tema_id)),d=await t.getAllFromIndex("itens_revisao","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:i,notas:u,itens_revisao:d}}async function sn(e){const t=await on(e);return{formato:yt,versao:Ma,exportado_em:F(),escopo:"perfil",perfil_id:e,dados:t}}async function et(){const e=await an();return{formato:yt,versao:Ma,exportado_em:F(),escopo:"todos",dados:e}}function nn(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${ho(e.exportado_em)}.json`}function zt(e){const t=nn(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function Ca(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==yt||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Ia(e){const t=await L(),a={};for(const o of tn){const s=await t.getAll(o),n=e.dados[o],i=Ys(s,n??[]);if(i.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const l of i.toWrite)await c.store.put(l);await c.done}a[o]={criados:i.criados,atualizados:i.atualizados,mantidos:i.mantidos}}return await ta(),{...en(Object.values(a)),porLoja:a}}function rn(e){return e.replace(/-/g,"")}function cn(e,t){const[a,o]=t.split(":");return`${rn(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function ln(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function dn(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function un(e){const t=cn(J(),e),a=ln(new Date),o=dn("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${se()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function mn(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const pn="https://api.github.com",vn="Memoriza — sincronização de anotações",Ae="memoriza-sync.json";function fn(e){return(t,a={})=>fetch(`${pn}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function gn(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&Ae in s.files))==null?void 0:o.id)??null}async function bn(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:vn,public:!1,files:{[Ae]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function hn(e,t){var s,n;const a=await e(`/gists/${t}`);return a.ok?((n=(s=(await a.json()).files)==null?void 0:s[Ae])==null?void 0:n.content)??null:null}async function yn(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[Ae]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function Da(e){const t=fn(e);let a=Bt();if(!a){const i=await gn(t);i&&(a=i,Oe(i))}let o=null,s=!1,n=await et();if(a){const i=await hn(t,a);if(i)try{const c=Ca(i);o=await Ia(c),n=await et(),s=!0}catch{}}return a?await yn(t,a,JSON.stringify(n)):(a=await bn(t,JSON.stringify(n)),Oe(a)),Vt(F()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??_n(),push:!0,mesclouRemoto:s}}function _n(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function wn(e){const t=st();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const $n=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],En=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}];async function Y(e,t){var b,f,S,w,M,I,X,B,Q,W,V;const a=Ya(),o=Va(),s=await ct(),n=Wa(t.perfil.id),i=ot(),c=Ut(),l=st(),u=Bt(),d=nt();e.innerHTML=`
    <div class="stack content-narrow content-wide">
      <section class="settings-section">
        <div class="settings-section__title">${x.user} Perfil</div>
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
        <div class="settings-section__title">${x.users} Gerenciar perfis</div>
        <div class="card stack">
          <div>
            ${s.map($=>`
              <div class="settings-list-row" data-perfil-id="${p($.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${p($.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${p($.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${p($.id)}" data-nome="${p($.nome)}" class="danger" type="button">Excluir perfil</button>
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
              ${$n.map($=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-theme="${$.value}"
                  aria-pressed="${$.value===a}"
                >${$.label}</button>
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
              ${En.map($=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${$.value}"
                  aria-pressed="${$.value===d}"
                >${$.label}</button>
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
                ${o?`Último export: ${p(qt(o))}.`:"Nenhum export feito ainda."}
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
              ${x.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${l?`<div class="banner banner--success" style="margin-bottom:0;">${x.check} Última sincronização: ${p(qt(l))}${u?".":""}</div>`:i?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
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
        <div class="settings-section__title">${x.clock} Lembretes</div>
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

  `,(b=e.querySelector("#btn-switch-profile"))==null||b.addEventListener("click",()=>{t.onSwitchProfile()}),(f=e.querySelector("#btn-como-usar"))==null||f.addEventListener("click",()=>T("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach($=>{$.addEventListener("click",()=>{const q=$.dataset.theme;Ja(q),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(A=>{A.setAttribute("aria-pressed",String(A===$))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach($=>{$.addEventListener("click",()=>{Qa($.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(q=>{q.setAttribute("aria-pressed",String(q===$))})})}),(S=e.querySelector("#btn-export-profile"))==null||S.addEventListener("click",async()=>{const $=await sn(t.perfil.id);zt($),$t($.exportado_em),Y(e,t)}),(w=e.querySelector("#btn-export-all"))==null||w.addEventListener("click",async()=>{const $=await et();zt($),$t($.exportado_em),Y(e,t)});const r=e.querySelector("#import-file");(M=e.querySelector("#btn-import"))==null||M.addEventListener("click",()=>{r==null||r.click()}),r==null||r.addEventListener("change",async()=>{const $=e.querySelector("#import-summary"),[q]=r.files??[];if(!(!q||!$))try{const A=await q.text(),z=Ca(A),U=await Ia(z);$.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${U.criados} criados, ${U.atualizados} atualizados,
          ${U.mantidos} mantidos como estavam.
        </div>
      `}catch(A){$.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${p(A instanceof Error?A.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{r.value=""}});const h=e.querySelector("#form-novo-perfil");(I=e.querySelector("#btn-novo-perfil"))==null||I.addEventListener("click",()=>{var $;h.style.display="block",($=e.querySelector("#input-novo-perfil"))==null||$.focus()}),(X=e.querySelector("#btn-cancelar-perfil"))==null||X.addEventListener("click",()=>{h.style.display="none"}),(B=e.querySelector("#btn-salvar-perfil"))==null||B.addEventListener("click",async()=>{const q=e.querySelector("#input-novo-perfil").value.trim();q&&(await Zt(q),Y(e,t))}),e.querySelectorAll("[data-renomear]").forEach($=>{$.onclick=()=>{var v;const q=$.dataset.renomear,A=e.querySelector(`[data-perfil-id="${q}"]`),z=A==null?void 0:A.querySelector("[data-view-nome]");if(!A||!z)return;const U=((v=z.textContent)==null?void 0:v.trim())??"";z.innerHTML=`
        <input class="input" type="text" value="${p(U)}" maxlength="60" style="max-width:200px;" />
      `;const G=z.querySelector("input");G.focus(),G.select(),$.textContent="Salvar";const E=async()=>{const _=G.value.trim();_&&(await $o(q,_),q===t.perfil.id&&(t.perfil={...t.perfil,nome:_})),Y(e,t)};G.addEventListener("keydown",_=>{_.key==="Enter"&&E()}),$.onclick=E}}),e.querySelectorAll("[data-excluir-perfil]").forEach($=>{$.addEventListener("click",async()=>{const q=$.dataset.excluirPerfil,A=$.dataset.nome??"",z=await Eo(q);await re({title:`Excluir o perfil "${A}"?`,message:`Isso vai apagar ${z.espacos} espaço(s), ${z.temas} tema(s) e ${z.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await xo(q),q===t.perfil.id?t.onSwitchProfile():Y(e,t))})}),(Q=e.querySelector("#btn-baixar-lembrete"))==null||Q.addEventListener("click",()=>{const $=e.querySelector("#input-hora-lembrete").value||"19:00";Za(t.perfil.id,$),mn(un($))});const g=e.querySelector("#sync-status"),y=e.querySelector("#btn-sync-now");y==null||y.addEventListener("click",async()=>{const q=e.querySelector("#input-github-token").value.trim();if(!q){g&&(g.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Et(q),y.disabled=!0,g&&(g.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Sincronizando…</div>`);try{const A=await Da(q);if(g){const z=[A.criados>0?`${A.criados} novo(s)`:null,A.atualizados>0?`${A.atualizados} atualizado(s)`:null].filter(Boolean);g.innerHTML=`
          <div class="banner banner--success" role="status">
            ${x.check} Sincronizado!${z.length>0?` ${z.join(", ")} baixado(s).`:""}
            ${A.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}Y(e,t)}catch(A){y.disabled=!1,g&&(g.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${p(A instanceof Error?A.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(W=e.querySelector("#btn-limpar-token"))==null||W.addEventListener("click",async()=>{await re({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Et(""),Oe(""),Vt(""),Y(e,t))}),(V=e.querySelector("#sync-auto"))==null||V.addEventListener("change",$=>{Xa($.target.checked)})}let je=null;async function Rt(){if(!(!("wakeLock"in navigator)||document.hidden))try{je=await navigator.wakeLock.request("screen"),je.addEventListener("release",()=>{je=null})}catch{}}function xn(){Rt(),document.addEventListener("visibilitychange",()=>{document.hidden||Rt()})}const Na="v1.7",Sn="Memoriza",Pa=`${Sn} ${Na}`,ge=24;function tt(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function ze(e,t){const a=tt(t);return e.some(o=>tt(o).includes(a))}function kn(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),n=t.toLowerCase();let i=s.indexOf(n);i===-1&&(i=0);const c=Math.max(0,i-a),l=Math.min(o.length,i+n.length+a);return(c>0?"…":"")+o.slice(c,l)+(l<o.length?"…":"")}async function Ln(e,t){const a=t.trim();if(!a)return[];const o=tt(a);if(!o)return[];const s=await L(),n=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(g=>!g.arquivado),c=(await Promise.all(n.map(g=>s.getAllFromIndex("temas","espaco_id",g.id)))).flat(),l=new Map(n.map(g=>[g.id,g])),d=(await Promise.all(c.map(g=>s.getAllFromIndex("notas","tema_id",g.id)))).flat(),r=[];for(const g of n)if(ze([g.nome,g.categoria],o)&&(r.push({kind:"espaco",id:g.id,titulo:g.nome,meta:g.categoria?`Espaço · ${g.categoria}`:"Espaço"}),r.length>=ge))return r;const h=new Map(c.map(g=>[g.id,g]));for(const g of c)if(ze([g.nome,g.categoria],o)){const y=l.get(g.espaco_id);if(r.push({kind:"tema",id:g.id,titulo:g.nome,meta:`Tema${y?` · ${y.nome}`:""}`}),r.length>=ge)return r}for(const g of d){if(!ze([g.titulo,g.fonte,g.conteudo],o))continue;const y=h.get(g.tema_id),b=y&&l.get(y.espaco_id),f=[...b?[b.nome]:[],...y?[y.nome]:[]].join(" · ");if(r.push({kind:"nota",id:g.id,titulo:g.titulo||"(sem título)",meta:f?`Nota · ${f}`:"Nota",snippet:g.conteudo?kn(g.conteudo,o):void 0}),r.length>=ge)return r}return r.sort((g,y)=>{const b=`${g.titulo.toLowerCase()} ${g.meta.toLowerCase()}`,f=`${y.titulo.toLowerCase()} ${y.meta.toLowerCase()}`;return Lo(b,f)}),r.slice(0,ge)}const An={espaco:"Espaço",tema:"Tema",nota:"Nota"};function Ft(e,t){const a=p(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const n=p(e.slice(0,s)),i=p(e.slice(s,s+o.length)),c=p(e.slice(s+o.length));return`${n}<mark>${i}</mark>${c}`}async function ja(e){var g;(g=document.querySelector(".search-overlay"))==null||g.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],n=-1,i,c=!1;function l(){c||(c=!0,t.remove(),document.removeEventListener("keydown",h))}function u(y){s.length!==0&&(n=(n+y+s.length)%s.length,s.forEach((b,f)=>{const S=f===n;b.el.classList.toggle("is-active",S),b.el.setAttribute("aria-selected",String(S)),S&&b.el.scrollIntoView({block:"nearest"})}))}function d(y){const b=s.find(S=>S.el===y);if(!b)return;l();const f=b.resultado;f.kind==="espaco"?T(`espacos/${f.id}`):f.kind==="tema"?T(`temas/${f.id}`):T(`notas/${f.id}`)}function r(y){Ln(e,y).then(b=>{if(!c){if(n=-1,s=[],b.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${p(y.trim())}".</p>`;return}o.innerHTML="";for(const f of b){const S=document.createElement("button");S.type="button",S.className=`search-result search-result--${f.kind}`,S.setAttribute("role","option"),S.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${f.kind==="espaco"?x.folder:f.kind==="tema"?x.bookOpen:x.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${Ft(f.titulo,y)}</span>
            <span class="search-result__meta">${p(An[f.kind])} · ${p(f.meta)}</span>
            ${f.snippet?`<span class="search-result__snippet">${Ft(f.snippet,y)}</span>`:""}
          </span>
        `,S.addEventListener("click",()=>d(S)),o.appendChild(S),s.push({el:S,resultado:f})}}})}function h(y){y.key==="Escape"&&(y.preventDefault(),l())}a.addEventListener("input",()=>{i&&clearTimeout(i),i=setTimeout(()=>r(a.value),120)}),a.addEventListener("keydown",y=>{y.key==="ArrowDown"?(y.preventDefault(),u(1)):y.key==="ArrowUp"?(y.preventDefault(),u(-1)):y.key==="Enter"&&n>=0?(y.preventDefault(),d(s[n].el)):y.key==="Escape"&&(y.preventDefault(),l())}),t.addEventListener("mousedown",y=>{y.target===t&&l()}),document.addEventListener("keydown",h),a.focus(),r("")}const Re=7,qn=30,Tn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],Mn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function Cn(e){Ro(()=>at(e)),await at(e),Nn(),xn(),In(),Dn()}function In(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=Ot();t&&ja(t)}})}async function Dn(){const e=ot();if(!(!e||!Ut())&&wn(qn))try{await Da(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function Nn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function at(e){var l,u,d;const t=Ot(),a=t?await wo(t):void 0;if(!a){Fe(null),e.innerHTML='<div id="profile-screen"></div>';const r=e.querySelector("#profile-screen");await Oo(r,async h=>{Fe(h.id),T("hoje"),await at(e)});return}const o=Po(),s=jo(o),n=await jn(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${Tn.map(r=>`
          <button
            class="app-nav__item"
            data-route="${r.route}"
            ${r.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${Fo[r.route]}</span>
            <span>${r.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${Mn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${x.search}</button>
            ${n?`<button class="app-header__backup-alert${n.urgente?" is-urgent":""}" id="btn-sync-alert" type="button" title="${p(n.mensagem)}" aria-label="${p(n.mensagem)}">${x.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${p(bo(O()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${x.help}</button>
            <span class="app-header__profile" title="Memoriza ${Na}">${p(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${p(Pa)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(r=>{r.addEventListener("click",()=>{pe()&&zo(r.dataset.route)})}),(l=e.querySelector("#btn-ajuda"))==null||l.addEventListener("click",()=>{pe()&&(location.hash==="#/ajuda"?history.back():T("ajuda"))}),(u=e.querySelector("#btn-busca"))==null||u.addEventListener("click",()=>{pe()&&ja(a.id)}),(d=e.querySelector("#btn-sync-alert"))==null||d.addEventListener("click",()=>{pe()&&T("config")});const i=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",i.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await Pn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(r){console.error("Erro ao renderizar tela:",r),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function Pn(e,t,a){switch(t.name){case"hoje":await It(e,{perfilId:a.id});break;case"espacos":await be(e,{perfilId:a.id});break;case"espaco":await he(e,t.id);break;case"espaco-pdf":await qs(e,t.id,t.categoria);break;case"painel":await Us(e,{perfilId:a.id});break;case"favoritos":await Ks(e,{perfilId:a.id});break;case"ajuda":Js(e);break;case"tema":await ye(e,t.id);break;case"nota-nova":await Ee(e,{mode:"nova",temaId:t.temaId});break;case"nota":await Ee(e,{mode:"editar",notaId:t.id});break;case"config":await Y(e,{perfil:a,onSwitchProfile:()=>{Fe(null),T("perfil")}});break;default:await It(e,{perfilId:a.id})}}async function jn(e){if(!await zn(e.id))return null;if(!ot())return{urgente:!1,mensagem:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};const a=st();if(!a)return{urgente:!1,mensagem:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."};const o=O(),s=ve(O(new Date(a)),o);return s<=Re?null:{urgente:s>Re*2,mensagem:`Faz mais de ${Re} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}}async function zn(e){const t=await L();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${Pa}%c rodando`,"font-weight:bold;","");Gt();Ha({immediate:!0});async function Rn(){Cs(),await _o(),await ta(),await eo();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await Cn(e)}Rn();
