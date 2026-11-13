(function () {
  var ANAHTAR = 'sonKitap';
  function oku() { try { return JSON.parse(localStorage.getItem(ANAHTAR) || 'null'); } catch (e) { return null; } }
  function yaz(v) { try { localStorage.setItem(ANAHTAR, JSON.stringify(v)); } catch (e) {} }

  var liste = document.getElementById('liste');
  var okuyucu = document.getElementById('okuyucu');
  var kit = document.getElementById('kitaplar');
  if (!liste || !okuyucu || !kit) return;

  var dugme = document.createElement('button');
  dugme.style.cssText = 'display:none;width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:16px;';
  kit.parentNode.insertBefore(dugme, kit);

  function guncelle() {
    var s = oku();
    if (!s || !s.baslik) { dugme.style.display = 'none'; return; }
    dugme.textContent = '▶ Kaldığın yerden devam et: ' + s.baslik;
    dugme.style.display = 'block';
  }

  dugme.onclick = function () {
    var s = oku();
    if (!s || typeof kitaplar === 'undefined') return;
    for (var i = 0; i < kitaplar.length; i++) {
      if (kitaplar[i].dosya === s.dosya) { ac(kitaplar[i]); return; }
    }
  };

  var eski = ac;
  ac = function (k) {
    eski(k);
    var s = oku();
    var y = (s && s.dosya === k.dosya) ? s.y : 0;
    yaz({ dosya: k.dosya, baslik: k.baslik, y: y });
    guncelle();
    var n = 0;
    var t = setInterval(function () {
      n++;
      if (y > 0) window.scrollTo(0, y);
      if (n >= 6 || Math.abs(window.scrollY - y) < 5) clearInterval(t);
    }, 400);
  };

  var bekle = null;
  window.addEventListener('scroll', function () {
    if (bekle) return;
    bekle = setTimeout(function () {
      bekle = null;
      if (getComputedStyle(okuyucu).display === 'none') return;
      var s = oku();
      if (s) { s.y = Math.round(window.scrollY); yaz(s); }
    }, 500);
  });

  guncelle();
})();
