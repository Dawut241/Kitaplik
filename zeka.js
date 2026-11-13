(function(){
  var NOT='Bu bir eğlence ve kendini tanıma oyunudur; tanı, ölçüm veya değerlendirme değildir. Sonuç seni tanımlamaz.';
  var st=document.createElement('style');
  st.textContent='#zekasayfa{display:none}#zekasayfa .sec{display:block;width:100%;text-align:left;margin:0 0 10px;padding:12px;font-size:16px}#zekasayfa .dogru{border:2px solid #2fb85a}#zekasayfa .yanlis{border:2px solid #d9534f}#zekasayfa .not{color:var(--soluk);font-size:15px}#zekasayfa .sonuc{padding:14px 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);margin:12px 0}';
  document.head.appendChild(st);
  var zp=document.createElement('div');
  zp.id='zekasayfa';
  document.body.appendChild(zp);
  var kutu=document.getElementById('testler');
  if(!kutu){
    kutu=document.createElement('div');
    kutu.id='testler';
    kutu.innerHTML='<small>Testler</small>';
    var kk=document.getElementById('kitaplar');
    kk.parentNode.insertBefore(kutu,kk);
  }
  function karistir(a){
    var b=a.slice();
    for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}
    return b;
  }
  function ekle(ana,tag,metin,cls){
    var e=document.createElement(tag);
    if(cls) e.className=cls;
    e.textContent=metin;
    ana.appendChild(e);
    return e;
  }
  function kapat(){
    zp.style.display='none';
    document.getElementById('liste').style.display='block';
  }
  function giris(d){
    zp.innerHTML='';
    ekle(zp,'button','← Geri').onclick=kapat;
    ekle(zp,'h2',d.baslik);
    ekle(zp,'p',d.aciklama,'not');
    ekle(zp,'button','Başla').onclick=function(){
      soru(d,d.tur==='dogru'?karistir(d.sorular):d.sorular,0,0);
    };
    ekle(zp,'p',NOT,'not');
    document.getElementById('liste').style.display='none';
    zp.style.display='block';
    window.scrollTo(0,0);
  }
  function soru(d,s,i,puan){
    var q=s[i];
    zp.innerHTML='';
    ekle(zp,'button','← Geri').onclick=kapat;
    ekle(zp,'h2',d.baslik);
    ekle(zp,'p','Soru '+(i+1)+' / '+s.length,'not');
    ekle(zp,'h3',q.s);
    var sec=d.tur==='dogru'
      ?[{t:q.d,p:1,ok:true}].concat(q.y.map(function(t){return {t:t,p:0};}))
      :q.sec;
    var cevaplandi=false;
    karistir(sec).forEach(function(o){
      var b=ekle(zp,'button',o.t,'sec');
      b.onclick=function(){
        if(cevaplandi) return;
        cevaplandi=true;
        puan+=o.p;
        function ileri(){
          if(i+1<s.length) soru(d,s,i+1,puan); else bitir(d,s,puan);
        }
        if(d.tur==='dogru'){
          var bs=zp.querySelectorAll('.sec');
          for(var k=0;k<bs.length;k++){
            if(bs[k].textContent===q.d) bs[k].className='sec dogru';
            else if(bs[k]===b) bs[k].className='sec yanlis';
          }
          ekle(zp,'p',(o.ok?'Doğru! ':'Yanlış. Doğru cevap: '+q.d+'. ')+q.ac,'not');
          ekle(zp,'button',i+1<s.length?'Sonraki soru':'Sonucu gör').onclick=ileri;
        }else{
          ileri();
        }
      };
    });
    window.scrollTo(0,0);
  }
  function bitir(d,s,puan){
    var maks=0;
    s.forEach(function(q){
      maks+=d.tur==='dogru'?1:Math.max.apply(null,q.sec.map(function(o){return o.p;}));
    });
    var r=d.sonuclar[0];
    d.sonuclar.forEach(function(x){if(puan>=x.min) r=x;});
    zp.innerHTML='';
    ekle(zp,'button','← Geri').onclick=kapat;
    ekle(zp,'h2','Sonuç');
    var k=ekle(zp,'div','','sonuc');
    ekle(k,'h3',puan+' / '+maks+' · '+r.baslik);
    ekle(k,'p',r.metin);
    if(r.ipucu) ekle(k,'p','İpucu: '+r.ipucu,'not');
    ekle(zp,'p',NOT,'not');
    if(r.oku){
      ekle(zp,'button','Kitap önerisi: '+r.oku.ad).onclick=function(){
        var kitap=kitaplar.filter(function(x){return x.dosya===r.oku.dosya;})[0];
        if(kitap){zp.style.display='none';window.bekleyenGit=r.oku.git||null;ac(kitap);}
      };
    }
    ekle(zp,'button','Tekrar').onclick=function(){giris(d);};
    window.scrollTo(0,0);
  }
  fetch('testler/zeka.json').then(function(r){return r.json();}).then(function(j){
    j.oyunlar.forEach(function(d){
      var e=document.createElement('span');
      e.className='etiket';
      e.textContent=d.baslik;
      e.onclick=function(){giris(d);};
      kutu.appendChild(e);
    });
  }).catch(function(){});
})();
