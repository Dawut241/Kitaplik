(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
  var kit = document.getElementById('kitaplar');
  if (!kit) return;
  var istek = null;
  var d = document.createElement('button');
  d.textContent = '📲 Ana ekrana ekle';
  d.style.cssText = 'display:none;width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:16px;';
  kit.parentNode.insertBefore(d, kit);
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    istek = e;
    d.style.display = 'block';
  });
  d.onclick = function () {
    if (!istek) return;
    istek.prompt();
    istek.userChoice.then(function () { istek = null; d.style.display = 'none'; });
  };
  window.addEventListener('appinstalled', function () { d.style.display = 'none'; });
})();
