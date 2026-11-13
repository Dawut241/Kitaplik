(function () {
  var ara = document.getElementById('ara');
  if (!ara) return;

  var G = [
    ['suç ve ceza|raskolnikov|sonya|sonia|porfiri|razumihin|svidrigaylov|marmeladov|aliona|lizaveta|dunya', 'crime and punishment'],
    ['karamazov|karamazov kardeşler|alyoşa|alyosa|ivan karamazov|dmitri|smerdyakov|zosima|grushenka', 'brothers karamazov'],
    ['büyük engizisyoncu|engizisyoncu', 'grand inquisitor|brothers karamazov'],
    ['budala|mışkin|mishkin|nastasya|rogojin', 'idiot'],
    ['ecinniler|şeytanlar|stavrogin|verhovenski', 'demons|possessed|devils'],
    ['yeraltından notlar|yeraltı', 'notes from underground'],
    ['beyaz geceler', 'white nights'],
    ['fakir insanlar', 'poor folk'],
    ['kumarbaz', 'gambler'],
    ['ölüler evinden anılar|ölüler evi|kürek', 'house of the dead'],
    ['çift', 'double'],
    ['genç delikanlı', 'adolescent|raw youth'],
    ['sonsuz koca|ebedi koca', 'eternal husband|permanent husband'],
    ['amcanın rüyası', 'uncle'],
    ['anna karenina|vronski|levin|kitty|karenin', 'anna karenina'],
    ['savaş ve barış|pierre|natasha|andrey|napolyon', 'war and peace'],
    ['diriliş|nehludov|katyuşa', 'resurrection'],
    ['ivan ilyiç|ivan ilyiçin ölümü', 'ivan ilyich|ivan ilyic'],
    ['kreutzer sonat|kreutzer', 'kreutzer'],
    ['hacı murat|çeçen', 'hadji murad'],
    ['efendi ve uşak|uşak', 'master and man'],
    ['çocukluk', 'childhood'],
    ['ilkgençlik|ilk gençlik', 'boyhood'],
    ['gençlik', 'youth'],
    ['kazaklar', 'cossacks'],
    ['sivastopol|kırım', 'sevastopol'],
    ['hindu|gandhi', 'letter to a hindu'],
    ['insanlar ne ile yaşar', 'what men live by'],
    ['kafkasya tutsağı|kafkasya', 'prisoner in the caucasus|cossacks'],
    ['iki süvari', 'two hussars'],
    ['albert', 'albert']
  ];

  function n(s) {
    return String(s).toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  var kutu = document.createElement('div');
  kutu.style.cssText = 'display:none;margin:8px 0;';
  var etiket = document.createElement('div');
  etiket.textContent = 'Bulunan kitaplar:';
  etiket.style.cssText = 'color:var(--soluk);margin-bottom:6px;';
  var ic = document.createElement('div');
  kutu.appendChild(etiket);
  kutu.appendChild(ic);
  ara.parentNode.insertBefore(kutu, ara.nextSibling);

  var stil = 'padding:10px 14px;margin:4px 6px 4px 0;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:15px;';

  function bul() {
    var q = n(ara.value);
    ic.textContent = '';
    if (q.length < 3 || typeof kitaplar === 'undefined' || !kitaplar || !kitaplar.length) {
      kutu.style.display = 'none';
      return;
    }
    var gorulen = {}, sayi = 0;
    G.forEach(function (g) {
      var kws = g[0].split('|'), hit = false;
      for (var i = 0; i < kws.length; i++) {
        var kw = n(kws[i]);
        if (kw.indexOf(q) !== -1 || (kw.length >= 4 && q.indexOf(kw) !== -1)) { hit = true; break; }
      }
      if (!hit) return;
      var parcalar = g[1].split('|').map(n);
      kitaplar.forEach(function (k) {
        var b = n(k.baslik);
        var ok = parcalar.some(function (p) { return b.indexOf(p) !== -1; });
        if (ok && !gorulen[k.dosya] && sayi < 8) {
          gorulen[k.dosya] = 1;
          sayi++;
          var d = document.createElement('button');
          d.textContent = k.baslik + ' (' + k.yazar + ')';
          d.style.cssText = stil;
          d.onclick = function () { ac(k); };
          ic.appendChild(d);
        }
      });
    });
    kutu.style.display = sayi ? 'block' : 'none';
  }

  ara.addEventListener('input', bul);
})();
