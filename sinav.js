(function(){
function el(t,x){var e=document.createElement(t);if(x!=null)e.textContent=x;return e}
function kartlar(){return Array.prototype.slice.call(document.querySelectorAll('p[style*="pre-wrap"]')).map(function(p){return p.parentElement}).filter(function(k){return k&&k.querySelector('h3')})}
function bul(k){var a=k.querySelector('h3').textContent.replace('🔒 ','').trim();
 return (window.kodDersler||[]).filter(function(d){return d.baslik.trim()===a})[0]}
function ac(k,d){
 var kap=el('div');kap.className='sinavkutu';
 var sonuc=el('div');sonuc.style.cssText='font-weight:bold;margin-top:8px';
 var bit=0,dog=0;
 d.sinav.forEach(function(q,qi){
  var b=el('div');b.style.cssText='margin:10px 0;padding:8px;border:1px solid rgba(128,128,128,.4);border-radius:6px';
  b.appendChild(el('div',(qi+1)+') '+q.s));
  q.o.map(function(_,i){return i}).sort(function(){return Math.random()-.5}).forEach(function(oi){var o=q.o[oi];
   var t=el('button',o);t.dataset.i=oi;t.style.cssText='display:block;width:100%;text-align:left;margin:4px 0;padding:8px';
   t.onclick=function(){
    var bs=b.querySelectorAll('button');
    Array.prototype.forEach.call(bs,function(x){x.disabled=true});
    bit++;
    if(oi===q.d){dog++;t.textContent='✅ '+o}else{t.textContent='❌ '+o;Array.prototype.forEach.call(bs,function(x){if(+x.dataset.i===q.d)x.textContent='✅ '+q.o[q.d]})}
    if(bit===d.sinav.length)sonuc.textContent='Netije: '+dog+'/'+bit+(dog===bit?' 🎉 Ajaýyp!':' — bapy ýene bir gezek oka')};
   b.appendChild(t)});
  kap.appendChild(b)});
 kap.appendChild(sonuc);k.appendChild(kap)}
function yenile(){kartlar().forEach(function(k){
 if(k.querySelector('.sinavbtn'))return;
 var d=bul(k);if(!d||!d.sinav||!d.sinav.length)return;
 var b=el('button','📝 Mini synag');b.className='sinavbtn';
 b.style.cssText='margin:8px 0 0 8px;padding:6px 10px;border-radius:5px;border:1px solid #d4af37;background:none;color:inherit';
 b.onclick=function(){var o=k.querySelector('.sinavkutu');if(o)o.remove();else ac(k,d)};
 k.appendChild(b)})}
var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(yenile,150)}).observe(document.body,{childList:true,subtree:true});
setTimeout(yenile,900);
})();
