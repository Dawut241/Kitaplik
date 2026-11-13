var YAGMUR=true;
(function(){
  var SIRA=['acik','koyu','yesil'];
  var ETIKET={acik:'🌙 Karanlık',koyu:'🟩 Terminal',yesil:'☀️ Aydınlık'};
  var st=document.createElement('style');
  st.textContent=':root[data-tema="yesil"]{--bg:#000;--kart:#04140b;--yazi:#6dff8f;--soluk:#2fb85a;--golge:#00ff4150;color-scheme:dark}:root[data-tema="yesil"] body{font-family:"Courier New",monospace}:root[data-tema="yesil"] #okuyucu{background:rgba(0,0,0,.85);padding:8px;border-radius:8px}';
  document.head.appendChild(st);
  function cur(){return document.documentElement.getAttribute('data-tema')||'acik';}
  function yaz(){
    var e=ETIKET[cur()]||ETIKET.acik;
    ['tema','tema2'].forEach(function(id){var b=document.getElementById(id);if(b)b.textContent=e;});
  }
  var cv=document.createElement('canvas');
  cv.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:.35;display:none';
  document.body.appendChild(cv);
  var ctx=cv.getContext('2d'),kol=[],boyut=16,zaman=null;
  var HARF='АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯабвгдежзиклмнопрстуфхцчшэюя0123456789';
  function boyutla(){
    cv.width=window.innerWidth;
    cv.height=window.innerHeight;
    var n=Math.floor(cv.width/boyut);
    kol=[];
    for(var i=0;i<n;i++)kol.push(Math.random()*cv.height/boyut);
  }
  function ciz(){
    ctx.fillStyle='rgba(0,0,0,0.12)';
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle='#33ff66';
    ctx.font=boyut+'px monospace';
    for(var i=0;i<kol.length;i++){
      var h=HARF.charAt(Math.floor(Math.random()*HARF.length));
      ctx.fillText(h,i*boyut,kol[i]*boyut);
      if(kol[i]*boyut>cv.height&&Math.random()>0.975)kol[i]=0;
      kol[i]++;
    }
  }
  function yagmur(){
    if(zaman){clearInterval(zaman);zaman=null;}
    var azHareket=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(YAGMUR&&cur()==='yesil'&&!azHareket){
      cv.style.display='block';
      boyutla();
      zaman=setInterval(function(){if(!document.hidden)ciz();},80);
    }else{
      cv.style.display='none';
    }
  }
  function degis(){
    var i=SIRA.indexOf(cur());
    var y=SIRA[(i+1)%SIRA.length];
    document.documentElement.setAttribute('data-tema',y);
    try{localStorage.setItem('tema',y);}catch(e){}
    yaz();
    yagmur();
  }
  ['tema','tema2'].forEach(function(id){var b=document.getElementById(id);if(b)b.onclick=degis;});
  window.addEventListener('resize',function(){if(zaman)boyutla();});
  yaz();
  yagmur();
})();
