(function(){
  var st=document.createElement('style');
  st.textContent='#notlar{margin:0 0 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);padding:0 16px}#notlar>summary{padding:14px 0;cursor:pointer;font-weight:bold}#notlar .nokta{padding:10px 0;border-top:1px solid var(--soluk)}#notlar .nokta b{display:block}#notlar .nokta details{margin-top:8px}#notlar .nokta summary{cursor:pointer;color:var(--soluk);font-size:14px}';
  document.head.appendChild(st);
  var eski=ac;
  ac=function(k){
    eski(k);
    var o=document.getElementById('notlar');
    if(o) o.remove();
    if(!k.notlar) return;
    fetch(k.notlar).then(function(r){
      if(!r.ok) throw new Error('yok');
      return r.json();
    }).then(function(d){
      if(document.getElementById('baslik').textContent!==k.baslik) return;
      var det=document.createElement('details');
      det.id='notlar';
      var h='<summary>Açıklamalı notlar ('+d.length+' not)</summary>';
      d.forEach(function(n){
        h+='<div class="nokta"><b>'+n.yer+'</b>'+n.baglam;if(n.git) h+='<br><button class="git" data-git="'+n.git.join('|')+'">Bölüme git</button>';
        if(n.analiz) h+='<details><summary>Tam analiz (spoiler içerir)</summary>'+n.analiz+'</details>';
        h+='</div>';
      });
      det.innerHTML=h;
      var m=document.getElementById('metin');
      m.parentNode.insertBefore(det,m);
    }).catch(function(){});
  };
})();
