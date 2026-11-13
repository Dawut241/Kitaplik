(function () {
  var A = 'favoriler';
  function oku() { try { var v = JSON.parse(localStorage.getItem(A) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function yaz(v) { try { localStorage.setItem(A, JSON.stringify(v)); } catch (e) {} }

  var kit = document.getElementById('kitaplar');
  var baslik = document.getElementById('baslik');
  if (!kit || !baslik || typeof ac === 'undefined') return;

  var stil = 'padding:10px 14px;margin:4px 6px 4px 0;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:15px;';

  var kutu = document.createElement('div');
  kutu.style.cssText = 'display:none;margin:8px 0;';
  var ust = document.createElement('div');
  ust.textContent = '⭐ Favorilerim';
  ust.style.cssText = 'color:var(--soluk);margin-bottom:6px;';
  var icerik = document.createElement('div');
  kutu.appendChild(ust);
  kutu.appendChild(icerik);
  kit.parentNode.insertBefore(kutu, kit);

  var yildizDugme = document.createElement('button');
  yildizDugme.style.cssText = stil + 'margin:8px 0;';
  baslik.parentNode.insertBefore(yildizDugme, baslik.nextSibling);

  var simdiki = null;

  function varMi(dosya) {
    var f = oku();
    for (var i = 0; i < f.length; i++) if (f[i].dosya === dosya) return true;
    return false;
  }

  function listele() {
    var f = oku();
    icerik.textContent = '';
    if (!f.length) { kutu.style.display = 'none'; return; }
    kutu.style.display = 'block';
    f.forEach(function (x) {
      var d = document.createElement('button');
      d.textContent = x.baslik;
      d.style.cssText = stil;
      d.onclick = function () {
        for (var i = 0; i < kitaplar.length; i++) {
          if (kitaplar[i].dosya === x.dosya) { ac(kitaplar[i]); return; }
        }
      };
      icerik.appendChild(d);
    });
  }

  function yildiz() {
    if (!simdiki) { yildizDugme.style.display = 'none'; return; }
    yildizDugme.style.display = 'inline-block';
    yildizDugme.textContent = varMi(simdiki.dosya) ? '⭐ Favorilerde (kaldırmak için bas)' : '☆ Favorilere ekle';
  }

  yildizDugme.onclick = function () {
    if (!simdiki) return;
    var f = oku();
    var yeni = f.filter(function (x) { return x.dosya !== simdiki.dosya; });
    if (yeni.length === f.length) yeni.push({ dosya: simdiki.dosya, baslik: simdiki.baslik });
    yaz(yeni);
    yildiz();
    listele();
  };

  var eski = ac;
  ac = function (k) {
    eski(k);
    simdiki = k;
    yildiz();
  };

  yildiz();
  listele();
})();
