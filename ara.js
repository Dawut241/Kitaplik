(function(){
  var panel=document.getElementById('bilgi');
  if(!panel) return;
  var DUR=['ve','veya','ile','bir','bu','su','de','da','ki','mi','mu','ne','nedir','neden','nasil','kim','kimdir','hangi','icin','gibi','en','cok','daha','var','ya','ama','ise','her','bana','goster','ara','kitap','kitapta','kitaplarda','gecer','gectigi','yer','yerler','nerede','un','in','nin','nun','den','dan','ten','tan','ye','yi','ni','nu','na','la','le'];
  var indeks=null,sozluk={},metinler={},onbellek={};
  var st=document.createElement('style');
  st.textContent='#kitapsonuc{padding:0 0 14px}#kitapsonuc .satir{padding:10px 0;border-top:1px solid var(--soluk)}#kitapsonuc .satir b{display:block}#kitapsonuc .kesit{color:var(--soluk);font-size:14px;margin:8px 0}#kitapsonuc button{margin:4px 6px 0 0;padding:6px 12px;font-size:14px}';
  document.head.appendChild(st);
  var btn=document.createElement('button');
  btn.id='kitapara';
  btn.textContent='Kitaplarda ara';
  document.getElementById('bilgigonder').insertAdjacentElement('afterend',btn);
  var sonuc=document.createElement('div');
  sonuc.id='kitapsonuc';
  document.getElementById('bilgicevap').insertAdjacentElement('afterend',sonuc);
  function norm(s){return String(s).toLocaleLowerCase('tr').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
  function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  function yukle(){
    if(indeks) return Promise.resolve();
    return Promise.all([
      fetch('indeks/indeks.json').then(function(r){return r.json();}),
      fetch('indeks/sozluk.json').then(function(r){return r.json();}).catch(function(){return {};})
    ]).then(function(a){indeks=a[0];sozluk=a[1];});
  }
  function sozluktenBul(t){
    if(sozluk[t]) return sozluk[t];
    var en=null,uz=0;
    for(var k in sozluk){
      if(k.length>=3&&k.length>uz&&t.indexOf(k)===0&&t.length-k.length<=4){en=sozluk[k];uz=k.length;}
    }
    return en;
  }
  function gruplar(q){
    var g=[];
    norm(q).split(' ').forEach(function(t){
      if(t.length<3||DUR.indexOf(t)>=0) return;
      var e=sozluktenBul(t);
      g.push(e?e.slice():[t]);
    });
    return g;
  }
  function kayit(w){
    if(onbellek[w]) return onbellek[w];
    var o={},v=indeks.t[w];
    if(v) v.split(',').forEach(function(x){var p=x.split(':');o[p[0]]=+p[1];});
    onbellek[w]=o;
    return o;
  }
  function kitapSirala(g){
    var puan=[];
    for(var i=0;i<indeks.k.length;i++){
      var top=0,esl=0;
      g.forEach(function(grup){
        var en=0;
        grup.forEach(function(w){var c=kayit(w)[i]||0;if(c>en)en=c;});
        if(en>0){esl++;top+=en;}
      });
      if(esl>0) puan.push({i:i,esl:esl,top:top});
    }
    puan.sort(function(a,b){return b.esl-a.esl||b.top-a.top;});
    return puan;
  }
  function metinAl(i){
    var d=indeks.k[i];
    if(metinler[d]) return Promise.resolve(metinler[d]);
    return fetch(d).then(function(r){return r.text();}).then(function(t){t=t.replace(/\r/g,'');metinler[d]=t;return t;});
  }
  function paragraflar(t){
    var out=[],re=/\n\s*\n/g,bas=0,m;
    while((m=re.exec(t))!==null){out.push({s:bas,t:t.slice(bas,m.index)});bas=m.index+m[0].length;}
    out.push({s:bas,t:t.slice(bas)});
    return out;
  }
  function ankraj(p,ilk){
    var s=p.t.split('\n'),say=0,sec=null,uzun=null;
    for(var i=0;i<s.length;i++){
      var tr=s[i].trim(),o={a:tr,pos:p.s+say+s[i].indexOf(tr)};
      if(ilk>=say&&ilk<say+s[i].length+1) sec=o;
      if(!uzun||tr.length>uzun.a.length) uzun=o;
      say+=s[i].length+1;
    }
    return (sec&&sec.a.length>=12)?sec:uzun;
  }
  function kacinci(t,a,pos){
    var n=0,i=-1;
    while((i=t.indexOf(a,i+1))!==-1&&i<pos) n++;
    return n;
  }
  function listele(i,g,kap){
    kap.innerHTML='';
    var y=document.createElement('div');
    y.className='kesit';
    y.textContent='Yükleniyor...';
    kap.appendChild(y);
    metinAl(i).then(function(t){
      var re=g.map(function(grup){return new RegExp('\\b('+grup.map(esc).join('|')+')(?:s|es|ed|d|ing)?\\b','i');});
      var b=[];
      paragraflar(t).forEach(function(p){
        var esl=0,ilk=-1;
        re.forEach(function(r){var m=r.exec(p.t);if(m){esl++;if(ilk<0||m.index<ilk)ilk=m.index;}});
        if(esl>0) b.push({p:p,esl:esl,ilk:ilk});
      });
      b.sort(function(x,z){return z.esl-x.esl||x.p.s-z.p.s;});
      kap.innerHTML='';
      if(!b.length){kap.textContent='Bu kitapta bulamadım.';return;}
      var h=document.createElement('div');
      h.className='kesit';
      h.textContent=b.length+' pasaj bulundu, en iyi '+Math.min(8,b.length)+' tanesi:';
      kap.appendChild(h);
      b.slice(0,8).forEach(function(x){
        var temiz=x.p.t.replace(/\s+/g,' ').trim();
        var c=-1;
        re.forEach(function(r){var m=r.exec(temiz);if(m&&(c<0||m.index<c))c=m.index;});
        if(c<0) c=0;
        var kesit=(c>80?'…':'')+temiz.slice(Math.max(0,c-80),c+170)+(temiz.length>c+170?'…':'');
        var an=ankraj(x.p,x.ilk);
        var div=document.createElement('div');
        div.className='satir';
        var k=document.createElement('div');
        k.className='kesit';
        k.textContent=kesit;
        div.appendChild(k);
        if(an&&an.a){
          var nth=kacinci(t,an.a,an.pos);
          var d=document.createElement('button');
          d.textContent='Bölüme git';
          d.onclick=function(){
            var kitap=kitaplar.filter(function(z){return z.dosya===indeks.k[i];})[0];
            if(kitap){window.bekleyenGit=null;window.bekleyenAra=[an.a,nth];ac(kitap);}
          };
          div.appendChild(d);
        }
        kap.appendChild(div);
      });
    }).catch(function(){kap.textContent='Kitap yüklenemedi, biraz sonra tekrar dene.';});
  }
  function ara(){
    var q=document.getElementById('bilgisoru').value.trim();
    if(!q){sonuc.textContent='Önce bir kelime veya karakter adı yaz.';return;}
    sonuc.textContent='Aranıyor...';
    yukle().then(function(){
      var g=gruplar(q);
      sonuc.innerHTML='';
      if(!g.length){sonuc.textContent='Aranacak bir kelime bulamadım. Bir karakter adı veya kelime yaz (örneğin Svidrigailov ya da vicdan).';return;}
      var bas=document.createElement('div');
      bas.className='kesit';
      bas.textContent='Aranan: '+g.map(function(x){return x.join(' / ');}).join(' + ');
      sonuc.appendChild(bas);
      var p=kitapSirala(g).slice(0,6);
      if(!p.length){
        var yok=document.createElement('div');
        yok.textContent='Kitaplarda bulamadım. Metinler İngilizce olduğu için İngilizce kelime veya karakter adı da deneyebilirsin.';
        sonuc.appendChild(yok);
        return;
      }
      p.forEach(function(x){
        var satir=document.createElement('div');
        satir.className='satir';
        var b=document.createElement('b');
        b.textContent=indeks.b[x.i];
        satir.appendChild(b);
        var s=document.createElement('div');
        s.className='kesit';
        s.textContent=x.top+' geçiş'+(x.esl<g.length?' (kelimelerin hepsi bu kitapta yok)':'');
        satir.appendChild(s);
        var yerler=document.createElement('div');
        var d=document.createElement('button');
        d.textContent='Geçtiği yerler';
        d.onclick=function(){listele(x.i,g,yerler);};
        satir.appendChild(d);
        satir.appendChild(yerler);
        sonuc.appendChild(satir);
      });
    }).catch(function(){sonuc.textContent='Arama dizini bulunamadı. Adım 2'+"'"+'deki indeks_yap.py komutunu çalıştır.';});
  }
  btn.onclick=ara;
})();
