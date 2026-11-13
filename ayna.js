(function(){
  var st=document.createElement('style');
  st.textContent='#aynasayfa{display:none}#aynasayfa .karakter{display:block;width:100%;text-align:left;margin:0 0 10px;padding:12px;font-size:16px}#aynasayfa .not{color:var(--soluk);font-size:15px}#aynasayfa .kutu{padding:14px 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);margin:12px 0}#aynasayfa ul{margin:6px 0 10px;padding-left:20px}#aynasayfa textarea{width:100%;box-sizing:border-box;min-height:100px;padding:10px;font-size:16px;font-family:inherit;background:var(--bg);color:var(--yazi);border:1px solid var(--soluk);border-radius:6px}';
  document.head.appendChild(st);
  var ap=document.createElement('div');
  ap.id='aynasayfa';
  document.body.appendChild(ap);
  var kutu=document.getElementById('testler');
  if(!kutu){
    kutu=document.createElement('div');
    kutu.id='testler';
    kutu.innerHTML='<small>Testler</small>';
    var kk=document.getElementById('kitaplar');
    kk.parentNode.insertBefore(kutu,kk);
  }
  function ekle(ana,tag,metin,cls){
    var e=document.createElement(tag);
    if(cls) e.className=cls;
    e.textContent=metin;
    ana.appendChild(e);
    return e;
  }
  function kapat(){
    ap.style.display='none';
    document.getElementById('liste').style.display='block';
  }
  function liste(d){
    ap.innerHTML='';
    ekle(ap,'button','← Geri').onclick=kapat;
    ekle(ap,'h2',d.baslik);
    ekle(ap,'p',d.giris,'not');
    d.karakterler.forEach(function(k){
      ekle(ap,'button',k.ad+' · '+k.kitap,'karakter').onclick=function(){goster(d,k);};
    });
    ekle(ap,'p',d.uyari,'not');
    document.getElementById('liste').style.display='none';
    ap.style.display='block';
    window.scrollTo(0,0);
  }
  function goster(d,k){
    ap.innerHTML='';
    ekle(ap,'button','← Karakterler').onclick=function(){liste(d);};
    ekle(ap,'h2',k.ad);
    ekle(ap,'p',k.kitap,'not');
    var k1=document.createElement('div');
    k1.className='kutu';
    ap.appendChild(k1);
    ekle(k1,'b','Karakterin hâli');
    ekle(k1,'p',k.durum);
    ekle(ap,'h3','Kendine sor');
    var ul=document.createElement('ul');
    k.sorular.forEach(function(s){ekle(ul,'li',s);});
    ap.appendChild(ul);
    ekle(ap,'h3','Yazma önerisi');
    ekle(ap,'p',k.yazma);
    var ta=document.createElement('textarea');
    ta.placeholder='Düşüncelerini buraya yazabilirsin. Hiçbir yere kaydedilmez; sayfadan çıkınca silinir.';
    ap.appendChild(ta);
    ekle(ap,'h3','Küçük adımlar');
    ekle(ap,'p',k.adim);
    if(k.oku){
      ekle(ap,'button','Kitabı aç').onclick=function(){
        var kitap=kitaplar.filter(function(x){return x.dosya===k.oku.dosya;})[0];
        if(kitap){ap.style.display='none';window.bekleyenGit=k.oku.git||null;ac(kitap);}
      };
    }
    ekle(ap,'p',d.uyari,'not');
    window.scrollTo(0,0);
  }
  fetch('testler/ayna.json').then(function(r){return r.json();}).then(function(d){
    var e=document.createElement('span');
    e.className='etiket';
    e.textContent=d.baslik;
    e.onclick=function(){liste(d);};
    kutu.appendChild(e);
  }).catch(function(){});
})();
