(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const co="modulepreload",lo=function(e){return"/"+e},Ot={},uo=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(a.map(r=>{if(r=lo(r),r in Ot)return;Ot[r]=!0;const l=r.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${u}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":co,l||(d.as="script"),d.crossOrigin="",d.href=r,c&&d.setAttribute("nonce",c),document.head.appendChild(d),l)return new Promise((v,f)=>{d.addEventListener("load",v),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return s.then(n=>{for(const c of n||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function mo(e={}){const{immediate:t=!1,onNeedRefresh:a,onOfflineReady:o,onRegistered:s,onRegisteredSW:i,onRegisterError:n}=e;let c,r;const l=async(d=!0)=>{await r};async function u(){if("serviceWorker"in navigator){if(c=await uo(async()=>{const{Workbox:d}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:d}},[]).then(({Workbox:d})=>new d("/sw.js",{scope:"/",type:"classic"})).catch(d=>{n==null||n(d)}),!c)return;c.addEventListener("activated",d=>{(d.isUpdate||d.isExternal)&&window.location.reload()}),c.addEventListener("installed",d=>{d.isUpdate||o==null||o()}),c.register({immediate:t}).then(d=>{i?i("/sw.js",d):s==null||s(d)}).catch(d=>{n==null||n(d)})}}return r=u(),l}const R={selectedProfileId:"memoriza:selectedProfileId",theme:"memoriza:theme",lastExportAt:"memoriza:lastExportAt",storagePersistRequested:"memoriza:storagePersistRequested",githubToken:"memoriza:githubToken",githubGistId:"memoriza:githubGistId",githubLastSyncAt:"memoriza:githubLastSyncAt",githubAutoSync:"memoriza:githubAutoSync",notasOrdem:"memoriza:notasOrdem"};function da(){return localStorage.getItem(R.selectedProfileId)}function at(e){e?localStorage.setItem(R.selectedProfileId,e):localStorage.removeItem(R.selectedProfileId)}function ua(){const e=localStorage.getItem(R.theme);return e==="light"||e==="dark"?e:"system"}function po(e){e==="system"?localStorage.removeItem(R.theme):localStorage.setItem(R.theme,e)}function vo(){return localStorage.getItem(R.lastExportAt)}function Ht(e){localStorage.setItem(R.lastExportAt,e)}function fo(){return localStorage.getItem(R.storagePersistRequested)==="1"}function go(){localStorage.setItem(R.storagePersistRequested,"1")}const bo="19:00";function ho(e){return localStorage.getItem(`memoriza:reminderHour:${e}`)??bo}function yo(e,t){localStorage.setItem(`memoriza:reminderHour:${e}`,t)}function _t(){return localStorage.getItem(R.githubToken)??""}function Bt(e){e.trim()?localStorage.setItem(R.githubToken,e.trim()):localStorage.removeItem(R.githubToken)}function ze(){return localStorage.getItem(R.githubGistId)??""}function ot(e){e?localStorage.setItem(R.githubGistId,e):localStorage.removeItem(R.githubGistId)}function wt(){return localStorage.getItem(R.githubLastSyncAt)}function $t(e){e?localStorage.setItem(R.githubLastSyncAt,e):localStorage.removeItem(R.githubLastSyncAt)}function ma(){return localStorage.getItem(R.githubAutoSync)!=="0"}function _o(e){e?localStorage.removeItem(R.githubAutoSync):localStorage.setItem(R.githubAutoSync,"0")}function Et(){return localStorage.getItem(R.notasOrdem)==="titulo"?"titulo":"data"}function wo(e){e==="titulo"?localStorage.setItem(R.notasOrdem,"titulo"):localStorage.removeItem(R.notasOrdem)}function pa(){const e=ua();e==="system"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",e)}function $o(e){po(e),pa()}function Eo(){return ua()}async function xo(){var e;if(!fo()&&(go(),!!((e=navigator.storage)!=null&&e.persist)))try{await navigator.storage.persist()}catch{}}const st=(e,t)=>t.some(a=>e instanceof a);let Vt,Ut;function So(){return Vt||(Vt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ko(){return Ut||(Ut=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const it=new WeakMap,Ge=new WeakMap,Re=new WeakMap;function Ao(e){const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",n)},i=()=>{a(ce(e.result)),s()},n=()=>{o(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",n)});return Re.set(t,e),t}function Lo(e){if(it.has(e))return;const t=new Promise((a,o)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",n),e.removeEventListener("abort",n)},i=()=>{a(),s()},n=()=>{o(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",n),e.addEventListener("abort",n)});it.set(e,t)}let nt={get(e,t,a){if(e instanceof IDBTransaction){if(t==="done")return it.get(e);if(t==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return ce(e[t])},set(e,t,a){return e[t]=a,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function va(e){nt=e(nt)}function qo(e){return ko().includes(e)?function(...t){return e.apply(rt(this),t),ce(this.request)}:function(...t){return ce(e.apply(rt(this),t))}}function To(e){return typeof e=="function"?qo(e):(e instanceof IDBTransaction&&Lo(e),st(e,So())?new Proxy(e,nt):e)}function ce(e){if(e instanceof IDBRequest)return Ao(e);if(Ge.has(e))return Ge.get(e);const t=To(e);return t!==e&&(Ge.set(e,t),Re.set(t,e)),t}const rt=e=>Re.get(e);function Mo(e,t,{blocked:a,upgrade:o,blocking:s,terminated:i}={}){const n=indexedDB.open(e,t),c=ce(n);return o&&n.addEventListener("upgradeneeded",r=>{o(ce(n.result),r.oldVersion,r.newVersion,ce(n.transaction),r)}),a&&n.addEventListener("blocked",r=>a(r.oldVersion,r.newVersion,r)),c.then(r=>{i&&r.addEventListener("close",()=>i()),s&&r.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Co=["get","getKey","getAll","getAllKeys","count"],Io=["put","add","delete","clear"],Ke=new Map;function Gt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ke.get(t))return Ke.get(t);const a=t.replace(/FromIndex$/,""),o=t!==a,s=Io.includes(a);if(!(a in(o?IDBIndex:IDBObjectStore).prototype)||!(s||Co.includes(a)))return;const i=async function(n,...c){const r=this.transaction(n,s?"readwrite":"readonly");let l=r.store;return o&&(l=l.index(c.shift())),(await Promise.all([l[a](...c),s&&r.done]))[0]};return Ke.set(t,i),i}va(e=>({...e,get:(t,a,o)=>Gt(t,a)||e.get(t,a,o),has:(t,a)=>!!Gt(t,a)||e.has(t,a)}));const Do=["continue","continuePrimaryKey","advance"],Kt={},ct=new WeakMap,fa=new WeakMap,No={get(e,t){if(!Do.includes(t))return e[t];let a=Kt[t];return a||(a=Kt[t]=function(...o){ct.set(this,fa.get(this)[t](...o))}),a}};async function*Po(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const a=new Proxy(t,No);for(fa.set(a,t),Re.set(a,rt(t));t;)yield a,t=await(ct.get(a)||t.continue()),ct.delete(a)}function Wt(e,t){return t===Symbol.asyncIterator&&st(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&st(e,[IDBIndex,IDBObjectStore])}va(e=>({...e,get(t,a,o){return Wt(t,a)?Po:e.get(t,a,o)},has(t,a){return Wt(t,a)||e.has(t,a)}}));const jo="memoriza",zo=4;let We;function k(){return We||(We=Mo(jo,zo,{upgrade(e,t,a,o){if(e.objectStoreNames.contains("perfis")||e.createObjectStore("perfis",{keyPath:"id"}),e.objectStoreNames.contains("espacos")||e.createObjectStore("espacos",{keyPath:"id"}).createIndex("perfil_id","perfil_id"),e.objectStoreNames.contains("temas")||e.createObjectStore("temas",{keyPath:"id"}).createIndex("espaco_id","espaco_id"),e.objectStoreNames.contains("notas")||e.createObjectStore("notas",{keyPath:"id"}).createIndex("tema_id","tema_id"),e.objectStoreNames.contains("itens_revisao")){if(t<2){const s=o.objectStore("itens_revisao");s.indexNames.contains("perfil_status")||s.createIndex("perfil_status",["perfil_id","status"])}}else{const s=e.createObjectStore("itens_revisao",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("perfil_status",["perfil_id","status"])}if(e.objectStoreNames.contains("snapshots")||e.createObjectStore("snapshots",{keyPath:"id"}),!e.objectStoreNames.contains("avaliacoes")){const s=e.createObjectStore("avaliacoes",{keyPath:"id"});s.createIndex("perfil_id","perfil_id"),s.createIndex("nota_id","nota_id"),s.createIndex("sessao_id","sessao_id")}}})),We}function se(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}const xt="Europe/London",Ro=new Intl.DateTimeFormat("en-CA",{timeZone:xt,year:"numeric",month:"2-digit",day:"2-digit"});function K(e=new Date){return Ro.format(e)}function ee(){return K(new Date)}function we(e,t){const o=new Date(`${e}T00:00:00Z`),s=new Date(`${t}T00:00:00Z`);return Math.round((s.getTime()-o.getTime())/864e5)}function z(){return new Date().toISOString()}function ie(e){return new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}function Fo(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:xt,weekday:"short",day:"2-digit",month:"2-digit"})}function le(e){return new Date(e).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Oo(e){const t=new Date(e),a=K(t),o=t.toLocaleTimeString("pt-BR",{timeZone:xt,hour:"2-digit",minute:"2-digit",hour12:!1});return`${a} ${o.replace(":","h")}`}function St(e){if(e<=0)return"ainda sem registro";const t=Math.floor(e/3600),a=Math.round(e%3600/60);return t>0?`${t}h ${a}min`:a>0?`${a} min`:"< 1 min"}function J(e,t){const a=new Date(`${e}T00:00:00Z`);return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}const Ho="00000000-0000-4000-8000-000000000001";async function kt(){return(await(await k()).getAll("perfis")).sort((a,o)=>a.criado_em.localeCompare(o.criado_em))}async function Bo(){return kt()}async function Vo(e){return(await k()).get("perfis",e)}async function ga(e){const t=await k(),a=await t.getAll("perfis"),o=z(),i={id:a.length===0?Ho:se(),nome:e,criado_em:o,atualizado_em:o};return await t.put("perfis",i),i}async function Uo(e,t){const a=await k(),o=await a.get("perfis",e);o&&(o.nome=t,o.atualizado_em=z(),await a.put("perfis",o))}async function Go(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e);let o=0,s=0;for(const i of a){const n=await t.getAllFromIndex("temas","espaco_id",i.id);o+=n.length;for(const c of n)s+=(await t.getAllFromIndex("notas","tema_id",c.id)).length}return{espacos:a.length,temas:o,notas:s}}async function Ko(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),s=(await Promise.all(a.map(u=>t.getAllFromIndex("temas","espaco_id",u.id)))).flat(),n=(await Promise.all(s.map(u=>t.getAllFromIndex("notas","tema_id",u.id)))).flat(),r=(await Promise.all(n.map(u=>t.getAllFromIndex("itens_revisao","nota_id",u.id)))).flat(),l=t.transaction(["perfis","espacos","temas","notas","itens_revisao"],"readwrite");await l.objectStore("perfis").delete(e);for(const u of a)await l.objectStore("espacos").delete(u.id);for(const u of s)await l.objectStore("temas").delete(u.id);for(const u of n)await l.objectStore("notas").delete(u.id);for(const u of r)await l.objectStore("itens_revisao").delete(u.id);await l.done}const ba=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"}),Wo=new Map([["janeiro",1],["fevereiro",2],["marco",3],["abril",4],["maio",5],["junho",6],["julho",7],["agosto",8],["setembro",9],["outubro",10],["novembro",11],["dezembro",12],["jan",1],["fev",2],["mar",3],["abr",4],["mai",5],["jun",6],["jul",7],["ago",8],["set",9],["out",10],["nov",11],["dez",12],["january",1],["february",2],["march",3],["april",4],["may",5],["june",6],["july",7],["august",8],["september",9],["october",10],["november",11],["december",12],["feb",2],["sep",9],["sept",9],["aug",8],["dec",12]]);function Zo(e){return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\.+$/,"")}function lt(e){return Wo.get(Zo(e))??null}function ha(e){return e.length>0&&e.every(t=>lt(t)!==null)}function ya(e,t,a){if(a){const o=lt(e),s=lt(t);if(o!==s)return o-s}return ba.compare(e,t)}function _a(e){const t=ha(e);return[...e].sort((a,o)=>ya(a,o,t))}function Xo(e,t){return ba.compare(e,t)}function de(e,t){const a=ha(e.map(t));return[...e].sort((o,s)=>ya(t(o),t(s),a))}const wa=30;function fe(e,t=z()){return{...e,excluido:!0,excluido_em:t,atualizado_em:t}}function me(e,t=z()){const a={...e};return delete a.excluido,delete a.excluido_em,a.atualizado_em=t,a}async function Qo(e){const t=await k(),a=await t.getAllFromIndex("espacos","perfil_id",e),o=new Map(a.map(r=>[r.id,r])),s=(await Promise.all(a.map(r=>t.getAllFromIndex("temas","espaco_id",r.id)))).flat(),i=new Map(s.map(r=>[r.id,r])),n=(await Promise.all(s.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat(),c=[];for(const r of a){if(!r.excluido)continue;const l=s.filter(d=>d.espaco_id===r.id),u=new Set(l.map(d=>d.id));c.push({tipo:"espaco",id:r.id,nome:r.nome,contexto:r.categoria||"Sem categoria",excluido_em:r.excluido_em,temas:l.filter(d=>d.excluido).length,notas:n.filter(d=>u.has(d.tema_id)&&d.excluido).length})}for(const r of s){if(!r.excluido)continue;const l=o.get(r.espaco_id);!l||l.excluido||c.push({tipo:"tema",id:r.id,nome:r.nome,contexto:l.nome,excluido_em:r.excluido_em,notas:n.filter(u=>u.tema_id===r.id&&u.excluido).length})}for(const r of n){if(!r.excluido)continue;const l=i.get(r.tema_id);if(!l||l.excluido)continue;const u=o.get(l.espaco_id);!u||u.excluido||c.push({tipo:"nota",id:r.id,nome:r.titulo||"(sem título)",contexto:l.nome,excluido_em:r.excluido_em})}return c.sort((r,l)=>(l.excluido_em??"").localeCompare(r.excluido_em??""))}async function Jo(e,t){const a=await k(),o=z();if(e==="nota"){const r=await a.get("notas",t);if(!r)return;await a.put("notas",me(r,o));return}if(e==="tema"){const r=await a.get("temas",t);if(!r)return;const l=(await a.getAllFromIndex("notas","tema_id",t)).filter(d=>d.excluido),u=a.transaction(["temas","notas"],"readwrite");await u.objectStore("temas").put(me(r,o));for(const d of l)await u.objectStore("notas").put(me(d,o));await u.done;return}const s=await a.get("espacos",t);if(!s)return;const i=(await a.getAllFromIndex("temas","espaco_id",t)).filter(r=>r.excluido),n=(await Promise.all(i.map(r=>a.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>r.excluido),c=a.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(me(s,o));for(const r of i)await c.objectStore("temas").put(me(r,o));for(const r of n)await c.objectStore("notas").put(me(r,o));await c.done}async function qe(e,t){const a=await k();if(e==="nota"){const n=await a.getAllFromIndex("itens_revisao","nota_id",t),c=a.transaction(["notas","itens_revisao"],"readwrite");await c.objectStore("notas").delete(t);for(const r of n)await c.objectStore("itens_revisao").delete(r.id);await c.done;return}let o;if(e==="tema")o=await a.getAllFromIndex("notas","tema_id",t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);o=(await Promise.all(n.map(c=>a.getAllFromIndex("notas","tema_id",c.id)))).flat()}const s=(await Promise.all(o.map(n=>a.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat(),i=a.transaction(["espacos","temas","notas","itens_revisao"],"readwrite");if(e==="tema")await i.objectStore("temas").delete(t);else{const n=await a.getAllFromIndex("temas","espaco_id",t);await i.objectStore("espacos").delete(t);for(const c of n)await i.objectStore("temas").delete(c.id)}for(const n of o)await i.objectStore("notas").delete(n.id);for(const n of s)await i.objectStore("itens_revisao").delete(n.id);await i.done}async function Yo(){const e=await k(),t=J(ee(),-wa),a=n=>!!n.excluido&&!!n.excluido_em&&n.excluido_em.slice(0,10)<t,o=(await e.getAll("espacos")).filter(a),s=(await e.getAll("temas")).filter(a),i=(await e.getAll("notas")).filter(a);for(const n of o)await qe("espaco",n.id);for(const n of s)await qe("tema",n.id);for(const n of i)await qe("nota",n.id)}async function $a(e){const a=(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido);return Et()==="titulo"?de(a,o=>o.titulo):a.sort((o,s)=>o.criado_em.localeCompare(s.criado_em))}async function Zt(e){return(await k()).get("notas",e)}async function es(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);return(await Promise.all(a.map(async s=>(await t.getAllFromIndex("notas","tema_id",s.id)).filter(n=>!n.excluido).map(n=>({nota:n,tema:s}))))).flat()}async function ts(e,t){const a=await k(),o=await a.get("temas",e);if(!o)throw new Error("Tema não encontrado.");const s=await a.get("espacos",o.espaco_id);if(!s)throw new Error("Espaço não encontrado.");const i=z(),n={id:se(),tema_id:e,titulo:t.titulo,conteudo:t.conteudo,fonte:t.fonte,pode_desatualizar:t.pode_desatualizar,validade_ate:t.pode_desatualizar?t.validade_ate:void 0,favorito:!1,titulo_revisado:!0,criado_em:i,atualizado_em:i},c={id:se(),nota_id:n.id,perfil_id:s.perfil_id,estagio:"1",data_agendada:J(ee(),1),status:"pendente",streak_facil:0,criado_em:i,atualizado_em:i},r=a.transaction(["notas","itens_revisao"],"readwrite");return await r.objectStore("notas").put(n),await r.objectStore("itens_revisao").put(c),await r.done,n}async function as(e,t){const a=await k(),o=await a.get("notas",e);o&&(o.titulo=t.titulo,o.conteudo=t.conteudo,o.fonte=t.fonte,o.pode_desatualizar=t.pode_desatualizar,o.validade_ate=t.pode_desatualizar?t.validade_ate:void 0,o.titulo_revisado=!0,o.atualizado_em=z(),await a.put("notas",o))}async function os(e){const t=await k(),a=await t.get("notas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=z(),await t.put("notas",a),a.favorito):!1}async function ss(e){const t=await k(),a=await t.get("notas",e);a&&await t.put("notas",fe(a))}async function Ea(){var i;const e=await k(),a=(await e.getAll("notas")).filter(n=>!("titulo"in n)||!n.titulo);if(a.length===0)return 0;const o=z(),s=e.transaction("notas","readwrite");for(const n of a)await s.store.put({...n,titulo:((i=n.fonte)==null?void 0:i.trim())||"Sem título",titulo_revisado:!1,favorito:n.favorito??!1,atualizado_em:o});return await s.done,a.length}function is(e,t){const a=new Map(e.map(c=>[c.id,c])),o=[];let s=0,i=0,n=0;for(const c of t){const r=a.get(c.id);r?c.atualizado_em>r.atualizado_em?(a.set(c.id,c),o.push(c),i++):n++:(a.set(c.id,c),o.push(c),s++)}return{merged:Array.from(a.values()),toWrite:o,criados:s,atualizados:i,mantidos:n}}function ns(e){return e.reduce((t,a)=>({criados:t.criados+a.criados,atualizados:t.atualizados+a.atualizados,mantidos:t.mantidos+a.mantidos}),{criados:0,atualizados:0,mantidos:0})}const rs=["perfis","espacos","temas","notas","itens_revisao","avaliacoes"],At="memoriza-export",xa=1;async function cs(){const e=await k(),[t,a,o,s,i,n]=await Promise.all([e.getAll("perfis"),e.getAll("espacos"),e.getAll("temas"),e.getAll("notas"),e.getAll("itens_revisao"),e.getAll("avaliacoes")]);return{perfis:t,espacos:a,temas:o,notas:s,itens_revisao:i,avaliacoes:n}}async function ls(e){const t=await k(),a=await t.get("perfis",e),o=await t.getAllFromIndex("espacos","perfil_id",e),s=new Set(o.map(v=>v.id)),n=(await t.getAll("temas")).filter(v=>s.has(v.espaco_id)),c=new Set(n.map(v=>v.id)),l=(await t.getAll("notas")).filter(v=>c.has(v.tema_id)),u=await t.getAllFromIndex("itens_revisao","perfil_id",e),d=await t.getAllFromIndex("avaliacoes","perfil_id",e);return{perfis:a?[a]:[],espacos:o,temas:n,notas:l,itens_revisao:u,avaliacoes:d}}async function ds(e){const t=await ls(e);return{formato:At,versao:xa,exportado_em:z(),escopo:"perfil",perfil_id:e,dados:t}}async function $e(){const e=await cs();return{formato:At,versao:xa,exportado_em:z(),escopo:"todos",dados:e}}function us(e){var o;return`Memoriza - ${((e.escopo==="perfil"?(o=e.dados.perfis[0])==null?void 0:o.nome:void 0)||(e.escopo==="perfil"?"perfil":"todos os perfis")).replace(/[\\/:*?"<>|]/g,"-")} - ${Oo(e.exportado_em)}.json`}function Xt(e){const t=us(e),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}function Fe(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Arquivo inválido: não é um JSON válido.")}if(typeof t!="object"||t===null||t.formato!==At||typeof t.dados!="object")throw new Error("Arquivo inválido: não parece ser um export do Memoriza.");return t}async function Oe(e){const t=await k(),a={};for(const o of rs){const s=await t.getAll(o),i=e.dados[o],n=is(s,i??[]);if(n.toWrite.length>0){const c=t.transaction(o,"readwrite");for(const r of n.toWrite)await c.store.put(r);await c.done}a[o]={criados:n.criados,atualizados:n.atualizados,mantidos:n.mantidos}}return await Ea(),{...ns(Object.values(a)),porLoja:a}}const ms=8,ps=20,vs=10;function fs(e){return e.slice(0,10)}function gs(e,t){const[a,o,s]=e.split("-").map(Number),i=new Date(Date.UTC(a,o-1,s));return i.setUTCDate(i.getUTCDate()+t),i.toISOString().slice(0,10)}function bs(e){const[t,a,o]=e.split("-").map(Number),s=new Date(Date.UTC(t,a-1,o)),i=s.getUTCDay();return s.setUTCDate(s.getUTCDate()-(i+6)%7),s.toISOString().slice(0,10)}function hs(e,t){const a=new Set,o=(l,u)=>u.criado_em.localeCompare(l.criado_em),s=e.filter(l=>l.automatico).sort(o),i=e.filter(l=>!l.automatico).sort(o),n=gs(t,-6),c=new Set;let r=0;for(const l of s){const u=fs(l.criado_em);let d;if(u>=n)d=!0;else{const v=bs(u);d=!c.has(v)&&c.size<ms,d&&c.add(v)}if(d&&r<ps){r++;continue}a.add(l.id)}for(const l of i.slice(vs))a.add(l.id);return[...a]}async function dt(e={}){const t=await k(),a=JSON.stringify(await $e()),o=e.automatico??!1,s={id:se(),criado_em:z(),automatico:o,titulo:e.titulo??(o?"Automático":"Manual"),bytes:a.length,conteudo:a};return await t.put("snapshots",s),await $s(),s}async function ys(){return(await(await k()).getAll("snapshots")).sort((a,o)=>o.criado_em.localeCompare(a.criado_em))}async function _s(e){await(await k()).delete("snapshots",e)}async function ws(e){const a=await(await k()).get("snapshots",e);if(!a)throw new Error("Snapshot não encontrado.");return Oe(Fe(a.conteudo))}async function $s(){const e=await k(),t=hs(await e.getAll("snapshots"),ee());if(t.length===0)return;const a=e.transaction("snapshots","readwrite");for(const o of t)await a.store.delete(o);await a.done}async function Es(){const e=await k(),t=ee();return(await e.getAll("snapshots")).some(o=>o.automatico&&o.criado_em.slice(0,10)===t)?null:dt({automatico:!0})}function m(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ge(e){var t,a;e.classList.remove("input--sugerido"),(a=(t=e.closest(".field"))==null?void 0:t.querySelector(".field__sugestao-hint"))==null||a.remove()}const Sa="_sem-categoria_";function xs(e){return e.trim()===""?Sa:encodeURIComponent(e)}function Ss(e){return e===Sa?"":decodeURIComponent(e)}function ks(){return window.location.hash.replace(/^#\/?/,"").split("/").filter(e=>e.length>0)}function As(){const e=ks();if(e.length===0)return{name:"hoje"};if(e[0]==="perfil")return{name:"perfil"};if(e[0]==="config")return{name:"config"};if(e[0]==="painel")return{name:"painel"};if(e[0]==="favoritos")return{name:"favoritos"};if(e[0]==="ajuda")return{name:"ajuda"};if(e[0]==="espacos"){if(e.length===1)return{name:"espacos"};if(e.length===2)return{name:"espaco",id:e[1]};if(e.length===3&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1]};if(e.length===4&&e[2]==="pdf")return{name:"espaco-pdf",id:e[1],categoria:Ss(e[3])}}return e[0]==="temas"&&e.length===2?{name:"tema",id:e[1]}:e[0]==="temas"&&e.length===3&&e[2]==="nova-nota"?{name:"nota-nova",temaId:e[1]}:e[0]==="notas"&&e.length===2?{name:"nota",id:e[1]}:{name:"hoje"}}function Ls(e){switch(e.name){case"config":return"config";case"painel":return"painel";case"favoritos":return"favoritos";case"ajuda":return"ajuda";case"espacos":case"espaco":case"espaco-pdf":case"tema":case"nota":case"nota-nova":return"espacos";default:return"hoje"}}function D(e){window.location.hash=e.startsWith("/")?e:`/${e}`}function qs(e){D(e)}function Ts(e){window.addEventListener("hashchange",e)}function pe(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function P(e){return`<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Ms={hoje:pe('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8.5 14.5l2 2 4-4"/>'),espacos:pe('<path d="M4 5.5c2-1 5-1 7.5.5 2.5-1.5 5.5-1.5 7.5-.5v13c-2-1-5-1-7.5.5-2.5-1.5-5.5-1.5-7.5-.5z"/><path d="M11.5 6v13"/>'),favoritos:pe('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),painel:pe('<path d="M4 20V10M12 20V4M20 20v-7"/>'),config:pe('<path d="M4 6h9M17 6h3"/><circle cx="14" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="8" cy="12" r="2"/><path d="M4 18h9M17 18h3"/><circle cx="14" cy="18" r="2"/>'),ajuda:pe('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>')},S={backup:P('<path d="M7 18a4 4 0 1 1 .6-7.96A5 5 0 0 1 17.6 9.4 3.5 3.5 0 0 1 17 16.5"/><path d="M12 12v6M9 15l3 3 3-3"/>'),info:P('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>'),dice:P('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/>'),star:P('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),flame:P('<path d="M12 2.8c2.6 2.8 5.6 5 5.6 9a5.6 5.6 0 0 1-11.2 0c0-1.9.9-3.8 2.1-5.3.4 1.3 1.2 2.4 2.4 2.7-.1-2-.5-4.2 1.1-6.4z"/>'),calendar:P('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>'),bookOpen:P('<path d="M7 4.5h10a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"/><path d="M9.5 8h5M9.5 12h5"/>'),folder:P('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),pen:P('<path d="M4 20l4-.5L19.6 7.9a2.1 2.1 0 0 0-3-3L5 15.6z"/><path d="M14.5 6.5l3 3"/>'),alert:P('<path d="M12 4L21 19H3z"/><path d="M12 10v4M12 16.5h.01"/>'),caraFeliz:P('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraNeutra:P('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5h7"/><path d="M9 9.5h.01M15 9.5h.01"/>'),caraTriste:P('<circle cx="12" cy="12" r="9"/><path d="M9 16.2c.9-1 1.9-1.4 3-1.4s2.1.4 3 1.4"/><path d="M9 9.5h.01M15 9.5h.01"/>'),confete:P('<path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),undo:P('<path d="M4 10h9a5 5 0 0 1 0 10h-3"/><path d="M8 6L4 10l4 4"/>'),redo:P('<path d="M20 10h-9a5 5 0 0 0 0 10h3"/><path d="M16 6l4 4-4 4"/>'),user:P('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.3-3.2 3.9-4.5 7-4.5s5.7 1.3 7 4.5"/>'),users:P('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-2.6 3-3.5 5.5-3.5s4.5.9 5.5 3.5"/><path d="M16 5.6a3 3 0 0 1 0 5.8M20.5 19c-.6-1.6-1.5-2.6-2.5-3.2"/>'),moon:P('<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>'),database:P('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),clock:P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),help:P('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r="0.2" fill="currentColor"/>'),search:P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),sync:P('<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6.04M20.5 3.5V7h-3.5"/><path d="M3.5 12A8.5 8.5 0 0 1 17.2 5"/>'),lock:P('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),check:P('<path d="M20 6L9 17l-5-5"/>'),chart:P('<path d="M4 20h16"/><path d="M7 17v-6M12 17V7M17 17v-9"/>'),ordenar:P('<path d="M4 6h16M4 12h11M4 18h6"/>'),trash:P('<path d="M4 7h16"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6M14 11v6"/>')};async function Cs(e,t){var c,r,l;const a=await kt(),o=a.length===0;e.innerHTML=`
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
              <span class="profile-avatar" aria-hidden="true">${m(Is(u.nome))}</span>
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
  `,e.querySelectorAll(".profile-card").forEach(u=>{u.addEventListener("click",()=>{const d=u.dataset.id,v=a.find(f=>f.id===d);v&&t(v)})});const s=e.querySelector("#form-novo-perfil-picker"),i=e.querySelector("#input-novo-perfil-picker");o&&i.focus(),(c=e.querySelector("#btn-novo-perfil-picker"))==null||c.addEventListener("click",()=>{s.style.display="block",i.focus()}),(r=e.querySelector("#btn-cancelar-perfil-picker"))==null||r.addEventListener("click",()=>{s.style.display="none"});const n=async()=>{const u=i.value.trim();if(!u)return;const d=await ga(u);t(d)};(l=e.querySelector("#btn-salvar-perfil-picker"))==null||l.addEventListener("click",n),i.addEventListener("keydown",u=>{u.key==="Enter"&&n()})}function Is(e){return e.trim().slice(0,1).toUpperCase()}const ve=["1","7","30","180"],Ze={1:1,7:7,30:30,180:180};function Ds(e,t,a,o){if(e==="consulta")return{estagio:"consulta",streak_facil:a,aposentado:!0};const s=ve.indexOf(e);if(t==="dificil"){const l=ve[Math.max(0,s-1)];return{estagio:l,streak_facil:0,data_agendada:J(o,Ze[l]),aposentado:!1}}if(t==="medio"){const l=ve[Math.min(ve.length-1,s+1)];return{estagio:l,streak_facil:0,data_agendada:J(o,Ze[l]),aposentado:!1}}const i=a+1,n=s+2,c=n<=ve.length-1?ve[n]:"consulta",r=i>=2?"consulta":c;return r==="consulta"?{estagio:"consulta",streak_facil:i,aposentado:!0}:{estagio:r,streak_facil:i,data_agendada:J(o,Ze[r]),aposentado:!1}}async function ka(e){const t=await k(),a=ee(),s=(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"]))).filter(h=>h.data_agendada<=a),i=Array.from(new Set(s.map(h=>h.nota_id))),n=await Promise.all(i.map(h=>t.get("notas",h))),c=new Map(n.filter(h=>!!h).map(h=>[h.id,h])),r=Array.from(new Set(Array.from(c.values()).map(h=>h.tema_id))),l=await Promise.all(r.map(h=>t.get("temas",h))),u=new Map(l.filter(h=>!!h).map(h=>[h.id,h])),d=Array.from(new Set(Array.from(u.values()).map(h=>h.espaco_id))),v=await Promise.all(d.map(h=>t.get("espacos",h))),f=new Map(v.filter(h=>!!h).map(h=>[h.id,h])),E=[];for(const h of s){const g=c.get(h.nota_id),A=g&&u.get(g.tema_id),x=A&&f.get(A.espaco_id);!g||!A||!x||g.excluido||A.excluido||x.excluido||E.push({item:h,nota:g,tema:A,espaco:x})}return E.sort((h,g)=>h.tema.criado_em.localeCompare(g.tema.criado_em)||h.nota.criado_em.localeCompare(g.nota.criado_em)),E}async function Ns(e,t,a){const o=await k(),s=await o.get("itens_revisao",e);if(!s)throw new Error("Item de revisão não encontrado.");const i=ee(),n=Ds(s.estagio,t,s.streak_facil,i),c=z(),r={...s,status:"feita",avaliacao:t,data_concluida:i,duracao_segundos:a,atualizado_em:c},l={id:se(),nota_id:s.nota_id,perfil_id:s.perfil_id,estagio:n.estagio,data_agendada:n.aposentado?i:n.data_agendada,status:n.aposentado?"feita":"pendente",streak_facil:n.streak_facil,criado_em:c,atualizado_em:c},u=o.transaction("itens_revisao","readwrite");return await u.store.put(r),await u.store.put(l),await u.done,n}async function Ps(e){const t=await k(),a=ee();return(await t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"]))).filter(s=>s.avaliacao&&s.data_concluida===a).length}async function js(e){const t=await k(),a=(await t.getAllFromIndex("itens_revisao","nota_id",e)).filter(n=>n.status==="pendente");if(a.length===0)return;const o=ee(),s=z(),i=t.transaction("itens_revisao","readwrite");for(const n of a)await i.store.put({...n,estagio:"consulta",status:"feita",data_concluida:o,atualizado_em:s});await i.done}const He=["azul","vermelho","verde","rosa","amarelo","laranja","roxo","cinza"],Qt={azul:"Azul",vermelho:"Vermelho",verde:"Verde",rosa:"Rosa",amarelo:"Amarelo",laranja:"Laranja",roxo:"Roxo",cinza:"Cinza"},zs=new RegExp(`\\[([^\\]]+)\\]\\{(${He.join("|")})\\}`,"g");function ut(e){let t=m(e);return t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"<em>$1</em>"),t=t.replace(/~~([^~]+)~~/g,"<del>$1</del>"),t=t.replace(zs,'<span class="text-color text-color--$2">$1</span>'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),t}function Rs(e){const t=[],a=[{level:-1,nodes:t}];for(const o of e){for(;a.length>1&&a[a.length-1].level>o.level;)a.pop();if(a[a.length-1].level<o.level){const s=a[a.length-1].nodes,i=s[s.length-1];a.push({level:o.level,nodes:i?i.children:s})}a[a.length-1].nodes.push({text:o.text,children:[]})}return t}function Aa(e){return`<ul>${e.map(t=>`<li>${ut(t.text)}${t.children.length>0?Aa(t.children):""}</li>`).join("")}</ul>`}function Be(e){const t=e.replace(/\r\n/g,`
`).split(`
`),a=[];let o=[];function s(){o.length>0&&(a.push(Aa(Rs(o))),o=[])}let i=[];function n(){i.length>0&&(a.push(`<p>${ut(i.join(`
`)).replace(/\n/g,"<br>")}</p>`),i=[])}for(const c of t){const r=c.trim();if(r===""){n(),s();continue}const l=/^(#{1,3})\s+(.*)$/.exec(r);if(l){n(),s();const d=l[1].length;a.push(`<h${d}>${ut(l[2])}</h${d}>`);continue}const u=/^[-*]\s+(.*)$/.exec(r);if(u){n();const d=c.length-c.trimStart().length;o.push({level:Math.floor(d/2),text:u[1]});continue}s(),i.push(r)}return n(),s(),a.join(`
`)}function Lt(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent??"").replace(/​/g,"");if(e.nodeType!==Node.ELEMENT_NODE)return"";const t=e,a=Array.from(t.childNodes).map(Lt).join("");switch(t.tagName){case"BR":return`
`;case"B":case"STRONG":return a.trim()?`**${a}**`:a;case"I":case"EM":return a.trim()?`*${a}*`:a;case"CODE":return a.trim()?`\`${a}\``:a;case"A":{const o=t.getAttribute("href");return o?`[${a}](${o})`:a}case"DEL":case"S":case"STRIKE":return a.trim()?`~~${a}~~`:a;case"SPAN":{const o=He.find(s=>t.classList.contains(`text-color--${s}`));return o&&a.trim()?`[${a}]{${o}}`:a}default:return a}}function mt(e,t){const a=[];let o=null;for(const s of Array.from(e.children)){if(s.tagName==="UL"){o&&a.push(...mt(s,t+1));continue}if(s.tagName!=="LI")continue;const i=s,n=Array.from(i.children).filter(l=>l.tagName==="UL"),c=i.cloneNode(!0);c.querySelectorAll("ul").forEach(l=>l.remove());const r=Lt(c).trim();r&&a.push(`${"  ".repeat(t)}- ${r}`);for(const l of n)a.push(...mt(l,t+1));o=i}return a}function Jt(e){if(e.tagName==="UL")return mt(e,0);const t=/^H([1-3])$/.exec(e.tagName),a=Lt(e).trim();return a?t?[`${"#".repeat(Number(t[1]))} ${a}`]:[a]:[]}function Fs(e){const t=[];for(const a of Array.from(e.childNodes)){if(a.nodeType===Node.TEXT_NODE){const s=(a.textContent??"").trim();s&&t.push(s);continue}if(a.nodeType!==Node.ELEMENT_NODE)continue;const o=a;if(o.tagName==="UL"){const s=Jt(o);s.length>0&&t.push(s.join(`
`))}else t.push(...Jt(o))}return t.filter(Boolean).join(`

`)}const Os=30;function La(e){if(!e.pode_desatualizar||!e.validade_ate)return!1;const t=J(ee(),Os);return e.validade_ate<=t}const ue=8;function Hs(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)>>>0;return t}function qt(e){return Hs(e)%ue}function V(e){return`var(--accent-${qt(e)})`}function qa(e,t){return typeof e=="number"?`var(--accent-${e})`:t}function Ee(e){return e?e.toLowerCase():"\0sem-categoria"}function Tt(e){return Bs(e.map(Ee))}function Bs(e){const t=new Set,a=new Map;for(const o of e){let s=qt(o);for(let i=0;i<ue&&t.has(s);i++)s=(s+1)%ue;t.add(s),a.set(o,`var(--accent-${s})`)}return a}function Ta(e){const t=new Set;for(const o of e)typeof o.cor=="number"&&t.add(o.cor);const a=new Map;for(const o of e){if(typeof o.cor=="number"){a.set(o.id,`var(--accent-${o.cor})`);continue}let s=qt(o.id);for(let i=0;i<ue&&t.has(s);i++)s=(s+1)%ue;t.add(s),a.set(o.id,`var(--accent-${s})`)}return a}const Vs=5*60;let Z=null;function Ma(){Z&&(document.hidden?Z.retomadoEm!=null&&(Z.acumuladoMs+=Date.now()-Z.retomadoEm,Z.retomadoEm=null):Z.retomadoEm==null&&(Z.retomadoEm=Date.now()))}function Us(e){Z&&Z.itemId===e||(Ie(),Z={itemId:e,acumuladoMs:0,retomadoEm:document.hidden?null:Date.now()},document.addEventListener("visibilitychange",Ma))}function Gs(){if(!Z)return;let e=Z.acumuladoMs;return Z.retomadoEm!=null&&(e+=Date.now()-Z.retomadoEm),Math.min(Vs,Math.round(e/1e3))}function Ie(){Z&&document.removeEventListener("visibilitychange",Ma),Z=null}function Ca(e){const t=ee();return e.data_agendada>=t?"":`<span class="badge badge--danger" title="Devia ter sido revisada há ${we(e.data_agendada,t)} dia(s)">${S.alert} atrasada</span>`}async function Yt(e,t){const a=await ka(t.perfilId);await De(e,t,a)}async function De(e,t,a){var l;Ie(),window.scrollTo({top:0});const o=await Ps(t.perfilId),s=o>0?`<span class="badge badge--muted">${o} revisão(ões) feita(s) hoje</span>`:"";if(a.length===0){e.innerHTML=`
      ${s?`<div style="margin-bottom: var(--space-4);">${s}</div>`:""}
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.calendar}</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(l=e.querySelector("#btn-empty-espacos"))==null||l.addEventListener("click",()=>D("espacos"));return}const n=new Set(a.map(u=>u.espaco.id)).size>1,c=new Map;for(const u of a){const d=c.get(u.tema.id)??[];d.push(u),c.set(u.tema.id,d)}const r=`
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap;">
      <p class="screen-hint" style="margin:0;">Tente lembrar pelo Título antes de revelar a resposta.</p>
      ${s}
    </div>
  `;e.innerHTML=r+Array.from(c.values()).map(u=>{const d=u[0].tema,v=u[0].espaco;return`
        <div class="queue-group">
          <div class="queue-group__title" style="--group-accent:${V(d.id)}">
            <span class="color-dot" style="--dot-color:${V(d.id)}"></span>
            ${m(d.nome)}
            ${n?`<span class="queue-group__espaco"> · ${m(v.nome)}</span>`:""}
          </div>
          <div class="item-list">
            ${u.map(f=>`
              <button class="item-row" data-id="${m(f.item.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${V(f.tema.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${f.nota.favorito?`${S.star} `:""}${m(f.nota.titulo||"(sem título)")}</span>
                </span>
                ${Ca(f.item)}
                ${La(f.nota)?`<span class="badge badge--muted">${S.alert} desatualizada?</span>`:""}
              </button>
            `).join("")}
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-id]").forEach(u=>{u.addEventListener("click",()=>{const d=a.find(v=>v.item.id===u.dataset.id);d&&Ia(e,t,d,a,o)})})}function Ia(e,t,a,o,s=0,i=!1){var l,u,d;Us(a.item.id),i||window.scrollTo({top:0});const n=La(a.nota),c=s+o.length,r=c>0?Math.round(s/c*100):0;e.innerHTML=`
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
        ${m(a.tema.nome)}${i&&a.nota.fonte?` · ${m(a.nota.fonte)}`:""}
      </div>
      <div class="review-card__titulo">
        ${a.nota.favorito?`${S.star} `:""}${m(a.nota.titulo||"(sem título)")}
        ${Ca(a.item)}
      </div>

      ${n?'<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>':""}

      ${i?`
        <div class="review-card__content markdown-preview">${Be(a.nota.conteudo)}</div>
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
  `,(l=e.querySelector("[data-voltar]"))==null||l.addEventListener("click",()=>void De(e,t,o)),(u=e.querySelector("[data-editar]"))==null||u.addEventListener("click",()=>{Ie(),D(`notas/${a.nota.id}`)}),(d=e.querySelector("#btn-revelar"))==null||d.addEventListener("click",()=>{Ia(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(v=>{v.addEventListener("click",async()=>{const f=v.dataset.avaliacao,E=Gs();Ie();const h=await Ns(a.item.id,f,E),g=await ka(t.perfilId);h.aposentado?Ks(e,t,g):await De(e,t,g)})})}function Ks(e,t,a){var o;e.innerHTML=`
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>${S.confete} Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `,(o=e.querySelector("#btn-continuar"))==null||o.addEventListener("click",()=>void De(e,t,a))}function Da(e){return e.trim().toLowerCase()}function Mt(e){const t=new Map;for(const i of e){const n=i.categoria.trim(),c=Da(n),r=t.get(c);r?r.itens.push(i):t.set(c,{display:n,itens:[i]})}const a=Array.from(t.values()).map(i=>({categoria:i.display,itens:i.itens})),o=a.map(i=>i.categoria),s=new Map;_a(o.filter(i=>i!=="")).forEach((i,n)=>s.set(i,n)),a.sort((i,n)=>i.categoria===""&&n.categoria!==""?1:n.categoria===""&&i.categoria!==""?-1:(s.get(i.categoria)??0)-(s.get(n.categoria)??0));for(const i of a)i.itens.length>1&&(i.itens=de(i.itens,n=>n.nome));return a}function Ct(e){const t=new Map;for(const a of e){const o=a.trim();if(!o)continue;const s=Da(o);t.has(s)||t.set(s,o)}return _a(Array.from(t.values()))}async function Na(e){const a=await(await k()).getAllFromIndex("espacos","perfil_id",e);return de(a.filter(o=>!o.excluido),o=>o.nome)}const Ws=["Cursos","Livros","Bíblia"];async function Pa(e){const t=await Na(e);return Ct([...Ws,...t.map(a=>a.categoria)])}async function It(e){return(await k()).get("espacos",e)}function ja(e,t){t.icone?e.icone=t.icone:delete e.icone,typeof t.cor=="number"?e.cor=t.cor:delete e.cor}async function Zs(e,t,a,o={}){const s=await k(),i=z(),n={id:se(),perfil_id:e,nome:t,categoria:a,criado_em:i,atualizado_em:i,arquivado:!1};return ja(n,o),await s.put("espacos",n),n}async function Xs(e,t,a,o={}){const s=await k(),i=await s.get("espacos",e);i&&(i.nome=t,i.categoria=a,ja(i,o),i.atualizado_em=z(),await s.put("espacos",i))}async function pt(e,t){const a=await k(),o=await a.get("espacos",e);o&&(o.arquivado=t,o.arquivado_em=t?z():void 0,o.atualizado_em=z(),await a.put("espacos",o))}async function za(e){const t=await k(),a=(await t.getAllFromIndex("temas","espaco_id",e)).filter(s=>!s.excluido);let o=0;for(const s of a)o+=(await t.getAllFromIndex("notas","tema_id",s.id)).filter(i=>!i.excluido).length;return{temas:a.length,notas:o}}async function Ra(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(r=>!r.excluido),i=(await Promise.all(o.map(r=>t.getAllFromIndex("notas","tema_id",r.id)))).flat().filter(r=>!r.excluido),n=z(),c=t.transaction(["espacos","temas","notas"],"readwrite");await c.objectStore("espacos").put(fe(a,n));for(const r of o)await c.objectStore("temas").put(fe(r,n));for(const r of i)await c.objectStore("notas").put(fe(r,n));await c.done}function oe(e){return new Promise(t=>{var i,n;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${m(e.title)}</div>
        <p class="modal__message">${m(e.message).replace(/\n/g,"<br>")}</p>
        <div class="form-actions">
          <button class="btn btn--${e.confirmVariant??"danger"}" id="modal-confirm" type="button">${m(e.confirmLabel??"Excluir")}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${m(e.cancelLabel??"Cancelar")}</button>
        </div>
      </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&s(!1)};document.addEventListener("keydown",o);function s(c){document.removeEventListener("keydown",o),a.remove(),t(c)}(i=a.querySelector("#modal-confirm"))==null||i.addEventListener("click",()=>s(!0)),(n=a.querySelector("#modal-cancel"))==null||n.addEventListener("click",()=>s(!1)),a.addEventListener("click",c=>{c.target===a&&s(!1)})})}function Ne(e,t){return e.length===0?"":`
    <div class="chip-row" data-chips-for="${m(t)}">
      ${e.map(a=>`<button type="button" class="chip" data-chip-value="${m(a)}">${m(a)}</button>`).join("")}
    </div>
  `}function Dt(e){e.querySelectorAll("[data-chips-for]").forEach(t=>{const a=t.dataset.chipsFor,o=e.querySelector(`#${a}`);o&&t.querySelectorAll("[data-chip-value]").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.chipValue,ge(o),o.focus()})})})}function j(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}const Fa="livro",Oa=[{chave:"pasta",label:"Categoria",svg:j('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')},{chave:"livro",label:"Livro",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')},{chave:"livros",label:"Pilha de livros",svg:j('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>')},{chave:"capelo",label:"Formatura",svg:j('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>')},{chave:"igreja",label:"Igreja",svg:j('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>')},{chave:"cruz",label:"Cruz",svg:j('<path d="M12 3v18"/><path d="M7 8h10"/>')},{chave:"lampada",label:"Ideia",svg:j('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>')},{chave:"caderno",label:"Caderno",svg:j('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>')},{chave:"alvo",label:"Objetivo",svg:j('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>')},{chave:"trofeu",label:"Conquista",svg:j('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>')},{chave:"halter",label:"Treino",svg:j('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>')},{chave:"grafico",label:"Finanças",svg:j('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>')},{chave:"moeda",label:"Dinheiro",svg:j('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>')},{chave:"coracao",label:"Saúde",svg:j('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>')},{chave:"balanca",label:"Direito",svg:j('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>')},{chave:"codigo",label:"Programação",svg:j('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>')},{chave:"notaMusical",label:"Música",svg:j('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')},{chave:"globo",label:"Idiomas",svg:j('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>')},{chave:"puzzle",label:"Raciocínio",svg:j('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>')},{chave:"ampulheta",label:"História",svg:j('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>')},{chave:"frasco",label:"Ciências",svg:j('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>')},{chave:"paleta",label:"Arte",svg:j('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>')},{chave:"aviao",label:"Viagem",svg:j('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>')},{chave:"utensilios",label:"Culinária",svg:j('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>')},{chave:"maleta",label:"Negócios",svg:j('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>')},{chave:"edificio",label:"Arquitetura",svg:j('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>')},{chave:"folha",label:"Natureza",svg:j('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>')},{chave:"microfone",label:"Podcast",svg:j('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>')},{chave:"bandeira",label:"Meta",svg:j('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>')}],vt=new Map(Oa.map(e=>[e.chave,e]));function ne(e){return e&&vt.get(e)||vt.get(Fa)}const Qs=[{termos:["biblia","igreja","crist","evangelh","gospel","teolog"],chave:"igreja"},{termos:["curso","aula","formacao","treinamento","certific","faculdade","gradua"],chave:"capelo"},{termos:["livro","leitura","biblioteca","literatura"],chave:"livros"},{termos:["idioma","ingles","espanhol","lingua","alemao","frances","japones"],chave:"globo"},{termos:["financ","invest","econom","dinheiro","mercado","renda"],chave:"grafico"},{termos:["direito","jurid","lei ","processo","constituic","advoc"],chave:"balanca"},{termos:["saude","medic","anatomia","nutric","enferm"],chave:"coracao"},{termos:["programa","codigo","tech","computa","software","python","javascript","dados"],chave:"codigo"},{termos:["musica","violao","piano","guitarra","canto"],chave:"notaMusical"},{termos:["psicolog","mente","comportament","filosof","logica"],chave:"puzzle"},{termos:["historia","histori"],chave:"ampulheta"},{termos:["ciencia","fisica","quimica","biolog","matemat"],chave:"frasco"},{termos:["arte","desenho","pintura","design","fotograf"],chave:"paleta"},{termos:["viagem","geografia","turismo","pais"],chave:"aviao"},{termos:["culinaria","receita","cozinha","gastronom"],chave:"utensilios"},{termos:["negocio","empresa","empreend","gestao","administra"],chave:"maleta"},{termos:["arquitet","engenharia","construc","obra"],chave:"edificio"},{termos:["natureza","ecolog","ambient","planta","agricultur","jardin"],chave:"folha"},{termos:["podcast","entrevista","audio","oratoria"],chave:"microfone"},{termos:["estudo","estud","aprend","teoria","conheciment"],chave:"lampada"},{termos:["treino","esporte","academia","fitness","exercic"],chave:"halter"},{termos:["meta","objetivo","projeto","planejament","produtiv"],chave:"alvo"}];function Js(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Nt(e){var a;const t=Js(e);if(t.trim())return(a=Qs.find(o=>o.termos.some(s=>t.includes(s))))==null?void 0:a.chave}function he(e){return e.icone&&vt.has(e.icone)?e.icone:Nt(`${e.nome??""} ${e.categoria??""}`)??Fa}const Ys="pasta";function Ha(e){return Nt(e)??Ys}const ea=["Azul","Verde","Âmbar","Violeta","Vermelho","Ciano","Rosa","Índigo"];function Ba(e){const{prefix:t,icone:a,cor:o}=e;return`
    <div class="field espaco-visual" data-espaco-visual="${re(t)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome/categoria, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone do espaço">
        ${Oa.map(s=>`
          <button
            type="button"
            class="espaco-icon-btn${s.chave===a?" is-selected":""}"
            data-icone="${re(s.chave)}"
            title="${re(s.label)}"
            aria-label="${re(s.label)}"
            aria-pressed="${s.chave===a}"
          >${s.svg}</button>
        `).join("")}
      </div>
      <input type="hidden" id="${re(t)}-icone" value="${re(a??"")}" />

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
        ${Array.from({length:ue},(s,i)=>`
          <button
            type="button"
            class="color-swatch${o===i?" is-selected":""}"
            data-cor="${i}"
            style="--swatch: var(--accent-${i});"
            title="${ea[i]??`Cor ${i}`}"
            aria-label="${ea[i]??`Cor ${i}`}"
            aria-pressed="${o===i}"
          ></button>
        `).join("")}
      </div>
      <input type="hidden" id="${re(t)}-cor" value="${typeof o=="number"?String(o):""}" />
    </div>
  `}function Va(e,t){const{prefix:a,getTexto:o}=t,s=e.querySelector(`[data-espaco-visual="${be(a)}"]`);if(!s)return;const i=s.querySelector(`#${be(a)}-icone`),n=s.querySelector(`#${be(a)}-cor`),c=Array.from(s.querySelectorAll("[data-icone]")),r=d=>{i&&(i.value=d);for(const v of c){const f=v.dataset.icone===d;v.classList.toggle("is-selected",f),v.setAttribute("aria-pressed",String(f))}};let l=!1;for(const d of c)d.addEventListener("click",()=>{l=!0,r(d.dataset.icone??"")});s.querySelectorAll("[data-cor]").forEach(d=>{d.addEventListener("click",()=>{n&&(n.value=d.dataset.cor??""),s.querySelectorAll("[data-cor]").forEach(v=>{const f=v===d;v.classList.toggle("is-selected",f),v.setAttribute("aria-pressed",String(f))})})});const u=()=>{if(l)return;const d=Nt(o());for(const v of c)v.classList.toggle("is-suggested",!!d&&v.dataset.icone===d);d&&r(d)};u(),e.querySelectorAll('input[type="text"]').forEach(d=>{d.addEventListener("input",u)})}function Ua(e,t){var n,c;const a=e.querySelector(`[data-espaco-visual="${be(t)}"]`),o=(n=a==null?void 0:a.querySelector(`#${be(t)}-icone`))==null?void 0:n.value.trim(),s=(c=a==null?void 0:a.querySelector(`#${be(t)}-cor`))==null?void 0:c.value.trim(),i={};if(o&&(i.icone=o),s!==void 0&&s!==""){const r=Number(s);Number.isInteger(r)&&r>=0&&r<ue&&(i.cor=r)}return i}function re(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function be(e){return e.replace(/["\\]/g,"\\$&")}async function Te(e,t){var v,f,E,h;const a=await Na(t.perfilId),o=a.filter(g=>!g.arquivado),s=a.filter(g=>g.arquivado),i=await ti(a.map(g=>g.id)),n=Mt(o),c=Ta(o),r=Tt(n.map(g=>g.categoria)),l=await Pa(t.perfilId);e.innerHTML=`
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
        ${Ne(l,"input-categoria-espaco")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${Ba({prefix:"novo-espaco"})}
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
    `:n.map(g=>{const A=g.itens.length===1?g.itens[0]:null,x=A?c.get(A.id)??V(A.id):r.get(Ee(g.categoria))??V(g.categoria),C=ne(A?he(A):Ha(g.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${x}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${x}" aria-hidden="true">${C.svg}</span>
            ${m(g.categoria||"Sem categoria")}
          </span>
        </summary>
        <div class="item-list">
          ${g.itens.map(M=>ei(M,i.get(M.id)??0,c.get(M.id)??V(M.id))).join("")}
        </div>
      </details>
    `}).join("")}

    ${s.length>0?`
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${s.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${s.map(g=>`
            <div class="item-row" data-id="${m(g.id)}">
              <button class="item-row__main" data-open="${m(g.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${V(g.id)}" aria-hidden="true">${ne(he(g)).svg}</span>
                  <span class="item-row__title">${m(g.nome)}</span>
                </span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${m(g.id)}" type="button">Reativar</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
    `:""}
  `,Dt(e),Va(e,{prefix:"novo-espaco",getTexto:()=>{var g,A;return`${((g=e.querySelector("#input-nome-espaco"))==null?void 0:g.value)??""} ${((A=e.querySelector("#input-categoria-espaco"))==null?void 0:A.value)??""}`}});const u=e.querySelector("#form-novo-espaco"),d=()=>{var g;u.style.display="block",(g=e.querySelector("#input-nome-espaco"))==null||g.focus()};(v=e.querySelector("#btn-novo-espaco"))==null||v.addEventListener("click",d),(f=e.querySelector("#btn-empty-novo-espaco"))==null||f.addEventListener("click",d),(E=e.querySelector("#btn-cancelar-espaco"))==null||E.addEventListener("click",()=>{u.style.display="none"}),(h=e.querySelector("#btn-salvar-espaco"))==null||h.addEventListener("click",async()=>{const g=e.querySelector("#input-nome-espaco"),A=e.querySelector("#input-categoria-espaco"),x=g.value.trim();if(!x)return;const C=await Zs(t.perfilId,x,A.value.trim(),Ua(e,"novo-espaco"));D(`espacos/${C.id}`)}),e.querySelectorAll("[data-open]").forEach(g=>{g.addEventListener("click",()=>D(`espacos/${g.dataset.open}`))}),e.querySelectorAll("[data-archive]").forEach(g=>{g.addEventListener("click",async()=>{await pt(g.dataset.archive,!0),Te(e,t)})}),e.querySelectorAll("[data-unarchive]").forEach(g=>{g.addEventListener("click",async()=>{await pt(g.dataset.unarchive,!1),Te(e,t)})}),e.querySelectorAll("[data-excluir]").forEach(g=>{g.addEventListener("click",async()=>{const A=g.dataset.excluir,x=g.dataset.nome??"",C=await za(A);await oe({title:`Excluir "${x}"?`,message:`Isso manda pra Lixeira o espaço com ${C.temas} tema(s) e ${C.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ra(A),Te(e,t))})})}function ei(e,t,a){const o=ne(he(e));return`
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
  `}async function ti(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("temas","espaco_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function Ga(e){const a=await(await k()).getAllFromIndex("temas","espaco_id",e);return de(a.filter(o=>!o.excluido),o=>o.nome)}async function Ka(e){return(await k()).get("temas",e)}async function ai(e,t,a){const o=await k(),s=z(),i={id:se(),espaco_id:e,nome:t,categoria:a,favorito:!1,criado_em:s,atualizado_em:s};return await o.put("temas",i),i}async function oi(e,t,a){const o=await k(),s=await o.get("temas",e);s&&(s.nome=t,s.categoria=a,s.atualizado_em=z(),await o.put("temas",s))}async function si(e){const t=await k(),a=await t.get("temas",e);return a?(a.favorito=!a.favorito,a.atualizado_em=z(),await t.put("temas",a),a.favorito):!1}async function ii(e){return{notas:(await(await k()).getAllFromIndex("notas","tema_id",e)).filter(o=>!o.excluido).length}}async function ni(e){const t=await k(),a=await t.get("temas",e);if(!a)return;const o=(await t.getAllFromIndex("notas","tema_id",e)).filter(n=>!n.excluido),s=z(),i=t.transaction(["temas","notas"],"readwrite");await i.objectStore("temas").put(fe(a,s));for(const n of o)await i.objectStore("notas").put(fe(n,s));await i.done}function ri(e,t){let a=e.has(t)?t:J(t,-1);if(!e.has(a))return 0;let o=0;for(;e.has(a);)o++,a=J(a,-1);return o}function ci(e){const t=e.filter(o=>o==="dificil").length,a=e.filter(o=>o==="facil").length;return t>a}const li=5;async function di(e){const t=await k(),a=ee(),o=J(a,-6),[s,i,n,c,r]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"pendente"])),t.getAll("notas"),t.getAll("temas"),t.getAll("espacos")]),l=new Map(n.map(_=>[_.id,_])),u=new Map(c.map(_=>[_.id,_])),d=new Map(r.map(_=>[_.id,_])),v=_=>{const W=l.get(_.nota_id);if(!W||W.excluido)return!1;const ye=u.get(W.tema_id);if(!ye||ye.excluido)return!1;const Ft=d.get(ye.espaco_id);return!!Ft&&!Ft.excluido},f=s.filter(_=>_.avaliacao&&v(_)),E=i.filter(v),h=f.filter(_=>_.data_concluida===a),g=h.length,A=h.reduce((_,W)=>_+(W.duracao_segundos??0),0),x=f.filter(_=>_.data_concluida&&_.data_concluida>=o&&_.data_concluida<=a).length,C=["1","7","30","180"].map(_=>({estagio:_,count:E.filter(W=>W.estagio===_).length})),M=[];for(let _=1;_<=7;_++){const W=J(a,_);M.push({data:W,count:E.filter(ye=>ye.data_agendada===W).length})}const F=J(a,-29),O=f.filter(_=>_.data_concluida>=F),U={facil:O.filter(_=>_.avaliacao==="facil").length,medio:O.filter(_=>_.avaliacao==="medio").length,dificil:O.filter(_=>_.avaliacao==="dificil").length,total:0};U.total=U.facil+U.medio+U.dificil;const L=new Set(f.map(_=>_.data_concluida)),H=ri(L,a),X=[];for(let _=6;_>=0;_--)X.push(L.has(J(a,-_)));const G=f.filter(_=>_.estagio==="consulta").length,B=f.filter(_=>_.avaliacao==="dificil"),te=Array.from(new Set(B.map(_=>_.nota_id))),b=await Promise.all(te.map(_=>t.get("notas",_))),q=new Map(b.filter(_=>!!_).map(_=>[_.id,_.tema_id])),y=new Map;for(const _ of B){const W=q.get(_.nota_id);W&&y.set(W,(y.get(W)??0)+1)}const p=Array.from(y.keys()),w=(await Promise.all(p.map(_=>t.get("temas",_)))).filter(_=>!!_).map(_=>({temaId:_.id,temaNome:_.nome,count:y.get(_.id)})).sort((_,W)=>W.count-_.count).slice(0,li),T=r.filter(_=>_.perfil_id===e&&!_.excluido),N=T.filter(_=>!_.arquivado).length,Q=(await Promise.all(T.map(_=>t.getAllFromIndex("temas","espaco_id",_.id)))).flat().filter(_=>!_.excluido),Ue=Q.length,ke=(await Promise.all(Q.map(_=>t.getAllFromIndex("notas","tema_id",_.id)))).flat().filter(_=>!_.excluido).length;return{revisoesHoje:g,revisoesUltimos7Dias:x,streakDias:H,diasAtivosUltimos7:X,rankingDificeis:w,espacosAtivos:N,totalTemas:Ue,totalNotas:ke,itensEmConsulta:G,porEstagio:C,tempoHojeSegundos:A,cargaProximos7:M,retencao30:U}}async function ui(e){const t=await k(),a=await t.getAllFromIndex("temas","espaco_id",e),s=(await Promise.all(a.map(n=>t.getAllFromIndex("notas","tema_id",n.id)))).flat();return(await Promise.all(s.map(n=>t.getAllFromIndex("itens_revisao","nota_id",n.id)))).flat().reduce((n,c)=>n+(c.duracao_segundos??0),0)}async function mi(e){const t=await k(),a=await t.getAllFromIndex("notas","tema_id",e);return(await Promise.all(a.map(s=>t.getAllFromIndex("itens_revisao","nota_id",s.id)))).flat().reduce((s,i)=>s+(i.duracao_segundos??0),0)}function Wa(e){var s;const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${m(e.title)}</div>
      <div class="modal__message">${e.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${m(e.closeLabel??"Fechar")}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=i=>{i.key==="Escape"&&o()};document.addEventListener("keydown",a);function o(){document.removeEventListener("keydown",a),t.remove()}(s=t.querySelector("#info-modal-close"))==null||s.addEventListener("click",o),t.addEventListener("click",i=>{i.target===t&&o()})}async function pi(e){const t=await k(),a=z(),o={id:se(),perfil_id:e.perfilId,espaco_id:e.espacoId,tema_id:e.temaId,nota_id:e.notaId,avaliacao:e.avaliacao,escopo:e.escopo,sessao_id:e.sessaoId,criado_em:a,atualizado_em:a};await t.put("avaliacoes",o)}async function vi(e,t=20){const a=await k(),o=await a.getAllFromIndex("avaliacoes","perfil_id",e),s=new Map((await a.getAll("espacos")).map(r=>[r.id,r.nome])),i=new Map((await a.getAll("temas")).map(r=>[r.id,r.nome])),n={total:0,facil:0,medio:0,dificil:0,sessoesTotal:0,sessoes:[]},c=new Map;for(const r of o){n.total++,n[r.avaliacao]++,(!n.ultimaEm||r.criado_em>n.ultimaEm)&&(n.ultimaEm=r.criado_em);let l=c.get(r.sessao_id);l||(l={sessao_id:r.sessao_id,criado_em:r.criado_em,total:0,facil:0,medio:0,dificil:0,escopo:r.escopo,contexto:(r.escopo==="tema"?i.get(r.tema_id):s.get(r.espaco_id))??"Conteúdo excluído"},c.set(r.sessao_id,l)),l.total++,l[r.avaliacao]++,r.criado_em>l.criado_em&&(l.criado_em=r.criado_em)}return n.sessoesTotal=c.size,n.sessoes=[...c.values()].sort((r,l)=>l.criado_em.localeCompare(r.criado_em)).slice(0,t),n}function fi(e,t){if(t.tipo==="tema")return[{rotulo:t.nomeContexto,escopo:"tema",itens:e}];const a=new Map;for(const o of e){let s=a.get(o.tema.id);s||(s={rotulo:o.tema.nome,escopo:"tema",itens:[]},a.set(o.tema.id,s)),s.itens.push(o)}return a.size<=1?[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e}]:[{rotulo:`${t.nomeContexto} (todo o espaço)`,escopo:"espaco",itens:e},...[...a.values()].sort((o,s)=>o.rotulo.localeCompare(s.rotulo,"pt-BR"))]}const ta=[{key:"basico",label:"Básico",n:5},{key:"medio",label:"Médio",n:15},{key:"longo",label:"Longo",n:30}],gi=[{valor:"dificil",label:"Difícil",classe:"btn--review-dificil",icone:S.caraTriste},{valor:"medio",label:"Médio",classe:"btn--review-medio",icone:S.caraNeutra},{valor:"facil",label:"Fácil",classe:"btn--review-facil",icone:S.caraFeliz}];function bi(e){const t=[...e];for(let a=t.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function Za(e,t,a,o){var i;if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra avaliar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",o);return}const s=fi(t,a);s.length>1?Xa(e,s,a,o):Qa(e,s[0],s,a,o)}function Pt(e){return`
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← ${m(e)}</button>
    </div>
  `}function Xa(e,t,a,o){var s;e.innerHTML=`
    ${Pt("Encerrar avaliação")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
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
  `,(s=e.querySelector("#btn-sair-avaliacao"))==null||s.addEventListener("click",o),e.querySelectorAll("[data-escopo]").forEach(i=>{i.addEventListener("click",()=>{Qa(e,t[Number(i.dataset.escopo)],t,a,o)})})}function Qa(e,t,a,o,s){var i;e.innerHTML=`
    ${Pt("Voltar")}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${S.dice}</div>
        <h2 style="margin:0;">Avaliação — ${m(t.rotulo)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse com notas aleatórias e marque Fácil, Médio ou Difícil em cada uma. Isso não
          afeta sua fila de revisão. ${t.itens.length} nota(s) — escolha quantas:
        </p>
        <div class="stack">
          ${ta.map(n=>`
            <button class="btn btn--secondary btn--block" data-tier="${n.key}" type="button">
              ${n.label} — ${Math.min(n.n,t.itens.length)} nota(s)
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,(i=e.querySelector("#btn-sair-avaliacao"))==null||i.addEventListener("click",()=>{o.tipo==="espaco"&&a.length>1?Xa(e,a,o,s):s()}),e.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",()=>{const c=ta.find(u=>u.key===n.dataset.tier),r=bi(t.itens).slice(0,Math.min(c.n,t.itens.length)),l={id:se(),escopo:t.escopo,itens:r,contagem:{facil:0,medio:0,dificil:0}};ft(e,l,0,o,s)})})}function ft(e,t,a,o,s,i=!1){var c,r;if(a>=t.itens.length){hi(e,t,o,s);return}const n=t.itens[a];e.innerHTML=`
    ${Pt("Encerrar avaliação")}
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${m(n.tema.nome)} · ${a+1} de ${t.itens.length}</div>
      <div class="review-card__titulo">${n.nota.favorito?`${S.star} `:""}${m(n.nota.titulo||"(sem título)")}</div>
      ${i?`
        <div class="review-card__content markdown-preview">${Be(n.nota.conteudo)}</div>
        <div class="review-actions">
          ${gi.map(l=>`
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
  `,(c=e.querySelector("#btn-sair-avaliacao"))==null||c.addEventListener("click",s),(r=e.querySelector("#btn-revelar"))==null||r.addEventListener("click",()=>{ft(e,t,a,o,s,!0)}),e.querySelectorAll("[data-avaliacao]").forEach(l=>{l.addEventListener("click",async()=>{const u=l.dataset.avaliacao;t.contagem[u]++,await pi({perfilId:o.perfilId,espacoId:o.espacoId,temaId:n.tema.id,notaId:n.nota.id,avaliacao:u,escopo:t.escopo,sessaoId:t.id}),ft(e,t,a+1,o,s)})})}function hi(e,t,a,o){var c;const{facil:s,medio:i,dificil:n}=t.contagem;e.innerHTML=`
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${S.confete}</div>
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
  `,(c=e.querySelector("#btn-terminar"))==null||c.addEventListener("click",o)}function jt(e){return`
    <div class="breadcrumb">
      ${e.map((t,a)=>{const s=`${t.iconKey?`<span class="espaco-icon-inline"${t.iconColor?` style="--badge-accent:${t.iconColor}"`:""} aria-hidden="true">${ne(t.iconKey).svg}</span>`:t.colorKey?`<span class="color-dot" style="--dot-color:${V(t.colorKey)}"></span>`:""}${m(t.label)}`,i=a===e.length-1,n=t.route&&!i?`<button class="link" data-crumb="${m(t.route)}" type="button">${s}</button>`:`<span class="breadcrumb__current">${s}</span>`;return a===0?n:`<span class="breadcrumb__sep" aria-hidden="true">›</span>${n}`}).join("")}
    </div>
  `}function zt(e){e.querySelectorAll("[data-crumb]").forEach(t=>{t.addEventListener("click",()=>D(t.dataset.crumb))})}async function Me(e,t){var C,M,F,O,U,L,H,X,G,B,te,b,q;const a=await It(t);if(!a){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const o=await Ga(t),s=await yi(o.map(y=>y.id)),i=Mt(o),n=await Pa(a.perfil_id),c=Ct(o.map(y=>y.categoria)),r=[...o].sort((y,p)=>p.criado_em.localeCompare(y.criado_em))[0],l=((C=r==null?void 0:r.categoria)==null?void 0:C.trim())||void 0,u=((M=r==null?void 0:r.nome)==null?void 0:M.trim())||void 0,d=qa(a.cor,V(a.id)),v=ne(he(a)),f=Tt(i.map(y=>y.categoria));e.innerHTML=`
    ${jt([{label:"Espaços",route:"espacos"},...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome,iconKey:v.chave,iconColor:d}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${d}" aria-hidden="true">${v.svg}</span>${m(a.nome)}
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
            <button id="btn-avaliar" type="button">${S.dice} Avaliar notas</button>
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
        ${Ne(n,"input-categoria-espaco-editar")}
      </div>
      <div style="margin-top: var(--space-4);">
        ${Ba({prefix:"editar-espaco",icone:a.icone,cor:a.cor})}
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
        <input class="input${l?" input--sugerido":""}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${m(l??"")}" />
        ${l?'<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>':""}
        ${Ne(c,"input-categoria-tema")}
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
    `:i.map(y=>{const p=f.get(Ee(y.categoria))??V(y.categoria||"sem-categoria"),$=ne(Ha(y.categoria));return`
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${p}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${p}" aria-hidden="true">${$.svg}</span>
            ${m(y.categoria||"Sem categoria")}
          </span>
          <span class="category-group__actions">
            ${a.arquivado?"":`<button class="category-group__action" type="button" data-novo-tema-categoria="${m(y.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`}
            <button class="category-group__action" type="button" data-pdf-categoria="${m(xs(y.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${y.itens.map(w=>`
            <button class="item-row" data-open="${m(w.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${p}">
              <span class="item-row__main">
                <span class="item-row__title">${w.favorito?`${S.star} `:""}${m(w.nome)}</span>
                <span class="item-row__meta">${s.get(w.id)??0} nota(s)</span>
              </span>
            </button>
          `).join("")}
        </div>
      </details>
    `}).join("")}
  `,zt(e),Dt(e),Va(e,{prefix:"editar-espaco",getTexto:()=>{var y,p;return`${((y=e.querySelector("#input-nome-espaco-editar"))==null?void 0:y.value)??""} ${((p=e.querySelector("#input-categoria-espaco-editar"))==null?void 0:p.value)??""}`}}),e.querySelectorAll("[data-pdf-categoria]").forEach(y=>{y.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),D(`espacos/${t}/pdf/${y.dataset.pdfCategoria}`)})}),(F=e.querySelector("#btn-arquivar"))==null||F.addEventListener("click",async()=>{!a.arquivado&&!await oe({title:`Arquivar "${a.nome}"?`,message:"Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.",confirmLabel:"Arquivar",confirmVariant:"primary"})||(await pt(a.id,!a.arquivado),Me(e,t))});const E=e.querySelector("#form-editar-espaco");(O=e.querySelector("#btn-editar"))==null||O.addEventListener("click",()=>{var y;E.style.display="block",(y=e.querySelector("#input-nome-espaco-editar"))==null||y.focus()}),(U=e.querySelector("#btn-cancelar-edicao"))==null||U.addEventListener("click",()=>{E.style.display="none"}),(L=e.querySelector("#btn-salvar-edicao"))==null||L.addEventListener("click",async()=>{const y=e.querySelector("#input-nome-espaco-editar").value.trim(),p=e.querySelector("#input-categoria-espaco-editar").value.trim();y&&(await Xs(a.id,y,p,Ua(e,"editar-espaco")),Me(e,t))}),(H=e.querySelector("#btn-detalhes"))==null||H.addEventListener("click",async()=>{const y=Array.from(s.values()).reduce((I,Q)=>I+Q,0),p=K(),$=await ui(a.id);let w,T,N;if(a.arquivado&&a.arquivado_em){const I=we(K(new Date(a.criado_em)),K(new Date(a.arquivado_em)));w=String(I),T="Dias até arquivar",N=`Criado em ${ie(a.criado_em)} · arquivado em ${ie(a.arquivado_em)}`}else if(a.arquivado)w="—",T="Duração",N=`Criado em ${ie(a.criado_em)} · arquivado antes desse registro de data existir`;else{const I=we(K(new Date(a.criado_em)),p);w=String(I),T=I===1?"Dia ativo":"Dias ativo",N=`Criado em ${ie(a.criado_em)}`}Wa({title:a.nome,bodyHtml:`
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
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${St($)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${w}</div>
            <div class="stat-tile__label">${T}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">${N} · ${a.arquivado?"Arquivado":"Ativo"}</p>
      `})}),(X=e.querySelector("#btn-avaliar"))==null||X.addEventListener("click",async()=>{const y=await es(a.id),p={perfilId:a.perfil_id,espacoId:a.id,nomeContexto:a.nome,tipo:"espaco"};Za(e,y,p,()=>Me(e,t))}),(G=e.querySelector("#btn-excluir"))==null||G.addEventListener("click",async()=>{const y=await za(a.id);await oe({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o espaço com ${y.temas} tema(s) e ${y.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await Ra(a.id),D("espacos"))});const h=e.querySelector("#form-novo-tema"),g=()=>{var y;h&&(h.style.display="block"),(y=e.querySelector("#input-nome-tema"))==null||y.focus()};(B=e.querySelector("#btn-novo-tema"))==null||B.addEventListener("click",g),(te=e.querySelector("#btn-empty-novo-tema"))==null||te.addEventListener("click",g),(b=e.querySelector("#btn-cancelar-tema"))==null||b.addEventListener("click",()=>{h&&(h.style.display="none")});const A=e.querySelector("#input-nome-tema");u&&A&&A.addEventListener("input",()=>ge(A),{once:!0});const x=e.querySelector("#input-categoria-tema");l&&x&&x.addEventListener("input",()=>ge(x),{once:!0}),e.querySelectorAll("[data-novo-tema-categoria]").forEach(y=>{y.addEventListener("click",p=>{var $;p.preventDefault(),p.stopPropagation(),h&&(h.style.display="block"),x&&(x.value=y.dataset.novoTemaCategoria,ge(x)),($=e.querySelector("#input-nome-tema"))==null||$.focus(),h==null||h.scrollIntoView({behavior:"smooth",block:"start"})})}),(q=e.querySelector("#btn-salvar-tema"))==null||q.addEventListener("click",async()=>{const y=e.querySelector("#input-nome-tema"),p=e.querySelector("#input-categoria-tema"),$=y.value.trim();if(!$)return;const w=await ai(t,$,p.value.trim());D(`temas/${w.id}`)}),e.querySelectorAll("[data-open]").forEach(y=>{y.addEventListener("click",()=>D(`temas/${y.dataset.open}`))})}async function yi(e){const t=await k(),a=await Promise.all(e.map(s=>t.getAllFromIndex("notas","tema_id",s))),o=new Map;return e.forEach((s,i)=>o.set(s,a[i].length)),o}async function _i(e){const t=await k(),a=await t.get("espacos",e);if(!a)return;const o=(await t.getAllFromIndex("temas","espaco_id",e)).filter(c=>!c.excluido),s=Mt(o),i=Et()==="titulo",n=[];for(const c of s){const r=[];for(const l of c.itens){const u=(await t.getAllFromIndex("notas","tema_id",l.id)).filter(v=>!v.excluido);i?de(u,v=>v.titulo):u.sort((v,f)=>v.criado_em.localeCompare(f.criado_em));const d=[];for(const v of u){const E=(await t.getAllFromIndex("itens_revisao","nota_id",v.id)).map(h=>h.avaliacao).filter(h=>!!h);d.push({nota:v,fraca:ci(E)})}r.push({tema:l,notas:d})}n.push({categoria:c.categoria,temas:r})}return{espaco:a,grupos:n}}function gt(e){return e||"Sem categoria"}function Pe(e,t){return`${t}-${e.replace(/\./g,"-")}`}function Ja(e){return e.map((t,a)=>{const o=`${a+1}`,s=t.temas.map((i,n)=>{const c=`${o}.${n+1}`;return{temaPdf:i,numero:c,notas:i.notas.map((r,l)=>({notaPdf:r,numero:`${c}.${l+1}`}))}});return{grupo:t,numero:o,temas:s,totalNotas:s.reduce((i,n)=>i+n.notas.length,0)}})}function wi(e){const t=[];let a=0,o=0;for(const s of e){a+=s.temas.length,o+=s.totalNotas,t.push({nivel:"categoria",numero:s.numero,nome:gt(s.grupo.categoria),notas:s.totalNotas,anexo:Pe(s.numero,"pdf-cat")});for(const i of s.temas)t.push({nivel:"tema",numero:i.numero,nome:i.temaPdf.tema.nome,notas:i.notas.length,anexo:Pe(i.numero,"pdf-tema")})}return{linhas:t,totalTemas:a,totalNotas:o}}function $i(e){return Pe(e.numero,"pdf-cat")}function Ei(e){return Pe(e.numero,"pdf-tema")}function Xe(e){let t=e;return t=t.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)","g"),"_$1_"),t=t.replace(/\*\*([^*]+)\*\*/g,"*$1*"),t=t.replace(/`([^`]+)`/g,"$1"),t=t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${He.join("|")})\\}`,"g"),"$1"),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1 ($2)"),t}const aa=["•","◦","▪"];function Ya(e){return e.replace(/\r\n/g,`
`).split(`
`).map(t=>{const a=t.trim();if(a==="")return"";const o=/^#{1,3}\s+(.*)$/.exec(a);if(o)return`*${Xe(o[1])}*`;const s=/^[-*]\s+(.*)$/.exec(a);if(s){const i=Math.floor((t.length-t.trimStart().length)/2),n=aa[Math.min(i,aa.length-1)];return`${"  ".repeat(i)}${n} ${Xe(s[1])}`}return Xe(a)}).join(`
`)}function xi(e){const t=[`*${e.titulo||"(sem título)"}*`];return e.fonte&&t.push(`_${e.fonte}_`),t.push("",Ya(e.conteudo)),t.join(`
`).trim()}function Si(e,t){const a=[`*${e.nome.toUpperCase()}*`];for(const o of Ja(t))if(o.temas.length!==0){a.push("",`▸ ${o.numero} ${(o.grupo.categoria||"sem categoria").toUpperCase()}`);for(const s of o.temas){if(a.push("",`— ${s.numero} ${s.temaPdf.tema.favorito?"⭐ ":""}*${s.temaPdf.tema.nome}*`),s.notas.length===0){a.push("(sem notas)");continue}for(const i of s.notas){const n=`${i.notaPdf.nota.favorito?"⭐ ":""}${i.notaPdf.fraca?"⚠ ":""}`;a.push("",`${n}${i.numero} *${i.notaPdf.nota.titulo||"(sem título)"}*`),i.notaPdf.nota.fonte&&a.push(`_${i.notaPdf.nota.fonte}_`),a.push(Ya(i.notaPdf.nota.conteudo))}}}return a.join(`
`).trim()}const oa="memoriza:pdf:indice",sa="memoriza:pdf:quebraCategoria";function ia(e,t){const a=localStorage.getItem(e);return a===null?t:a==="1"}function na(e,t){localStorage.setItem(e,t?"1":"0")}function ae(e,t){return`${e} ${t}${e===1?"":"s"}`}async function ki(e,t,a){var O,U;const o=await _i(t);if(!o){e.innerHTML='<p class="text-muted">Espaço não encontrado.</p>';return}const{espaco:s}=o,i=a===void 0?o.grupos:o.grupos.filter(L=>L.categoria===a),n=Si(s,i),c=qa(s.cor,V(s.id)),r=ne(he(s)),l=Ja(i),u=wi(l),d=Tt(i.map(L=>L.categoria)),v=L=>d.get(Ee(L))??V(Ee(L)),f=i.every(L=>L.temas.length===0),E=i.length>1,h=E&&ia(oa,!0),g=E&&ia(sa,!0);e.innerHTML=`
    <div class="pdf-toolbar no-print">
      <button class="btn btn--secondary btn--sm" data-back type="button">← Voltar</button>
      <button class="btn btn--primary btn--sm" id="btn-imprimir" type="button">Imprimir / Salvar como PDF</button>
      <button class="btn btn--secondary btn--sm" id="btn-copiar" type="button">Copiar texto</button>
      ${E?`
        <label class="pdf-opcao"><input type="checkbox" id="pdf-opcao-indice" ${h?"checked":""}> Índice</label>
        <label class="pdf-opcao"><input type="checkbox" id="pdf-opcao-quebra" ${g?"checked":""}> Nova página por Categoria</label>
      `:""}
      <span class="text-muted" style="font-size: var(--font-size-sm);">
        "Imprimir" e depois "Salvar como PDF" (ou similar) gera o arquivo. "Copiar texto" é pra colar direto numa conversa, ex: WhatsApp.
      </span>
    </div>

    <article class="pdf-page" data-quebra="${g?"categoria":"fluxo"}">
      <header class="pdf-capa">
        <h1>
          <span class="espaco-icon-inline" style="--badge-accent:${c}" aria-hidden="true">${r.svg}</span>${m(s.nome)}
        </h1>
        <p class="pdf-meta">
          ${a!==void 0?`Categoria: ${m(gt(a))} · `:""}Gerado em ${ie(K()+"T00:00:00Z")}
          · ${ae(i.length,"categoria")} · ${ae(u.totalTemas,"tema")} · ${ae(u.totalNotas,"nota")}
        </p>
      </header>

      ${f?`<p class="text-muted">${a!==void 0?"Esta categoria ainda não tem temas ou notas.":"Este espaço ainda não tem temas ou notas."}</p>`:""}

      ${E?`
        <nav class="pdf-indice" id="pdf-indice" aria-label="Índice" ${h?"":"hidden"}>
          <div class="pdf-indice__cabecalho">
            <span class="pdf-indice__titulo">Índice</span>
            <span class="pdf-contagem">${ae(i.length,"categoria")} · ${ae(u.totalTemas,"tema")} · ${ae(u.totalNotas,"nota")}</span>
          </div>
          <ul class="pdf-indice__lista">
            ${u.linhas.map(L=>`
              <li class="pdf-indice__item pdf-indice__item--${L.nivel}">
                <button class="pdf-indice__link" type="button" data-ancora="${L.anexo}">
                  <span class="pdf-num">${L.numero}</span>
                  <span class="pdf-indice__nome">${m(L.nome)}</span>
                  <span class="pdf-contagem">${ae(L.notas,"nota")}</span>
                </button>
              </li>
            `).join("")}
          </ul>
        </nav>
      `:""}

      ${l.map((L,H)=>{const X=v(L.grupo.categoria);return`
        <section class="pdf-category${H===0?" pdf-category--primeira":""}" id="${$i(L)}" style="--cat-accent:${X}">
          <div class="pdf-category__title">
            <span class="pdf-num">${L.numero}</span>
            <span class="color-dot" style="--dot-color:${X}" aria-hidden="true"></span>
            <span class="pdf-nivel">Categoria</span>
            <span class="pdf-category__nome">${m(gt(L.grupo.categoria))}</span>
            <span class="pdf-contagem">${ae(L.temas.length,"tema")} · ${ae(L.totalNotas,"nota")}</span>
          </div>
          ${L.temas.map(G=>`
            <section class="pdf-tema" id="${Ei(G)}" style="--tema-accent:${X}">
              <div class="pdf-tema__title">
                <span class="pdf-num pdf-num--tema">${G.numero}</span>
                <span class="pdf-nivel">Tema</span>
                ${G.temaPdf.tema.favorito?`${S.star} `:""}<span class="pdf-tema__nome">${m(G.temaPdf.tema.nome)}</span>
                <span class="pdf-contagem">${ae(G.notas.length,"nota")}</span>
              </div>
              ${G.notas.length===0?'<p class="text-muted">Sem notas.</p>':G.notas.map(B=>`
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    <span class="pdf-num pdf-num--nota">${B.numero}</span>
                    ${B.notaPdf.nota.favorito?`${S.star} `:""}
                    <span class="pdf-nota__nome">${m(B.notaPdf.nota.titulo||"(sem título)")}</span>
                    ${B.notaPdf.fraca?`<span class="badge badge--danger">${S.alert} Reforçar</span>`:""}
                  </div>
                  ${B.notaPdf.nota.fonte?`<div class="pdf-nota__meta">${m(B.notaPdf.nota.fonte)}</div>`:""}
                  <div class="markdown-preview">${Be(B.notaPdf.nota.conteudo)}</div>
                </div>
              `).join("")}
            </section>
          `).join("")}
        </section>
      `}).join("")}
    </article>
  `,(O=e.querySelector("[data-back]"))==null||O.addEventListener("click",()=>D(`espacos/${t}`)),(U=e.querySelector("#btn-imprimir"))==null||U.addEventListener("click",()=>window.print());const A=e.querySelector("#pdf-indice"),x=e.querySelector("#pdf-opcao-indice");x==null||x.addEventListener("change",()=>{A&&(A.hidden=!x.checked),na(oa,x.checked)});const C=e.querySelector(".pdf-page"),M=e.querySelector("#pdf-opcao-quebra");M==null||M.addEventListener("change",()=>{C&&(C.dataset.quebra=M.checked?"categoria":"fluxo"),na(sa,M.checked)}),e.querySelectorAll("[data-ancora]").forEach(L=>{L.addEventListener("click",()=>{var H;(H=document.getElementById(L.dataset.ancora??""))==null||H.scrollIntoView({behavior:"smooth",block:"start"})})});const F=e.querySelector("#btn-copiar");F==null||F.addEventListener("click",async()=>{const L=F.textContent;try{await navigator.clipboard.writeText(n),F.textContent="Copiado!"}catch{F.textContent="Não foi possível copiar"}setTimeout(()=>{F.textContent=L},1800)})}async function Ce(e,t){var l,u,d,v,f,E,h,g,A;const a=await Ka(t);if(!a){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const o=await It(a.espaco_id),s=await $a(t),i=o?await Ga(o.id):[],n=Ct(i.map(x=>x.categoria)),c=a.categoria?a.categoria.toLowerCase():o!=null&&o.categoria?o.categoria.toLowerCase():a.id;e.innerHTML=`
    ${jt([{label:"Espaços",route:"espacos"},...o!=null&&o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],...o?[{label:o.nome,route:`espacos/${o.id}`,colorKey:o.id}]:[],...a.categoria?[{label:a.categoria,colorKey:a.categoria.toLowerCase()}]:[],{label:a.nome}])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${V(c)}"></span>${a.favorito?`${S.star} `:""}${m(a.nome)}
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
            <button id="btn-avaliar-tema" type="button">${S.dice} Avaliar notas</button>
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
        ${Ne(n,"input-categoria-tema-editar")}
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
          <button class="item-row" data-open="${m(x.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${V(c)}">
            <span class="item-row__main">
              <span class="item-row__title">${x.favorito?`${S.star} `:""}${m(x.titulo||"(sem título)")}</span>
              <span class="item-row__meta">${m(x.fonte||"Sem fonte")}${x.pode_desatualizar?" · pode desatualizar":""}</span>
            </span>
            ${x.titulo_revisado?"":'<span class="badge badge--muted">revisar título</span>'}
          </button>
        `).join("")}
      </div>
    `}
  `,zt(e),Dt(e),(l=e.querySelector("#btn-nova-nota"))==null||l.addEventListener("click",()=>D(`temas/${t}/nova-nota`)),(u=e.querySelector("#btn-empty-nova-nota"))==null||u.addEventListener("click",()=>D(`temas/${t}/nova-nota`)),e.querySelectorAll("[data-open]").forEach(x=>{x.addEventListener("click",()=>D(`notas/${x.dataset.open}`))}),(d=e.querySelector("#btn-favoritar-tema"))==null||d.addEventListener("click",async()=>{await si(a.id),Ce(e,t)}),(v=e.querySelector("#btn-detalhes-tema"))==null||v.addEventListener("click",async()=>{const x=await mi(a.id),C=we(K(new Date(a.criado_em)),K());Wa({title:a.nome,bodyHtml:`
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${s.length}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value" style="font-size: var(--font-size-md);">${St(x)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${C}</div>
            <div class="stat-tile__label">${C===1?"Dia ativo":"Dias ativo"}</div>
          </div>
        </div>
        <p class="text-muted" style="margin:0;">Criado em ${ie(a.criado_em)}</p>
      `})}),(f=e.querySelector("#btn-avaliar-tema"))==null||f.addEventListener("click",()=>{const x=s.map(M=>({nota:M,tema:a})),C={perfilId:o.perfil_id,espacoId:a.espaco_id,nomeContexto:a.nome,tipo:"tema"};Za(e,x,C,()=>Ce(e,t))});const r=e.querySelector("#form-editar-tema");(E=e.querySelector("#btn-editar-tema"))==null||E.addEventListener("click",()=>{var x;r.style.display="block",(x=e.querySelector("#input-nome-tema-editar"))==null||x.focus()}),(h=e.querySelector("#btn-cancelar-edicao-tema"))==null||h.addEventListener("click",()=>{r.style.display="none"}),(g=e.querySelector("#btn-salvar-edicao-tema"))==null||g.addEventListener("click",async()=>{const x=e.querySelector("#input-nome-tema-editar").value.trim(),C=e.querySelector("#input-categoria-tema-editar").value.trim();x&&(await oi(a.id,x,C),Ce(e,t))}),(A=e.querySelector("#btn-excluir-tema"))==null||A.addEventListener("click",async()=>{const x=await ii(a.id);await oe({title:`Excluir "${a.nome}"?`,message:`Isso manda pra Lixeira o tema com ${x.notas} nota(s).
Dá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`})&&(await ni(a.id),D(`espacos/${a.espaco_id}`))})}function Ae(e){return`
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${m(e)}</div>
    </details>
  `}let Ve=!1,bt=null;function Ai(e){Ve=e}function ra(){Ve=!1}function Li(e){bt=e}function _e(){return Ve?bt?bt():window.confirm("Há alterações não salvas. Deseja sair mesmo assim?"):!0}function qi(){window.addEventListener("beforeunload",e=>{Ve&&(e.preventDefault(),e.returnValue="")})}const Ti={azul:"var(--accent-0)",vermelho:"var(--accent-4)",verde:"var(--accent-1)",rosa:"var(--accent-6)",amarelo:"var(--accent-2)",laranja:"var(--accent-3)",roxo:"var(--accent-7)",cinza:"var(--color-text-muted)"};function Qe(e){e.querySelectorAll(".text-color").forEach(t=>t.replaceWith(...Array.from(t.childNodes)))}async function je(e,t){var X,G,B,te,b,q,y;const a=t.mode==="nova"?t.temaId:(X=await Zt(t.notaId))==null?void 0:X.tema_id;if(!a){e.innerHTML='<p class="text-muted">Nota não encontrada.</p>';return}const o=await Ka(a);if(!o){e.innerHTML='<p class="text-muted">Tema não encontrado.</p>';return}const s=await It(o.espaco_id);if(t.mode==="nova"&&(s!=null&&s.arquivado)){e.innerHTML=`
      <div class="banner banner--warning">
        <span>O espaço "${m(s.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `,(G=e.querySelector("#btn-voltar-arquivado"))==null||G.addEventListener("click",()=>D(`temas/${a}`));return}const i=t.mode==="editar"?await Zt(t.notaId):void 0,n=i?await Mi(i.id):!1,c=t.mode==="nova"?(await $a(a)).at(-1):void 0,r=c==null?void 0:c.titulo,l=c==null?void 0:c.fonte;e.innerHTML=`
    ${jt([{label:"Espaços",route:"espacos"},...s!=null&&s.categoria?[{label:s.categoria,colorKey:s.categoria.toLowerCase()}]:[],...s?[{label:s.nome,route:`espacos/${s.id}`,colorKey:s.id}]:[],...o.categoria?[{label:o.categoria,colorKey:o.categoria.toLowerCase()}]:[],{label:o.nome,route:`temas/${o.id}`},{label:t.mode==="nova"?"Nova nota":(i==null?void 0:i.titulo)||"Editar nota"}])}

    <div class="section-header">
      <div>
        <span class="section-header__title">${t.mode==="nova"?"Nova nota":"Editar nota"}</span>
        ${t.mode==="editar"&&i?`<div class="section-header__meta text-muted">Criada em ${ie(i.criado_em)}${i.atualizado_em!==i.criado_em?` · Editada em ${ie(i.atualizado_em)}`:""}</div>`:""}
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
        <label class="field__label" for="input-titulo">Título${Ae('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${r?" input--sugerido":""}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${m((i==null?void 0:i.titulo)??r??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${r?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${Ae("Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.")}</label>
        <input class="input${l?" input--sugerido":""}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${m((i==null?void 0:i.fonte)??l??"")}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${l?'<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>':""}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${Ae("Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).")}</label>
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
            ${He.map(p=>`<button type="button" class="color-picker__swatch" data-cor="${p}" style="--dot-color:${Ti[p]}" title="${m(Qt[p])}" aria-label="${m(Qt[p])}"></button>`).join("")}
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
        >${i!=null&&i.conteudo?Be(i.conteudo):"<p><br></p>"}</div>
        <p class="field__error" role="alert"></p>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${i!=null&&i.pode_desatualizar?"checked":""} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${Ae("Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).")}</label>
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
  `;const u=`temas/${a}`;zt(e),(B=e.querySelector("#btn-cancelar"))==null||B.addEventListener("click",()=>{_e()&&(ra(),D(u))});const d=e.querySelector("#input-conteudo"),v=e.querySelector("#input-titulo"),f=e.querySelector("#input-fonte"),E=()=>Ai(!0);v.addEventListener("input",E),f.addEventListener("input",E),d.addEventListener("input",E),Li(()=>window.confirm("Há alterações não salvas nesta nota. Deseja sair mesmo assim?")),r&&v.addEventListener("input",()=>ge(v),{once:!0}),l&&f.addEventListener("input",()=>ge(f),{once:!0}),d.addEventListener("focus",()=>{try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}});function h(p){var w,T;let $=((T=(w=window.getSelection())==null?void 0:w.getRangeAt(0))==null?void 0:T.commonAncestorContainer)??null;for(;$&&$!==d;){if($ instanceof HTMLElement&&$.tagName===p)return!0;$=$.parentNode}return!1}function g(){const p=window.getSelection();if(!p||p.rangeCount===0)return;let $=p.getRangeAt(0).commonAncestorContainer;for(;$&&$!==d;){if($ instanceof HTMLElement&&$.tagName==="LI"){const w=document.createRange();w.selectNodeContents($),w.collapse(!1),p.removeAllRanges(),p.addRange(w);return}$=$.parentNode}}function A(){d.querySelectorAll("p").forEach(p=>{p.querySelector("ul")&&p.replaceWith(...Array.from(p.childNodes))})}function x(){const p=window.getSelection(),$=p.getRangeAt(0);$.deleteContents();const w=document.createElement("br");$.insertNode(w);const T=document.createTextNode("​");w.after(T);const N=document.createRange();return N.setStart(T,1),N.collapse(!0),p.removeAllRanges(),p.addRange(N),{br:w,ancora:T}}function C(){if(!M)return;const{br:p,ancora:$}=M;if(M=null,!document.contains($))return;const w=$.parentNode;if(!w)return;const T=Array.from(w.childNodes).indexOf($);$.remove();const N=window.getSelection();if(!N||!document.contains(p))return;const I=document.createRange();I.setStart(w,T),I.collapse(!0),N.removeAllRanges(),N.addRange(I)}let M=null;d.addEventListener("keydown",p=>{if(p.key!=="Enter"||p.shiftKey||p.ctrlKey||p.metaKey||p.altKey||h("LI")){M=null;return}p.preventDefault(),M&&document.contains(M.br)?(M.ancora.remove(),M.br.remove(),document.execCommand("insertParagraph"),M=null):M=x()}),d.addEventListener("mousedown",()=>{M=null}),d.addEventListener("keydown",p=>{p.key!=="Tab"||!h("LI")||(p.preventDefault(),C(),document.execCommand(p.shiftKey?"outdent":"indent"),A())});function F(){var p;d.classList.toggle("is-empty",!((p=d.textContent)!=null&&p.trim()))}d.addEventListener("input",()=>{if(d.childNodes.length===0){d.innerHTML="<p><br></p>";const p=d.firstChild,$=document.createRange();$.setStart(p,0),$.collapse(!0);const w=window.getSelection();w==null||w.removeAllRanges(),w==null||w.addRange($)}F()}),F(),e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach(p=>{p.addEventListener("mousedown",$=>$.preventDefault()),p.addEventListener("click",()=>{C();const $=p.dataset.cmd;if($==="strikeThrough")document.execCommand("strikeThrough");else if($==="createLink"){const w=window.getSelection();if(!w||w.isCollapsed){d.focus();return}const T=prompt("URL do link:","https://");T&&T.trim()&&document.execCommand("createLink",!1,T.trim())}else $==="removeFormat"?document.execCommand("removeFormat"):document.execCommand($);$==="insertUnorderedList"&&(A(),g()),d.focus(),H()})}),e.querySelectorAll(".color-picker__swatch").forEach(p=>{p.addEventListener("mousedown",$=>$.preventDefault()),p.addEventListener("click",()=>{C();const $=p.dataset.cor,w=window.getSelection();if(!w||w.rangeCount===0||w.isCollapsed)return;const T=w.getRangeAt(0);if(!d.contains(T.commonAncestorContainer))return;const N=T.extractContents();Qe(N);const I=document.createElement("span");I.className=`text-color text-color--${$}`,I.appendChild(N),T.insertNode(I),w.removeAllRanges();const Q=document.createRange();Q.selectNodeContents(I),w.addRange(Q),d.focus()})});const O=e.querySelector("[data-cor-limpar]");O.addEventListener("mousedown",p=>p.preventDefault()),O.addEventListener("click",()=>{C();const p=window.getSelection();if(!p||p.rangeCount===0)return;const $=p.getRangeAt(0);if(d.contains($.commonAncestorContainer)){if($.collapsed){let w=$.commonAncestorContainer;for(;w&&w!==d;){if(w instanceof HTMLElement&&w.classList.contains("text-color")){const T=w.parentNode;if(T){const N=document.createDocumentFragment();Array.from(w.childNodes).forEach(I=>N.appendChild(I)),T.replaceChild(N,w),Qe(T)}break}w=w.parentNode}}else{const w=$.extractContents();Qe(w),$.insertNode(w)}d.focus()}});const U=e.querySelector("#input-pode-desatualizar"),L=e.querySelector("#wrapper-validade");U.addEventListener("change",()=>{L.style.display=U.checked?"flex":"none"});function H(){e.querySelectorAll(".editor-toolbar__btn[data-cmd]").forEach($=>{const w=$.dataset.cmd;try{w==="bold"||w==="italic"||w==="underline"||w==="strikeThrough"||w==="insertUnorderedList"?$.setAttribute("aria-pressed",document.queryCommandState(w)?"true":"false"):$.removeAttribute("aria-pressed")}catch{}})}if(document.addEventListener("selectionchange",()=>{document.activeElement===d&&H()}),d.addEventListener("keyup",H),d.addEventListener("mouseup",H),d.addEventListener("focus",H),d.addEventListener("keydown",p=>{if(!(navigator.platform.includes("Mac")||navigator.userAgent.includes("Mac")?p.metaKey:p.ctrlKey))return;let T=!0;switch(p.key.toLowerCase()){case"b":p.preventDefault(),document.execCommand("bold");break;case"i":p.preventDefault(),document.execCommand("italic");break;case"u":p.preventDefault(),document.execCommand("underline");break;case"s":p.preventDefault(),document.execCommand("strikeThrough");break;case"k":p.preventDefault(),C();const N=window.getSelection();if(N&&!N.isCollapsed){const I=prompt("URL do link:","https://");I&&I.trim()&&document.execCommand("createLink",!1,I.trim())}break;case"z":p.preventDefault(),p.shiftKey?document.execCommand("redo"):document.execCommand("undo");break;case"y":p.preventDefault(),document.execCommand("redo");break;default:T=!1}T&&H()}),(te=e.querySelector("#btn-salvar"))==null||te.addEventListener("click",async()=>{const p=v.value.trim(),$=Fs(d).trim();let w=null;const T=(Q,Ue)=>{var ke;Q.classList.add("input--error"),Q.setAttribute("aria-invalid","true");const Se=(ke=Q.closest(".field"))==null?void 0:ke.querySelector(".field__error");Se&&(Se.textContent=Ue,Se.style.display="block"),w||(w=Q)},N=Q=>{Q.classList.remove("input--error"),Q.removeAttribute("aria-invalid")};if(p||T(v,"Informe um título para a nota."),$||T(d,"Informe o conteúdo da nota."),w){w.focus();return}N(v),N(d);const I={titulo:p,conteudo:$,fonte:e.querySelector("#input-fonte").value.trim(),pode_desatualizar:U.checked,validade_ate:e.querySelector("#input-validade").value||void 0};t.mode==="nova"?await ts(a,I):await as(t.notaId,I),ra(),D(u)}),t.mode==="editar"&&i){(b=e.querySelector("#btn-favoritar-nota"))==null||b.addEventListener("click",async()=>{await os(i.id),je(e,t)}),(q=e.querySelector("#btn-parar-revisar"))==null||q.addEventListener("click",async()=>{await js(i.id),je(e,t)});const p=e.querySelector("#btn-compartilhar-nota");p==null||p.addEventListener("click",async()=>{const $=xi(i);if(navigator.share){try{await navigator.share({title:i.titulo||"Nota",text:$})}catch{}return}const w=p.textContent;try{await navigator.clipboard.writeText($),p.textContent="Copiado!"}catch{p.textContent="Não foi possível copiar"}setTimeout(()=>{p.textContent=w},1800)}),(y=e.querySelector("#btn-excluir-nota"))==null||y.addEventListener("click",async()=>{await oe({title:"Excluir esta nota?",message:"A nota vai pra Lixeira e dá pra restaurar em Configurações → Lixeira por até 30 dias."})&&(await ss(i.id),D(u))})}}async function Mi(e){return(await(await k()).getAllFromIndex("itens_revisao","nota_id",e)).some(o=>o.status==="pendente")}function Ci(e){return e.length===10?e:K(new Date(e))}function Ii(e){const t=new Set;for(const a of e)a&&t.add(a.slice(0,10));return t}function Di(e){const t=new Set;for(const a of e)a&&t.add(Ci(a));return t}function eo(e,t){const a=new Set(e);for(const o of t)a.add(o);return a}function Je(e){return e.size}function Ni(e,t,a=365,o=K()){const s=J(o,-a+1),i=[];let n=s;for(;n<=o;)i.push({date:n,count:(e.has(n)?1:0)+(t.has(n)?1:0),hasRevisao:e.has(n),hasCriacao:t.has(n)}),n=J(n,1);const c=Je(e),r=Je(t),l=Je(eo(e,t));return{days:i,totalDiasRevisao:c,totalDiasCriacao:r,totalDiasAtividade:l}}async function to(e){const t=await k(),a=K(),[o,s]=await Promise.all([t.getAllFromIndex("itens_revisao","perfil_status",IDBKeyRange.only([e,"feita"])),(async()=>{const x=await t.getAllFromIndex("espacos","perfil_id",e),M=(await Promise.all(x.map(O=>t.getAllFromIndex("temas","espaco_id",O.id)))).flat();return(await Promise.all(M.map(O=>t.getAllFromIndex("notas","tema_id",O.id)))).flat()})()]),i=o.filter(x=>x.data_concluida).map(x=>x.data_concluida),n=Ii(i),c=Di(s.map(x=>x.criado_em)),r=o.filter(x=>x.data_concluida===a).length,l=s.filter(x=>K(new Date(x.criado_em))===a).length,u=a.slice(0,4),d=a.slice(5,7),v=`${u}-${d}`,f=i.filter(x=>x.startsWith(v)).length,E=s.filter(x=>K(new Date(x.criado_em)).startsWith(v)).length,h=n.size,g=c.size,A=eo(n,c).size;return{datasRevisaoSet:n,datasCriacaoSet:c,totalDiasRevisao:h,totalDiasCriacao:g,totalDiasAtividade:A,notasCriadasHoje:l,revisoesFeitasHoje:r,notasCriadasEsteMes:E,revisoesFeitasEsteMes:f}}async function Pi(e,t=365){const a=await to(e);return Ni(a.datasRevisaoSet,a.datasCriacaoSet,t)}function ji(e){return e<=0?0:e===1?1:e<=2?2:e<=4?3:4}function zi(e,t,a){var c;if(e.length===0)return'<p class="text-muted">Sem dados para o heatmap.</p>';const o=[];let s=[];const i=new Date(`${e[0].date}T00:00:00Z`).getUTCDay();for(let r=0;r<i;r++)s.push({date:"",count:0,hasRevisao:!1,hasCriacao:!1});for(const r of e)s.push(r),s.length===7&&(o.push(s),s=[]);for(s.length>0&&o.push(s);o.length<53&&((c=o.at(-1))==null?void 0:c.length)===7&&!(o.at(-1).length<7););return`
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${o.length}, 1fr);">
        ${o.map(r=>`
          <div class="heatmap__col">
            ${r.map(l=>`
              <div class="heatmap__cell heatmap__cell--${ji(l.count)}${l.date?"":" heatmap__cell--empty"}" title="${l.date?`${l.date}${l.count?` · ${l.count} atividade(s)`:""}${l.hasRevisao&&l.hasCriacao?" (revisão + criação)":l.hasRevisao?" (revisão)":l.hasCriacao?" (criação)":""}`:""}"></div>
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
  `}const Ri={1:"1 dia",7:"7 dias",30:"30 dias",180:"180 dias"};function Fi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",weekday:"short"})}function Oi(e){return new Date(`${e}T00:00:00Z`).toLocaleDateString("pt-BR",{timeZone:"UTC",day:"2-digit",month:"2-digit"})}async function Hi(e,t){const a=await di(t.perfilId),o=await to(t.perfilId),s=await Pi(t.perfilId,365),i=await vi(t.perfilId),n=["dom","seg","ter","qua","qui","sex","sáb"],c=new Date().getDay(),r=Math.max(1,...a.cargaProximos7.map(v=>v.count)),l=a.retencao30.total>0?{facil:Math.round(a.retencao30.facil/a.retencao30.total*100),medio:Math.round(a.retencao30.medio/a.retencao30.total*100),dificil:Math.round(a.retencao30.dificil/a.retencao30.total*100)}:null,u=i.total>0?{facil:Math.round(i.facil/i.total*100),medio:Math.round(i.medio/i.total*100),dificil:Math.round(i.dificil/i.total*100)}:null;e.innerHTML=`
    <div class="tabs" role="tablist" aria-label="Painel">
      <button class="tabs__tab" role="tab" aria-selected="true" data-tab="visao">Visão geral</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="avaliacoes">Avaliações</button>
      <button class="tabs__tab" role="tab" aria-selected="false" data-tab="evolucao">Evolução</button>
    </div>

    <div id="tab-visao" role="tabpanel">
      <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

      <div class="streak-hero">
        <div class="streak-hero__flame" aria-hidden="true">${S.flame}</div>
        <div class="streak-hero__count">${a.streakDias}</div>
        <div class="streak-hero__label">${a.streakDias===1?"dia seguido estudando":"dias seguidos estudando"}</div>
        <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${a.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
          ${a.diasAtivosUltimos7.map((v,f)=>{const E=(c-(6-f)+7)%7;return`
                <span class="streak-hero__day-col">
                  <span class="streak-hero__day ${v?"streak-hero__day--ativo":""}"></span>
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
          <div class="stat-tile__value" style="font-size: var(--font-size-md);">${St(a.tempoHojeSegundos)}</div>
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
        ${a.porEstagio.map(v=>`
          <div class="stage-tile">
            <div class="stage-tile__value">${v.count}</div>
            <div class="stage-tile__label">${Ri[v.estagio]}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${S.chart}</span>
      </div>
      <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
      <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${a.cargaProximos7.map(v=>`${v.count} em ${Oi(v.data)}`).join(", ")}">
        ${a.cargaProximos7.map(v=>{const f=Fi(v.data);return`
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
          ${i.ultimaEm?`<span class="text-muted" style="font-size: var(--font-size-xs);">última: ${m(le(i.ultimaEm))}</span>`:""}
        </div>

        <div class="section-header">
          <span class="section-header__title" style="font-size: var(--font-size-base);">Sessões recentes</span>
        </div>
        <div class="rank-list">
          ${i.sessoes.map(v=>`
            <div class="rank-row">
              <span>${m(v.contexto)} <span class="text-muted">· ${v.total} nota(s) · ${m(le(v.criado_em))}</span></span>
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
      ${zi(s.days,s.totalDiasRevisao,s.totalDiasCriacao)}
    </div>
  `;const d=["visao","avaliacoes","evolucao"];e.querySelectorAll(".tabs__tab").forEach(v=>{v.addEventListener("click",()=>{e.querySelectorAll(".tabs__tab").forEach(f=>{f.setAttribute("aria-selected",String(f===v))});for(const f of d){const E=e.querySelector(`#tab-${f}`);E&&(E.style.display=v.dataset.tab===f?"block":"none")}})})}async function Bi(e){const t=await k(),a=(await t.getAllFromIndex("espacos","perfil_id",e)).filter(l=>!l.excluido),o=await Promise.all(a.map(l=>t.getAllFromIndex("temas","espaco_id",l.id))),s=[],i=[],n=new Map;for(let l=0;l<a.length;l++){const u=a[l],d=o[l].filter(v=>!v.excluido);for(const v of d)n.set(v.id,u),v.favorito&&s.push({tema:v,espaco:u})}const c=o.flat().filter(l=>!l.excluido),r=await Promise.all(c.map(l=>t.getAllFromIndex("notas","tema_id",l.id)));for(let l=0;l<c.length;l++){const u=c[l],d=r[l].filter(f=>!f.excluido),v=n.get(u.id);if(v)for(const f of d)f.favorito&&i.push({nota:f,tema:u,espaco:v})}return{temas:de(s,l=>l.tema.nome),notas:de(i,l=>l.nota.titulo||l.tema.nome)}}async function Vi(e,t){var l;const{temas:a,notas:o}=await Bi(t.perfilId);if(a.length===0&&o.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${S.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Espaços</button>
      </div>
    `,(l=e.querySelector("#btn-empty-espacos"))==null||l.addEventListener("click",()=>D("espacos"));return}const s=new Map;for(const u of a){const d=s.get(u.espaco.id)??{espaco:u.espaco,itens:[]};d.itens.push(u),s.set(u.espaco.id,d)}const i=new Map;for(const u of o){const d=i.get(u.tema.id)??{temaNome:u.tema.nome,espaco:u.espaco,itens:[]};d.itens.push(u),i.set(u.tema.id,d)}const n=new Map;for(const u of a)n.set(u.espaco.id,u.espaco);for(const u of o)n.set(u.espaco.id,u.espaco);const c=Ta([...n.values()]),r=u=>{const d=c.get(u.id)??V(u.id),v=ne(he(u));return`<span class="espaco-icon-inline" style="--badge-accent:${d}" aria-hidden="true">${v.svg}</span>`};e.innerHTML=`
    <p class="screen-hint" style="margin-top:0;">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${a.length>0?`
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(s.values()).map(u=>`
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??V(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${m(u.espaco.nome)}
          </div>
          <div class="item-list">
            ${u.itens.map(d=>`
              <button class="item-row" data-tema="${m(d.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??V(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${S.star} ${m(d.tema.nome)}</span>
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
          <div class="queue-group__title" style="--group-accent:${c.get(u.espaco.id)??V(u.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${r(u.espaco)}${m(u.temaNome)} <span class="queue-group__espaco"> · ${m(u.espaco.nome)}</span>
          </div>
          <div class="item-list">
            ${u.itens.map(d=>`
              <button class="item-row" data-nota="${m(d.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${c.get(u.espaco.id)??V(u.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${S.star} ${m(d.nota.titulo||"(sem título)")}</span>
                  <span class="item-row__meta">${m(d.nota.fonte||"Sem fonte")}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `:""}
  `,e.querySelectorAll("[data-tema]").forEach(u=>{u.addEventListener("click",()=>D(`temas/${u.dataset.tema}`))}),e.querySelectorAll("[data-nota]").forEach(u=>{u.addEventListener("click",()=>D(`notas/${u.dataset.nota}`))})}const Ui=`Espaço: Curso de Investimentos (categoria: Cursos)
  Tema: Riscos (categoria: Faixa Branca)
    Nota → Título: "O que é Value at Risk?"
           Conteúdo: explicação completa
           Fonte: "Aula 5, slide 20"
  Tema: Vieses (categoria: Faixa Branca)
    Nota → Título: "O que é viés de confirmação?"
           Conteúdo: explicação completa
           Fonte: "Aula 6"`,Gi=`Espaço: Livro: Quem Pensa Enriquece (categoria: Livros)
  Tema: Desejo (sem categoria — livro não precisa de "módulo")
    Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza, segundo o livro?"
           Conteúdo: explicação/resumo do que o capítulo ensina
           Fonte: "Capítulo 1, página 20"
  Tema: Persistência
    Nota → Título: "Por que persistência é descrita como um estado de espírito?"
           Conteúdo: explicação completa
           Fonte: "Capítulo 8"`,Ki=`Espaço: MGD9 (categoria: Cursos)
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
           Fonte: "Aula 1"`,Wi=[{titulo:"Perfis",corpoHtml:`<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
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
      distribuição entre Fácil/Médio/Difícil e o histórico de sessões recentes.</p>`}];function Zi(e){e.innerHTML=`
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc" style="margin-top:0;">
          Dois exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Espaço → Tema → Nota</strong> clara antes de qualquer outra explicação.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${Ui}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${Gi}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — curso com módulos e aulas</div>
            <pre class="help-tree">${Ki}</pre>
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

      ${Wi.map(t=>`
        <section class="settings-section">
          <div class="settings-section__title">${t.titulo}</div>
          <div class="card help-section-body">${t.corpoHtml}</div>
        </section>
      `).join("")}
    </div>
  `}function Xi(e){return e.replace(/-/g,"")}function Qi(e,t){const[a,o]=t.split(":");return`${Xi(e)}T${a.padStart(2,"0")}${o.padStart(2,"0")}00`}function Ji(e){return e.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z"}function Yi(e){return e.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,")}function en(e){const t=Qi(ee(),e),a=Ji(new Date),o=Yi("Revisar Memoriza");return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Memoriza//Lembrete Diario//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${se()}@memoriza`,`DTSTAMP:${a}`,`DTSTART:${t}`,"DURATION:PT15M","RRULE:FREQ=DAILY",`SUMMARY:${o}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`)}function tn(e,t="memoriza-lembrete.ics"){const a=new Blob([e],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}const an="https://api.github.com",on="Memoriza — sincronização de anotações",xe="memoriza-sync.json";function Rt(e){return(t,a={})=>fetch(`${an}${t}`,{...a,headers:{Accept:"application/vnd.github+json",Authorization:`Bearer ${e}`,"X-GitHub-Api-Version":"2022-11-28",...a.body?{"Content-Type":"application/json"}:{},...a.headers}})}async function sn(e){var o;const t=await e("/gists?per_page=100");if(!t.ok)throw new Error("Não foi possível listar seus Gists. Confira o token.");return((o=(await t.json()).find(s=>s.files&&xe in s.files))==null?void 0:o.id)??null}async function nn(e,t){const a=await e("/gists",{method:"POST",body:JSON.stringify({description:on,public:!1,files:{[xe]:{content:t}}})});if(!a.ok)throw new Error("Não foi possível criar o Gist de backup.");return(await a.json()).id}async function rn(e,t){var s,i;const a=await e(`/gists/${t}`);return a.ok?((i=(s=(await a.json()).files)==null?void 0:s[xe])==null?void 0:i.content)??null:null}async function ao(e,t,a){if(!(await e(`/gists/${t}`,{method:"PATCH",body:JSON.stringify({files:{[xe]:{content:a}}})})).ok)throw new Error("Não foi possível gravar o backup no GitHub.")}async function oo(e){const t=Rt(e);let a=ze();if(!a){const n=await sn(t);n&&(a=n,ot(n))}let o=null,s=!1,i=await $e();if(a){const n=await rn(t,a);if(n)try{const c=Fe(n);o=await Oe(c),i=await $e(),s=!0}catch{}}return a?await ao(t,a,JSON.stringify(i)):(a=await nn(t,JSON.stringify(i)),ot(a)),$t(z()),{criados:(o==null?void 0:o.criados)??0,atualizados:(o==null?void 0:o.atualizados)??0,mantidos:(o==null?void 0:o.mantidos)??0,porLoja:(o==null?void 0:o.porLoja)??so(),push:!0,mesclouRemoto:s}}async function cn(e,t=30){const a=ze();if(!a)throw new Error("Nenhum backup sincronizado ainda.");const s=await Rt(e)(`/gists/${a}`);if(!s.ok)throw new Error("Não foi possível ler o histórico do backup. Confira o token.");return((await s.json()).history??[]).slice(0,t).map(n=>({version:n.version,committed_at:n.committed_at}))}async function ln(e,t,a,o){var c;const s=await e(`/gists/${a}/${o}`);if(!s.ok)return null;const n=(c=(await s.json()).files)==null?void 0:c[xe];if(!n)return null;if(n.truncated&&n.raw_url){const r=await fetch(n.raw_url,{headers:{Authorization:`Bearer ${t}`}});return r.ok?r.text():null}return n.content??null}async function dn(e,t){const a=Rt(e),o=ze();if(!o)throw new Error("Nenhum backup sincronizado ainda.");const s=await ln(a,e,o,t);if(!s)throw new Error("Não foi possível ler essa versão do backup.");const i=await Oe(Fe(s)),n=await $e();return await ao(a,o,JSON.stringify(n)),$t(z()),{...i,porLoja:i.porLoja??so(),push:!0,mesclouRemoto:!0}}function so(){const e={criados:0,atualizados:0,mantidos:0};return{perfis:e,espacos:e,temas:e,notas:e,itens_revisao:e}}function un(e){const t=wt();return t?Date.now()-new Date(t).getTime()>e*60*1e3:!0}const mn=[{value:"system",label:"Sistema"},{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}],pn=[{value:"data",label:"Mais antigas"},{value:"titulo",label:"Título (A–Z)"}],vn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function fn(e){const t=[`${vn[e.tipo]} em ${e.contexto}`];return e.temas&&t.push(`${e.temas} tema(s)`),e.notas&&t.push(`${e.notas} nota(s)`),e.excluido_em&&t.push(`excluído em ${le(e.excluido_em)}`),t.join(" · ")}function gn(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function bn(e){const t=`${le(e.criado_em)} · ${gn(e.bytes)}`;return`${e.automatico?"Automático":"Manual"} · ${t}`}function hn(e){return le(e.committed_at)}async function Y(e,t){var x,C,M,F,O,U,L,H,X,G,B,te;const a=Eo(),o=vo(),s=await kt(),i=ho(t.perfil.id),n=_t(),c=ma(),r=wt(),l=ze(),u=Et(),d=await Qo(t.perfil.id),v=await ys();e.innerHTML=`
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
        <div class="settings-section__title">${S.moon} Aparência</div>
        <div class="card">
          <div class="settings-list-row">
            <div class="settings-row__label">Tema</div>
            <div class="segmented" id="tema-opcoes" role="group" aria-label="Tema">
              ${mn.map(b=>`
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
              ${pn.map(b=>`
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
        <div class="settings-section__title">${S.database} Dados</div>
        <div class="card stack">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Exportar backup</div>
              <p class="settings-row__desc">
                Gera um arquivo .json para guardar em outro lugar (Drive, e-mail, etc).
                ${o?`Último export: ${m(le(o))}.`:"Nenhum export feito ainda."}
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
          ${v.length===0?'<p class="text-muted" style="margin:0;">Nenhum snapshot ainda.</p>':`<div>
                  ${v.map(b=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(bn(b))}</div>
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

      <section class="settings-section">
        <div class="settings-section__title">${S.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${wa} dias o item é
            removido de vez, sozinho.
          </p>
          ${d.length===0?'<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>':`<div>
                  ${d.map(b=>`
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${m(b.nome)}</div>
                        <p class="settings-row__desc">${m(fn(b))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${m(b.id)}" data-tipo="${b.tipo}" type="button">${S.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${m(b.id)}" data-tipo="${b.tipo}" data-nome="${m(b.nome)}" type="button">Excluir de vez</button>
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
              ${S.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${r?`<div class="banner banner--success" style="margin-bottom:0;">${S.check} Última sincronização: ${m(le(r))}${l?".":""}</div>`:n?'<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>':""}
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

  `,(x=e.querySelector("#btn-switch-profile"))==null||x.addEventListener("click",()=>{t.onSwitchProfile()}),(C=e.querySelector("#btn-como-usar"))==null||C.addEventListener("click",()=>D("ajuda")),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(b=>{b.addEventListener("click",()=>{const q=b.dataset.theme;$o(q),e.querySelectorAll("#tema-opcoes .segmented__option").forEach(y=>{y.setAttribute("aria-pressed",String(y===b))})})}),e.querySelectorAll("#notas-ordem .segmented__option").forEach(b=>{b.addEventListener("click",()=>{wo(b.dataset.notasOrdem),e.querySelectorAll("#notas-ordem .segmented__option").forEach(q=>{q.setAttribute("aria-pressed",String(q===b))})})}),(M=e.querySelector("#btn-export-profile"))==null||M.addEventListener("click",async()=>{const b=await ds(t.perfil.id);Xt(b),Ht(b.exportado_em),Y(e,t)}),(F=e.querySelector("#btn-export-all"))==null||F.addEventListener("click",async()=>{const b=await $e();Xt(b),Ht(b.exportado_em),Y(e,t)});const f=e.querySelector("#import-file");(O=e.querySelector("#btn-import"))==null||O.addEventListener("click",()=>{f==null||f.click()}),f==null||f.addEventListener("change",async()=>{const b=e.querySelector("#import-summary"),[q]=f.files??[];if(!(!q||!b))try{const y=await q.text(),p=Fe(y);await dt({titulo:"Antes de importar"});const $=await Oe(p);b.innerHTML=`
        <div class="banner banner--success" role="status">
          Importado: ${$.criados} criados, ${$.atualizados} atualizados,
          ${$.mantidos} mantidos como estavam.
        </div>
      `}catch(y){b.innerHTML=`
        <div class="banner banner--warning" role="alert">
          ${m(y instanceof Error?y.message:"Não foi possível importar o arquivo.")}
        </div>
      `}finally{f.value=""}});const E=e.querySelector("#form-novo-perfil");(U=e.querySelector("#btn-novo-perfil"))==null||U.addEventListener("click",()=>{var b;E.style.display="block",(b=e.querySelector("#input-novo-perfil"))==null||b.focus()}),(L=e.querySelector("#btn-cancelar-perfil"))==null||L.addEventListener("click",()=>{E.style.display="none"}),(H=e.querySelector("#btn-salvar-perfil"))==null||H.addEventListener("click",async()=>{const q=e.querySelector("#input-novo-perfil").value.trim();q&&(await ga(q),Y(e,t))}),e.querySelectorAll("[data-renomear]").forEach(b=>{b.onclick=()=>{var N;const q=b.dataset.renomear,y=e.querySelector(`[data-perfil-id="${q}"]`),p=y==null?void 0:y.querySelector("[data-view-nome]");if(!y||!p)return;const $=((N=p.textContent)==null?void 0:N.trim())??"";p.innerHTML=`
        <input class="input" type="text" value="${m($)}" maxlength="60" style="max-width:200px;" />
      `;const w=p.querySelector("input");w.focus(),w.select(),b.textContent="Salvar";const T=async()=>{const I=w.value.trim();I&&(await Uo(q,I),q===t.perfil.id&&(t.perfil={...t.perfil,nome:I})),Y(e,t)};w.addEventListener("keydown",I=>{I.key==="Enter"&&T()}),b.onclick=T}}),e.querySelectorAll("[data-excluir-perfil]").forEach(b=>{b.addEventListener("click",async()=>{const q=b.dataset.excluirPerfil,y=b.dataset.nome??"",p=await Go(q);await oe({title:`Excluir o perfil "${y}"?`,message:`Isso vai apagar ${p.espacos} espaço(s), ${p.temas} tema(s) e ${p.notas} nota(s) — todo o conteúdo desse perfil.
Não pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`})&&(await Ko(q),q===t.perfil.id?t.onSwitchProfile():Y(e,t))})}),(X=e.querySelector("#btn-baixar-lembrete"))==null||X.addEventListener("click",()=>{const b=e.querySelector("#input-hora-lembrete").value||"19:00";yo(t.perfil.id,b),tn(en(b))});const h=e.querySelector("#sync-status"),g=e.querySelector("#btn-sync-now");g==null||g.addEventListener("click",async()=>{const q=e.querySelector("#input-github-token").value.trim();if(!q){h&&(h.innerHTML='<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>');return}Bt(q),g.disabled=!0,h&&(h.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Sincronizando…</div>`);try{const y=await oo(q);if(h){const p=[y.criados>0?`${y.criados} novo(s)`:null,y.atualizados>0?`${y.atualizados} atualizado(s)`:null].filter(Boolean);h.innerHTML=`
          <div class="banner banner--success" role="status">
            ${S.check} Sincronizado!${p.length>0?` ${p.join(", ")} baixado(s).`:""}
            ${y.mesclouRemoto?"":" (backup remoto não existia ainda — o local foi enviado.)"}
          </div>
        `}Y(e,t)}catch(y){g.disabled=!1,h&&(h.innerHTML=`
          <div class="banner banner--warning" role="alert">
            ${m(y instanceof Error?y.message:"Não foi possível sincronizar.")}
          </div>
        `)}}),(G=e.querySelector("#btn-limpar-token"))==null||G.addEventListener("click",async()=>{await oe({title:"Remover token do GitHub?",message:"O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador."})&&(Bt(""),ot(""),$t(""),Y(e,t))}),(B=e.querySelector("#sync-auto"))==null||B.addEventListener("change",b=>{_o(b.target.checked)}),e.querySelectorAll("[data-restaurar]").forEach(b=>{b.addEventListener("click",async()=>{b.disabled=!0,await Jo(b.dataset.tipo,b.dataset.restaurar),Y(e,t)})}),e.querySelectorAll("[data-expurgar]").forEach(b=>{b.addEventListener("click",async()=>{const q=b.dataset.nome??"";await oe({title:`Excluir "${q}" de vez?`,message:"O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia."})&&(b.disabled=!0,await qe(b.dataset.tipo,b.dataset.expurgar),Y(e,t))})}),(te=e.querySelector("#btn-snapshot-criar"))==null||te.addEventListener("click",async()=>{const b=e.querySelector("#btn-snapshot-criar");b.disabled=!0,await dt({}),Y(e,t);const q=e.querySelector("#snapshot-status");q&&(q.innerHTML=`<div class="banner banner--success" role="status">${S.check} Snapshot criado.</div>`)}),e.querySelectorAll("[data-snapshot-restaurar]").forEach(b=>{b.addEventListener("click",async()=>{if(!await oe({title:"Restaurar este snapshot?",message:"Os dados do snapshot serão mesclados com os atuais. Nada local é apagado."}))return;b.disabled=!0,await ws(b.dataset.snapshotRestaurar);const y=e.querySelector("#snapshot-status");y&&(y.innerHTML=`<div class="banner banner--success" role="status">${S.check} Snapshot restaurado (mesclado).</div>`)})}),e.querySelectorAll("[data-snapshot-remover]").forEach(b=>{b.addEventListener("click",async()=>{await _s(b.dataset.snapshotRemover),Y(e,t)})});const A=e.querySelector("#btn-gist-revisoes");A==null||A.addEventListener("click",async()=>{const b=e.querySelector("#gist-revisoes"),y=e.querySelector("#input-github-token").value.trim()||n;if(!(!y||!b)){A.disabled=!0,b.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Carregando…</div>`;try{const p=await cn(y);if(p.length===0){b.innerHTML='<div class="banner banner--muted" role="status">Ainda não há versões anteriores.</div>';return}b.innerHTML=`
        <div>
          ${p.map($=>`
            <div class="settings-list-row">
              <div class="settings-row__label">${m(hn($))}</div>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-gist-restaurar="${m($.version)}" type="button">Restaurar</button>
              </div>
            </div>
          `).join("")}
        </div>
      `,yn(e,y,b)}catch(p){b.innerHTML=`<div class="banner banner--warning" role="alert">${m(p instanceof Error?p.message:"Não foi possível carregar o histórico.")}</div>`}finally{A.disabled=!1}}})}function yn(e,t,a){e.querySelectorAll("[data-gist-restaurar]").forEach(o=>{o.addEventListener("click",async()=>{if(await oe({title:"Restaurar esta versão do backup?",message:"A versão escolhida será mesclada com os dados atuais e o backup na nuvem será atualizado. Nada local é apagado."})){o.disabled=!0,a.innerHTML=`<div class="banner banner--muted" role="status">${S.sync} Restaurando…</div>`;try{const i=await dn(t,o.dataset.gistRestaurar);a.innerHTML=`<div class="banner banner--success" role="status">${S.check} Backup restaurado: ${i.criados} criado(s), ${i.atualizados} atualizado(s).</div>`}catch(i){a.innerHTML=`<div class="banner banner--warning" role="alert">${m(i instanceof Error?i.message:"Não foi possível restaurar.")}</div>`}}})})}let Ye=null;async function ca(){if(!(!("wakeLock"in navigator)||document.hidden))try{Ye=await navigator.wakeLock.request("screen"),Ye.addEventListener("release",()=>{Ye=null})}catch{}}function _n(){ca(),document.addEventListener("visibilitychange",()=>{document.hidden||ca()})}const io="v1.11",wn="Memoriza",no=`${wn} ${io}`,Le=24;function ht(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function et(e,t){const a=ht(t);return e.some(o=>ht(o).includes(a))}function $n(e,t,a=60){const o=e.replace(/\s+/g," ").trim();if(!o)return"";const s=o.toLowerCase(),i=t.toLowerCase();let n=s.indexOf(i);n===-1&&(n=0);const c=Math.max(0,n-a),r=Math.min(o.length,n+i.length+a);return(c>0?"…":"")+o.slice(c,r)+(r<o.length?"…":"")}async function En(e,t){const a=t.trim();if(!a)return[];const o=ht(a);if(!o)return[];const s=await k(),i=(await s.getAllFromIndex("espacos","perfil_id",e)).filter(f=>!f.arquivado),c=(await Promise.all(i.map(f=>s.getAllFromIndex("temas","espaco_id",f.id)))).flat(),r=new Map(i.map(f=>[f.id,f])),u=(await Promise.all(c.map(f=>s.getAllFromIndex("notas","tema_id",f.id)))).flat(),d=[];for(const f of i)if(et([f.nome,f.categoria],o)&&(d.push({kind:"espaco",id:f.id,titulo:f.nome,meta:f.categoria?`Espaço · ${f.categoria}`:"Espaço"}),d.length>=Le))return d;const v=new Map(c.map(f=>[f.id,f]));for(const f of c)if(et([f.nome,f.categoria],o)){const E=r.get(f.espaco_id);if(d.push({kind:"tema",id:f.id,titulo:f.nome,meta:`Tema${E?` · ${E.nome}`:""}`}),d.length>=Le)return d}for(const f of u){if(!et([f.titulo,f.fonte,f.conteudo],o))continue;const E=v.get(f.tema_id),h=E&&r.get(E.espaco_id),g=[...h?[h.nome]:[],...E?[E.nome]:[]].join(" · ");if(d.push({kind:"nota",id:f.id,titulo:f.titulo||"(sem título)",meta:g?`Nota · ${g}`:"Nota",snippet:f.conteudo?$n(f.conteudo,o):void 0}),d.length>=Le)return d}return d.sort((f,E)=>{const h=`${f.titulo.toLowerCase()} ${f.meta.toLowerCase()}`,g=`${E.titulo.toLowerCase()} ${E.meta.toLowerCase()}`;return Xo(h,g)}),d.slice(0,Le)}const xn={espaco:"Espaço",tema:"Tema",nota:"Nota"};function la(e,t){const a=m(e),o=t.trim();if(!o)return a;const s=e.toLowerCase().indexOf(o.toLowerCase());if(s===-1)return a;const i=m(e.slice(0,s)),n=m(e.slice(s,s+o.length)),c=m(e.slice(s+o.length));return`${i}<mark>${n}</mark>${c}`}async function ro(e){var f;(f=document.querySelector(".search-overlay"))==null||f.remove();const t=document.createElement("div");t.className="search-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Busca global"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=t.querySelector(".search-input"),o=t.querySelector(".search-results");let s=[],i=-1,n,c=!1;function r(){c||(c=!0,t.remove(),document.removeEventListener("keydown",v))}function l(E){s.length!==0&&(i=(i+E+s.length)%s.length,s.forEach((h,g)=>{const A=g===i;h.el.classList.toggle("is-active",A),h.el.setAttribute("aria-selected",String(A)),A&&h.el.scrollIntoView({block:"nearest"})}))}function u(E){const h=s.find(A=>A.el===E);if(!h)return;r();const g=h.resultado;g.kind==="espaco"?D(`espacos/${g.id}`):g.kind==="tema"?D(`temas/${g.id}`):D(`notas/${g.id}`)}function d(E){En(e,E).then(h=>{if(!c){if(i=-1,s=[],h.length===0){o.innerHTML=`<p class="search-empty">Nada encontrado para "${m(E.trim())}".</p>`;return}o.innerHTML="";for(const g of h){const A=document.createElement("button");A.type="button",A.className=`search-result search-result--${g.kind}`,A.setAttribute("role","option"),A.innerHTML=`
          <span class="search-result__icon" aria-hidden="true">${g.kind==="espaco"?S.folder:g.kind==="tema"?S.bookOpen:S.pen}</span>
          <span class="search-result__body">
            <span class="search-result__title">${la(g.titulo,E)}</span>
            <span class="search-result__meta">${m(xn[g.kind])} · ${m(g.meta)}</span>
            ${g.snippet?`<span class="search-result__snippet">${la(g.snippet,E)}</span>`:""}
          </span>
        `,A.addEventListener("click",()=>u(A)),o.appendChild(A),s.push({el:A,resultado:g})}}})}function v(E){E.key==="Escape"&&(E.preventDefault(),r())}a.addEventListener("input",()=>{n&&clearTimeout(n),n=setTimeout(()=>d(a.value),120)}),a.addEventListener("keydown",E=>{E.key==="ArrowDown"?(E.preventDefault(),l(1)):E.key==="ArrowUp"?(E.preventDefault(),l(-1)):E.key==="Enter"&&i>=0?(E.preventDefault(),u(s[i].el)):E.key==="Escape"&&(E.preventDefault(),r())}),t.addEventListener("mousedown",E=>{E.target===t&&r()}),document.addEventListener("keydown",v),a.focus(),d("")}const tt=7,Sn=30,kn=[{route:"hoje",label:"Hoje"},{route:"espacos",label:"Espaços"},{route:"favoritos",label:"Favoritos"},{route:"painel",label:"Painel"},{route:"config",label:"Configurações"}],An={hoje:"Hoje",espacos:"Espaços",favoritos:"Favoritos",painel:"Painel",ajuda:"Como Usar",config:"Configurações"};async function Ln(e){Ts(()=>yt(e)),await yt(e),Mn(),_n(),qn(),Tn()}function qn(){document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=da();t&&ro(t)}})}async function Tn(){const e=_t();if(!(!e||!ma())&&un(Sn))try{await oo(e)}catch(t){console.warn("Auto-sync falhou:",t)}}function Mn(){document.addEventListener("click",e=>{document.querySelectorAll(".item-menu[open], .field-hint[open]").forEach(t=>{t.contains(e.target)||(t.open=!1)})})}async function yt(e){var r,l,u;const t=da(),a=t?await Vo(t):void 0;if(!a){at(null),e.innerHTML='<div id="profile-screen"></div>';const d=e.querySelector("#profile-screen");await Cs(d,async v=>{at(v.id),D("hoje"),await yt(e)});return}const o=As(),s=Ls(o),i=await In(a);e.innerHTML=`
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${kn.map(d=>`
          <button
            class="app-nav__item"
            data-route="${d.route}"
            ${d.route===s?'aria-current="page"':""}
            type="button"
          >
            <span class="app-nav__icon">${Ms[d.route]}</span>
            <span>${d.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${An[s]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${S.search}</button>
            ${i?`<button class="app-header__backup-alert${i.urgente?" is-urgent":""}" id="btn-sync-alert" type="button" title="${m(i.mensagem)}" aria-label="${m(i.mensagem)}">${S.cloud}</button>`:""}
            <span class="app-header__date" title="Data de hoje">${m(Fo(K()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${S.help}</button>
            <span class="app-header__profile" title="Memoriza ${io}">${m(a.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${m(no)}</span></footer>
      </div>
    </div>
  `,e.querySelectorAll(".app-nav__item").forEach(d=>{d.addEventListener("click",()=>{_e()&&qs(d.dataset.route)})}),(r=e.querySelector("#btn-ajuda"))==null||r.addEventListener("click",()=>{_e()&&(location.hash==="#/ajuda"?history.back():D("ajuda"))}),(l=e.querySelector("#btn-busca"))==null||l.addEventListener("click",()=>{_e()&&ro(a.id)}),(u=e.querySelector("#btn-sync-alert"))==null||u.addEventListener("click",()=>{_e()&&D("config")});const n=e.querySelector("#screen-content"),c=document.createElement("div");c.className="screen-container",n.appendChild(c),c.innerHTML='<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';try{await Cn(c,o,a),c.classList.remove("screen-enter"),c.offsetWidth,c.classList.add("screen-enter")}catch(d){console.error("Erro ao renderizar tela:",d),c.innerHTML='<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>'}}async function Cn(e,t,a){switch(t.name){case"hoje":await Yt(e,{perfilId:a.id});break;case"espacos":await Te(e,{perfilId:a.id});break;case"espaco":await Me(e,t.id);break;case"espaco-pdf":await ki(e,t.id,t.categoria);break;case"painel":await Hi(e,{perfilId:a.id});break;case"favoritos":await Vi(e,{perfilId:a.id});break;case"ajuda":Zi(e);break;case"tema":await Ce(e,t.id);break;case"nota-nova":await je(e,{mode:"nova",temaId:t.temaId});break;case"nota":await je(e,{mode:"editar",notaId:t.id});break;case"config":await Y(e,{perfil:a,onSwitchProfile:()=>{at(null),D("perfil")}});break;default:await Yt(e,{perfilId:a.id})}}async function In(e){if(!await Dn(e.id))return null;if(!_t())return{urgente:!1,mensagem:"Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos."};const a=wt();if(!a)return{urgente:!1,mensagem:"Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora."};const o=K(),s=we(K(new Date(a)),o);return s<=tt?null:{urgente:s>tt*2,mensagem:`Faz mais de ${tt} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`}}async function Dn(e){const t=await k();return(await t.getAllFromIndex("espacos","perfil_id",e)).length>0?!0:(await t.getAllFromIndex("itens_revisao","perfil_id",e)).length>0}console.info(`%c${no}%c rodando`,"font-weight:bold;","");pa();mo({immediate:!0});async function Nn(){qi(),await Bo(),await Ea(),await Yo(),await Es().catch(()=>{}),await xo();const e=document.getElementById("app");if(!e)throw new Error("#app não encontrado");await Ln(e)}Nn();
