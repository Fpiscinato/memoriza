(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const _o="modulepreload",wo=function(e){return"/"+e},Zt={},$o=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(a.map(r=>{if(r=wo(r),r in Zt)return;Zt[r]=!0;const l=r.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${d}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":_o,l||(u.as="script"),u.crossOrigin="",u.href=r,c&&u.setAttribute("nonce",c),document.head.appendChild(u),l)return new Promise((p,f)=>{u.addEventListener("load",p),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return s.then(n=>{for(const c of n||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function xo(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:i,onRegisterError:n}=e;let c,r;const l=async(u=!0)=>{await r};async function d(){if("serviceWorker"in navigator){if(c=await $o(async()=>{const{Workbox:u}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:u}},[]).then(({Workbox:u})=>new u("/sw.js",{scope:"/",type:"classic"})).catch(u=>{n==null||n(u)}),!c)return;c.addEventListener("activated",u=>{(u.isUpdate||u.isExternal)&&window.location.reload()}),c.addEventListener("installed",u=>{u.isUpdate||o==null||o()}),c.register({immediate:t}).then(u=>{i?i("/sw.js",u):s==null||s(u)}).catch(u=>{n==null||n(u)})}}return r=d(),l}const O={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function _a(){return localStorage.getItem(O.selectedProfileId)}function dt(e){e?localStorage.setItem(O.selectedProfileId,e):localStorage.removeItem(O.selectedProfileId)}function wa(){const e=localStorage.getItem(O.theme);return e==="light"||e==="dark"?e:"system"}function Eo(e){e==="system"?localStorage.removeItem(O.theme):localStorage.setItem(O.theme,e)}function So(){return localStorage.getItem(O.lastExportAt)}function Jt(e){localStorage.setItem(O.lastExportAt,e)}function ko(){return localStorage.getItem(O.storagePersistRequested)==="1"}function Ao(){localStorage.setItem(O.storagePersistRequested,"1")}const Lo="19:00";function qo(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??Lo}function To(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function At(){return localStorage.getItem(O.githubToken)??""}function Xt(e){e.trim()?localStorage.setItem(O.githubToken,e.trim()):localStorage.removeItem(O.githubToken)}function Ge(){return localStorage.getItem(O.githubGistId)??""}function ut(e){e?localStorage.setItem(O.githubGistId,e):localStorage.removeItem(O.githubGistId)}function Lt(){return localStorage.getItem(O.githubLastSyncAt)}function qt(e){e?localStorage.setItem(O.githubLastSyncAt,e):localStorage.removeItem(O.githubLastSyncAt)}function $a(){return localStorage.getItem(O.githubAutoSync)!=="0"}function Co(e){e?localStorage.removeItem(O.githubAutoSync):localStorage.setItem(O.githubAutoSync,"0")}function Tt(){return localStorage.getItem(O.notasOrdem)==="titulo"?"titulo":"data"}function Mo(e){e==="titulo"?localStorage.setItem(O.notasOrdem,"titulo"):localStorage.removeItem(O.notasOrdem)}function xa(){const e=wa();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function Io(e){Eo(e),xa()}function Do(){return wa()}async function No(){var e;if(!ko()&&(Ao(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const mt=(e,t)=>t.some(a=>e instanceof a);let Qt,Yt;function Po(){return Qt||(Qt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zo(){return Yt||(Yt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pt=new WeakMap,Ye=new WeakMap,Ke=new WeakMap;function jo(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",n)},i=()=>{a(de(e.result)),s()},n=()=>{o(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",n)});return Ke.set(t,e),t}function Ro(e){if(pt.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",n),e.removeEventListener("abort",n)},i=()=>{a(),s()},n=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",n),e.addEventListener("abort",n)});pt.set(e,t)}let vt={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return pt.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return de(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Ea(e){vt=e(vt)}function Fo(e){return zo().includes(e)?function(...t){return e.apply(ft(this),t),de(this.request)}:function(...t){return de(e.apply(ft(this),t))}}function Oo(e){return typeof e=="function"?Fo(e):(e instanceof IDBTransaction&&Ro(e),mt(e,Po())?new Proxy(e,vt):e)}function de(e){if(e instanceof IDBRequest)return jo(e);if(Ye.has(e))return Ye.get(e);const t=Oo(e);return t!==e&&(Ye.set(e,t),Ke.set(t,e)),t}const ft=e=>Ke.get(e);function Ho(e,t,{blocked:a,upgrade:o,blocking:s,terminated:i}={}){const n=indexedDB.open(e,t),c=de(n);return o&&n.addEventListener("upgradeneeded",r=>{o(de(n.result),r.oldVersion,r.newVersion,de(n.transaction),r)}),a&&n.addEventListener("blocked",r=>a(r.oldVersion,r.newVersion,r)),c.then(r=>{i&&r.addEventListener("close",()=>i()),s&&r.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Bo=["get","getKey","getAll","getAllKeys","count"],Vo=["put","add","delete","clear"],et=new Map;function ea(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(et.get(t))return et.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=Vo.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||Bo.includes(a)))return;const i=async function(n,...c){const r=this.transaction(n,s?"readwrite":"readonly");let l=r.store;return o&&(l=l.index(c.shift())),(await Promise.all([l[a](...c),s&&r.done]))[0]};return et.set(t,i),i}Ea(e=>({...e,get:(t,a,o)=>ea(t,a)||e.get(t,a,o),has:(t,a)=>!!ea(t,a)||e.has(t,a)}));const Uo=["continue","continuePrimaryKey","advance"],ta={},gt=new WeakMap,Sa=new WeakMap,Go={get(e,t){if(!Uo.includes(t))return e[t];let a=ta[t];return a||(a=ta[t]=function(...o){gt.set(this,Sa.get(this)[t](...o))}),a}};async function*Ko(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,Go);for(Sa.set(a,t),Ke.set(a,ft(t));t;)yield a,t=await(gt.get(a)||t.continue()),gt.delete(a)}function aa(e,t){return t===Symbol.asyncIterator&&mt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&mt(e,[IDBIndex,IDBObjectStore])}Ea(e=>({...e,get(t,a,o){return aa(t,a)?Ko:e.get(t,a,o)},has(t,a){return aa(t,a)||e.has(t,a)}}));const Wo="memoriza",Zo=4;let tt;function k(){return tt||(tt=Ho(Wo,Zo,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}if(e.objectStoreNames.contains("snapshots")||e.createObjectStore("snapshots",{keyPath:"id"}),!e.objectStoreNames.contains("avaliacoes")){const s=e.createObjectStore("avaliacoes",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("sessao_id","sessao_id")}}})),tt}function ne(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const Ct="Europe/London",Jo=new Intl.DateTimeFormat("en-CA",{timeZone:Ct,year:"numeric",month:"2-digit",day:"2-digit"});function Z(e=new Date){return Jo.format(e)}function te(){return Z(new Date)}function we(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function F(){return new Date().toISOString()}function re(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function Xo(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:Ct,weekday:"short",day:"2-digit",month:"2-digit"})}function ue(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Qo(e){const t=new Date(e),a=Z(t),o=t.toLocaleTimeString("pt-BR",{timeZone:Ct,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function Mt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function Y(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const Yo="00000000-0000-4000-8000-000000000001";async function It(){return(await(await k()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function es(){return It()}async function ts(e){return(await k()).get("perfis",e)}async function ka(e){const t=await k(),a=await t.getAll("perfis"),o=F(),i={id:a.length===0?Yo:ne(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",i),i}async function as(e,t){const a=await k(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=F(),await a.put("perfis",o))}async function os(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const i of a){const n=await t.getAllFromIndex("temas","espaco_id",i.id);o+=n.length;for(const c of n)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function ss(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(d=>t.getAllFromIndex("temas","espaco_id",d.id)))).flat(),n=(await Promise.all(s.map(d=>t.getAllFromIndex("notas","tema_id",d.id)))).flat(),r=(await Promise.all(n.map(d=>t.getAllFromIndex("itens_revisao","nota_id",d.id)))).flat(),l=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await l.objectStore("perfis").delete(e);for(const d of a)await l.objectStore("espacos").delete(d.id);for(const d of s)await l.objectStore("temas").delete(d.id);for(const d of n)await l.objectStore("notas").delete(d.id);for(const d of r)await l.objectStore("itens_revisao").delete(d.id);await l.done}const Aa=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),is=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function ns(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function bt(e){return is.get(ns(e))??null}function La(e){return e.length>0&&e.every(t=>bt(t)!==null)}function qa(e,t,a){if(a){const o=bt(e),s=bt(t);if(o!==s)return o-s}return Aa.compare(e,t)}function Ta(e){const t=La(e);return[...e].sort((a,o)=>qa(a,o,t))}function rs(e,t){return Aa.compare(e,t)}function me(e,t){const a=La(e.map(t));return[...e].sort((o,s)=>qa(t(o),t(s),a))}const cs="Sem nome";function V(e){return(e??"").trim()||cs}function Se(e){return e.trim().toLowerCase()}function ls(e,t){const a=new Set([...t].map(Se));if(!a.has(Se(e)))return e;let o=`${e} (restaurado)`,s=2;for(;a.has(Se(o));)o=`${e} (restaurado ${s})`,s++;return o}function at(e,t,a){const s=(a===void 0?t:t.filter(c=>Se(c.categoria??"")===Se(a))).map(c=>c.nome),i=ls(e,s),n=e.trim().length>0&&i!==e;return{conflito:n,nomeSugerido:n?i:e}}const Ca=30;function he(e,t=F()){return{...e,excluido:!0,excluido_em:t,atualizado_em:t}}function fe(e,t=F()){const a={...e};return delete a.excluido,delete a.excluido_em,a.atualizado_em=t,a}async function Ma(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=new Map(a.map(r=>[r.id,r])),s=(await Promise.all(a.map(r=>t.getAllFromIndex("temas","espaco_id",r.id)))).flat(),i=new Map(s.map(r=>[r.id,r])),n=(await Promise.all(s.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat(),c=[];for(const r of a){if(!r.excluido)continue;const l=s.filter(u=>u.espaco_id===r.id),d=new Set(l.map(u=>u.id));c.push({tipo:"espaco",id:r.id,nome:r.nome,contexto:r.categoria||"Sem categoria",excluido_em:r.excluido_em,temas:l.filter(u=>u.excluido).length,notas:n.filter(u=>d.has(u.tema_id)&&u.excluido).length})}for(const r of s){if(!r.excluido)continue;const l=o.get(r.espaco_id);!l||l.excluido||c.push({tipo:"tema",id:r.id,nome:V(r.nome),contexto:l.nome,excluido_em:r.excluido_em,notas:n.filter(d=>d.tema_id===r.id&&d.excluido).length})}for(const r of n){if(!r.excluido)continue;const l=i.get(r.tema_id);if(!l||l.excluido)continue;const d=o.get(l.espaco_id);!d||d.excluido||c.push({tipo:"nota",id:r.id,nome:r.titulo||"(sem título)",contexto:V(l.nome),excluido_em:r.excluido_em})}return c.sort((r,l)=>(l.excluido_em??"").localeCompare(r.excluido_em??""))}async function ds(e,t){const a=await k();if(e==="nota"){const i=await a.get("notas",t);if(!i)return{conflito:!1,nomeSugerido:""};const n=(await a.getAllFromIndex("notas","tema_id",i.tema_id)).filter(c=>!c.excluido);return at(i.titulo||"",n.map(c=>({nome:c.titulo||""})))}if(e==="tema"){const i=await a.get("temas",t);if(!i)return{conflito:!1,nomeSugerido:""};const n=(await a.getAllFromIndex("temas","espaco_id",i.espaco_id)).filter(c=>!c.excluido);return at(i.nome||"",n.map(c=>({nome:c.nome||"",categoria:c.categoria})),i.categoria)}const o=await a.get("espacos",t);if(!o)return{conflito:!1,nomeSugerido:""};const s=(await a.getAllFromIndex("espacos","perfil_id",o.perfil_id)).filter(i=>!i.excluido);return at(o.nome,s.map(i=>({nome:i.nome})))}async function us(e,t,a){const o=await k(),s=F();if(e==="nota"){const l=await o.get("notas",t);if(!l)return;(a==null?void 0:a.nome)!==void 0&&(l.titulo=a.nome),await o.put("notas",fe(l,s));return}if(e==="tema"){const l=await o.get("temas",t);if(!l)return;(a==null?void 0:a.nome)!==void 0&&(l.nome=a.nome);const d=(await o.getAllFromIndex("notas","tema_id",t)).filter(p=>p.excluido),u=o.transaction(["temas","notas"],"readwrite");await u.objectStore("temas").put(fe(l,s));for(const p of d)await u.objectStore("notas").put(fe(p,s));await u.done;return}const i=await o.get("espacos",t);if(!i)return;(a==null?void 0:a.nome)!==void 0&&(i.nome=a.nome);const n=(await o.getAllFromIndex("temas","espaco_id",t)).filter(l=>l.excluido),c=(await Promise.all(n.map(l=>o.getAllFromIndex("notas","tema_id",l.id)))).flat().filter(l=>l.excluido),r=o.transaction(["espacos","temas","notas"],"readwrite");await r.objectStore("espacos").put(fe(i,s));for(const l of n)await r.objectStore("temas").put(fe(l,s));for(const l of c)await r.objectStore("notas").put(fe(l,s));await r.done}async function De(e,t){const a=await k();if(e==="nota"){const n=await a.getAllFromIndex("itens_revisao","nota_id",t),c=a.transaction(["notas","itens_revisao"],"readwrite");await c.objectStore("notas").delete(t);for(const r of n)await c.objectStore("itens_revisao").delete(r.id);await c.done;return}let o;if(e==="tema")o=await a.getAllFromIndex("notas","tema_id",t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);o=(await Promise.all(n.map(c=>a.getAllFromIndex("notas","tema_id",c.id)))).flat()}const s=(await Promise.all(o.map(n=>a.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat(),i=a.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");if(e==="tema")await i.objectStore("temas").delete(t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);await i.objectStore("espacos").delete(t);for(const c of n)await i.objectStore("temas").delete(c.id)}for(const n of o)await i.objectStore("notas").delete(n.id);for(const n of s)await i.objectStore("itens_revisao").delete(n.id);await i.done}async function ms(){const e=await k(),t=Y(te(),-Ca),a=n=>!!n.excluido&&!!n.excluido_em&&n.excluido_em.slice(0,10)<t,o=(await e.getAll("espacos")).filter(a),s=(await e.getAll("temas")).filter(a),i=(await e.getAll("notas")).filter(a);for(const n of o)await De("espaco",n.id);for(const n of s)await De("tema",n.id);for(const n of i)await De("nota",n.id)}async function Ia(e){const a=(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido);return Tt()==="titulo"?me(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function oa(e){return(await k()).get("notas",e)}async function ps(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).filter(n=>!n.excluido).map(n=>({nota:n,tema:s}))))).flat()}async function vs(e,t){const a=await k(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const i=F(),n={id:ne(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:i,atualizado_em:i},c={id:ne(),nota_id:n.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:Y(te(),1),status:"pendente",streak_facil:0,criado_em:i,atualizado_em:i},r=a.transaction(["notas","itens_revisao"],"readwrite");return await r.objectStore("notas").put(n),await r.objectStore("itens_revisao").put(c),await r.done,n}async function fs(e,t){const a=await k(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=F(),await a.put("notas",o))}async function gs(e){const t=await k(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=F(),await t.put("notas",a),a.favorito):!1}async function bs(e){const t=await k(),a=await t.get("notas",e);a&&await t.put("notas",he(a))}async function Da(){var i;const e=await k(),a=(await e.getAll("notas")).filter(n=>!("titulo"in n)||!n.titulo);if(a.length===0)return 0;const o=F(),s=e.transaction("notas","readwrite");for(const n of a)await s.store.put({...n,titulo:((i=n.fonte)==null?void 0:i.trim())||"Sem título",titulo_revisado:!1,favorito:n.favorito??!1,atualizado_em:o});return await s.done,a.length}function hs(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,i=0,n=0;for(const c of t){const r=a.get(c.id);r?c.atualizado_em>r.atualizado_em?(a.set(c.id,c),o.push(c),i++):n++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:i,mantidos:n}}function ys(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const _s=["perfis","espacos","temas","notas","itens_revisao","avaliacoes"],Dt="memoriza-export",Na=1;async function ws(){const e=await k(),[t,a,o,s,i,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao"),e.getAll("avaliacoes")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:i,avaliacoes:n}}async function $s(e){const t=await k(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(p=>p.id)),n=(await t.getAll("temas")).filter(p=>s.has(p.espaco_id)),c=new Set(n.map(p=>p.id)),l=(await t.getAll("notas")).filter(p=>c.has(p.tema_id)),d=await t.getAllFromIndex("itens_revisao","perfil_id",e),u=await t.getAllFromIndex("avaliacoes","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:n,notas:l,itens_revisao:d,avaliacoes:u}}async function xs(e){const t=await $s(e);return{formato:Dt,versao:Na,exportado_em:F(),escopo:"perfil",perfil_id:e,dados:t}}async function ke(){const e=await ws();return{formato:Dt,versao:Na,exportado_em:F(),escopo:"todos",dados:e}}function Es(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${Qo(e.exportado_em)}.json`}function sa(e){const t=Es(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function We(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==Dt||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Ze(e){const t=await k(),a={};for(const o of _s){const s=await t.getAll(o),i=e.dados[o],n=hs(s,i??[]);if(n.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const r of n.toWrite)await c.store.put(r);await c.done}a[o]={criados:n.criados,atualizados:n.atualizados,mantidos:n.mantidos}}return await Da(),{...ys(Object.values(a)),porLoja:a}}const Ss=8,ks=20,As=10;function Ls(e){return e.slice(0,10)}function qs(e,t){const[a,o,s]=e.split("-").map(Number),i=new Date(Date.UTC(a,o-1,s));return i.setUTCDate(i.getUTCDate()+t),i.toISOString().slice(0,10)}function Ts(e){const[t,a,o]=e.split("-").map(Number),s=new Date(Date.UTC(t,a-1,o)),i=s.getUTCDay();return s.setUTCDate(s.getUTCDate()-(i+6)%7),s.toISOString().slice(0,10)}function Cs(e,t){const a=new Set,o=(l,d)=>d.criado_em.localeCompare(l.criado_em),s=e.filter(l=>l.automatico).sort(o),i=e.filter(l=>!l.automatico).sort(o),n=qs(t,-6),c=new Set;let r=0;for(const l of s){const d=Ls(l.criado_em);let u;if(d>=n)u=!0;else{const p=Ts(d);u=!c.has(p)&&c.size<Ss,u&&c.add(p)}if(u&&r<ks){r++;continue}a.add(l.id)}for(const l of i.slice(As))a.add(l.id);return[...a]}async function ht(e={}){const t=await k(),a=JSON.stringify(await ke()),o=e.automatico??!1,s={id:ne(),criado_em:F(),automatico:o,titulo:e.titulo??(o?"Automático":"Manual"),bytes:a.length,conteudo:a};return await t.put("snapshots",s),await Ds(),s}async function Pa(){return(await(await k()).getAll("snapshots")).sort((a,o)=>o.criado_em.localeCompare(a.criado_em))}async function Ms(e){await(await k()).delete("snapshots",e)}async function Is(e){const a=await(await k()).get("snapshots",e);if(!a)throw new Error("Snapshot não encontrado.");return Ze(We(a.conteudo))}async function Ds(){const e=await k(),t=Cs(await e.getAll("snapshots"),te());if(t.length===0)return;const a=e.transaction("snapshots","readwrite");for(const o of t)await a.store.delete(o);await a.done}async function Ns(){const e=await k(),t=te();return(await e.getAll("snapshots")).some(o=>o.automatico&&o.criado_em.slice(0,10)===t)?null:ht({automatico:!0})}function m(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ye(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const za="_sem-categoria_";function Ps(e){return e.trim()===""?za:encodeURIComponent(e)}function zs(e){return e===za?"":decodeURIComponent(e)}function js(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function ia(){const e=js();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:zs(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function Rs(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function z(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function Fs(e){z(e)}function Os(e){window.addEventListener("hashchange",e)}function ge(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function P(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Hs={hoje:ge('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:ge('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:ge('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:ge('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:ge('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:ge('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},x={backup:P('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),cloud:P('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5H7z"/>'),info:P('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:P('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:P('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:P('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:P('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:P('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:P('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:P('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:P('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:P('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:P('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:P('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:P('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:P('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:P('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:P('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:P('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:P('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:P('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:P('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:P('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:P('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:P('<path d="M20 6L9 17l-5-5"/>'),chart:P('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:P('<path d="M4 6h16M4 12h11M4 18h6"/>'),trash:P('<path d="M4 7h16"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6M14 11v6"/>')};async function Bs(e,t){var c,r,l;const a=await It(),o=a.length===0;e.innerHTML=`
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
            <button class="profile-card" role="listitem" data-id="${m(d.id)}">
              <span class="profile-avatar" aria-hidden="true">${m(Vs(d.nome))}</span>
              <span class="profile-card__name">${m(d.nome)}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset.id,p=a.find(f=>f.id===u);p&&t(p)})});const s=e.querySelector("#form-novo-perfil-picker"),i=e.querySelector("#input-novo-perfil-picker");o&&i.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",i.focus()}),(r=e.querySelector("#btn-cancelar-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="none"});const n=async()=>{const d=i.value.trim();if(!d)return;const u=await ka(d);t(u)};(l=e.querySelector("#btn-salvar-perfil-picker"))==null||l.addEventListener("click",n),i.addEventListener("keydown",d=>{d.key==="Enter"&&n()})}function Vs(e){return e.trim().slice(0,1).toUpperCase()}const be=["1","7","30","180"],ot={1:1,7:7,30:30,180:180};function Us(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=be.indexOf(e);if(t==="dificil"){const l=be[Math.max(0,s-1)];return{estagio:l,streak_facil:0,data_agendada:Y(o,ot[l]),aposentado:!1}}if(t==="medio"){const l=be[Math.min(be.length-1,s+1)];return{estagio:l,streak_facil:0,data_agendada:Y(o,ot[l]),aposentado:!1}}const i=a+1,n=s+2,c=n<=be.length-1?be[n]:"consulta",r=i>=2?"consulta":c;return r==="consulta"?{estagio:"consulta",streak_facil:i,aposentado:!0}:{estagio:r,streak_facil:i,data_agendada:Y(o,ot[r]),aposentado:!1}}async function ja(e){const t=await k(),a=te(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(_=>_.data_agendada<=a),i=Array.from(new Set(s.map(_=>_.nota_id))),n=await Promise.all(i.map(_=>t.get("notas",_))),c=new Map(n.filter(_=>!!_).map(_=>[_.id,_])),r=Array.from(new Set(Array.from(c.values()).map(_=>_.tema_id))),l=await Promise.all(r.map(_=>t.get("temas",_))),d=new Map(l.filter(_=>!!_).map(_=>[_.id,_])),u=Array.from(new Set(Array.from(d.values()).map(_=>_.espaco_id))),p=await Promise.all(u.map(_=>t.get("espacos",_))),f=new Map(p.filter(_=>!!_).map(_=>[_.id,_])),$=[];for(const _ of s){const S=c.get(_.nota_id),h=S&&d.get(S.tema_id),A=h&&f.get(h.espaco_id);!S||!h||!A||S.excluido||h.excluido||A.excluido||$.push({item:_,nota:S,tema:h,espaco:A})}return $.sort((_,S)=>_.tema.criado_em.localeCompare(S.tema.criado_em)||_.nota.criado_em.localeCompare(S.nota.criado_em)),$}async function Gs(e,t,a){const o=await k(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const i=te(),n=Us(s.estagio,t,s.streak_facil,i),c=F(),r={...s,status:"feita",avaliacao:t,data_concluida:i,duracao_segundos:a,atualizado_em:c},l={id:ne(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:n.estagio,data_agendada:n.aposentado?i:n.data_agendada,status:n.aposentado?"feita":"pendente",streak_facil:n.streak_facil,criado_em:c,atualizado_em:c},d=o.transaction("itens_revisao","readwrite");return await d.store.put(r),await d.store.put(l),await d.done,n}async function Ks(e){const t=await k(),a=te();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function Ws(e){const t=await k(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(n=>n.status==="pendente");if(a.length===0)return;const o=te(),s=F(),i=t.transaction("itens_revisao","readwrite");for(const n of a)await i.store.put({...n,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await i.done}const Je=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],na={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},Zs=new RegExp(`\\[([^\\]]+)\\]\\{(${Je.join("|")})\\}`,"g");function yt(e){let t=m(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(Zs,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Js(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,i=s[s.length-1];a.push({level:o.level,nodes:i?i.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function Ra(e){return`<ul>${e.map(t=>`<li>${yt(t.text)}${t.children.length>0?Ra(t.children):""}</li>`).join("")}</ul>`}function Xe(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(Ra(Js(o))),o=[])}let i=[];function n(){i.length>0&&(a.push(`<p>${yt(i.join(`
`)).replace(/\n/g,"<br>")}</p>`),i=[])}for(const c of t){const r=c.trim();if(r===""){n(),s();continue}const l=/^(#{1,3})\s+(.*)$/.exec(r);if(l){n(),s();const u=l[1].length;a.push(`<h${u}>${yt(l[2])}</h${u}>`);continue}const d=/^[-*]\s+(.*)$/.exec(r);if(d){n();const u=c.length-c.trimStart().length;o.push({level:Math.floor(u/2),text:d[1]});continue}s(),i.push(r)}return n(),s(),a.join(`
`)}function Nt(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(Nt).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Je.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function _t(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(..._t(s,t+1));continue}if(s.tagName!=="LI")continue;const i=s,n=Array.from(i.children).filter(l=>l.tagName==="UL"),c=i.cloneNode(!0);c.querySelectorAll("ul").forEach(l=>l.remove());const r=Nt(c).trim();r&&a.push(`${"  ".repeat(t)}- ${r}`);for(const l of n)a.push(..._t(l,t+1));o=i}return a}function ra(e){if(e.tagName==="UL")return _t(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=Nt(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function Xs(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=ra(o);s.length>0&&t.push(s.join(`
`))}else t.push(...ra(o))}return t.filter(Boolean).join(`

`)}const Qs=30;function Fa(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=Y(te(),Qs);return e.validade_ate<=t}const pe=8;function Ys(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function Pt(e){return Ys(e)%pe}function K(e){return`var(--accent-${Pt(e)})`}function Oa(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function Ae(e){return e?e.toLowerCase():"\0sem-categoria"}function zt(e){return ei(e.map(Ae))}function ei(e){const t=new Set,a=new Map;for(const o of e){let s=Pt(o);for(let i=0;i<pe&&t.has(s);i++)s=(s+1)%pe;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function Ha(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=Pt(o.id);for(let i=0;i<pe&&t.has(s);i++)s=(s+1)%pe;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const ti=5*60;let X=null;function Ba(){X&&(document.hidden?X.retomadoEm!=null&&(X.acumuladoMs+=Date.now()-X.retomadoEm,X.retomadoEm=null):X.retomadoEm==null&&(X.retomadoEm=Date.now()))}function ai(e){X&&X.itemId===e||(Re(),X={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",Ba))}function oi(){if(!X)return;let e=X.acumuladoMs;return X.retomadoEm!=null&&(e+=Date.now()-X.retomadoEm),Math.min(ti,Math.round(e/1e3))}function Re(){X&&document.removeEventListener("visibilitychange",Ba),X=null}function Va(e){const t=te();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${we(e.data_agendada,t)} dia(s)">${x.alert} atrasada</span>`}async function ca(e,t){const a=await ja(t.perfilId);await Fe(e,t,a)}async function Fe(e,t,a){var l;Re(),window.scrollTo({top:0});const o=await Ks(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(l=e.querySelector("#btn-empty-espacos"))==null||l.addEventListener("click",()=>z("espacos"));return}const n=new Set(a.map(d=>d.espaco.id)).size>1,c=new Map;for(const d of a){const u=c.get(d.tema.id)??[];u.push(d),c.set(d.tema.id,u)}const r=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=r+Array.from(c.values()).map(d=>{const u=d[0].tema,p=d[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${K(u.id)}">
            <span class="color-dot" style="--dot-color:${K(u.id)}"></span>
            ${m(V(u.nome))}
            ${n?`<span class="queue-group__espaco"> · ${m(p.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${d.map(f=>`
              <button class="item-row" data-id="${m(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${K(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${x.star} `:""}${m(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${Va(f.item)}
                ${Fa(f.nota)?`<span class="badge badge--muted">${x.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(d=>{d.addEventListener("click",()=>{const u=a.find(p=>p.item.id===d.dataset.id);u&&Ua(e,t,u,a,o)})})}function Ua(e,t,a,o,s=0,i=!1){var l,d,u;ai(a.item.id),i||window.scrollTo({top:0});const n=Fa(a.nota),c=s+o.length,r=c>0?Math.round(s/c*100):0;e.innerHTML=`
    <div class="breadcrumb">
      <button class="link" data-voltar type="button">← Voltar à fila</button>
      <button class="link" data-editar type="button" style="margin-left:auto;">${x.pen} Editar nota</button>
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
        ${a.nota.favorito?`${x.star} `:""}${m(a.nota.titulo||"(sem título)")}
        ${Va(a.item)}
      </div>

      ${n?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${i?`
        <div class="review-card__content markdown-preview">${Xe(a.nota.conteudo)}</div>
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
  `,(l=e.querySelector("[data-voltar]"))==null||l.addEventListener("click",()=>void Fe(e,t,o)),(d=e.querySelector("[data-editar]"))==null||d.addEventListener("click",()=>{Re(),z(`notas/${a.nota.id}`)}),(u=e.querySelector("#btn-revelar"))==null||u.addEventListener("click",()=>{Ua(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(p=>{p.addEventListener("click",async()=>{const f=p.dataset.avaliacao,$=oi();Re();const _=await Gs(a.item.id,f,$),S=await ja(t.perfilId);_.aposentado?si(e,t,S):await Fe(e,t,S)})})}function si(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${x.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void Fe(e,t,a))}function Ga(e){return e.trim().toLowerCase()}function jt(e){const t=new Map;for(const i of e){const n=i.categoria.trim(),c=Ga(n),r=t.get(c);r?r.itens.push(i):t.set(c,{display:n,itens:[i]})}const a=Array.from(t.values()).map(i=>({categoria:i.display,itens:i.itens})),o=a.map(i=>i.categoria),s=new Map;Ta(o.filter(i=>i!=="")).forEach((i,n)=>s.set(i,n)),a.sort((i,n)=>i.categoria===""&&n.categoria!==""?1:n.categoria===""&&i.categoria!==""?-1:(s.get(i.categoria)??0)-(s.get(n.categoria)??0));for(const i of a)i.itens.length>1&&(i.itens=me(i.itens,n=>n.nome));return a}function Rt(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=Ga(o);t.has(s)||t.set(s,o)}return Ta(Array.from(t.values()))}async function Ft(e){const a=await(await k()).getAllFromIndex("espacos","perfil_id",e);return me(a.filter(o=>!o.excluido),o=>o.nome)}const ii=["Cursos","Livros","Bíblia"];async function Ka(e){const t=await Ft(e);return Rt([...ii,...t.map(a=>a.categoria)])}async function Ot(e){return(await k()).get("espacos",e)}function Wa(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function ni(e,t,a,o={}){const s=await k(),i=F(),n={id:ne(),perfil_id:e,nome:t,categoria:a,criado_em:i,atualizado_em:i,arquivado:!1};return Wa(n,o),await s.put("espacos",n),n}async function ri(e,t,a,o={}){const s=await k(),i=await s.get("espacos",e);i&&(i.nome=t,i.categoria=a,Wa(i,o),i.atualizado_em=F(),await s.put("espacos",i))}async function wt(e,t){const a=await k(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?F():void 0,o.atualizado_em=F(),await a.put("espacos",o))}async function Za(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).filter(i=>!i.excluido).length;return{temas:a.length,notas:o}}async function Ja(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(r=>!r.excluido),i=(await Promise.all(o.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>!r.excluido),n=F(),c=t.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(he(a,n));for(const r of o)await c.objectStore("temas").put(he(r,n));for(const r of i)await c.objectStore("notas").put(he(r,n));await c.done}function ae(e){return new Promise(t=>{var i,n;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${m(e.title)}</div>
        <p class="modal__message">${m(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${m(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${m(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(i=a.querySelector("#modal-confirm"))==null||i.addEventListener("click",()=>s(!0)),(n=a.querySelector("#modal-cancel"))==null||n.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function Oe(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${m(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${m(a)}">${m(a)}</button>`).join("")}
    </div>
  `}function Ht(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ye(o),o.focus()})})})}function j(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Xa="livro",Qa=[{chave:"pasta",label:"Categoria",svg:j('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:j('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:j('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:j('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:j('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:j('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:j('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:j('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:j('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:j('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:j('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:j('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:j('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:j('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:j('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:j('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:j('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:j('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:j('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:j('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:j('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:j('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:j('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:j('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:j('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:j('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:j('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],$t=new Map(Qa.map(e=>[e.chave,e]));function ce(e){return e&&$t.get(e)||$t.get(Xa)}const ci=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function li(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Bt(e){var a;const t=li(e);if(t.trim())return(a=ci.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function $e(e){return e.icone&&$t.has(e.icone)?e.icone:Bt(`${e.nome??""} ${e.categoria??""}`)??Xa}const di="pasta";function Ya(e){return Bt(e)??di}const la=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function eo(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${le(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${Qa.map(s=>`
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
            title="${la[i]??`Cor ${i}`}"
            aria-label="${la[i]??`Cor ${i}`}"
            aria-pressed="${o===i}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${le(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function to(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${_e(a)}"]`);if(!s)return;const i=s.querySelector(`#${_e(a)}-icone`),n=s.querySelector(`#${_e(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),r=u=>{i&&(i.value=u);for(const p of c){const f=p.dataset.icone===u;p.classList.toggle("is-selected",f),p.setAttribute("aria-pressed",String(f))}};let l=!1;for(const u of c)u.addEventListener("click",()=>{l=!0,r(u.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(u=>{u.addEventListener("click",()=>{n&&(n.value=u.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(p=>{const f=p===u;p.classList.toggle("is-selected",f),p.setAttribute("aria-pressed",String(f))})})});const d=()=>{if(l)return;const u=Bt(o());for(const p of c)p.classList.toggle("is-suggested",!!u&&p.dataset.icone===u);u&&r(u)};d(),e.querySelectorAll('input[type="text"]').forEach(u=>{u.addEventListener("input",d)})}function ao(e,t){var n,c;const a=e.querySelector(`[data-espaco-visual="${_e(t)}"]`),o=(n=a==null?void 0:a.querySelector(`#${_e(t)}-icone`))==null?void 0:n.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${_e(t)}-cor`))==null?void 0:c.value.trim(),i={};if(o&&(i.icone=o),s!==void 0&&s!==""){const r=Number(s);Number.isInteger(r)&&r>=0&&r<pe&&(i.cor=r)}return i}function le(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function _e(e){return e.replace(/["\\]/g,"\\$&")}function Le(e,t){var o;e.classList.add("input--error"),e.setAttribute("aria-invalid","true");const a=(o=e.closest(".field"))==null?void 0:o.querySelector(".field__error");a&&(a.textContent=t,a.style.display="block")}function qe(e){var a;e.classList.remove("input--error"),e.removeAttribute("aria-invalid");const t=(a=e.closest(".field"))==null?void 0:a.querySelector(".field__error");t&&(t.style.display="")}function He(e){let t=null;for(const a of e){if(a.ok){qe(a.input);continue}Le(a.input,a.mensagem),t||(t=a.input)}return t?(t.focus(),!1):!0}async function Ne(e,t){var p,f,$,_,S;const a=await Ft(t.perfilId),o=a.filter(h=>!h.arquivado),s=a.filter(h=>h.arquivado),i=await mi(a.map(h=>h.id)),n=jt(o),c=Ha(o),r=zt(n.map(h=>h.categoria)),l=await Ka(t.perfilId);e.innerHTML=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap; margin-bottom: var(--space-4);">
      <p class="screen-hint" style="margin:0;">Cada Espaço é um curso, um livro ou um estudo — agrupe por categoria pra manter organizado.</p>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Novo espaço</button>
    </div>

    <div id="form-novo-espaco" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-categoria-espaco">Categoria</label>
        <input class="input" id="input-categoria-espaco" type="text" placeholder="Ex: Cursos, Livros, Estudos" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${Oe(l,"input-categoria-espaco")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-espaco">Nome do espaço</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Curso de Investimentos" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${eo({prefix:"novo-espaco"})}
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
    `:n.map(h=>{const A=h.itens.length===1?h.itens[0]:null,D=A?c.get(A.id)??K(A.id):r.get(Ae(h.categoria))??K(h.categoria),E=ce(A?$e(A):Ya(h.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${D}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${D}" aria-hidden="true">${E.svg}</span>
            ${m(h.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${h.itens.map(I=>ui(I,i.get(I.id)??0,c.get(I.id)??K(I.id))).join("")}
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
  `,Ht(e),to(e,{prefix:"novo-espaco",getTexto:()=>{var h,A;return`${((h=e.querySelector("#input-nome-espaco"))==null?void 0:h.value)??""} ${((A=e.querySelector("#input-categoria-espaco"))==null?void 0:A.value)??""}`}});const d=e.querySelector("#form-novo-espaco"),u=()=>{var h;d.style.display="block",(h=e.querySelector("#input-categoria-espaco"))==null||h.focus()};(p=e.querySelector("#btn-novo-espaco"))==null||p.addEventListener("click",u),(f=e.querySelector("#btn-empty-novo-espaco"))==null||f.addEventListener("click",u),($=e.querySelector("#btn-cancelar-espaco"))==null||$.addEventListener("click",()=>{d.style.display="none"});for(const h of["#input-nome-espaco","#input-categoria-espaco"])(_=e.querySelector(h))==null||_.addEventListener("input",A=>{qe(A.target)});(S=e.querySelector("#btn-salvar-espaco"))==null||S.addEventListener("click",async()=>{const h=e.querySelector("#input-nome-espaco"),A=e.querySelector("#input-categoria-espaco"),D=h.value.trim(),E=A.value.trim(),I=a.some(B=>B.nome.trim().toLowerCase()===D.toLowerCase());if(!He([{input:A,ok:E.length>0,mensagem:"Informe uma categoria para o espaço."},{input:h,ok:D.length>0,mensagem:"Informe um nome para o espaço."}]))return;if(I){Le(h,"Já existe um espaço com esse nome."),h.focus();return}const R=await ni(t.perfilId,D,E,ao(e,"novo-espaco"));z(`espacos/${R.id}`)}),e.querySelectorAll("[data-open]").forEach(h=>{h.addEventListener("click",()=>z(`espacos/${h.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(h=>{h.addEventListener("click",async()=>{await wt(h.dataset.archive,!0),Ne(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(h=>{h.addEventListener("click",async()=>{await wt(h.dataset.unarchive,!1),Ne(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(h=>{h.addEventListener("click",async()=>{const A=h.dataset.excluir,D=h.dataset.nome??"",E=await Za(A);await ae({title:`Excluir "${D}"?`,message:`Isso manda pra Lixeira o espaço com ${E.temas} tema(s) e ${E.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ja(A),Ne(e,t))})})}function ui(e,t,a){const o=ce($e(e));return`
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
  `}async function mi(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function oo(e){const a=await(await k()).getAllFromIndex("temas","espaco_id",e);return me(a.filter(o=>!o.excluido),o=>o.nome)}async function so(e){return(await k()).get("temas",e)}async function pi(e,t,a){const o=await k(),s=F(),i={id:ne(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",i),i}async function vi(e,t,a){const o=await k(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=F(),await o.put("temas",s))}async function fi(e){const t=await k(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=F(),await t.put("temas",a),a.favorito):!1}async function gi(e){return{notas:(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido).length}}async function bi(e){const t=await k(),a=await t.get("temas",e);if(!a)return;const o=(await t.getAllFromIndex("notas","tema_id",e)).filter(n=>!n.excluido),s=F(),i=t.transaction(["temas","notas"],"readwrite");await i.objectStore("temas").put(he(a,s));for(const n of o)await i.objectStore("notas").put(he(n,s));await i.done}function hi(e,t){let a=e.has(t)?t:Y(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=Y(a,-1);return o}function yi(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const _i=5;async function wi(e){const t=await k(),a=te(),o=Y(a,-6),[s,i,n,c,r]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"])),t.getAll("notas"),t.getAll("temas"),t.getAll("espacos")]),l=new Map(n.map(w=>[w.id,w])),d=new Map(c.map(w=>[w.id,w])),u=new Map(r.map(w=>[w.id,w])),p=w=>{const J=l.get(w.nota_id);if(!J||J.excluido)return!1;const xe=d.get(J.tema_id);if(!xe||xe.excluido)return!1;const Wt=u.get(xe.espaco_id);return!!Wt&&!Wt.excluido},f=s.filter(w=>w.avaliacao&&p(w)),$=i.filter(p),_=f.filter(w=>w.data_concluida===a),S=_.length,h=_.reduce((w,J)=>w+(J.duracao_segundos??0),0),A=f.filter(w=>w.data_concluida&&w.data_concluida>=o&&w.data_concluida<=a).length,D=["1","7","30","180"].map(w=>({estagio:w,count:$.filter(J=>J.estagio===w).length})),E=[];for(let w=1;w<=7;w++){const J=Y(a,w);E.push({data:J,count:$.filter(xe=>xe.data_agendada===J).length})}const I=Y(a,-29),R=f.filter(w=>w.data_concluida>=I),B={facil:R.filter(w=>w.avaliacao==="facil").length,medio:R.filter(w=>w.avaliacao==="medio").length,dificil:R.filter(w=>w.avaliacao==="dificil").length,total:0};B.total=B.facil+B.medio+B.dificil;const q=new Set(f.map(w=>w.data_concluida)),U=hi(q,a),Q=[];for(let w=6;w>=0;w--)Q.push(q.has(Y(a,-w)));const W=f.filter(w=>w.estagio==="consulta").length,G=f.filter(w=>w.avaliacao==="dificil"),oe=Array.from(new Set(G.map(w=>w.nota_id))),b=await Promise.all(oe.map(w=>t.get("notas",w))),C=new Map(b.filter(w=>!!w).map(w=>[w.id,w.tema_id])),L=new Map;for(const w of G){const J=C.get(w.nota_id);J&&L.set(J,(L.get(J)??0)+1)}const g=Array.from(L.keys()),y=(await Promise.all(g.map(w=>t.get("temas",w)))).filter(w=>!!w).map(w=>({temaId:w.id,temaNome:V(w.nome),count:L.get(w.id)})).sort((w,J)=>J.count-w.count).slice(0,_i),T=r.filter(w=>w.perfil_id===e&&!w.excluido),M=T.filter(w=>!w.arquivado).length,H=(await Promise.all(T.map(w=>t.getAllFromIndex("temas","espaco_id",w.id)))).flat().filter(w=>!w.excluido),se=H.length,Ce=(await Promise.all(H.map(w=>t.getAllFromIndex("notas","tema_id",w.id)))).flat().filter(w=>!w.excluido).length;return{revisoesHoje:S,revisoesUltimos7Dias:A,streakDias:U,diasAtivosUltimos7:Q,rankingDificeis:y,espacosAtivos:M,totalTemas:se,totalNotas:Ce,itensEmConsulta:W,porEstagio:D,tempoHojeSegundos:h,cargaProximos7:E,retencao30:B}}async function $i(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(n=>t.getAllFromIndex("notas","tema_id",n.id)))).flat();return(await Promise.all(s.map(n=>t.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat().reduce((n,c)=>n+(c.duracao_segundos??0),0)}async function xi(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,i)=>s+(i.duracao_segundos??0),0)}function io(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${m(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${m(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=i=>{i.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",i=>{i.target===t&&o()})}async function Ei(e){const t=await k(),a=F(),o={id:ne(),perfil_id:e.perfilId,espaco_id:e.espacoId,tema_id:e.temaId,nota_id:e.notaId,avaliacao:e.avaliacao,escopo:e.escopo,categoria:e.categoria,sessao_id:e.sessaoId,criado_em:a,atualizado_em:a};await t.put("avaliacoes",o)}async function Si(e,t=20){const a=await k(),o=await a.getAllFromIndex("avaliacoes","perfil_id",e),s=new Map((await a.getAll("espacos")).map(r=>[r.id,r.nome])),i=new Map((await a.getAll("temas")).map(r=>[r.id,V(r.nome)])),n={total:0,facil:0,medio:0,dificil:0,sessoesTotal:0,sessoes:[]},c=new Map;for(const r of o){n.total++,n[r.avaliacao]++,(!n.ultimaEm||r.criado_em>n.ultimaEm)&&(n.ultimaEm=r.criado_em);let l=c.get(r.sessao_id);if(!l){const d=r.escopo==="tema"?i.get(r.tema_id):r.escopo==="categoria"?r.categoria||"Sem categoria":s.get(r.espaco_id);l={sessao_id:r.sessao_id,criado_em:r.criado_em,total:0,facil:0,medio:0,dificil:0,escopo:r.escopo,contexto:d??"Conteúdo excluído"},c.set(r.sessao_id,l)}l.total++,l[r.avaliacao]++,r.criado_em>l.criado_em&&(l.criado_em=r.criado_em)}return n.sessoesTotal=c.size,n.sessoes=[...c.values()].sort((r,l)=>l.criado_em.localeCompare(r.criado_em)).slice(0,t),n}function Be(e){return e||"Sem categoria"}function Ve(e,t){return`${t}-${e.replace(/\./g,"-")}`}function no(e){return e.map((t,a)=>{const o=`${a+1}`,s=t.temas.map((i,n)=>{const c=`${o}.${n+1}`;return{temaPdf:i,numero:c,notas:i.notas.map((r,l)=>({notaPdf:r,numero:`${c}.${l+1}`}))}});return{grupo:t,numero:o,temas:s,totalNotas:s.reduce((i,n)=>i+n.notas.length,0)}})}function ki(e){const t=[];let a=0,o=0;for(const s of e){a+=s.temas.length,o+=s.totalNotas,t.push({nivel:"categoria",numero:s.numero,nome:Be(s.grupo.categoria),notas:s.totalNotas,anexo:Ve(s.numero,"pdf-cat")});for(const i of s.temas)t.push({nivel:"tema",numero:i.numero,nome:V(i.temaPdf.tema.nome),notas:i.notas.length,anexo:Ve(i.numero,"pdf-tema")})}return{linhas:t,totalTemas:a,totalNotas:o}}function Ai(e){return Ve(e.numero,"pdf-cat")}function Li(e){return Ve(e.numero,"pdf-tema")}function qi(e,t){if(t.tipo==="tema")return[{rotulo:t.nomeContexto,escopo:"tema",itens:e}];const a=new Map;for(const o of e){const s=o.tema.categoria??"";let i=a.get(s);i||(i={rotulo:Be(s),escopo:"categoria",categoria:s,itens:[]},a.set(s,i)),i.itens.push(o)}return a.size<=1?[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e}]:[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e},...[...a.values()].sort((o,s)=>o.rotulo.localeCompare(s.rotulo,"pt-BR"))]}const da=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}],Ti=[{valor:"dificil",label:"Difícil",classe:"btn--review-dificil",icone:x.caraTriste},{valor:"medio",label:"Médio",classe:"btn--review-medio",icone:x.caraNeutra},{valor:"facil",label:"Fácil",classe:"btn--review-facil",icone:x.caraFeliz}];function Ci(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function ro(e,t,a,o){var i;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra avaliar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",o);return}const s=qi(t,a);s.length>1?co(e,s,a,o):lo(e,s[0],s,a,o)}function Vt(e){return`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← ${m(e)}</button>
    </div>
  `}function co(e,t,a,o){var s;e.innerHTML=`
    ${Vt("Encerrar avaliação")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
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
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-escopo]").forEach(i=>{i.addEventListener("click",()=>{lo(e,t[Number(i.dataset.escopo)],t,a,o)})})}function lo(e,t,a,o,s){var i;e.innerHTML=`
    ${Vt("Voltar")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <h2 style="margin:0;">Avaliação — ${m(t.rotulo)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse com notas aleatórias e marque Fácil, Médio ou Difícil em cada uma. Isso não
          afeta sua fila de revisão. ${t.itens.length} nota(s) — escolha quantas:
        </p>
        <div class="stack">
          ${da.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.itens.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",()=>{o.tipo==="espaco"&&a.length>1?co(e,a,o,s):s()}),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const c=da.find(d=>d.key===n.dataset.tier),r=Ci(t.itens).slice(0,Math.min(c.n,t.itens.length)),l={id:ne(),escopo:t.escopo,categoria:t.categoria,itens:r,contagem:{facil:0,medio:0,dificil:0}};xt(e,l,0,o,s)})})}function xt(e,t,a,o,s,i=!1){var c,r;if(a>=t.itens.length){Mi(e,t,o,s);return}const n=t.itens[a];e.innerHTML=`
    ${Vt("Encerrar avaliação")}
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${m(V(n.tema.nome))} · ${a+1} de ${t.itens.length}</div>
      <div class="review-card__titulo">${n.nota.favorito?`${x.star} `:""}${m(n.nota.titulo||"(sem título)")}</div>
      ${i?`
        <div class="review-card__content markdown-preview">${Xe(n.nota.conteudo)}</div>
        <div class="review-actions">
          ${Ti.map(l=>`
            <button class="btn ${l.classe}" data-avaliacao="${l.valor}" type="button">${l.icone}<span>${l.label}</span></button>
          `).join("")}
        </div>
        <p class="review-legend">Fácil = lembrei na hora · Médio = com esforço · Difícil = não lembrei</p>
      `:`
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `}
    </div>
    </div>
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{xt(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(l=>{l.addEventListener("click",async()=>{const d=l.dataset.avaliacao;t.contagem[d]++,await Ei({perfilId:o.perfilId,espacoId:o.espacoId,temaId:n.tema.id,notaId:n.nota.id,avaliacao:d,escopo:t.escopo,categoria:t.categoria,sessaoId:t.id}),xt(e,t,a+1,o,s)})})}function Mi(e,t,a,o){var c;const{facil:s,medio:i,dificil:n}=t.contagem;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${x.confete}</div>
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
  `,(c=e.querySelector("#btn-terminar"))==null||c.addEventListener("click",o)}function Ut(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${ce(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${K(t.colorKey)}"></span>`:""}${m(t.label)}`,i=a===e.length-1,n=t.route&&!i?`<button class="link" data-crumb="${m(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?n:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${n}`}).join("")}
    </div>
  `}function Gt(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>z(t.dataset.crumb))})}async function Pe(e,t){var I,R,B,q,U,Q,W,G,oe,b,C,L,g;const a=await Ot(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await oo(t),s=await Ii(o.map(v=>v.id)),i=jt(o),n=await Ka(a.perfil_id),c=Rt(o.map(v=>v.categoria)),r=[...o].sort((v,y)=>y.criado_em.localeCompare(v.criado_em))[0],l=((I=r==null?void 0:r.categoria)==null?void 0:I.trim())||void 0,d=((R=r==null?void 0:r.nome)==null?void 0:R.trim())||void 0,u=Oa(a.cor,K(a.id)),p=ce($e(a)),f=zt(i.map(v=>v.categoria));e.innerHTML=`
    ${Ut([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:p.chave,iconColor:u}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${u}" aria-hidden="true">${p.svg}</span>${m(a.nome)}
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
            <button id="btn-detalhes" type="button">${x.info} Detalhes</button>
            <button id="btn-avaliar" type="button">${x.dice} Avaliar notas</button>
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
        ${Oe(n,"input-categoria-espaco-editar")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-espaco-editar">Nome</label>
        <input class="input" id="input-nome-espaco-editar" type="text" value="${m(a.nome)}" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${eo({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
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
        <input class="input${l?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${m(l??"")}" />
        <p class="field__error" role="alert"></p>
        ${l?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${Oe(c,"input-categoria-tema")}
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-nome-tema">Nome do tema (opcional)</label>
        <input class="input${d?" input--sugerido":""}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${m(d??"")}" />
        <p class="field__error" role="alert"></p>
        ${d?'<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>':""}
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
    `:i.map(v=>{const y=f.get(Ae(v.categoria))??K(v.categoria||"sem-categoria"),T=ce(Ya(v.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${y}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${y}" aria-hidden="true">${T.svg}</span>
            ${m(v.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${m(v.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${m(Ps(v.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${v.itens.map(M=>`
            <button class="item-row" data-open="${m(M.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${y}">
              <span class="item-row__main">
                <span class="item-row__title">${M.favorito?`${x.star} `:""}${m(V(M.nome))}</span>
                <span class="item-row__meta">${s.get(M.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,Gt(e),Ht(e),to(e,{prefix:"editar-espaco",getTexto:()=>{var v,y;return`${((v=e.querySelector("#input-nome-espaco-editar"))==null?void 0:v.value)??""} ${((y=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:y.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(v=>{v.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),z(`espacos/${t}/pdf/${v.dataset.pdfCategoria}`)})}),(B=e.querySelector("#btn-arquivar"))==null||B.addEventListener("click",async()=>{!a.arquivado&&!await ae({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await wt(a.id,!a.arquivado),Pe(e,t))});const $=e.querySelector("#form-editar-espaco"),_=e.querySelector("#input-nome-espaco-editar"),S=e.querySelector("#input-categoria-espaco-editar");(q=e.querySelector("#btn-editar"))==null||q.addEventListener("click",()=>{$.style.display="block",S.focus()}),(U=e.querySelector("#btn-cancelar-edicao"))==null||U.addEventListener("click",()=>{$.style.display="none"});for(const v of[_,S])v.addEventListener("input",()=>qe(v));(Q=e.querySelector("#btn-salvar-edicao"))==null||Q.addEventListener("click",async()=>{const v=_.value.trim(),y=S.value.trim();if(!He([{input:S,ok:y.length>0,mensagem:"Informe uma categoria para o espaço."},{input:_,ok:v.length>0,mensagem:"Informe um nome para o espaço."}]))return;if((await Ft(a.perfil_id)).some(M=>M.id!==a.id&&M.nome.trim().toLowerCase()===v.toLowerCase())){Le(_,"Já existe um espaço com esse nome."),_.focus();return}await ri(a.id,v,y,ao(e,"editar-espaco")),Pe(e,t)}),(W=e.querySelector("#btn-detalhes"))==null||W.addEventListener("click",async()=>{const v=Array.from(s.values()).reduce((se,ve)=>se+ve,0),y=Z(),T=await $i(a.id);let M,N,H;if(a.arquivado&&a.arquivado_em){const se=we(Z(new Date(a.criado_em)),Z(new Date(a.arquivado_em)));M=String(se),N="Dias até arquivar",H=`Criado em ${re(a.criado_em)} · arquivado em ${re(a.arquivado_em)}`}else if(a.arquivado)M="—",N="Duração",H=`Criado em ${re(a.criado_em)} · arquivado antes desse registro de data existir`;else{const se=we(Z(new Date(a.criado_em)),y);M=String(se),N=se===1?"Dia ativo":"Dias ativo",H=`Criado em ${re(a.criado_em)}`}io({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${o.length}</div>
            <div class="stat-tile__label">Temas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${v}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Mt(T)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${M}</div>
            <div class="stat-tile__label">${N}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${H} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(G=e.querySelector("#btn-avaliar"))==null||G.addEventListener("click",async()=>{const v=await ps(a.id),y={perfilId:a.perfil_id,espacoId:a.id,nomeContexto:a.nome,tipo:"espaco"};ro(e,v,y,()=>Pe(e,t))}),(oe=e.querySelector("#btn-excluir"))==null||oe.addEventListener("click",async()=>{const v=await Za(a.id);await ae({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o espaço com ${v.temas} tema(s) e ${v.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ja(a.id),z("espacos"))});const h=e.querySelector("#form-novo-tema"),A=()=>{var v;h&&(h.style.display="block"),(v=e.querySelector("#input-categoria-tema"))==null||v.focus()};(b=e.querySelector("#btn-novo-tema"))==null||b.addEventListener("click",A),(C=e.querySelector("#btn-empty-novo-tema"))==null||C.addEventListener("click",A),(L=e.querySelector("#btn-cancelar-tema"))==null||L.addEventListener("click",()=>{h&&(h.style.display="none")});const D=e.querySelector("#input-nome-tema"),E=e.querySelector("#input-categoria-tema");d&&D.addEventListener("input",()=>ye(D),{once:!0}),l&&E.addEventListener("input",()=>ye(E),{once:!0});for(const v of[D,E])v.addEventListener("input",()=>qe(v));e.querySelectorAll("[data-novo-tema-categoria]").forEach(v=>{v.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),h&&(h.style.display="block"),E.value=v.dataset.novoTemaCategoria,ye(E),D.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(g=e.querySelector("#btn-salvar-tema"))==null||g.addEventListener("click",async()=>{const v=D.value.trim(),y=E.value.trim();if(!He([{input:E,ok:y.length>0,mensagem:"Informe uma categoria para o tema."}]))return;const T=H=>H.trim().toLowerCase();if(o.some(H=>T(H.categoria)===T(y)&&T(H.nome)===T(v)&&v.length>0)){Le(D,"Já existe um tema com esse nome nesta categoria."),D.focus();return}const N=await pi(t,v,y);z(`temas/${N.id}`)}),e.querySelectorAll("[data-open]").forEach(v=>{v.addEventListener("click",()=>z(`temas/${v.dataset.open}`))})}async function Ii(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function Di(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(c=>!c.excluido),s=jt(o),i=Tt()==="titulo",n=[];for(const c of s){const r=[];for(const l of c.itens){const d=(await t.getAllFromIndex("notas","tema_id",l.id)).filter(p=>!p.excluido);i?me(d,p=>p.titulo):d.sort((p,f)=>p.criado_em.localeCompare(f.criado_em));const u=[];for(const p of d){const $=(await t.getAllFromIndex("itens_revisao","nota_id",p.id)).map(_=>_.avaliacao).filter(_=>!!_);u.push({nota:p,fraca:yi($)})}r.push({tema:l,notas:u})}n.push({categoria:c.categoria,temas:r})}return{espaco:a,grupos:n}}function st(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Je.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const ua=["•","◦","▪"];function uo(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${st(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const i=Math.floor((t.length-t.trimStart().length)/2),n=ua[Math.min(i,ua.length-1)];return`${"  ".repeat(i)}${n} ${st(s[1])}`}return st(a)}).join(`
`)}function Ni(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",uo(e.conteudo)),t.join(`
`).trim()}function Pi(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of no(t))if(o.temas.length!==0){a.push("",`▸ ${o.numero} ${(o.grupo.categoria||"sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.numero} ${s.temaPdf.tema.favorito?"⭐ ":""}*${V(s.temaPdf.tema.nome)}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const i of s.notas){const n=`${i.notaPdf.nota.favorito?"⭐ ":""}${i.notaPdf.fraca?"⚠ ":""}`;a.push("",`${n}${i.numero} *${i.notaPdf.nota.titulo||"(sem título)"}*`),i.notaPdf.nota.fonte&&a.push(`_${i.notaPdf.nota.fonte}_`),a.push(uo(i.notaPdf.nota.conteudo))}}}return a.join(`
`).trim()}const ma="memoriza:pdf:indice",pa="memoriza:pdf:quebraCategoria";function va(e,t){const a=localStorage.getItem(e);return a===null?t:a==="1"}function fa(e,t){localStorage.setItem(e,t?"1":"0")}function ie(e,t){return`${e} ${t}${e===1?"":"s"}`}async function zi(e,t,a){var R,B;const o=await Di(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,i=a===void 0?o.grupos:o.grupos.filter(q=>q.categoria===a),n=Pi(s,i),c=Oa(s.cor,K(s.id)),r=ce($e(s)),l=no(i),d=ki(l),u=zt(i.map(q=>q.categoria)),p=q=>u.get(Ae(q))??K(Ae(q)),f=i.every(q=>q.temas.length===0),$=i.length>1,_=$&&va(ma,!0),S=$&&va(pa,!0);e.innerHTML=`
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
          ${a!==void 0?`Categoria: ${m(Be(a))} · `:""}Gerado em ${re(Z()+"T00:00:00Z")}
          · ${ie(i.length,"categoria")} · ${ie(d.totalTemas,"tema")} · ${ie(d.totalNotas,"nota")}
        </p>
      </header>

      ${f?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:""}

      ${$?`
        <nav class="pdf-indice" id="pdf-indice" aria-label="Índice" ${_?"":"hidden"}>
          <div class="pdf-indice__cabecalho">
            <span class="pdf-indice__titulo">Índice</span>
            <span class="pdf-contagem">${ie(i.length,"categoria")} · ${ie(d.totalTemas,"tema")} · ${ie(d.totalNotas,"nota")}</span>
          </div>
          <ul class="pdf-indice__lista">
            ${d.linhas.map(q=>`
              <li class="pdf-indice__item pdf-indice__item--${q.nivel}">
                <button class="pdf-indice__link" type="button" data-ancora="${q.anexo}">
                  <span class="pdf-num">${q.numero}</span>
                  <span class="pdf-indice__nome">${m(q.nome)}</span>
                  <span class="pdf-contagem">${ie(q.notas,"nota")}</span>
                </button>
              </li>
            `).join("")}
          </ul>
        </nav>
      `:""}

      ${l.map((q,U)=>{const Q=p(q.grupo.categoria);return`
        <section class="pdf-category${U===0?" pdf-category--primeira":""}" id="${Ai(q)}" style="--cat-accent:${Q}">
          <div class="pdf-category__title">
            <span class="pdf-num">${q.numero}</span>
            <span class="color-dot" style="--dot-color:${Q}" aria-hidden="true"></span>
            <span class="pdf-nivel">Categoria</span>
            <span class="pdf-category__nome">${m(Be(q.grupo.categoria))}</span>
            <span class="pdf-contagem">${ie(q.temas.length,"tema")} · ${ie(q.totalNotas,"nota")}</span>
          </div>
          ${q.temas.map(W=>`
            <section class="pdf-tema" id="${Li(W)}" style="--tema-accent:${Q}">
              <div class="pdf-tema__title">
                <span class="pdf-num pdf-num--tema">${W.numero}</span>
                <span class="pdf-nivel">Tema</span>
                ${W.temaPdf.tema.favorito?`${x.star} `:""}<span class="pdf-tema__nome">${m(V(W.temaPdf.tema.nome))}</span>
                <span class="pdf-contagem">${ie(W.notas.length,"nota")}</span>
              </div>
              ${W.notas.length===0?'<p class="text-muted">Sem notas.</p>':W.notas.map(G=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    <span class="pdf-num pdf-num--nota">${G.numero}</span>
                    ${G.notaPdf.nota.favorito?`${x.star} `:""}
                    <span class="pdf-nota__nome">${m(G.notaPdf.nota.titulo||"(sem título)")}</span>
                    ${G.notaPdf.fraca?`<span class="badge badge--danger">${x.alert} Reforçar</span>`:""}
                  </div>
                  ${G.notaPdf.nota.fonte?`<div class="pdf-nota__meta">${m(G.notaPdf.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${Xe(G.notaPdf.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `).join("")}
        </section>
      `}).join("")}
    </article>
  `,(R=e.querySelector("[data-back]"))==null||R.addEventListener("click",()=>z(`espacos/${t}`)),(B=e.querySelector("#btn-imprimir"))==null||B.addEventListener("click",()=>window.print());const h=e.querySelector("#pdf-indice"),A=e.querySelector("#pdf-opcao-indice");A==null||A.addEventListener("change",()=>{h&&(h.hidden=!A.checked),fa(ma,A.checked)});const D=e.querySelector(".pdf-page"),E=e.querySelector("#pdf-opcao-quebra");E==null||E.addEventListener("change",()=>{D&&(D.dataset.quebra=E.checked?"categoria":"fluxo"),fa(pa,E.checked)}),e.querySelectorAll("[data-ancora]").forEach(q=>{q.addEventListener("click",()=>{var U;(U=document.getElementById(q.dataset.ancora??""))==null||U.scrollIntoView({behavior:"smooth",block:"start"})})});const I=e.querySelector("#btn-copiar");I==null||I.addEventListener("click",async()=>{const q=I.textContent;try{await navigator.clipboard.writeText(n),I.textContent="Copiado!"}catch{I.textContent="Não foi possível copiar"}setTimeout(()=>{I.textContent=q},1800)})}async function ze(e,t){var u,p,f,$,_,S,h,A,D;const a=await so(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await Ot(a.espaco_id),s=await Ia(t),i=o?await oo(o.id):[],n=Rt(i.map(E=>E.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${Ut([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:V(a.nome)}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${K(c)}"></span>${a.favorito?`${x.star} `:""}${m(V(a.nome))}
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
            <button id="btn-avaliar-tema" type="button">${x.dice} Avaliar notas</button>
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
        ${Oe(n,"input-categoria-tema-editar")}
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
        <div class="empty-state__icon" aria-hidden="true">${x.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${o!=null&&o.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>'}
      </div>
    `:`
      <div class="item-list">
        ${s.map(E=>`
          <button class="item-row" data-open="${m(E.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${K(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${E.favorito?`${x.star} `:""}${m(E.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${m(E.fonte||"Sem fonte")}${E.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${E.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,Gt(e),Ht(e),(u=e.querySelector("#btn-nova-nota"))==null||u.addEventListener("click",()=>z(`temas/${t}/nova-nota`)),(p=e.querySelector("#btn-empty-nova-nota"))==null||p.addEventListener("click",()=>z(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(E=>{E.addEventListener("click",()=>z(`notas/${E.dataset.open}`))}),(f=e.querySelector("#btn-favoritar-tema"))==null||f.addEventListener("click",async()=>{await fi(a.id),ze(e,t)}),($=e.querySelector("#btn-detalhes-tema"))==null||$.addEventListener("click",async()=>{const E=await xi(a.id),I=we(Z(new Date(a.criado_em)),Z());io({title:V(a.nome),bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Mt(E)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${I}</div>
            <div class="stat-tile__label">${I===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${re(a.criado_em)}</p>
      `})}),(_=e.querySelector("#btn-avaliar-tema"))==null||_.addEventListener("click",()=>{const E=s.map(R=>({nota:R,tema:a})),I={perfilId:o.perfil_id,espacoId:a.espaco_id,nomeContexto:V(a.nome),tipo:"tema"};ro(e,E,I,()=>ze(e,t))});const r=e.querySelector("#form-editar-tema"),l=e.querySelector("#input-nome-tema-editar"),d=e.querySelector("#input-categoria-tema-editar");(S=e.querySelector("#btn-editar-tema"))==null||S.addEventListener("click",()=>{r.style.display="block",d.focus()}),(h=e.querySelector("#btn-cancelar-edicao-tema"))==null||h.addEventListener("click",()=>{r.style.display="none"});for(const E of[l,d])E.addEventListener("input",()=>qe(E));(A=e.querySelector("#btn-salvar-edicao-tema"))==null||A.addEventListener("click",async()=>{const E=l.value.trim(),I=d.value.trim();if(!He([{input:d,ok:I.length>0,mensagem:"Informe uma categoria para o tema."}]))return;const R=q=>q.trim().toLowerCase();if(i.some(q=>q.id!==a.id&&R(q.categoria)===R(I)&&R(q.nome)===R(E)&&E.length>0)){Le(l,"Já existe um tema com esse nome nesta categoria."),l.focus();return}await vi(a.id,E,I),ze(e,t)}),(D=e.querySelector("#btn-excluir-tema"))==null||D.addEventListener("click",async()=>{const E=await gi(a.id);await ae({title:`Excluir "${V(a.nome)}"?`,message:`Isso manda pra Lixeira o tema com ${E.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await bi(a.id),z(`espacos/${a.espaco_id}`))})}function Me(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${m(e)}</div>
    </details>
  `}let Qe=!1,Et=null;function ji(e){Qe=e}function ga(){Qe=!1}function Ri(e){Et=e}function Ee(){return Qe?Et?Et():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function Fi(){window.addEventListener("beforeunload",e=>{Qe&&(e.preventDefault(),e.returnValue="")})}const Oi={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function it(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function Ue(e,t){var Q,W,G,oe,b,C,L;const a=t.mode==="nova"?t.temaId:(Q=await oa(t.notaId))==null?void 0:Q.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await so(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await Ot(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${m(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(W=e.querySelector("#btn-voltar-arquivado"))==null||W.addEventListener("click",()=>z(`temas/${a}`));return}const i=t.mode==="editar"?await oa(t.notaId):void 0,n=i?await Hi(i.id):!1,c=t.mode==="nova"?(await Ia(a)).at(-1):void 0,r=c==null?void 0:c.titulo,l=c==null?void 0:c.fonte;e.innerHTML=`
    ${Ut([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:V(o.nome),route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(i==null?void 0:i.titulo)||"Editar nota"}])}

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
        <label class="field__label" for="input-titulo">Título${Me('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${r?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${m((i==null?void 0:i.titulo)??r??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${r?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${Me("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${l?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${m((i==null?void 0:i.fonte)??l??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${l?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${Me("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
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
            ${Je.map(g=>`<button type="button" class="color-picker__swatch" data-cor="${g}" style="--dot-color:${Oi[g]}" title="${m(na[g])}" aria-label="${m(na[g])}"></button>`).join("")}
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
        >${i!=null&&i.conteudo?Xe(i.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${i!=null&&i.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${Me("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
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
  `;const d=`temas/${a}`;Gt(e),(G=e.querySelector("#btn-cancelar"))==null||G.addEventListener("click",()=>{Ee()&&(ga(),z(d))});const u=e.querySelector("#input-conteudo"),p=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),$=()=>ji(!0);p.addEventListener("input",$),f.addEventListener("input",$),u.addEventListener("input",$),Ri(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),r&&p.addEventListener("input",()=>ye(p),{once:!0}),l&&f.addEventListener("input",()=>ye(f),{once:!0}),u.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function _(g){var y,T;let v=((T=(y=window.getSelection())==null?void 0:y.getRangeAt(0))==null?void 0:T.commonAncestorContainer)??null;for(;v&&v!==u;){if(v instanceof HTMLElement&&v.tagName===g)return!0;v=v.parentNode}return!1}function S(){const g=window.getSelection();if(!g||g.rangeCount===0)return;let v=g.getRangeAt(0).commonAncestorContainer;for(;v&&v!==u;){if(v instanceof HTMLElement&&v.tagName==="LI"){const y=document.createRange();y.selectNodeContents(v),y.collapse(!1),g.removeAllRanges(),g.addRange(y);return}v=v.parentNode}}function h(){u.querySelectorAll("p").forEach(g=>{g.querySelector("ul")&&g.replaceWith(...Array.from(g.childNodes))})}function A(){const g=window.getSelection(),v=g.getRangeAt(0);v.deleteContents();const y=document.createElement("br");v.insertNode(y);const T=document.createTextNode("​");y.after(T);const M=document.createRange();return M.setStart(T,1),M.collapse(!0),g.removeAllRanges(),g.addRange(M),{br:y,ancora:T}}function D(){if(!E)return;const{br:g,ancora:v}=E;if(E=null,!document.contains(v))return;const y=v.parentNode;if(!y)return;const T=Array.from(y.childNodes).indexOf(v);v.remove();const M=window.getSelection();if(!M||!document.contains(g))return;const N=document.createRange();N.setStart(y,T),N.collapse(!0),M.removeAllRanges(),M.addRange(N)}let E=null;u.addEventListener("keydown",g=>{if(g.key!=="Enter"||g.shiftKey||g.ctrlKey||g.metaKey||g.altKey||_("LI")){E=null;return}g.preventDefault(),E&&document.contains(E.br)?(E.ancora.remove(),E.br.remove(),document.execCommand("insertParagraph"),E=null):E=A()}),u.addEventListener("mousedown",()=>{E=null}),u.addEventListener("keydown",g=>{g.key!=="Tab"||!_("LI")||(g.preventDefault(),D(),document.execCommand(g.shiftKey?"outdent":"indent"),h())});function I(){var g;u.classList.toggle("is-empty",!((g=u.textContent)!=null&&g.trim()))}u.addEventListener("input",()=>{if(u.childNodes.length===0){u.innerHTML="<p><br></p>";const g=u.firstChild,v=document.createRange();v.setStart(g,0),v.collapse(!0);const y=window.getSelection();y==null||y.removeAllRanges(),y==null||y.addRange(v)}I()}),I(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(g=>{g.addEventListener("mousedown",v=>v.preventDefault()),g.addEventListener("click",()=>{D();const v=g.dataset.cmd;if(v==="strikeThrough")document.execCommand("strikeThrough");else if(v==="createLink"){const y=window.getSelection();if(!y||y.isCollapsed){u.focus();return}const T=prompt("URL do link:","https://");T&&T.trim()&&document.execCommand("createLink",!1,T.trim())}else v==="removeFormat"?document.execCommand("removeFormat"):document.execCommand(v);v==="insertUnorderedList"&&(h(),S()),u.focus(),U()})}),e.querySelectorAll(".color-picker__swatch").forEach(g=>{g.addEventListener("mousedown",v=>v.preventDefault()),g.addEventListener("click",()=>{D();const v=g.dataset.cor,y=window.getSelection();if(!y||y.rangeCount===0||y.isCollapsed)return;const T=y.getRangeAt(0);if(!u.contains(T.commonAncestorContainer))return;const M=T.extractContents();it(M);const N=document.createElement("span");N.className=`text-color text-color--${v}`,N.appendChild(M),T.insertNode(N),y.removeAllRanges();const H=document.createRange();H.selectNodeContents(N),y.addRange(H),u.focus()})});const R=e.querySelector("[data-cor-limpar]");R.addEventListener("mousedown",g=>g.preventDefault()),R.addEventListener("click",()=>{D();const g=window.getSelection();if(!g||g.rangeCount===0)return;const v=g.getRangeAt(0);if(u.contains(v.commonAncestorContainer)){if(v.collapsed){let y=v.commonAncestorContainer;for(;y&&y!==u;){if(y instanceof HTMLElement&&y.classList.contains("text-color")){const T=y.parentNode;if(T){const M=document.createDocumentFragment();Array.from(y.childNodes).forEach(N=>M.appendChild(N)),T.replaceChild(M,y),it(T)}break}y=y.parentNode}}else{const y=v.extractContents();it(y),v.insertNode(y)}u.focus()}});const B=e.querySelector("#input-pode-desatualizar"),q=e.querySelector("#wrapper-validade");B.addEventListener("change",()=>{q.style.display=B.checked?"flex":"none"});function U(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(v=>{const y=v.dataset.cmd;try{y==="bold"||y==="italic"||y==="underline"||y==="strikeThrough"||y==="insertUnorderedList"?v.setAttribute("aria-pressed",document.queryCommandState(y)?"true":"false"):v.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===u&&U()}),u.addEventListener("keyup",U),u.addEventListener("mouseup",U),u.addEventListener("focus",U),u.addEventListener("keydown",g=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?g.metaKey:g.ctrlKey))return;let T=!0;switch(g.key.toLowerCase()){case"b":g.preventDefault(),document.execCommand("bold");break;case"i":g.preventDefault(),document.execCommand("italic");break;case"u":g.preventDefault(),document.execCommand("underline");break;case"s":g.preventDefault(),document.execCommand("strikeThrough");break;case"k":g.preventDefault(),D();const M=window.getSelection();if(M&&!M.isCollapsed){const N=prompt("URL do link:","https://");N&&N.trim()&&document.execCommand("createLink",!1,N.trim())}break;case"z":g.preventDefault(),g.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":g.preventDefault(),document.execCommand("redo");break;default:T=!1}T&&U()}),(oe=e.querySelector("#btn-salvar"))==null||oe.addEventListener("click",async()=>{const g=p.value.trim(),v=Xs(u).trim();let y=null;const T=(H,se)=>{var Ce;H.classList.add("input--error"),H.setAttribute("aria-invalid","true");const ve=(Ce=H.closest(".field"))==null?void 0:Ce.querySelector(".field__error");ve&&(ve.textContent=se,ve.style.display="block"),y||(y=H)},M=H=>{H.classList.remove("input--error"),H.removeAttribute("aria-invalid")};if(g||T(p,"Informe um título para a nota."),v||T(u,"Informe o conteúdo da nota."),y){y.focus();return}M(p),M(u);const N={titulo:g,conteudo:v,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:B.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await vs(a,N):await fs(t.notaId,N),ga(),z(d)}),t.mode==="editar"&&i){(b=e.querySelector("#btn-favoritar-nota"))==null||b.addEventListener("click",async()=>{await gs(i.id),Ue(e,t)}),(C=e.querySelector("#btn-parar-revisar"))==null||C.addEventListener("click",async()=>{await Ws(i.id),Ue(e,t)});const g=e.querySelector("#btn-compartilhar-nota");g==null||g.addEventListener("click",async()=>{const v=Ni(i);if(navigator.share){try{await navigator.share({title:i.titulo||"Nota",text:v})}catch{}return}const y=g.textContent;try{await navigator.clipboard.writeText(v),g.textContent="Copiado!"}catch{g.textContent="Não foi possível copiar"}setTimeout(()=>{g.textContent=y},1800)}),(L=e.querySelector("#btn-excluir-nota"))==null||L.addEventListener("click",async()=>{await ae({title:"Excluir esta nota?",message:"A nota vai pra Lixeira e dá pra restaurar em Configurações → Lixeira por até 30 dias."})&&(await bs(i.id),z(d))})}}async function Hi(e){return(await(await k()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function Bi(e){return e.length===10?e:Z(new Date(e))}function Vi(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function Ui(e){const t=new Set;for(const a of e)a&&t.add(Bi(a));return t}function mo(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function nt(e){return e.size}function Gi(e,t,a=365,o=Z()){const s=Y(o,-a+1),i=[];let n=s;for(;n<=o;)i.push({date:n,count:(e.has(n)?1:0)+(t.has(n)?1:0),hasRevisao:e.has(n),hasCriacao:t.has(n)}),n=Y(n,1);const c=nt(e),r=nt(t),l=nt(mo(e,t));return{days:i,totalDiasRevisao:c,totalDiasCriacao:r,totalDiasAtividade:l}}async function po(e){const t=await k(),a=Z(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const A=await t.getAllFromIndex("espacos","perfil_id",e),E=(await Promise.all(A.map(R=>t.getAllFromIndex("temas","espaco_id",R.id)))).flat();return(await Promise.all(E.map(R=>t.getAllFromIndex("notas","tema_id",R.id)))).flat()})()]),i=o.filter(A=>A.data_concluida).map(A=>A.data_concluida),n=Vi(i),c=Ui(s.map(A=>A.criado_em)),r=o.filter(A=>A.data_concluida===a).length,l=s.filter(A=>Z(new Date(A.criado_em))===a).length,d=a.slice(0,4),u=a.slice(5,7),p=`${d}-${u}`,f=i.filter(A=>A.startsWith(p)).length,$=s.filter(A=>Z(new Date(A.criado_em)).startsWith(p)).length,_=n.size,S=c.size,h=mo(n,c).size;return{datasRevisaoSet:n,datasCriacaoSet:c,totalDiasRevisao:_,totalDiasCriacao:S,totalDiasAtividade:h,notasCriadasHoje:l,revisoesFeitasHoje:r,notasCriadasEsteMes:$,revisoesFeitasEsteMes:f}}async function Ki(e,t=365){const a=await po(e);return Gi(a.datasRevisaoSet,a.datasCriacaoSet,t)}function Wi(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function Zi(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const i=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let r=0;r<i;r++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const r of e)s.push(r),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(r=>`
          <div class="heatmap__col">
            ${r.map(l=>`
              <div class="heatmap__cell heatmap__cell--${Wi(l.count)}${l.date?"":" heatmap__cell--empty"}" title="${l.date?`${l.date}${l.count?` · ${l.count} atividade(s)`:""}${l.hasRevisao&&l.hasCriacao?" (revisão + criação)":l.hasRevisao?" (revisão)":l.hasCriacao?" (criação)":""}`:""}"></div>
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
  `}const Ji={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function Xi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Qi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Yi(e,t){const a=await wi(t.perfilId),o=await po(t.perfilId),s=await Ki(t.perfilId,365),i=await Si(t.perfilId),n=["dom","seg","ter","qua","qui","sex","sáb"],c=new Date().getDay(),r=Math.max(1,...a.cargaProximos7.map(p=>p.count)),l=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null,d=i.total>0?{facil:Math.round(i.facil/i.total*100),medio:Math.round(i.medio/i.total*100),dificil:Math.round(i.dificil/i.total*100)}:null;e.innerHTML=`
    <div class="tabs" role="tablist" aria-label="Painel">
      <button class="tabs__tab" role="tab" aria-selected="true" data-tab="visao">Visão geral</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="revisao">Revisão</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="avaliacoes">Avaliações</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="evolucao">Evolução</button>
    </div>

    <div id="tab-visao" role="tabpanel">
      <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os números gerais: quantas revisões fez, quanto tempo passou e o tamanho da sua coleção.</p>

      <div class="streak-hero">
        <div class="streak-hero__flame" aria-hidden="true">${x.flame}</div>
        <div class="streak-hero__count">${a.streakDias}</div>
        <div class="streak-hero__label">${a.streakDias===1?"dia seguido estudando":"dias seguidos estudando"}</div>
        <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${a.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
          ${a.diasAtivosUltimos7.map((p,f)=>{const $=(c-(6-f)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${p?"streak-hero__day--ativo":""}"></span>
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
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${Mt(a.tempoHojeSegundos)}</div>
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
        ${a.porEstagio.map(p=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${p.count}</div>
            <div class="stage-tile__label">${Ji[p.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${x.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(p=>`${p.count} em ${Qi(p.data)}`).join(", ")}">
        ${a.cargaProximos7.map(p=>{const f=Xi(p.data);return`
            <div class="load-chart__col">
              <div class="load-chart__val">${p.count}</div>
              <div class="load-chart__bar">
                <div class="load-chart__fill" style="height: ${p.count/r*100}%"></div>
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
          ${a.rankingDificeis.map((p,f)=>`
            <div class="rank-row">
              <span>${f+1}. ${m(p.temaNome)}</span>
              <span class="badge badge--danger">${p.count}× difícil</span>
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
            <div class="stat-tile__value">${d.facil}%</div>
            <div class="stat-tile__label">Fácil</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${d.dificil}%</div>
            <div class="stat-tile__label">Difícil</div>
          </div>
        </div>

        <div class="retention-bar" role="img" aria-label="Fácil ${d.facil}%, Médio ${d.medio}%, Difícil ${d.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${d.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${d.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${d.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${d.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${d.medio}%</span>
          <span class="badge badge--success">Fácil ${d.facil}%</span>
          ${i.ultimaEm?`<span class="text-muted" style="font-size: var(--font-size-xs);">última: ${m(ue(i.ultimaEm))}</span>`:""}
        </div>

        <div class="section-header">
          <span class="section-header__title" style="font-size: var(--font-size-base);">Sessões recentes</span>
        </div>
        <div class="rank-list">
          ${i.sessoes.map(p=>`
            <div class="rank-row">
              <span>${m(p.contexto)} <span class="text-muted">· ${p.total} nota(s) · ${m(ue(p.criado_em))}</span></span>
              <span style="display:flex; gap: var(--space-2); flex-wrap:wrap; justify-content:flex-end;">
                ${p.facil>0?`<span class="badge badge--success">${p.facil} fácil</span>`:""}
                ${p.medio>0?`<span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">${p.medio} médio</span>`:""}
                ${p.dificil>0?`<span class="badge badge--danger">${p.dificil} difícil</span>`:""}
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
      ${Zi(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `;const u=["visao","revisao","avaliacoes","evolucao"];e.querySelectorAll(".tabs__tab").forEach(p=>{p.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(f=>{f.setAttribute("aria-selected",String(f===p))});for(const f of u){const $=e.querySelector(`#tab-${f}`);$&&($.style.display=p.dataset.tab===f?"block":"none")}})})}async function en(e){const t=await k(),a=(await t.getAllFromIndex("espacos","perfil_id",e)).filter(l=>!l.excluido),o=await Promise.all(a.map(l=>t.getAllFromIndex("temas","espaco_id",l.id))),s=[],i=[],n=new Map;for(let l=0;l<a.length;l++){const d=a[l],u=o[l].filter(p=>!p.excluido);for(const p of u)n.set(p.id,d),p.favorito&&s.push({tema:p,espaco:d})}const c=o.flat().filter(l=>!l.excluido),r=await Promise.all(c.map(l=>t.getAllFromIndex("notas","tema_id",l.id)));for(let l=0;l<c.length;l++){const d=c[l],u=r[l].filter(f=>!f.excluido),p=n.get(d.id);if(p)for(const f of u)f.favorito&&i.push({nota:f,tema:d,espaco:p})}return{temas:me(s,l=>l.tema.nome),notas:me(i,l=>l.nota.titulo||l.tema.nome)}}async function tn(e,t){var l;const{temas:a,notas:o}=await en(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(l=e.querySelector("#btn-empty-espacos"))==null||l.addEventListener("click",()=>z("espacos"));return}const s=new Map;for(const d of a){const u=s.get(d.espaco.id)??{espaco:d.espaco,itens:[]};u.itens.push(d),s.set(d.espaco.id,u)}const i=new Map;for(const d of o){const u=i.get(d.tema.id)??{temaNome:V(d.tema.nome),espaco:d.espaco,itens:[]};u.itens.push(d),i.set(d.tema.id,u)}const n=new Map;for(const d of a)n.set(d.espaco.id,d.espaco);for(const d of o)n.set(d.espaco.id,d.espaco);const c=Ha([...n.values()]),r=d=>{const u=c.get(d.id)??K(d.id),p=ce($e(d));return`<span class="espaco-icon-inline" style="--badge-accent:${u}" aria-hidden="true">${p.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(d=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(d.espaco.id)??K(d.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(d.espaco)}${m(d.espaco.nome)}
          </div>
          <div class="item-list">
            ${d.itens.map(u=>`
              <button class="item-row" data-tema="${m(u.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(d.espaco.id)??K(d.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${m(V(u.tema.nome))}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}

    ${o.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${a.length>0?"var(--space-6)":"0"};">Notas favoritas</div>
      ${Array.from(i.values()).map(d=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(d.espaco.id)??K(d.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(d.espaco)}${m(d.temaNome)} <span class="queue-group__espaco"> · ${m(d.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${d.itens.map(u=>`
              <button class="item-row" data-nota="${m(u.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(d.espaco.id)??K(d.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${m(u.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${m(u.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(d=>{d.addEventListener("click",()=>z(`temas/${d.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(d=>{d.addEventListener("click",()=>z(`notas/${d.dataset.nota}`))})}const an=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,on=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (categoria: Capítulos)
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência (categoria: Capítulos)
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,sn=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,nn=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      distribuição entre Fácil/Médio/Difícil e o histórico de sessões recentes.</p>`}];function rn(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${an}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${on}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${sn}</pre>
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

      ${nn.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function cn(e){return e.replace(/-/g,"")}function ln(e,t){const[a,o]=t.split(":");return`${cn(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function dn(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function un(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function mn(e){const t=ln(te(),e),a=dn(new Date),o=un("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${ne()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function pn(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const vn="https://api.github.com",fn="Memoriza — sincronização de anotações",Te="memoriza-sync.json";function Kt(e){return(t,a={})=>fetch(`${vn}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function gn(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&Te in s.files))==null?void 0:o.id)??null}async function bn(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:fn,public:!1,files:{[Te]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function hn(e,t){var s,i;const a=await e(`/gists/${t}`);return a.ok?((i=(s=(await a.json()).files)==null?void 0:s[Te])==null?void 0:i.content)??null:null}async function vo(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[Te]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function fo(e){const t=Kt(e);let a=Ge();if(!a){const n=await gn(t);n&&(a=n,ut(n))}let o=null,s=!1,i=await ke();if(a){const n=await hn(t,a);if(n)try{const c=We(n);o=await Ze(c),i=await ke(),s=!0}catch{}}return a?await vo(t,a,JSON.stringify(i)):(a=await bn(t,JSON.stringify(i)),ut(a)),qt(F()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??go(),push:!0,mesclouRemoto:s}}async function yn(e,t=30){const a=Ge();if(!a)throw new Error("Nenhum backup sincronizado ainda.");const s=await Kt(e)(`/gists/${a}`);if(!s.ok)throw new Error("Não foi possível ler o histórico do backup. Confira o token.");return((await s.json()).history??[]).slice(0,t).map(n=>({version:n.version,committed_at:n.committed_at}))}async function _n(e,t,a,o){var c;const s=await e(`/gists/${a}/${o}`);if(!s.ok)return null;const n=(c=(await s.json()).files)==null?void 0:c[Te];if(!n)return null;if(n.truncated&&n.raw_url){const r=await fetch(n.raw_url,{headers:{Authorization:`Bearer ${t}`}});return r.ok?r.text():null}return n.content??null}async function wn(e,t){const a=Kt(e),o=Ge();if(!o)throw new Error("Nenhum backup sincronizado ainda.");const s=await _n(a,e,o,t);if(!s)throw new Error("Não foi possível ler essa versão do backup.");const i=await Ze(We(s)),n=await ke();return await vo(a,o,JSON.stringify(n)),qt(F()),{...i,porLoja:i.porLoja??go(),push:!0,mesclouRemoto:!0}}function go(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function $n(e){const t=Lt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}let je=null;function xn(e){je=e}const En=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],Sn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}],kn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function An(e){const t=[`${kn[e.tipo]} em ${e.contexto}`];return e.temas&&t.push(`${e.temas} tema(s)`),e.notas&&t.push(`${e.notas} nota(s)`),e.excluido_em&&t.push(`excluído em ${ue(e.excluido_em)}`),t.join(" · ")}function Ln(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function qn(e){const t=`${ue(e.criado_em)} · ${Ln(e.bytes)}`;return`${e.automatico?"Automático":"Manual"} · ${t}`}function Tn(e){return ue(e.committed_at)}async function ee(e,t){var A,D,E,I,R,B,q,U,Q,W,G,oe;const a=Do(),o=So(),s=await It(),i=qo(t.perfil.id),n=At(),c=$a(),r=Lt(),l=Ge(),d=Tt(),u=await Ma(t.perfil.id),p=await Pa();e.innerHTML=`
    <div class="stack content-narrow content-wide">
      <section class="settings-section">
        <div class="settings-section__title">${x.user} Perfil</div>
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
        <div class="settings-section__title">${x.users} Gerenciar perfis</div>
        <div class="card stack">
          <div>
            ${s.map(b=>`
              <div class="settings-list-row" data-perfil-id="${m(b.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${m(b.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${m(b.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${m(b.id)}" data-nome="${m(b.nome)}" class="danger" type="button">Excluir perfil</button>
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
              ${En.map(b=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-theme="${b.value}"
                  aria-pressed="${b.value===a}"
                >${b.label}</button>
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
              ${Sn.map(b=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${b.value}"
                  aria-pressed="${b.value===d}"
                >${b.label}</button>
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
        <div class="settings-section__title">${x.clock} Snapshots locais</div>
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
          ${p.length===0?'<p class="text-muted" style="margin:0;">Nenhum snapshot ainda.</p>':`<div>
                  ${p.map(b=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(qn(b))}</div>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-snapshot-restaurar="${m(b.id)}" type="button">Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-snapshot-remover="${m(b.id)}" type="button">Apagar</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section" id="section-lixeira">
        <div class="settings-section__title">${x.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${Ca} dias o item é
            removido de vez, sozinho. Se já existir algo com o mesmo nome, ao restaurar ele
            ganha "(restaurado)" no nome, pra não duplicar.
          </p>
          ${u.length===0?'<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>':`<div>
                  ${u.map(b=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(b.nome)}</div>
                        <p class="settings-row__desc">${m(An(b))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${m(b.id)}" data-tipo="${b.tipo}" data-nome="${m(b.nome)}" type="button">${x.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${m(b.id)}" data-tipo="${b.tipo}" data-nome="${m(b.nome)}" type="button">Excluir de vez</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section" id="section-sync">
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
              ${x.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${r?`<div class="banner banner--success" style="margin-bottom:0;">${x.check} Última sincronização: ${m(ue(r))}${l?".":""}</div>`:n?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
          </div>

          <details id="gist-historico">
            <summary class="settings-row__label" style="cursor:pointer;">Histórico do backup na nuvem</summary>
            <div class="stack" style="margin-top: var(--space-3);">
              <p class="settings-row__desc" style="margin:0;">
                O GitHub guarda todas as versões já gravadas no Gist. Dá pra trazer uma antiga
                de volta — a restauração <b>mescla</b> com o que já existe local.
              </p>
              <div>
                <button class="btn btn--secondary btn--sm" id="btn-gist-revisoes" type="button">${x.sync} Carregar histórico</button>
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
        <div class="settings-section__title">${x.clock} Lembretes</div>
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

  `,(A=e.querySelector("#btn-switch-profile"))==null||A.addEventListener("click",()=>{t.onSwitchProfile()}),(D=e.querySelector("#btn-como-usar"))==null||D.addEventListener("click",()=>z("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(b=>{b.addEventListener("click",()=>{const C=b.dataset.theme;Io(C),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(L=>{L.setAttribute("aria-pressed",String(L===b))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(b=>{b.addEventListener("click",()=>{Mo(b.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(C=>{C.setAttribute("aria-pressed",String(C===b))})})}),(E=e.querySelector("#btn-export-profile"))==null||E.addEventListener("click",async()=>{const b=await xs(t.perfil.id);sa(b),Jt(b.exportado_em),ee(e,t)}),(I=e.querySelector("#btn-export-all"))==null||I.addEventListener("click",async()=>{const b=await ke();sa(b),Jt(b.exportado_em),ee(e,t)});const f=e.querySelector("#import-file");(R=e.querySelector("#btn-import"))==null||R.addEventListener("click",()=>{f==null||f.click()}),f==null||f.addEventListener("change",async()=>{const b=e.querySelector("#import-summary"),[C]=f.files??[];if(!(!C||!b))try{const L=await C.text(),g=We(L);await ht({titulo:"Antes de importar"});const v=await Ze(g);b.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${v.criados} criados, ${v.atualizados} atualizados,
          ${v.mantidos} mantidos como estavam.
        </div>
      `}catch(L){b.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${m(L instanceof Error?L.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{f.value=""}});const $=e.querySelector("#form-novo-perfil");(B=e.querySelector("#btn-novo-perfil"))==null||B.addEventListener("click",()=>{var b;$.style.display="block",(b=e.querySelector("#input-novo-perfil"))==null||b.focus()}),(q=e.querySelector("#btn-cancelar-perfil"))==null||q.addEventListener("click",()=>{$.style.display="none"}),(U=e.querySelector("#btn-salvar-perfil"))==null||U.addEventListener("click",async()=>{const C=e.querySelector("#input-novo-perfil").value.trim();C&&(await ka(C),ee(e,t))}),e.querySelectorAll("[data-renomear]").forEach(b=>{b.onclick=()=>{var M;const C=b.dataset.renomear,L=e.querySelector(`[data-perfil-id="${C}"]`),g=L==null?void 0:L.querySelector("[data-view-nome]");if(!L||!g)return;const v=((M=g.textContent)==null?void 0:M.trim())??"";g.innerHTML=`
        <input class="input" type="text" value="${m(v)}" maxlength="60" style="max-width:200px;" />
      `;const y=g.querySelector("input");y.focus(),y.select(),b.textContent="Salvar";const T=async()=>{const N=y.value.trim();N&&(await as(C,N),C===t.perfil.id&&(t.perfil={...t.perfil,nome:N})),ee(e,t)};y.addEventListener("keydown",N=>{N.key==="Enter"&&T()}),b.onclick=T}}),e.querySelectorAll("[data-excluir-perfil]").forEach(b=>{b.addEventListener("click",async()=>{const C=b.dataset.excluirPerfil,L=b.dataset.nome??"",g=await os(C);await ae({title:`Excluir o perfil "${L}"?`,message:`Isso vai apagar ${g.espacos} espaço(s), ${g.temas} tema(s) e ${g.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await ss(C),C===t.perfil.id?t.onSwitchProfile():ee(e,t))})}),(Q=e.querySelector("#btn-baixar-lembrete"))==null||Q.addEventListener("click",()=>{const b=e.querySelector("#input-hora-lembrete").value||"19:00";To(t.perfil.id,b),pn(mn(b))});const _=e.querySelector("#sync-status"),S=e.querySelector("#btn-sync-now");S==null||S.addEventListener("click",async()=>{const C=e.querySelector("#input-github-token").value.trim();if(!C){_&&(_.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Xt(C),S.disabled=!0,_&&(_.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Sincronizando…</div>`);try{const L=await fo(C);if(_){const g=[L.criados>0?`${L.criados} novo(s)`:null,L.atualizados>0?`${L.atualizados} atualizado(s)`:null].filter(Boolean);_.innerHTML=`
          <div class="banner banner--success" role="status">
            ${x.check} Sincronizado!${g.length>0?` ${g.join(", ")} baixado(s).`:""}
            ${L.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}ee(e,t)}catch(L){S.disabled=!1,_&&(_.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${m(L instanceof Error?L.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(W=e.querySelector("#btn-limpar-token"))==null||W.addEventListener("click",async()=>{await ae({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Xt(""),ut(""),qt(""),ee(e,t))}),(G=e.querySelector("#sync-auto"))==null||G.addEventListener("change",b=>{Co(b.target.checked)}),e.querySelectorAll("[data-restaurar]").forEach(b=>{b.addEventListener("click",async()=>{const C=b.dataset.tipo,L=b.dataset.restaurar,g=await ds(C,L);let v;if(g.conflito){if(!await ae({title:`Já existe "${b.dataset.nome??""}" aqui`,message:`Pra não duplicar, o item será restaurado como "${g.nomeSugerido}". Continuar?`}))return;v=g.nomeSugerido}b.disabled=!0,await us(C,L,v!==void 0?{nome:v}:void 0),ee(e,t)})}),e.querySelectorAll("[data-expurgar]").forEach(b=>{b.addEventListener("click",async()=>{const C=b.dataset.nome??"";await ae({title:`Excluir "${C}" de vez?`,message:"O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia."})&&(b.disabled=!0,await De(b.dataset.tipo,b.dataset.expurgar),ee(e,t))})}),(oe=e.querySelector("#btn-snapshot-criar"))==null||oe.addEventListener("click",async()=>{const b=e.querySelector("#btn-snapshot-criar");b.disabled=!0,await ht({}),ee(e,t);const C=e.querySelector("#snapshot-status");C&&(C.innerHTML=`<div class="banner banner--success" role="status">${x.check} Snapshot criado.</div>`)}),e.querySelectorAll("[data-snapshot-restaurar]").forEach(b=>{b.addEventListener("click",async()=>{if(!await ae({title:"Restaurar este snapshot?",message:"Os dados do snapshot serão mesclados com os atuais. Nada local é apagado."}))return;b.disabled=!0,await Is(b.dataset.snapshotRestaurar);const L=e.querySelector("#snapshot-status");L&&(L.innerHTML=`<div class="banner banner--success" role="status">${x.check} Snapshot restaurado (mesclado).</div>`)})}),e.querySelectorAll("[data-snapshot-remover]").forEach(b=>{b.addEventListener("click",async()=>{await Ms(b.dataset.snapshotRemover),ee(e,t)})});const h=e.querySelector("#btn-gist-revisoes");if(h==null||h.addEventListener("click",async()=>{const b=e.querySelector("#gist-revisoes"),L=e.querySelector("#input-github-token").value.trim()||n;if(!(!L||!b)){h.disabled=!0,b.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Carregando…</div>`;try{const g=await yn(L);if(g.length===0){b.innerHTML='<div class="banner banner--muted" role="status">Ainda não há versões anteriores.</div>';return}b.innerHTML=`
        <div>
          ${g.map(v=>`
            <div class="settings-list-row">
              <div class="settings-row__label">${m(Tn(v))}</div>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-gist-restaurar="${m(v.version)}" type="button">Restaurar</button>
              </div>
            </div>
          `).join("")}
        </div>
      `,Cn(e,L,b)}catch(g){b.innerHTML=`<div class="banner banner--warning" role="alert">${m(g instanceof Error?g.message:"Não foi possível carregar o histórico.")}</div>`}finally{h.disabled=!1}}}),je){const b=e.querySelector(`#${je}`);je=null,b&&requestAnimationFrame(()=>b.scrollIntoView({behavior:"smooth",block:"start"}))}}function Cn(e,t,a){e.querySelectorAll("[data-gist-restaurar]").forEach(o=>{o.addEventListener("click",async()=>{if(await ae({title:"Restaurar esta versão do backup?",message:"A versão escolhida será mesclada com os dados atuais e o backup na nuvem será atualizado. Nada local é apagado."})){o.disabled=!0,a.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Restaurando…</div>`;try{const i=await wn(t,o.dataset.gistRestaurar);a.innerHTML=`<div class="banner banner--success" role="status">${x.check} Backup restaurado: ${i.criados} criado(s), ${i.atualizados} atualizado(s).</div>`}catch(i){a.innerHTML=`<div class="banner banner--warning" role="alert">${m(i instanceof Error?i.message:"Não foi possível restaurar.")}</div>`}}})})}const Mn=7,In=7,Dn=30;function ba(e){return e<=0?"hoje":e===1?"ontem":`há ${e} dias`}function Nn(e){const t=e.avisarSyncDias??Mn,a=e.avisarSnapshotDias??In,o=e.retencaoDias??Dn;let s;e.syncConfigurado?e.diasDesdeSync===null?s={estado:"atencao",visivel:!0,titulo:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."}:e.diasDesdeSync<=t?s={estado:"ok",visivel:!0,titulo:`Sincronizado com o GitHub ${ba(e.diasDesdeSync)}. Toque pra abrir a sincronização.`}:s={estado:"atencao",visivel:!0,titulo:`Faz ${e.diasDesdeSync} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}:s={estado:"off",visivel:!0,titulo:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};let i;e.diasDesdeSnapshot===null?i={estado:"atencao",visivel:!0,titulo:"Nenhum snapshot local ainda. Toque pra criar uma cópia de segurança."}:e.diasDesdeSnapshot<=a?i={estado:"ok",visivel:!0,titulo:`Backup local em dia (snapshot ${ba(e.diasDesdeSnapshot)}). Toque pra ver os snapshots.`}:i={estado:"atencao",visivel:!0,titulo:`Faz ${e.diasDesdeSnapshot} dias desde o último snapshot local. Toque pra criar um novo.`};const n=e.lixeiraContagem<=0?{estado:"off",visivel:!0,contagem:0,titulo:"Lixeira vazia. Toque pra abrir."}:{estado:"atencao",visivel:!0,contagem:e.lixeiraContagem,titulo:`${e.lixeiraContagem} item(ns) na Lixeira. Eles somem em até ${o} dias — toque pra recuperar ou excluir de vez.`};return{sync:s,backup:i,lixeira:n}}let rt=null;async function ha(){if(!(!("wakeLock"in navigator)||document.hidden))try{rt=await navigator.wakeLock.request("screen"),rt.addEventListener("release",()=>{rt=null})}catch{}}function Pn(){ha(),document.addEventListener("visibilitychange",()=>{document.hidden||ha()})}const bo="v1.15",zn="Memoriza",ho=`${zn} ${bo}`,Ie=24;function St(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function ct(e,t){const a=St(t);return e.some(o=>St(o).includes(a))}function jn(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),i=t.toLowerCase();let n=s.indexOf(i);n===-1&&(n=0);const c=Math.max(0,n-a),r=Math.min(o.length,n+i.length+a);return(c>0?"…":"")+o.slice(c,r)+(r<o.length?"…":"")}async function Rn(e,t){const a=t.trim();if(!a)return[];const o=St(a);if(!o)return[];const s=await k(),i=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(i.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),r=new Map(i.map(f=>[f.id,f])),d=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),u=[];for(const f of i)if(ct([f.nome,f.categoria],o)&&(u.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),u.length>=Ie))return u;const p=new Map(c.map(f=>[f.id,f]));for(const f of c)if(ct([f.nome,f.categoria],o)){const $=r.get(f.espaco_id);if(u.push({kind:"tema",id:f.id,titulo:V(f.nome),meta:`Tema${$?` · ${$.nome}`:""}`}),u.length>=Ie)return u}for(const f of d){if(!ct([f.titulo,f.fonte,f.conteudo],o))continue;const $=p.get(f.tema_id),_=$&&r.get($.espaco_id),S=[..._?[_.nome]:[],...$?[V($.nome)]:[]].join(" · ");if(u.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:S?`Nota · ${S}`:"Nota",snippet:f.conteudo?jn(f.conteudo,o):void 0}),u.length>=Ie)return u}return u.sort((f,$)=>{const _=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,S=`${$.titulo.toLowerCase()} ${$.meta.toLowerCase()}`;return rs(_,S)}),u.slice(0,Ie)}const Fn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function ya(e,t){const a=m(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const i=m(e.slice(0,s)),n=m(e.slice(s,s+o.length)),c=m(e.slice(s+o.length));return`${i}<mark>${n}</mark>${c}`}async function yo(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],i=-1,n,c=!1;function r(){c||(c=!0,t.remove(),document.removeEventListener("keydown",p))}function l($){s.length!==0&&(i=(i+$+s.length)%s.length,s.forEach((_,S)=>{const h=S===i;_.el.classList.toggle("is-active",h),_.el.setAttribute("aria-selected",String(h)),h&&_.el.scrollIntoView({block:"nearest"})}))}function d($){const _=s.find(h=>h.el===$);if(!_)return;r();const S=_.resultado;S.kind==="espaco"?z(`espacos/${S.id}`):S.kind==="tema"?z(`temas/${S.id}`):z(`notas/${S.id}`)}function u($){Rn(e,$).then(_=>{if(!c){if(i=-1,s=[],_.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${m($.trim())}".</p>`;return}o.innerHTML="";for(const S of _){const h=document.createElement("button");h.type="button",h.className=`search-result search-result--${S.kind}`,h.setAttribute("role","option"),h.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${S.kind==="espaco"?x.folder:S.kind==="tema"?x.bookOpen:x.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${ya(S.titulo,$)}</span>
            <span class="search-result__meta">${m(Fn[S.kind])} · ${m(S.meta)}</span>
            ${S.snippet?`<span class="search-result__snippet">${ya(S.snippet,$)}</span>`:""}
          </span>
        `,h.addEventListener("click",()=>d(h)),o.appendChild(h),s.push({el:h,resultado:S})}}})}function p($){$.key==="Escape"&&($.preventDefault(),r())}a.addEventListener("input",()=>{n&&clearTimeout(n),n=setTimeout(()=>u(a.value),120)}),a.addEventListener("keydown",$=>{$.key==="ArrowDown"?($.preventDefault(),l(1)):$.key==="ArrowUp"?($.preventDefault(),l(-1)):$.key==="Enter"&&i>=0?($.preventDefault(),d(s[i].el)):$.key==="Escape"&&($.preventDefault(),r())}),t.addEventListener("mousedown",$=>{$.target===t&&r()}),document.addEventListener("keydown",p),a.focus(),u("")}const On=30,Hn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],Bn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function Vn(e){Os(()=>kt(e)),await kt(e),Kn(),Pn(),Un(),Gn()}function Un(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=_a();t&&yo(t)}})}async function Gn(){const e=At();if(!(!e||!$a())&&$n(On))try{await fo(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function Kn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function kt(e){var r,l;const t=_a(),a=t?await ts(t):void 0;if(!a){dt(null),e.innerHTML='<div id="profile-screen"></div>';const d=e.querySelector("#profile-screen");await Bs(d,async u=>{dt(u.id),z("hoje"),await kt(e)});return}const o=ia(),s=Rs(o),i=await Zn(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${Hn.map(d=>`
          <button
            class="app-nav__item"
            data-route="${d.route}"
            ${d.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${Hs[d.route]}</span>
            <span>${d.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${Bn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${x.search}</button>
            ${i.sync.visivel?lt("section-sync",x.cloud,i.sync):""}
            ${i.backup.visivel?lt("section-snapshots",x.database,i.backup):""}
            ${i.lixeira.visivel?lt("section-lixeira",x.trash,i.lixeira,i.lixeira.contagem):""}
            <span class="app-header__date" title="Data de hoje">${m(Xo(Z()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${x.help}</button>
            <span class="app-header__profile" title="Memoriza ${bo}">${m(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${m(ho)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(d=>{d.addEventListener("click",()=>{Ee()&&Fs(d.dataset.route)})}),(r=e.querySelector("#btn-ajuda"))==null||r.addEventListener("click",()=>{Ee()&&(location.hash==="#/ajuda"?history.back():z("ajuda"))}),(l=e.querySelector("#btn-busca"))==null||l.addEventListener("click",()=>{Ee()&&yo(a.id)}),e.querySelectorAll("[data-settings-secao]").forEach(d=>{d.addEventListener("click",()=>{var p;if(!Ee())return;const u=d.dataset.settingsSecao;ia().name==="config"?(p=document.querySelector(`#${u}`))==null||p.scrollIntoView({behavior:"smooth",block:"start"}):(xn(u),z("config"))})});const n=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",n.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await Wn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(d){console.error("Erro ao renderizar tela:",d),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function Wn(e,t,a){switch(t.name){case"hoje":await ca(e,{perfilId:a.id});break;case"espacos":await Ne(e,{perfilId:a.id});break;case"espaco":await Pe(e,t.id);break;case"espaco-pdf":await zi(e,t.id,t.categoria);break;case"painel":await Yi(e,{perfilId:a.id});break;case"favoritos":await tn(e,{perfilId:a.id});break;case"ajuda":rn(e);break;case"tema":await ze(e,t.id);break;case"nota-nova":await Ue(e,{mode:"nova",temaId:t.temaId});break;case"nota":await Ue(e,{mode:"editar",notaId:t.id});break;case"config":await ee(e,{perfil:a,onSwitchProfile:()=>{dt(null),z("perfil")}});break;default:await ca(e,{perfilId:a.id})}}async function Zn(e){if(!await Jn(e.id))return{sync:{estado:"off",visivel:!1,titulo:""},backup:{estado:"ok",visivel:!1,titulo:""},lixeira:{estado:"ok",visivel:!1,titulo:"Lixeira vazia."}};const t=At(),a=Lt(),o=Z(),s=a?we(Z(new Date(a)),o):null,n=(await Pa())[0],c=n?we(Z(new Date(n.criado_em)),o):null,r=await Ma(e.id);return Nn({syncConfigurado:!!t,diasDesdeSync:s,diasDesdeSnapshot:c,lixeiraContagem:r.length})}function lt(e,t,a,o){const s=m(a.titulo);return`<button class="app-header__status is-${a.estado}" data-settings-secao="${e}" type="button" title="${s}" aria-label="${s}">${t}${o?`<span class="app-header__status__badge">${o}</span>`:""}</button>`}async function Jn(e){const t=await k();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${ho}%c rodando`,"font-weight:bold;","");xa();xo({immediate:!0});async function Xn(){Fi(),await es(),await Da(),await ms(),await Ns().catch(()=>{}),await No();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await Vn(e)}Xn();
