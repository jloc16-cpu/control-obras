const C='obras-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.open(C).then(c=>c.match(e.request).then(m=>{const f=fetch(e.request).then(r=>{if(r&&(r.status===200||r.type==='opaque'))c.put(e.request,r.clone());return r;}).catch(()=>m);return m||f;})));});
