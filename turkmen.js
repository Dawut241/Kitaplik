(function () {
  var liste = document.getElementById('liste');
  var kit = document.getElementById('kitaplar');
  if (!liste || !kit) return;
  var K = [
    { ad: 'Uly Inkwizitor', yazar: 'Dostoýewski', dosya: 'turkmen/grand-inquisitor.txt' },
    { ad: 'Bobok', yazar: 'Dostoýewski', dosya: 'turkmen/bobok.txt' },
    { ad: 'Kawkaz ýesiri', yazar: 'Tolstoý', dosya: 'turkmen/prisoner-caucasus.txt' },
    { ad: 'Hojaýyn we hyzmatkär', yazar: 'Tolstoý', dosya: 'turkmen/master-and-man.txt' },
    { ad: 'Iwan Ilýiçiň ölümi', yazar: 'Tolstoý', dosya: 'turkmen/ivan-ilyich.txt' }
  ];
  var stil = 'padding:10px 14px;margin:4px 6px 4px 0;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:15px;';

  var kutu = document.createElement('div');
  kutu.setAttribute('data-dil', '1');
  kutu.style.cssText = 'display:none;margin:12px 0;';
  var ust = document.createElement('div');
  ust.textContent = '🇹🇲 Türkmen dilinde';
  ust.style.cssText = 'color:var(--soluk);margin-bottom:6px;';
  var ic = document.createElement('div');
  kutu.appendChild(ust); kutu.appendChild(ic);
  kit.parentNode.insertBefore(kutu, kit);

  var sayfa = document.createElement('div');
  sayfa.setAttribute('data-dil', '1');
  sayfa.style.cssText = 'display:none;padding:12px;color:var(--yazi);';
  var geri = document.createElement('button');
  geri.textContent = '← Yza';
  geri.style.cssText = stil;
  var bas = document.createElement('h2');
  var not = document.createElement('p');
  not.textContent = 'Terjime: Claude kömegi bilen, düzedişe açyk.';
  not.style.cssText = 'color:var(--soluk);font-size:13px;';
  var gov = document.createElement('div');
  gov.style.cssText = 'white-space:pre-wrap;line-height:1.7;font-size:18px;';
  sayfa.appendChild(geri); sayfa.appendChild(bas); sayfa.appendChild(not); sayfa.appendChild(gov);
  document.body.appendChild(sayfa);

  var eskiGor = '';
  geri.onclick = function () { sayfa.style.display = 'none'; liste.style.display = eskiGor; window.scrollTo(0, 0); };

  K.forEach(function (k) {
    fetch(k.dosya).then(function (r) {
      if (!r.ok) return;
      var d = document.createElement('button');
      d.textContent = k.ad + ' (' + k.yazar + ')';
      d.style.cssText = stil;
      d.onclick = function () {
        fetch(k.dosya).then(function (r) { return r.text(); }).then(function (t) {
          bas.textContent = k.ad;
          gov.textContent = t;
          eskiGor = liste.style.display;
          liste.style.display = 'none';
          sayfa.style.display = 'block';
          window.scrollTo(0, 0);
        });
      };
      ic.appendChild(d);
      kutu.style.display = 'block';
    }).catch(function () {});
  });
})();
