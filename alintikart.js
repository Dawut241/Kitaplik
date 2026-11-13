(function(){
var eski=ac,cur=null,sec='',hideT=null;
var F='"Noto Serif",Georgia,serif';
var b=document.createElement('button');
b.id='alintikart';
b.textContent='🖼 Kart yap';
b.style.cssText='display:none;position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:9999;padding:12px 20px;font-size:16px;border-radius:24px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);box-shadow:0 2px 10px var(--golge)';
document.body.appendChild(b);
ac=function(k){eski(k);cur=k;};
document.addEventListener('selectionchange',function(){
var s=window.getSelection();
var t=s?s.toString().replace(/\s+/g,' ').trim():'';
var m=document.getElementById('metin');
var ok=t.length>=10&&s.rangeCount>0&&m&&m.contains(s.getRangeAt(0).commonAncestorContainer);
if(ok){clearTimeout(hideT);sec=t;b.style.display='block';}
else{clearTimeout(hideT);hideT=setTimeout(function(){b.style.display='none';},700);}
});
b.addEventListener('pointerdown',function(){clearTimeout(hideT);});
function sar(x,t,w){
var k=t.split(' '),l=[],s='';
k.forEach(function(w2){
var d=s?s+' '+w2:w2;
if(x.measureText(d).width>w&&s){l.push(s);s=w2;}else s=d;
});
if(s)l.push(s);
return l;
}
function sigdir(x,t,boyut,w,stil){
while(boyut>20){
x.font=stil+boyut+'px '+F;
if(x.measureText(t).width<=w)return;
boyut-=2;
}
}
function kart(t){
var W=1080,H=1350,c=document.createElement('canvas');
c.width=W;c.height=H;
var x=c.getContext('2d');
x.fillStyle='#000';x.fillRect(0,0,W,H);
x.textAlign='left';x.textBaseline='alphabetic';
x.fillStyle='#d4af5a';x.font='bold 200px '+F;
x.fillText('“',80,300);
var bw=W-200,top=330,bh=600,size=56,lines=[],lh=80;
for(;size>=28;size-=2){
x.font='italic '+size+'px '+F;
lines=sar(x,t,bw);
lh=Math.round(size*1.45);
if(lines.length*lh<=bh)break;
}
var off=Math.max(0,(bh-lines.length*lh)/2);
x.fillStyle='#f0ece4';
lines.forEach(function(l,i){x.fillText(l,100,top+off+size+i*lh);});
x.fillStyle='#d4af5a';
x.fillRect(100,1040,120,4);
var ya=(cur&&cur.yazar&&cur.yazar!=='Kutsal metin')?cur.yazar:'';
var ba=cur&&cur.baslik?cur.baslik:'';
var y=1110;
if(ya){sigdir(x,'— '+ya,42,bw,'bold ');x.fillStyle='#d4af5a';x.fillText('— '+ya,100,y);y+=56;}
if(ba){sigdir(x,ba,36,bw,'italic ');x.fillStyle='#a0a0a0';x.fillText(ba,100,y);}
x.textAlign='center';
x.fillStyle='#777';x.font='32px '+F;
x.fillText('gorayda.github.io/Kitaplik',W/2,1290);
c.toBlob(function(bl){
if(!bl)return;
var f=null;
try{f=new File([bl],'kitaplik-alinti.png',{type:'image/png'});}catch(e){}
if(f&&navigator.canShare&&navigator.canShare({files:[f]})){
navigator.share({files:[f]}).catch(function(){});
}else{
var a=document.createElement('a');
a.href=URL.createObjectURL(bl);
a.download='kitaplik-alinti.png';
document.body.appendChild(a);a.click();a.remove();
}
},'image/png');
}
b.onclick=function(){
if(sec.length>400){
b.textContent='En fazla 400 karakter seç';
setTimeout(function(){b.textContent='🖼 Kart yap';},2000);
return;
}
kart(sec);
};
})();
