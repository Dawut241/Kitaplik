(function () {
  var A = 'yaziBoyutu';
  var metin = document.getElementById('metin');
  var baslik = document.getElementById('baslik');
  if (!metin || !baslik) return;
  var MIN = 12, MAX = 32;

  function oku() {
    try { var v = parseInt(localStorage.getItem(A), 10); return (v >= MIN && v <= MAX) ? v : null; } catch (e) { return null; }
  }
  function yaz(v) { try { localStorage.setItem(A, String(v)); } catch (e) {} }

  var boyut = oku() || Math.round(parseFloat(getComputedStyle(metin).fontSize) || 18);

  var stil = 'padding:8px 16px;margin:0 6px 0 0;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:16px;';
  var kutu = document.createElement('div');
  kutu.style.cssText = 'margin:8px 0;display:flex;align-items:center;';

  var kucult = document.createElement('button');
  kucult.textContent = 'A-';
  kucult.style.cssText = stil;
  var buyut = document.createElement('button');
  buyut.textContent = 'A+';
  buyut.style.cssText = stil;
  var etiket = document.createElement('span');
  etiket.style.cssText = 'color:var(--soluk);margin-left:6px;';

  kutu.appendChild(kucult);
  kutu.appendChild(buyut);
  kutu.appendChild(etiket);
  baslik.parentNode.insertBefore(kutu, baslik.nextSibling);

  function uygula() {
    metin.style.fontSize = boyut + 'px';
    etiket.textContent = boyut + ' px';
  }

  kucult.onclick = function () { if (boyut > MIN) { boyut--; yaz(boyut); uygula(); } };
  buyut.onclick = function () { if (boyut < MAX) { boyut++; yaz(boyut); uygula(); } };

  uygula();
})();
