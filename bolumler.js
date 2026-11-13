(function(){
  var st=document.createElement('style');
  st.textContent='#bolumsec{width:100%;padding:10px;font-size:16px;margin:0 0 12px;background:var(--kart);color:var(--yazi);border:1px solid var(--soluk);border-radius:6px}';
  document.head.appendChild(st);
  window.bolEt=function(p,ad){
var a=String(ad).trim();
var t='';
if(p&&p.satirlar){for(var i=1;i<p.satirlar.length;i++){var z=p.satirlar[i].trim();if(z){t=z;break;}}}
if(/^[IVXLC]+\.?$|^\d+\.?$/.test(a)){a='Bölüm '+a.replace('.','');if(t&&t.length<=45)a+=' · '+t;}
return a.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
};
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-');}
  window.bolumeGit=function(part,chapter){
    var id='b-'+slug(part)+(chapter?'-'+slug(chapter):'');if(!document.getElementById(id)) id='b-'+slug(part);
    var e=document.getElementById(id);
    if(e){e.scrollIntoView();return true;}
    return false;
  };
  window.metinYaz=function(m,t,k){
    var eskiSec=document.getElementById('bolumsec');
    if(eskiSec) eskiSec.remove();
    if(!k.bolumler){
      m.textContent=t;
    } else {
      var pr=new RegExp(k.bolumler.part);
      var cr=new RegExp(k.bolumler.chapter||'^(?!)');
      var satirlar=t.replace(/\r/g,'').split('\n');
      var parcalar=[];
      var mevcut={id:'b-bas',satirlar:[]};
      var part='';
      var liste=[];
      satirlar.forEach(function(s){
        var d=s.trim();
        if(pr.test(d)){
          parcalar.push(mevcut);
          part=d;
          mevcut={id:'b-'+slug(part),satirlar:[s]};
          liste.push({idx:parcalar.length,id:mevcut.id,ad:part});
        } else if(cr.test(d)){
          parcalar.push(mevcut);
          mevcut={id:'b-'+slug(part)+'-'+slug(d),satirlar:[s]};
          liste.push({idx:parcalar.length,id:mevcut.id,ad:(part?part+' · ':'')+d});
        } else {
          mevcut.satirlar.push(s);
        }
      });
      parcalar.push(mevcut);
      m.textContent='';
      var kap=document.createDocumentFragment();
      parcalar.forEach(function(p){
        var div=document.createElement('div');
        div.id=p.id;
        div.textContent=p.satirlar.join('\n');
        kap.appendChild(div);
      });
      m.appendChild(kap);
      liste=liste.filter(function(x,i){for(var j=i+1;j<liste.length;j++){if(liste[j].id===x.id)return false;}return true;});
    if(liste.length){
        var sec=document.createElement('select');
        sec.id='bolumsec';
        var h='<option value="">Bölüme git…</option>';
        liste.forEach(function(x){h+='<option value="'+x.idx+'">'+window.bolEt(parcalar[x.idx],x.ad)+'</option>';});
        sec.innerHTML=h;
        sec.onchange=function(){
          var e=m.children[+this.value];
          if(e) e.scrollIntoView();
          this.value='';
        };
        document.getElementById('baslik').insertAdjacentElement('afterend',sec);
      }
    }
    if(window.bekleyenGit){
      var g=window.bekleyenGit;
      window.bekleyenGit=null;
      setTimeout(function(){window.bolumeGit(g[0],g[1]);},300);
    }
  };
  document.addEventListener('click',function(ev){
    var t=ev.target;
    var v=(t&&t.getAttribute)?t.getAttribute('data-git'):null;
    if(v){var p=v.split('|');window.bolumeGit(p[0],p[1]);}
  });
})();
