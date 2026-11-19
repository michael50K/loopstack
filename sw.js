const C='loopstack-v2';
const ASSETS=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;
  }).catch(()=>caches.match(e.request)));
});
