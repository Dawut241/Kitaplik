(function () {
  var okuyucu = document.getElementById('okuyucu');
  if (!okuyucu) return;

  var cubuk = document.createElement('div');
  cubuk.style.cssText = 'position:fixed;top:0;left:0;height:4px;width:0;background:var(--yazi);opacity:0.75;z-index:9999;display:none;';
  var yazi = document.createElement('div');
  yazi.style.cssText = 'position:fixed;right:10px;bottom:10px;padding:4px 10px;border-radius:10px;background:var(--kart);color:var(--soluk);border:1px solid var(--soluk);font-size:13px;z-index:9999;display:none;';
  document.body.appendChild(cubuk);
  document.body.appendChild(yazi);

  function guncelle() {
    var acik = getComputedStyle(okuyucu).display !== 'none';
    if (!acik) { cubuk.style.display = 'none'; yazi.style.display = 'none'; return; }
    var toplam = document.documentElement.scrollHeight - window.innerHeight;
    var yuzde = toplam > 0 ? Math.min(100, Math.max(0, Math.round(window.scrollY / toplam * 100))) : 0;
    cubuk.style.display = 'block';
    yazi.style.display = 'block';
    cubuk.style.width = yuzde + '%';
    yazi.textContent = '%' + yuzde;
  }

  var bekle = false;
  window.addEventListener('scroll', function () {
    if (bekle) return;
    bekle = true;
    requestAnimationFrame(function () { bekle = false; guncelle(); });
  });
  window.addEventListener('resize', guncelle);
  try { new MutationObserver(guncelle).observe(okuyucu, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] }); } catch (e) {}
  setInterval(guncelle, 1500);
  guncelle();
})();
