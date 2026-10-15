(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const eo="modulepreload",to=function(e){return"/"+e},zt={},ao=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(a.map(r=>{if(r=to(r),r in zt)return;zt[r]=!0;const l=r.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${u}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":eo,l||(d.as="script"),d.crossOrigin="",d.href=r,c&&d.setAttribute("nonce",c),document.head.appendChild(d),l)return new Promise((m,f)=>{d.addEventListener("load",m),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return s.then(n=>{for(const c of n||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function oo(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:i,onRegisterError:n}=e;let c,r;const l=async(d=!0)=>{await r};async function u(){if("serviceWorker"in navigator){if(c=await ao(async()=>{const{Workbox:d}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:d}},[]).then(({Workbox:d})=>new d("/sw.js",{scope:"/",type:"classic"})).catch(d=>{n==null||n(d)}),!c)return;c.addEventListener("activated",d=>{(d.isUpdate||d.isExternal)&&window.location.reload()}),c.addEventListener("installed",d=>{d.isUpdate||o==null||o()}),c.register({immediate:t}).then(d=>{i?i("/sw.js",d):s==null||s(d)}).catch(d=>{n==null||n(d)})}}return r=u(),l}const P={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function aa(){return localStorage.getItem(P.selectedProfileId)}function Ye(e){e?localStorage.setItem(P.selectedProfileId,e):localStorage.removeItem(P.selectedProfileId)}function oa(){const e=localStorage.getItem(P.theme);return e==="light"||e==="dark"?e:"system"}function so(e){e==="system"?localStorage.removeItem(P.theme):localStorage.setItem(P.theme,e)}function io(){return localStorage.getItem(P.lastExportAt)}function Pt(e){localStorage.setItem(P.lastExportAt,e)}function no(){return localStorage.getItem(P.storagePersistRequested)==="1"}function ro(){localStorage.setItem(P.storagePersistRequested,"1")}const co="19:00";function lo(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??co}function uo(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function gt(){return localStorage.getItem(P.githubToken)??""}function Rt(e){e.trim()?localStorage.setItem(P.githubToken,e.trim()):localStorage.removeItem(P.githubToken)}function Ne(){return localStorage.getItem(P.githubGistId)??""}function et(e){e?localStorage.setItem(P.githubGistId,e):localStorage.removeItem(P.githubGistId)}function bt(){return localStorage.getItem(P.githubLastSyncAt)}function ht(e){e?localStorage.setItem(P.githubLastSyncAt,e):localStorage.removeItem(P.githubLastSyncAt)}function sa(){return localStorage.getItem(P.githubAutoSync)!=="0"}function mo(e){e?localStorage.removeItem(P.githubAutoSync):localStorage.setItem(P.githubAutoSync,"0")}function yt(){return localStorage.getItem(P.notasOrdem)==="titulo"?"titulo":"data"}function po(e){e==="titulo"?localStorage.setItem(P.notasOrdem,"titulo"):localStorage.removeItem(P.notasOrdem)}function ia(){const e=oa();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function vo(e){so(e),ia()}function fo(){return oa()}async function go(){var e;if(!no()&&(ro(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const tt=(e,t)=>t.some(a=>e instanceof a);let Ft,Ot;function bo(){return Ft||(Ft=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ho(){return Ot||(Ot=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const at=new WeakMap,Be=new WeakMap,je=new WeakMap;function yo(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",n)},i=()=>{a(re(e.result)),s()},n=()=>{o(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",n)});return je.set(t,e),t}function _o(e){if(at.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",n),e.removeEventListener("abort",n)},i=()=>{a(),s()},n=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",n),e.addEventListener("abort",n)});at.set(e,t)}let ot={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return at.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return re(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function na(e){ot=e(ot)}function wo(e){return ho().includes(e)?function(...t){return e.apply(st(this),t),re(this.request)}:function(...t){return re(e.apply(st(this),t))}}function $o(e){return typeof e=="function"?wo(e):(e instanceof IDBTransaction&&_o(e),tt(e,bo())?new Proxy(e,ot):e)}function re(e){if(e instanceof IDBRequest)return yo(e);if(Be.has(e))return Be.get(e);const t=$o(e);return t!==e&&(Be.set(e,t),je.set(t,e)),t}const st=e=>je.get(e);function Eo(e,t,{blocked:a,upgrade:o,blocking:s,terminated:i}={}){const n=indexedDB.open(e,t),c=re(n);return o&&n.addEventListener("upgradeneeded",r=>{o(re(n.result),r.oldVersion,r.newVersion,re(n.transaction),r)}),a&&n.addEventListener("blocked",r=>a(r.oldVersion,r.newVersion,r)),c.then(r=>{i&&r.addEventListener("close",()=>i()),s&&r.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const xo=["get","getKey","getAll","getAllKeys","count"],So=["put","add","delete","clear"],Ve=new Map;function Ht(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ve.get(t))return Ve.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=So.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||xo.includes(a)))return;const i=async function(n,...c){const r=this.transaction(n,s?"readwrite":"readonly");let l=r.store;return o&&(l=l.index(c.shift())),(await Promise.all([l[a](...c),s&&r.done]))[0]};return Ve.set(t,i),i}na(e=>({...e,get:(t,a,o)=>Ht(t,a)||e.get(t,a,o),has:(t,a)=>!!Ht(t,a)||e.has(t,a)}));const Ao=["continue","continuePrimaryKey","advance"],Bt={},it=new WeakMap,ra=new WeakMap,ko={get(e,t){if(!Ao.includes(t))return e[t];let a=Bt[t];return a||(a=Bt[t]=function(...o){it.set(this,ra.get(this)[t](...o))}),a}};async function*Lo(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,ko);for(ra.set(a,t),je.set(a,st(t));t;)yield a,t=await(it.get(a)||t.continue()),it.delete(a)}function Vt(e,t){return t===Symbol.asyncIterator&&tt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&tt(e,[IDBIndex,IDBObjectStore])}na(e=>({...e,get(t,a,o){return Vt(t,a)?Lo:e.get(t,a,o)},has(t,a){return Vt(t,a)||e.has(t,a)}}));const qo="memoriza",Mo=4;let Ue;function A(){return Ue||(Ue=Eo(qo,Mo,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}if(e.objectStoreNames.contains("snapshots")||e.createObjectStore("snapshots",{keyPath:"id"}),!e.objectStoreNames.contains("avaliacoes")){const s=e.createObjectStore("avaliacoes",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("sessao_id","sessao_id")}}})),Ue}function oe(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const _t="Europe/London",To=new Intl.DateTimeFormat("en-CA",{timeZone:_t,year:"numeric",month:"2-digit",day:"2-digit"});function F(e=new Date){return To.format(e)}function Z(){return F(new Date)}function _e(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function z(){return new Date().toISOString()}function se(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function Co(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:_t,weekday:"short",day:"2-digit",month:"2-digit"})}function ce(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Io(e){const t=new Date(e),a=F(t),o=t.toLocaleTimeString("pt-BR",{timeZone:_t,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function wt(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function K(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const Do="00000000-0000-4000-8000-000000000001";async function $t(){return(await(await A()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function No(){return $t()}async function jo(e){return(await A()).get("perfis",e)}async function ca(e){const t=await A(),a=await t.getAll("perfis"),o=z(),i={id:a.length===0?Do:oe(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",i),i}async function zo(e,t){const a=await A(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=z(),await a.put("perfis",o))}async function Po(e){const t=await A(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const i of a){const n=await t.getAllFromIndex("temas","espaco_id",i.id);o+=n.length;for(const c of n)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function Ro(e){const t=await A(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(u=>t.getAllFromIndex("temas","espaco_id",u.id)))).flat(),n=(await Promise.all(s.map(u=>t.getAllFromIndex("notas","tema_id",u.id)))).flat(),r=(await Promise.all(n.map(u=>t.getAllFromIndex("itens_revisao","nota_id",u.id)))).flat(),l=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await l.objectStore("perfis").delete(e);for(const u of a)await l.objectStore("espacos").delete(u.id);for(const u of s)await l.objectStore("temas").delete(u.id);for(const u of n)await l.objectStore("notas").delete(u.id);for(const u of r)await l.objectStore("itens_revisao").delete(u.id);await l.done}const la=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),Fo=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function Oo(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function nt(e){return Fo.get(Oo(e))??null}function da(e){return e.length>0&&e.every(t=>nt(t)!==null)}function ua(e,t,a){if(a){const o=nt(e),s=nt(t);if(o!==s)return o-s}return la.compare(e,t)}function ma(e){const t=da(e);return[...e].sort((a,o)=>ua(a,o,t))}function Ho(e,t){return la.compare(e,t)}function le(e,t){const a=da(e.map(t));return[...e].sort((o,s)=>ua(t(o),t(s),a))}const pa=30;function ve(e,t=z()){return{...e,excluido:!0,excluido_em:t,atualizado_em:t}}function ue(e,t=z()){const a={...e};return delete a.excluido,delete a.excluido_em,a.atualizado_em=t,a}async function Bo(e){const t=await A(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=new Map(a.map(r=>[r.id,r])),s=(await Promise.all(a.map(r=>t.getAllFromIndex("temas","espaco_id",r.id)))).flat(),i=new Map(s.map(r=>[r.id,r])),n=(await Promise.all(s.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat(),c=[];for(const r of a){if(!r.excluido)continue;const l=s.filter(d=>d.espaco_id===r.id),u=new Set(l.map(d=>d.id));c.push({tipo:"espaco",id:r.id,nome:r.nome,contexto:r.categoria||"Sem categoria",excluido_em:r.excluido_em,temas:l.filter(d=>d.excluido).length,notas:n.filter(d=>u.has(d.tema_id)&&d.excluido).length})}for(const r of s){if(!r.excluido)continue;const l=o.get(r.espaco_id);!l||l.excluido||c.push({tipo:"tema",id:r.id,nome:r.nome,contexto:l.nome,excluido_em:r.excluido_em,notas:n.filter(u=>u.tema_id===r.id&&u.excluido).length})}for(const r of n){if(!r.excluido)continue;const l=i.get(r.tema_id);if(!l||l.excluido)continue;const u=o.get(l.espaco_id);!u||u.excluido||c.push({tipo:"nota",id:r.id,nome:r.titulo||"(sem título)",contexto:l.nome,excluido_em:r.excluido_em})}return c.sort((r,l)=>(l.excluido_em??"").localeCompare(r.excluido_em??""))}async function Vo(e,t){const a=await A(),o=z();if(e==="nota"){const r=await a.get("notas",t);if(!r)return;await a.put("notas",ue(r,o));return}if(e==="tema"){const r=await a.get("temas",t);if(!r)return;const l=(await a.getAllFromIndex("notas","tema_id",t)).filter(d=>d.excluido),u=a.transaction(["temas","notas"],"readwrite");await u.objectStore("temas").put(ue(r,o));for(const d of l)await u.objectStore("notas").put(ue(d,o));await u.done;return}const s=await a.get("espacos",t);if(!s)return;const i=(await a.getAllFromIndex("temas","espaco_id",t)).filter(r=>r.excluido),n=(await Promise.all(i.map(r=>a.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>r.excluido),c=a.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(ue(s,o));for(const r of i)await c.objectStore("temas").put(ue(r,o));for(const r of n)await c.objectStore("notas").put(ue(r,o));await c.done}async function ke(e,t){const a=await A();if(e==="nota"){const n=await a.getAllFromIndex("itens_revisao","nota_id",t),c=a.transaction(["notas","itens_revisao"],"readwrite");await c.objectStore("notas").delete(t);for(const r of n)await c.objectStore("itens_revisao").delete(r.id);await c.done;return}let o;if(e==="tema")o=await a.getAllFromIndex("notas","tema_id",t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);o=(await Promise.all(n.map(c=>a.getAllFromIndex("notas","tema_id",c.id)))).flat()}const s=(await Promise.all(o.map(n=>a.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat(),i=a.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");if(e==="tema")await i.objectStore("temas").delete(t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);await i.objectStore("espacos").delete(t);for(const c of n)await i.objectStore("temas").delete(c.id)}for(const n of o)await i.objectStore("notas").delete(n.id);for(const n of s)await i.objectStore("itens_revisao").delete(n.id);await i.done}async function Uo(){const e=await A(),t=K(Z(),-pa),a=n=>!!n.excluido&&!!n.excluido_em&&n.excluido_em.slice(0,10)<t,o=(await e.getAll("espacos")).filter(a),s=(await e.getAll("temas")).filter(a),i=(await e.getAll("notas")).filter(a);for(const n of o)await ke("espaco",n.id);for(const n of s)await ke("tema",n.id);for(const n of i)await ke("nota",n.id)}async function va(e){const a=(await(await A()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido);return yt()==="titulo"?le(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function Ut(e){return(await A()).get("notas",e)}async function Go(e){const t=await A(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).filter(n=>!n.excluido).map(n=>({nota:n,tema:s}))))).flat()}async function Ko(e,t){const a=await A(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const i=z(),n={id:oe(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:i,atualizado_em:i},c={id:oe(),nota_id:n.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:K(Z(),1),status:"pendente",streak_facil:0,criado_em:i,atualizado_em:i},r=a.transaction(["notas","itens_revisao"],"readwrite");return await r.objectStore("notas").put(n),await r.objectStore("itens_revisao").put(c),await r.done,n}async function Wo(e,t){const a=await A(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=z(),await a.put("notas",o))}async function Zo(e){const t=await A(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=z(),await t.put("notas",a),a.favorito):!1}async function Xo(e){const t=await A(),a=await t.get("notas",e);a&&await t.put("notas",ve(a))}async function fa(){var i;const e=await A(),a=(await e.getAll("notas")).filter(n=>!("titulo"in n)||!n.titulo);if(a.length===0)return 0;const o=z(),s=e.transaction("notas","readwrite");for(const n of a)await s.store.put({...n,titulo:((i=n.fonte)==null?void 0:i.trim())||"Sem título",titulo_revisado:!1,favorito:n.favorito??!1,atualizado_em:o});return await s.done,a.length}function Qo(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,i=0,n=0;for(const c of t){const r=a.get(c.id);r?c.atualizado_em>r.atualizado_em?(a.set(c.id,c),o.push(c),i++):n++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:i,mantidos:n}}function Jo(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const Yo=["perfis","espacos","temas","notas","itens_revisao","avaliacoes"],Et="memoriza-export",ga=1;async function es(){const e=await A(),[t,a,o,s,i,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao"),e.getAll("avaliacoes")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:i,avaliacoes:n}}async function ts(e){const t=await A(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(m=>m.id)),n=(await t.getAll("temas")).filter(m=>s.has(m.espaco_id)),c=new Set(n.map(m=>m.id)),l=(await t.getAll("notas")).filter(m=>c.has(m.tema_id)),u=await t.getAllFromIndex("itens_revisao","perfil_id",e),d=await t.getAllFromIndex("avaliacoes","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:n,notas:l,itens_revisao:u,avaliacoes:d}}async function as(e){const t=await ts(e);return{formato:Et,versao:ga,exportado_em:z(),escopo:"perfil",perfil_id:e,dados:t}}async function we(){const e=await es();return{formato:Et,versao:ga,exportado_em:z(),escopo:"todos",dados:e}}function os(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${Io(e.exportado_em)}.json`}function Gt(e){const t=os(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function ze(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==Et||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Pe(e){const t=await A(),a={};for(const o of Yo){const s=await t.getAll(o),i=e.dados[o],n=Qo(s,i??[]);if(n.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const r of n.toWrite)await c.store.put(r);await c.done}a[o]={criados:n.criados,atualizados:n.atualizados,mantidos:n.mantidos}}return await fa(),{...Jo(Object.values(a)),porLoja:a}}const ss=8,is=20,ns=10;function rs(e){return e.slice(0,10)}function cs(e,t){const[a,o,s]=e.split("-").map(Number),i=new Date(Date.UTC(a,o-1,s));return i.setUTCDate(i.getUTCDate()+t),i.toISOString().slice(0,10)}function ls(e){const[t,a,o]=e.split("-").map(Number),s=new Date(Date.UTC(t,a-1,o)),i=s.getUTCDay();return s.setUTCDate(s.getUTCDate()-(i+6)%7),s.toISOString().slice(0,10)}function ds(e,t){const a=new Set,o=(l,u)=>u.criado_em.localeCompare(l.criado_em),s=e.filter(l=>l.automatico).sort(o),i=e.filter(l=>!l.automatico).sort(o),n=cs(t,-6),c=new Set;let r=0;for(const l of s){const u=rs(l.criado_em);let d;if(u>=n)d=!0;else{const m=ls(u);d=!c.has(m)&&c.size<ss,d&&c.add(m)}if(d&&r<is){r++;continue}a.add(l.id)}for(const l of i.slice(ns))a.add(l.id);return[...a]}async function rt(e={}){const t=await A(),a=JSON.stringify(await we()),o=e.automatico??!1,s={id:oe(),criado_em:z(),automatico:o,titulo:e.titulo??(o?"Automático":"Manual"),bytes:a.length,conteudo:a};return await t.put("snapshots",s),await vs(),s}async function us(){return(await(await A()).getAll("snapshots")).sort((a,o)=>o.criado_em.localeCompare(a.criado_em))}async function ms(e){await(await A()).delete("snapshots",e)}async function ps(e){const a=await(await A()).get("snapshots",e);if(!a)throw new Error("Snapshot não encontrado.");return Pe(ze(a.conteudo))}async function vs(){const e=await A(),t=ds(await e.getAll("snapshots"),Z());if(t.length===0)return;const a=e.transaction("snapshots","readwrite");for(const o of t)await a.store.delete(o);await a.done}async function fs(){const e=await A(),t=Z();return(await e.getAll("snapshots")).some(o=>o.automatico&&o.criado_em.slice(0,10)===t)?null:rt({automatico:!0})}function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function fe(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const ba="_sem-categoria_";function gs(e){return e.trim()===""?ba:encodeURIComponent(e)}function bs(e){return e===ba?"":decodeURIComponent(e)}function hs(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function ys(){const e=hs();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:bs(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function _s(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function C(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function ws(e){C(e)}function $s(e){window.addEventListener("hashchange",e)}function me(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function N(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Es={hoje:me('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:me('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:me('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:me('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:me('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:me('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},x={backup:N('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:N('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:N('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:N('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:N('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:N('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:N('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:N('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:N('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:N('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:N('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:N('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:N('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:N('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:N('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:N('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:N('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:N('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:N('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:N('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:N('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:N('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:N('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:N('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:N('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:N('<path d="M20 6L9 17l-5-5"/>'),chart:N('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:N('<path d="M4 6h16M4 12h11M4 18h6"/>'),trash:N('<path d="M4 7h16"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6M14 11v6"/>')};async function xs(e,t){var c,r,l;const a=await $t(),o=a.length===0;e.innerHTML=`
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
              <span class="profile-avatar" aria-hidden="true">${p(Ss(u.nome))}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(u=>{u.addEventListener("click",()=>{const d=u.dataset.id,m=a.find(f=>f.id===d);m&&t(m)})});const s=e.querySelector("#form-novo-perfil-picker"),i=e.querySelector("#input-novo-perfil-picker");o&&i.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",i.focus()}),(r=e.querySelector("#btn-cancelar-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="none"});const n=async()=>{const u=i.value.trim();if(!u)return;const d=await ca(u);t(d)};(l=e.querySelector("#btn-salvar-perfil-picker"))==null||l.addEventListener("click",n),i.addEventListener("keydown",u=>{u.key==="Enter"&&n()})}function Ss(e){return e.trim().slice(0,1).toUpperCase()}const pe=["1","7","30","180"],Ge={1:1,7:7,30:30,180:180};function As(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=pe.indexOf(e);if(t==="dificil"){const l=pe[Math.max(0,s-1)];return{estagio:l,streak_facil:0,data_agendada:K(o,Ge[l]),aposentado:!1}}if(t==="medio"){const l=pe[Math.min(pe.length-1,s+1)];return{estagio:l,streak_facil:0,data_agendada:K(o,Ge[l]),aposentado:!1}}const i=a+1,n=s+2,c=n<=pe.length-1?pe[n]:"consulta",r=i>=2?"consulta":c;return r==="consulta"?{estagio:"consulta",streak_facil:i,aposentado:!0}:{estagio:r,streak_facil:i,data_agendada:K(o,Ge[r]),aposentado:!1}}async function ha(e){const t=await A(),a=Z(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(h=>h.data_agendada<=a),i=Array.from(new Set(s.map(h=>h.nota_id))),n=await Promise.all(i.map(h=>t.get("notas",h))),c=new Map(n.filter(h=>!!h).map(h=>[h.id,h])),r=Array.from(new Set(Array.from(c.values()).map(h=>h.tema_id))),l=await Promise.all(r.map(h=>t.get("temas",h))),u=new Map(l.filter(h=>!!h).map(h=>[h.id,h])),d=Array.from(new Set(Array.from(u.values()).map(h=>h.espaco_id))),m=await Promise.all(d.map(h=>t.get("espacos",h))),f=new Map(m.filter(h=>!!h).map(h=>[h.id,h])),E=[];for(const h of s){const g=c.get(h.nota_id),k=g&&u.get(g.tema_id),S=k&&f.get(k.espaco_id);!g||!k||!S||g.excluido||k.excluido||S.excluido||E.push({item:h,nota:g,tema:k,espaco:S})}return E.sort((h,g)=>h.tema.criado_em.localeCompare(g.tema.criado_em)||h.nota.criado_em.localeCompare(g.nota.criado_em)),E}async function ks(e,t,a){const o=await A(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const i=Z(),n=As(s.estagio,t,s.streak_facil,i),c=z(),r={...s,status:"feita",avaliacao:t,data_concluida:i,duracao_segundos:a,atualizado_em:c},l={id:oe(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:n.estagio,data_agendada:n.aposentado?i:n.data_agendada,status:n.aposentado?"feita":"pendente",streak_facil:n.streak_facil,criado_em:c,atualizado_em:c},u=o.transaction("itens_revisao","readwrite");return await u.store.put(r),await u.store.put(l),await u.done,n}async function Ls(e){const t=await A(),a=Z();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function qs(e){const t=await A(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(n=>n.status==="pendente");if(a.length===0)return;const o=Z(),s=z(),i=t.transaction("itens_revisao","readwrite");for(const n of a)await i.store.put({...n,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await i.done}const Re=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],Kt={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},Ms=new RegExp(`\\[([^\\]]+)\\]\\{(${Re.join("|")})\\}`,"g");function ct(e){let t=p(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(Ms,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Ts(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,i=s[s.length-1];a.push({level:o.level,nodes:i?i.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function ya(e){return`<ul>${e.map(t=>`<li>${ct(t.text)}${t.children.length>0?ya(t.children):""}</li>`).join("")}</ul>`}function Fe(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(ya(Ts(o))),o=[])}let i=[];function n(){i.length>0&&(a.push(`<p>${ct(i.join(`
`)).replace(/\n/g,"<br>")}</p>`),i=[])}for(const c of t){const r=c.trim();if(r===""){n(),s();continue}const l=/^(#{1,3})\s+(.*)$/.exec(r);if(l){n(),s();const d=l[1].length;a.push(`<h${d}>${ct(l[2])}</h${d}>`);continue}const u=/^[-*]\s+(.*)$/.exec(r);if(u){n();const d=c.length-c.trimStart().length;o.push({level:Math.floor(d/2),text:u[1]});continue}s(),i.push(r)}return n(),s(),a.join(`
`)}function xt(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(xt).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=Re.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function lt(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...lt(s,t+1));continue}if(s.tagName!=="LI")continue;const i=s,n=Array.from(i.children).filter(l=>l.tagName==="UL"),c=i.cloneNode(!0);c.querySelectorAll("ul").forEach(l=>l.remove());const r=xt(c).trim();r&&a.push(`${"  ".repeat(t)}- ${r}`);for(const l of n)a.push(...lt(l,t+1));o=i}return a}function Wt(e){if(e.tagName==="UL")return lt(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=xt(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function Cs(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=Wt(o);s.length>0&&t.push(s.join(`
`))}else t.push(...Wt(o))}return t.filter(Boolean).join(`

`)}const Is=30;function _a(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=K(Z(),Is);return e.validade_ate<=t}const de=8;function Ds(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function St(e){return Ds(e)%de}function R(e){return`var(--accent-${St(e)})`}function wa(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function At(e){return e?e.toLowerCase():"\0sem-categoria"}function $a(e){return Ns(e.map(At))}function Ns(e){const t=new Set,a=new Map;for(const o of e){let s=St(o);for(let i=0;i<de&&t.has(s);i++)s=(s+1)%de;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function Ea(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=St(o.id);for(let i=0;i<de&&t.has(s);i++)s=(s+1)%de;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const js=5*60;let B=null;function xa(){B&&(document.hidden?B.retomadoEm!=null&&(B.acumuladoMs+=Date.now()-B.retomadoEm,B.retomadoEm=null):B.retomadoEm==null&&(B.retomadoEm=Date.now()))}function zs(e){B&&B.itemId===e||(Te(),B={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",xa))}function Ps(){if(!B)return;let e=B.acumuladoMs;return B.retomadoEm!=null&&(e+=Date.now()-B.retomadoEm),Math.min(js,Math.round(e/1e3))}function Te(){B&&document.removeEventListener("visibilitychange",xa),B=null}function Sa(e){const t=Z();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${_e(e.data_agendada,t)} dia(s)">${x.alert} atrasada</span>`}async function Zt(e,t){const a=await ha(t.perfilId);await Ce(e,t,a)}async function Ce(e,t,a){var l;Te(),window.scrollTo({top:0});const o=await Ls(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(l=e.querySelector("#btn-empty-espacos"))==null||l.addEventListener("click",()=>C("espacos"));return}const n=new Set(a.map(u=>u.espaco.id)).size>1,c=new Map;for(const u of a){const d=c.get(u.tema.id)??[];d.push(u),c.set(u.tema.id,d)}const r=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=r+Array.from(c.values()).map(u=>{const d=u[0].tema,m=u[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${R(d.id)}">
            <span class="color-dot" style="--dot-color:${R(d.id)}"></span>
            ${p(d.nome)}
            ${n?`<span class="queue-group__espaco"> · ${p(m.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${u.map(f=>`
              <button class="item-row" data-id="${p(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${R(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${x.star} `:""}${p(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${Sa(f.item)}
                ${_a(f.nota)?`<span class="badge badge--muted">${x.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(u=>{u.addEventListener("click",()=>{const d=a.find(m=>m.item.id===u.dataset.id);d&&Aa(e,t,d,a,o)})})}function Aa(e,t,a,o,s=0,i=!1){var l,u,d;zs(a.item.id),i||window.scrollTo({top:0});const n=_a(a.nota),c=s+o.length,r=c>0?Math.round(s/c*100):0;e.innerHTML=`
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
        ${p(a.tema.nome)}${i&&a.nota.fonte?` · ${p(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${x.star} `:""}${p(a.nota.titulo||"(sem título)")}
        ${Sa(a.item)}
      </div>

      ${n?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${i?`
        <div class="review-card__content markdown-preview">${Fe(a.nota.conteudo)}</div>
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
  `,(l=e.querySelector("[data-voltar]"))==null||l.addEventListener("click",()=>void Ce(e,t,o)),(u=e.querySelector("[data-editar]"))==null||u.addEventListener("click",()=>{Te(),C(`notas/${a.nota.id}`)}),(d=e.querySelector("#btn-revelar"))==null||d.addEventListener("click",()=>{Aa(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(m=>{m.addEventListener("click",async()=>{const f=m.dataset.avaliacao,E=Ps();Te();const h=await ks(a.item.id,f,E),g=await ha(t.perfilId);h.aposentado?Rs(e,t,g):await Ce(e,t,g)})})}function Rs(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${x.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void Ce(e,t,a))}function ka(e){return e.trim().toLowerCase()}function kt(e){const t=new Map;for(const i of e){const n=i.categoria.trim(),c=ka(n),r=t.get(c);r?r.itens.push(i):t.set(c,{display:n,itens:[i]})}const a=Array.from(t.values()).map(i=>({categoria:i.display,itens:i.itens})),o=a.map(i=>i.categoria),s=new Map;ma(o.filter(i=>i!=="")).forEach((i,n)=>s.set(i,n)),a.sort((i,n)=>i.categoria===""&&n.categoria!==""?1:n.categoria===""&&i.categoria!==""?-1:(s.get(i.categoria)??0)-(s.get(n.categoria)??0));for(const i of a)i.itens.length>1&&(i.itens=le(i.itens,n=>n.nome));return a}function Lt(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=ka(o);t.has(s)||t.set(s,o)}return ma(Array.from(t.values()))}async function La(e){const a=await(await A()).getAllFromIndex("espacos","perfil_id",e);return le(a.filter(o=>!o.excluido),o=>o.nome)}const Fs=["Cursos","Livros","Bíblia"];async function qa(e){const t=await La(e);return Lt([...Fs,...t.map(a=>a.categoria)])}async function qt(e){return(await A()).get("espacos",e)}function Ma(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function Os(e,t,a,o={}){const s=await A(),i=z(),n={id:oe(),perfil_id:e,nome:t,categoria:a,criado_em:i,atualizado_em:i,arquivado:!1};return Ma(n,o),await s.put("espacos",n),n}async function Hs(e,t,a,o={}){const s=await A(),i=await s.get("espacos",e);i&&(i.nome=t,i.categoria=a,Ma(i,o),i.atualizado_em=z(),await s.put("espacos",i))}async function dt(e,t){const a=await A(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?z():void 0,o.atualizado_em=z(),await a.put("espacos",o))}async function Ta(e){const t=await A(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).filter(i=>!i.excluido).length;return{temas:a.length,notas:o}}async function Ca(e){const t=await A(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(r=>!r.excluido),i=(await Promise.all(o.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>!r.excluido),n=z(),c=t.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(ve(a,n));for(const r of o)await c.objectStore("temas").put(ve(r,n));for(const r of i)await c.objectStore("notas").put(ve(r,n));await c.done}function ae(e){return new Promise(t=>{var i,n;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${p(e.title)}</div>
        <p class="modal__message">${p(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${p(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${p(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(i=a.querySelector("#modal-confirm"))==null||i.addEventListener("click",()=>s(!0)),(n=a.querySelector("#modal-cancel"))==null||n.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function Ie(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${p(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${p(a)}">${p(a)}</button>`).join("")}
    </div>
  `}function Mt(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,fe(o),o.focus()})})})}function j(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Ia="livro",Da=[{chave:"pasta",label:"Categoria",svg:j('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:j('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:j('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:j('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:j('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:j('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:j('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:j('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:j('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:j('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:j('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:j('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:j('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:j('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:j('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:j('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:j('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:j('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:j('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:j('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:j('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:j('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:j('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:j('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:j('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:j('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:j('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],ut=new Map(Da.map(e=>[e.chave,e]));function ie(e){return e&&ut.get(e)||ut.get(Ia)}const Bs=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function Vs(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Tt(e){var a;const t=Vs(e);if(t.trim())return(a=Bs.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function be(e){return e.icone&&ut.has(e.icone)?e.icone:Tt(`${e.nome??""} ${e.categoria??""}`)??Ia}const Us="pasta";function Na(e){return Tt(e)??Us}const Xt=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function ja(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${ne(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${Da.map(s=>`
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
        ${Array.from({length:de},(s,i)=>`
          <button
            type="button"
            class="color-swatch${o===i?" is-selected":""}"
            data-cor="${i}"
            style="--swatch: var(--accent-${i});"
            title="${Xt[i]??`Cor ${i}`}"
            aria-label="${Xt[i]??`Cor ${i}`}"
            aria-pressed="${o===i}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${ne(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function za(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${ge(a)}"]`);if(!s)return;const i=s.querySelector(`#${ge(a)}-icone`),n=s.querySelector(`#${ge(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),r=d=>{i&&(i.value=d);for(const m of c){const f=m.dataset.icone===d;m.classList.toggle("is-selected",f),m.setAttribute("aria-pressed",String(f))}};let l=!1;for(const d of c)d.addEventListener("click",()=>{l=!0,r(d.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(d=>{d.addEventListener("click",()=>{n&&(n.value=d.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(m=>{const f=m===d;m.classList.toggle("is-selected",f),m.setAttribute("aria-pressed",String(f))})})});const u=()=>{if(l)return;const d=Tt(o());for(const m of c)m.classList.toggle("is-suggested",!!d&&m.dataset.icone===d);d&&r(d)};u(),e.querySelectorAll('input[type="text"]').forEach(d=>{d.addEventListener("input",u)})}function Pa(e,t){var n,c;const a=e.querySelector(`[data-espaco-visual="${ge(t)}"]`),o=(n=a==null?void 0:a.querySelector(`#${ge(t)}-icone`))==null?void 0:n.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${ge(t)}-cor`))==null?void 0:c.value.trim(),i={};if(o&&(i.icone=o),s!==void 0&&s!==""){const r=Number(s);Number.isInteger(r)&&r>=0&&r<de&&(i.cor=r)}return i}function ne(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function ge(e){return e.replace(/["\\]/g,"\\$&")}async function Le(e,t){var m,f,E,h;const a=await La(t.perfilId),o=a.filter(g=>!g.arquivado),s=a.filter(g=>g.arquivado),i=await Ks(a.map(g=>g.id)),n=kt(o),c=Ea(o),r=$a(n.map(g=>g.categoria)),l=await qa(t.perfilId);e.innerHTML=`
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
        ${Ie(l,"input-categoria-espaco")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${ja({prefix:"novo-espaco"})}
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
    `:n.map(g=>{const k=g.itens.length===1?g.itens[0]:null,S=k?c.get(k.id)??R(k.id):r.get(At(g.categoria))??R(g.categoria),I=ie(k?be(k):Na(g.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${S}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${S}" aria-hidden="true">${I.svg}</span>
            ${p(g.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${g.itens.map(T=>Gs(T,i.get(T.id)??0,c.get(T.id)??R(T.id))).join("")}
        </div>
      </details>
    `}).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(g=>`
            <div class="item-row" data-id="${p(g.id)}">
              <button class="item-row__main" data-open="${p(g.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${R(g.id)}" aria-hidden="true">${ie(be(g)).svg}</span>
                  <span class="item-row__title">${p(g.nome)}</span>
                </span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${p(g.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,Mt(e),za(e,{prefix:"novo-espaco",getTexto:()=>{var g,k;return`${((g=e.querySelector("#input-nome-espaco"))==null?void 0:g.value)??""} ${((k=e.querySelector("#input-categoria-espaco"))==null?void 0:k.value)??""}`}});const u=e.querySelector("#form-novo-espaco"),d=()=>{var g;u.style.display="block",(g=e.querySelector("#input-nome-espaco"))==null||g.focus()};(m=e.querySelector("#btn-novo-espaco"))==null||m.addEventListener("click",d),(f=e.querySelector("#btn-empty-novo-espaco"))==null||f.addEventListener("click",d),(E=e.querySelector("#btn-cancelar-espaco"))==null||E.addEventListener("click",()=>{u.style.display="none"}),(h=e.querySelector("#btn-salvar-espaco"))==null||h.addEventListener("click",async()=>{const g=e.querySelector("#input-nome-espaco"),k=e.querySelector("#input-categoria-espaco"),S=g.value.trim();if(!S)return;const I=await Os(t.perfilId,S,k.value.trim(),Pa(e,"novo-espaco"));C(`espacos/${I.id}`)}),e.querySelectorAll("[data-open]").forEach(g=>{g.addEventListener("click",()=>C(`espacos/${g.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(g=>{g.addEventListener("click",async()=>{await dt(g.dataset.archive,!0),Le(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(g=>{g.addEventListener("click",async()=>{await dt(g.dataset.unarchive,!1),Le(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(g=>{g.addEventListener("click",async()=>{const k=g.dataset.excluir,S=g.dataset.nome??"",I=await Ta(k);await ae({title:`Excluir "${S}"?`,message:`Isso manda pra Lixeira o espaço com ${I.temas} tema(s) e ${I.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ca(k),Le(e,t))})})}function Gs(e,t,a){const o=ie(be(e));return`
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
  `}async function Ks(e){const t=await A(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function Ra(e){const a=await(await A()).getAllFromIndex("temas","espaco_id",e);return le(a.filter(o=>!o.excluido),o=>o.nome)}async function Fa(e){return(await A()).get("temas",e)}async function Ws(e,t,a){const o=await A(),s=z(),i={id:oe(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",i),i}async function Zs(e,t,a){const o=await A(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=z(),await o.put("temas",s))}async function Xs(e){const t=await A(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=z(),await t.put("temas",a),a.favorito):!1}async function Qs(e){return{notas:(await(await A()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido).length}}async function Js(e){const t=await A(),a=await t.get("temas",e);if(!a)return;const o=(await t.getAllFromIndex("notas","tema_id",e)).filter(n=>!n.excluido),s=z(),i=t.transaction(["temas","notas"],"readwrite");await i.objectStore("temas").put(ve(a,s));for(const n of o)await i.objectStore("notas").put(ve(n,s));await i.done}function Ys(e,t){let a=e.has(t)?t:K(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=K(a,-1);return o}function ei(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const ti=5;async function ai(e){const t=await A(),a=Z(),o=K(a,-6),[s,i,n,c,r]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"])),t.getAll("notas"),t.getAll("temas"),t.getAll("espacos")]),l=new Map(n.map(_=>[_.id,_])),u=new Map(c.map(_=>[_.id,_])),d=new Map(r.map(_=>[_.id,_])),m=_=>{const H=l.get(_.nota_id);if(!H||H.excluido)return!1;const he=u.get(H.tema_id);if(!he||he.excluido)return!1;const jt=d.get(he.espaco_id);return!!jt&&!jt.excluido},f=s.filter(_=>_.avaliacao&&m(_)),E=i.filter(m),h=f.filter(_=>_.data_concluida===a),g=h.length,k=h.reduce((_,H)=>_+(H.duracao_segundos??0),0),S=f.filter(_=>_.data_concluida&&_.data_concluida>=o&&_.data_concluida<=a).length,I=["1","7","30","180"].map(_=>({estagio:_,count:E.filter(H=>H.estagio===_).length})),T=[];for(let _=1;_<=7;_++){const H=K(a,_);T.push({data:H,count:E.filter(he=>he.data_agendada===H).length})}const X=K(a,-29),O=f.filter(_=>_.data_concluida>=X),V={facil:O.filter(_=>_.avaliacao==="facil").length,medio:O.filter(_=>_.avaliacao==="medio").length,dificil:O.filter(_=>_.avaliacao==="dificil").length,total:0};V.total=V.facil+V.medio+V.dificil;const Y=new Set(f.map(_=>_.data_concluida)),G=Ys(Y,a),Q=[];for(let _=6;_>=0;_--)Q.push(Y.has(K(a,-_)));const ee=f.filter(_=>_.estagio==="consulta").length,J=f.filter(_=>_.avaliacao==="dificil"),te=Array.from(new Set(J.map(_=>_.nota_id))),b=await Promise.all(te.map(_=>t.get("notas",_))),L=new Map(b.filter(_=>!!_).map(_=>[_.id,_.tema_id])),y=new Map;for(const _ of J){const H=L.get(_.nota_id);H&&y.set(H,(y.get(H)??0)+1)}const v=Array.from(y.keys()),w=(await Promise.all(v.map(_=>t.get("temas",_)))).filter(_=>!!_).map(_=>({temaId:_.id,temaNome:_.nome,count:y.get(_.id)})).sort((_,H)=>H.count-_.count).slice(0,ti),q=r.filter(_=>_.perfil_id===e&&!_.excluido),D=q.filter(_=>!_.arquivado).length,U=(await Promise.all(q.map(_=>t.getAllFromIndex("temas","espaco_id",_.id)))).flat().filter(_=>!_.excluido),He=U.length,xe=(await Promise.all(U.map(_=>t.getAllFromIndex("notas","tema_id",_.id)))).flat().filter(_=>!_.excluido).length;return{revisoesHoje:g,revisoesUltimos7Dias:S,streakDias:G,diasAtivosUltimos7:Q,rankingDificeis:w,espacosAtivos:D,totalTemas:He,totalNotas:xe,itensEmConsulta:ee,porEstagio:I,tempoHojeSegundos:k,cargaProximos7:T,retencao30:V}}async function oi(e){const t=await A(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(n=>t.getAllFromIndex("notas","tema_id",n.id)))).flat();return(await Promise.all(s.map(n=>t.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat().reduce((n,c)=>n+(c.duracao_segundos??0),0)}async function si(e){const t=await A(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,i)=>s+(i.duracao_segundos??0),0)}function Oa(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${p(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${p(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=i=>{i.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",i=>{i.target===t&&o()})}async function ii(e){const t=await A(),a=z(),o={id:oe(),perfil_id:e.perfilId,espaco_id:e.espacoId,tema_id:e.temaId,nota_id:e.notaId,avaliacao:e.avaliacao,escopo:e.escopo,sessao_id:e.sessaoId,criado_em:a,atualizado_em:a};await t.put("avaliacoes",o)}async function ni(e,t=20){const a=await A(),o=await a.getAllFromIndex("avaliacoes","perfil_id",e),s=new Map((await a.getAll("espacos")).map(r=>[r.id,r.nome])),i=new Map((await a.getAll("temas")).map(r=>[r.id,r.nome])),n={total:0,facil:0,medio:0,dificil:0,sessoesTotal:0,sessoes:[]},c=new Map;for(const r of o){n.total++,n[r.avaliacao]++,(!n.ultimaEm||r.criado_em>n.ultimaEm)&&(n.ultimaEm=r.criado_em);let l=c.get(r.sessao_id);l||(l={sessao_id:r.sessao_id,criado_em:r.criado_em,total:0,facil:0,medio:0,dificil:0,escopo:r.escopo,contexto:(r.escopo==="tema"?i.get(r.tema_id):s.get(r.espaco_id))??"Conteúdo excluído"},c.set(r.sessao_id,l)),l.total++,l[r.avaliacao]++,r.criado_em>l.criado_em&&(l.criado_em=r.criado_em)}return n.sessoesTotal=c.size,n.sessoes=[...c.values()].sort((r,l)=>l.criado_em.localeCompare(r.criado_em)).slice(0,t),n}function ri(e,t){if(t.tipo==="tema")return[{rotulo:t.nomeContexto,escopo:"tema",itens:e}];const a=new Map;for(const o of e){let s=a.get(o.tema.id);s||(s={rotulo:o.tema.nome,escopo:"tema",itens:[]},a.set(o.tema.id,s)),s.itens.push(o)}return a.size<=1?[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e}]:[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e},...[...a.values()].sort((o,s)=>o.rotulo.localeCompare(s.rotulo,"pt-BR"))]}const Qt=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}],ci=[{valor:"dificil",label:"Difícil",classe:"btn--review-dificil",icone:x.caraTriste},{valor:"medio",label:"Médio",classe:"btn--review-medio",icone:x.caraNeutra},{valor:"facil",label:"Fácil",classe:"btn--review-facil",icone:x.caraFeliz}];function li(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function Ha(e,t,a,o){var i;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra avaliar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",o);return}const s=ri(t,a);s.length>1?Ba(e,s,a,o):Va(e,s[0],s,a,o)}function Ct(e){return`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← ${p(e)}</button>
    </div>
  `}function Ba(e,t,a,o){var s;e.innerHTML=`
    ${Ct("Encerrar avaliação")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <h2 style="margin:0;">Avaliação — ${p(a.nomeContexto)}</h2>
        <p class="text-muted" style="margin:0;">O que você quer avaliar?</p>
        <div class="stack">
          ${t.map((i,n)=>`
            <button class="btn btn--secondary btn--block" data-escopo="${n}" type="button">
              ${p(i.rotulo)} — ${i.itens.length} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-escopo]").forEach(i=>{i.addEventListener("click",()=>{Va(e,t[Number(i.dataset.escopo)],t,a,o)})})}function Va(e,t,a,o,s){var i;e.innerHTML=`
    ${Ct("Voltar")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${x.dice}</div>
        <h2 style="margin:0;">Avaliação — ${p(t.rotulo)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse com notas aleatórias e marque Fácil, Médio ou Difícil em cada uma. Isso não
          afeta sua fila de revisão. ${t.itens.length} nota(s) — escolha quantas:
        </p>
        <div class="stack">
          ${Qt.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.itens.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",()=>{o.tipo==="espaco"&&a.length>1?Ba(e,a,o,s):s()}),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const c=Qt.find(u=>u.key===n.dataset.tier),r=li(t.itens).slice(0,Math.min(c.n,t.itens.length)),l={id:oe(),escopo:t.escopo,itens:r,contagem:{facil:0,medio:0,dificil:0}};mt(e,l,0,o,s)})})}function mt(e,t,a,o,s,i=!1){var c,r;if(a>=t.itens.length){di(e,t,o,s);return}const n=t.itens[a];e.innerHTML=`
    ${Ct("Encerrar avaliação")}
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${p(n.tema.nome)} · ${a+1} de ${t.itens.length}</div>
      <div class="review-card__titulo">${n.nota.favorito?`${x.star} `:""}${p(n.nota.titulo||"(sem título)")}</div>
      ${i?`
        <div class="review-card__content markdown-preview">${Fe(n.nota.conteudo)}</div>
        <div class="review-actions">
          ${ci.map(l=>`
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
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{mt(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(l=>{l.addEventListener("click",async()=>{const u=l.dataset.avaliacao;t.contagem[u]++,await ii({perfilId:o.perfilId,espacoId:o.espacoId,temaId:n.tema.id,notaId:n.nota.id,avaliacao:u,escopo:t.escopo,sessaoId:t.id}),mt(e,t,a+1,o,s)})})}function di(e,t,a,o){var c;const{facil:s,medio:i,dificil:n}=t.contagem;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${x.confete}</div>
      <h2 style="margin:0;">Avaliação concluída</h2>
      <p class="text-muted" style="margin:0;">
        Você avaliou ${t.itens.length} nota(s) de ${p(a.nomeContexto)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <div class="retention-legend" style="justify-content:center;">
        <span class="badge badge--success">Fácil ${s}</span>
        <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${i}</span>
        <span class="badge badge--danger">Difícil ${n}</span>
      </div>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `,(c=e.querySelector("#btn-terminar"))==null||c.addEventListener("click",o)}function It(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${ie(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${R(t.colorKey)}"></span>`:""}${p(t.label)}`,i=a===e.length-1,n=t.route&&!i?`<button class="link" data-crumb="${p(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?n:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${n}`}).join("")}
    </div>
  `}function Dt(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>C(t.dataset.crumb))})}async function qe(e,t){var I,T,X,O,V,Y,G,Q,ee,J,te,b,L;const a=await qt(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await Ra(t),s=await ui(o.map(y=>y.id)),i=kt(o),n=await qa(a.perfil_id),c=Lt(o.map(y=>y.categoria)),r=[...o].sort((y,v)=>v.criado_em.localeCompare(y.criado_em))[0],l=((I=r==null?void 0:r.categoria)==null?void 0:I.trim())||void 0,u=((T=r==null?void 0:r.nome)==null?void 0:T.trim())||void 0,d=wa(a.cor,R(a.id)),m=ie(be(a)),f=$a(i.map(y=>y.categoria));e.innerHTML=`
    ${It([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:m.chave,iconColor:d}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${d}" aria-hidden="true">${m.svg}</span>${p(a.nome)}
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
            <button id="btn-avaliar" type="button">${x.dice} Avaliar notas</button>
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
        ${Ie(n,"input-categoria-espaco-editar")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${ja({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
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
        <input class="input${l?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${p(l??"")}" />
        ${l?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
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
        <div class="empty-state__icon" aria-hidden="true">${x.folder}</div>
        <div class="empty-state__title">Nenhum tema neste espaço ainda</div>
        <p class="empty-state__hint">Temas organizam as notas dentro de um espaço — ex: "Renda Fixa", "Renda Variável".</p>
        ${a.arquivado?"":'<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-tema" type="button">Criar o primeiro tema</button>'}
      </div>
    `:i.map(y=>{const v=f.get(At(y.categoria))??R(y.categoria||"sem-categoria"),$=ie(Na(y.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${v}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${v}" aria-hidden="true">${$.svg}</span>
            ${p(y.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${p(y.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${p(gs(y.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${y.itens.map(w=>`
            <button class="item-row" data-open="${p(w.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${v}">
              <span class="item-row__main">
                <span class="item-row__title">${w.favorito?`${x.star} `:""}${p(w.nome)}</span>
                <span class="item-row__meta">${s.get(w.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,Dt(e),Mt(e),za(e,{prefix:"editar-espaco",getTexto:()=>{var y,v;return`${((y=e.querySelector("#input-nome-espaco-editar"))==null?void 0:y.value)??""} ${((v=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:v.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(y=>{y.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),C(`espacos/${t}/pdf/${y.dataset.pdfCategoria}`)})}),(X=e.querySelector("#btn-arquivar"))==null||X.addEventListener("click",async()=>{!a.arquivado&&!await ae({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await dt(a.id,!a.arquivado),qe(e,t))});const E=e.querySelector("#form-editar-espaco");(O=e.querySelector("#btn-editar"))==null||O.addEventListener("click",()=>{var y;E.style.display="block",(y=e.querySelector("#input-nome-espaco-editar"))==null||y.focus()}),(V=e.querySelector("#btn-cancelar-edicao"))==null||V.addEventListener("click",()=>{E.style.display="none"}),(Y=e.querySelector("#btn-salvar-edicao"))==null||Y.addEventListener("click",async()=>{const y=e.querySelector("#input-nome-espaco-editar").value.trim(),v=e.querySelector("#input-categoria-espaco-editar").value.trim();y&&(await Hs(a.id,y,v,Pa(e,"editar-espaco")),qe(e,t))}),(G=e.querySelector("#btn-detalhes"))==null||G.addEventListener("click",async()=>{const y=Array.from(s.values()).reduce((M,U)=>M+U,0),v=F(),$=await oi(a.id);let w,q,D;if(a.arquivado&&a.arquivado_em){const M=_e(F(new Date(a.criado_em)),F(new Date(a.arquivado_em)));w=String(M),q="Dias até arquivar",D=`Criado em ${se(a.criado_em)} · arquivado em ${se(a.arquivado_em)}`}else if(a.arquivado)w="—",q="Duração",D=`Criado em ${se(a.criado_em)} · arquivado antes desse registro de data existir`;else{const M=_e(F(new Date(a.criado_em)),v);w=String(M),q=M===1?"Dia ativo":"Dias ativo",D=`Criado em ${se(a.criado_em)}`}Oa({title:a.nome,bodyHtml:`
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
        <p class="text-muted" style="margin:0;">${D} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(Q=e.querySelector("#btn-avaliar"))==null||Q.addEventListener("click",async()=>{const y=await Go(a.id),v={perfilId:a.perfil_id,espacoId:a.id,nomeContexto:a.nome,tipo:"espaco"};Ha(e,y,v,()=>qe(e,t))}),(ee=e.querySelector("#btn-excluir"))==null||ee.addEventListener("click",async()=>{const y=await Ta(a.id);await ae({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o espaço com ${y.temas} tema(s) e ${y.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ca(a.id),C("espacos"))});const h=e.querySelector("#form-novo-tema"),g=()=>{var y;h&&(h.style.display="block"),(y=e.querySelector("#input-nome-tema"))==null||y.focus()};(J=e.querySelector("#btn-novo-tema"))==null||J.addEventListener("click",g),(te=e.querySelector("#btn-empty-novo-tema"))==null||te.addEventListener("click",g),(b=e.querySelector("#btn-cancelar-tema"))==null||b.addEventListener("click",()=>{h&&(h.style.display="none")});const k=e.querySelector("#input-nome-tema");u&&k&&k.addEventListener("input",()=>fe(k),{once:!0});const S=e.querySelector("#input-categoria-tema");l&&S&&S.addEventListener("input",()=>fe(S),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(y=>{y.addEventListener("click",v=>{var $;v.preventDefault(),v.stopPropagation(),h&&(h.style.display="block"),S&&(S.value=y.dataset.novoTemaCategoria,fe(S)),($=e.querySelector("#input-nome-tema"))==null||$.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(L=e.querySelector("#btn-salvar-tema"))==null||L.addEventListener("click",async()=>{const y=e.querySelector("#input-nome-tema"),v=e.querySelector("#input-categoria-tema"),$=y.value.trim();if(!$)return;const w=await Ws(t,$,v.value.trim());C(`temas/${w.id}`)}),e.querySelectorAll("[data-open]").forEach(y=>{y.addEventListener("click",()=>C(`temas/${y.dataset.open}`))})}async function ui(e){const t=await A(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function mi(e){const t=await A(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(c=>!c.excluido),s=kt(o),i=yt()==="titulo",n=[];for(const c of s){const r=[];for(const l of c.itens){const u=(await t.getAllFromIndex("notas","tema_id",l.id)).filter(m=>!m.excluido);i?le(u,m=>m.titulo):u.sort((m,f)=>m.criado_em.localeCompare(f.criado_em));const d=[];for(const m of u){const E=(await t.getAllFromIndex("itens_revisao","nota_id",m.id)).map(h=>h.avaliacao).filter(h=>!!h);d.push({nota:m,fraca:ei(E)})}r.push({tema:l,notas:d})}n.push({categoria:c.categoria,temas:r})}return{espaco:a,grupos:n}}function Ke(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${Re.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const Jt=["•","◦","▪"];function Ua(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${Ke(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const i=Math.floor((t.length-t.trimStart().length)/2),n=Jt[Math.min(i,Jt.length-1)];return`${"  ".repeat(i)}${n} ${Ke(s[1])}`}return Ke(a)}).join(`
`)}function pi(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",Ua(e.conteudo)),t.join(`
`).trim()}function vi(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of t)if(o.temas.length!==0){a.push("",`▸ ${(o.categoria||"Sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.tema.favorito?"⭐ ":""}*${s.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const i of s.notas){const n=`${i.nota.favorito?"⭐ ":""}${i.fraca?"⚠ ":""}`;a.push("",`${n}*${i.nota.titulo||"(sem título)"}*`),i.nota.fonte&&a.push(`_${i.nota.fonte}_`),a.push(Ua(i.nota.conteudo))}}}return a.join(`
`).trim()}async function fi(e,t,a){var u,d;const o=await mi(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,i=a===void 0?o.grupos:o.grupos.filter(m=>m.categoria===a),n=vi(s,i),c=wa(s.cor,R(s.id)),r=ie(be(s));e.innerHTML=`
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
        ${a!==void 0?`Categoria: ${p(a||"Sem categoria")} · `:""}Gerado em ${se(F()+"T00:00:00Z")}
      </p>

      ${i.every(m=>m.temas.length===0)?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:i.map(m=>{const f=m.categoria?m.categoria.toLowerCase():s.id;return`
        <section class="pdf-category" style="--cat-accent:${R(f)}">
          <div class="pdf-category__title">
            <span class="color-dot" style="--dot-color:${R(f)}"></span>${p(m.categoria||"Sem categoria")}
          </div>
          ${m.temas.map(E=>{const h=E.tema.categoria?E.tema.categoria.toLowerCase():E.tema.id;return`
            <section class="pdf-tema" style="--tema-accent:${R(h)}">
              <div class="pdf-tema__title">${E.tema.favorito?`${x.star} `:""}${p(E.tema.nome)}</div>
              ${E.notas.length===0?'<p class="text-muted">Sem notas.</p>':E.notas.map(g=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${g.nota.favorito?`${x.star} `:""}${g.fraca?`${x.alert} Reforçar — `:""}${p(g.nota.titulo||"(sem título)")}
                  </div>
                  ${g.nota.fonte?`<div class="pdf-nota__meta">${p(g.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${Fe(g.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `}).join("")}
        </section>
      `}).join("")}
    </article>
  `,(u=e.querySelector("[data-back]"))==null||u.addEventListener("click",()=>C(`espacos/${t}`)),(d=e.querySelector("#btn-imprimir"))==null||d.addEventListener("click",()=>window.print());const l=e.querySelector("#btn-copiar");l==null||l.addEventListener("click",async()=>{const m=l.textContent;try{await navigator.clipboard.writeText(n),l.textContent="Copiado!"}catch{l.textContent="Não foi possível copiar"}setTimeout(()=>{l.textContent=m},1800)})}async function Me(e,t){var l,u,d,m,f,E,h,g,k;const a=await Fa(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await qt(a.espaco_id),s=await va(t),i=o?await Ra(o.id):[],n=Lt(i.map(S=>S.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${It([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

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
            <button id="btn-avaliar-tema" type="button">${x.dice} Avaliar notas</button>
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
        ${Ie(n,"input-categoria-tema-editar")}
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
        ${s.map(S=>`
          <button class="item-row" data-open="${p(S.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${R(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${S.favorito?`${x.star} `:""}${p(S.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${p(S.fonte||"Sem fonte")}${S.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${S.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,Dt(e),Mt(e),(l=e.querySelector("#btn-nova-nota"))==null||l.addEventListener("click",()=>C(`temas/${t}/nova-nota`)),(u=e.querySelector("#btn-empty-nova-nota"))==null||u.addEventListener("click",()=>C(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(S=>{S.addEventListener("click",()=>C(`notas/${S.dataset.open}`))}),(d=e.querySelector("#btn-favoritar-tema"))==null||d.addEventListener("click",async()=>{await Xs(a.id),Me(e,t)}),(m=e.querySelector("#btn-detalhes-tema"))==null||m.addEventListener("click",async()=>{const S=await si(a.id),I=_e(F(new Date(a.criado_em)),F());Oa({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${wt(S)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${I}</div>
            <div class="stat-tile__label">${I===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${se(a.criado_em)}</p>
      `})}),(f=e.querySelector("#btn-avaliar-tema"))==null||f.addEventListener("click",()=>{const S=s.map(T=>({nota:T,tema:a})),I={perfilId:o.perfil_id,espacoId:a.espaco_id,nomeContexto:a.nome,tipo:"tema"};Ha(e,S,I,()=>Me(e,t))});const r=e.querySelector("#form-editar-tema");(E=e.querySelector("#btn-editar-tema"))==null||E.addEventListener("click",()=>{var S;r.style.display="block",(S=e.querySelector("#input-nome-tema-editar"))==null||S.focus()}),(h=e.querySelector("#btn-cancelar-edicao-tema"))==null||h.addEventListener("click",()=>{r.style.display="none"}),(g=e.querySelector("#btn-salvar-edicao-tema"))==null||g.addEventListener("click",async()=>{const S=e.querySelector("#input-nome-tema-editar").value.trim(),I=e.querySelector("#input-categoria-tema-editar").value.trim();S&&(await Zs(a.id,S,I),Me(e,t))}),(k=e.querySelector("#btn-excluir-tema"))==null||k.addEventListener("click",async()=>{const S=await Qs(a.id);await ae({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o tema com ${S.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Js(a.id),C(`espacos/${a.espaco_id}`))})}function Se(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${p(e)}</div>
    </details>
  `}let Oe=!1,pt=null;function gi(e){Oe=e}function Yt(){Oe=!1}function bi(e){pt=e}function ye(){return Oe?pt?pt():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function hi(){window.addEventListener("beforeunload",e=>{Oe&&(e.preventDefault(),e.returnValue="")})}const yi={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function We(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function De(e,t){var Q,ee,J,te,b,L,y;const a=t.mode==="nova"?t.temaId:(Q=await Ut(t.notaId))==null?void 0:Q.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await Fa(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await qt(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${p(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(ee=e.querySelector("#btn-voltar-arquivado"))==null||ee.addEventListener("click",()=>C(`temas/${a}`));return}const i=t.mode==="editar"?await Ut(t.notaId):void 0,n=i?await _i(i.id):!1,c=t.mode==="nova"?(await va(a)).at(-1):void 0,r=c==null?void 0:c.titulo,l=c==null?void 0:c.fonte;e.innerHTML=`
    ${It([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(i==null?void 0:i.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&i?`<div class="section-header__meta text-muted">Criada em ${se(i.criado_em)}${i.atualizado_em!==i.criado_em?` · Editada em ${se(i.atualizado_em)}`:""}</div>`:""}
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
        <label class="field__label" for="input-titulo">Título${Se('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${r?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${p((i==null?void 0:i.titulo)??r??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${r?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${Se("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${l?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${p((i==null?void 0:i.fonte)??l??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${l?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
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
          <button type="button" class="editor-toolbar__btn" data-cmd="undo" title="Desfazer (Ctrl+Z)" aria-label="Desfazer">${x.undo}</button>
          <button type="button" class="editor-toolbar__btn" data-cmd="redo" title="Refazer (Ctrl+Y ou Ctrl+Shift+Z)" aria-label="Refazer">${x.redo?x.redo:x.undo}</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <div class="color-picker" role="group" aria-label="Cor do texto">
            ${Re.map(v=>`<button type="button" class="color-picker__swatch" data-cor="${v}" style="--dot-color:${yi[v]}" title="${p(Kt[v])}" aria-label="${p(Kt[v])}"></button>`).join("")}
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
        >${i!=null&&i.conteudo?Fe(i.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${i!=null&&i.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${Se("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
        </div>
      </div>

      <div class="field" id="wrapper-validade" style="display:${i!=null&&i.pode_desatualizar?"flex":"none"};">
        <label class="field__label" for="input-validade">Válido até</label>
        <input class="input" id="input-validade" type="date" value="${p((i==null?void 0:i.validade_ate)??"")}" style="max-width: 200px;" />
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
  `;const u=`temas/${a}`;Dt(e),(J=e.querySelector("#btn-cancelar"))==null||J.addEventListener("click",()=>{ye()&&(Yt(),C(u))});const d=e.querySelector("#input-conteudo"),m=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),E=()=>gi(!0);m.addEventListener("input",E),f.addEventListener("input",E),d.addEventListener("input",E),bi(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),r&&m.addEventListener("input",()=>fe(m),{once:!0}),l&&f.addEventListener("input",()=>fe(f),{once:!0}),d.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function h(v){var w,q;let $=((q=(w=window.getSelection())==null?void 0:w.getRangeAt(0))==null?void 0:q.commonAncestorContainer)??null;for(;$&&$!==d;){if($ instanceof HTMLElement&&$.tagName===v)return!0;$=$.parentNode}return!1}function g(){const v=window.getSelection();if(!v||v.rangeCount===0)return;let $=v.getRangeAt(0).commonAncestorContainer;for(;$&&$!==d;){if($ instanceof HTMLElement&&$.tagName==="LI"){const w=document.createRange();w.selectNodeContents($),w.collapse(!1),v.removeAllRanges(),v.addRange(w);return}$=$.parentNode}}function k(){d.querySelectorAll("p").forEach(v=>{v.querySelector("ul")&&v.replaceWith(...Array.from(v.childNodes))})}function S(){const v=window.getSelection(),$=v.getRangeAt(0);$.deleteContents();const w=document.createElement("br");$.insertNode(w);const q=document.createTextNode("​");w.after(q);const D=document.createRange();return D.setStart(q,1),D.collapse(!0),v.removeAllRanges(),v.addRange(D),{br:w,ancora:q}}function I(){if(!T)return;const{br:v,ancora:$}=T;if(T=null,!document.contains($))return;const w=$.parentNode;if(!w)return;const q=Array.from(w.childNodes).indexOf($);$.remove();const D=window.getSelection();if(!D||!document.contains(v))return;const M=document.createRange();M.setStart(w,q),M.collapse(!0),D.removeAllRanges(),D.addRange(M)}let T=null;d.addEventListener("keydown",v=>{if(v.key!=="Enter"||v.shiftKey||v.ctrlKey||v.metaKey||v.altKey||h("LI")){T=null;return}v.preventDefault(),T&&document.contains(T.br)?(T.ancora.remove(),T.br.remove(),document.execCommand("insertParagraph"),T=null):T=S()}),d.addEventListener("mousedown",()=>{T=null}),d.addEventListener("keydown",v=>{v.key!=="Tab"||!h("LI")||(v.preventDefault(),I(),document.execCommand(v.shiftKey?"outdent":"indent"),k())});function X(){var v;d.classList.toggle("is-empty",!((v=d.textContent)!=null&&v.trim()))}d.addEventListener("input",()=>{if(d.childNodes.length===0){d.innerHTML="<p><br></p>";const v=d.firstChild,$=document.createRange();$.setStart(v,0),$.collapse(!0);const w=window.getSelection();w==null||w.removeAllRanges(),w==null||w.addRange($)}X()}),X(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(v=>{v.addEventListener("mousedown",$=>$.preventDefault()),v.addEventListener("click",()=>{I();const $=v.dataset.cmd;if($==="strikeThrough")document.execCommand("strikeThrough");else if($==="createLink"){const w=window.getSelection();if(!w||w.isCollapsed){d.focus();return}const q=prompt("URL do link:","https://");q&&q.trim()&&document.execCommand("createLink",!1,q.trim())}else $==="removeFormat"?document.execCommand("removeFormat"):document.execCommand($);$==="insertUnorderedList"&&(k(),g()),d.focus(),G()})}),e.querySelectorAll(".color-picker__swatch").forEach(v=>{v.addEventListener("mousedown",$=>$.preventDefault()),v.addEventListener("click",()=>{I();const $=v.dataset.cor,w=window.getSelection();if(!w||w.rangeCount===0||w.isCollapsed)return;const q=w.getRangeAt(0);if(!d.contains(q.commonAncestorContainer))return;const D=q.extractContents();We(D);const M=document.createElement("span");M.className=`text-color text-color--${$}`,M.appendChild(D),q.insertNode(M),w.removeAllRanges();const U=document.createRange();U.selectNodeContents(M),w.addRange(U),d.focus()})});const O=e.querySelector("[data-cor-limpar]");O.addEventListener("mousedown",v=>v.preventDefault()),O.addEventListener("click",()=>{I();const v=window.getSelection();if(!v||v.rangeCount===0)return;const $=v.getRangeAt(0);if(d.contains($.commonAncestorContainer)){if($.collapsed){let w=$.commonAncestorContainer;for(;w&&w!==d;){if(w instanceof HTMLElement&&w.classList.contains("text-color")){const q=w.parentNode;if(q){const D=document.createDocumentFragment();Array.from(w.childNodes).forEach(M=>D.appendChild(M)),q.replaceChild(D,w),We(q)}break}w=w.parentNode}}else{const w=$.extractContents();We(w),$.insertNode(w)}d.focus()}});const V=e.querySelector("#input-pode-desatualizar"),Y=e.querySelector("#wrapper-validade");V.addEventListener("change",()=>{Y.style.display=V.checked?"flex":"none"});function G(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach($=>{const w=$.dataset.cmd;try{w==="bold"||w==="italic"||w==="underline"||w==="strikeThrough"||w==="insertUnorderedList"?$.setAttribute("aria-pressed",document.queryCommandState(w)?"true":"false"):$.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===d&&G()}),d.addEventListener("keyup",G),d.addEventListener("mouseup",G),d.addEventListener("focus",G),d.addEventListener("keydown",v=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?v.metaKey:v.ctrlKey))return;let q=!0;switch(v.key.toLowerCase()){case"b":v.preventDefault(),document.execCommand("bold");break;case"i":v.preventDefault(),document.execCommand("italic");break;case"u":v.preventDefault(),document.execCommand("underline");break;case"s":v.preventDefault(),document.execCommand("strikeThrough");break;case"k":v.preventDefault(),I();const D=window.getSelection();if(D&&!D.isCollapsed){const M=prompt("URL do link:","https://");M&&M.trim()&&document.execCommand("createLink",!1,M.trim())}break;case"z":v.preventDefault(),v.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":v.preventDefault(),document.execCommand("redo");break;default:q=!1}q&&G()}),(te=e.querySelector("#btn-salvar"))==null||te.addEventListener("click",async()=>{const v=m.value.trim(),$=Cs(d).trim();let w=null;const q=(U,He)=>{var xe;U.classList.add("input--error"),U.setAttribute("aria-invalid","true");const Ee=(xe=U.closest(".field"))==null?void 0:xe.querySelector(".field__error");Ee&&(Ee.textContent=He,Ee.style.display="block"),w||(w=U)},D=U=>{U.classList.remove("input--error"),U.removeAttribute("aria-invalid")};if(v||q(m,"Informe um título para a nota."),$||q(d,"Informe o conteúdo da nota."),w){w.focus();return}D(m),D(d);const M={titulo:v,conteudo:$,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:V.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await Ko(a,M):await Wo(t.notaId,M),Yt(),C(u)}),t.mode==="editar"&&i){(b=e.querySelector("#btn-favoritar-nota"))==null||b.addEventListener("click",async()=>{await Zo(i.id),De(e,t)}),(L=e.querySelector("#btn-parar-revisar"))==null||L.addEventListener("click",async()=>{await qs(i.id),De(e,t)});const v=e.querySelector("#btn-compartilhar-nota");v==null||v.addEventListener("click",async()=>{const $=pi(i);if(navigator.share){try{await navigator.share({title:i.titulo||"Nota",text:$})}catch{}return}const w=v.textContent;try{await navigator.clipboard.writeText($),v.textContent="Copiado!"}catch{v.textContent="Não foi possível copiar"}setTimeout(()=>{v.textContent=w},1800)}),(y=e.querySelector("#btn-excluir-nota"))==null||y.addEventListener("click",async()=>{await ae({title:"Excluir esta nota?",message:"A nota vai pra Lixeira e dá pra restaurar em Configurações → Lixeira por até 30 dias."})&&(await Xo(i.id),C(u))})}}async function _i(e){return(await(await A()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function wi(e){return e.length===10?e:F(new Date(e))}function $i(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function Ei(e){const t=new Set;for(const a of e)a&&t.add(wi(a));return t}function Ga(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Ze(e){return e.size}function xi(e,t,a=365,o=F()){const s=K(o,-a+1),i=[];let n=s;for(;n<=o;)i.push({date:n,count:(e.has(n)?1:0)+(t.has(n)?1:0),hasRevisao:e.has(n),hasCriacao:t.has(n)}),n=K(n,1);const c=Ze(e),r=Ze(t),l=Ze(Ga(e,t));return{days:i,totalDiasRevisao:c,totalDiasCriacao:r,totalDiasAtividade:l}}async function Ka(e){const t=await A(),a=F(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const S=await t.getAllFromIndex("espacos","perfil_id",e),T=(await Promise.all(S.map(O=>t.getAllFromIndex("temas","espaco_id",O.id)))).flat();return(await Promise.all(T.map(O=>t.getAllFromIndex("notas","tema_id",O.id)))).flat()})()]),i=o.filter(S=>S.data_concluida).map(S=>S.data_concluida),n=$i(i),c=Ei(s.map(S=>S.criado_em)),r=o.filter(S=>S.data_concluida===a).length,l=s.filter(S=>F(new Date(S.criado_em))===a).length,u=a.slice(0,4),d=a.slice(5,7),m=`${u}-${d}`,f=i.filter(S=>S.startsWith(m)).length,E=s.filter(S=>F(new Date(S.criado_em)).startsWith(m)).length,h=n.size,g=c.size,k=Ga(n,c).size;return{datasRevisaoSet:n,datasCriacaoSet:c,totalDiasRevisao:h,totalDiasCriacao:g,totalDiasAtividade:k,notasCriadasHoje:l,revisoesFeitasHoje:r,notasCriadasEsteMes:E,revisoesFeitasEsteMes:f}}async function Si(e,t=365){const a=await Ka(e);return xi(a.datasRevisaoSet,a.datasCriacaoSet,t)}function Ai(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function ki(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const i=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let r=0;r<i;r++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const r of e)s.push(r),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(r=>`
          <div class="heatmap__col">
            ${r.map(l=>`
              <div class="heatmap__cell heatmap__cell--${Ai(l.count)}${l.date?"":" heatmap__cell--empty"}" title="${l.date?`${l.date}${l.count?` · ${l.count} atividade(s)`:""}${l.hasRevisao&&l.hasCriacao?" (revisão + criação)":l.hasRevisao?" (revisão)":l.hasCriacao?" (criação)":""}`:""}"></div>
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
  `}const Li={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function qi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Mi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Ti(e,t){const a=await ai(t.perfilId),o=await Ka(t.perfilId),s=await Si(t.perfilId,365),i=await ni(t.perfilId),n=["dom","seg","ter","qua","qui","sex","sáb"],c=new Date().getDay(),r=Math.max(1,...a.cargaProximos7.map(m=>m.count)),l=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null,u=i.total>0?{facil:Math.round(i.facil/i.total*100),medio:Math.round(i.medio/i.total*100),dificil:Math.round(i.dificil/i.total*100)}:null;e.innerHTML=`
    <div class="tabs" role="tablist" aria-label="Painel">
      <button class="tabs__tab" role="tab" aria-selected="true" data-tab="visao">Visão geral</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="avaliacoes">Avaliações</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="evolucao">Evolução</button>
    </div>

    <div id="tab-visao" role="tabpanel">
      <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

      <div class="streak-hero">
        <div class="streak-hero__flame" aria-hidden="true">${x.flame}</div>
        <div class="streak-hero__count">${a.streakDias}</div>
        <div class="streak-hero__label">${a.streakDias===1?"dia seguido estudando":"dias seguidos estudando"}</div>
        <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${a.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
          ${a.diasAtivosUltimos7.map((m,f)=>{const E=(c-(6-f)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${m?"streak-hero__day--ativo":""}"></span>
                  <span class="streak-hero__day-label">${n[E]}</span>
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
        ${a.porEstagio.map(m=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${m.count}</div>
            <div class="stage-tile__label">${Li[m.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${x.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(m=>`${m.count} em ${Mi(m.data)}`).join(", ")}">
        ${a.cargaProximos7.map(m=>{const f=qi(m.data);return`
            <div class="load-chart__col">
              <div class="load-chart__val">${m.count}</div>
              <div class="load-chart__bar">
                <div class="load-chart__fill" style="height: ${m.count/r*100}%"></div>
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
          ${a.rankingDificeis.map((m,f)=>`
            <div class="rank-row">
              <span>${f+1}. ${p(m.temaNome)}</span>
              <span class="badge badge--danger">${m.count}× difícil</span>
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
            <div class="stat-tile__value">${u.facil}%</div>
            <div class="stat-tile__label">Fácil</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${u.dificil}%</div>
            <div class="stat-tile__label">Difícil</div>
          </div>
        </div>

        <div class="retention-bar" role="img" aria-label="Fácil ${u.facil}%, Médio ${u.medio}%, Difícil ${u.dificil}%">
          <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${u.dificil}%"></div>
          <div class="retention-bar__fill retention-bar__fill--medio" style="width:${u.medio}%"></div>
          <div class="retention-bar__fill retention-bar__fill--facil" style="width:${u.facil}%"></div>
        </div>
        <div class="retention-legend">
          <span class="badge badge--danger">Difícil ${u.dificil}%</span>
          <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${u.medio}%</span>
          <span class="badge badge--success">Fácil ${u.facil}%</span>
          ${i.ultimaEm?`<span class="text-muted" style="font-size: var(--font-size-xs);">última: ${p(ce(i.ultimaEm))}</span>`:""}
        </div>

        <div class="section-header">
          <span class="section-header__title" style="font-size: var(--font-size-base);">Sessões recentes</span>
        </div>
        <div class="rank-list">
          ${i.sessoes.map(m=>`
            <div class="rank-row">
              <span>${p(m.contexto)} <span class="text-muted">· ${m.total} nota(s) · ${p(ce(m.criado_em))}</span></span>
              <span style="display:flex; gap: var(--space-2); flex-wrap:wrap; justify-content:flex-end;">
                ${m.facil>0?`<span class="badge badge--success">${m.facil} fácil</span>`:""}
                ${m.medio>0?`<span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">${m.medio} médio</span>`:""}
                ${m.dificil>0?`<span class="badge badge--danger">${m.dificil} difícil</span>`:""}
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
      ${ki(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `;const d=["visao","avaliacoes","evolucao"];e.querySelectorAll(".tabs__tab").forEach(m=>{m.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(f=>{f.setAttribute("aria-selected",String(f===m))});for(const f of d){const E=e.querySelector(`#tab-${f}`);E&&(E.style.display=m.dataset.tab===f?"block":"none")}})})}async function Ci(e){const t=await A(),a=(await t.getAllFromIndex("espacos","perfil_id",e)).filter(l=>!l.excluido),o=await Promise.all(a.map(l=>t.getAllFromIndex("temas","espaco_id",l.id))),s=[],i=[],n=new Map;for(let l=0;l<a.length;l++){const u=a[l],d=o[l].filter(m=>!m.excluido);for(const m of d)n.set(m.id,u),m.favorito&&s.push({tema:m,espaco:u})}const c=o.flat().filter(l=>!l.excluido),r=await Promise.all(c.map(l=>t.getAllFromIndex("notas","tema_id",l.id)));for(let l=0;l<c.length;l++){const u=c[l],d=r[l].filter(f=>!f.excluido),m=n.get(u.id);if(m)for(const f of d)f.favorito&&i.push({nota:f,tema:u,espaco:m})}return{temas:le(s,l=>l.tema.nome),notas:le(i,l=>l.nota.titulo||l.tema.nome)}}async function Ii(e,t){var l;const{temas:a,notas:o}=await Ci(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${x.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(l=e.querySelector("#btn-empty-espacos"))==null||l.addEventListener("click",()=>C("espacos"));return}const s=new Map;for(const u of a){const d=s.get(u.espaco.id)??{espaco:u.espaco,itens:[]};d.itens.push(u),s.set(u.espaco.id,d)}const i=new Map;for(const u of o){const d=i.get(u.tema.id)??{temaNome:u.tema.nome,espaco:u.espaco,itens:[]};d.itens.push(u),i.set(u.tema.id,d)}const n=new Map;for(const u of a)n.set(u.espaco.id,u.espaco);for(const u of o)n.set(u.espaco.id,u.espaco);const c=Ea([...n.values()]),r=u=>{const d=c.get(u.id)??R(u.id),m=ie(be(u));return`<span class="espaco-icon-inline" style="--badge-accent:${d}" aria-hidden="true">${m.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??R(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${p(u.espaco.nome)}
          </div>
          <div class="item-list">
            ${u.itens.map(d=>`
              <button class="item-row" data-tema="${p(d.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??R(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${p(d.tema.nome)}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}

    ${o.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${a.length>0?"var(--space-6)":"0"};">Notas favoritas</div>
      ${Array.from(i.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??R(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${p(u.temaNome)} <span class="queue-group__espaco"> · ${p(u.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${u.itens.map(d=>`
              <button class="item-row" data-nota="${p(d.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??R(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${x.star} ${p(d.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${p(d.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(u=>{u.addEventListener("click",()=>C(`temas/${u.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(u=>{u.addEventListener("click",()=>C(`notas/${u.dataset.nota}`))})}const Di=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Ni=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,ji=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,zi=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      nuvem</b> para ver as versões e trazer uma de volta, se precisar.</p>`},{titulo:"Avaliar notas (Fácil / Médio / Difícil)",corpoHtml:`<p>No menu "⋯" de um Espaço ou Tema, toque em <b>Avaliar notas</b> para fazer um
      autoteste. Num Espaço com vários Temas você escolhe o <b>escopo</b>: avaliar
      <b>todo o Espaço</b> ou só um <b>Tema específico</b>. Depois escolhe quantas notas
      (Básico, Médio ou Longo).</p>
      <p>Em cada nota: tente lembrar, revele a resposta e marque <b>Fácil</b>, <b>Médio</b> ou
      <b>Difícil</b>. Tudo fica registrado no app — diferente da revisão espaçada, nada aqui
      muda sua fila nem os seus prazos.</p>
      <p>O resultado aparece no <b>Painel → aba Avaliações</b>: quanto você já avaliou, a
      distribuição entre Fácil/Médio/Difícil e o histórico de sessões recentes.</p>`}];function Pi(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${Di}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Ni}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${ji}</pre>
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

      ${zi.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function Ri(e){return e.replace(/-/g,"")}function Fi(e,t){const[a,o]=t.split(":");return`${Ri(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function Oi(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function Hi(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function Bi(e){const t=Fi(Z(),e),a=Oi(new Date),o=Hi("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${oe()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function Vi(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const Ui="https://api.github.com",Gi="Memoriza — sincronização de anotações",$e="memoriza-sync.json";function Nt(e){return(t,a={})=>fetch(`${Ui}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function Ki(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&$e in s.files))==null?void 0:o.id)??null}async function Wi(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:Gi,public:!1,files:{[$e]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function Zi(e,t){var s,i;const a=await e(`/gists/${t}`);return a.ok?((i=(s=(await a.json()).files)==null?void 0:s[$e])==null?void 0:i.content)??null:null}async function Wa(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[$e]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function Za(e){const t=Nt(e);let a=Ne();if(!a){const n=await Ki(t);n&&(a=n,et(n))}let o=null,s=!1,i=await we();if(a){const n=await Zi(t,a);if(n)try{const c=ze(n);o=await Pe(c),i=await we(),s=!0}catch{}}return a?await Wa(t,a,JSON.stringify(i)):(a=await Wi(t,JSON.stringify(i)),et(a)),ht(z()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??Xa(),push:!0,mesclouRemoto:s}}async function Xi(e,t=30){const a=Ne();if(!a)throw new Error("Nenhum backup sincronizado ainda.");const s=await Nt(e)(`/gists/${a}`);if(!s.ok)throw new Error("Não foi possível ler o histórico do backup. Confira o token.");return((await s.json()).history??[]).slice(0,t).map(n=>({version:n.version,committed_at:n.committed_at}))}async function Qi(e,t,a,o){var c;const s=await e(`/gists/${a}/${o}`);if(!s.ok)return null;const n=(c=(await s.json()).files)==null?void 0:c[$e];if(!n)return null;if(n.truncated&&n.raw_url){const r=await fetch(n.raw_url,{headers:{Authorization:`Bearer ${t}`}});return r.ok?r.text():null}return n.content??null}async function Ji(e,t){const a=Nt(e),o=Ne();if(!o)throw new Error("Nenhum backup sincronizado ainda.");const s=await Qi(a,e,o,t);if(!s)throw new Error("Não foi possível ler essa versão do backup.");const i=await Pe(ze(s)),n=await we();return await Wa(a,o,JSON.stringify(n)),ht(z()),{...i,porLoja:i.porLoja??Xa(),push:!0,mesclouRemoto:!0}}function Xa(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function Yi(e){const t=bt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const en=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],tn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}],an={espaco:"Espaço",tema:"Tema",nota:"Nota"};function on(e){const t=[`${an[e.tipo]} em ${e.contexto}`];return e.temas&&t.push(`${e.temas} tema(s)`),e.notas&&t.push(`${e.notas} nota(s)`),e.excluido_em&&t.push(`excluído em ${ce(e.excluido_em)}`),t.join(" · ")}function sn(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function nn(e){const t=`${ce(e.criado_em)} · ${sn(e.bytes)}`;return`${e.automatico?"Automático":"Manual"} · ${t}`}function rn(e){return ce(e.committed_at)}async function W(e,t){var S,I,T,X,O,V,Y,G,Q,ee,J,te;const a=fo(),o=io(),s=await $t(),i=lo(t.perfil.id),n=gt(),c=sa(),r=bt(),l=Ne(),u=yt(),d=await Bo(t.perfil.id),m=await us();e.innerHTML=`
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
            ${s.map(b=>`
              <div class="settings-list-row" data-perfil-id="${p(b.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${p(b.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${p(b.id)}" type="button">Renomear</button>
                  ${s.length>1?`
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${p(b.id)}" data-nome="${p(b.nome)}" class="danger" type="button">Excluir perfil</button>
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
              ${en.map(b=>`
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
              ${tn.map(b=>`
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${b.value}"
                  aria-pressed="${b.value===u}"
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
                ${o?`Último export: ${p(ce(o))}.`:"Nenhum export feito ainda."}
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
          ${m.length===0?'<p class="text-muted" style="margin:0;">Nenhum snapshot ainda.</p>':`<div>
                  ${m.map(b=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${p(nn(b))}</div>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-snapshot-restaurar="${p(b.id)}" type="button">Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-snapshot-remover="${p(b.id)}" type="button">Apagar</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${x.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${pa} dias o item é
            removido de vez, sozinho.
          </p>
          ${d.length===0?'<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>':`<div>
                  ${d.map(b=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${p(b.nome)}</div>
                        <p class="settings-row__desc">${p(on(b))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${p(b.id)}" data-tipo="${b.tipo}" type="button">${x.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${p(b.id)}" data-tipo="${b.tipo}" data-nome="${p(b.nome)}" type="button">Excluir de vez</button>
                      </div>
                    </div>
                  `).join("")}
                </div>`}
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
                value="${p(n)}"
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
            ${r?`<div class="banner banner--success" style="margin-bottom:0;">${x.check} Última sincronização: ${p(ce(r))}${l?".":""}</div>`:n?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
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
            <input class="input" id="input-hora-lembrete" type="time" value="${p(i)}" />
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

  `,(S=e.querySelector("#btn-switch-profile"))==null||S.addEventListener("click",()=>{t.onSwitchProfile()}),(I=e.querySelector("#btn-como-usar"))==null||I.addEventListener("click",()=>C("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(b=>{b.addEventListener("click",()=>{const L=b.dataset.theme;vo(L),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(y=>{y.setAttribute("aria-pressed",String(y===b))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(b=>{b.addEventListener("click",()=>{po(b.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(L=>{L.setAttribute("aria-pressed",String(L===b))})})}),(T=e.querySelector("#btn-export-profile"))==null||T.addEventListener("click",async()=>{const b=await as(t.perfil.id);Gt(b),Pt(b.exportado_em),W(e,t)}),(X=e.querySelector("#btn-export-all"))==null||X.addEventListener("click",async()=>{const b=await we();Gt(b),Pt(b.exportado_em),W(e,t)});const f=e.querySelector("#import-file");(O=e.querySelector("#btn-import"))==null||O.addEventListener("click",()=>{f==null||f.click()}),f==null||f.addEventListener("change",async()=>{const b=e.querySelector("#import-summary"),[L]=f.files??[];if(!(!L||!b))try{const y=await L.text(),v=ze(y);await rt({titulo:"Antes de importar"});const $=await Pe(v);b.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${$.criados} criados, ${$.atualizados} atualizados,
          ${$.mantidos} mantidos como estavam.
        </div>
      `}catch(y){b.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${p(y instanceof Error?y.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{f.value=""}});const E=e.querySelector("#form-novo-perfil");(V=e.querySelector("#btn-novo-perfil"))==null||V.addEventListener("click",()=>{var b;E.style.display="block",(b=e.querySelector("#input-novo-perfil"))==null||b.focus()}),(Y=e.querySelector("#btn-cancelar-perfil"))==null||Y.addEventListener("click",()=>{E.style.display="none"}),(G=e.querySelector("#btn-salvar-perfil"))==null||G.addEventListener("click",async()=>{const L=e.querySelector("#input-novo-perfil").value.trim();L&&(await ca(L),W(e,t))}),e.querySelectorAll("[data-renomear]").forEach(b=>{b.onclick=()=>{var D;const L=b.dataset.renomear,y=e.querySelector(`[data-perfil-id="${L}"]`),v=y==null?void 0:y.querySelector("[data-view-nome]");if(!y||!v)return;const $=((D=v.textContent)==null?void 0:D.trim())??"";v.innerHTML=`
        <input class="input" type="text" value="${p($)}" maxlength="60" style="max-width:200px;" />
      `;const w=v.querySelector("input");w.focus(),w.select(),b.textContent="Salvar";const q=async()=>{const M=w.value.trim();M&&(await zo(L,M),L===t.perfil.id&&(t.perfil={...t.perfil,nome:M})),W(e,t)};w.addEventListener("keydown",M=>{M.key==="Enter"&&q()}),b.onclick=q}}),e.querySelectorAll("[data-excluir-perfil]").forEach(b=>{b.addEventListener("click",async()=>{const L=b.dataset.excluirPerfil,y=b.dataset.nome??"",v=await Po(L);await ae({title:`Excluir o perfil "${y}"?`,message:`Isso vai apagar ${v.espacos} espaço(s), ${v.temas} tema(s) e ${v.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await Ro(L),L===t.perfil.id?t.onSwitchProfile():W(e,t))})}),(Q=e.querySelector("#btn-baixar-lembrete"))==null||Q.addEventListener("click",()=>{const b=e.querySelector("#input-hora-lembrete").value||"19:00";uo(t.perfil.id,b),Vi(Bi(b))});const h=e.querySelector("#sync-status"),g=e.querySelector("#btn-sync-now");g==null||g.addEventListener("click",async()=>{const L=e.querySelector("#input-github-token").value.trim();if(!L){h&&(h.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Rt(L),g.disabled=!0,h&&(h.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Sincronizando…</div>`);try{const y=await Za(L);if(h){const v=[y.criados>0?`${y.criados} novo(s)`:null,y.atualizados>0?`${y.atualizados} atualizado(s)`:null].filter(Boolean);h.innerHTML=`
          <div class="banner banner--success" role="status">
            ${x.check} Sincronizado!${v.length>0?` ${v.join(", ")} baixado(s).`:""}
            ${y.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}W(e,t)}catch(y){g.disabled=!1,h&&(h.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${p(y instanceof Error?y.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(ee=e.querySelector("#btn-limpar-token"))==null||ee.addEventListener("click",async()=>{await ae({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Rt(""),et(""),ht(""),W(e,t))}),(J=e.querySelector("#sync-auto"))==null||J.addEventListener("change",b=>{mo(b.target.checked)}),e.querySelectorAll("[data-restaurar]").forEach(b=>{b.addEventListener("click",async()=>{b.disabled=!0,await Vo(b.dataset.tipo,b.dataset.restaurar),W(e,t)})}),e.querySelectorAll("[data-expurgar]").forEach(b=>{b.addEventListener("click",async()=>{const L=b.dataset.nome??"";await ae({title:`Excluir "${L}" de vez?`,message:"O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia."})&&(b.disabled=!0,await ke(b.dataset.tipo,b.dataset.expurgar),W(e,t))})}),(te=e.querySelector("#btn-snapshot-criar"))==null||te.addEventListener("click",async()=>{const b=e.querySelector("#btn-snapshot-criar");b.disabled=!0,await rt({}),W(e,t);const L=e.querySelector("#snapshot-status");L&&(L.innerHTML=`<div class="banner banner--success" role="status">${x.check} Snapshot criado.</div>`)}),e.querySelectorAll("[data-snapshot-restaurar]").forEach(b=>{b.addEventListener("click",async()=>{if(!await ae({title:"Restaurar este snapshot?",message:"Os dados do snapshot serão mesclados com os atuais. Nada local é apagado."}))return;b.disabled=!0,await ps(b.dataset.snapshotRestaurar);const y=e.querySelector("#snapshot-status");y&&(y.innerHTML=`<div class="banner banner--success" role="status">${x.check} Snapshot restaurado (mesclado).</div>`)})}),e.querySelectorAll("[data-snapshot-remover]").forEach(b=>{b.addEventListener("click",async()=>{await ms(b.dataset.snapshotRemover),W(e,t)})});const k=e.querySelector("#btn-gist-revisoes");k==null||k.addEventListener("click",async()=>{const b=e.querySelector("#gist-revisoes"),y=e.querySelector("#input-github-token").value.trim()||n;if(!(!y||!b)){k.disabled=!0,b.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Carregando…</div>`;try{const v=await Xi(y);if(v.length===0){b.innerHTML='<div class="banner banner--muted" role="status">Ainda não há versões anteriores.</div>';return}b.innerHTML=`
        <div>
          ${v.map($=>`
            <div class="settings-list-row">
              <div class="settings-row__label">${p(rn($))}</div>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-gist-restaurar="${p($.version)}" type="button">Restaurar</button>
              </div>
            </div>
          `).join("")}
        </div>
      `,cn(e,y,b)}catch(v){b.innerHTML=`<div class="banner banner--warning" role="alert">${p(v instanceof Error?v.message:"Não foi possível carregar o histórico.")}</div>`}finally{k.disabled=!1}}})}function cn(e,t,a){e.querySelectorAll("[data-gist-restaurar]").forEach(o=>{o.addEventListener("click",async()=>{if(await ae({title:"Restaurar esta versão do backup?",message:"A versão escolhida será mesclada com os dados atuais e o backup na nuvem será atualizado. Nada local é apagado."})){o.disabled=!0,a.innerHTML=`<div class="banner banner--muted" role="status">${x.sync} Restaurando…</div>`;try{const i=await Ji(t,o.dataset.gistRestaurar);a.innerHTML=`<div class="banner banner--success" role="status">${x.check} Backup restaurado: ${i.criados} criado(s), ${i.atualizados} atualizado(s).</div>`}catch(i){a.innerHTML=`<div class="banner banner--warning" role="alert">${p(i instanceof Error?i.message:"Não foi possível restaurar.")}</div>`}}})})}let Xe=null;async function ea(){if(!(!("wakeLock"in navigator)||document.hidden))try{Xe=await navigator.wakeLock.request("screen"),Xe.addEventListener("release",()=>{Xe=null})}catch{}}function ln(){ea(),document.addEventListener("visibilitychange",()=>{document.hidden||ea()})}const Qa="v1.10",dn="Memoriza",Ja=`${dn} ${Qa}`,Ae=24;function vt(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Qe(e,t){const a=vt(t);return e.some(o=>vt(o).includes(a))}function un(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),i=t.toLowerCase();let n=s.indexOf(i);n===-1&&(n=0);const c=Math.max(0,n-a),r=Math.min(o.length,n+i.length+a);return(c>0?"…":"")+o.slice(c,r)+(r<o.length?"…":"")}async function mn(e,t){const a=t.trim();if(!a)return[];const o=vt(a);if(!o)return[];const s=await A(),i=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(i.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),r=new Map(i.map(f=>[f.id,f])),u=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),d=[];for(const f of i)if(Qe([f.nome,f.categoria],o)&&(d.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),d.length>=Ae))return d;const m=new Map(c.map(f=>[f.id,f]));for(const f of c)if(Qe([f.nome,f.categoria],o)){const E=r.get(f.espaco_id);if(d.push({kind:"tema",id:f.id,titulo:f.nome,meta:`Tema${E?` · ${E.nome}`:""}`}),d.length>=Ae)return d}for(const f of u){if(!Qe([f.titulo,f.fonte,f.conteudo],o))continue;const E=m.get(f.tema_id),h=E&&r.get(E.espaco_id),g=[...h?[h.nome]:[],...E?[E.nome]:[]].join(" · ");if(d.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:g?`Nota · ${g}`:"Nota",snippet:f.conteudo?un(f.conteudo,o):void 0}),d.length>=Ae)return d}return d.sort((f,E)=>{const h=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,g=`${E.titulo.toLowerCase()} ${E.meta.toLowerCase()}`;return Ho(h,g)}),d.slice(0,Ae)}const pn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function ta(e,t){const a=p(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const i=p(e.slice(0,s)),n=p(e.slice(s,s+o.length)),c=p(e.slice(s+o.length));return`${i}<mark>${n}</mark>${c}`}async function Ya(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],i=-1,n,c=!1;function r(){c||(c=!0,t.remove(),document.removeEventListener("keydown",m))}function l(E){s.length!==0&&(i=(i+E+s.length)%s.length,s.forEach((h,g)=>{const k=g===i;h.el.classList.toggle("is-active",k),h.el.setAttribute("aria-selected",String(k)),k&&h.el.scrollIntoView({block:"nearest"})}))}function u(E){const h=s.find(k=>k.el===E);if(!h)return;r();const g=h.resultado;g.kind==="espaco"?C(`espacos/${g.id}`):g.kind==="tema"?C(`temas/${g.id}`):C(`notas/${g.id}`)}function d(E){mn(e,E).then(h=>{if(!c){if(i=-1,s=[],h.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${p(E.trim())}".</p>`;return}o.innerHTML="";for(const g of h){const k=document.createElement("button");k.type="button",k.className=`search-result search-result--${g.kind}`,k.setAttribute("role","option"),k.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${g.kind==="espaco"?x.folder:g.kind==="tema"?x.bookOpen:x.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${ta(g.titulo,E)}</span>
            <span class="search-result__meta">${p(pn[g.kind])} · ${p(g.meta)}</span>
            ${g.snippet?`<span class="search-result__snippet">${ta(g.snippet,E)}</span>`:""}
          </span>
        `,k.addEventListener("click",()=>u(k)),o.appendChild(k),s.push({el:k,resultado:g})}}})}function m(E){E.key==="Escape"&&(E.preventDefault(),r())}a.addEventListener("input",()=>{n&&clearTimeout(n),n=setTimeout(()=>d(a.value),120)}),a.addEventListener("keydown",E=>{E.key==="ArrowDown"?(E.preventDefault(),l(1)):E.key==="ArrowUp"?(E.preventDefault(),l(-1)):E.key==="Enter"&&i>=0?(E.preventDefault(),u(s[i].el)):E.key==="Escape"&&(E.preventDefault(),r())}),t.addEventListener("mousedown",E=>{E.target===t&&r()}),document.addEventListener("keydown",m),a.focus(),d("")}const Je=7,vn=30,fn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],gn={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function bn(e){$s(()=>ft(e)),await ft(e),_n(),ln(),hn(),yn()}function hn(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=aa();t&&Ya(t)}})}async function yn(){const e=gt();if(!(!e||!sa())&&Yi(vn))try{await Za(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function _n(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function ft(e){var r,l,u;const t=aa(),a=t?await jo(t):void 0;if(!a){Ye(null),e.innerHTML='<div id="profile-screen"></div>';const d=e.querySelector("#profile-screen");await xs(d,async m=>{Ye(m.id),C("hoje"),await ft(e)});return}const o=ys(),s=_s(o),i=await $n(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${fn.map(d=>`
          <button
            class="app-nav__item"
            data-route="${d.route}"
            ${d.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${Es[d.route]}</span>
            <span>${d.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${gn[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${x.search}</button>
            ${i?`<button class="app-header__backup-alert${i.urgente?" is-urgent":""}" id="btn-sync-alert" type="button" title="${p(i.mensagem)}" aria-label="${p(i.mensagem)}">${x.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${p(Co(F()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${x.help}</button>
            <span class="app-header__profile" title="Memoriza ${Qa}">${p(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${p(Ja)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(d=>{d.addEventListener("click",()=>{ye()&&ws(d.dataset.route)})}),(r=e.querySelector("#btn-ajuda"))==null||r.addEventListener("click",()=>{ye()&&(location.hash==="#/ajuda"?history.back():C("ajuda"))}),(l=e.querySelector("#btn-busca"))==null||l.addEventListener("click",()=>{ye()&&Ya(a.id)}),(u=e.querySelector("#btn-sync-alert"))==null||u.addEventListener("click",()=>{ye()&&C("config")});const n=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",n.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await wn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(d){console.error("Erro ao renderizar tela:",d),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function wn(e,t,a){switch(t.name){case"hoje":await Zt(e,{perfilId:a.id});break;case"espacos":await Le(e,{perfilId:a.id});break;case"espaco":await qe(e,t.id);break;case"espaco-pdf":await fi(e,t.id,t.categoria);break;case"painel":await Ti(e,{perfilId:a.id});break;case"favoritos":await Ii(e,{perfilId:a.id});break;case"ajuda":Pi(e);break;case"tema":await Me(e,t.id);break;case"nota-nova":await De(e,{mode:"nova",temaId:t.temaId});break;case"nota":await De(e,{mode:"editar",notaId:t.id});break;case"config":await W(e,{perfil:a,onSwitchProfile:()=>{Ye(null),C("perfil")}});break;default:await Zt(e,{perfilId:a.id})}}async function $n(e){if(!await En(e.id))return null;if(!gt())return{urgente:!1,mensagem:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};const a=bt();if(!a)return{urgente:!1,mensagem:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."};const o=F(),s=_e(F(new Date(a)),o);return s<=Je?null:{urgente:s>Je*2,mensagem:`Faz mais de ${Je} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}}async function En(e){const t=await A();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${Ja}%c rodando`,"font-weight:bold;","");ia();oo({immediate:!0});async function xn(){hi(),await No(),await fa(),await Uo(),await fs().catch(()=>{}),await go();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await bn(e)}xn();
