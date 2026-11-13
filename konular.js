(function(){
  var st=document.createElement('style');
  st.textContent='#konular{margin:0 0 16px}#konular small{display:block;color:var(--soluk);margin-bottom:8px}#konular .etiket{display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid var(--soluk);border-radius:20px;cursor:pointer;font-size:15px}#konu{display:none}#konu .not{color:var(--soluk);font-size:15px}#konu .yer{padding:12px 0;border-top:1px solid var(--soluk)}#konu .yer b{display:block}#konu .ara{display:block;color:var(--soluk);font-size:14px;margin-top:4px}#konu .ac{margin:8px 0 0;padding:6px 12px;font-size:14px}';
  document.head.appendChild(st);
  var konu=document.createElement('div');
  konu.id='konu';
  document.body.appendChild(konu);
  var kutu=document.createElement('div');
  kutu.id='konular';
  var kitapKutusu=document.getElementById('kitaplar');
  kitapKutusu.parentNode.insertBefore(kutu,kitapKutusu);
  function goster(t){
    var h='<button id="konugeri">← Geri</button><h2>'+t.baslik+'</h2>';
    h+='<p class="not">Spoiler uyarısı: Bu sayfa kitapların önemli sahnelerine işaret eder. Metinde bir ifadeyi bulmak için Chrome menüsünden Sayfada bul seçeneğini kullan.</p>';
    h+='<p>'+t.ozet+'</p>';
    t.yerler.forEach(function(y,i){
      h+='<div class="yer"><b>'+y.kitap+' — '+y.yer+'</b>'+y.not;
      if(y.ara) h+='<span class="ara">Sayfada bul ile ara: '+y.ara+'</span>';
      h+='<button class="ac" data-i="'+i+'">'+(y.git?'Bölüme git':'Kitabı aç')+'</button></div>';
    });
    konu.innerHTML=h;
    document.getElementById('konugeri').onclick=function(){
      konu.style.display='none';
      document.getElementById('liste').style.display='block';
    };
    var dugmeler=konu.querySelectorAll('.ac');
    for(var j=0;j<dugmeler.length;j++){
      dugmeler[j].onclick=function(){
        var y=t.yerler[this.getAttribute('data-i')];
        var kitap=kitaplar.filter(function(k){return k.dosya===y.dosya})[0];
        if(kitap){konu.style.display='none';window.bekleyenGit=y.git||null;ac(kitap);}
      };
    }
    document.getElementById('liste').style.display='none';
    konu.style.display='block';
    window.scrollTo(0,0);
  }
  fetch('konular/konular.json').then(function(r){return r.json()}).then(function(d){
    kutu.innerHTML='<small>Konulara göre oku</small>';
    d.forEach(function(t){
      var e=document.createElement('span');
      e.className='etiket';
      e.textContent=t.baslik;
      e.onclick=function(){goster(t)};
      kutu.appendChild(e);
    });
  }).catch(function(){});
})();
