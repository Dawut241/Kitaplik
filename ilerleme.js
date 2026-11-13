(function(){
var K='kod_bitti';
function oku(){try{return JSON.parse(localStorage.getItem(K)||'[]')}catch(e){return[]}}
function yaz(v){try{localStorage.setItem(K,JSON.stringify(v))}catch(e){}}
function el(t,x){var e=document.createElement(t);if(x!=null)e.textContent=x;return e}
function kartlar(){return Array.prototype.slice.call(document.querySelectorAll('p[style*="pre-wrap"]')).map(function(p){return p.parentElement}).filter(function(k){return k&&k.querySelector('h3')})}
function ad(k){return k.querySelector('h3').textContent.replace('🔒 ','').trim()}
function kilit(k){return k.textContent.indexOf('Kod almak üçin')>=0}
function toast(t){var d=el('div',t);d.style.cssText='position:fixed;left:10px;right:10px;top:60px;background:#d4af37;color:#000;padding:12px;border-radius:8px;z-index:9999;text-align:center';document.body.appendChild(d);setTimeout(function(){d.remove()},3500)}
var ROZ={5:'🥉 Bürünç rozet: 5 bap tamamlandy!',15:'🥈 Kümüş rozet: 15 bap tamamlandy!',29:'🥇 Altyn rozet: ähli baplar tamamlandy!'};
function set(e,p,v){if(e[p]!==v)e[p]=v}
function sayi(ks){var b=oku();return ks.filter(function(k){return b.indexOf(ad(k))>=0}).length}
function upd(){
 var ks=kartlar(),n=sayi(ks),bar=document.getElementById('ilerlemebar');
 if(!bar)return;
 var y=ks.length?Math.round(n/ks.length*100):0;
 set(bar.querySelector('.it'),'textContent',n+'/'+ks.length+' bap, %'+y);
 set(bar.querySelector('.if').style,'width',y+'%');
 var son=parseInt(localStorage.getItem('kod_vip_son')||'0',10),g=Math.ceil((son-Date.now())/86400000);
 set(bar.querySelector('.iw'),'textContent',(g>0&&g<=3)?'⚠ VIP möhletiň '+g+' gün galdy. Täze kod: +993 62 09 87 42':'');
 set(bar.querySelector('.is').style,'display',n>=5?'':'none');
 ks.forEach(function(k){var b=k.querySelector('.bitbtn');if(b)set(b,'textContent',oku().indexOf(ad(k))>=0?'✅ Bitdi (yzyna al)':'☐ Bitirdim')});
}
function kur(ks){
 var d=el('div');d.id='ilerlemebar';d.style.cssText='border:1px solid #d4af37;border-radius:8px;padding:12px;margin-bottom:12px';
 var t=el('div');t.className='it';var w=el('div');w.className='iw';w.style.color='#e74c3c';
 var tr=el('div');tr.style.cssText='height:10px;background:rgba(128,128,128,.3);border-radius:5px;margin:8px 0';
 var f=el('div');f.className='if';f.style.cssText='height:10px;background:#d4af37;border-radius:5px;width:0';tr.appendChild(f);
 var r=el('div');r.style.cssText='display:flex;gap:8px;flex-wrap:wrap';
 var dv=el('button','▶ Dowam et');
 dv.onclick=function(){var b=oku(),k=kartlar().filter(function(x){return !kilit(x)&&b.indexOf(ad(x))<0})[0];if(k)k.scrollIntoView({behavior:'smooth'});else toast('Açyk baplar gutardy!')};
 var s=el('button','🎓 Sertifikat');s.className='is';s.style.display='none';s.onclick=sertifika;
 r.append(dv,s);d.append(t,w,tr,r);ks[0].parentElement.insertBefore(d,ks[0]);
}
function yenile(){
 var ks=kartlar();if(!ks.length)return;
 ks.forEach(function(k){
  if(kilit(k)||k.querySelector('.bitbtn'))return;
  var b=el('button','☐ Bitirdim');b.className='bitbtn';
  b.style.cssText='margin-top:8px;padding:6px 10px;border-radius:5px;border:1px solid #d4af37;background:none;color:inherit';
  b.onclick=function(){var l=oku(),a=ad(k),i=l.indexOf(a);
   if(i>=0)l.splice(i,1);else{l.push(a);var c=sayi(ks)+1;if(ROZ[c])toast(ROZ[c])}
   yaz(l);upd()};
  k.appendChild(b)});
 if(!document.getElementById('ilerlemebar'))kur(ks);
 upd();
}
function sertifika(){
 var n=prompt('Adyňyzy ýazyň:');if(!n)return;n=n.trim().slice(0,30);
 var c=document.createElement('canvas');c.width=1000;c.height=700;var g=c.getContext('2d');
 g.fillStyle='#0b0b0b';g.fillRect(0,0,1000,700);g.strokeStyle='#d4af37';g.lineWidth=6;g.strokeRect(25,25,950,650);
 g.textAlign='center';g.fillStyle='#d4af37';g.font='bold 54px serif';g.fillText('SERTIFIKAT',500,150);
 g.fillStyle='#fff';g.font='28px serif';g.fillText('Sertifikat berilýär:',500,240);
 g.fillStyle='#d4af37';g.font='bold 44px serif';g.fillText(n,500,330);
 g.fillStyle='#fff';g.font='28px serif';g.fillText('Programmirleme Akademiýasynda',500,410);
 g.fillText(sayi(kartlar())+' bap üstünlikli tamamlandy',500,455);
 g.fillStyle='#d4af37';g.font='22px serif';g.fillText(new Date().toLocaleDateString('tr-TR'),500,570);
 g.fillText('Online Kitaplyk',500,610);
 c.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='sertifikat.png';a.click()});
}
var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(yenile,150)}).observe(document.body,{childList:true,subtree:true});
setTimeout(yenile,800);
})();
