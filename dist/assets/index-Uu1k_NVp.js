(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const bo="modulepreload",ho=function(e){return"/"+e},Kt={},yo=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(a.map(r=>{if(r=ho(r),r in Kt)return;Kt[r]=!0;const d=r.endsWith(".css"),l=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${l}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":bo,d||(u.as="script"),u.crossOrigin="",u.href=r,c&&u.setAttribute("nonce",c),document.head.appendChild(u),d)return new Promise((v,f)=>{u.addEventListener("load",v),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return s.then(n=>{for(const c of n||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function _o(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:i,onRegisterError:n}=e;let c,r;const d=async(u=!0)=>{await r};async function l(){if("serviceWorker"in navigator){if(c=await yo(async()=>{const{Workbox:u}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:u}},[]).then(({Workbox:u})=>new u("/sw.js",{scope:"/",type:"classic"})).catch(u=>{n==null||n(u)}),!c)return;c.addEventListener("activated",u=>{(u.isUpdate||u.isExternal)&&window.location.reload()}),c.addEventListener("installed",u=>{u.isUpdate||o==null||o()}),c.register({immediate:t}).then(u=>{i?i("/sw.js",u):s==null||s(u)}).catch(u=>{n==null||n(u)})}}return r=l(),d}const O={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function ba(){return localStorage.getItem(O.selectedProfileId)}function ct(e){e?localStorage.setItem(O.selectedProfileId,e):localStorage.removeItem(O.selectedProfileId)}function ha(){const e=localStorage.getItem(O.theme);return e==="light"||e==="dark"?e:"system"}function wo(e){e==="system"?localStorage.removeItem(O.theme):localStorage.setItem(O.theme,e)}function $o(){return localStorage.getItem(O.lastExportAt)}function Wt(e){localStorage.setItem(O.lastExportAt,e)}function Eo(){return localStorage.getItem(O.storagePersistRequested)==="1"}function xo(){localStorage.setItem(O.storagePersistRequested,"1")}const So="19:00";function ko(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??So}function Ao(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function St(){return localStorage.getItem(O.githubToken)??""}function Zt(e){e.trim()?localStorage.setItem(O.githubToken,e.trim()):localStorage.removeItem(O.githubToken)}function Ue(){return localStorage.getItem(O.githubGistId)??""}function lt(e){e?localStorage.setItem(O.githubGistId,e):localStorage.removeItem(O.githubGistId)}function kt(){return localStorage.getItem(O.githubLastSyncAt)}function At(e){e?localStorage.setItem(O.githubLastSyncAt,e):localStorage.removeItem(O.githubLastSyncAt)}function ya(){return localStorage.getItem(O.githubAutoSync)!=="0"}function Lo(e){e?localStorage.removeItem(O.githubAutoSync):localStorage.setItem(O.githubAutoSync,"0")}function Lt(){return localStorage.getItem(O.notasOrdem)==="titulo"?"titulo":"data"}function qo(e){e==="titulo"?localStorage.setItem(O.notasOrdem,"titulo"):localStorage.removeItem(O.notasOrdem)}function _a(){const e=ha();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function To(e){wo(e),_a()}function Co(){return ha()}async function Mo(){var e;if(!Eo()&&(xo(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const dt=(e,t)=>t.some(a=>e instanceof a);let Jt,Xt;function Io(){return Jt||(Jt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Do(){return Xt||(Xt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ut=new WeakMap,Qe=new WeakMap,Ge=new WeakMap;function No(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",n)},i=()=>{a(de(e.result)),s()},n=()=>{o(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",n)});return Ge.set(t,e),t}function Po(e){if(ut.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",n),e.removeEventListener("abort",n)},i=()=>{a(),s()},n=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",n),e.addEventListener("abort",n)});ut.set(e,t)}let mt={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return ut.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return de(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function wa(e){mt=e(mt)}function zo(e){return Do().includes(e)?function(...t){return e.apply(pt(this),t),de(this.request)}:function(...t){return de(e.apply(pt(this),t))}}function jo(e){return typeof e=="function"?zo(e):(e instanceof IDBTransaction&&Po(e),dt(e,Io())?new Proxy(e,mt):e)}function de(e){if(e instanceof IDBRequest)return No(e);if(Qe.has(e))return Qe.get(e);const t=jo(e);return t!==e&&(Qe.set(e,t),Ge.set(t,e)),t}const pt=e=>Ge.get(e);function Ro(e,t,{blocked:a,upgrade:o,blocking:s,terminated:i}={}){const n=indexedDB.open(e,t),c=de(n);return o&&n.addEventListener("upgradeneeded",r=>{o(de(n.result),r.oldVersion,r.newVersion,de(n.transaction),r)}),a&&n.addEventListener("blocked",r=>a(r.oldVersion,r.newVersion,r)),c.then(r=>{i&&r.addEventListener("close",()=>i()),s&&r.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Fo=["get","getKey","getAll","getAllKeys","count"],Oo=["put","add","delete","clear"],Ye=new Map;function Qt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ye.get(t))return Ye.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=Oo.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||Fo.includes(a)))return;const i=async function(n,...c){const r=this.transaction(n,s?"readwrite":"readonly");let d=r.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[a](...c),s&&r.done]))[0]};return Ye.set(t,i),i}wa(e=>({...e,get:(t,a,o)=>Qt(t,a)||e.get(t,a,o),has:(t,a)=>!!Qt(t,a)||e.has(t,a)}));const Ho=["continue","continuePrimaryKey","advance"],Yt={},vt=new WeakMap,$a=new WeakMap,Bo={get(e,t){if(!Ho.includes(t))return e[t];let a=Yt[t];return a||(a=Yt[t]=function(...o){vt.set(this,$a.get(this)[t](...o))}),a}};async function*Vo(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,Bo);for($a.set(a,t),Ge.set(a,pt(t));t;)yield a,t=await(vt.get(a)||t.continue()),vt.delete(a)}function ea(e,t){return t===Symbol.asyncIterator&&dt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&dt(e,[IDBIndex,IDBObjectStore])}wa(e=>({...e,get(t,a,o){return ea(t,a)?Vo:e.get(t,a,o)},has(t,a){return ea(t,a)||e.has(t,a)}}));const Uo="memoriza",Go=4;let et;function k(){return et||(et=Ro(Uo,Go,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}if(e.objectStoreNames.contains("snapshots")||e.createObjectStore("snapshots",{keyPath:"id"}),!e.objectStoreNames.contains("avaliacoes")){const s=e.createObjectStore("avaliacoes",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("sessao_id","sessao_id")}}})),et}function ne(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const qt="Europe/London",Ko=new Intl.DateTimeFormat("en-CA",{timeZone:qt,year:"numeric",month:"2-digit",day:"2-digit"});function Z(e=new Date){return Ko.format(e)}function te(){return Z(new Date)}function we(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function F(){return new Date().toISOString()}function re(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function Wo(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:qt,weekday:"short",day:"2-digit",month:"2-digit"})}function ue(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Zo(e){const t=new Date(e),a=Z(t),o=t.toLocaleTimeString("pt-BR",{timeZone:qt,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function Tt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function Y(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const Jo="00000000-0000-4000-8000-000000000001";async function Ct(){return(await(await k()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function Xo(){return Ct()}async function Qo(e){return(await k()).get("perfis",e)}async function Ea(e){const t=await k(),a=await t.getAll("perfis"),o=F(),i={id:a.length===0?Jo:ne(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",i),i}async function Yo(e,t){const a=await k(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=F(),await a.put("perfis",o))}async function es(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const i of a){const n=await t.getAllFromIndex("temas","espaco_id",i.id);o+=n.length;for(const c of n)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function ts(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(l=>t.getAllFromIndex("temas","espaco_id",l.id)))).flat(),n=(await Promise.all(s.map(l=>t.getAllFromIndex("notas","tema_id",l.id)))).flat(),r=(await Promise.all(n.map(l=>t.getAllFromIndex("itens_revisao","nota_id",l.id)))).flat(),d=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await d.objectStore("perfis").delete(e);for(const l of a)await d.objectStore("espacos").delete(l.id);for(const l of s)await d.objectStore("temas").delete(l.id);for(const l of n)await d.objectStore("notas").delete(l.id);for(const l of r)await d.objectStore("itens_revisao").delete(l.id);await d.done}const xa=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),as=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function os(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function ft(e){return as.get(os(e))??null}function Sa(e){return e.length>0&&e.every(t=>ft(t)!==null)}function ka(e,t,a){if(a){const o=ft(e),s=ft(t);if(o!==s)return o-s}return xa.compare(e,t)}function Aa(e){const t=Sa(e);return[...e].sort((a,o)=>ka(a,o,t))}function ss(e,t){return xa.compare(e,t)}function me(e,t){const a=Sa(e.map(t));return[...e].sort((o,s)=>ka(t(o),t(s),a))}const is="Sem nome";function V(e){return(e??"").trim()||is}const La=30;function he(e,t=F()){return{...e,excluido:!0,excluido_em:t,atualizado_em:t}}function fe(e,t=F()){const a={...e};return delete a.excluido,delete a.excluido_em,a.atualizado_em=t,a}async function qa(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=new Map(a.map(r=>[r.id,r])),s=(await Promise.all(a.map(r=>t.getAllFromIndex("temas","espaco_id",r.id)))).flat(),i=new Map(s.map(r=>[r.id,r])),n=(await Promise.all(s.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat(),c=[];for(const r of a){if(!r.excluido)continue;const d=s.filter(u=>u.espaco_id===r.id),l=new Set(d.map(u=>u.id));c.push({tipo:"espaco",id:r.id,nome:r.nome,contexto:r.categoria||"Sem categoria",excluido_em:r.excluido_em,temas:d.filter(u=>u.excluido).length,notas:n.filter(u=>l.has(u.tema_id)&&u.excluido).length})}for(const r of s){if(!r.excluido)continue;const d=o.get(r.espaco_id);!d||d.excluido||c.push({tipo:"tema",id:r.id,nome:V(r.nome),contexto:d.nome,excluido_em:r.excluido_em,notas:n.filter(l=>l.tema_id===r.id&&l.excluido).length})}for(const r of n){if(!r.excluido)continue;const d=i.get(r.tema_id);if(!d||d.excluido)continue;const l=o.get(d.espaco_id);!l||l.excluido||c.push({tipo:"nota",id:r.id,nome:r.titulo||"(sem título)",contexto:V(d.nome),excluido_em:r.excluido_em})}return c.sort((r,d)=>(d.excluido_em??"").localeCompare(r.excluido_em??""))}async function ns(e,t){const a=await k(),o=F();if(e==="nota"){const r=await a.get("notas",t);if(!r)return;await a.put("notas",fe(r,o));return}if(e==="tema"){const r=await a.get("temas",t);if(!r)return;const d=(await a.getAllFromIndex("notas","tema_id",t)).filter(u=>u.excluido),l=a.transaction(["temas","notas"],"readwrite");await l.objectStore("temas").put(fe(r,o));for(const u of d)await l.objectStore("notas").put(fe(u,o));await l.done;return}const s=await a.get("espacos",t);if(!s)return;const i=(await a.getAllFromIndex("temas","espaco_id",t)).filter(r=>r.excluido),n=(await Promise.all(i.map(r=>a.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>r.excluido),c=a.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(fe(s,o));for(const r of i)await c.objectStore("temas").put(fe(r,o));for(const r of n)await c.objectStore("notas").put(fe(r,o));await c.done}async function Ie(e,t){const a=await k();if(e==="nota"){const n=await a.getAllFromIndex("itens_revisao","nota_id",t),c=a.transaction(["notas","itens_revisao"],"readwrite");await c.objectStore("notas").delete(t);for(const r of n)await c.objectStore("itens_revisao").delete(r.id);await c.done;return}let o;if(e==="tema")o=await a.getAllFromIndex("notas","tema_id",t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);o=(await Promise.all(n.map(c=>a.getAllFromIndex("notas","tema_id",c.id)))).flat()}const s=(await Promise.all(o.map(n=>a.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat(),i=a.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");if(e==="tema")await i.objectStore("temas").delete(t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);await i.objectStore("espacos").delete(t);for(const c of n)await i.objectStore("temas").delete(c.id)}for(const n of o)await i.objectStore("notas").delete(n.id);for(const n of s)await i.objectStore("itens_revisao").delete(n.id);await i.done}async function rs(){const e=await k(),t=Y(te(),-La),a=n=>!!n.excluido&&!!n.excluido_em&&n.excluido_em.slice(0,10)<t,o=(await e.getAll("espacos")).filter(a),s=(await e.getAll("temas")).filter(a),i=(await e.getAll("notas")).filter(a);for(const n of o)await Ie("espaco",n.id);for(const n of s)await Ie("tema",n.id);for(const n of i)await Ie("nota",n.id)}async function Ta(e){const a=(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido);return Lt()==="titulo"?me(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function ta(e){return(await k()).get("notas",e)}async function cs(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).filter(n=>!n.excluido).map(n=>({nota:n,tema:s}))))).flat()}async function ls(e,t){const a=await k(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const i=F(),n={id:ne(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:i,atualizado_em:i},c={id:ne(),nota_id:n.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:Y(te(),1),status:"pendente",streak_facil:0,criado_em:i,atualizado_em:i},r=a.transaction(["notas","itens_revisao"],"readwrite");return await r.objectStore("notas").put(n),await r.objectStore("itens_revisao").put(c),await r.done,n}async function ds(e,t){const a=await k(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=F(),await a.put("notas",o))}async function us(e){const t=await k(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=F(),await t.put("notas",a),a.favorito):!1}async function ms(e){const t=await k(),a=await t.get("notas",e);a&&await t.put("notas",he(a))}async function Ca(){var i;const e=await k(),a=(await e.getAll("notas")).filter(n=>!("titulo"in n)||!n.titulo);if(a.length===0)return 0;const o=F(),s=e.transaction("notas","readwrite");for(const n of a)await s.store.put({...n,titulo:((i=n.fonte)==null?void 0:i.trim())||"Sem título",titulo_revisado:!1,favorito:n.favorito??!1,atualizado_em:o});return await s.done,a.length}function ps(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,i=0,n=0;for(const c of t){const r=a.get(c.id);r?c.atualizado_em>r.atualizado_em?(a.set(c.id,c),o.push(c),i++):n++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:i,mantidos:n}}function vs(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const fs=["perfis","espacos","temas","notas","itens_revisao","avaliacoes"],Mt="memoriza-export",Ma=1;async function gs(){const e=await k(),[t,a,o,s,i,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao"),e.getAll("avaliacoes")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:i,avaliacoes:n}}async function bs(e){const t=await k(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(v=>v.id)),n=(await t.getAll("temas")).filter(v=>s.has(v.espaco_id)),c=new Set(n.map(v=>v.id)),d=(await t.getAll("notas")).filter(v=>c.has(v.tema_id)),l=await t.getAllFromIndex("itens_revisao","perfil_id",e),u=await t.getAllFromIndex("avaliacoes","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:n,notas:d,itens_revisao:l,avaliacoes:u}}async function hs(e){const t=await bs(e);return{formato:Mt,versao:Ma,exportado_em:F(),escopo:"perfil",perfil_id:e,dados:t}}async function Se(){const e=await gs();return{formato:Mt,versao:Ma,exportado_em:F(),escopo:"todos",dados:e}}function ys(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${Zo(e.exportado_em)}.json`}function aa(e){const t=ys(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function Ke(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==Mt||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function We(e){const t=await k(),a={};for(const o of fs){const s=await t.getAll(o),i=e.dados[o],n=ps(s,i??[]);if(n.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const r of n.toWrite)await c.store.put(r);await c.done}a[o]={criados:n.criados,atualizados:n.atualizados,mantidos:n.mantidos}}return await Ca(),{...vs(Object.values(a)),porLoja:a}}const _s=8,ws=20,$s=10;function Es(e){return e.slice(0,10)}function xs(e,t){const[a,o,s]=e.split("-").map(Number),i=new Date(Date.UTC(a,o-1,s));return i.setUTCDate(i.getUTCDate()+t),i.toISOString().slice(0,10)}function Ss(e){const[t,a,o]=e.split("-").map(Number),s=new Date(Date.UTC(t,a-1,o)),i=s.getUTCDay();return s.setUTCDate(s.getUTCDate()-(i+6)%7),s.toISOString().slice(0,10)}function ks(e,t){const a=new Set,o=(d,l)=>l.criado_em.localeCompare(d.criado_em),s=e.filter(d=>d.automatico).sort(o),i=e.filter(d=>!d.automatico).sort(o),n=xs(t,-6),c=new Set;let r=0;for(const d of s){const l=Es(d.criado_em);let u;if(l>=n)u=!0;else{const v=Ss(l);u=!c.has(v)&&c.size<_s,u&&c.add(v)}if(u&&r<ws){r++;continue}a.add(d.id)}for(const d of i.slice($s))a.add(d.id);return[...a]}async function gt(e={}){const t=await k(),a=JSON.stringify(await Se()),o=e.automatico??!1,s={id:ne(),criado_em:F(),automatico:o,titulo:e.titulo??(o?"Automático":"Manual"),bytes:a.length,conteudo:a};return await t.put("snapshots",s),await qs(),s}async function Ia(){return(await(await k()).getAll("snapshots")).sort((a,o)=>o.criado_em.localeCompare(a.criado_em))}async function As(e){await(await k()).delete("snapshots",e)}async function Ls(e){const a=await(await k()).get("snapshots",e);if(!a)throw new Error("Snapshot não encontrado.");return We(Ke(a.conteudo))}async function qs(){const e=await k(),t=ks(await e.getAll("snapshots"),te());if(t.length===0)return;const a=e.transaction("snapshots","readwrite");for(const o of t)await a.store.delete(o);await a.done}async function Ts(){const e=await k(),t=te();return(await e.getAll("snapshots")).some(o=>o.automatico&&o.criado_em.slice(0,10)===t)?null:gt({automatico:!0})}function m(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ye(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const Da="_sem-categoria_";function Cs(e){return e.trim()===""?Da:encodeURIComponent(e)}function Ms(e){return e===Da?"":decodeURIComponent(e)}function Is(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function Ds(){const e=Is();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:Ms(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function Ns(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function z(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function Ps(e){z(e)}function zs(e){window.addEventListener("hashchange",e)}function ge(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function P(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const js={hoje:ge('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:ge('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:ge('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:ge('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:ge('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:ge('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},E={backup:P('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),cloud:P('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5H7z"/>'),info:P('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:P('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:P('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:P('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:P('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:P('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:P('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:P('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:P('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:P('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:P('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:P('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:P('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:P('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:P('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:P('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:P('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:P('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:P('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:P('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:P('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:P('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:P('<path d="M20 6L9 17l-5-5"/>'),chart:P('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:P('<path d="M4 6h16M4 12h11M4 18h6"/>'),trash:P('<path d="M4 7h16"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6M14 11v6"/>')};async function Rs(e,t){var c,r,d;const a=await Ct(),o=a.length===0;e.innerHTML=`
    <div class="profile-picker">
      <div>
        <div class="profile-picker__title">Quem é você?</div>
        <p class="profile-picker__subtitle">
          ${o?"Primeiro uso neste aparelho — crie seu perfil pra começar. Cada pessoa que usar o app aqui cria o próprio depois.":"Escolha seu perfil para ver suas próprias revisões."}
        </p>
      </div>
      ${a.length>0?`
        <div class="profile-grid" role="list">
          ${a.map(l=>`
            <button class="profile-card" role="listitem" data-id="${m(l.id)}">
              <span class="profile-avatar" aria-hidden="true">${m(Fs(l.nome))}</span>
              <span class="profile-card__name">${m(l.nome)}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset.id,v=a.find(f=>f.id===u);v&&t(v)})});const s=e.querySelector("#form-novo-perfil-picker"),i=e.querySelector("#input-novo-perfil-picker");o&&i.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",i.focus()}),(r=e.querySelector("#btn-cancelar-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="none"});const n=async()=>{const l=i.value.trim();if(!l)return;const u=await Ea(l);t(u)};(d=e.querySelector("#btn-salvar-perfil-picker"))==null||d.addEventListener("click",n),i.addEventListener("keydown",l=>{l.key==="Enter"&&n()})}function Fs(e){return e.trim().slice(0,1).toUpperCase()}const be=["1","7","30","180"],tt={1:1,7:7,30:30,180:180};function Os(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=be.indexOf(e);if(t==="dificil"){const d=be[Math.max(0,s-1)];return{estagio:d,streak_facil:0,data_agendada:Y(o,tt[d]),aposentado:!1}}if(t==="medio"){const d=be[Math.min(be.length-1,s+1)];return{estagio:d,streak_facil:0,data_agendada:Y(o,tt[d]),aposentado:!1}}const i=a+1,n=s+2,c=n<=be.length-1?be[n]:"consulta",r=i>=2?"consulta":c;return r==="consulta"?{estagio:"consulta",streak_facil:i,aposentado:!0}:{estagio:r,streak_facil:i,data_agendada:Y(o,tt[r]),aposentado:!1}}async function Na(e){const t=await k(),a=te(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(_=>_.data_agendada<=a),i=Array.from(new Set(s.map(_=>_.nota_id))),n=await Promise.all(i.map(_=>t.get("notas",_))),c=new Map(n.filter(_=>!!_).map(_=>[_.id,_])),r=Array.from(new Set(Array.from(c.values()).map(_=>_.tema_id))),d=await Promise.all(r.map(_=>t.get("temas",_))),l=new Map(d.filter(_=>!!_).map(_=>[_.id,_])),u=Array.from(new Set(Array.from(l.values()).map(_=>_.espaco_id))),v=await Promise.all(u.map(_=>t.get("espacos",_))),f=new Map(v.filter(_=>!!_).map(_=>[_.id,_])),$=[];for(const _ of s){const S=c.get(_.nota_id),h=S&&l.get(S.tema_id),A=h&&f.get(h.espaco_id);!S||!h||!A||S.excluido||h.excluido||A.excluido||$.push({item:_,nota:S,tema:h,espaco:A})}return $.sort((_,S)=>_.tema.criado_em.localeCompare(S.tema.criado_em)||_.nota.criado_em.localeCompare(S.nota.criado_em)),$}async function Hs(e,t,a){const o=await k(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const i=te(),n=Os(s.estagio,t,s.streak_facil,i),c=F(),r={...s,status:"feita",avaliacao:t,data_concluida:i,duracao_segundos:a,atualizado_em:c},d={id:ne(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:n.estagio,data_agendada:n.aposentado?i:n.data_agendada,status:n.aposentado?"feita":"pendente",streak_facil:n.streak_facil,criado_em:c,atualizado_em:c},l=o.transaction("itens_revisao","readwrite");return await l.store.put(r),await l.store.put(d),await l.done,n}async function Bs(e){const t=await k(),a=te();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function Vs(e){const t=await k(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(n=>n.status==="pendente");if(a.length===0)return;const o=te(),s=F(),i=t.transaction("itens_revisao","readwrite");for(const n of a)await i.store.put({...n,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await i.done}const Ze=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],oa={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},Us=new RegExp(`\\[([^\\]]+)\\]\\{(${Ze.join("|")})\\}`,"g");function bt(e){let t=m(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(Us,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Gs(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,i=s[s.length-1];a.push({level:o.level,nodes:i?i.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function Pa(e){return`<ul>${e.map(t=>`<li>${bt(t.text)}${t.children.length>0?Pa(t.children):""}</li>`).join("")}</ul>`}function Je(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(Pa(Gs(o))),o=[])}let i=[];function n(){i.length>0&&(a.push(`<p>${bt(i.join(`
`)).replace(/\n/g,"<br>")}</p>`),i=[])}for(const c of t){const r=c.trim();if(r===""){n(),s();continue}const d=/^(#{1,3})\s+(.*)$/.exec(r);if(d){n(),s();const u=d[1].length;a.push(`<h${u}>${bt(d[2])}</h${u}>`);continue}const l=/^[-*]\s+(.*)$/.exec(r);if(l){n();const u=c.length-c.trimStart().length;o.push({level:Math.floor(u/2),text:l[1]});continue}s(),i.push(r)}return n(),s(),a.join(`
`)}function It(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(It).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Ze.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function ht(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...ht(s,t+1));continue}if(s.tagName!=="LI")continue;const i=s,n=Array.from(i.children).filter(d=>d.tagName==="UL"),c=i.cloneNode(!0);c.querySelectorAll("ul").forEach(d=>d.remove());const r=It(c).trim();r&&a.push(`${"  ".repeat(t)}- ${r}`);for(const d of n)a.push(...ht(d,t+1));o=i}return a}function sa(e){if(e.tagName==="UL")return ht(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=It(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function Ks(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=sa(o);s.length>0&&t.push(s.join(`
`))}else t.push(...sa(o))}return t.filter(Boolean).join(`

`)}const Ws=30;function za(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=Y(te(),Ws);return e.validade_ate<=t}const pe=8;function Zs(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function Dt(e){return Zs(e)%pe}function K(e){return`var(--accent-${Dt(e)})`}function ja(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function ke(e){return e?e.toLowerCase():"\0sem-categoria"}function Nt(e){return Js(e.map(ke))}function Js(e){const t=new Set,a=new Map;for(const o of e){let s=Dt(o);for(let i=0;i<pe&&t.has(s);i++)s=(s+1)%pe;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function Ra(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=Dt(o.id);for(let i=0;i<pe&&t.has(s);i++)s=(s+1)%pe;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const Xs=5*60;let X=null;function Fa(){X&&(document.hidden?X.retomadoEm!=null&&(X.acumuladoMs+=Date.now()-X.retomadoEm,X.retomadoEm=null):X.retomadoEm==null&&(X.retomadoEm=Date.now()))}function Qs(e){X&&X.itemId===e||(je(),X={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",Fa))}function Ys(){if(!X)return;let e=X.acumuladoMs;return X.retomadoEm!=null&&(e+=Date.now()-X.retomadoEm),Math.min(Xs,Math.round(e/1e3))}function je(){X&&document.removeEventListener("visibilitychange",Fa),X=null}function Oa(e){const t=te();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${we(e.data_agendada,t)} dia(s)">${E.alert} atrasada</span>`}async function ia(e,t){const a=await Na(t.perfilId);await Re(e,t,a)}async function Re(e,t,a){var d;je(),window.scrollTo({top:0});const o=await Bs(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${E.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>z("espacos"));return}const n=new Set(a.map(l=>l.espaco.id)).size>1,c=new Map;for(const l of a){const u=c.get(l.tema.id)??[];u.push(l),c.set(l.tema.id,u)}const r=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=r+Array.from(c.values()).map(l=>{const u=l[0].tema,v=l[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${K(u.id)}">
            <span class="color-dot" style="--dot-color:${K(u.id)}"></span>
            ${m(V(u.nome))}
            ${n?`<span class="queue-group__espaco"> · ${m(v.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${l.map(f=>`
              <button class="item-row" data-id="${m(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${K(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${E.star} `:""}${m(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${Oa(f.item)}
                ${za(f.nota)?`<span class="badge badge--muted">${E.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(l=>{l.addEventListener("click",()=>{const u=a.find(v=>v.item.id===l.dataset.id);u&&Ha(e,t,u,a,o)})})}function Ha(e,t,a,o,s=0,i=!1){var d,l,u;Qs(a.item.id),i||window.scrollTo({top:0});const n=za(a.nota),c=s+o.length,r=c>0?Math.round(s/c*100):0;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" data-voltar type="button">← Voltar à fila</button>
      <button class="link" data-editar type="button" style="margin-left:auto;">${E.pen} Editar nota</button>
    </div>

    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-progress" title="${s} de ${c} revisadas hoje">
        <div class="review-progress__track"><div class="review-progress__fill" style="width:${r}%"></div></div>
        <span class="review-progress__label">${s} de ${c} revisadas hoje</span>
      </div>
      <div class="review-card__meta">
        ${m(V(a.tema.nome))}${i&&a.nota.fonte?` · ${m(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${E.star} `:""}${m(a.nota.titulo||"(sem título)")}
        ${Oa(a.item)}
      </div>

      ${n?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${i?`
        <div class="review-card__content markdown-preview">${Je(a.nota.conteudo)}</div>
        <div class="review-actions">
          <button class="btn btn--review-dificil" data-avaliacao="dificil" type="button">${E.caraTriste}<span>Difícil</span></button>
          <button class="btn btn--review-medio" data-avaliacao="medio" type="button">${E.caraNeutra}<span>Médio</span></button>
          <button class="btn btn--review-facil" data-avaliacao="facil" type="button">${E.caraFeliz}<span>Fácil</span></button>
        </div>
        <p class="review-legend">Fácil = lembrei na hora · Médio = com esforço · Difícil = não lembrei</p>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(d=e.querySelector("[data-voltar]"))==null||d.addEventListener("click",()=>void Re(e,t,o)),(l=e.querySelector("[data-editar]"))==null||l.addEventListener("click",()=>{je(),z(`notas/${a.nota.id}`)}),(u=e.querySelector("#btn-revelar"))==null||u.addEventListener("click",()=>{Ha(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(v=>{v.addEventListener("click",async()=>{const f=v.dataset.avaliacao,$=Ys();je();const _=await Hs(a.item.id,f,$),S=await Na(t.perfilId);_.aposentado?ei(e,t,S):await Re(e,t,S)})})}function ei(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${E.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void Re(e,t,a))}function Ba(e){return e.trim().toLowerCase()}function Pt(e){const t=new Map;for(const i of e){const n=i.categoria.trim(),c=Ba(n),r=t.get(c);r?r.itens.push(i):t.set(c,{display:n,itens:[i]})}const a=Array.from(t.values()).map(i=>({categoria:i.display,itens:i.itens})),o=a.map(i=>i.categoria),s=new Map;Aa(o.filter(i=>i!=="")).forEach((i,n)=>s.set(i,n)),a.sort((i,n)=>i.categoria===""&&n.categoria!==""?1:n.categoria===""&&i.categoria!==""?-1:(s.get(i.categoria)??0)-(s.get(n.categoria)??0));for(const i of a)i.itens.length>1&&(i.itens=me(i.itens,n=>n.nome));return a}function zt(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=Ba(o);t.has(s)||t.set(s,o)}return Aa(Array.from(t.values()))}async function jt(e){const a=await(await k()).getAllFromIndex("espacos","perfil_id",e);return me(a.filter(o=>!o.excluido),o=>o.nome)}const ti=["Cursos","Livros","Bíblia"];async function Va(e){const t=await jt(e);return zt([...ti,...t.map(a=>a.categoria)])}async function Rt(e){return(await k()).get("espacos",e)}function Ua(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function ai(e,t,a,o={}){const s=await k(),i=F(),n={id:ne(),perfil_id:e,nome:t,categoria:a,criado_em:i,atualizado_em:i,arquivado:!1};return Ua(n,o),await s.put("espacos",n),n}async function oi(e,t,a,o={}){const s=await k(),i=await s.get("espacos",e);i&&(i.nome=t,i.categoria=a,Ua(i,o),i.atualizado_em=F(),await s.put("espacos",i))}async function yt(e,t){const a=await k(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?F():void 0,o.atualizado_em=F(),await a.put("espacos",o))}async function Ga(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).filter(i=>!i.excluido).length;return{temas:a.length,notas:o}}async function Ka(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(r=>!r.excluido),i=(await Promise.all(o.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>!r.excluido),n=F(),c=t.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(he(a,n));for(const r of o)await c.objectStore("temas").put(he(r,n));for(const r of i)await c.objectStore("notas").put(he(r,n));await c.done}function ie(e){return new Promise(t=>{var i,n;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${m(e.title)}</div>
        <p class="modal__message">${m(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${m(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${m(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(i=a.querySelector("#modal-confirm"))==null||i.addEventListener("click",()=>s(!0)),(n=a.querySelector("#modal-cancel"))==null||n.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function Fe(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${m(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${m(a)}">${m(a)}</button>`).join("")}
    </div>
  `}function Ft(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ye(o),o.focus()})})})}function j(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Wa="livro",Za=[{chave:"pasta",label:"Categoria",svg:j('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:j('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:j('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:j('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:j('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:j('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:j('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:j('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:j('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:j('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:j('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:j('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:j('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:j('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:j('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:j('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:j('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:j('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:j('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:j('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:j('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:j('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:j('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:j('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:j('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:j('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:j('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],_t=new Map(Za.map(e=>[e.chave,e]));function ce(e){return e&&_t.get(e)||_t.get(Wa)}const si=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function ii(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Ot(e){var a;const t=ii(e);if(t.trim())return(a=si.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function $e(e){return e.icone&&_t.has(e.icone)?e.icone:Ot(`${e.nome??""} ${e.categoria??""}`)??Wa}const ni="pasta";function Ja(e){return Ot(e)??ni}const na=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function Xa(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${le(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${Za.map(s=>`
          <button
            type="button"
            class="espaco-icon-btn${s.chave===a?" is-selected":""}"
            data-icone="${le(s.chave)}"
            title="${le(s.label)}"
            aria-label="${le(s.label)}"
            aria-pressed="${s.chave===a}"
          >${s.svg}</button>
        `).join("")}
      </div>
      <input type="hidden" id="${le(t)}-icone" value="${le(a??"")}" />

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
        ${Array.from({length:pe},(s,i)=>`
          <button
            type="button"
            class="color-swatch${o===i?" is-selected":""}"
            data-cor="${i}"
            style="--swatch: var(--accent-${i});"
            title="${na[i]??`Cor ${i}`}"
            aria-label="${na[i]??`Cor ${i}`}"
            aria-pressed="${o===i}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${le(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function Qa(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${_e(a)}"]`);if(!s)return;const i=s.querySelector(`#${_e(a)}-icone`),n=s.querySelector(`#${_e(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),r=u=>{i&&(i.value=u);for(const v of c){const f=v.dataset.icone===u;v.classList.toggle("is-selected",f),v.setAttribute("aria-pressed",String(f))}};let d=!1;for(const u of c)u.addEventListener("click",()=>{d=!0,r(u.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(u=>{u.addEventListener("click",()=>{n&&(n.value=u.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(v=>{const f=v===u;v.classList.toggle("is-selected",f),v.setAttribute("aria-pressed",String(f))})})});const l=()=>{if(d)return;const u=Ot(o());for(const v of c)v.classList.toggle("is-suggested",!!u&&v.dataset.icone===u);u&&r(u)};l(),e.querySelectorAll('input[type="text"]').forEach(u=>{u.addEventListener("input",l)})}function Ya(e,t){var n,c;const a=e.querySelector(`[data-espaco-visual="${_e(t)}"]`),o=(n=a==null?void 0:a.querySelector(`#${_e(t)}-icone`))==null?void 0:n.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${_e(t)}-cor`))==null?void 0:c.value.trim(),i={};if(o&&(i.icone=o),s!==void 0&&s!==""){const r=Number(s);Number.isInteger(r)&&r>=0&&r<pe&&(i.cor=r)}return i}function le(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function _e(e){return e.replace(/["\\]/g,"\\$&")}function Ae(e,t){var o;e.classList.add("input--error"),e.setAttribute("aria-invalid","true");const a=(o=e.closest(".field"))==null?void 0:o.querySelector(".field__error");a&&(a.textContent=t,a.style.display="block")}function Le(e){var a;e.classList.remove("input--error"),e.removeAttribute("aria-invalid");const t=(a=e.closest(".field"))==null?void 0:a.querySelector(".field__error");t&&(t.style.display="")}function Oe(e){let t=null;for(const a of e){if(a.ok){Le(a.input);continue}Ae(a.input,a.mensagem),t||(t=a.input)}return t?(t.focus(),!1):!0}async function De(e,t){var v,f,$,_,S;const a=await jt(t.perfilId),o=a.filter(h=>!h.arquivado),s=a.filter(h=>h.arquivado),i=await ci(a.map(h=>h.id)),n=Pt(o),c=Ra(o),r=Nt(n.map(h=>h.categoria)),d=await Va(t.perfilId);e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap; margin-bottom: var(--space-4);">
      <p class="screen-hint" style="margin:0;">Cada Espaço é um curso, um livro ou um estudo — agrupe por categoria pra manter organizado.</p>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Novo espaço</button>
    </div>

    <div id="form-novo-espaco" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-categoria-espaco">Categoria</label>
        <input class="input" id="input-categoria-espaco" type="text" placeholder="Ex: Cursos, Livros, Estudos" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${Fe(d,"input-categoria-espaco")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-espaco">Nome do espaço</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Curso de Investimentos" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${Xa({prefix:"novo-espaco"})}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-espaco" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-espaco" type="button">Cancelar</button>
      </div>
    </div>

    ${o.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${E.bookOpen}</div>
        <div class="empty-state__title">Nenhum espaço de estudo ainda</div>
        <p class="empty-state__hint">Crie um espaço (ex: "Curso de Investimentos") para organizar seus temas e notas.</p>
        <button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-espaco" type="button">Criar o primeiro espaço</button>
      </div>
    `:n.map(h=>{const A=h.itens.length===1?h.itens[0]:null,D=A?c.get(A.id)??K(A.id):r.get(ke(h.categoria))??K(h.categoria),x=ce(A?$e(A):Ja(h.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${D}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${D}" aria-hidden="true">${x.svg}</span>
            ${m(h.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${h.itens.map(M=>ri(M,i.get(M.id)??0,c.get(M.id)??K(M.id))).join("")}
        </div>
      </details>
    `}).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(h=>`
            <div class="item-row" data-id="${m(h.id)}">
              <button class="item-row__main" data-open="${m(h.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${K(h.id)}" aria-hidden="true">${ce($e(h)).svg}</span>
                  <span class="item-row__title">${m(h.nome)}</span>
                </span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${m(h.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,Ft(e),Qa(e,{prefix:"novo-espaco",getTexto:()=>{var h,A;return`${((h=e.querySelector("#input-nome-espaco"))==null?void 0:h.value)??""} ${((A=e.querySelector("#input-categoria-espaco"))==null?void 0:A.value)??""}`}});const l=e.querySelector("#form-novo-espaco"),u=()=>{var h;l.style.display="block",(h=e.querySelector("#input-categoria-espaco"))==null||h.focus()};(v=e.querySelector("#btn-novo-espaco"))==null||v.addEventListener("click",u),(f=e.querySelector("#btn-empty-novo-espaco"))==null||f.addEventListener("click",u),($=e.querySelector("#btn-cancelar-espaco"))==null||$.addEventListener("click",()=>{l.style.display="none"});for(const h of["#input-nome-espaco","#input-categoria-espaco"])(_=e.querySelector(h))==null||_.addEventListener("input",A=>{Le(A.target)});(S=e.querySelector("#btn-salvar-espaco"))==null||S.addEventListener("click",async()=>{const h=e.querySelector("#input-nome-espaco"),A=e.querySelector("#input-categoria-espaco"),D=h.value.trim(),x=A.value.trim(),M=a.some(B=>B.nome.trim().toLowerCase()===D.toLowerCase());if(!Oe([{input:A,ok:x.length>0,mensagem:"Informe uma categoria para o espaço."},{input:h,ok:D.length>0,mensagem:"Informe um nome para o espaço."}]))return;if(M){Ae(h,"Já existe um espaço com esse nome."),h.focus();return}const R=await ai(t.perfilId,D,x,Ya(e,"novo-espaco"));z(`espacos/${R.id}`)}),e.querySelectorAll("[data-open]").forEach(h=>{h.addEventListener("click",()=>z(`espacos/${h.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(h=>{h.addEventListener("click",async()=>{await yt(h.dataset.archive,!0),De(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(h=>{h.addEventListener("click",async()=>{await yt(h.dataset.unarchive,!1),De(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(h=>{h.addEventListener("click",async()=>{const A=h.dataset.excluir,D=h.dataset.nome??"",x=await Ga(A);await ie({title:`Excluir "${D}"?`,message:`Isso manda pra Lixeira o espaço com ${x.temas} tema(s) e ${x.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ka(A),De(e,t))})})}function ri(e,t,a){const o=ce($e(e));return`
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
  `}async function ci(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function eo(e){const a=await(await k()).getAllFromIndex("temas","espaco_id",e);return me(a.filter(o=>!o.excluido),o=>o.nome)}async function to(e){return(await k()).get("temas",e)}async function li(e,t,a){const o=await k(),s=F(),i={id:ne(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",i),i}async function di(e,t,a){const o=await k(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=F(),await o.put("temas",s))}async function ui(e){const t=await k(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=F(),await t.put("temas",a),a.favorito):!1}async function mi(e){return{notas:(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido).length}}async function pi(e){const t=await k(),a=await t.get("temas",e);if(!a)return;const o=(await t.getAllFromIndex("notas","tema_id",e)).filter(n=>!n.excluido),s=F(),i=t.transaction(["temas","notas"],"readwrite");await i.objectStore("temas").put(he(a,s));for(const n of o)await i.objectStore("notas").put(he(n,s));await i.done}function vi(e,t){let a=e.has(t)?t:Y(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=Y(a,-1);return o}function fi(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const gi=5;async function bi(e){const t=await k(),a=te(),o=Y(a,-6),[s,i,n,c,r]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"])),t.getAll("notas"),t.getAll("temas"),t.getAll("espacos")]),d=new Map(n.map(w=>[w.id,w])),l=new Map(c.map(w=>[w.id,w])),u=new Map(r.map(w=>[w.id,w])),v=w=>{const J=d.get(w.nota_id);if(!J||J.excluido)return!1;const Ee=l.get(J.tema_id);if(!Ee||Ee.excluido)return!1;const Gt=u.get(Ee.espaco_id);return!!Gt&&!Gt.excluido},f=s.filter(w=>w.avaliacao&&v(w)),$=i.filter(v),_=f.filter(w=>w.data_concluida===a),S=_.length,h=_.reduce((w,J)=>w+(J.duracao_segundos??0),0),A=f.filter(w=>w.data_concluida&&w.data_concluida>=o&&w.data_concluida<=a).length,D=["1","7","30","180"].map(w=>({estagio:w,count:$.filter(J=>J.estagio===w).length})),x=[];for(let w=1;w<=7;w++){const J=Y(a,w);x.push({data:J,count:$.filter(Ee=>Ee.data_agendada===J).length})}const M=Y(a,-29),R=f.filter(w=>w.data_concluida>=M),B={facil:R.filter(w=>w.avaliacao==="facil").length,medio:R.filter(w=>w.avaliacao==="medio").length,dificil:R.filter(w=>w.avaliacao==="dificil").length,total:0};B.total=B.facil+B.medio+B.dificil;const L=new Set(f.map(w=>w.data_concluida)),U=vi(L,a),Q=[];for(let w=6;w>=0;w--)Q.push(L.has(Y(a,-w)));const W=f.filter(w=>w.estagio==="consulta").length,G=f.filter(w=>w.avaliacao==="dificil"),ae=Array.from(new Set(G.map(w=>w.nota_id))),g=await Promise.all(ae.map(w=>t.get("notas",w))),I=new Map(g.filter(w=>!!w).map(w=>[w.id,w.tema_id])),q=new Map;for(const w of G){const J=I.get(w.nota_id);J&&q.set(J,(q.get(J)??0)+1)}const b=Array.from(q.keys()),y=(await Promise.all(b.map(w=>t.get("temas",w)))).filter(w=>!!w).map(w=>({temaId:w.id,temaNome:V(w.nome),count:q.get(w.id)})).sort((w,J)=>J.count-w.count).slice(0,gi),T=r.filter(w=>w.perfil_id===e&&!w.excluido),C=T.filter(w=>!w.arquivado).length,H=(await Promise.all(T.map(w=>t.getAllFromIndex("temas","espaco_id",w.id)))).flat().filter(w=>!w.excluido),oe=H.length,Te=(await Promise.all(H.map(w=>t.getAllFromIndex("notas","tema_id",w.id)))).flat().filter(w=>!w.excluido).length;return{revisoesHoje:S,revisoesUltimos7Dias:A,streakDias:U,diasAtivosUltimos7:Q,rankingDificeis:y,espacosAtivos:C,totalTemas:oe,totalNotas:Te,itensEmConsulta:W,porEstagio:D,tempoHojeSegundos:h,cargaProximos7:x,retencao30:B}}async function hi(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(n=>t.getAllFromIndex("notas","tema_id",n.id)))).flat();return(await Promise.all(s.map(n=>t.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat().reduce((n,c)=>n+(c.duracao_segundos??0),0)}async function yi(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,i)=>s+(i.duracao_segundos??0),0)}function ao(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${m(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${m(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=i=>{i.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",i=>{i.target===t&&o()})}async function _i(e){const t=await k(),a=F(),o={id:ne(),perfil_id:e.perfilId,espaco_id:e.espacoId,tema_id:e.temaId,nota_id:e.notaId,avaliacao:e.avaliacao,escopo:e.escopo,categoria:e.categoria,sessao_id:e.sessaoId,criado_em:a,atualizado_em:a};await t.put("avaliacoes",o)}async function wi(e,t=20){const a=await k(),o=await a.getAllFromIndex("avaliacoes","perfil_id",e),s=new Map((await a.getAll("espacos")).map(r=>[r.id,r.nome])),i=new Map((await a.getAll("temas")).map(r=>[r.id,V(r.nome)])),n={total:0,facil:0,medio:0,dificil:0,sessoesTotal:0,sessoes:[]},c=new Map;for(const r of o){n.total++,n[r.avaliacao]++,(!n.ultimaEm||r.criado_em>n.ultimaEm)&&(n.ultimaEm=r.criado_em);let d=c.get(r.sessao_id);if(!d){const l=r.escopo==="tema"?i.get(r.tema_id):r.escopo==="categoria"?r.categoria||"Sem categoria":s.get(r.espaco_id);d={sessao_id:r.sessao_id,criado_em:r.criado_em,total:0,facil:0,medio:0,dificil:0,escopo:r.escopo,contexto:l??"Conteúdo excluído"},c.set(r.sessao_id,d)}d.total++,d[r.avaliacao]++,r.criado_em>d.criado_em&&(d.criado_em=r.criado_em)}return n.sessoesTotal=c.size,n.sessoes=[...c.values()].sort((r,d)=>d.criado_em.localeCompare(r.criado_em)).slice(0,t),n}function He(e){return e||"Sem categoria"}function Be(e,t){return`${t}-${e.replace(/\./g,"-")}`}function oo(e){return e.map((t,a)=>{const o=`${a+1}`,s=t.temas.map((i,n)=>{const c=`${o}.${n+1}`;return{temaPdf:i,numero:c,notas:i.notas.map((r,d)=>({notaPdf:r,numero:`${c}.${d+1}`}))}});return{grupo:t,numero:o,temas:s,totalNotas:s.reduce((i,n)=>i+n.notas.length,0)}})}function $i(e){const t=[];let a=0,o=0;for(const s of e){a+=s.temas.length,o+=s.totalNotas,t.push({nivel:"categoria",numero:s.numero,nome:He(s.grupo.categoria),notas:s.totalNotas,anexo:Be(s.numero,"pdf-cat")});for(const i of s.temas)t.push({nivel:"tema",numero:i.numero,nome:V(i.temaPdf.tema.nome),notas:i.notas.length,anexo:Be(i.numero,"pdf-tema")})}return{linhas:t,totalTemas:a,totalNotas:o}}function Ei(e){return Be(e.numero,"pdf-cat")}function xi(e){return Be(e.numero,"pdf-tema")}function Si(e,t){if(t.tipo==="tema")return[{rotulo:t.nomeContexto,escopo:"tema",itens:e}];const a=new Map;for(const o of e){const s=o.tema.categoria??"";let i=a.get(s);i||(i={rotulo:He(s),escopo:"categoria",categoria:s,itens:[]},a.set(s,i)),i.itens.push(o)}return a.size<=1?[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e}]:[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e},...[...a.values()].sort((o,s)=>o.rotulo.localeCompare(s.rotulo,"pt-BR"))]}const ra=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}],ki=[{valor:"dificil",label:"Difícil",classe:"btn--review-dificil",icone:E.caraTriste},{valor:"medio",label:"Médio",classe:"btn--review-medio",icone:E.caraNeutra},{valor:"facil",label:"Fácil",classe:"btn--review-facil",icone:E.caraFeliz}];function Ai(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function so(e,t,a,o){var i;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${E.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra avaliar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",o);return}const s=Si(t,a);s.length>1?io(e,s,a,o):no(e,s[0],s,a,o)}function Ht(e){return`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← ${m(e)}</button>
    </div>
  `}function io(e,t,a,o){var s;e.innerHTML=`
    ${Ht("Encerrar avaliação")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${E.dice}</div>
        <h2 style="margin:0;">Avaliação — ${m(a.nomeContexto)}</h2>
        <p class="text-muted" style="margin:0;">O que você quer avaliar?</p>
        <div class="stack">
          ${t.map((i,n)=>`
            <button class="btn btn--secondary btn--block" data-escopo="${n}" type="button">
              ${m(i.rotulo)} — ${i.itens.length} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-escopo]").forEach(i=>{i.addEventListener("click",()=>{no(e,t[Number(i.dataset.escopo)],t,a,o)})})}function no(e,t,a,o,s){var i;e.innerHTML=`
    ${Ht("Voltar")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${E.dice}</div>
        <h2 style="margin:0;">Avaliação — ${m(t.rotulo)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse com notas aleatórias e marque Fácil, Médio ou Difícil em cada uma. Isso não
          afeta sua fila de revisão. ${t.itens.length} nota(s) — escolha quantas:
        </p>
        <div class="stack">
          ${ra.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.itens.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",()=>{o.tipo==="espaco"&&a.length>1?io(e,a,o,s):s()}),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const c=ra.find(l=>l.key===n.dataset.tier),r=Ai(t.itens).slice(0,Math.min(c.n,t.itens.length)),d={id:ne(),escopo:t.escopo,categoria:t.categoria,itens:r,contagem:{facil:0,medio:0,dificil:0}};wt(e,d,0,o,s)})})}function wt(e,t,a,o,s,i=!1){var c,r;if(a>=t.itens.length){Li(e,t,o,s);return}const n=t.itens[a];e.innerHTML=`
    ${Ht("Encerrar avaliação")}
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${m(V(n.tema.nome))} · ${a+1} de ${t.itens.length}</div>
      <div class="review-card__titulo">${n.nota.favorito?`${E.star} `:""}${m(n.nota.titulo||"(sem título)")}</div>
      ${i?`
        <div class="review-card__content markdown-preview">${Je(n.nota.conteudo)}</div>
        <div class="review-actions">
          ${ki.map(d=>`
            <button class="btn ${d.classe}" data-avaliacao="${d.valor}" type="button">${d.icone}<span>${d.label}</span></button>
          `).join("")}
        </div>
        <p class="review-legend">Fácil = lembrei na hora · Médio = com esforço · Difícil = não lembrei</p>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{wt(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(d=>{d.addEventListener("click",async()=>{const l=d.dataset.avaliacao;t.contagem[l]++,await _i({perfilId:o.perfilId,espacoId:o.espacoId,temaId:n.tema.id,notaId:n.nota.id,avaliacao:l,escopo:t.escopo,categoria:t.categoria,sessaoId:t.id}),wt(e,t,a+1,o,s)})})}function Li(e,t,a,o){var c;const{facil:s,medio:i,dificil:n}=t.contagem;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${E.confete}</div>
      <h2 style="margin:0;">Avaliação concluída</h2>
      <p class="text-muted" style="margin:0;">
        Você avaliou ${t.itens.length} nota(s) de ${m(a.nomeContexto)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <div class="retention-legend" style="justify-content:center;">
        <span class="badge badge--success">Fácil ${s}</span>
        <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${i}</span>
        <span class="badge badge--danger">Difícil ${n}</span>
      </div>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `,(c=e.querySelector("#btn-terminar"))==null||c.addEventListener("click",o)}function Bt(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${ce(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${K(t.colorKey)}"></span>`:""}${m(t.label)}`,i=a===e.length-1,n=t.route&&!i?`<button class="link" data-crumb="${m(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?n:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${n}`}).join("")}
    </div>
  `}function Vt(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>z(t.dataset.crumb))})}async function Ne(e,t){var M,R,B,L,U,Q,W,G,ae,g,I,q,b;const a=await Rt(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await eo(t),s=await qi(o.map(p=>p.id)),i=Pt(o),n=await Va(a.perfil_id),c=zt(o.map(p=>p.categoria)),r=[...o].sort((p,y)=>y.criado_em.localeCompare(p.criado_em))[0],d=((M=r==null?void 0:r.categoria)==null?void 0:M.trim())||void 0,l=((R=r==null?void 0:r.nome)==null?void 0:R.trim())||void 0,u=ja(a.cor,K(a.id)),v=ce($e(a)),f=Nt(i.map(p=>p.categoria));e.innerHTML=`
    ${Bt([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:v.chave,iconColor:u}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${u}" aria-hidden="true">${v.svg}</span>${m(a.nome)}
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
            <button id="btn-detalhes" type="button">${E.info} Detalhes</button>
            <button id="btn-avaliar" type="button">${E.dice} Avaliar notas</button>
            <button id="btn-excluir" class="danger" type="button">Excluir espaço</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-espaco" style="display:none" class="card content-narrow">
      <div class="field">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${m(a.categoria)}" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${Fe(n,"input-categoria-espaco-editar")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-espaco-editar">Nome</label>
        <input class="input" id="input-nome-espaco-editar" type="text" value="${m(a.nome)}" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${Xa({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao" type="button">Cancelar</button>
      </div>
    </div>

    ${a.arquivado?'<div class="banner banner--warning"><span>Este espaço está arquivado — não é possível criar novos temas ou notas nele, mas as revisões já agendadas continuam normalmente.</span></div>':""}

    ${a.arquivado?"":`
    <div id="form-novo-tema" style="display:none" class="card content-narrow">
      <p class="screen-hint" style="margin-top:0;">Um Tema é um assunto ou aula dentro deste Espaço. A <strong>categoria</strong> agrupa os temas (ex: o módulo do curso) — preencha ela primeiro; o nome é opcional.</p>
      <div class="field">
        <label class="field__label" for="input-categoria-tema">Categoria</label>
        <input class="input${d?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${m(d??"")}" />
        <p class="field__error" role="alert"></p>
        ${d?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${Fe(c,"input-categoria-tema")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-tema">Nome do tema (opcional)</label>
        <input class="input${l?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${m(l??"")}" />
        <p class="field__error" role="alert"></p>
        ${l?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
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
        <div class="empty-state__icon" aria-hidden="true">${E.folder}</div>
        <div class="empty-state__title">Nenhum tema neste espaço ainda</div>
        <p class="empty-state__hint">Temas organizam as notas dentro de um espaço — ex: "Renda Fixa", "Renda Variável".</p>
        ${a.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-tema" type="button">Criar o primeiro tema</button>'}
      </div>
    `:i.map(p=>{const y=f.get(ke(p.categoria))??K(p.categoria||"sem-categoria"),T=ce(Ja(p.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${y}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${y}" aria-hidden="true">${T.svg}</span>
            ${m(p.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${m(p.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${m(Cs(p.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${p.itens.map(C=>`
            <button class="item-row" data-open="${m(C.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${y}">
              <span class="item-row__main">
                <span class="item-row__title">${C.favorito?`${E.star} `:""}${m(V(C.nome))}</span>
                <span class="item-row__meta">${s.get(C.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,Vt(e),Ft(e),Qa(e,{prefix:"editar-espaco",getTexto:()=>{var p,y;return`${((p=e.querySelector("#input-nome-espaco-editar"))==null?void 0:p.value)??""} ${((y=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:y.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(p=>{p.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),z(`espacos/${t}/pdf/${p.dataset.pdfCategoria}`)})}),(B=e.querySelector("#btn-arquivar"))==null||B.addEventListener("click",async()=>{!a.arquivado&&!await ie({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await yt(a.id,!a.arquivado),Ne(e,t))});const $=e.querySelector("#form-editar-espaco"),_=e.querySelector("#input-nome-espaco-editar"),S=e.querySelector("#input-categoria-espaco-editar");(L=e.querySelector("#btn-editar"))==null||L.addEventListener("click",()=>{$.style.display="block",S.focus()}),(U=e.querySelector("#btn-cancelar-edicao"))==null||U.addEventListener("click",()=>{$.style.display="none"});for(const p of[_,S])p.addEventListener("input",()=>Le(p));(Q=e.querySelector("#btn-salvar-edicao"))==null||Q.addEventListener("click",async()=>{const p=_.value.trim(),y=S.value.trim();if(!Oe([{input:S,ok:y.length>0,mensagem:"Informe uma categoria para o espaço."},{input:_,ok:p.length>0,mensagem:"Informe um nome para o espaço."}]))return;if((await jt(a.perfil_id)).some(C=>C.id!==a.id&&C.nome.trim().toLowerCase()===p.toLowerCase())){Ae(_,"Já existe um espaço com esse nome."),_.focus();return}await oi(a.id,p,y,Ya(e,"editar-espaco")),Ne(e,t)}),(W=e.querySelector("#btn-detalhes"))==null||W.addEventListener("click",async()=>{const p=Array.from(s.values()).reduce((oe,ve)=>oe+ve,0),y=Z(),T=await hi(a.id);let C,N,H;if(a.arquivado&&a.arquivado_em){const oe=we(Z(new Date(a.criado_em)),Z(new Date(a.arquivado_em)));C=String(oe),N="Dias até arquivar",H=`Criado em ${re(a.criado_em)} · arquivado em ${re(a.arquivado_em)}`}else if(a.arquivado)C="—",N="Duração",H=`Criado em ${re(a.criado_em)} · arquivado antes desse registro de data existir`;else{const oe=we(Z(new Date(a.criado_em)),y);C=String(oe),N=oe===1?"Dia ativo":"Dias ativo",H=`Criado em ${re(a.criado_em)}`}ao({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${o.length}</div>
            <div class="stat-tile__label">Temas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${p}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Tt(T)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${C}</div>
            <div class="stat-tile__label">${N}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${H} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(G=e.querySelector("#btn-avaliar"))==null||G.addEventListener("click",async()=>{const p=await cs(a.id),y={perfilId:a.perfil_id,espacoId:a.id,nomeContexto:a.nome,tipo:"espaco"};so(e,p,y,()=>Ne(e,t))}),(ae=e.querySelector("#btn-excluir"))==null||ae.addEventListener("click",async()=>{const p=await Ga(a.id);await ie({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o espaço com ${p.temas} tema(s) e ${p.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ka(a.id),z("espacos"))});const h=e.querySelector("#form-novo-tema"),A=()=>{var p;h&&(h.style.display="block"),(p=e.querySelector("#input-categoria-tema"))==null||p.focus()};(g=e.querySelector("#btn-novo-tema"))==null||g.addEventListener("click",A),(I=e.querySelector("#btn-empty-novo-tema"))==null||I.addEventListener("click",A),(q=e.querySelector("#btn-cancelar-tema"))==null||q.addEventListener("click",()=>{h&&(h.style.display="none")});const D=e.querySelector("#input-nome-tema"),x=e.querySelector("#input-categoria-tema");l&&D.addEventListener("input",()=>ye(D),{once:!0}),d&&x.addEventListener("input",()=>ye(x),{once:!0});for(const p of[D,x])p.addEventListener("input",()=>Le(p));e.querySelectorAll("[data-novo-tema-categoria]").forEach(p=>{p.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),h&&(h.style.display="block"),x.value=p.dataset.novoTemaCategoria,ye(x),D.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(b=e.querySelector("#btn-salvar-tema"))==null||b.addEventListener("click",async()=>{const p=D.value.trim(),y=x.value.trim();if(!Oe([{input:x,ok:y.length>0,mensagem:"Informe uma categoria para o tema."}]))return;const T=H=>H.trim().toLowerCase();if(o.some(H=>T(H.categoria)===T(y)&&T(H.nome)===T(p)&&p.length>0)){Ae(D,"Já existe um tema com esse nome nesta categoria."),D.focus();return}const N=await li(t,p,y);z(`temas/${N.id}`)}),e.querySelectorAll("[data-open]").forEach(p=>{p.addEventListener("click",()=>z(`temas/${p.dataset.open}`))})}async function qi(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function Ti(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(c=>!c.excluido),s=Pt(o),i=Lt()==="titulo",n=[];for(const c of s){const r=[];for(const d of c.itens){const l=(await t.getAllFromIndex("notas","tema_id",d.id)).filter(v=>!v.excluido);i?me(l,v=>v.titulo):l.sort((v,f)=>v.criado_em.localeCompare(f.criado_em));const u=[];for(const v of l){const $=(await t.getAllFromIndex("itens_revisao","nota_id",v.id)).map(_=>_.avaliacao).filter(_=>!!_);u.push({nota:v,fraca:fi($)})}r.push({tema:d,notas:u})}n.push({categoria:c.categoria,temas:r})}return{espaco:a,grupos:n}}function at(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Ze.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const ca=["•","◦","▪"];function ro(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${at(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const i=Math.floor((t.length-t.trimStart().length)/2),n=ca[Math.min(i,ca.length-1)];return`${"  ".repeat(i)}${n} ${at(s[1])}`}return at(a)}).join(`
`)}function Ci(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",ro(e.conteudo)),t.join(`
`).trim()}function Mi(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of oo(t))if(o.temas.length!==0){a.push("",`▸ ${o.numero} ${(o.grupo.categoria||"sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.numero} ${s.temaPdf.tema.favorito?"⭐ ":""}*${V(s.temaPdf.tema.nome)}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const i of s.notas){const n=`${i.notaPdf.nota.favorito?"⭐ ":""}${i.notaPdf.fraca?"⚠ ":""}`;a.push("",`${n}${i.numero} *${i.notaPdf.nota.titulo||"(sem título)"}*`),i.notaPdf.nota.fonte&&a.push(`_${i.notaPdf.nota.fonte}_`),a.push(ro(i.notaPdf.nota.conteudo))}}}return a.join(`
`).trim()}const la="memoriza:pdf:indice",da="memoriza:pdf:quebraCategoria";function ua(e,t){const a=localStorage.getItem(e);return a===null?t:a==="1"}function ma(e,t){localStorage.setItem(e,t?"1":"0")}function se(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Ii(e,t,a){var R,B;const o=await Ti(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,i=a===void 0?o.grupos:o.grupos.filter(L=>L.categoria===a),n=Mi(s,i),c=ja(s.cor,K(s.id)),r=ce($e(s)),d=oo(i),l=$i(d),u=Nt(i.map(L=>L.categoria)),v=L=>u.get(ke(L))??K(ke(L)),f=i.every(L=>L.temas.length===0),$=i.length>1,_=$&&ua(la,!0),S=$&&ua(da,!0);e.innerHTML=`
    <div class="pdf-toolbar no-print">
      <button class="btn btn--secondary btn--sm" data-back type="button">← Voltar</button>
      <button class="btn btn--primary btn--sm" id="btn-imprimir" type="button">Imprimir / Salvar como PDF</button>
      <button class="btn btn--secondary btn--sm" id="btn-copiar" type="button">Copiar texto</button>
      ${$?`
        <label class="pdf-opcao"><input type="checkbox" id="pdf-opcao-indice" ${_?"checked":""}> Índice</label>
        <label class="pdf-opcao"><input type="checkbox" id="pdf-opcao-quebra" ${S?"checked":""}> Nova página por Categoria</label>
      `:""}
      <span class="text-muted" style="font-size: var(--font-size-sm);">
        "Imprimir" e depois "Salvar como PDF" (ou similar) gera o arquivo. "Copiar texto" é pra colar direto numa conversa, ex: WhatsApp.
      </span>
    </div>

    <article class="pdf-page" data-quebra="${S?"categoria":"fluxo"}">
      <header class="pdf-capa">
        <h1>
          <span class="espaco-icon-inline" style="--badge-accent:${c}" aria-hidden="true">${r.svg}</span>${m(s.nome)}
        </h1>
        <p class="pdf-meta">
          ${a!==void 0?`Categoria: ${m(He(a))} · `:""}Gerado em ${re(Z()+"T00:00:00Z")}
          · ${se(i.length,"categoria")} · ${se(l.totalTemas,"tema")} · ${se(l.totalNotas,"nota")}
        </p>
      </header>

      ${f?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:""}

      ${$?`
        <nav class="pdf-indice" id="pdf-indice" aria-label="Índice" ${_?"":"hidden"}>
          <div class="pdf-indice__cabecalho">
            <span class="pdf-indice__titulo">Índice</span>
            <span class="pdf-contagem">${se(i.length,"categoria")} · ${se(l.totalTemas,"tema")} · ${se(l.totalNotas,"nota")}</span>
          </div>
          <ul class="pdf-indice__lista">
            ${l.linhas.map(L=>`
              <li class="pdf-indice__item pdf-indice__item--${L.nivel}">
                <button class="pdf-indice__link" type="button" data-ancora="${L.anexo}">
                  <span class="pdf-num">${L.numero}</span>
                  <span class="pdf-indice__nome">${m(L.nome)}</span>
                  <span class="pdf-contagem">${se(L.notas,"nota")}</span>
                </button>
              </li>
            `).join("")}
          </ul>
        </nav>
      `:""}

      ${d.map((L,U)=>{const Q=v(L.grupo.categoria);return`
        <section class="pdf-category${U===0?" pdf-category--primeira":""}" id="${Ei(L)}" style="--cat-accent:${Q}">
          <div class="pdf-category__title">
            <span class="pdf-num">${L.numero}</span>
            <span class="color-dot" style="--dot-color:${Q}" aria-hidden="true"></span>
            <span class="pdf-nivel">Categoria</span>
            <span class="pdf-category__nome">${m(He(L.grupo.categoria))}</span>
            <span class="pdf-contagem">${se(L.temas.length,"tema")} · ${se(L.totalNotas,"nota")}</span>
          </div>
          ${L.temas.map(W=>`
            <section class="pdf-tema" id="${xi(W)}" style="--tema-accent:${Q}">
              <div class="pdf-tema__title">
                <span class="pdf-num pdf-num--tema">${W.numero}</span>
                <span class="pdf-nivel">Tema</span>
                ${W.temaPdf.tema.favorito?`${E.star} `:""}<span class="pdf-tema__nome">${m(V(W.temaPdf.tema.nome))}</span>
                <span class="pdf-contagem">${se(W.notas.length,"nota")}</span>
              </div>
              ${W.notas.length===0?'<p class="text-muted">Sem notas.</p>':W.notas.map(G=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    <span class="pdf-num pdf-num--nota">${G.numero}</span>
                    ${G.notaPdf.nota.favorito?`${E.star} `:""}
                    <span class="pdf-nota__nome">${m(G.notaPdf.nota.titulo||"(sem título)")}</span>
                    ${G.notaPdf.fraca?`<span class="badge badge--danger">${E.alert} Reforçar</span>`:""}
                  </div>
                  ${G.notaPdf.nota.fonte?`<div class="pdf-nota__meta">${m(G.notaPdf.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${Je(G.notaPdf.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `).join("")}
        </section>
      `}).join("")}
    </article>
  `,(R=e.querySelector("[data-back]"))==null||R.addEventListener("click",()=>z(`espacos/${t}`)),(B=e.querySelector("#btn-imprimir"))==null||B.addEventListener("click",()=>window.print());const h=e.querySelector("#pdf-indice"),A=e.querySelector("#pdf-opcao-indice");A==null||A.addEventListener("change",()=>{h&&(h.hidden=!A.checked),ma(la,A.checked)});const D=e.querySelector(".pdf-page"),x=e.querySelector("#pdf-opcao-quebra");x==null||x.addEventListener("change",()=>{D&&(D.dataset.quebra=x.checked?"categoria":"fluxo"),ma(da,x.checked)}),e.querySelectorAll("[data-ancora]").forEach(L=>{L.addEventListener("click",()=>{var U;(U=document.getElementById(L.dataset.ancora??""))==null||U.scrollIntoView({behavior:"smooth",block:"start"})})});const M=e.querySelector("#btn-copiar");M==null||M.addEventListener("click",async()=>{const L=M.textContent;try{await navigator.clipboard.writeText(n),M.textContent="Copiado!"}catch{M.textContent="Não foi possível copiar"}setTimeout(()=>{M.textContent=L},1800)})}async function Pe(e,t){var u,v,f,$,_,S,h,A,D;const a=await to(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await Rt(a.espaco_id),s=await Ta(t),i=o?await eo(o.id):[],n=zt(i.map(x=>x.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${Bt([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:V(a.nome)}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${K(c)}"></span>${a.favorito?`${E.star} `:""}${m(V(a.nome))}
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
            <button id="btn-detalhes-tema" type="button">${E.info} Detalhes</button>
            <button id="btn-avaliar-tema" type="button">${E.dice} Avaliar notas</button>
            <button id="btn-excluir-tema" class="danger" type="button">Excluir tema</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-tema" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-categoria-tema-editar">Categoria</label>
        <input class="input" id="input-categoria-tema-editar" type="text" value="${m(a.categoria)}" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${Fe(n,"input-categoria-tema-editar")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-tema-editar">Nome (opcional)</label>
        <input class="input" id="input-nome-tema-editar" type="text" value="${m(a.nome)}" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${o!=null&&o.arquivado?`<div class="banner banner--warning"><span>O espaço "${m(o.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`:""}

    ${s.length===0?`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${E.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${o!=null&&o.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>'}
      </div>
    `:`
      <div class="item-list">
        ${s.map(x=>`
          <button class="item-row" data-open="${m(x.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${K(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${x.favorito?`${E.star} `:""}${m(x.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${m(x.fonte||"Sem fonte")}${x.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${x.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,Vt(e),Ft(e),(u=e.querySelector("#btn-nova-nota"))==null||u.addEventListener("click",()=>z(`temas/${t}/nova-nota`)),(v=e.querySelector("#btn-empty-nova-nota"))==null||v.addEventListener("click",()=>z(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(x=>{x.addEventListener("click",()=>z(`notas/${x.dataset.open}`))}),(f=e.querySelector("#btn-favoritar-tema"))==null||f.addEventListener("click",async()=>{await ui(a.id),Pe(e,t)}),($=e.querySelector("#btn-detalhes-tema"))==null||$.addEventListener("click",async()=>{const x=await yi(a.id),M=we(Z(new Date(a.criado_em)),Z());ao({title:V(a.nome),bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Tt(x)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${M}</div>
            <div class="stat-tile__label">${M===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${re(a.criado_em)}</p>
      `})}),(_=e.querySelector("#btn-avaliar-tema"))==null||_.addEventListener("click",()=>{const x=s.map(R=>({nota:R,tema:a})),M={perfilId:o.perfil_id,espacoId:a.espaco_id,nomeContexto:V(a.nome),tipo:"tema"};so(e,x,M,()=>Pe(e,t))});const r=e.querySelector("#form-editar-tema"),d=e.querySelector("#input-nome-tema-editar"),l=e.querySelector("#input-categoria-tema-editar");(S=e.querySelector("#btn-editar-tema"))==null||S.addEventListener("click",()=>{r.style.display="block",l.focus()}),(h=e.querySelector("#btn-cancelar-edicao-tema"))==null||h.addEventListener("click",()=>{r.style.display="none"});for(const x of[d,l])x.addEventListener("input",()=>Le(x));(A=e.querySelector("#btn-salvar-edicao-tema"))==null||A.addEventListener("click",async()=>{const x=d.value.trim(),M=l.value.trim();if(!Oe([{input:l,ok:M.length>0,mensagem:"Informe uma categoria para o tema."}]))return;const R=L=>L.trim().toLowerCase();if(i.some(L=>L.id!==a.id&&R(L.categoria)===R(M)&&R(L.nome)===R(x)&&x.length>0)){Ae(d,"Já existe um tema com esse nome nesta categoria."),d.focus();return}await di(a.id,x,M),Pe(e,t)}),(D=e.querySelector("#btn-excluir-tema"))==null||D.addEventListener("click",async()=>{const x=await mi(a.id);await ie({title:`Excluir "${V(a.nome)}"?`,message:`Isso manda pra Lixeira o tema com ${x.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await pi(a.id),z(`espacos/${a.espaco_id}`))})}function Ce(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${m(e)}</div>
    </details>
  `}let Xe=!1,$t=null;function Di(e){Xe=e}function pa(){Xe=!1}function Ni(e){$t=e}function xe(){return Xe?$t?$t():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function Pi(){window.addEventListener("beforeunload",e=>{Xe&&(e.preventDefault(),e.returnValue="")})}const zi={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function ot(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function Ve(e,t){var Q,W,G,ae,g,I,q;const a=t.mode==="nova"?t.temaId:(Q=await ta(t.notaId))==null?void 0:Q.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await to(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await Rt(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${m(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(W=e.querySelector("#btn-voltar-arquivado"))==null||W.addEventListener("click",()=>z(`temas/${a}`));return}const i=t.mode==="editar"?await ta(t.notaId):void 0,n=i?await ji(i.id):!1,c=t.mode==="nova"?(await Ta(a)).at(-1):void 0,r=c==null?void 0:c.titulo,d=c==null?void 0:c.fonte;e.innerHTML=`
    ${Bt([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:V(o.nome),route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(i==null?void 0:i.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&i?`<div class="section-header__meta text-muted">Criada em ${re(i.criado_em)}${i.atualizado_em!==i.criado_em?` · Editada em ${re(i.atualizado_em)}`:""}</div>`:""}
      </div>
      ${t.mode==="editar"?`
        <div class="section-header__actions">
          <button class="btn btn--secondary btn--sm" id="btn-favoritar-nota" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
            ${i!=null&&i.favorito?"★ Favorito":"☆ Favoritar"}
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

    ${t.mode==="editar"&&i&&!i.titulo_revisado?'<div class="banner banner--warning"><span>Esta nota foi migrada automaticamente — revise o título abaixo (hoje ele é uma cópia da Fonte antiga).</span></div>':""}

    <div class="content-narrow content-wide">
    <div class="card stack">
      <div class="field">
        <label class="field__label" for="input-titulo">Título${Ce('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${r?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${m((i==null?void 0:i.titulo)??r??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${r?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${Ce("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${d?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${m((i==null?void 0:i.fonte)??d??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${d?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${Ce("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
        <div class="editor-toolbar" role="toolbar" aria-label="Formatação do conteúdo">
          <button type="button" class="editor-toolbar__btn" data-cmd="bold" title="Negrito (Ctrl+B)" aria-label="Negrito"><strong>N</strong></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="italic" title="Itálico (Ctrl+I)" aria-label="Itálico"><em>I</em></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="underline" title="Sublinhado (Ctrl+U)" aria-label="Sublinhado"><u>U</u></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="strikeThrough" title="Tachado (Ctrl+S)" aria-label="Tachado"><s>S</s></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="insertUnorderedList" title="Lista com marcadores (Tab indenta, Shift+Tab volta)" aria-label="Lista com marcadores">☰</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="createLink" title="Link (Ctrl+K)" aria-label="Link">🔗</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="removeFormat" title="Limpar formatação" aria-label="Limpar formatação">⌫</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <button type="button" class="editor-toolbar__btn" data-cmd="undo" title="Desfazer (Ctrl+Z)" aria-label="Desfazer">${E.undo}</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="redo" title="Refazer (Ctrl+Y ou Ctrl+Shift+Z)" aria-label="Refazer">${E.redo?E.redo:E.undo}</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <div class="color-picker" role="group" aria-label="Cor do texto">
            ${Ze.map(b=>`<button type="button" class="color-picker__swatch" data-cor="${b}" style="--dot-color:${zi[b]}" title="${m(oa[b])}" aria-label="${m(oa[b])}"></button>`).join("")}
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
        >${i!=null&&i.conteudo?Je(i.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${i!=null&&i.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${Ce("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
        </div>
      </div>

      <div class="field" id="wrapper-validade" style="display:${i!=null&&i.pode_desatualizar?"flex":"none"};">
        <label class="field__label" for="input-validade">Válido até</label>
        <input class="input" id="input-validade" type="date" value="${m((i==null?void 0:i.validade_ate)??"")}" style="max-width: 200px;" />
      </div>

      <div class="form-actions">
        <button class="btn btn--primary" id="btn-salvar" type="button">Salvar</button>
        <button class="btn btn--secondary" id="btn-cancelar" type="button">Cancelar</button>
      </div>
    </div>

    ${t.mode==="editar"&&i?`
      <div class="card stack" style="margin-top: var(--space-5);">
        <div class="settings-row__label">Revisão</div>
        ${n?`
          <p class="text-muted">Essa nota está na fila de revisão normalmente.</p>
          <div class="form-actions">
            <button class="btn btn--secondary btn--sm" id="btn-parar-revisar" type="button">Parar de revisar</button>
          </div>
        `:'<p class="text-muted">Essa nota não está mais na fila de revisão (estágio "consulta").</p>'}
      </div>
    `:""}
    </div>
  `;const l=`temas/${a}`;Vt(e),(G=e.querySelector("#btn-cancelar"))==null||G.addEventListener("click",()=>{xe()&&(pa(),z(l))});const u=e.querySelector("#input-conteudo"),v=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),$=()=>Di(!0);v.addEventListener("input",$),f.addEventListener("input",$),u.addEventListener("input",$),Ni(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),r&&v.addEventListener("input",()=>ye(v),{once:!0}),d&&f.addEventListener("input",()=>ye(f),{once:!0}),u.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function _(b){var y,T;let p=((T=(y=window.getSelection())==null?void 0:y.getRangeAt(0))==null?void 0:T.commonAncestorContainer)??null;for(;p&&p!==u;){if(p instanceof HTMLElement&&p.tagName===b)return!0;p=p.parentNode}return!1}function S(){const b=window.getSelection();if(!b||b.rangeCount===0)return;let p=b.getRangeAt(0).commonAncestorContainer;for(;p&&p!==u;){if(p instanceof HTMLElement&&p.tagName==="LI"){const y=document.createRange();y.selectNodeContents(p),y.collapse(!1),b.removeAllRanges(),b.addRange(y);return}p=p.parentNode}}function h(){u.querySelectorAll("p").forEach(b=>{b.querySelector("ul")&&b.replaceWith(...Array.from(b.childNodes))})}function A(){const b=window.getSelection(),p=b.getRangeAt(0);p.deleteContents();const y=document.createElement("br");p.insertNode(y);const T=document.createTextNode("​");y.after(T);const C=document.createRange();return C.setStart(T,1),C.collapse(!0),b.removeAllRanges(),b.addRange(C),{br:y,ancora:T}}function D(){if(!x)return;const{br:b,ancora:p}=x;if(x=null,!document.contains(p))return;const y=p.parentNode;if(!y)return;const T=Array.from(y.childNodes).indexOf(p);p.remove();const C=window.getSelection();if(!C||!document.contains(b))return;const N=document.createRange();N.setStart(y,T),N.collapse(!0),C.removeAllRanges(),C.addRange(N)}let x=null;u.addEventListener("keydown",b=>{if(b.key!=="Enter"||b.shiftKey||b.ctrlKey||b.metaKey||b.altKey||_("LI")){x=null;return}b.preventDefault(),x&&document.contains(x.br)?(x.ancora.remove(),x.br.remove(),document.execCommand("insertParagraph"),x=null):x=A()}),u.addEventListener("mousedown",()=>{x=null}),u.addEventListener("keydown",b=>{b.key!=="Tab"||!_("LI")||(b.preventDefault(),D(),document.execCommand(b.shiftKey?"outdent":"indent"),h())});function M(){var b;u.classList.toggle("is-empty",!((b=u.textContent)!=null&&b.trim()))}u.addEventListener("input",()=>{if(u.childNodes.length===0){u.innerHTML="<p><br></p>";const b=u.firstChild,p=document.createRange();p.setStart(b,0),p.collapse(!0);const y=window.getSelection();y==null||y.removeAllRanges(),y==null||y.addRange(p)}M()}),M(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(b=>{b.addEventListener("mousedown",p=>p.preventDefault()),b.addEventListener("click",()=>{D();const p=b.dataset.cmd;if(p==="strikeThrough")document.execCommand("strikeThrough");else if(p==="createLink"){const y=window.getSelection();if(!y||y.isCollapsed){u.focus();return}const T=prompt("URL do link:","https://");T&&T.trim()&&document.execCommand("createLink",!1,T.trim())}else p==="removeFormat"?document.execCommand("removeFormat"):document.execCommand(p);p==="insertUnorderedList"&&(h(),S()),u.focus(),U()})}),e.querySelectorAll(".color-picker__swatch").forEach(b=>{b.addEventListener("mousedown",p=>p.preventDefault()),b.addEventListener("click",()=>{D();const p=b.dataset.cor,y=window.getSelection();if(!y||y.rangeCount===0||y.isCollapsed)return;const T=y.getRangeAt(0);if(!u.contains(T.commonAncestorContainer))return;const C=T.extractContents();ot(C);const N=document.createElement("span");N.className=`text-color text-color--${p}`,N.appendChild(C),T.insertNode(N),y.removeAllRanges();const H=document.createRange();H.selectNodeContents(N),y.addRange(H),u.focus()})});const R=e.querySelector("[data-cor-limpar]");R.addEventListener("mousedown",b=>b.preventDefault()),R.addEventListener("click",()=>{D();const b=window.getSelection();if(!b||b.rangeCount===0)return;const p=b.getRangeAt(0);if(u.contains(p.commonAncestorContainer)){if(p.collapsed){let y=p.commonAncestorContainer;for(;y&&y!==u;){if(y instanceof HTMLElement&&y.classList.contains("text-color")){const T=y.parentNode;if(T){const C=document.createDocumentFragment();Array.from(y.childNodes).forEach(N=>C.appendChild(N)),T.replaceChild(C,y),ot(T)}break}y=y.parentNode}}else{const y=p.extractContents();ot(y),p.insertNode(y)}u.focus()}});const B=e.querySelector("#input-pode-desatualizar"),L=e.querySelector("#wrapper-validade");B.addEventListener("change",()=>{L.style.display=B.checked?"flex":"none"});function U(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(p=>{const y=p.dataset.cmd;try{y==="bold"||y==="italic"||y==="underline"||y==="strikeThrough"||y==="insertUnorderedList"?p.setAttribute("aria-pressed",document.queryCommandState(y)?"true":"false"):p.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===u&&U()}),u.addEventListener("keyup",U),u.addEventListener("mouseup",U),u.addEventListener("focus",U),u.addEventListener("keydown",b=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?b.metaKey:b.ctrlKey))return;let T=!0;switch(b.key.toLowerCase()){case"b":b.preventDefault(),document.execCommand("bold");break;case"i":b.preventDefault(),document.execCommand("italic");break;case"u":b.preventDefault(),document.execCommand("underline");break;case"s":b.preventDefault(),document.execCommand("strikeThrough");break;case"k":b.preventDefault(),D();const C=window.getSelection();if(C&&!C.isCollapsed){const N=prompt("URL do link:","https://");N&&N.trim()&&document.execCommand("createLink",!1,N.trim())}break;case"z":b.preventDefault(),b.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":b.preventDefault(),document.execCommand("redo");break;default:T=!1}T&&U()}),(ae=e.querySelector("#btn-salvar"))==null||ae.addEventListener("click",async()=>{const b=v.value.trim(),p=Ks(u).trim();let y=null;const T=(H,oe)=>{var Te;H.classList.add("input--error"),H.setAttribute("aria-invalid","true");const ve=(Te=H.closest(".field"))==null?void 0:Te.querySelector(".field__error");ve&&(ve.textContent=oe,ve.style.display="block"),y||(y=H)},C=H=>{H.classList.remove("input--error"),H.removeAttribute("aria-invalid")};if(b||T(v,"Informe um título para a nota."),p||T(u,"Informe o conteúdo da nota."),y){y.focus();return}C(v),C(u);const N={titulo:b,conteudo:p,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:B.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await ls(a,N):await ds(t.notaId,N),pa(),z(l)}),t.mode==="editar"&&i){(g=e.querySelector("#btn-favoritar-nota"))==null||g.addEventListener("click",async()=>{await us(i.id),Ve(e,t)}),(I=e.querySelector("#btn-parar-revisar"))==null||I.addEventListener("click",async()=>{await Vs(i.id),Ve(e,t)});const b=e.querySelector("#btn-compartilhar-nota");b==null||b.addEventListener("click",async()=>{const p=Ci(i);if(navigator.share){try{await navigator.share({title:i.titulo||"Nota",text:p})}catch{}return}const y=b.textContent;try{await navigator.clipboard.writeText(p),b.textContent="Copiado!"}catch{b.textContent="Não foi possível copiar"}setTimeout(()=>{b.textContent=y},1800)}),(q=e.querySelector("#btn-excluir-nota"))==null||q.addEventListener("click",async()=>{await ie({title:"Excluir esta nota?",message:"A nota vai pra Lixeira e dá pra restaurar em Configurações → Lixeira por até 30 dias."})&&(await ms(i.id),z(l))})}}async function ji(e){return(await(await k()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function Ri(e){return e.length===10?e:Z(new Date(e))}function Fi(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function Oi(e){const t=new Set;for(const a of e)a&&t.add(Ri(a));return t}function co(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function st(e){return e.size}function Hi(e,t,a=365,o=Z()){const s=Y(o,-a+1),i=[];let n=s;for(;n<=o;)i.push({date:n,count:(e.has(n)?1:0)+(t.has(n)?1:0),hasRevisao:e.has(n),hasCriacao:t.has(n)}),n=Y(n,1);const c=st(e),r=st(t),d=st(co(e,t));return{days:i,totalDiasRevisao:c,totalDiasCriacao:r,totalDiasAtividade:d}}async function lo(e){const t=await k(),a=Z(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const A=await t.getAllFromIndex("espacos","perfil_id",e),x=(await Promise.all(A.map(R=>t.getAllFromIndex("temas","espaco_id",R.id)))).flat();return(await Promise.all(x.map(R=>t.getAllFromIndex("notas","tema_id",R.id)))).flat()})()]),i=o.filter(A=>A.data_concluida).map(A=>A.data_concluida),n=Fi(i),c=Oi(s.map(A=>A.criado_em)),r=o.filter(A=>A.data_concluida===a).length,d=s.filter(A=>Z(new Date(A.criado_em))===a).length,l=a.slice(0,4),u=a.slice(5,7),v=`${l}-${u}`,f=i.filter(A=>A.startsWith(v)).length,$=s.filter(A=>Z(new Date(A.criado_em)).startsWith(v)).length,_=n.size,S=c.size,h=co(n,c).size;return{datasRevisaoSet:n,datasCriacaoSet:c,totalDiasRevisao:_,totalDiasCriacao:S,totalDiasAtividade:h,notasCriadasHoje:d,revisoesFeitasHoje:r,notasCriadasEsteMes:$,revisoesFeitasEsteMes:f}}async function Bi(e,t=365){const a=await lo(e);return Hi(a.datasRevisaoSet,a.datasCriacaoSet,t)}function Vi(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function Ui(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const i=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let r=0;r<i;r++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const r of e)s.push(r),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(r=>`
          <div class="heatmap__col">
            ${r.map(d=>`
              <div class="heatmap__cell heatmap__cell--${Vi(d.count)}${d.date?"":" heatmap__cell--empty"}" title="${d.date?`${d.date}${d.count?` · ${d.count} atividade(s)`:""}${d.hasRevisao&&d.hasCriacao?" (revisão + criação)":d.hasRevisao?" (revisão)":d.hasCriacao?" (criação)":""}`:""}"></div>
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
  `}const Gi={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function Ki(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Wi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Zi(e,t){const a=await bi(t.perfilId),o=await lo(t.perfilId),s=await Bi(t.perfilId,365),i=await wi(t.perfilId),n=["dom","seg","ter","qua","qui","sex","sáb"],c=new Date().getDay(),r=Math.max(1,...a.cargaProximos7.map(v=>v.count)),d=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null,l=i.total>0?{facil:Math.round(i.facil/i.total*100),medio:Math.round(i.medio/i.total*100),dificil:Math.round(i.dificil/i.total*100)}:null;e.innerHTML=`
    <div class="tabs" role="tablist" aria-label="Painel">
      <button class="tabs__tab" role="tab" aria-selected="true" data-tab="visao">Visão geral</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="revisao">Revisão</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="avaliacoes">Avaliações</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="evolucao">Evolução</button>
    </div>

    <div id="tab-visao" role="tabpanel">
      <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os números gerais: quantas revisões fez, quanto tempo passou e o tamanho da sua coleção.</p>

      <div class="streak-hero">
        <div class="streak-hero__flame" aria-hidden="true">${E.flame}</div>
        <div class="streak-hero__count">${a.streakDias}</div>
        <div class="streak-hero__label">${a.streakDias===1?"dia seguido estudando":"dias seguidos estudando"}</div>
        <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${a.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
          ${a.diasAtivosUltimos7.map((v,f)=>{const $=(c-(6-f)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${v?"streak-hero__day--ativo":""}"></span>
                  <span class="streak-hero__day-label">${n[$]}</span>
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
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Tt(a.tempoHojeSegundos)}</div>
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
    </div>

    <div id="tab-revisao" role="tabpanel" style="display:none;">
      <p class="screen-hint" style="margin-top:0;">Como a revisão espaçada está indo: onde suas notas estão na escada, a carga dos próximos dias, sua retenção recente e os Temas onde você mais marca "Difícil" — os pontos fracos reais.</p>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Onde suas notas estão na escada</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Quantas notas pendentes estão hoje em cada estágio — quanto mais em 30/180 dias, melhor sua retenção.</p>
      <div class="stage-grid">
        ${a.porEstagio.map(v=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${v.count}</div>
            <div class="stage-tile__label">${Gi[v.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${E.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(v=>`${v.count} em ${Wi(v.data)}`).join(", ")}">
        ${a.cargaProximos7.map(v=>{const f=Ki(v.data);return`
            <div class="load-chart__col">
              <div class="load-chart__val">${v.count}</div>
              <div class="load-chart__bar">
                <div class="load-chart__fill" style="height: ${v.count/r*100}%"></div>
              </div>
              <div class="load-chart__label">${f}</div>
            </div>
          `}).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Retenção · últimos 30 dias</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">% de Fácil, Médio e Difícil nas revisões feitas — o quanto você realmente está lembrando.</p>
      ${a.retencao30.total===0?'<p class="text-muted">Ainda não há avaliações em 30 dias.</p>':`
        <div class="retention-bar" role="img" aria-label="Fácil ${d.facil}%, Médio ${d.medio}%, Difícil ${d.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${d.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${d.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${d.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${d.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${d.medio}%</span>
          <span class="badge badge--success">Fácil ${d.facil}%</span>
          <span class="text-muted" style="font-size: var(--font-size-xs);">${a.retencao30.total} avaliada(s)</span>
        </div>
      `}

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Temas com mais "Difícil"</span>
      </div>
      ${a.rankingDificeis.length===0?'<p class="text-muted">Nenhuma avaliação "Difícil" registrada ainda.</p>':`
        <div class="rank-list">
          ${a.rankingDificeis.map((v,f)=>`
            <div class="rank-row">
              <span>${f+1}. ${m(v.temaNome)}</span>
              <span class="badge badge--danger">${v.count}× difícil</span>
            </div>
          `).join("")}
        </div>
      `}
    </div>

    <div id="tab-avaliacoes" role="tabpanel" style="display:none;">
      <p class="screen-hint" style="margin-top:0;">Seu autoteste com Fácil, Médio e Difícil — à parte da fila de revisão espaçada. Vem do botão "Avaliar" num Espaço ou Tema.</p>

      ${i.total===0?'<p class="text-muted">Nenhuma avaliação registrada ainda. Abra um Espaço (ou um Tema) e toque em "Avaliar".</p>':`
        <div class="stat-grid">
          <div class="stat-tile">
            <div class="stat-tile__value">${i.total}</div>
            <div class="stat-tile__label">Notas avaliadas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${i.sessoesTotal}</div>
            <div class="stat-tile__label">Sessões</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${l.facil}%</div>
            <div class="stat-tile__label">Fácil</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${l.dificil}%</div>
            <div class="stat-tile__label">Difícil</div>
          </div>
        </div>

        <div class="retention-bar" role="img" aria-label="Fácil ${l.facil}%, Médio ${l.medio}%, Difícil ${l.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${l.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${l.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${l.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${l.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${l.medio}%</span>
          <span class="badge badge--success">Fácil ${l.facil}%</span>
          ${i.ultimaEm?`<span class="text-muted" style="font-size: var(--font-size-xs);">última: ${m(ue(i.ultimaEm))}</span>`:""}
        </div>

        <div class="section-header">
          <span class="section-header__title" style="font-size: var(--font-size-base);">Sessões recentes</span>
        </div>
        <div class="rank-list">
          ${i.sessoes.map(v=>`
            <div class="rank-row">
              <span>${m(v.contexto)} <span class="text-muted">· ${v.total} nota(s) · ${m(ue(v.criado_em))}</span></span>
              <span style="display:flex; gap: var(--space-2); flex-wrap:wrap; justify-content:flex-end;">
                ${v.facil>0?`<span class="badge badge--success">${v.facil} fácil</span>`:""}
                ${v.medio>0?`<span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">${v.medio} médio</span>`:""}
                ${v.dificil>0?`<span class="badge badge--danger">${v.dificil} difícil</span>`:""}
              </span>
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
      ${Ui(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `;const u=["visao","revisao","avaliacoes","evolucao"];e.querySelectorAll(".tabs__tab").forEach(v=>{v.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(f=>{f.setAttribute("aria-selected",String(f===v))});for(const f of u){const $=e.querySelector(`#tab-${f}`);$&&($.style.display=v.dataset.tab===f?"block":"none")}})})}async function Ji(e){const t=await k(),a=(await t.getAllFromIndex("espacos","perfil_id",e)).filter(d=>!d.excluido),o=await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id))),s=[],i=[],n=new Map;for(let d=0;d<a.length;d++){const l=a[d],u=o[d].filter(v=>!v.excluido);for(const v of u)n.set(v.id,l),v.favorito&&s.push({tema:v,espaco:l})}const c=o.flat().filter(d=>!d.excluido),r=await Promise.all(c.map(d=>t.getAllFromIndex("notas","tema_id",d.id)));for(let d=0;d<c.length;d++){const l=c[d],u=r[d].filter(f=>!f.excluido),v=n.get(l.id);if(v)for(const f of u)f.favorito&&i.push({nota:f,tema:l,espaco:v})}return{temas:me(s,d=>d.tema.nome),notas:me(i,d=>d.nota.titulo||d.tema.nome)}}async function Xi(e,t){var d;const{temas:a,notas:o}=await Ji(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${E.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(d=e.querySelector("#btn-empty-espacos"))==null||d.addEventListener("click",()=>z("espacos"));return}const s=new Map;for(const l of a){const u=s.get(l.espaco.id)??{espaco:l.espaco,itens:[]};u.itens.push(l),s.set(l.espaco.id,u)}const i=new Map;for(const l of o){const u=i.get(l.tema.id)??{temaNome:V(l.tema.nome),espaco:l.espaco,itens:[]};u.itens.push(l),i.set(l.tema.id,u)}const n=new Map;for(const l of a)n.set(l.espaco.id,l.espaco);for(const l of o)n.set(l.espaco.id,l.espaco);const c=Ra([...n.values()]),r=l=>{const u=c.get(l.id)??K(l.id),v=ce($e(l));return`<span class="espaco-icon-inline" style="--badge-accent:${u}" aria-hidden="true">${v.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(l=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(l.espaco.id)??K(l.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(l.espaco)}${m(l.espaco.nome)}
          </div>
          <div class="item-list">
            ${l.itens.map(u=>`
              <button class="item-row" data-tema="${m(u.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(l.espaco.id)??K(l.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${E.star} ${m(V(u.tema.nome))}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}

    ${o.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${a.length>0?"var(--space-6)":"0"};">Notas favoritas</div>
      ${Array.from(i.values()).map(l=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(l.espaco.id)??K(l.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(l.espaco)}${m(l.temaNome)} <span class="queue-group__espaco"> · ${m(l.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${l.itens.map(u=>`
              <button class="item-row" data-nota="${m(u.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(l.espaco.id)??K(l.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${E.star} ${m(u.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${m(u.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(l=>{l.addEventListener("click",()=>z(`temas/${l.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(l=>{l.addEventListener("click",()=>z(`notas/${l.dataset.nota}`))})}const Qi=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Yi=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (categoria: Capítulos)
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência (categoria: Capítulos)
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,en=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,tn=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      "Bíblia" pra estudos bíblicos. Ela é <strong>obrigatória</strong> e vem como o primeiro
      campo ao criar um Espaço, porque é ela que aparece por primeiro na tela (os Espaços ficam
      agrupados por categoria). Essas três já aparecem sugeridas na hora de criar um Espaço novo,
      mesmo antes de você ter usado alguma — mas é só sugestão, digite o que quiser. Assim que
      você tiver mais de um curso ou mais livros, a tela de Espaços continua organizada em vez de
      virar uma lista solta.</p>
      <p>Cada Espaço também tem um <strong>ícone</strong> e uma <strong>cor</strong> — escolha na
      hora de criar (ou depois, em Editar). Conforme você digita o nome/categoria, o app sugere
      ícones prováveis (ex: "Bíblia" → igreja, "Curso" → capa de formatura, "Livro" → pilha de
      livros). A cor ajuda a bater o olho e achar cada Espaço mais rápido.</p>`},{titulo:"Temas — os assuntos/aulas dentro de um Espaço",corpoHtml:`<p>Dentro de um Espaço, um Tema é um assunto específico ou uma aula. Exemplo
      real: dentro do Espaço "Curso de Investimentos", os Temas "Riscos" e "Vieses" são
      aulas de um mesmo módulo. Use a <strong>categoria</strong> do Tema pra marcar o
      módulo — ex: categoria "Faixa Branca" nos dois, porque são do mesmo módulo do curso.
      A categoria é <strong>obrigatória</strong> e vem como o primeiro campo ao criar um Tema,
      porque é o módulo que aparece por primeiro na tela (os Temas ficam agrupados por
      categoria). O <strong>nome</strong> do Tema é opcional — se você deixar em branco, ele
      aparece como "Sem nome".</p>
      <p>No dia seguinte, quando a aula for sobre outro assunto do mesmo módulo, crie um Tema
      novo com a mesma categoria. As categorias sugeridas aqui são só as já usadas <strong>
      neste mesmo Espaço</strong> — o "Faixa Branca" de um curso não aparece sugerido dentro
      de outro curso diferente, pra não misturar vocabulário de assuntos que não têm nada a
      ver. Pra ajudar a lembrar como foi feito da última vez, os campos Categoria e Nome já
      vêm preenchidos com os do último Tema criado neste Espaço — aparecem em <strong>laranja
      </strong> pra deixar claro que é só uma sugestão a conferir, não um valor já
      confirmado.</p>
      <p>No menu "⋯" de um Tema tem os mesmos dois atalhos que existem no nível do Espaço:
      <strong>Detalhes</strong> (quantas notas, tempo total revisando e há quantos dias esse
      Tema existe) e <strong>Avaliar notas</strong> (repasse rápido só com as notas
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
      Espaço, e há quantos dias ele está ativo (ou quanto tempo levou até ser arquivado).</p>`},{titulo:"Painel",corpoHtml:`<p>O Painel é dividido em quatro abas:</p>
      <ul>
        <li><strong>Visão geral</strong>: sua sequência de dias estudando (streak), quanto tempo
        você estudou hoje e o tamanho da coleção (Espaços, Temas, Notas).</li>
        <li><strong>Revisão</strong>: como a revisão espaçada está indo — quantas notas estão
        em cada estágio da escada (1/7/30/180 dias; quanto mais em 30/180, melhor sua retenção),
        a carga dos próximos 7 dias e o ranking dos Temas onde você mais marcou "Difícil" —
        geralmente esses são os pontos fracos reais, que a sensação de "acho que já sei" não
        mostra sozinha.</li>
        <li><strong>Avaliações</strong>: o resultado dos seus autotestes (Fácil/Médio/Difícil),
        à parte da fila de revisão.</li>
        <li><strong>Evolução</strong>: quanto você estuda e o ritmo de inclusão de notas ao
        longo do tempo, num mapa de atividade de 365 dias.</li>
      </ul>`},{titulo:"Exportar em PDF",corpoHtml:`<p>Bom momento pra usar: quando terminar um módulo do curso, terminar o
      livro, ou só quiser um resumo pra imprimir/consultar sem abrir o app. Gera um
      documento organizado por módulo (categoria) e Tema, na ordem que você aprendeu.</p>
      <p>Cada nível tem seu <strong>número</strong> — Categoria <code>1</code>, Tema
      <code>1.1</code>, Nota <code>1.1.1</code> — e cada Categoria tem uma <strong>cor</strong>
      própria (a mesma nos Temas e Notas dela), então dá pra "bater o olho" e saber onde você
      está. No começo sai um <strong>índice</strong> com tudo e quantas notas cada parte tem.</p>
      <p>Na barra de ferramentas dá pra ligar/desligar o <strong>Índice</strong> e o
      <strong>Nova página por Categoria</strong> (útil pra imprimir um módulo por folha). O app
      lembra da sua escolha. No celular, o caminho é o mesmo: "Imprimir" e depois "Salvar como
      PDF".</p>`},{titulo:"Lembrete no celular",corpoHtml:`<p>Em Configurações, escolha o horário que você quer ser lembrado, e baixe o
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
      nuvem</b> para ver as versões e trazer uma de volta, se precisar.</p>`},{titulo:"Avaliar notas (Fácil / Médio / Difícil)",corpoHtml:`<p>No menu "⋯" de um Espaço ou Tema, toque em <b>Avaliar notas</b> para fazer um
      autoteste. Num Espaço com vários Temas você escolhe o <b>escopo</b>: avaliar
      <b>todo o Espaço</b> ou só um <b>Tema específico</b>. Depois escolhe quantas notas
      (Básico, Médio ou Longo).</p>
      <p>Em cada nota: tente lembrar, revele a resposta e marque <b>Fácil</b>, <b>Médio</b> ou
      <b>Difícil</b>. Tudo fica registrado no app — diferente da revisão espaçada, nada aqui
      muda sua fila nem os seus prazos.</p>
      <p>O resultado aparece no <b>Painel → aba Avaliações</b>: quanto você já avaliou, a
      distribuição entre Fácil/Médio/Difícil e o histórico de sessões recentes.</p>`}];function an(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${Qi}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Yi}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${en}</pre>
          </div>
        </div>
        <p class="settings-row__desc" style="margin-bottom:0;">
          Repare: <strong>a categoria é obrigatória</strong> (é o primeiro campo dos dois
          formulários, porque é o que aparece por primeiro na tela), e você escolhe o quão
          "fino" cada nível fica. No Exemplo 1, um Tema é uma aula, e a categoria agrupa as
          aulas do mesmo módulo. No Exemplo 3, um Tema já <strong>é</strong> o módulo inteiro,
          categoria vira um jeito extra de agrupar módulos (ex: por dificuldade), e cada Nota
          é uma aula daquele módulo. Nenhum dos dois está certo ou errado — use o que fizer
          mais sentido pra como você quer revisar depois.
        </p>
      </div>

      ${tn.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function on(e){return e.replace(/-/g,"")}function sn(e,t){const[a,o]=t.split(":");return`${on(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function nn(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function rn(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function cn(e){const t=sn(te(),e),a=nn(new Date),o=rn("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${ne()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function ln(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const dn="https://api.github.com",un="Memoriza — sincronização de anotações",qe="memoriza-sync.json";function Ut(e){return(t,a={})=>fetch(`${dn}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function mn(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&qe in s.files))==null?void 0:o.id)??null}async function pn(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:un,public:!1,files:{[qe]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function vn(e,t){var s,i;const a=await e(`/gists/${t}`);return a.ok?((i=(s=(await a.json()).files)==null?void 0:s[qe])==null?void 0:i.content)??null:null}async function uo(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[qe]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function mo(e){const t=Ut(e);let a=Ue();if(!a){const n=await mn(t);n&&(a=n,lt(n))}let o=null,s=!1,i=await Se();if(a){const n=await vn(t,a);if(n)try{const c=Ke(n);o=await We(c),i=await Se(),s=!0}catch{}}return a?await uo(t,a,JSON.stringify(i)):(a=await pn(t,JSON.stringify(i)),lt(a)),At(F()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??po(),push:!0,mesclouRemoto:s}}async function fn(e,t=30){const a=Ue();if(!a)throw new Error("Nenhum backup sincronizado ainda.");const s=await Ut(e)(`/gists/${a}`);if(!s.ok)throw new Error("Não foi possível ler o histórico do backup. Confira o token.");return((await s.json()).history??[]).slice(0,t).map(n=>({version:n.version,committed_at:n.committed_at}))}async function gn(e,t,a,o){var c;const s=await e(`/gists/${a}/${o}`);if(!s.ok)return null;const n=(c=(await s.json()).files)==null?void 0:c[qe];if(!n)return null;if(n.truncated&&n.raw_url){const r=await fetch(n.raw_url,{headers:{Authorization:`Bearer ${t}`}});return r.ok?r.text():null}return n.content??null}async function bn(e,t){const a=Ut(e),o=Ue();if(!o)throw new Error("Nenhum backup sincronizado ainda.");const s=await gn(a,e,o,t);if(!s)throw new Error("Não foi possível ler essa versão do backup.");const i=await We(Ke(s)),n=await Se();return await uo(a,o,JSON.stringify(n)),At(F()),{...i,porLoja:i.porLoja??po(),push:!0,mesclouRemoto:!0}}function po(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function hn(e){const t=kt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}let ze=null;function yn(e){ze=e}const _n=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],wn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}],$n={espaco:"Espaço",tema:"Tema",nota:"Nota"};function En(e){const t=[`${$n[e.tipo]} em ${e.contexto}`];return e.temas&&t.push(`${e.temas} tema(s)`),e.notas&&t.push(`${e.notas} nota(s)`),e.excluido_em&&t.push(`excluído em ${ue(e.excluido_em)}`),t.join(" · ")}function xn(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function Sn(e){const t=`${ue(e.criado_em)} · ${xn(e.bytes)}`;return`${e.automatico?"Automático":"Manual"} · ${t}`}function kn(e){return ue(e.committed_at)}async function ee(e,t){var A,D,x,M,R,B,L,U,Q,W,G,ae;const a=Co(),o=$o(),s=await Ct(),i=ko(t.perfil.id),n=St(),c=ya(),r=kt(),d=Ue(),l=Lt(),u=await qa(t.perfil.id),v=await Ia();e.innerHTML=`
    <div class="stack content-narrow content-wide">
      <section class="settings-section">
        <div class="settings-section__title">${E.user} Perfil</div>
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
        <div class="settings-section__title">${E.users} Gerenciar perfis</div>
        <div class="card stack">
          <div>
            ${s.map(g=>`
              <div class="settings-list-row" data-perfil-id="${m(g.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${m(g.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${m(g.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${m(g.id)}" data-nome="${m(g.nome)}" class="danger" type="button">Excluir perfil</button>
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
        <div class="settings-section__title">${E.moon} Aparência</div>
        <div class="card">
          <div class="settings-list-row">
            <div class="settings-row__label">Tema</div>
            <div class="segmented" id="tema-opcoes" role="group" aria-label="Tema">
              ${_n.map(g=>`
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
        <div class="settings-section__title">${E.ordenar} Ordenação</div>
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
              ${wn.map(g=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${g.value}"
                  aria-pressed="${g.value===l}"
                >${g.label}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${E.database} Dados</div>
        <div class="card stack">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Exportar backup</div>
              <p class="settings-row__desc">
                Gera um arquivo .json para guardar em outro lugar (Drive, e-mail, etc).
                ${o?`Último export: ${m(ue(o))}.`:"Nenhum export feito ainda."}
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

      <section class="settings-section" id="section-snapshots">
        <div class="settings-section__title">${E.clock} Snapshots locais</div>
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
          ${v.length===0?'<p class="text-muted" style="margin:0;">Nenhum snapshot ainda.</p>':`<div>
                  ${v.map(g=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(Sn(g))}</div>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-snapshot-restaurar="${m(g.id)}" type="button">Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-snapshot-remover="${m(g.id)}" type="button">Apagar</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section" id="section-lixeira">
        <div class="settings-section__title">${E.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${La} dias o item é
            removido de vez, sozinho.
          </p>
          ${u.length===0?'<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>':`<div>
                  ${u.map(g=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(g.nome)}</div>
                        <p class="settings-row__desc">${m(En(g))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${m(g.id)}" data-tipo="${g.tipo}" type="button">${E.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${m(g.id)}" data-tipo="${g.tipo}" data-nome="${m(g.nome)}" type="button">Excluir de vez</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section" id="section-sync">
        <div class="settings-section__title">${E.sync} Sincronização em nuvem</div>
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
                value="${m(n)}"
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
              ${E.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${r?`<div class="banner banner--success" style="margin-bottom:0;">${E.check} Última sincronização: ${m(ue(r))}${d?".":""}</div>`:n?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
          </div>

          <details id="gist-historico">
            <summary class="settings-row__label" style="cursor:pointer;">Histórico do backup na nuvem</summary>
            <div class="stack" style="margin-top: var(--space-3);">
              <p class="settings-row__desc" style="margin:0;">
                O GitHub guarda todas as versões já gravadas no Gist. Dá pra trazer uma antiga
                de volta — a restauração <b>mescla</b> com o que já existe local.
              </p>
              <div>
                <button class="btn btn--secondary btn--sm" id="btn-gist-revisoes" type="button">${E.sync} Carregar histórico</button>
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
        <div class="settings-section__title">${E.clock} Lembretes</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            O Memoriza não envia notificações. Escolha um horário e baixe um lembrete diário
            para o app de Calendário/Lembretes do seu celular.
          </p>
          <div class="field" style="max-width: 160px;">
            <label class="field__label" for="input-hora-lembrete">Horário</label>
            <input class="input" id="input-hora-lembrete" type="time" value="${m(i)}" />
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

  `,(A=e.querySelector("#btn-switch-profile"))==null||A.addEventListener("click",()=>{t.onSwitchProfile()}),(D=e.querySelector("#btn-como-usar"))==null||D.addEventListener("click",()=>z("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(g=>{g.addEventListener("click",()=>{const I=g.dataset.theme;To(I),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(q=>{q.setAttribute("aria-pressed",String(q===g))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(g=>{g.addEventListener("click",()=>{qo(g.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(I=>{I.setAttribute("aria-pressed",String(I===g))})})}),(x=e.querySelector("#btn-export-profile"))==null||x.addEventListener("click",async()=>{const g=await hs(t.perfil.id);aa(g),Wt(g.exportado_em),ee(e,t)}),(M=e.querySelector("#btn-export-all"))==null||M.addEventListener("click",async()=>{const g=await Se();aa(g),Wt(g.exportado_em),ee(e,t)});const f=e.querySelector("#import-file");(R=e.querySelector("#btn-import"))==null||R.addEventListener("click",()=>{f==null||f.click()}),f==null||f.addEventListener("change",async()=>{const g=e.querySelector("#import-summary"),[I]=f.files??[];if(!(!I||!g))try{const q=await I.text(),b=Ke(q);await gt({titulo:"Antes de importar"});const p=await We(b);g.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${p.criados} criados, ${p.atualizados} atualizados,
          ${p.mantidos} mantidos como estavam.
        </div>
      `}catch(q){g.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${m(q instanceof Error?q.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{f.value=""}});const $=e.querySelector("#form-novo-perfil");(B=e.querySelector("#btn-novo-perfil"))==null||B.addEventListener("click",()=>{var g;$.style.display="block",(g=e.querySelector("#input-novo-perfil"))==null||g.focus()}),(L=e.querySelector("#btn-cancelar-perfil"))==null||L.addEventListener("click",()=>{$.style.display="none"}),(U=e.querySelector("#btn-salvar-perfil"))==null||U.addEventListener("click",async()=>{const I=e.querySelector("#input-novo-perfil").value.trim();I&&(await Ea(I),ee(e,t))}),e.querySelectorAll("[data-renomear]").forEach(g=>{g.onclick=()=>{var C;const I=g.dataset.renomear,q=e.querySelector(`[data-perfil-id="${I}"]`),b=q==null?void 0:q.querySelector("[data-view-nome]");if(!q||!b)return;const p=((C=b.textContent)==null?void 0:C.trim())??"";b.innerHTML=`
        <input class="input" type="text" value="${m(p)}" maxlength="60" style="max-width:200px;" />
      `;const y=b.querySelector("input");y.focus(),y.select(),g.textContent="Salvar";const T=async()=>{const N=y.value.trim();N&&(await Yo(I,N),I===t.perfil.id&&(t.perfil={...t.perfil,nome:N})),ee(e,t)};y.addEventListener("keydown",N=>{N.key==="Enter"&&T()}),g.onclick=T}}),e.querySelectorAll("[data-excluir-perfil]").forEach(g=>{g.addEventListener("click",async()=>{const I=g.dataset.excluirPerfil,q=g.dataset.nome??"",b=await es(I);await ie({title:`Excluir o perfil "${q}"?`,message:`Isso vai apagar ${b.espacos} espaço(s), ${b.temas} tema(s) e ${b.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await ts(I),I===t.perfil.id?t.onSwitchProfile():ee(e,t))})}),(Q=e.querySelector("#btn-baixar-lembrete"))==null||Q.addEventListener("click",()=>{const g=e.querySelector("#input-hora-lembrete").value||"19:00";Ao(t.perfil.id,g),ln(cn(g))});const _=e.querySelector("#sync-status"),S=e.querySelector("#btn-sync-now");S==null||S.addEventListener("click",async()=>{const I=e.querySelector("#input-github-token").value.trim();if(!I){_&&(_.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Zt(I),S.disabled=!0,_&&(_.innerHTML=`<div class="banner banner--muted" role="status">${E.sync} Sincronizando…</div>`);try{const q=await mo(I);if(_){const b=[q.criados>0?`${q.criados} novo(s)`:null,q.atualizados>0?`${q.atualizados} atualizado(s)`:null].filter(Boolean);_.innerHTML=`
          <div class="banner banner--success" role="status">
            ${E.check} Sincronizado!${b.length>0?` ${b.join(", ")} baixado(s).`:""}
            ${q.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}ee(e,t)}catch(q){S.disabled=!1,_&&(_.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${m(q instanceof Error?q.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(W=e.querySelector("#btn-limpar-token"))==null||W.addEventListener("click",async()=>{await ie({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Zt(""),lt(""),At(""),ee(e,t))}),(G=e.querySelector("#sync-auto"))==null||G.addEventListener("change",g=>{Lo(g.target.checked)}),e.querySelectorAll("[data-restaurar]").forEach(g=>{g.addEventListener("click",async()=>{g.disabled=!0,await ns(g.dataset.tipo,g.dataset.restaurar),ee(e,t)})}),e.querySelectorAll("[data-expurgar]").forEach(g=>{g.addEventListener("click",async()=>{const I=g.dataset.nome??"";await ie({title:`Excluir "${I}" de vez?`,message:"O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia."})&&(g.disabled=!0,await Ie(g.dataset.tipo,g.dataset.expurgar),ee(e,t))})}),(ae=e.querySelector("#btn-snapshot-criar"))==null||ae.addEventListener("click",async()=>{const g=e.querySelector("#btn-snapshot-criar");g.disabled=!0,await gt({}),ee(e,t);const I=e.querySelector("#snapshot-status");I&&(I.innerHTML=`<div class="banner banner--success" role="status">${E.check} Snapshot criado.</div>`)}),e.querySelectorAll("[data-snapshot-restaurar]").forEach(g=>{g.addEventListener("click",async()=>{if(!await ie({title:"Restaurar este snapshot?",message:"Os dados do snapshot serão mesclados com os atuais. Nada local é apagado."}))return;g.disabled=!0,await Ls(g.dataset.snapshotRestaurar);const q=e.querySelector("#snapshot-status");q&&(q.innerHTML=`<div class="banner banner--success" role="status">${E.check} Snapshot restaurado (mesclado).</div>`)})}),e.querySelectorAll("[data-snapshot-remover]").forEach(g=>{g.addEventListener("click",async()=>{await As(g.dataset.snapshotRemover),ee(e,t)})});const h=e.querySelector("#btn-gist-revisoes");if(h==null||h.addEventListener("click",async()=>{const g=e.querySelector("#gist-revisoes"),q=e.querySelector("#input-github-token").value.trim()||n;if(!(!q||!g)){h.disabled=!0,g.innerHTML=`<div class="banner banner--muted" role="status">${E.sync} Carregando…</div>`;try{const b=await fn(q);if(b.length===0){g.innerHTML='<div class="banner banner--muted" role="status">Ainda não há versões anteriores.</div>';return}g.innerHTML=`
        <div>
          ${b.map(p=>`
            <div class="settings-list-row">
              <div class="settings-row__label">${m(kn(p))}</div>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-gist-restaurar="${m(p.version)}" type="button">Restaurar</button>
              </div>
            </div>
          `).join("")}
        </div>
      `,An(e,q,g)}catch(b){g.innerHTML=`<div class="banner banner--warning" role="alert">${m(b instanceof Error?b.message:"Não foi possível carregar o histórico.")}</div>`}finally{h.disabled=!1}}}),ze){const g=e.querySelector(`#${ze}`);ze=null,g&&requestAnimationFrame(()=>g.scrollIntoView({behavior:"smooth",block:"start"}))}}function An(e,t,a){e.querySelectorAll("[data-gist-restaurar]").forEach(o=>{o.addEventListener("click",async()=>{if(await ie({title:"Restaurar esta versão do backup?",message:"A versão escolhida será mesclada com os dados atuais e o backup na nuvem será atualizado. Nada local é apagado."})){o.disabled=!0,a.innerHTML=`<div class="banner banner--muted" role="status">${E.sync} Restaurando…</div>`;try{const i=await bn(t,o.dataset.gistRestaurar);a.innerHTML=`<div class="banner banner--success" role="status">${E.check} Backup restaurado: ${i.criados} criado(s), ${i.atualizados} atualizado(s).</div>`}catch(i){a.innerHTML=`<div class="banner banner--warning" role="alert">${m(i instanceof Error?i.message:"Não foi possível restaurar.")}</div>`}}})})}const Ln=7,qn=7,Tn=30;function va(e){return e<=0?"hoje":e===1?"ontem":`há ${e} dias`}function Cn(e){const t=e.avisarSyncDias??Ln,a=e.avisarSnapshotDias??qn,o=e.retencaoDias??Tn;let s;e.syncConfigurado?e.diasDesdeSync===null?s={estado:"atencao",visivel:!0,titulo:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."}:e.diasDesdeSync<=t?s={estado:"ok",visivel:!0,titulo:`Sincronizado com o GitHub ${va(e.diasDesdeSync)}. Toque pra abrir a sincronização.`}:s={estado:"atencao",visivel:!0,titulo:`Faz ${e.diasDesdeSync} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}:s={estado:"off",visivel:!0,titulo:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};let i;e.diasDesdeSnapshot===null?i={estado:"atencao",visivel:!0,titulo:"Nenhum snapshot local ainda. Toque pra criar uma cópia de segurança."}:e.diasDesdeSnapshot<=a?i={estado:"ok",visivel:!0,titulo:`Backup local em dia (snapshot ${va(e.diasDesdeSnapshot)}). Toque pra ver os snapshots.`}:i={estado:"atencao",visivel:!0,titulo:`Faz ${e.diasDesdeSnapshot} dias desde o último snapshot local. Toque pra criar um novo.`};const n=e.lixeiraContagem<=0?{estado:"ok",visivel:!1,titulo:"Lixeira vazia."}:{estado:"atencao",visivel:!0,contagem:e.lixeiraContagem,titulo:`${e.lixeiraContagem} item(ns) na Lixeira. Eles somem em até ${o} dias — toque pra recuperar ou excluir de vez.`};return{sync:s,backup:i,lixeira:n}}let it=null;async function fa(){if(!(!("wakeLock"in navigator)||document.hidden))try{it=await navigator.wakeLock.request("screen"),it.addEventListener("release",()=>{it=null})}catch{}}function Mn(){fa(),document.addEventListener("visibilitychange",()=>{document.hidden||fa()})}const vo="v1.14",In="Memoriza",fo=`${In} ${vo}`,Me=24;function Et(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function nt(e,t){const a=Et(t);return e.some(o=>Et(o).includes(a))}function Dn(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),i=t.toLowerCase();let n=s.indexOf(i);n===-1&&(n=0);const c=Math.max(0,n-a),r=Math.min(o.length,n+i.length+a);return(c>0?"…":"")+o.slice(c,r)+(r<o.length?"…":"")}async function Nn(e,t){const a=t.trim();if(!a)return[];const o=Et(a);if(!o)return[];const s=await k(),i=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(i.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),r=new Map(i.map(f=>[f.id,f])),l=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),u=[];for(const f of i)if(nt([f.nome,f.categoria],o)&&(u.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),u.length>=Me))return u;const v=new Map(c.map(f=>[f.id,f]));for(const f of c)if(nt([f.nome,f.categoria],o)){const $=r.get(f.espaco_id);if(u.push({kind:"tema",id:f.id,titulo:V(f.nome),meta:`Tema${$?` · ${$.nome}`:""}`}),u.length>=Me)return u}for(const f of l){if(!nt([f.titulo,f.fonte,f.conteudo],o))continue;const $=v.get(f.tema_id),_=$&&r.get($.espaco_id),S=[..._?[_.nome]:[],...$?[V($.nome)]:[]].join(" · ");if(u.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:S?`Nota · ${S}`:"Nota",snippet:f.conteudo?Dn(f.conteudo,o):void 0}),u.length>=Me)return u}return u.sort((f,$)=>{const _=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,S=`${$.titulo.toLowerCase()} ${$.meta.toLowerCase()}`;return ss(_,S)}),u.slice(0,Me)}const Pn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function ga(e,t){const a=m(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const i=m(e.slice(0,s)),n=m(e.slice(s,s+o.length)),c=m(e.slice(s+o.length));return`${i}<mark>${n}</mark>${c}`}async function go(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
    <div class="search-panel">
      <div class="search-field">
        <span class="search-field__icon" aria-hidden="true">${E.search}</span>
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],i=-1,n,c=!1;function r(){c||(c=!0,t.remove(),document.removeEventListener("keydown",v))}function d($){s.length!==0&&(i=(i+$+s.length)%s.length,s.forEach((_,S)=>{const h=S===i;_.el.classList.toggle("is-active",h),_.el.setAttribute("aria-selected",String(h)),h&&_.el.scrollIntoView({block:"nearest"})}))}function l($){const _=s.find(h=>h.el===$);if(!_)return;r();const S=_.resultado;S.kind==="espaco"?z(`espacos/${S.id}`):S.kind==="tema"?z(`temas/${S.id}`):z(`notas/${S.id}`)}function u($){Nn(e,$).then(_=>{if(!c){if(i=-1,s=[],_.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${m($.trim())}".</p>`;return}o.innerHTML="";for(const S of _){const h=document.createElement("button");h.type="button",h.className=`search-result search-result--${S.kind}`,h.setAttribute("role","option"),h.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${S.kind==="espaco"?E.folder:S.kind==="tema"?E.bookOpen:E.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${ga(S.titulo,$)}</span>
            <span class="search-result__meta">${m(Pn[S.kind])} · ${m(S.meta)}</span>
            ${S.snippet?`<span class="search-result__snippet">${ga(S.snippet,$)}</span>`:""}
          </span>
        `,h.addEventListener("click",()=>l(h)),o.appendChild(h),s.push({el:h,resultado:S})}}})}function v($){$.key==="Escape"&&($.preventDefault(),r())}a.addEventListener("input",()=>{n&&clearTimeout(n),n=setTimeout(()=>u(a.value),120)}),a.addEventListener("keydown",$=>{$.key==="ArrowDown"?($.preventDefault(),d(1)):$.key==="ArrowUp"?($.preventDefault(),d(-1)):$.key==="Enter"&&i>=0?($.preventDefault(),l(s[i].el)):$.key==="Escape"&&($.preventDefault(),r())}),t.addEventListener("mousedown",$=>{$.target===t&&r()}),document.addEventListener("keydown",v),a.focus(),u("")}const zn=30,jn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],Rn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function Fn(e){zs(()=>xt(e)),await xt(e),Bn(),Mn(),On(),Hn()}function On(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=ba();t&&go(t)}})}async function Hn(){const e=St();if(!(!e||!ya())&&hn(zn))try{await mo(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function Bn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function xt(e){var r,d;const t=ba(),a=t?await Qo(t):void 0;if(!a){ct(null),e.innerHTML='<div id="profile-screen"></div>';const l=e.querySelector("#profile-screen");await Rs(l,async u=>{ct(u.id),z("hoje"),await xt(e)});return}const o=Ds(),s=Ns(o),i=await Un(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${jn.map(l=>`
          <button
            class="app-nav__item"
            data-route="${l.route}"
            ${l.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${js[l.route]}</span>
            <span>${l.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${Rn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${E.search}</button>
            ${i.sync.visivel?rt("section-sync",E.cloud,i.sync):""}
            ${i.backup.visivel?rt("section-snapshots",E.database,i.backup):""}
            ${i.lixeira.visivel?rt("section-lixeira",E.trash,i.lixeira,i.lixeira.contagem):""}
            <span class="app-header__date" title="Data de hoje">${m(Wo(Z()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${E.help}</button>
            <span class="app-header__profile" title="Memoriza ${vo}">${m(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${m(fo)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(l=>{l.addEventListener("click",()=>{xe()&&Ps(l.dataset.route)})}),(r=e.querySelector("#btn-ajuda"))==null||r.addEventListener("click",()=>{xe()&&(location.hash==="#/ajuda"?history.back():z("ajuda"))}),(d=e.querySelector("#btn-busca"))==null||d.addEventListener("click",()=>{xe()&&go(a.id)}),e.querySelectorAll("[data-settings-secao]").forEach(l=>{l.addEventListener("click",()=>{xe()&&(yn(l.dataset.settingsSecao),z("config"))})});const n=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",n.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await Vn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(l){console.error("Erro ao renderizar tela:",l),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function Vn(e,t,a){switch(t.name){case"hoje":await ia(e,{perfilId:a.id});break;case"espacos":await De(e,{perfilId:a.id});break;case"espaco":await Ne(e,t.id);break;case"espaco-pdf":await Ii(e,t.id,t.categoria);break;case"painel":await Zi(e,{perfilId:a.id});break;case"favoritos":await Xi(e,{perfilId:a.id});break;case"ajuda":an(e);break;case"tema":await Pe(e,t.id);break;case"nota-nova":await Ve(e,{mode:"nova",temaId:t.temaId});break;case"nota":await Ve(e,{mode:"editar",notaId:t.id});break;case"config":await ee(e,{perfil:a,onSwitchProfile:()=>{ct(null),z("perfil")}});break;default:await ia(e,{perfilId:a.id})}}async function Un(e){if(!await Gn(e.id))return{sync:{estado:"off",visivel:!1,titulo:""},backup:{estado:"ok",visivel:!1,titulo:""},lixeira:{estado:"ok",visivel:!1,titulo:"Lixeira vazia."}};const t=St(),a=kt(),o=Z(),s=a?we(Z(new Date(a)),o):null,n=(await Ia())[0],c=n?we(Z(new Date(n.criado_em)),o):null,r=await qa(e.id);return Cn({syncConfigurado:!!t,diasDesdeSync:s,diasDesdeSnapshot:c,lixeiraContagem:r.length})}function rt(e,t,a,o){const s=m(a.titulo);return`<button class="app-header__status is-${a.estado}" data-settings-secao="${e}" type="button" title="${s}" aria-label="${s}">${t}${o?`<span class="app-header__status__badge">${o}</span>`:""}</button>`}async function Gn(e){const t=await k();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${fo}%c rodando`,"font-weight:bold;","");_a();_o({immediate:!0});async function Kn(){Pi(),await Xo(),await Ca(),await rs(),await Ts().catch(()=>{}),await Mo();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await Fn(e)}Kn();
