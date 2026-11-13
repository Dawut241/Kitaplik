(function(){
  var ANAHTAR='taslaklar_v1',MAX=100000;
  var st=document.createElement('style');
  st.textContent='#yazarsayfa{display:none}#yazarsayfa .not{color:var(--soluk);font-size:15px}#yazarsayfa .kutu{padding:12px 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);margin:12px 0}#yazarsayfa input,#yazarsayfa textarea{width:100%;box-sizing:border-box;padding:10px;font-size:16px;font-family:inherit;background:var(--bg);color:var(--yazi);border:1px solid var(--soluk);border-radius:6px;margin-bottom:10px}#yazarsayfa textarea{min-height:50vh}#yazarsayfa .taslak{display:block;width:100%;text-align:left;margin:0 0 10px;padding:12px;font-size:16px}#yazarsayfa button{margin:0 8px 8px 0}#yazarsayfa a.baglanti{display:inline-block;padding:8px 12px;border:1px solid var(--soluk);border-radius:6px;color:var(--yazi)}#yazarsayfa ul{margin:6px 0;padding-left:20px}';
  document.head.appendChild(st);
  var sp=document.createElement('div');
  sp.id='yazarsayfa';
  document.body.appendChild(sp);
  var kutu=document.getElementById('testler');
  if(!kutu){
    kutu=document.createElement('div');
    kutu.id='testler';
    kutu.innerHTML='<small>Testler</small>';
    var kk=document.getElementById('kitaplar');
    kk.parentNode.insertBefore(kutu,kk);
  }
  function oku(){try{return JSON.parse(localStorage.getItem(ANAHTAR)||'[]')||[];}catch(e){return [];}}
  function kaydet(l){try{localStorage.setItem(ANAHTAR,JSON.stringify(l));return true;}catch(e){return false;}}
  function ekle(ana,tag,metin,cls){var e=document.createElement(tag);if(cls)e.className=cls;e.textContent=metin;ana.appendChild(e);return e;}
  function kapat(){sp.style.display='none';document.getElementById('liste').style.display='block';}
  function kelime(s){var m=s.trim().match(/\S+/g);return m?m.length:0;}
  function slug(s){return s.replace(/[çÇ]/g,'c').replace(/[ğĞ]/g,'g').replace(/[ıİ]/g,'i').replace(/[öÖ]/g,'o').replace(/[şŞ]/g,'s').replace(/[üÜ]/g,'u').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'kitap';}
  function tek(s){return String(s).replace(/[\r\n]+/g,' ').trim();}
  function paketle(t){return 'BASLIK: '+tek(t.baslik)+'\nYAZAR: '+(tek(t.yazar)||'Takma ad')+'\n---\n'+t.metin;}
  function indir(t){
    var blob=new Blob([paketle(t)],{type:'text/plain;charset=utf-8'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=slug(t.baslik)+'.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  function kurallar(){
    var k=ekle(sp,'div','','kutu');
    ekle(k,'b','Yayın kuralları');
    var ul=document.createElement('ul');
    ['Yalnızca kendi yazdığın metni gönder; başkasının kitabını veya internetten kopyaladığın metni gönderme.','Gerçek ad, telefon, adres, okul gibi kişisel bilgileri yazma.','Nefret, zorbalık, şiddeti özendirme ve yetişkinlere özel içerik yayımlanmaz.','Gönderilen her metin yayımlanmadan önce okunur; her metin yayımlanmayabilir.','Göndererek metnin sana ait olduğunu ve sitede yayımlanmasına izin verdiğini kabul edersin.'].forEach(function(s){ekle(ul,'li',s);});
    k.appendChild(ul);
  }
  function ana(){
    var l=oku();
    sp.innerHTML='';
    ekle(sp,'button','← Geri').onclick=kapat;
    ekle(sp,'h2','Yazarlık atölyesi');
    ekle(sp,'p','Kendi kitabını, hikâyeni ya da denemeni yaz. Taslakların yalnızca bu cihazda, tarayıcında saklanır; tarayıcı verilerini silersen kaybolur. Önemli metinleri dosya olarak indir.','not');
    ekle(sp,'button','+ Yeni kitap').onclick=function(){
      var t={id:Date.now().toString(36),baslik:'',yazar:'',metin:'',t:Date.now()};
      var l2=oku();
      l2.unshift(t);
      kaydet(l2);
      duzenle(t.id);
    };
    if(!l.length) ekle(sp,'p','Henüz taslağın yok.','not');
    l.forEach(function(t){
      ekle(sp,'button',(t.baslik||'Adsız taslak')+' · '+kelime(t.metin)+' kelime','taslak').onclick=function(){duzenle(t.id);};
    });
    kurallar();
    document.getElementById('liste').style.display='none';
    sp.style.display='block';
    window.scrollTo(0,0);
  }
  function gonder(t,mes){
    if(!t.baslik.trim()||kelime(t.metin)<100){mes.textContent='Göndermeden önce bir ad ve en az 100 kelimelik bir metin yaz.';return;}
    mes.textContent='Hazırlanıyor...';
    fetch('yazar/ayar.json').then(function(r){return r.json();}).catch(function(){return {};}).then(function(a){
      if(!a.gonderLink||a.gonderLink.indexOf('https://')!==0){mes.textContent='Gönderme adresi henüz ayarlanmadı. Şimdilik dosyayı indirip site sahibine gönderebilirsin.';return;}
      var kop=(navigator.clipboard&&navigator.clipboard.writeText)?navigator.clipboard.writeText(paketle(t)):Promise.reject();
      kop.then(function(){return 'Metin panoya kopyalandı. Aşağıdaki bağlantıyı aç ve metni cevap kutusuna yapıştır.';},function(){return 'Metin kopyalanamadı. Önce dosyayı indir; formda yapıştıramazsan dosyayı site sahibine gönder.';}).then(function(s){
        mes.textContent=s+' ';
        mes.appendChild(document.createElement('br'));
        var link=document.createElement('a');
        link.className='baglanti';
        link.href=a.gonderLink;
        link.target='_blank';
        link.rel='noopener';
        link.textContent='Gönderme formunu aç';
        mes.appendChild(link);
      });
    });
  }
  function duzenle(id){
    var l=oku(),t=l.filter(function(x){return x.id===id;})[0];
    if(!t){ana();return;}
    sp.innerHTML='';
    ekle(sp,'button','← Taslaklar').onclick=ana;
    ekle(sp,'h2','Kitabını yaz');
    var b=document.createElement('input');b.placeholder='Kitabın adı';b.maxLength=80;b.value=t.baslik;sp.appendChild(b);
    var y=document.createElement('input');y.placeholder='Takma adın (gerçek adını yazmak zorunda değilsin)';y.maxLength=40;y.value=t.yazar;sp.appendChild(y);
    var m=document.createElement('textarea');m.placeholder='Yazmaya başla...';m.maxLength=MAX;m.value=t.metin;sp.appendChild(m);
    var d=ekle(sp,'p','','not');
    var zaman=null;
    function say(){d.textContent=kelime(m.value)+' kelime · '+m.value.length+' / '+MAX+' karakter';}
    function sakla(){
      var l2=oku();
      for(var i=0;i<l2.length;i++){if(l2[i].id===id){l2[i].baslik=b.value;l2[i].yazar=y.value;l2[i].metin=m.value;l2[i].t=Date.now();}}
      d.textContent=(kaydet(l2)?'Kaydedildi · ':'KAYDEDİLEMEDİ, metni dosya olarak indir · ')+kelime(m.value)+' kelime';
    }
    function degisti(){say();clearTimeout(zaman);zaman=setTimeout(sakla,600);}
    [b,y,m].forEach(function(e){e.oninput=degisti;});
    say();
    var mes=ekle(sp,'div','','not');
    function guncel(){return {baslik:b.value,yazar:y.value,metin:m.value};}
    ekle(sp,'button','Dosya olarak indir').onclick=function(){sakla();indir(guncel());};
    ekle(sp,'button','Yayın için gönder').onclick=function(){sakla();gonder(guncel(),mes);};
    ekle(sp,'button','Taslağı sil').onclick=function(){
      if(!confirm('Bu taslak silinsin mi?')) return;
      var l3=oku().filter(function(x){return x.id!==id;});
      kaydet(l3);
      ana();
    };
    kurallar();
    window.scrollTo(0,0);
  }
  var e=document.createElement('span');
  e.className='etiket';
  e.textContent='✍️ Kitap yaz';
  e.onclick=ana;
  kutu.appendChild(e);
})();
