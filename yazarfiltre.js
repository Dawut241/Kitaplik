(function(){
  var kk = document.getElementById('kitaplar');
  if(!kk) return;
  var bar = document.createElement('div');
  bar.style.cssText = 'margin:0 16px 10px;display:flex;flex-wrap:wrap;gap:6px';
  var yazarlar = ['Tümü', 'Dostoyevski', 'Tolstoy', 'Chekhov', 'Gogol', 'Turgenev', 'Machiavelli', 'Nietzsche', 'Le Bon', 'Schopenhauer', 'Sun Tzu', 'Kutsal metin'];
  var etiketler = {'Chekhov': 'Çehov', 'Turgenev': 'Turgenyev'};
  yazarlar.forEach(function(y){
    var b = document.createElement('button');
    b.textContent = etiketler[y] || y;
    b.style.cssText = 'padding:6px 12px;border-radius:16px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:13px;cursor:pointer';
    b.onclick = function(){
      var kartlar = kk.children;
      for(var i = 0; i < kartlar.length; i++){
        var metin = kartlar[i].textContent || '';
        kartlar[i].style.display = (y === 'Tümü' || metin.indexOf(y) >= 0) ? '' : 'none';
      }
    };
    bar.appendChild(b);
  });
  kk.parentNode.insertBefore(bar, kk);
})();
