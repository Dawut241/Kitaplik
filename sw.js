var C = 'kitaplik-v42';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (a) {
    return Promise.all(a.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    if (res.status === 200 && res.type === 'basic' && r.url.indexOf('/kitaplar/') === -1) {
      var kopya = res.clone();
      caches.open(C).then(function (c) { c.put(r, kopya); });
    }
    return res;
  }).catch(function () {
    return caches.match(r).then(function (m) {
      if (m) return m;
      if (r.mode === 'navigate') return caches.match('./');
      return Response.error();
    });
  }));
});
