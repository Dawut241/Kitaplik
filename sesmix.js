(function(){
var ctx=null,calis=false,zaman=null,G={};
var OLCEK={yagmur:0.25,somine:0.9,derin:0.8};
var AD=[['yagmur','🌧 Yağmur',50],['somine','🔥 Şömine',0],['derin','🌊 Derin ses',0]];
function tampon(tip){
var n=ctx.sampleRate*4,b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0),son=0;
for(var i=0;i<n;i++){
var w=Math.random()*2-1;
if(tip==='kahve'){son=(son+0.02*w)/1.02;d[i]=son*3.5;}else d[i]=w;
}
return b;
}
function kaynak(tip,filtreler,hedef){
var s=ctx.createBufferSource();
s.buffer=tampon(tip);s.loop=true;
var son=s;
filtreler.forEach(function(f){
var n=ctx.createBiquadFilter();
n.type=f[0];n.frequency.value=f[1];
son.connect(n);son=n;
});
son.connect(hedef);
s.start();
}
function catirti(){
if(!ctx)return;
if(calis&&G.somine.gain.value>0.01){
var len=Math.floor(ctx.sampleRate*0.03);
var b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0);
for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);
var s=ctx.createBufferSource();s.buffer=b;
var f=ctx.createBiquadFilter();f.type='highpass';f.frequency.value=1500;
var g=ctx.createGain();g.gain.value=0.3+Math.random()*0.7;
s.connect(f);f.connect(g);g.connect(G.somine);
s.start();
}
setTimeout(catirti,60+Math.random()*500);
}
function kur(){
var AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return false;
ctx=new AC();
AD.forEach(function(a){
var g=ctx.createGain();g.gain.value=0;g.connect(ctx.destination);G[a[0]]=g;
});
kaynak('beyaz',[['highpass',900],['lowpass',7000]],G.yagmur);
var ru=ctx.createGain();ru.gain.value=0.6;ru.connect(G.somine);
kaynak('kahve',[['lowpass',500]],ru);
kaynak('kahve',[['lowpass',400]],G.derin);
catirti();
return true;
}
function uygula(ad,v){if(G[ad])G[ad].gain.value=v/100*OLCEK[ad];}
var btn=document.createElement('button');
btn.id='sesmix';
btn.textContent='🎧';
btn.style.cssText='position:fixed;left:14px;bottom:20px;z-index:9999;width:48px;height:48px;border-radius:50%;font-size:22px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);box-shadow:0 2px 10px var(--golge)';
var p=document.createElement('div');
p.style.cssText='display:none;position:fixed;left:14px;bottom:78px;z-index:9999;width:min(86vw,300px);padding:14px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);box-shadow:0 2px 10px var(--golge);font-size:16px';
var bas=document.createElement('div');
bas.textContent='🎧 Arka plan sesi';
bas.style.cssText='font-weight:bold;margin:0 0 10px';
p.appendChild(bas);
var sl=[];
AD.forEach(function(a){
var t=document.createElement('div');
t.textContent=a[1];t.style.cssText='margin:8px 0 2px;font-size:15px';
var r=document.createElement('input');
r.type='range';r.min='0';r.max='100';r.value=String(a[2]);
r.style.cssText='width:100%';
r.oninput=function(){uygula(a[0],+r.value);};
sl.push(r);
p.appendChild(t);p.appendChild(r);
});
var sure=document.createElement('select');
sure.style.cssText='width:100%;margin:12px 0 8px;padding:8px;font-size:15px;border-radius:8px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
[['0','Süre: kendim durdururum'],['15','15 dakika sonra dur'],['30','30 dakika sonra dur'],['60','60 dakika sonra dur']].forEach(function(o){
var op=document.createElement('option');op.value=o[0];op.textContent=o[1];sure.appendChild(op);
});
p.appendChild(sure);
var ana=document.createElement('button');
ana.textContent='▶ Başlat';
ana.style.cssText='width:100%;padding:10px;font-size:16px;border-radius:8px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
p.appendChild(ana);
var dr=document.createElement('div');
dr.style.cssText='margin-top:8px;font-size:13px;color:var(--soluk)';
p.appendChild(dr);
function durdur(){
calis=false;
if(ctx)ctx.suspend();
clearTimeout(zaman);
ana.textContent='▶ Başlat';
btn.textContent='🎧';
}
ana.onclick=function(){
if(calis){durdur();return;}
if(!ctx&&!kur()){dr.textContent='Bu tarayıcı sesi desteklemiyor.';return;}
ctx.resume();
calis=true;
AD.forEach(function(a,i){uygula(a[0],+sl[i].value);});
clearTimeout(zaman);
var dk=+sure.value;
if(dk>0)zaman=setTimeout(durdur,dk*60000);
ana.textContent='⏸ Durdur';
btn.textContent='🎧▶';
dr.textContent='Ses seviyesini telefondan da ayarlayabilirsin.';
};
btn.onclick=function(){p.style.display=p.style.display==='none'?'block':'none';};
document.body.appendChild(p);
document.body.appendChild(btn);
})();
