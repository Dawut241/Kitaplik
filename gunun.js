(function () {
  var kit = document.getElementById('kitaplar');
  if (!kit) return;
  var DOSYALAR = ['bilgi/dostoyevski.json', 'bilgi/tolstoy.json', 'bilgi/ortak.json','bilgi/machiavelli.json','bilgi/nietzsche.json'];

  var kutu = document.createElement('div');
  kutu.style.cssText = 'display:none;margin:12px 0;padding:12px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);';
  var ust = document.createElement('div');
  ust.textContent = '💡 Günün bilgisi';
  ust.style.cssText = 'color:var(--soluk);margin-bottom:6px;font-size:14px;';
  var b = document.createElement('div');
  b.style.cssText = 'font-weight:bold;margin-bottom:6px;';
  var c = document.createElement('div');
  c.style.cssText = 'line-height:1.5;font-size:15px;';
  var d = document.createElement('button');
  d.textContent = '🎲 Başka bir tane';
  d.style.cssText = 'margin-top:10px;padding:8px 14px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:14px;';
  kutu.appendChild(ust); kutu.appendChild(b); kutu.appendChild(c); kutu.appendChild(d);
  kit.parentNode.insertBefore(kutu, kit);

  var liste = [], sira = 0;

  function goster() {
    var x = liste[sira % liste.length];
    b.textContent = x.baslik;
    c.textContent = x.cevap;
    kutu.style.display = 'block';
  }

  Promise.all(DOSYALAR.map(function (f) {
    return fetch(f).then(function (r) { return r.json(); }).catch(function () { return []; });
  })).then(function (sonuc) {
    sonuc.forEach(function (v) {
      if (!Array.isArray(v)) return;
      v.forEach(function (x) {
        if (x && x.baslik && x.cevap && x.baslik.indexOf('Spoiler') === -1) liste.push(x);
      });
    });
    if (!liste.length) return;
    var t = new Date();
    sira = (t.getFullYear() * 372 + t.getMonth() * 31 + t.getDate()) % liste.length;
    goster();
  });

  d.onclick = function () {
    if (!liste.length) return;
    sira = (sira + 1 + Math.floor(Math.random() * (liste.length - 1))) % liste.length;
    goster();
  };
})();
