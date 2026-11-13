(function(){
  var DOSYALAR=['bilgi/dostoyevski.json','bilgi/tolstoy.json','bilgi/ortak.json','bilgi/machiavelli.json','bilgi/nietzsche.json'];
  var DUR=['ve','veya','ile','bir','bu','su','de','da','ki','mi','mu','midir','mudur','ne','nedir','neden','nasil','kim','kimdir','hangi','icin','gibi','en','cok','daha','olan','olarak','hakkinda','var','ya','ama','ise','her','bana','soyler','misin','anlat','nelerdir','zaman','nerede','kac','un','in','nin','nun','den','dan','ten','tan','ye','yi','ni','nu','na','la','le'];
  var ORNEK=['Dostoyevski neden idam sehpasına çıkarıldı?','Tolstoy neden aforoz edildi?','Tolstoy ve Dostoyevski hiç tanıştı mı?','Raskolnikov\'un kuramı nedir?','Dostoyevski\'yi nereden okumaya başlamalıyım?'];
  var ESIK=4;
  var K=[],DF={},hazir=false;
  function norm(s){return String(s).toLocaleLowerCase('tr').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
  function tokens(s){return norm(s).split(' ').filter(function(t){return t.length>1&&DUR.indexOf(t)<0;});}
  function kur(liste){
    liste.forEach(function(e){
      var m={};
      function ekle(metin,w){tokens(metin).forEach(function(t){if(!m[t]||m[t]<w)m[t]=w;});}
      ekle(e.anahtar||'',3);
      ekle(e.baslik||'',2);
      ekle(e.cevap||'',1);
      e._m=m;
      K.push(e);
    });
    DF={};
    K.forEach(function(e){for(var t in e._m){DF[t]=(DF[t]||0)+1;}});
  }
  function eslesir(a,b){
    var kisa=a.length<b.length?a:b,uzun=a.length<b.length?b:a;
    return kisa.length>=4&&uzun.indexOf(kisa)===0&&uzun.length-kisa.length<=4;
  }
  function puanla(q){
    var qt=tokens(q),N=K.length;
    return K.map(function(e){
      var p=0;
      qt.forEach(function(t){
        var w=0,d=1;
        if(e._m[t]){w=e._m[t];d=DF[t]||1;}
        else{
          for(var k in e._m){
            if(eslesir(t,k)&&e._m[k]*0.8>w){w=e._m[k]*0.8;d=DF[k]||1;}
          }
        }
        if(w>0)p+=w*Math.log(1+N/d);
      });
      return {e:e,p:p};
    }).filter(function(x){return x.p>0;}).sort(function(a,b){return b.p-a.p;});
  }
  var st=document.createElement('style');
  st.textContent='#bilgi{margin:0 0 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);padding:0 16px}#bilgi>summary{padding:14px 0;cursor:pointer;font-weight:bold}#bilgi .alt{color:var(--soluk);font-size:13px;margin:0 0 10px}#bilgi .bornek{display:inline-block;margin:0 6px 6px 0;padding:6px 10px;border:1px solid var(--soluk);border-radius:16px;font-size:13px;cursor:pointer}#bilgicevap{padding:10px 0 14px}#bilgicevap p{margin:6px 0 10px}';
  document.head.appendChild(st);
  var kutu=document.createElement('details');
  kutu.id='bilgi';
  kutu.innerHTML='<summary>Soru sor</summary><p class="alt">Bu bölüm yapay zekâ değildir: Dostoyevski ve Tolstoy hakkında önceden hazırlanmış bilgiler arasında arama yapar. Bilgi bankasında olmayan sorulara cevap bulamaz.</p><div id="bilgiornek"></div><input id="bilgisoru" placeholder="Sorunu yaz..."><button id="bilgigonder">Ara</button><div id="bilgicevap"></div>';
  var kitapKutusu=document.getElementById('kitaplar');
  kitapKutusu.parentNode.insertBefore(kutu,kitapKutusu);
  function chip(metin,fn){
    var s=document.createElement('span');
    s.className='bornek';
    s.textContent=metin;
    s.onclick=fn;
    return s;
  }
  function sor(o){document.getElementById('bilgisoru').value=o;ara();}
  ORNEK.forEach(function(o){document.getElementById('bilgiornek').appendChild(chip(o,function(){sor(o);}));});
  function yaz(e,s){
    var c=document.getElementById('bilgicevap');
    c.innerHTML='';
    var b=document.createElement('b');
    b.textContent=e.baslik;
    c.appendChild(b);
    var p=document.createElement('p');
    p.textContent=e.cevap;
    c.appendChild(p);
    if(e.oku){
      var d=document.createElement('button');
      d.textContent=e.oku.git?'Kitapta oku':'Kitabı aç';
      d.onclick=function(){
        var kitap=kitaplar.filter(function(k){return k.dosya===e.oku.dosya;})[0];
        if(kitap){window.bekleyenGit=e.oku.git||null;ac(kitap);}
      };
      c.appendChild(d);
    }
    var diger=s.filter(function(x){return x.e!==e&&x.p>=ESIK*0.5;}).slice(0,3);
    if(diger.length){
      var t=document.createElement('p');
      t.className='alt';
      t.textContent='Benzer sorular:';
      c.appendChild(t);
      diger.forEach(function(x){c.appendChild(chip(x.e.baslik,function(){yaz(x.e,s);}));});
    }
  }
  function ara(){
    var q=document.getElementById('bilgisoru').value.trim();
    var c=document.getElementById('bilgicevap');
    if(!q){c.textContent='Önce bir soru yaz.';return;}
    if(!hazir){c.textContent='Bilgi bankası yükleniyor, birkaç saniye sonra tekrar dene.';return;}
    var s=puanla(q);
    c.innerHTML='';
    if(!s.length){
      c.textContent='Bu konuda bilgi bankamda bir şey bulamadım. Şöyle sorular deneyebilirsin:';
      var k=document.createElement('div');
      c.appendChild(k);
      ORNEK.forEach(function(o){k.appendChild(chip(o,function(){sor(o);}));});
      return;
    }
    if(s[0].p>=ESIK){yaz(s[0].e,s);return;}
    c.textContent='Tam eşleşme bulamadım. En yakın konular:';
    var k2=document.createElement('div');
    c.appendChild(k2);
    s.slice(0,3).forEach(function(x){k2.appendChild(chip(x.e.baslik,function(){yaz(x.e,s);}));});
  }
  document.getElementById('bilgigonder').onclick=ara;
  document.getElementById('bilgisoru').onkeydown=function(ev){if(ev.key==='Enter')ara();};
  Promise.all(DOSYALAR.map(function(d){
    return fetch(d).then(function(r){return r.json();}).catch(function(){return [];});
  })).then(function(a){
    var hepsi=[];
    a.forEach(function(x){hepsi=hepsi.concat(x);});
    kur(hepsi);
    hazir=true;
  });
})();
