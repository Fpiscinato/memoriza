(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const Pa="modulepreload",ja=function(e){return"/"+e},ht={},za=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(l=>{if(l=ja(l),l in ht)return;ht[l]=!0;const d=l.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const r=document.createElement("link");if(r.rel=d?"stylesheet":Pa,d||(r.as="script"),r.crossOrigin="",r.href=l,c&&r.setAttribute("nonce",c),document.head.appendChild(r),d)return new Promise((b,f)=>{r.addEventListener("load",b),r.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return s.then(i=>{for(const c of i||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};function Ra(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:n,onRegisterError:i}=e;let c,l;const d=async(r=!0)=>{await l};async function u(){if("serviceWorker"in navigator){if(c=await za(async()=>{const{Workbox:r}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:r}},[]).then(({Workbox:r})=>new r("/sw.js",{scope:"/",type:"classic"})).catch(r=>{i==null||i(r)}),!c)return;c.addEventListener("activated",r=>{(r.isUpdate||r.isExternal)&&window.location.reload()}),c.addEventListener("installed",r=>{r.isUpdate||o==null||o()}),c.register({immediate:t}).then(r=>{n?n("/sw.js",r):s==null||s(r)}).catch(r=>{i==null||i(r)})}}return l=u(),d}const N={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function zt(){return localStorage.getItem(N.selectedProfileId)}function Fe(e){e?localStorage.setItem(N.selectedProfileId,e):localStorage.removeItem(N.selectedProfileId)}function Rt(){const e=localStorage.getItem(N.theme);return e==="light"||e==="dark"?e:"system"}function Fa(e){e==="system"?localStorage.removeItem(N.theme):localStorage.setItem(N.theme,e)}function Oa(){return localStorage.getItem(N.lastExportAt)}function yt(e){localStorage.setItem(N.lastExportAt,e)}function Ha(){return localStorage.getItem(N.storagePersistRequested)==="1"}function Ba(){localStorage.setItem(N.storagePersistRequested,"1")}const Va="19:00";function Ua(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??Va}function Ga(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function ot(){return localStorage.getItem(N.githubToken)??""}function _t(e){e.trim()?localStorage.setItem(N.githubToken,e.trim()):localStorage.removeItem(N.githubToken)}function Ft(){return localStorage.getItem(N.githubGistId)??""}function Oe(e){e?localStorage.setItem(N.githubGistId,e):localStorage.removeItem(N.githubGistId)}function st(){return localStorage.getItem(N.githubLastSyncAt)}function Ot(e){e?localStorage.setItem(N.githubLastSyncAt,e):localStorage.removeItem(N.githubLastSyncAt)}function Ht(){return localStorage.getItem(N.githubAutoSync)!=="0"}function Ka(e){e?localStorage.removeItem(N.githubAutoSync):localStorage.setItem(N.githubAutoSync,"0")}function nt(){return localStorage.getItem(N.notasOrdem)==="titulo"?"titulo":"data"}function Wa(e){e==="titulo"?localStorage.setItem(N.notasOrdem,"titulo"):localStorage.removeItem(N.notasOrdem)}function Bt(){const e=Rt();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function Za(e){Fa(e),Bt()}function Xa(){return Rt()}async function Qa(){var e;if(!Ha()&&(Ba(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const He=(e,t)=>t.some(a=>e instanceof a);let wt,$t;function Ja(){return wt||(wt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ya(){return $t||($t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Be=new WeakMap,Te=new WeakMap,xe=new WeakMap;function eo(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{a(ae(e.result)),s()},i=()=>{o(e.error),s()};e.addEventListener("success",n),e.addEventListener("error",i)});return xe.set(t,e),t}function to(e){if(Be.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{a(),s()},i=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});Be.set(e,t)}let Ve={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return Be.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return ae(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Vt(e){Ve=e(Ve)}function ao(e){return Ya().includes(e)?function(...t){return e.apply(Ue(this),t),ae(this.request)}:function(...t){return ae(e.apply(Ue(this),t))}}function oo(e){return typeof e=="function"?ao(e):(e instanceof IDBTransaction&&to(e),He(e,Ja())?new Proxy(e,Ve):e)}function ae(e){if(e instanceof IDBRequest)return eo(e);if(Te.has(e))return Te.get(e);const t=oo(e);return t!==e&&(Te.set(e,t),xe.set(t,e)),t}const Ue=e=>xe.get(e);function so(e,t,{blocked:a,upgrade:o,blocking:s,terminated:n}={}){const i=indexedDB.open(e,t),c=ae(i);return o&&i.addEventListener("upgradeneeded",l=>{o(ae(i.result),l.oldVersion,l.newVersion,ae(i.transaction),l)}),a&&i.addEventListener("blocked",l=>a(l.oldVersion,l.newVersion,l)),c.then(l=>{n&&l.addEventListener("close",()=>n()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const no=["get","getKey","getAll","getAllKeys","count"],io=["put","add","delete","clear"],Me=new Map;function Et(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Me.get(t))return Me.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=io.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||no.includes(a)))return;const n=async function(i,...c){const l=this.transaction(i,s?"readwrite":"readonly");let d=l.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[a](...c),s&&l.done]))[0]};return Me.set(t,n),n}Vt(e=>({...e,get:(t,a,o)=>Et(t,a)||e.get(t,a,o),has:(t,a)=>!!Et(t,a)||e.has(t,a)}));const ro=["continue","continuePrimaryKey","advance"],xt={},Ge=new WeakMap,Ut=new WeakMap,co={get(e,t){if(!ro.includes(t))return e[t];let a=xt[t];return a||(a=xt[t]=function(...o){Ge.set(this,Ut.get(this)[t](...o))}),a}};async function*lo(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,co);for(Ut.set(a,t),xe.set(a,Ue(t));t;)yield a,t=await(Ge.get(a)||t.continue()),Ge.delete(a)}function St(e,t){return t===Symbol.asyncIterator&&He(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&He(e,[IDBIndex,IDBObjectStore])}Vt(e=>({...e,get(t,a,o){return St(t,a)?lo:e.get(t,a,o)},has(t,a){return St(t,a)||e.has(t,a)}}));const uo="memoriza",mo=2;let Ce;function k(){return Ce||(Ce=so(uo,mo,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}}})),Ce}function oe(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const it="Europe/London",po=new Intl.DateTimeFormat("en-CA",{timeZone:it,year:"numeric",month:"2-digit",day:"2-digit"});function H(e=new Date){return po.format(e)}function J(){return H(new Date)}function me(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function O(){return new Date().toISOString()}function ee(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function vo(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:it,weekday:"short",day:"2-digit",month:"2-digit"})}function kt(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function fo(e){const t=new Date(e),a=H(t),o=t.toLocaleTimeString("pt-BR",{timeZone:it,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function rt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function K(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const go="00000000-0000-4000-8000-000000000001";async function ct(){return(await(await k()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function bo(){return ct()}async function ho(e){return(await k()).get("perfis",e)}async function Gt(e){const t=await k(),a=await t.getAll("perfis"),o=O(),n={id:a.length===0?go:oe(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",n),n}async function yo(e,t){const a=await k(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=O(),await a.put("perfis",o))}async function _o(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const n of a){const i=await t.getAllFromIndex("temas","espaco_id",n.id);o+=i.length;for(const c of i)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function wo(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(u=>t.getAllFromIndex("temas","espaco_id",u.id)))).flat(),i=(await Promise.all(s.map(u=>t.getAllFromIndex("notas","tema_id",u.id)))).flat(),l=(await Promise.all(i.map(u=>t.getAllFromIndex("itens_revisao","nota_id",u.id)))).flat(),d=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await d.objectStore("perfis").delete(e);for(const u of a)await d.objectStore("espacos").delete(u.id);for(const u of s)await d.objectStore("temas").delete(u.id);for(const u of i)await d.objectStore("notas").delete(u.id);for(const u of l)await d.objectStore("itens_revisao").delete(u.id);await d.done}const Kt=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),$o=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function Eo(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function Ke(e){return $o.get(Eo(e))??null}function Wt(e){return e.length>0&&e.every(t=>Ke(t)!==null)}function Zt(e,t,a){if(a){const o=Ke(e),s=Ke(t);if(o!==s)return o-s}return Kt.compare(e,t)}function Xt(e){const t=Wt(e);return[...e].sort((a,o)=>Zt(a,o,t))}function xo(e,t){return Kt.compare(e,t)}function se(e,t){const a=Wt(e.map(t));return[...e].sort((o,s)=>Zt(t(o),t(s),a))}async function Qt(e){const a=await(await k()).getAllFromIndex("notas","tema_id",e);return nt()==="titulo"?se(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function Lt(e){return(await k()).get("notas",e)}async function So(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).map(i=>({nota:i,tema:s}))))).flat()}async function ko(e,t){const a=await k(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const n=O(),i={id:oe(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:n,atualizado_em:n},c={id:oe(),nota_id:i.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:K(J(),1),status:"pendente",streak_facil:0,criado_em:n,atualizado_em:n},l=a.transaction(["notas","itens_revisao"],"readwrite");return await l.objectStore("notas").put(i),await l.objectStore("itens_revisao").put(c),await l.done,i}async function Lo(e,t){const a=await k(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=O(),await a.put("notas",o))}async function Ao(e){const t=await k(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=O(),await t.put("notas",a),a.favorito):!1}async function qo(e){const t=await k(),a=await t.getAllFromIndex("itens_revisao","nota_id",e),o=t.transaction(["notas","itens_revisao"],"readwrite");await o.objectStore("notas").delete(e);for(const s of a)await o.objectStore("itens_revisao").delete(s.id);await o.done}async function Jt(){var n;const e=await k(),a=(await e.getAll("notas")).filter(i=>!("titulo"in i)||!i.titulo);if(a.length===0)return 0;const o=O(),s=e.transaction("notas","readwrite");for(const i of a)await s.store.put({...i,titulo:((n=i.fonte)==null?void 0:n.trim())||"Sem título",titulo_revisado:!1,favorito:i.favorito??!1,atualizado_em:o});return await s.done,a.length}function v(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ce(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const Yt="_sem-categoria_";function To(e){return e.trim()===""?Yt:encodeURIComponent(e)}function Mo(e){return e===Yt?"":decodeURIComponent(e)}function Co(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function Io(){const e=Co();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:Mo(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function Do(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function M(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function No(e){M(e)}function Po(e){window.addEventListener("hashchange",e)}function ie(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function I(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const jo={hoje:ie('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:ie('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:ie('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:ie('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:ie('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:ie('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},x={backup:I('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:I('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:I('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:I('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:I('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:I('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:I('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:I('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:I('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:I('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:I('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:I('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:I('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:I('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:I('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:I('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:I('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:I('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:I('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:I('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:I('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:I('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:I('<path d="M20 6L9 17l-5-5"/>'),chart:I('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:I('<path d="M4 6h16M4 12h11M4 18h6"/>')};async function zo(e,t){var c,l,d;const a=await ct(),o=a.length===0;e.innerHTML=`
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
            <button class="profile-card" role="listitem" data-id="${v(u.id)}">
              <span class="profile-avatar" aria-hidden="true">${v(Ro(u.nome))}</span>
              <span class="profile-card__name">${v(u.nome)}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(u=>{u.addEventListener("click",()=>{const r=u.dataset.id,b=a.find(f=>f.id===r);b&&t(b)})});const s=e.querySelector("#form-novo-perfil-picker"),n=e.querySelector("#input-novo-perfil-picker");o&&n.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",n.focus()}),(l=e.querySelector("#btn-cancelar-perfil-picker"))==null||l.addEventListener("click",()=>{s.style.display="none"});const i=async()=>{const u=n.value.trim();if(!u)return;const r=await Gt(u);t(r)};(d=e.querySelector("#btn-salvar-perfil-picker"))==null||d.addEventListener("click",i),n.addEventListener("keydown",u=>{u.key==="Enter"&&i()})}function Ro(e){return e.trim().slice(0,1).toUpperCase()}const re=["1","7","30","180"],Ie={1:1,7:7,30:30,180:180};function Fo(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=re.indexOf(e);if(t==="dificil"){const d=re[Math.max(0,s-1)];return{estagio:d,streak_facil:0,data_agendada:K(o,Ie[d]),aposentado:!1}}if(t==="medio"){const d=re[Math.min(re.length-1,s+1)];return{estagio:d,streak_facil:0,data_agendada:K(o,Ie[d]),aposentado:!1}}const n=a+1,i=s+2,c=i<=re.length-1?re[i]:"consulta",l=n>=2?"consulta":c;return l==="consulta"?{estagio:"consulta",streak_facil:n,aposentado:!0}:{estagio:l,streak_facil:n,data_agendada:K(o,Ie[l]),aposentado:!1}}async function ea(e){const t=await k(),a=J(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(p=>p.data_agendada<=a),n=Array.from(new Set(s.map(p=>p.nota_id))),i=await Promise.all(n.map(p=>t.get("notas",p))),c=new Map(i.filter(p=>!!p).map(p=>[p.id,p])),l=Array.from(new Set(Array.from(c.values()).map(p=>p.tema_id))),d=await Promise.all(l.map(p=>t.get("temas",p))),u=new Map(d.filter(p=>!!p).map(p=>[p.id,p])),r=Array.from(new Set(Array.from(u.values()).map(p=>p.espaco_id))),b=await Promise.all(r.map(p=>t.get("espacos",p))),f=new Map(b.filter(p=>!!p).map(p=>[p.id,p])),h=[];for(const p of s){const _=c.get(p.nota_id),L=_&&u.get(_.tema_id),w=L&&f.get(L.espaco_id);!_||!L||!w||h.push({item:p,nota:_,tema:L,espaco:w})}return h.sort((p,_)=>p.tema.criado_em.localeCompare(_.tema.criado_em)||p.nota.criado_em.localeCompare(_.nota.criado_em)),h}async function Oo(e,t,a){const o=await k(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const n=J(),i=Fo(s.estagio,t,s.streak_facil,n),c=O(),l={...s,status:"feita",avaliacao:t,data_concluida:n,duracao_segundos:a,atualizado_em:c},d={id:oe(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:i.estagio,data_agendada:i.aposentado?n:i.data_agendada,status:i.aposentado?"feita":"pendente",streak_facil:i.streak_facil,criado_em:c,atualizado_em:c},u=o.transaction("itens_revisao","readwrite");return await u.store.put(l),await u.store.put(d),await u.done,i}async function Ho(e){const t=await k(),a=J();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function Bo(e){const t=await k(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(i=>i.status==="pendente");if(a.length===0)return;const o=J(),s=O(),n=t.transaction("itens_revisao","readwrite");for(const i of a)await n.store.put({...i,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await n.done}const Se=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],At={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},Vo=new RegExp(`\\[([^\\]]+)\\]\\{(${Se.join("|")})\\}`,"g");function We(e){let t=v(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(Vo,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Uo(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,n=s[s.length-1];a.push({level:o.level,nodes:n?n.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function ta(e){return`<ul>${e.map(t=>`<li>${We(t.text)}${t.children.length>0?ta(t.children):""}</li>`).join("")}</ul>`}function ke(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(ta(Uo(o))),o=[])}let n=[];function i(){n.length>0&&(a.push(`<p>${We(n.join(`
`)).replace(/\n/g,"<br>")}</p>`),n=[])}for(const c of t){const l=c.trim();if(l===""){i(),s();continue}const d=/^(#{1,3})\s+(.*)$/.exec(l);if(d){i(),s();const r=d[1].length;a.push(`<h${r}>${We(d[2])}</h${r}>`);continue}const u=/^[-*]\s+(.*)$/.exec(l);if(u){i();const r=c.length-c.trimStart().length;o.push({level:Math.floor(r/2),text:u[1]});continue}s(),n.push(l)}return i(),s(),a.join(`
`)}function lt(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(lt).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Se.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function Ze(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...Ze(s,t+1));continue}if(s.tagName!=="LI")continue;const n=s,i=Array.from(n.children).filter(d=>d.tagName==="UL"),c=n.cloneNode(!0);c.querySelectorAll("ul").forEach(d=>d.remove());const l=lt(c).trim();l&&a.push(`${"  ".repeat(t)}- ${l}`);for(const d of i)a.push(...Ze(d,t+1));o=n}return a}function qt(e){if(e.tagName==="UL")return Ze(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=lt(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function Go(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=qt(o);s.length>0&&t.push(s.join(`
`))}else t.push(...qt(o))}return t.filter(Boolean).join(`

`)}const Ko=30;function aa(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=K(J(),Ko);return e.validade_ate<=t}const pe=8;function Wo(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function oa(e){return Wo(e)%pe}function j(e){return`var(--accent-${oa(e)})`}function sa(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function na(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=oa(o.id);for(let n=0;n<pe&&t.has(s);n++)s=(s+1)%pe;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const Zo=5*60;let B=null;function ia(){B&&(document.hidden?B.retomadoEm!=null&&(B.acumuladoMs+=Date.now()-B.retomadoEm,B.retomadoEm=null):B.retomadoEm==null&&(B.retomadoEm=Date.now()))}function Xo(e){B&&B.itemId===e||(_e(),B={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",ia))}function Qo(){if(!B)return;let e=B.acumuladoMs;return B.retomadoEm!=null&&(e+=Date.now()-B.retomadoEm),Math.min(Zo,Math.round(e/1e3))}function _e(){B&&document.removeEventListener("visibilitychange",ia),B=null}function ra(e){const t=J();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${me(e.data_agendada,t)} dia(s)">${x.alert} atrasada</span>`}async function Tt(e,t){const a=await ea(t.perfilId);await we(e,t,a)}async function we(e,t,a){var d;_e(),window.scrollTo({top:0});const o=await Ho(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>M("espacos"));return}const i=new Set(a.map(u=>u.espaco.id)).size>1,c=new Map;for(const u of a){const r=c.get(u.tema.id)??[];r.push(u),c.set(u.tema.id,r)}const l=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=l+Array.from(c.values()).map(u=>{const r=u[0].tema,b=u[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${j(r.id)}">
            <span class="color-dot" style="--dot-color:${j(r.id)}"></span>
            ${v(r.nome)}
            ${i?`<span class="queue-group__espaco"> · ${v(b.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${u.map(f=>`
              <button class="item-row" data-id="${v(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${j(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${x.star} `:""}${v(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${ra(f.item)}
                ${aa(f.nota)?`<span class="badge badge--muted">${x.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(u=>{u.addEventListener("click",()=>{const r=a.find(b=>b.item.id===u.dataset.id);r&&ca(e,t,r,a,o)})})}function ca(e,t,a,o,s=0,n=!1){var d,u,r;Xo(a.item.id),n||window.scrollTo({top:0});const i=aa(a.nota),c=s+o.length,l=c>0?Math.round(s/c*100):0;e.innerHTML=`
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
        ${v(a.tema.nome)}${n&&a.nota.fonte?` · ${v(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${x.star} `:""}${v(a.nota.titulo||"(sem título)")}
        ${ra(a.item)}
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
  `,(d=e.querySelector("[data-voltar]"))==null||d.addEventListener("click",()=>void we(e,t,o)),(u=e.querySelector("[data-editar]"))==null||u.addEventListener("click",()=>{_e(),M(`notas/${a.nota.id}`)}),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{ca(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(b=>{b.addEventListener("click",async()=>{const f=b.dataset.avaliacao,h=Qo();_e();const p=await Oo(a.item.id,f,h),_=await ea(t.perfilId);p.aposentado?Jo(e,t,_):await we(e,t,_)})})}function Jo(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${x.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void we(e,t,a))}function la(e){return e.trim().toLowerCase()}function dt(e){const t=new Map;for(const n of e){const i=n.categoria.trim(),c=la(i),l=t.get(c);l?l.itens.push(n):t.set(c,{display:i,itens:[n]})}const a=Array.from(t.values()).map(n=>({categoria:n.display,itens:n.itens})),o=a.map(n=>n.categoria),s=new Map;Xt(o.filter(n=>n!=="")).forEach((n,i)=>s.set(n,i)),a.sort((n,i)=>n.categoria===""&&i.categoria!==""?1:i.categoria===""&&n.categoria!==""?-1:(s.get(n.categoria)??0)-(s.get(i.categoria)??0));for(const n of a)n.itens.length>1&&(n.itens=se(n.itens,i=>i.nome));return a}function ut(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=la(o);t.has(s)||t.set(s,o)}return Xt(Array.from(t.values()))}async function da(e){const a=await(await k()).getAllFromIndex("espacos","perfil_id",e);return se(a,o=>o.nome)}const Yo=["Cursos","Livros","Bíblia"];async function ua(e){const t=await da(e);return ut([...Yo,...t.map(a=>a.categoria)])}async function mt(e){return(await k()).get("espacos",e)}function ma(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function es(e,t,a,o={}){const s=await k(),n=O(),i={id:oe(),perfil_id:e,nome:t,categoria:a,criado_em:n,atualizado_em:n,arquivado:!1};return ma(i,o),await s.put("espacos",i),i}async function ts(e,t,a,o={}){const s=await k(),n=await s.get("espacos",e);n&&(n.nome=t,n.categoria=a,ma(n,o),n.atualizado_em=O(),await s.put("espacos",n))}async function Xe(e,t){const a=await k(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?O():void 0,o.atualizado_em=O(),await a.put("espacos",o))}async function pa(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).length;return{temas:a.length,notas:o}}async function va(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(l=>t.getAllFromIndex("notas","tema_id",l.id)))).flat(),i=(await Promise.all(s.map(l=>t.getAllFromIndex("itens_revisao","nota_id",l.id)))).flat(),c=t.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");await c.objectStore("espacos").delete(e);for(const l of a)await c.objectStore("temas").delete(l.id);for(const l of s)await c.objectStore("notas").delete(l.id);for(const l of i)await c.objectStore("itens_revisao").delete(l.id);await c.done}function ne(e){return new Promise(t=>{var n,i;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${v(e.title)}</div>
        <p class="modal__message">${v(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${v(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${v(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(n=a.querySelector("#modal-confirm"))==null||n.addEventListener("click",()=>s(!0)),(i=a.querySelector("#modal-cancel"))==null||i.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function $e(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${v(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${v(a)}">${v(a)}</button>`).join("")}
    </div>
  `}function pt(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ce(o),o.focus()})})})}function D(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const fa="livro",ga=[{chave:"livro",label:"Livro",svg:D('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:D('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:D('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:D('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:D('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:D('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:D('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:D('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:D('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:D('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:D('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:D('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:D('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:D('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:D('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:D('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:D('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:D('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:D('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:D('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:D('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:D('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:D('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:D('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:D('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:D('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:D('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:D('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],Qe=new Map(ga.map(e=>[e.chave,e]));function de(e){return e&&Qe.get(e)||Qe.get(fa)}const as=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function os(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function ba(e){var a;const t=os(e);if(t.trim())return(a=as.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function ve(e){return e.icone&&Qe.has(e.icone)?e.icone:ba(`${e.nome??""} ${e.categoria??""}`)??fa}const Mt=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function ha(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${te(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${ga.map(s=>`
          <button
            type="button"
            class="espaco-icon-btn${s.chave===a?" is-selected":""}"
            data-icone="${te(s.chave)}"
            title="${te(s.label)}"
            aria-label="${te(s.label)}"
            aria-pressed="${s.chave===a}"
          >${s.svg}</button>
        `).join("")}
      </div>
      <input type="hidden" id="${te(t)}-icone" value="${te(a??"")}" />

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
        ${Array.from({length:pe},(s,n)=>`
          <button
            type="button"
            class="color-swatch${o===n?" is-selected":""}"
            data-cor="${n}"
            style="--swatch: var(--accent-${n});"
            title="${Mt[n]??`Cor ${n}`}"
            aria-label="${Mt[n]??`Cor ${n}`}"
            aria-pressed="${o===n}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${te(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function ya(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${le(a)}"]`);if(!s)return;const n=s.querySelector(`#${le(a)}-icone`),i=s.querySelector(`#${le(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),l=r=>{n&&(n.value=r);for(const b of c){const f=b.dataset.icone===r;b.classList.toggle("is-selected",f),b.setAttribute("aria-pressed",String(f))}};let d=!1;for(const r of c)r.addEventListener("click",()=>{d=!0,l(r.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(r=>{r.addEventListener("click",()=>{i&&(i.value=r.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(b=>{const f=b===r;b.classList.toggle("is-selected",f),b.setAttribute("aria-pressed",String(f))})})});const u=()=>{if(d)return;const r=ba(o());for(const b of c)b.classList.toggle("is-suggested",!!r&&b.dataset.icone===r);r&&l(r)};u(),e.querySelectorAll('input[type="text"]').forEach(r=>{r.addEventListener("input",u)})}function _a(e,t){var i,c;const a=e.querySelector(`[data-espaco-visual="${le(t)}"]`),o=(i=a==null?void 0:a.querySelector(`#${le(t)}-icone`))==null?void 0:i.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${le(t)}-cor`))==null?void 0:c.value.trim(),n={};if(o&&(n.icone=o),s!==void 0&&s!==""){const l=Number(s);Number.isInteger(l)&&l>=0&&l<pe&&(n.cor=l)}return n}function te(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function le(e){return e.replace(/["\\]/g,"\\$&")}async function be(e,t){var r,b,f,h;const a=await da(t.perfilId),o=a.filter(p=>!p.arquivado),s=a.filter(p=>p.arquivado),n=await ns(a.map(p=>p.id)),i=dt(o),c=na(o),l=await ua(t.perfilId);e.innerHTML=`
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
        ${$e(l,"input-categoria-espaco")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${ha({prefix:"novo-espaco"})}
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
        <summary class="category-group__title" ${p.categoria?`style="--group-accent:${j(p.categoria.toLowerCase())}"`:""}>
          <span class="category-group__label">
            ${p.categoria?`<span class="color-dot" style="--dot-color:${j(p.categoria.toLowerCase())}"></span>`:""}
            ${v(p.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${p.itens.map(_=>ss(_,n.get(_.id)??0,c.get(_.id)??j(_.id))).join("")}
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
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${j(p.id)}" aria-hidden="true">${de(ve(p)).svg}</span>
                  <span class="item-row__title">${v(p.nome)}</span>
                </span>
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
  `,pt(e),ya(e,{prefix:"novo-espaco",getTexto:()=>{var p,_;return`${((p=e.querySelector("#input-nome-espaco"))==null?void 0:p.value)??""} ${((_=e.querySelector("#input-categoria-espaco"))==null?void 0:_.value)??""}`}});const d=e.querySelector("#form-novo-espaco"),u=()=>{var p;d.style.display="block",(p=e.querySelector("#input-nome-espaco"))==null||p.focus()};(r=e.querySelector("#btn-novo-espaco"))==null||r.addEventListener("click",u),(b=e.querySelector("#btn-empty-novo-espaco"))==null||b.addEventListener("click",u),(f=e.querySelector("#btn-cancelar-espaco"))==null||f.addEventListener("click",()=>{d.style.display="none"}),(h=e.querySelector("#btn-salvar-espaco"))==null||h.addEventListener("click",async()=>{const p=e.querySelector("#input-nome-espaco"),_=e.querySelector("#input-categoria-espaco"),L=p.value.trim();if(!L)return;const w=await es(t.perfilId,L,_.value.trim(),_a(e,"novo-espaco"));M(`espacos/${w.id}`)}),e.querySelectorAll("[data-open]").forEach(p=>{p.addEventListener("click",()=>M(`espacos/${p.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(p=>{p.addEventListener("click",async()=>{await Xe(p.dataset.archive,!0),be(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(p=>{p.addEventListener("click",async()=>{await Xe(p.dataset.unarchive,!1),be(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(p=>{p.addEventListener("click",async()=>{const _=p.dataset.excluir,L=p.dataset.nome??"",w=await pa(_);await ne({title:`Excluir "${L}"?`,message:`Isso vai apagar ${w.temas} tema(s) e ${w.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await va(_),be(e,t))})})}function ss(e,t,a){const o=de(ve(e));return`
    <div class="item-row" data-id="${v(e.id)}" style="--row-accent:${a}">
      <button class="item-row__main" data-open="${v(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${a}" aria-hidden="true">${o.svg}</span>
          <span class="item-row__title">${v(e.nome)}</span>
        </span>
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
  `}async function ns(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function wa(e){const a=await(await k()).getAllFromIndex("temas","espaco_id",e);return se(a,o=>o.nome)}async function $a(e){return(await k()).get("temas",e)}async function is(e,t,a){const o=await k(),s=O(),n={id:oe(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",n),n}async function rs(e,t,a){const o=await k(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=O(),await o.put("temas",s))}async function cs(e){const t=await k(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=O(),await t.put("temas",a),a.favorito):!1}async function ls(e){return{notas:(await(await k()).getAllFromIndex("notas","tema_id",e)).length}}async function ds(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat(),n=t.transaction(["temas","notas","itens_revisao"],"readwrite");await n.objectStore("temas").delete(e);for(const i of a)await n.objectStore("notas").delete(i.id);for(const i of s)await n.objectStore("itens_revisao").delete(i.id);await n.done}function us(e,t){let a=e.has(t)?t:K(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=K(a,-1);return o}function ms(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const ps=5;async function vs(e){const t=await k(),a=J(),o=K(a,-6),[s,n]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))]),i=s.filter(m=>m.avaliacao),c=i.filter(m=>m.data_concluida===a),l=c.length,d=c.reduce((m,S)=>m+(S.duracao_segundos??0),0),u=i.filter(m=>m.data_concluida&&m.data_concluida>=o&&m.data_concluida<=a).length,r=["1","7","30","180"].map(m=>({estagio:m,count:n.filter(S=>S.estagio===m).length})),b=[];for(let m=1;m<=7;m++){const S=K(a,m);b.push({data:S,count:n.filter(C=>C.data_agendada===S).length})}const f=K(a,-29),h=i.filter(m=>m.data_concluida>=f),p={facil:h.filter(m=>m.avaliacao==="facil").length,medio:h.filter(m=>m.avaliacao==="medio").length,dificil:h.filter(m=>m.avaliacao==="dificil").length,total:0};p.total=p.facil+p.medio+p.dificil;const _=new Set(i.map(m=>m.data_concluida)),L=us(_,a),w=[];for(let m=6;m>=0;m--)w.push(_.has(K(a,-m)));const P=i.filter(m=>m.estagio==="consulta").length,z=i.filter(m=>m.avaliacao==="dificil"),Z=Array.from(new Set(z.map(m=>m.nota_id))),V=await Promise.all(Z.map(m=>t.get("notas",m))),X=new Map(V.filter(m=>!!m).map(m=>[m.id,m.tema_id])),W=new Map;for(const m of z){const S=X.get(m.nota_id);S&&W.set(S,(W.get(S)??0)+1)}const U=Array.from(W.keys()),T=(await Promise.all(U.map(m=>t.get("temas",m)))).filter(m=>!!m).map(m=>({temaId:m.id,temaNome:m.nome,count:W.get(m.id)})).sort((m,S)=>S.count-m.count).slice(0,ps),A=await t.getAllFromIndex("espacos","perfil_id",e),R=A.filter(m=>!m.arquivado).length,E=(await Promise.all(A.map(m=>t.getAllFromIndex("temas","espaco_id",m.id)))).flat(),q=E.length,y=(await Promise.all(E.map(m=>t.getAllFromIndex("notas","tema_id",m.id)))).reduce((m,S)=>m+S.length,0);return{revisoesHoje:l,revisoesUltimos7Dias:u,streakDias:L,diasAtivosUltimos7:w,rankingDificeis:T,espacosAtivos:R,totalTemas:q,totalNotas:y,itensEmConsulta:P,porEstagio:r,tempoHojeSegundos:d,cargaProximos7:b,retencao30:p}}async function fs(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(i=>t.getAllFromIndex("notas","tema_id",i.id)))).flat();return(await Promise.all(s.map(i=>t.getAllFromIndex("itens_revisao","nota_id",i.id)))).flat().reduce((i,c)=>i+(c.duracao_segundos??0),0)}async function gs(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,n)=>s+(n.duracao_segundos??0),0)}function Ea(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${v(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${v(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=n=>{n.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()})}const Ct=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}];function bs(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function xa(e,t,a,o){var s;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra testar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o);return}hs(e,t,a,o)}function hs(e,t,a,o){var s;e.innerHTML=`
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
          ${Ct.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const i=Ct.find(l=>l.key===n.dataset.tier),c=bs(t).slice(0,Math.min(i.n,t.length));Je(e,c,0,a,o)})})}function Je(e,t,a,o,s,n=!1){var c,l,d;if(a>=t.length){ys(e,t.length,o,s);return}const i=t[a];e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Encerrar avaliação</button>
    </div>
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${v(i.tema.nome)} · ${a+1} de ${t.length}</div>
      <div class="review-card__titulo">${i.nota.favorito?`${x.star} `:""}${v(i.nota.titulo||"(sem título)")}</div>
      ${n?`
        <div class="review-card__content markdown-preview">${ke(i.nota.conteudo)}</div>
        <button class="btn btn--primary" id="btn-proxima" type="button">${a+1<t.length?"Próxima":"Terminar"}</button>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(l=e.querySelector("#btn-revelar"))==null||l.addEventListener("click",()=>{Je(e,t,a,o,s,!0)}),(d=e.querySelector("#btn-proxima"))==null||d.addEventListener("click",()=>{Je(e,t,a+1,o,s,!1)})}function ys(e,t,a,o){var s;e.innerHTML=`
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
  `,(s=e.querySelector("#btn-terminar"))==null||s.addEventListener("click",o)}function vt(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${de(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${j(t.colorKey)}"></span>`:""}${v(t.label)}`,n=a===e.length-1,i=t.route&&!n?`<button class="link" data-crumb="${v(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?i:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${i}`}).join("")}
    </div>
  `}function ft(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>M(t.dataset.crumb))})}async function he(e,t){var w,P,z,Z,V,X,W,U,$,T,A,R,G;const a=await mt(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await wa(t),s=await _s(o.map(E=>E.id)),n=dt(o),i=await ua(a.perfil_id),c=ut(o.map(E=>E.categoria)),l=[...o].sort((E,q)=>q.criado_em.localeCompare(E.criado_em))[0],d=((w=l==null?void 0:l.categoria)==null?void 0:w.trim())||void 0,u=((P=l==null?void 0:l.nome)==null?void 0:P.trim())||void 0,r=sa(a.cor,j(a.id)),b=de(ve(a));e.innerHTML=`
    ${vt([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:b.chave,iconColor:r}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${r}" aria-hidden="true">${b.svg}</span>${v(a.nome)}
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
        ${$e(i,"input-categoria-espaco-editar")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${ha({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
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
        <input class="input${u?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${v(u??"")}" />
        ${u?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema">Categoria (opcional)</label>
        <input class="input${d?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${v(d??"")}" />
        ${d?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
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
    `:n.map(E=>`
      <details class="category-group">
        <summary class="category-group__title" ${E.categoria?`style="--group-accent:${j(E.categoria.toLowerCase())}"`:""}>
          <span class="category-group__label">
            ${E.categoria?`<span class="color-dot" style="--dot-color:${j(E.categoria.toLowerCase())}"></span>`:""}
            ${v(E.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${v(E.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${v(To(E.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${E.itens.map(q=>`
            <button class="item-row" data-open="${v(q.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${j(E.categoria?E.categoria.toLowerCase():q.id)}">
              <span class="item-row__main">
                <span class="item-row__title">${q.favorito?`${x.star} `:""}${v(q.nome)}</span>
                <span class="item-row__meta">${s.get(q.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `).join("")}
  `,ft(e),pt(e),ya(e,{prefix:"editar-espaco",getTexto:()=>{var E,q;return`${((E=e.querySelector("#input-nome-espaco-editar"))==null?void 0:E.value)??""} ${((q=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:q.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(E=>{E.addEventListener("click",q=>{q.preventDefault(),q.stopPropagation(),M(`espacos/${t}/pdf/${E.dataset.pdfCategoria}`)})}),(z=e.querySelector("#btn-arquivar"))==null||z.addEventListener("click",async()=>{!a.arquivado&&!await ne({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await Xe(a.id,!a.arquivado),he(e,t))});const f=e.querySelector("#form-editar-espaco");(Z=e.querySelector("#btn-editar"))==null||Z.addEventListener("click",()=>{var E;f.style.display="block",(E=e.querySelector("#input-nome-espaco-editar"))==null||E.focus()}),(V=e.querySelector("#btn-cancelar-edicao"))==null||V.addEventListener("click",()=>{f.style.display="none"}),(X=e.querySelector("#btn-salvar-edicao"))==null||X.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-espaco-editar").value.trim(),q=e.querySelector("#input-categoria-espaco-editar").value.trim();E&&(await ts(a.id,E,q,_a(e,"editar-espaco")),he(e,t))}),(W=e.querySelector("#btn-detalhes"))==null||W.addEventListener("click",async()=>{const E=Array.from(s.values()).reduce((C,F)=>C+F,0),q=H(),g=await fs(a.id);let y,m,S;if(a.arquivado&&a.arquivado_em){const C=me(H(new Date(a.criado_em)),H(new Date(a.arquivado_em)));y=String(C),m="Dias até arquivar",S=`Criado em ${ee(a.criado_em)} · arquivado em ${ee(a.arquivado_em)}`}else if(a.arquivado)y="—",m="Duração",S=`Criado em ${ee(a.criado_em)} · arquivado antes desse registro de data existir`;else{const C=me(H(new Date(a.criado_em)),q);y=String(C),m=C===1?"Dia ativo":"Dias ativo",S=`Criado em ${ee(a.criado_em)}`}Ea({title:a.nome,bodyHtml:`
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
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${rt(g)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${y}</div>
            <div class="stat-tile__label">${m}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${S} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(U=e.querySelector("#btn-avaliar"))==null||U.addEventListener("click",async()=>{const E=await So(a.id);xa(e,E,a.nome,()=>he(e,t))}),($=e.querySelector("#btn-excluir"))==null||$.addEventListener("click",async()=>{const E=await pa(a.id);await ne({title:`Excluir "${a.nome}"?`,message:`Isso vai apagar ${E.temas} tema(s) e ${E.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await va(a.id),M("espacos"))});const h=e.querySelector("#form-novo-tema"),p=()=>{var E;h&&(h.style.display="block"),(E=e.querySelector("#input-nome-tema"))==null||E.focus()};(T=e.querySelector("#btn-novo-tema"))==null||T.addEventListener("click",p),(A=e.querySelector("#btn-empty-novo-tema"))==null||A.addEventListener("click",p),(R=e.querySelector("#btn-cancelar-tema"))==null||R.addEventListener("click",()=>{h&&(h.style.display="none")});const _=e.querySelector("#input-nome-tema");u&&_&&_.addEventListener("input",()=>ce(_),{once:!0});const L=e.querySelector("#input-categoria-tema");d&&L&&L.addEventListener("input",()=>ce(L),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(E=>{E.addEventListener("click",q=>{var g;q.preventDefault(),q.stopPropagation(),h&&(h.style.display="block"),L&&(L.value=E.dataset.novoTemaCategoria,ce(L)),(g=e.querySelector("#input-nome-tema"))==null||g.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(G=e.querySelector("#btn-salvar-tema"))==null||G.addEventListener("click",async()=>{const E=e.querySelector("#input-nome-tema"),q=e.querySelector("#input-categoria-tema"),g=E.value.trim();if(!g)return;const y=await is(t,g,q.value.trim());M(`temas/${y.id}`)}),e.querySelectorAll("[data-open]").forEach(E=>{E.addEventListener("click",()=>M(`temas/${E.dataset.open}`))})}async function _s(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,n)=>o.set(s,a[n].length)),o}async function ws(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=await t.getAllFromIndex("temas","espaco_id",e),s=dt(o),n=nt()==="titulo",i=[];for(const c of s){const l=[];for(const d of c.itens){const u=await t.getAllFromIndex("notas","tema_id",d.id);n?se(u,b=>b.titulo):u.sort((b,f)=>b.criado_em.localeCompare(f.criado_em));const r=[];for(const b of u){const h=(await t.getAllFromIndex("itens_revisao","nota_id",b.id)).map(p=>p.avaliacao).filter(p=>!!p);r.push({nota:b,fraca:ms(h)})}l.push({tema:d,notas:r})}i.push({categoria:c.categoria,temas:l})}return{espaco:a,grupos:i}}function De(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Se.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const It=["•","◦","▪"];function Sa(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${De(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const n=Math.floor((t.length-t.trimStart().length)/2),i=It[Math.min(n,It.length-1)];return`${"  ".repeat(n)}${i} ${De(s[1])}`}return De(a)}).join(`
`)}function $s(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",Sa(e.conteudo)),t.join(`
`).trim()}function Es(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of t)if(o.temas.length!==0){a.push("",`▸ ${(o.categoria||"Sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.tema.favorito?"⭐ ":""}*${s.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const n of s.notas){const i=`${n.nota.favorito?"⭐ ":""}${n.fraca?"⚠ ":""}`;a.push("",`${i}*${n.nota.titulo||"(sem título)"}*`),n.nota.fonte&&a.push(`_${n.nota.fonte}_`),a.push(Sa(n.nota.conteudo))}}}return a.join(`
`).trim()}async function xs(e,t,a){var u,r;const o=await ws(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,n=a===void 0?o.grupos:o.grupos.filter(b=>b.categoria===a),i=Es(s,n),c=sa(s.cor,j(s.id)),l=de(ve(s));e.innerHTML=`
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
        <span class="espaco-icon-inline" style="--badge-accent:${c}" aria-hidden="true">${l.svg}</span>${v(s.nome)}
      </h1>
      <p class="pdf-meta">
        ${a!==void 0?`Categoria: ${v(a||"Sem categoria")} · `:""}Gerado em ${ee(H()+"T00:00:00Z")}
      </p>

      ${n.every(b=>b.temas.length===0)?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:n.map(b=>{const f=b.categoria?b.categoria.toLowerCase():s.id;return`
        <section class="pdf-category" style="--cat-accent:${j(f)}">
          <div class="pdf-category__title">
            <span class="color-dot" style="--dot-color:${j(f)}"></span>${v(b.categoria||"Sem categoria")}
          </div>
          ${b.temas.map(h=>{const p=h.tema.categoria?h.tema.categoria.toLowerCase():h.tema.id;return`
            <section class="pdf-tema" style="--tema-accent:${j(p)}">
              <div class="pdf-tema__title">${h.tema.favorito?`${x.star} `:""}${v(h.tema.nome)}</div>
              ${h.notas.length===0?'<p class="text-muted">Sem notas.</p>':h.notas.map(_=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${_.nota.favorito?`${x.star} `:""}${_.fraca?`${x.alert} Reforçar — `:""}${v(_.nota.titulo||"(sem título)")}
                  </div>
                  ${_.nota.fonte?`<div class="pdf-nota__meta">${v(_.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${ke(_.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `}).join("")}
        </section>
      `}).join("")}
    </article>
  `,(u=e.querySelector("[data-back]"))==null||u.addEventListener("click",()=>M(`espacos/${t}`)),(r=e.querySelector("#btn-imprimir"))==null||r.addEventListener("click",()=>window.print());const d=e.querySelector("#btn-copiar");d==null||d.addEventListener("click",async()=>{const b=d.textContent;try{await navigator.clipboard.writeText(i),d.textContent="Copiado!"}catch{d.textContent="Não foi possível copiar"}setTimeout(()=>{d.textContent=b},1800)})}async function ye(e,t){var d,u,r,b,f,h,p,_,L;const a=await $a(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await mt(a.espaco_id),s=await Qt(t),n=o?await wa(o.id):[],i=ut(n.map(w=>w.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${vt([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${j(c)}"></span>${a.favorito?`${x.star} `:""}${v(a.nome)}
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
        ${$e(i,"input-categoria-tema-editar")}
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
        ${s.map(w=>`
          <button class="item-row" data-open="${v(w.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${j(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${w.favorito?`${x.star} `:""}${v(w.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${v(w.fonte||"Sem fonte")}${w.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${w.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,ft(e),pt(e),(d=e.querySelector("#btn-nova-nota"))==null||d.addEventListener("click",()=>M(`temas/${t}/nova-nota`)),(u=e.querySelector("#btn-empty-nova-nota"))==null||u.addEventListener("click",()=>M(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(w=>{w.addEventListener("click",()=>M(`notas/${w.dataset.open}`))}),(r=e.querySelector("#btn-favoritar-tema"))==null||r.addEventListener("click",async()=>{await cs(a.id),ye(e,t)}),(b=e.querySelector("#btn-detalhes-tema"))==null||b.addEventListener("click",async()=>{const w=await gs(a.id),P=me(H(new Date(a.criado_em)),H());Ea({title:a.nome,bodyHtml:`
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
            <div class="stat-tile__value">${P}</div>
            <div class="stat-tile__label">${P===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${ee(a.criado_em)}</p>
      `})}),(f=e.querySelector("#btn-avaliar-tema"))==null||f.addEventListener("click",()=>{const w=s.map(P=>({nota:P,tema:a}));xa(e,w,a.nome,()=>ye(e,t))});const l=e.querySelector("#form-editar-tema");(h=e.querySelector("#btn-editar-tema"))==null||h.addEventListener("click",()=>{var w;l.style.display="block",(w=e.querySelector("#input-nome-tema-editar"))==null||w.focus()}),(p=e.querySelector("#btn-cancelar-edicao-tema"))==null||p.addEventListener("click",()=>{l.style.display="none"}),(_=e.querySelector("#btn-salvar-edicao-tema"))==null||_.addEventListener("click",async()=>{const w=e.querySelector("#input-nome-tema-editar").value.trim(),P=e.querySelector("#input-categoria-tema-editar").value.trim();w&&(await rs(a.id,w,P),ye(e,t))}),(L=e.querySelector("#btn-excluir-tema"))==null||L.addEventListener("click",async()=>{const w=await ls(a.id);await ne({title:`Excluir "${a.nome}"?`,message:`Isso vai apagar ${w.notas} nota(s), com todo o histórico de revisão delas.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await ds(a.id),M(`espacos/${a.espaco_id}`))})}function fe(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${v(e)}</div>
    </details>
  `}let Le=!1,Ye=null;function Ss(e){Le=e}function Dt(){Le=!1}function ks(e){Ye=e}function ue(){return Le?Ye?Ye():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function Ls(){window.addEventListener("beforeunload",e=>{Le&&(e.preventDefault(),e.returnValue="")})}const As={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function Ne(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function Ee(e,t){var $,T,A,R,G,E,q;const a=t.mode==="nova"?t.temaId:($=await Lt(t.notaId))==null?void 0:$.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await $a(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await mt(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${v(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(T=e.querySelector("#btn-voltar-arquivado"))==null||T.addEventListener("click",()=>M(`temas/${a}`));return}const n=t.mode==="editar"?await Lt(t.notaId):void 0,i=n?await qs(n.id):!1,c=t.mode==="nova"?(await Qt(a)).at(-1):void 0,l=c==null?void 0:c.titulo,d=c==null?void 0:c.fonte;e.innerHTML=`
    ${vt([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(n==null?void 0:n.titulo)||"Editar nota"}])}

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
        <input class="input${l?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${v((n==null?void 0:n.titulo)??l??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${l?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${fe("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${d?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${v((n==null?void 0:n.fonte)??d??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${d?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
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
            ${Se.map(g=>`<button type="button" class="color-picker__swatch" data-cor="${g}" style="--dot-color:${As[g]}" title="${v(At[g])}" aria-label="${v(At[g])}"></button>`).join("")}
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
  `;const u=`temas/${a}`;ft(e),(A=e.querySelector("#btn-cancelar"))==null||A.addEventListener("click",()=>{ue()&&(Dt(),M(u))});const r=e.querySelector("#input-conteudo"),b=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),h=()=>Ss(!0);b.addEventListener("input",h),f.addEventListener("input",h),r.addEventListener("input",h),ks(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),l&&b.addEventListener("input",()=>ce(b),{once:!0}),d&&f.addEventListener("input",()=>ce(f),{once:!0}),r.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function p(g){var m,S;let y=((S=(m=window.getSelection())==null?void 0:m.getRangeAt(0))==null?void 0:S.commonAncestorContainer)??null;for(;y&&y!==r;){if(y instanceof HTMLElement&&y.tagName===g)return!0;y=y.parentNode}return!1}function _(){const g=window.getSelection();if(!g||g.rangeCount===0)return;let y=g.getRangeAt(0).commonAncestorContainer;for(;y&&y!==r;){if(y instanceof HTMLElement&&y.tagName==="LI"){const m=document.createRange();m.selectNodeContents(y),m.collapse(!1),g.removeAllRanges(),g.addRange(m);return}y=y.parentNode}}function L(){r.querySelectorAll("p").forEach(g=>{g.querySelector("ul")&&g.replaceWith(...Array.from(g.childNodes))})}function w(){const g=window.getSelection(),y=g.getRangeAt(0);y.deleteContents();const m=document.createElement("br");y.insertNode(m);const S=document.createTextNode("​");m.after(S);const C=document.createRange();return C.setStart(S,1),C.collapse(!0),g.removeAllRanges(),g.addRange(C),{br:m,ancora:S}}function P(){if(!z)return;const{br:g,ancora:y}=z;if(z=null,!document.contains(y))return;const m=y.parentNode;if(!m)return;const S=Array.from(m.childNodes).indexOf(y);y.remove();const C=window.getSelection();if(!C||!document.contains(g))return;const F=document.createRange();F.setStart(m,S),F.collapse(!0),C.removeAllRanges(),C.addRange(F)}let z=null;r.addEventListener("keydown",g=>{if(g.key!=="Enter"||g.shiftKey||g.ctrlKey||g.metaKey||g.altKey||p("LI")){z=null;return}g.preventDefault(),z&&document.contains(z.br)?(z.ancora.remove(),z.br.remove(),document.execCommand("insertParagraph"),z=null):z=w()}),r.addEventListener("mousedown",()=>{z=null}),r.addEventListener("keydown",g=>{g.key!=="Tab"||!p("LI")||(g.preventDefault(),P(),document.execCommand(g.shiftKey?"outdent":"indent"),L())});function Z(){var g;r.classList.toggle("is-empty",!((g=r.textContent)!=null&&g.trim()))}r.addEventListener("input",()=>{if(r.childNodes.length===0){r.innerHTML="<p><br></p>";const g=r.firstChild,y=document.createRange();y.setStart(g,0),y.collapse(!0);const m=window.getSelection();m==null||m.removeAllRanges(),m==null||m.addRange(y)}Z()}),Z(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(g=>{g.addEventListener("mousedown",y=>y.preventDefault()),g.addEventListener("click",()=>{P();const y=g.dataset.cmd;if(y==="strikeThrough")document.execCommand("strikeThrough");else if(y==="createLink"){const m=window.getSelection();if(!m||m.isCollapsed){r.focus();return}const S=prompt("URL do link:","https://");S&&S.trim()&&document.execCommand("createLink",!1,S.trim())}else y==="removeFormat"?document.execCommand("removeFormat"):document.execCommand(y);y==="insertUnorderedList"&&(L(),_()),r.focus(),U()})}),e.querySelectorAll(".color-picker__swatch").forEach(g=>{g.addEventListener("mousedown",y=>y.preventDefault()),g.addEventListener("click",()=>{P();const y=g.dataset.cor,m=window.getSelection();if(!m||m.rangeCount===0||m.isCollapsed)return;const S=m.getRangeAt(0);if(!r.contains(S.commonAncestorContainer))return;const C=S.extractContents();Ne(C);const F=document.createElement("span");F.className=`text-color text-color--${y}`,F.appendChild(C),S.insertNode(F),m.removeAllRanges();const Q=document.createRange();Q.selectNodeContents(F),m.addRange(Q),r.focus()})});const V=e.querySelector("[data-cor-limpar]");V.addEventListener("mousedown",g=>g.preventDefault()),V.addEventListener("click",()=>{P();const g=window.getSelection();if(!g||g.rangeCount===0)return;const y=g.getRangeAt(0);if(r.contains(y.commonAncestorContainer)){if(y.collapsed){let m=y.commonAncestorContainer;for(;m&&m!==r;){if(m instanceof HTMLElement&&m.classList.contains("text-color")){const S=m.parentNode;if(S){const C=document.createDocumentFragment();Array.from(m.childNodes).forEach(F=>C.appendChild(F)),S.replaceChild(C,m),Ne(S)}break}m=m.parentNode}}else{const m=y.extractContents();Ne(m),y.insertNode(m)}r.focus()}});const X=e.querySelector("#input-pode-desatualizar"),W=e.querySelector("#wrapper-validade");X.addEventListener("change",()=>{W.style.display=X.checked?"flex":"none"});function U(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(y=>{const m=y.dataset.cmd;try{m==="bold"||m==="italic"||m==="underline"||m==="strikeThrough"||m==="insertUnorderedList"?y.setAttribute("aria-pressed",document.queryCommandState(m)?"true":"false"):y.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===r&&U()}),r.addEventListener("keyup",U),r.addEventListener("mouseup",U),r.addEventListener("focus",U),r.addEventListener("keydown",g=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?g.metaKey:g.ctrlKey))return;let S=!0;switch(g.key.toLowerCase()){case"b":g.preventDefault(),document.execCommand("bold");break;case"i":g.preventDefault(),document.execCommand("italic");break;case"u":g.preventDefault(),document.execCommand("underline");break;case"s":g.preventDefault(),document.execCommand("strikeThrough");break;case"k":g.preventDefault(),P();const C=window.getSelection();if(C&&!C.isCollapsed){const F=prompt("URL do link:","https://");F&&F.trim()&&document.execCommand("createLink",!1,F.trim())}break;case"z":g.preventDefault(),g.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":g.preventDefault(),document.execCommand("redo");break;default:S=!1}S&&U()}),(R=e.querySelector("#btn-salvar"))==null||R.addEventListener("click",async()=>{const g=b.value.trim(),y=Go(r).trim();let m=null;const S=(Q,Na)=>{var bt;Q.classList.add("input--error"),Q.setAttribute("aria-invalid","true");const qe=(bt=Q.closest(".field"))==null?void 0:bt.querySelector(".field__error");qe&&(qe.textContent=Na,qe.style.display="block"),m||(m=Q)},C=Q=>{Q.classList.remove("input--error"),Q.removeAttribute("aria-invalid")};if(g||S(b,"Informe um título para a nota."),y||S(r,"Informe o conteúdo da nota."),m){m.focus();return}C(b),C(r);const F={titulo:g,conteudo:y,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:X.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await ko(a,F):await Lo(t.notaId,F),Dt(),M(u)}),t.mode==="editar"&&n){(G=e.querySelector("#btn-favoritar-nota"))==null||G.addEventListener("click",async()=>{await Ao(n.id),Ee(e,t)}),(E=e.querySelector("#btn-parar-revisar"))==null||E.addEventListener("click",async()=>{await Bo(n.id),Ee(e,t)});const g=e.querySelector("#btn-compartilhar-nota");g==null||g.addEventListener("click",async()=>{const y=$s(n);if(navigator.share){try{await navigator.share({title:n.titulo||"Nota",text:y})}catch{}return}const m=g.textContent;try{await navigator.clipboard.writeText(y),g.textContent="Copiado!"}catch{g.textContent="Não foi possível copiar"}setTimeout(()=>{g.textContent=m},1800)}),(q=e.querySelector("#btn-excluir-nota"))==null||q.addEventListener("click",async()=>{await ne({title:"Excluir esta nota?",message:`Isso vai apagar a nota e todo o seu histórico de revisões.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await qo(n.id),M(u))})}}async function qs(e){return(await(await k()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function Ts(e){return e.length===10?e:H(new Date(e))}function Ms(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function Cs(e){const t=new Set;for(const a of e)a&&t.add(Ts(a));return t}function ka(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Pe(e){return e.size}function Is(e,t,a=365,o=H()){const s=K(o,-a+1),n=[];let i=s;for(;i<=o;)n.push({date:i,count:(e.has(i)?1:0)+(t.has(i)?1:0),hasRevisao:e.has(i),hasCriacao:t.has(i)}),i=K(i,1);const c=Pe(e),l=Pe(t),d=Pe(ka(e,t));return{days:n,totalDiasRevisao:c,totalDiasCriacao:l,totalDiasAtividade:d}}async function La(e){const t=await k(),a=H(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const w=await t.getAllFromIndex("espacos","perfil_id",e),z=(await Promise.all(w.map(V=>t.getAllFromIndex("temas","espaco_id",V.id)))).flat();return(await Promise.all(z.map(V=>t.getAllFromIndex("notas","tema_id",V.id)))).flat()})()]),n=o.filter(w=>w.data_concluida).map(w=>w.data_concluida),i=Ms(n),c=Cs(s.map(w=>w.criado_em)),l=o.filter(w=>w.data_concluida===a).length,d=s.filter(w=>H(new Date(w.criado_em))===a).length,u=a.slice(0,4),r=a.slice(5,7),b=`${u}-${r}`,f=n.filter(w=>w.startsWith(b)).length,h=s.filter(w=>H(new Date(w.criado_em)).startsWith(b)).length,p=i.size,_=c.size,L=ka(i,c).size;return{datasRevisaoSet:i,datasCriacaoSet:c,totalDiasRevisao:p,totalDiasCriacao:_,totalDiasAtividade:L,notasCriadasHoje:d,revisoesFeitasHoje:l,notasCriadasEsteMes:h,revisoesFeitasEsteMes:f}}async function Ds(e,t=365){const a=await La(e);return Is(a.datasRevisaoSet,a.datasCriacaoSet,t)}function Ns(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function Ps(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const n=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let l=0;l<n;l++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const l of e)s.push(l),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(l=>`
          <div class="heatmap__col">
            ${l.map(d=>`
              <div class="heatmap__cell heatmap__cell--${Ns(d.count)}${d.date?"":" heatmap__cell--empty"}" title="${d.date?`${d.date}${d.count?` · ${d.count} atividade(s)`:""}${d.hasRevisao&&d.hasCriacao?" (revisão + criação)":d.hasRevisao?" (revisão)":d.hasCriacao?" (criação)":""}`:""}"></div>
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
        ${v(String(t))} dias estudados · ${v(String(a))} dias com criação de notas · ${v(String(e.filter(l=>l.count>0).length))} dias com atividade nos últimos ${v(String(e.length))} dias
      </p>
    </div>
  `}const js={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function zs(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Rs(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Fs(e,t){const a=await vs(t.perfilId),o=await La(t.perfilId),s=await Ds(t.perfilId,365),n=["dom","seg","ter","qua","qui","sex","sáb"],i=new Date().getDay(),c=Math.max(1,...a.cargaProximos7.map(d=>d.count)),l=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null;e.innerHTML=`
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
          ${a.diasAtivosUltimos7.map((d,u)=>{const r=(i-(6-u)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${d?"streak-hero__day--ativo":""}"></span>
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
        ${a.porEstagio.map(d=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${d.count}</div>
            <div class="stage-tile__label">${js[d.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${x.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(d=>`${d.count} em ${Rs(d.data)}`).join(", ")}">
        ${a.cargaProximos7.map(d=>{const u=zs(d.data);return`
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
          ${a.rankingDificeis.map((d,u)=>`
            <div class="rank-row">
              <span>${u+1}. ${v(d.temaNome)}</span>
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
      ${Ps(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `,e.querySelectorAll(".tabs__tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(u=>{u.setAttribute("aria-selected",String(u===d))}),e.querySelector("#tab-visao").style.display=d.dataset.tab==="visao"?"block":"none",e.querySelector("#tab-evolucao").style.display=d.dataset.tab==="evolucao"?"block":"none"})})}async function Os(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id))),s=[],n=[],i=new Map;for(let d=0;d<a.length;d++){const u=a[d],r=o[d];for(const b of r)i.set(b.id,u),b.favorito&&s.push({tema:b,espaco:u})}const c=o.flat(),l=await Promise.all(c.map(d=>t.getAllFromIndex("notas","tema_id",d.id)));for(let d=0;d<c.length;d++){const u=c[d],r=l[d],b=i.get(u.id);if(b)for(const f of r)f.favorito&&n.push({nota:f,tema:u,espaco:b})}return{temas:se(s,d=>d.tema.nome),notas:se(n,d=>d.nota.titulo||d.tema.nome)}}async function Hs(e,t){var d;const{temas:a,notas:o}=await Os(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>M("espacos"));return}const s=new Map;for(const u of a){const r=s.get(u.espaco.id)??{espaco:u.espaco,itens:[]};r.itens.push(u),s.set(u.espaco.id,r)}const n=new Map;for(const u of o){const r=n.get(u.tema.id)??{temaNome:u.tema.nome,espaco:u.espaco,itens:[]};r.itens.push(u),n.set(u.tema.id,r)}const i=new Map;for(const u of a)i.set(u.espaco.id,u.espaco);for(const u of o)i.set(u.espaco.id,u.espaco);const c=na([...i.values()]),l=u=>{const r=c.get(u.id)??j(u.id),b=de(ve(u));return`<span class="espaco-icon-inline" style="--badge-accent:${r}" aria-hidden="true">${b.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??j(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${l(u.espaco)}${v(u.espaco.nome)}
          </div>
          <div class="item-list">
            ${u.itens.map(r=>`
              <button class="item-row" data-tema="${v(r.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??j(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${v(r.tema.nome)}</span>
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
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??j(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${l(u.espaco)}${v(u.temaNome)} <span class="queue-group__espaco"> · ${v(u.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${u.itens.map(r=>`
              <button class="item-row" data-nota="${v(r.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??j(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${v(r.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${v(r.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(u=>{u.addEventListener("click",()=>M(`temas/${u.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(u=>{u.addEventListener("click",()=>M(`notas/${u.dataset.nota}`))})}const Bs=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Vs=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,Us=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,Gs=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      vale.</p>`}];function Ks(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${Bs}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Vs}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${Us}</pre>
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

      ${Gs.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function Ws(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,n=0,i=0;for(const c of t){const l=a.get(c.id);l?c.atualizado_em>l.atualizado_em?(a.set(c.id,c),o.push(c),n++):i++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:n,mantidos:i}}function Zs(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const Xs=["perfis","espacos","temas","notas","itens_revisao"],gt="memoriza-export",Aa=1;async function Qs(){const e=await k(),[t,a,o,s,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:n}}async function Js(e){const t=await k(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(r=>r.id)),i=(await t.getAll("temas")).filter(r=>s.has(r.espaco_id)),c=new Set(i.map(r=>r.id)),d=(await t.getAll("notas")).filter(r=>c.has(r.tema_id)),u=await t.getAllFromIndex("itens_revisao","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:i,notas:d,itens_revisao:u}}async function Ys(e){const t=await Js(e);return{formato:gt,versao:Aa,exportado_em:O(),escopo:"perfil",perfil_id:e,dados:t}}async function et(){const e=await Qs();return{formato:gt,versao:Aa,exportado_em:O(),escopo:"todos",dados:e}}function en(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${fo(e.exportado_em)}.json`}function Nt(e){const t=en(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function qa(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==gt||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Ta(e){const t=await k(),a={};for(const o of Xs){const s=await t.getAll(o),n=e.dados[o],i=Ws(s,n??[]);if(i.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const l of i.toWrite)await c.store.put(l);await c.done}a[o]={criados:i.criados,atualizados:i.atualizados,mantidos:i.mantidos}}return await Jt(),{...Zs(Object.values(a)),porLoja:a}}function tn(e){return e.replace(/-/g,"")}function an(e,t){const[a,o]=t.split(":");return`${tn(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function on(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function sn(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function nn(e){const t=an(J(),e),a=on(new Date),o=sn("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${oe()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function rn(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const cn="https://api.github.com",ln="Memoriza — sincronização de anotações",Ae="memoriza-sync.json";function dn(e){return(t,a={})=>fetch(`${cn}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function un(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&Ae in s.files))==null?void 0:o.id)??null}async function mn(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:ln,public:!1,files:{[Ae]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function pn(e,t){var s,n;const a=await e(`/gists/${t}`);return a.ok?((n=(s=(await a.json()).files)==null?void 0:s[Ae])==null?void 0:n.content)??null:null}async function vn(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[Ae]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function Ma(e){const t=dn(e);let a=Ft();if(!a){const i=await un(t);i&&(a=i,Oe(i))}let o=null,s=!1,n=await et();if(a){const i=await pn(t,a);if(i)try{const c=qa(i);o=await Ta(c),n=await et(),s=!0}catch{}}return a?await vn(t,a,JSON.stringify(n)):(a=await mn(t,JSON.stringify(n)),Oe(a)),Ot(O()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??fn(),push:!0,mesclouRemoto:s}}function fn(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function gn(e){const t=st();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const bn=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],hn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}];async function Y(e,t){var p,_,L,w,P,z,Z,V,X,W,U;const a=Xa(),o=Oa(),s=await ct(),n=Ua(t.perfil.id),i=ot(),c=Ht(),l=st(),d=Ft(),u=nt();e.innerHTML=`
    <div class="stack content-narrow content-wide">
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
            ${s.map($=>`
              <div class="settings-list-row" data-perfil-id="${v($.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${v($.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${v($.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${v($.id)}" data-nome="${v($.nome)}" class="danger" type="button">Excluir perfil</button>
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
              ${bn.map($=>`
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
              ${hn.map($=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${$.value}"
                  aria-pressed="${$.value===u}"
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
                ${o?`Último export: ${v(kt(o))}.`:"Nenhum export feito ainda."}
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
            ${l?`<div class="banner banner--success" style="margin-bottom:0;">${x.check} Última sincronização: ${v(kt(l))}${d?".":""}</div>`:i?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
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

  `,(p=e.querySelector("#btn-switch-profile"))==null||p.addEventListener("click",()=>{t.onSwitchProfile()}),(_=e.querySelector("#btn-como-usar"))==null||_.addEventListener("click",()=>M("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach($=>{$.addEventListener("click",()=>{const T=$.dataset.theme;Za(T),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(A=>{A.setAttribute("aria-pressed",String(A===$))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach($=>{$.addEventListener("click",()=>{Wa($.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(T=>{T.setAttribute("aria-pressed",String(T===$))})})}),(L=e.querySelector("#btn-export-profile"))==null||L.addEventListener("click",async()=>{const $=await Ys(t.perfil.id);Nt($),yt($.exportado_em),Y(e,t)}),(w=e.querySelector("#btn-export-all"))==null||w.addEventListener("click",async()=>{const $=await et();Nt($),yt($.exportado_em),Y(e,t)});const r=e.querySelector("#import-file");(P=e.querySelector("#btn-import"))==null||P.addEventListener("click",()=>{r==null||r.click()}),r==null||r.addEventListener("change",async()=>{const $=e.querySelector("#import-summary"),[T]=r.files??[];if(!(!T||!$))try{const A=await T.text(),R=qa(A),G=await Ta(R);$.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${G.criados} criados, ${G.atualizados} atualizados,
          ${G.mantidos} mantidos como estavam.
        </div>
      `}catch(A){$.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${v(A instanceof Error?A.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{r.value=""}});const b=e.querySelector("#form-novo-perfil");(z=e.querySelector("#btn-novo-perfil"))==null||z.addEventListener("click",()=>{var $;b.style.display="block",($=e.querySelector("#input-novo-perfil"))==null||$.focus()}),(Z=e.querySelector("#btn-cancelar-perfil"))==null||Z.addEventListener("click",()=>{b.style.display="none"}),(V=e.querySelector("#btn-salvar-perfil"))==null||V.addEventListener("click",async()=>{const T=e.querySelector("#input-novo-perfil").value.trim();T&&(await Gt(T),Y(e,t))}),e.querySelectorAll("[data-renomear]").forEach($=>{$.onclick=()=>{var g;const T=$.dataset.renomear,A=e.querySelector(`[data-perfil-id="${T}"]`),R=A==null?void 0:A.querySelector("[data-view-nome]");if(!A||!R)return;const G=((g=R.textContent)==null?void 0:g.trim())??"";R.innerHTML=`
        <input class="input" type="text" value="${v(G)}" maxlength="60" style="max-width:200px;" />
      `;const E=R.querySelector("input");E.focus(),E.select(),$.textContent="Salvar";const q=async()=>{const y=E.value.trim();y&&(await yo(T,y),T===t.perfil.id&&(t.perfil={...t.perfil,nome:y})),Y(e,t)};E.addEventListener("keydown",y=>{y.key==="Enter"&&q()}),$.onclick=q}}),e.querySelectorAll("[data-excluir-perfil]").forEach($=>{$.addEventListener("click",async()=>{const T=$.dataset.excluirPerfil,A=$.dataset.nome??"",R=await _o(T);await ne({title:`Excluir o perfil "${A}"?`,message:`Isso vai apagar ${R.espacos} espaço(s), ${R.temas} tema(s) e ${R.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await wo(T),T===t.perfil.id?t.onSwitchProfile():Y(e,t))})}),(X=e.querySelector("#btn-baixar-lembrete"))==null||X.addEventListener("click",()=>{const $=e.querySelector("#input-hora-lembrete").value||"19:00";Ga(t.perfil.id,$),rn(nn($))});const f=e.querySelector("#sync-status"),h=e.querySelector("#btn-sync-now");h==null||h.addEventListener("click",async()=>{const T=e.querySelector("#input-github-token").value.trim();if(!T){f&&(f.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}_t(T),h.disabled=!0,f&&(f.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Sincronizando…</div>`);try{const A=await Ma(T);if(f){const R=[A.criados>0?`${A.criados} novo(s)`:null,A.atualizados>0?`${A.atualizados} atualizado(s)`:null].filter(Boolean);f.innerHTML=`
          <div class="banner banner--success" role="status">
            ${x.check} Sincronizado!${R.length>0?` ${R.join(", ")} baixado(s).`:""}
            ${A.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}Y(e,t)}catch(A){h.disabled=!1,f&&(f.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${v(A instanceof Error?A.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(W=e.querySelector("#btn-limpar-token"))==null||W.addEventListener("click",async()=>{await ne({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(_t(""),Oe(""),Ot(""),Y(e,t))}),(U=e.querySelector("#sync-auto"))==null||U.addEventListener("change",$=>{Ka($.target.checked)})}let je=null;async function Pt(){if(!(!("wakeLock"in navigator)||document.hidden))try{je=await navigator.wakeLock.request("screen"),je.addEventListener("release",()=>{je=null})}catch{}}function yn(){Pt(),document.addEventListener("visibilitychange",()=>{document.hidden||Pt()})}const Ca="v1.6",_n="Memoriza",Ia=`${_n} ${Ca}`,ge=24;function tt(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function ze(e,t){const a=tt(t);return e.some(o=>tt(o).includes(a))}function wn(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),n=t.toLowerCase();let i=s.indexOf(n);i===-1&&(i=0);const c=Math.max(0,i-a),l=Math.min(o.length,i+n.length+a);return(c>0?"…":"")+o.slice(c,l)+(l<o.length?"…":"")}async function $n(e,t){const a=t.trim();if(!a)return[];const o=tt(a);if(!o)return[];const s=await k(),n=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(n.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),l=new Map(n.map(f=>[f.id,f])),u=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),r=[];for(const f of n)if(ze([f.nome,f.categoria],o)&&(r.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),r.length>=ge))return r;const b=new Map(c.map(f=>[f.id,f]));for(const f of c)if(ze([f.nome,f.categoria],o)){const h=l.get(f.espaco_id);if(r.push({kind:"tema",id:f.id,titulo:f.nome,meta:`Tema${h?` · ${h.nome}`:""}`}),r.length>=ge)return r}for(const f of u){if(!ze([f.titulo,f.fonte,f.conteudo],o))continue;const h=b.get(f.tema_id),p=h&&l.get(h.espaco_id),_=[...p?[p.nome]:[],...h?[h.nome]:[]].join(" · ");if(r.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:_?`Nota · ${_}`:"Nota",snippet:f.conteudo?wn(f.conteudo,o):void 0}),r.length>=ge)return r}return r.sort((f,h)=>{const p=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,_=`${h.titulo.toLowerCase()} ${h.meta.toLowerCase()}`;return xo(p,_)}),r.slice(0,ge)}const En={espaco:"Espaço",tema:"Tema",nota:"Nota"};function jt(e,t){const a=v(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const n=v(e.slice(0,s)),i=v(e.slice(s,s+o.length)),c=v(e.slice(s+o.length));return`${n}<mark>${i}</mark>${c}`}async function Da(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],n=-1,i,c=!1;function l(){c||(c=!0,t.remove(),document.removeEventListener("keydown",b))}function d(h){s.length!==0&&(n=(n+h+s.length)%s.length,s.forEach((p,_)=>{const L=_===n;p.el.classList.toggle("is-active",L),p.el.setAttribute("aria-selected",String(L)),L&&p.el.scrollIntoView({block:"nearest"})}))}function u(h){const p=s.find(L=>L.el===h);if(!p)return;l();const _=p.resultado;_.kind==="espaco"?M(`espacos/${_.id}`):_.kind==="tema"?M(`temas/${_.id}`):M(`notas/${_.id}`)}function r(h){$n(e,h).then(p=>{if(!c){if(n=-1,s=[],p.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${v(h.trim())}".</p>`;return}o.innerHTML="";for(const _ of p){const L=document.createElement("button");L.type="button",L.className=`search-result search-result--${_.kind}`,L.setAttribute("role","option"),L.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${_.kind==="espaco"?x.folder:_.kind==="tema"?x.bookOpen:x.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${jt(_.titulo,h)}</span>
            <span class="search-result__meta">${v(En[_.kind])} · ${v(_.meta)}</span>
            ${_.snippet?`<span class="search-result__snippet">${jt(_.snippet,h)}</span>`:""}
          </span>
        `,L.addEventListener("click",()=>u(L)),o.appendChild(L),s.push({el:L,resultado:_})}}})}function b(h){h.key==="Escape"&&(h.preventDefault(),l())}a.addEventListener("input",()=>{i&&clearTimeout(i),i=setTimeout(()=>r(a.value),120)}),a.addEventListener("keydown",h=>{h.key==="ArrowDown"?(h.preventDefault(),d(1)):h.key==="ArrowUp"?(h.preventDefault(),d(-1)):h.key==="Enter"&&n>=0?(h.preventDefault(),u(s[n].el)):h.key==="Escape"&&(h.preventDefault(),l())}),t.addEventListener("mousedown",h=>{h.target===t&&l()}),document.addEventListener("keydown",b),a.focus(),r("")}const Re=7,xn=30,Sn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],kn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function Ln(e){Po(()=>at(e)),await at(e),Tn(),yn(),An(),qn()}function An(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=zt();t&&Da(t)}})}async function qn(){const e=ot();if(!(!e||!Ht())&&gn(xn))try{await Ma(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function Tn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function at(e){var l,d,u;const t=zt(),a=t?await ho(t):void 0;if(!a){Fe(null),e.innerHTML='<div id="profile-screen"></div>';const r=e.querySelector("#profile-screen");await zo(r,async b=>{Fe(b.id),M("hoje"),await at(e)});return}const o=Io(),s=Do(o),n=await Cn(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${Sn.map(r=>`
          <button
            class="app-nav__item"
            data-route="${r.route}"
            ${r.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${jo[r.route]}</span>
            <span>${r.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${kn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${x.search}</button>
            ${n?`<button class="app-header__backup-alert${n.urgente?" is-urgent":""}" id="btn-sync-alert" type="button" title="${v(n.mensagem)}" aria-label="${v(n.mensagem)}">${x.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${v(vo(H()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${x.help}</button>
            <span class="app-header__profile" title="Memoriza ${Ca}">${v(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${v(Ia)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(r=>{r.addEventListener("click",()=>{ue()&&No(r.dataset.route)})}),(l=e.querySelector("#btn-ajuda"))==null||l.addEventListener("click",()=>{ue()&&(location.hash==="#/ajuda"?history.back():M("ajuda"))}),(d=e.querySelector("#btn-busca"))==null||d.addEventListener("click",()=>{ue()&&Da(a.id)}),(u=e.querySelector("#btn-sync-alert"))==null||u.addEventListener("click",()=>{ue()&&M("config")});const i=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",i.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await Mn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(r){console.error("Erro ao renderizar tela:",r),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function Mn(e,t,a){switch(t.name){case"hoje":await Tt(e,{perfilId:a.id});break;case"espacos":await be(e,{perfilId:a.id});break;case"espaco":await he(e,t.id);break;case"espaco-pdf":await xs(e,t.id,t.categoria);break;case"painel":await Fs(e,{perfilId:a.id});break;case"favoritos":await Hs(e,{perfilId:a.id});break;case"ajuda":Ks(e);break;case"tema":await ye(e,t.id);break;case"nota-nova":await Ee(e,{mode:"nova",temaId:t.temaId});break;case"nota":await Ee(e,{mode:"editar",notaId:t.id});break;case"config":await Y(e,{perfil:a,onSwitchProfile:()=>{Fe(null),M("perfil")}});break;default:await Tt(e,{perfilId:a.id})}}async function Cn(e){if(!await In(e.id))return null;if(!ot())return{urgente:!1,mensagem:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};const a=st();if(!a)return{urgente:!1,mensagem:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."};const o=H(),s=me(H(new Date(a)),o);return s<=Re?null:{urgente:s>Re*2,mensagem:`Faz mais de ${Re} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}}async function In(e){const t=await k();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${Ia}%c rodando`,"font-weight:bold;","");Bt();Ra({immediate:!0});async function Dn(){Ls(),await bo(),await Jt(),await Qa();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await Ln(e)}Dn();
