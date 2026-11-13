(function(){
  var st=document.createElement('style');
  st.textContent='#rehber{margin:0 0 16px;background:var(--kart);border-radius:8px;box-shadow:0 1px 3px var(--golge);padding:0 16px}#rehber summary{padding:14px 0;cursor:pointer;font-weight:bold}#rehber .not{color:var(--soluk);font-size:15px;margin:0 0 12px}#rehber .kisi{padding:10px 0;border-top:1px solid var(--soluk)}#rehber .kisi b{display:block}#rehber .takma{display:block;color:var(--soluk);font-size:14px}';
  document.head.appendChild(st);
  var eski=ac;
  ac=function(k){
    eski(k);
    var o=document.getElementById('rehber');
    if(o) o.remove();
    if(!k.rehber) return;
    fetch(k.rehber).then(function(r){
      if(!r.ok) throw new Error('yok');
      return r.json();
    }).then(function(d){
      if(document.getElementById('baslik').textContent!==k.baslik) return;
      var det=document.createElement('details');
      det.id='rehber';
      var h='<summary>Kim kimdir? ('+d.kisiler.length+' kişi)</summary>';
      if(d.not) h+='<p class="not">'+d.not+'</p>';
      d.kisiler.forEach(function(p){
        h+='<div class="kisi"><b>'+p.ad+'</b>';
        if(p.takma) h+='<span class="takma">Diğer adları: '+p.takma+'</span>';
        h+=p.not+'</div>';
      });
      det.innerHTML=h;
      var m=document.getElementById('metin');
      m.parentNode.insertBefore(det,m);
    }).catch(function(){});
  };
})();
