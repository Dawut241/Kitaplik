(function(){
var eski=ac;
ac=function(k){
eski(k);
var o=document.getElementById('kuranoku');
if(o)o.remove();
if(!k||!k.dosya||k.dosya.indexOf('the-koran-mushaf')<0)return;
var b=document.createElement('button');
b.id='kuranoku';
b.textContent='📖 Baştan sona oku (Fatiha → Nas)';
b.style.cssText='width:100%;padding:10px;font-size:16px;margin:0 0 12px;border-radius:8px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
b.onclick=function(){
b.textContent='Yükleniyor...';
fetch(k.dosya).then(function(r){return r.text();}).then(function(t){
var i=t.search(/^SURA\d*[\s-]+[IVXLC]+\b/m);
if(i<0){b.textContent='Sure başı bulunamadı';return;}
var m=document.getElementById('metin');
m.textContent=t.slice(i);
var s=document.getElementById('bolumsec');
if(s)s.remove();
b.textContent='Okunuyor: Fatiha → Nas';
window.scrollTo(0,0);
}).catch(function(){b.textContent='Yüklenemedi, tekrar dene';});
};
var h=document.getElementById('baslik');
if(h)h.insertAdjacentElement('afterend',b);
};
})();
