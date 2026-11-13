(function(){
var eski=ac;
var cache={};
ac=function(k){
eski(k);
var o=document.getElementById('kuransure');
if(o)o.remove();
if(!k||!k.dosya||k.dosya.indexOf('the-koran-mushaf')<0)return;
var s=document.createElement('select');
s.id='kuransure';
s.style.cssText='width:100%;padding:10px;font-size:16px;margin:0 0 12px;border-radius:8px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
var o0=document.createElement('option');
o0.value='';o0.textContent='Sure yükleniyor...';
s.appendChild(o0);
var h=document.getElementById('baslik');
if(h)h.insertAdjacentElement('afterend',s);
function doldur(parcalar){
s.textContent='';
var a=document.createElement('option');
a.value='';a.textContent='📜 Sure seç (114 sure)';
s.appendChild(a);
parcalar.forEach(function(p,i){
var op=document.createElement('option');
op.value=String(i);
var ad=p.split('\n')[0].trim().slice(0,45);
op.textContent=(i+1)+'. '+ad;
s.appendChild(op);
});
s.onchange=function(){
if(s.value==='')return;
var m=document.getElementById('metin');
m.textContent=parcalar[+s.value];
var bs=document.getElementById('bolumsec');
if(bs)bs.remove();
window.scrollTo(0,0);
};
}
function hazirla(t){
var re=/^SURA\d*[\s-]+[IVXLC]+\b/gm,idx=[],x;
while((x=re.exec(t))!==null)idx.push(x.index);
var p=idx.map(function(b,i){return t.slice(b,i+1<idx.length?idx[i+1]:t.length);});
cache[k.dosya]=p;
return p;
}
if(cache[k.dosya]){doldur(cache[k.dosya]);return;}
fetch(k.dosya).then(function(r){return r.text();}).then(function(t){
doldur(hazirla(t));
}).catch(function(){o0.textContent='Sureler yüklenemedi';});
};
})();
