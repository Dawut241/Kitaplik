(function(){
  var st=document.createElement('style');
  st.textContent='#analiz{margin:0 0 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);padding:0 16px}#analiz>summary{padding:14px 0;cursor:pointer;font-weight:bold}#analiz h4{margin:14px 0 6px}#analiz .tema{padding:8px 0;border-top:1px solid var(--soluk)}#analiz .tema b{display:block}#analiz ul{margin:6px 0 10px;padding-left:20px}#analiz details{margin:8px 0}#analiz details>summary{cursor:pointer;color:var(--soluk);font-size:14px}#analiz .sahne{padding:8px 0;border-top:1px solid var(--soluk)}#analiz .sahne b{display:block}#analiz .git{margin-top:6px;padding:6px 12px;font-size:14px}#analiz .alt{color:var(--soluk);font-size:14px}';
  document.head.appendChild(st);
  var eski=ac;
  ac=function(k){
    eski(k);
    var o=document.getElementById('analiz');
    if(o) o.remove();
    if(!k.analiz) return;
    fetch(k.analiz).then(function(r){
      if(!r.ok) throw new Error('yok');
      return r.json();
    }).then(function(d){
      if(document.getElementById('baslik').textContent!==k.baslik) return;
      var det=document.createElement('details');
      det.id='analiz';
      var h='<summary>Kitap analizi</summary>';
      if(d.ozet) h+='<h4>Kısaca</h4><p>'+d.ozet+'</p>';
      if(d.temalar&&d.temalar.length){
        h+='<h4>Temalar</h4>';
        d.temalar.forEach(function(t){h+='<div class="tema"><b>'+t.ad+'</b>'+t.not+'</div>';});
      }
      if(d.sahneler&&d.sahneler.length){
        h+='<details><summary>Önemli sahneler (spoiler içerir)</summary>';
        d.sahneler.forEach(function(s){
          h+='<div class="sahne"><b>'+s.yer+'</b>'+s.not;
          if(s.ara) h+='<span class="alt"><br>Sayfada bul ile ara: '+s.ara+'</span>';
          if(s.git) h+='<br><button class="git" data-git="'+s.git.join('|')+'">Bölüme git</button>';
          h+='</div>';
        });
        h+='</details>';
      }
      if(d.sorular&&d.sorular.length){
        h+='<h4>Okuduktan sonra tartış</h4><ul>';
        d.sorular.forEach(function(q){h+='<li>'+q+'</li>';});
        h+='</ul>';
      }
      if(d.ipucu) h+='<p class="alt">'+d.ipucu+'</p>';
      det.innerHTML=h;
      var m=document.getElementById('metin');
      m.parentNode.insertBefore(det,m);
    }).catch(function(){});
  };
})();
