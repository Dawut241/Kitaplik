(function () {
  var kutu = document.createElement('div');
  kutu.style.cssText = 'margin:24px 0 40px;padding:12px;text-align:center;';
  var stil = 'display:inline-block;padding:10px 16px;margin:4px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:15px;text-decoration:none;';

  var p = document.createElement('button');
  p.textContent = '📤 Arkadaşına gönder';
  p.style.cssText = stil;
  p.onclick = function () {
    var url = location.origin + location.pathname;
    if (navigator.share) {
      navigator.share({ title: 'Online Kitaplık', text: 'Dostoyevski ve Tolstoy okuma sitesi', url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        p.textContent = '✅ Link kopyalandı';
        setTimeout(function () { p.textContent = '📤 Arkadaşına gönder'; }, 2500);
      }).catch(function () {});
    }
  };

  var f = document.createElement('a');
  f.textContent = '💬 Fikrin var mı?';
  f.href = 'https://github.com/gorayda/Kitaplik/issues/new';
  f.target = '_blank';
  f.rel = 'noopener';
  f.style.cssText = stil;

  kutu.appendChild(p);
  kutu.appendChild(f);
  document.body.appendChild(kutu);
})();
