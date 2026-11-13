(function(){
  var st=document.createElement('style');
  st.textContent='#karsilastirma{margin:0 0 16px}#karsilastirma small{display:block;color:var(--soluk);margin-bottom:8px}#karsilastirma .etiket{display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid var(--soluk);border-radius:20px;cursor:pointer;font-size:15px}#kars{display:none}#kars .not{color:var(--soluk);font-size:15px}#kars .taraf{margin:14px 0;padding:4px 0 4px 14px;border-left:3px solid var(--soluk)}#kars .taraf h3{margin:6px 0}#kars .yer{padding:10px 0;border-top:1px solid var(--soluk)}#kars .yer b{display:block}#kars .ara{display:block;color:var(--soluk);font-size:14px;margin-top:4px}#kars .ac{margin:8px 0 0;padding:6px 12px;font-size:14px}#kars .fark{padding:12px 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge)}';
  document.head.appendChild(st);
  var kars=document.createElement('div');
  kars.id='kars';
  document.body.appendChild(kars);
  var kutu=document.createElement('div');
  kutu.id='karsilastirma';
  var kitapKutusu=document.getElementById('kitaplar');
  kitapKutusu.parentNode.insertBefore(kutu,kitapKutusu);
  function tarafHtml(anahtar,t){
    var h='<div class="taraf"><h3>'+t.baslik+'</h3><p>'+t.metin+'</p>';
    t.yerler.forEach(function(y,i){
      h+='<div class="yer"><b>'+y.kitap+' — '+y.yer+'</b>'+y.not;
      if(y.ara) h+='<span class="ara">Sayfada bul ile ara: '+y.ara+'</span>';
      h+='<button class="ac" data-t="'+anahtar+'" data-i="'+i+'">'+(y.git?'Bölüme git':'Kitabı aç')+'</button></div>';
    });
    return h+'</div>';
  }
  function goster(s){
    var h='<button id="karsgeri">← Geri</button><h2>'+s.soru+'</h2>';
    h+='<p class="not">Spoiler uyarısı: Bu sayfa kitapların önemli sahnelerine işaret eder. Metinde bir ifadeyi bulmak için Chrome menüsünden Sayfada bul seçeneğini kullan.</p>';
    h+='<p>'+s.giris+'</p>';
    h+=tarafHtml('dostoyevski',s.dostoyevski);
    h+=tarafHtml('tolstoy',s.tolstoy);
    h+='<div class="fark"><b>Fark nerede?</b><br>'+s.fark+'</div>';
    kars.innerHTML=h;
    document.getElementById('karsgeri').onclick=function(){
      kars.style.display='none';
      document.getElementById('liste').style.display='block';
    };
    var d=kars.querySelectorAll('.ac');
    for(var j=0;j<d.length;j++){
      d[j].onclick=function(){
        var y=s[this.getAttribute('data-t')].yerler[this.getAttribute('data-i')];
        var kitap=kitaplar.filter(function(k){return k.dosya===y.dosya})[0];
        if(kitap){kars.style.display='none';window.bekleyenGit=y.git||null;ac(kitap);}
      };
    }
    document.getElementById('liste').style.display='none';
    kars.style.display='block';
    window.scrollTo(0,0);
  }
  fetch('karsilastirma/karsilastirma.json').then(function(r){return r.json()}).then(function(d){
    kutu.innerHTML='<small>Dostoyevski ve Tolstoy karşılaştırması</small>';
    d.forEach(function(s){
      var e=document.createElement('span');
      e.className='etiket';
      e.textContent=s.soru;
      e.onclick=function(){goster(s)};
      kutu.appendChild(e);
    });
  }).catch(function(){});
})();
