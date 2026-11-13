(function(){
var eski=ac;
var KAYIT=[
{ara:['machiavelli','makyavel'],ad:'Niccolò Machiavelli (1469–1527)',m:'İtalyan diplomat ve düşünür. Floransa doğumlu. Devlet görevinden alınınca Prens kitabını yazdı.'},
{ara:['nietzsche'],ad:'Friedrich Nietzsche (1844–1900)',m:'Alman filozof. Zarathustra, Ahlakın Soykütüğü ve İyinin ve Kötünün Ötesinde başlıca eserleridir.'},
{ara:['dostoy'],ad:'Fyodor Dostoyevski (1821–1881)',m:'Rus yazar. Moskova’da doğdu, Petersburg’da öldü. 1849’da tutuklandı, idama mahkûm edildi; ceza son anda değiştirildi ve Sibirya’ya sürüldü. Başlıca romanları: Suç ve Ceza, Budala, Ecinniler, Karamazov Kardeşler.'},
{ara:['tolstoy','tolstoi'],ad:'Lev Tolstoy (1828–1910)',m:'Rus yazar. Yasnaya Polyana’da doğdu. Başlıca romanları: Savaş ve Barış, Anna Karenina. Hayatının ilerleyen yıllarında ahlak ve din üzerine yazdı, sade bir yaşamı savundu. 1910’da Astapovo’da öldü.'},
{ara:['chekhov','cehov','çehov'],ad:'Anton Çehov (1860–1904)',m:'Rus yazar. Taganrog’da doğdu, doktor olarak da çalıştı. Kısa öyküleri ve oyunlarıyla tanınır: Martı, Vanya Dayı, Üç Kız Kardeş, Vişne Bahçesi. Tüberkülozdan öldü.'},
{ara:['gogol'],ad:'Nikolay Gogol (1809–1852)',m:'Rus edebiyatının önemli yazarlarından. Ukrayna’da doğdu. Müfettiş adlı oyunu ve Ölü Canlar romanıyla tanınır. Palto öyküsü de ünlüdür. Moskova’da öldü.'},
{ara:['turgen'],ad:'İvan Turgenyev (1818–1883)',m:'Rus yazar. Orel bölgesinde doğdu, hayatının önemli bir kısmını yurt dışında geçirdi. Başlıca eserleri: Babalar ve Oğullar, Bir Avcının Anıları, Rudin. Fransa’da öldü.'},
{ara:['kutsal'],ad:'Kur’an hakkında kısa bilgi',m:'114 sure vardır. İlk sure Fatiha, son sure Nas’tır. Buradaki çeviri J. M. Rodwell’e aittir ve İngilizcedir. Sureler bu sitede mushaf sırasına (Fatiha → Nas) dizildi. Arapça metin ve Türkçe meal yoktur.'}
];
ac=function(k){
eski(k);
var o=document.getElementById('yazarkutu');
if(o)o.remove();
if(!k||!k.yazar)return;
var y=String(k.yazar).toLowerCase();
var b=null;
KAYIT.forEach(function(r){r.ara.forEach(function(a){if(!b&&y.indexOf(a)>=0)b=r;});});
if(!b)return;
var d=document.createElement('details');
d.id='yazarkutu';
d.style.cssText='margin:0 0 12px;padding:10px 12px;border-radius:8px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
var s=document.createElement('summary');
s.textContent='ℹ️ '+b.ad;
s.style.cssText='cursor:pointer;font-size:16px';
var p=document.createElement('p');
p.textContent=b.m;
p.style.cssText='margin:8px 0 0;font-size:15px;line-height:1.5';
d.appendChild(s);
d.appendChild(p);
var h=document.getElementById('baslik');
if(h)h.insertAdjacentElement('afterend',d);
};
})();
