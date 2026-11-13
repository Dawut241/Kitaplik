(function(){
  var st=document.createElement('style');
  st.textContent='#yarismasayfa{display:none}#yarismasayfa .sec{display:block;width:100%;text-align:left;margin:0 0 10px;padding:12px;font-size:16px}#yarismasayfa .dogru{border:2px solid #2fb85a}#yarismasayfa .yanlis{border:2px solid #d9534f}#yarismasayfa .not{color:var(--soluk);font-size:15px}#yarismasayfa .sonuc{padding:14px 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);margin:12px 0}';
  document.head.appendChild(st);
  var yp=document.createElement('div');
  yp.id='yarismasayfa';
  document.body.appendChild(yp);
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
  function kapat(){
    yp.style.display='none';
    document.getElementById('liste').style.display='block';
  }
  function basla(d){
    document.getElementById('liste').style.display='none';
    yp.style.display='block';
    soru(d,karistir(d.sorular).slice(0,10),0,0,[]);
  }
  function soru(d,s,i,puan,yanlislar){
    var q=s[i];
    yp.innerHTML='<button id="yarismageri">← Geri</button><h2>'+d.baslik+'</h2><p class="not">Eğlence amaçlı bir bilgi oyunudur. Soru '+(i+1)+' / '+s.length+'</p><h3>'+q.s+'</h3>';
    document.getElementById('yarismageri').onclick=kapat;
    var cevaplandi=false;
    karistir([q.d].concat(q.y)).forEach(function(o){
      var b=document.createElement('button');
      b.className='sec';
      b.textContent=o;
      b.onclick=function(){
        if(cevaplandi) return;
        cevaplandi=true;
        var dogru=(o===q.d);
        if(dogru) puan++; else yanlislar.push(q);
        var bs=yp.querySelectorAll('.sec');
        for(var k=0;k<bs.length;k++){
          if(bs[k].textContent===q.d) bs[k].className='sec dogru';
          else if(bs[k]===b) bs[k].className='sec yanlis';
        }
        var ac=document.createElement('p');
        ac.className='not';
        ac.textContent=(dogru?'Doğru! ':'Yanlış. Doğru cevap: '+q.d+'. ')+q.ac;
        yp.appendChild(ac);
        var ileri=document.createElement('button');
        ileri.textContent=(i+1<s.length)?'Sonraki soru':'Sonucu gör';
        ileri.onclick=function(){
          if(i+1<s.length) soru(d,s,i+1,puan,yanlislar); else bitir(d,s,puan,yanlislar);
        };
        yp.appendChild(ileri);
      };
      yp.appendChild(b);
    });
    window.scrollTo(0,0);
  }
  function bitir(d,s,puan,yanlislar){
    var mesaj;
    if(puan>=9) mesaj='Gerçek bir Rus edebiyatı okuru!';
    else if(puan>=6) mesaj='Sağlam bir okur: temeller sende.';
    else if(puan>=3) mesaj='Yolun başındasın; kitaplar seni bekliyor.';
    else mesaj='Henüz başlangıç. Sitedeki rehber ve notlar iyi birer yol gösterici.';
    yp.innerHTML='<button id="yarismageri">← Geri</button><h2>Sonuç</h2><div class="sonuc"><h3>'+puan+' / '+s.length+'</h3><p>'+mesaj+'</p></div>';
    document.getElementById('yarismageri').onclick=kapat;
    if(yanlislar.length){
      var h=document.createElement('p');
      h.innerHTML='<b>Kaçırdıkların:</b>';
      yp.appendChild(h);
      yanlislar.forEach(function(q){
        var p=document.createElement('p');
        p.className='not';
        p.textContent=q.s+' → '+q.d+'. '+q.ac;
        yp.appendChild(p);
      });
    }
    var t=document.createElement('button');
    t.textContent='Tekrar oyna';
    t.onclick=function(){basla(d);};
    yp.appendChild(t);
    window.scrollTo(0,0);
  }
  fetch('testler/yarisma.json').then(function(r){return r.json();}).then(function(d){
    var e=document.createElement('span');
    e.className='etiket';
    e.textContent=d.baslik;
    e.onclick=function(){basla(d);};
    kutu.appendChild(e);
  }).catch(function(){});
})();
