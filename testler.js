(function(){
  var st=document.createElement('style');
  st.textContent='#testler{margin:0 0 16px}#testler small{display:block;color:var(--soluk);margin-bottom:8px}#testler .etiket{display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid var(--soluk);border-radius:20px;cursor:pointer;font-size:15px}#testsayfa{display:none}#testsayfa .not{color:var(--soluk);font-size:15px}#testsayfa .sec{display:block;width:100%;text-align:left;margin:0 0 10px;padding:12px;font-size:16px}#testsayfa .sonuc{padding:14px 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);margin:12px 0}#testsayfa .sonuc h3{margin:0 0 6px}';
  document.head.appendChild(st);
  var tp=document.createElement('div');
  tp.id='testsayfa';
  document.body.appendChild(tp);
  var kutu=document.createElement('div');
  kutu.id='testler';
  var kk=document.getElementById('kitaplar');
  kk.parentNode.insertBefore(kutu,kk);
  function kapat(){
    tp.style.display='none';
    document.getElementById('liste').style.display='block';
  }
  function baslat(t){
    document.getElementById('liste').style.display='none';
    tp.style.display='block';
    window.scrollTo(0,0);
    soru(t,0,{});
  }
  function soru(t,i,puan){
    var s=t.sorular[i];
    tp.innerHTML='<button id="testgeri">← Geri</button><h2>'+t.baslik+'</h2><p class="not">Eğlence amaçlı bir testtir; kişilik tanısı değildir. Soru '+(i+1)+' / '+t.sorular.length+'</p><h3>'+s.s+'</h3>';
    document.getElementById('testgeri').onclick=kapat;
    s.sec.forEach(function(o){
      var b=document.createElement('button');
      b.className='sec';
      b.textContent=o.t;
      b.onclick=function(){
        for(var k in o.p) puan[k]=(puan[k]||0)+o.p[k];
        if(i+1<t.sorular.length) soru(t,i+1,puan); else sonuc(t,puan);
      };
      tp.appendChild(b);
    });
    window.scrollTo(0,0);
  }
  function sonuc(t,puan){
    var en=null,top=-1;
    for(var k in t.sonuclar){
      if((puan[k]||0)>top){top=puan[k]||0;en=k;}
    }
    var r=t.sonuclar[en];
    tp.innerHTML='<button id="testgeri">← Geri</button><h2>Sonuç</h2><div class="sonuc"><h3>'+r.ad+'</h3><b>'+r.kitap+'</b><p>'+r.aciklama+'</p></div><p class="not">Bu bir eğlence testidir; kişilik tanısı değildir.</p>';
    document.getElementById('testgeri').onclick=kapat;
    var oku=document.createElement('button');
    oku.textContent='Kitabı aç';
    oku.onclick=function(){
      var kitap=kitaplar.filter(function(x){return x.dosya===r.oku.dosya;})[0];
      if(kitap){tp.style.display='none';window.bekleyenGit=r.oku.git||null;ac(kitap);}
    };
    tp.appendChild(oku);
    var tekrar=document.createElement('button');
    tekrar.textContent='Tekrar çöz';
    tekrar.onclick=function(){soru(t,0,{});};
    tp.appendChild(tekrar);
    window.scrollTo(0,0);
  }
  kutu.innerHTML='<small>Testler</small>';
  ['testler/karakter.json','testler/yazar.json'].forEach(function(f){
    fetch(f).then(function(r){return r.json();}).then(function(t){
      var e=document.createElement('span');
      e.className='etiket';
      e.textContent=t.baslik;
      e.onclick=function(){baslat(t);};
      kutu.appendChild(e);
    }).catch(function(){});
  });
})();
