const CACHE='eltaller-v38d';
const FILES=['./', './index.html','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./manifest.json','./logo.jpg'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(FILES.map(f=>c.add(f).catch(()=>{})))));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch', e=>{
  const url=e.request.url;
  if(url.includes('firestore')||url.includes('googleapis')||url.includes('firebase')||url.includes('fonts.g'))return;
  if(e.request.mode==='navigate'||url.endsWith('/')||url.endsWith('index.html')){
    e.respondWith(
      fetch(e.request).then(resp=>{
        caches.open(CACHE).then(c=>c.put(e.request,resp.clone()));
        return resp;
      }).catch(()=>caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});
