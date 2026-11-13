(function(){
if(!('speechSynthesis' in window))return;
var eski=ac;
var K='',T='',p=0,son=0,calis=false,b=null,id=0;
var bol=null;
function metinAl(){
var m=document.getElementById('metin');
if(bol!==null&&m.children.length>bol){
var t='';
for(var i=bol;i<m.children.length;i++)t+=m.children[i].textContent+'\n';
return t;
}
return m.textContent;
}
document.addEventListener('change',function(ev){
var x=ev.target;
if(!x||x.id!=='bolumsec'||x.value==='')return;
bol=+x.value;
if(!b)return;
if(calis){id++;speechSynthesis.cancel();calis=false;b.onclick();}
else b.textContent='🔊 Sesli oku (seçtiğin bölümden)';
},true);
function temizle(x){
var a=x.search(/\*\*\* ?START OF[^\n]*\*\*\*/i);
if(a>=0){var n=x.indexOf('\n',a);x=x.slice(n>=0?n+1:a);}
var z=x.search(/\*\*\* ?END OF (THE|THIS) PROJECT GUTENBERG/i);
if(z>=0)x=x.slice(0,z);
return x;
}
function sonraki(){
if(p>=T.length)return null;
var e=Math.min(p+220,T.length);
if(e<T.length){
var m=T.slice(p,e);
var i=Math.max(m.lastIndexOf('. '),m.lastIndexOf('? '),m.lastIndexOf('! '),m.lastIndexOf('\n'));
if(i>60)e=p+i+1;
}
son=p;
var s=T.slice(p,e);
p=e;
return s;
}
function oku(my){
if(!calis||my!==id)return;
var s=sonraki();
if(s===null){calis=false;p=0;son=0;b.textContent='🔊 Sesli oku (baştan)';return;}
var u=new SpeechSynthesisUtterance(s.replace(/\s+/g,' '));
u.lang='en-US';
u.onend=function(){oku(my);};
u.onerror=function(){if(my===id){calis=false;p=son;b.textContent='▶ Devam';}};
speechSynthesis.speak(u);
}
ac=function(k){
eski(k);
id++;calis=false;K='';T='';p=0;son=0;bol=null;
speechSynthesis.cancel();
var o=document.getElementById('seslioku');
if(o)o.remove();
if(!k)return;
b=document.createElement('button');
b.id='seslioku';
b.textContent='🔊 Sesli oku';
b.style.cssText='width:100%;padding:10px;font-size:16px;margin:0 0 12px;border-radius:8px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
b.onclick=function(){
if(!calis){
var cur=metinAl();
if(cur!==K){K=cur;T=temizle(cur);p=0;son=0;}
if(!T.trim()){b.textContent='Metin henüz yüklenmedi';return;}
calis=true;id++;
b.textContent='⏸ Durdur';
oku(id);
}else{
calis=false;id++;
speechSynthesis.cancel();
p=son;
b.textContent='▶ Devam';
}
};
var h=document.getElementById('baslik');
if(h)h.insertAdjacentElement('afterend',b);
};
window.addEventListener('pagehide',function(){speechSynthesis.cancel();});
})();
