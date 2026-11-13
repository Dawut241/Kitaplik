(function(){
var K='yks_yanlis';
function oku(a){try{return JSON.parse(localStorage.getItem(a)||'[]')}catch(e){return []}}
function yaz(a,v){try{localStorage.setItem(a,JSON.stringify(v))}catch(e){}}
function el(t,x,c){var e=document.createElement(t);if(x!=null)e.textContent=x;if(c)e.className=c;return e}
window.yksPlus={kaydet:function(test,cev){
 var l=oku(K);
 test.sorular.forEach(function(s,i){
  if(cev[i]===-1||cev[i]===s.dogru)return;
  if(l.some(function(q){return q.s===s.s}))return;
  l.unshift({t:test.baslik.split(/[-–]/)[0].trim(),s:s.s,sec:s.sec,dogru:s.dogru,aciklama:s.aciklama||''});
 });
 yaz(K,l.slice(0,100));
}};
function sayfa(){var yp=document.getElementById('ykssayfa'),li=document.getElementById('liste');
 if(!yp)return null;if(li)li.style.display='none';yp.style.display='block';yp.textContent='';window.scrollTo(0,0);
 var b=el('button','← Ana Sayfaya Dön');b.onclick=function(){yp.style.display='none';if(li)li.style.display='';};
 yp.appendChild(b);return yp}
function defter(){var yp=sayfa();if(!yp)return;var l=oku(K),i=0;
 yp.appendChild(el('h2','📕 Yanlışlar Defteri ('+l.length+')'));
 if(!l.length){yp.appendChild(el('p','Defter boş. Deneme çözünce yanlışların buraya eklenir.'));return}
 var kutu=el('div');yp.appendChild(kutu);
 function goster(){kutu.textContent='';
  if(i>=l.length){kutu.appendChild(el('p','Bitti! Defterde kalan: '+oku(K).length));return}
  var q=l[i],k=el('div',null,'kart');
  k.appendChild(el('small',q.t+' • '+(i+1)+'/'+l.length));
  k.appendChild(el('p',q.s));
  q.sec.forEach(function(o,j){var b=el('button',o);b.style.cssText='display:block;width:100%;text-align:left;margin:4px 0';
   b.onclick=function(){sonuc(k,q,j)};k.appendChild(b)});
  kutu.appendChild(k)}
 function sonuc(k,q,j){var ok=j===q.dogru;
  k.querySelectorAll('button').forEach(function(b){b.disabled=true});
  if(ok)yaz(K,oku(K).filter(function(x){return x.s!==q.s}));
  k.appendChild(el('p',ok?'✅ Doğru! Defterden çıkarıldı.':'❌ Doğru cevap: '+q.sec[q.dogru]));
  if(q.aciklama)k.appendChild(el('small',q.aciklama));
  var n=el('button','Sonraki →');n.onclick=function(){i++;goster()};k.appendChild(n)}
 goster()}
function gelisim(){var yp=sayfa();if(!yp)return;var h=oku('yks_gecmis'),g=h.slice(0,10).reverse();
 yp.appendChild(el('h2','📈 Gelişimim'));
 if(!g.length){yp.appendChild(el('p','Henüz deneme çözmedin.'));return}
 var mx=Math.max.apply(null,g.map(function(x){return x.net}).concat([1]));
 g.forEach(function(x){var r=el('div');r.style.margin='8px 0';
  r.appendChild(el('small',x.ders+': '+x.net+' net (D'+x.dogru+' Y'+x.yanlis+')'));
  var c=el('div');c.style.cssText='height:12px;border-radius:6px;background:#d4af37;width:'+Math.max(2,Math.round(Math.max(x.net,0)/mx*100))+'%';
  r.appendChild(c);yp.appendChild(r)});
 var o={};h.forEach(function(x){var a=o[x.ders]||(o[x.ders]={n:0,s:0});a.n++;a.s+=x.net});
 yp.appendChild(el('h3','Ders ortalamaları'));
 Object.keys(o).forEach(function(d){yp.appendChild(el('p',d+': '+(o[d].s/o[d].n).toFixed(2)+' net ('+o[d].n+' deneme)'))})}
function ekle(){var t=document.getElementById('testler');if(!t||document.getElementById('yksplusbar'))return;
 var d=el('div');d.id='yksplusbar';d.style.cssText='display:flex;gap:8px;margin:10px 0;flex-wrap:wrap';
 [['📕 Yanlışlar Defteri',defter],['📈 Gelişimim',gelisim]].forEach(function(a){var b=el('button',a[0]);b.onclick=a[1];d.appendChild(b)});
 t.parentNode.insertBefore(d,t)}
ekle();setTimeout(ekle,1500);
})();
