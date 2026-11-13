(function(){
var KESIN=['hep','hiç','hiçbir','asla','kesinlikle','sürekli','daima','her zaman','hiçbir zaman','herkes','kimse'];
var KISA=['tamam','peki','neyse','olur','ok','okey','hmm','hm','tmm'];
var MANIP=["abartıyorsun","sen yanlış anladın","hep senin yüzünden","kafanda kuruyorsun","çok hassassın","deli misin","saçmalama","ben öyle bir şey demedim"];
var LAVBOMB=["sensiz yaşayamam","hayatımın anlamısın","ilk günden aşık oldum","kimse seni benim gibi sevemez","ruh ikizimsin","her saniye aklımdasın"];
var SANTAJ=["değer vermiyorsun","bencilsin","hep kendini düşünüyorsun","ben olmasam","yazıklar olsun","bunu bana nasıl yaparsın","senin için neler yaptım"];
var TEHDIT=['öldür','vuracağım','seni bulurum','seni bitiririm','intihar','ölmek istiyorum'];
var STIL='border:1px solid var(--soluk);background:var(--kart);color:var(--yazi)';
var btn=document.createElement('button');
btn.id='mesajton';
btn.textContent='💬';
btn.style.cssText='position:fixed;left:72px;bottom:20px;z-index:9999;width:48px;height:48px;border-radius:50%;font-size:22px;box-shadow:0 2px 10px var(--golge);'+STIL;
var p=document.createElement('div');
p.style.cssText='display:none;position:fixed;left:14px;bottom:78px;z-index:9999;width:min(92vw,340px);max-height:70vh;overflow:auto;padding:14px;border-radius:12px;box-shadow:0 2px 10px var(--golge);font-size:16px;'+STIL;
function ekle(ust,tag,metin,css){
var e=document.createElement(tag);
e.textContent=metin;
if(css)e.style.cssText=css;
ust.appendChild(e);
return e;
}
ekle(p,'div','💬 Mesaj Tonu Rehberi','font-weight:bold;margin:0 0 6px');
ekle(p,'div','Mesajı yapıştır. Araç sadece yazının biçimine bakar, kişinin ne düşündüğünü bilemez. Mesaj telefondan çıkmaz.','font-size:13px;color:var(--soluk);margin:0 0 8px');
var ta=document.createElement('textarea');
ta.rows=5;
ta.placeholder='Mesajı buraya yapıştır';
ta.style.cssText='width:100%;box-sizing:border-box;padding:8px;font-size:16px;border-radius:8px;'+STIL;
p.appendChild(ta);
var tonSec=document.createElement('select');
tonSec.style.cssText='width:100%;margin:8px 0 0;padding:8px;font-size:15px;border-radius:8px;'+STIL;
[['s','Cevap tarzı: Samimi'],['r','Cevap tarzı: Resmî / profesyonel']].forEach(function(o){var op=document.createElement('option');op.value=o[0];op.textContent=o[1];tonSec.appendChild(op);});
p.appendChild(tonSec);
var git=ekle(p,'button','Bak','width:100%;margin:8px 0;padding:10px;font-size:16px;border-radius:8px;'+STIL);
var sonuc=document.createElement('div');
sonuc.style.cssText='font-size:15px;line-height:1.5';
p.appendChild(sonuc);
function satir(m,renk){
ekle(sonuc,'div','• '+m,'margin:6px 0'+(renk?';color:'+renk:''));
}
git.onclick=function(){
sonuc.textContent='';
var ham=ta.value.trim();
if(ham.length<3){satir('Önce bir mesaj yapıştır.');return;}
var tr=ham.toLocaleLowerCase('tr');
var kel=tr.split(/[^a-zçğıöşüâîû0-9]+/).filter(Boolean);
var pad=' '+kel.join(' ')+' ';
ekle(sonuc,'div','Yazıda görülenler:','font-weight:bold;margin:4px 0');
var n=0;
satir('Uzunluk: '+kel.length+' kelime.');n++;
if(kel.length<=2&&KISA.indexOf(kel[0])>=0)satir('Çok kısa bir cevap. Soğuk, meşgul ya da düz olabilir, yazıdan hangisi olduğu anlaşılmaz.');
var soru=(ham.match(/\?/g)||[]).length;
var unlem=(ham.match(/!/g)||[]).length;
if(soru>=3)satir('Çok soru işareti var ('+soru+').');
if(unlem>=3)satir('Çok ünlem var ('+unlem+').');
var buyuk=ham.split(/\s+/).filter(function(w){
w=w.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g,'');
return w.length>=3&&w===w.toLocaleUpperCase('tr')&&w!==w.toLocaleLowerCase('tr');
}).length;
if(buyuk>=2)satir('Büyük harfle yazılmış '+buyuk+' kelime var. Bu çoğu zaman vurgu ya da yükselen ses olarak okunur.');
var bulunan=KESIN.filter(function(k){return pad.indexOf(' '+k+' ')>=0;});
if(bulunan.length)satir('Kesin ifadeler var: '+bulunan.join(', ')+'. Bunlar genelde "her zaman / hiçbir zaman" gibi geniş genellemelerdir.');
var sen=kel.filter(function(w){return w==='sen'||w==='senin'||w==='sana'||w==='seni';}).length;
if(sen>=3)satir('"Sen" hitabı '+sen+' kez geçiyor.');
if(ham.indexOf('...')>=0)satir('Üç nokta var. Bu bazen duraksama, bazen kırgınlık anlamına gelir, yazıdan hangisi olduğu anlaşılmaz.');
var tehdit=TEHDIT.some(function(k){return tr.indexOf(k)>=0;});
if(MANIP.some(function(k){return tr.indexOf(k)>=0;}))satir("Dikkat (Gaslighting / Manipülasyon izi): Karşı taraf duygularını küçümsüyor veya suçu sana atıyor olabilir. Kendinden şüphe etme, net sınır koy.","#d97706");
if(LAVBOMB.some(function(k){return tr.indexOf(k)>=0;}))satir("Dikkat (Love Bombing / Aşırı İlgi): Çok hızlı ve yoğun romantik ifadeler var. İlişki yeniyse ayaklarını yere sağlam bas, zamanla tutarlılığını gözlemle.","#db2777");
if(SANTAJ.some(function(k){return tr.indexOf(k)>=0;}))satir("Dikkat (Duygusal Şantaj / Suçluluk Yükleme): Karşı taraf seni suçlu hissettirerek istediğini yaptırmaya çalışıyor olabilir. Sınırlarını koru.","#b45309");
if(tehdit)satir('Mesajda tehdit ya da kendine zarar vermekle ilgili bir ifade olabilir. Bunu hafife alma: güvendiğin biriyle konuş, mesajın ekran görüntüsünü sakla. Acil bir tehlike varsa yerel acil numarayı ara.','#e0a060');
var OLUMLU=['seviyorum','teşekkür','sağ ol','sağol','özledim','tebrik','günaydın','iyi geceler','iyi ki','hoş geldin','canım'];
var ol=OLUMLU.filter(function(k){return tr.indexOf(k)>=0;});
if(ol.length)satir('Sıcak ifadeler var: '+ol.join(', ')+'.');
else if(sonuc.children.length<=2)satir('Dikkat çeken bir biçim özelliği yok, yazı sade ve düz.');
if(!tehdit){
var oner=[];
var rs=(tonSec.value==='r');
var KAT=[
[["eski sevgili","nasılsın","aklıma geldin","rüyamda gördüm","uzun zaman oldu","özledim seni","barışalım"],["Dikkat: Genelde yalnız kaldıklarında veya egolarını yoklamak için yazarlar. Hemen kapıları ardına kadar açma.","Mesafeli, kibar ama net ol; geçmişteki sorunların çözülüp çözülmediğini tart."],["Teşekkürler, iyiyim. Umarım senin de her şey yolundadır.","Selam, hayatımda her şey yolunda. Senin adına da iyi dileklerimi iletirim."],["Teşekkür ederim, iyiyim. Size de iyi günler dilerim.","Nazik mesajınız için sağ olun, her şeyin gönlünüzce olmasını dilerim."]],
[["günler sonra","nerelerdeydin","unutuldum","hayalet","ghost","kayboldun","yoktun"],["Ghosting (birden kaybolup geri dönme) yapan kişiye sitem etme. Yokluğunu fark etmemiş gibi rahat ve özgüvenli davran.","İkinci şansı vermeden önce tutarlılığını mutlaka test et."],["Yoğun bir dönemdi, kendi işlerime odaklandım. Sende neler var?","Selam, keyfim yerinde, hayat akıp gidiyor. Sen nasılsın?"],["Merhaba, yoğun bir süreçten geçiyordum. Umarım siz de iyisinizdir.","Selamlar, işlerim sebebiyle dönüş yapamadım. İyi çalışmalar dilerim."]],
[["belki","bakarız","nasip","ileriye dönük","isim koymayalım","akışına bırakalım","hazır değilim"],["Breadcrumbing (umut kırıntısı) uyarısı: Seni cepte tutup sorumluluk almaktan kaçıyor olabilir. Net sınırlarını koru.","Belirsizliğe razı olma; ne istediğini bilen bir duruş sergile."],["Ben belirsizliklerden pek hoşlanmıyorum, herkesin kendi yoluna bakması en sağlıklısı.","Anlıyorum, ben daha net ve ne istediğini bilen bir iletişim tercih ediyorum."],["Net bir planlama yapamadığımız için süreci bu noktada bırakmak en doğrusu olacaktır.","Görüşleriniz için teşekkürler, benim beklentim daha net bir iletişim yönünde."]],
[["buluşma","eve geçtim","güzel gündü","teşekkür ederim bugün için","çok eğlendim","tekrar görüşelim"],["İlk buluşma sonrası mesaj: Sıcak ama yapışkan olmayan, pozitif bir izlenim bırak.","Bir sonraki buluşma için açık kapı bırak ama hemen takvim dayatma."],["Benim için de çok keyifli bir gündü, enerjin harikaydı. Dinlen bakalım, sonra konuşuruz.","Çok güzel vakit geçirdim, teşekkürler. Haftaya uygun bir günde tekrar kahve içeriz."],["Bugünkü nazik sohbetiniz ve vaktiniz için teşekkür ederim, tekrar görüşmek dileğiyle.","Keyifli buluşma için teşekkürler, uygun bir zamanda yeniden görüşebiliriz."]],

[["görüldü","neden yazmadın","geç yazdın","aktifsin","çevrimiçi","müsait değil miydin","cevap vermedin"],["Soğukkanlı kal, hesap sorma. Kısa ve rahat bir cevap ver.","Görüldü atılınca üst üste mesaj atma; kendi hayatına odaklandığını göster."],["Selam, yoğun bir gündü yeni bakabildim. Sende durumlar nasıl?","Sorun değil, müsait olduğunda konuşuruz."],["Mesajınızı yeni görebildim, yoğunluktan dolayı gecikme için kusura bakmayın.","Müsait olduğunuz bir zaman diliminde dönüş yapabilirsiniz."]],
[["soğuk","trip","küstün mü","bir şey mi oldu","neyin var","moralin bozuk","garip davranıyorsun"],["Savunmaya geçme veya ısrarla üsteleme; alan tanı ama kapıyı açık bırak.","Karşı taraf konuşmak istemiyorsa zorlama, sakinleşmesini bekle."],["Biraz durgun gibisin, anlatmak istersen buradayım. İstemezsen de sorun değil, ne zaman hazır hissedersen.","Her şey yolunda mı? Kafana takılan bir şey varsa dinlerim."],["Bir yanlış anlaşılma varsa konuşarak netleştirebiliriz.","Kendinizi hazır hissettiğinizde konuyu değerlendirebiliriz."]],
[["kıskan","kim o","neden beğendin","neredesin","kiminlesin","güvenmiyorum","şüphe"],["Öfkeyle tepki verme; net, sakin ve güven veren kısa bir açıklama yap.","Sürekli kendini savunmak yerine sınırlarını ve dürüstlüğünü koru."],["İçin rahat olsun, gizli saklı bir durum yok. İstersen sakince konuşalım.","Kafanda soru işareti kalmasını istemem, durum tam olarak şöyle..."],["Bu konuda herhangi bir gizlilik söz konusu değil, durumu netleştirebiliriz.","Yanlış anlaşılmayı gidermek adına durumu açıklamak isterim."]],
[["ara verelim","kafam karışık","bilmiyorum","olmuyor","yoruldum","uzaklaş","bitirelim"],["Yalvarma veya ikna etmeye çalışma. Kararına saygı duyduğunu gösterip geri çekil.","Bu tür mesajlara uzun paragraflarla cevap vermek yerine kısa ve net bir duruş sergile."],["Anlıyorum, kendi alanına ve düşünmeye ihtiyacın varsa saygı duyarım. Kendine iyi bak.","Zorlamaya gerek yok, senin için en iyisi neyse o olsun."],["Kararınıza saygı duyuyorum, her şeyin gönlünüzce olmasını dilerim.","Düşüncelerinize saygı duyuyor, süreci bu şekilde sonlandırmayı kabul ediyorum."]],
[["aşk","hoşlan","flört","tanışalım","kahve içelim","etkilendim","tatlısın","yakışıklısın","güzelsin"],["Fazla heyecanlanıp hemen tüm kartlarını açma; sıcak, özgüvenli ve merak uyandırıcı ol.","İltifatı kabul et ve topu hafif bir espriyle geri at."],["Teşekkür ederim, bunu duymak güzel. Bakalım ortak noktalarımız neler çıkacak?","Güzel düşüncen için sağ ol, uygun bir vakitte kahve eşliğinde sohbet edebiliriz."],["Nazik sözleriniz için teşekkür ederim, memnuniyetle görüşebiliriz.","İlginiz için teşekkürler, uygun bir zamanda tanışmaktan memnuniyet duyarım."]],

[['merhaba','selam','günaydın','nasılsın','naber','ne haber'],['Selam, iyiyim, sen nasılsın?','Merhaba, ben iyiyim, teşekkür ederim. Sende neler var?'],['Merhaba, teşekkür ederim, iyiyim. Siz nasılsınız?','İyi günler, size nasıl yardımcı olabilirim?']],
[['teşekkür','sağ ol','sağol','eyvallah'],['Rica ederim, ne demek.','Ne demek, her zaman.'],['Rica ederim, yardımcı olabildiysem ne mutlu.']],
[['özür','pardon','affet','kusura bakma','üzgünüm'],['Sorun değil, olur böyle şeyler.','Özür dilemen güzel, bunu birlikte konuşabiliriz.'],['Özür dilemeniz için teşekkür ederim, konuyu konuşarak çözebiliriz.']],
[['rica','yardım','yapabilir misin','müsait misin','olur mu','bakar mısın','gönderir misin'],['Tabii, ne zamana kadar lazım?','Olur, bir bakayım ve sana haber vereyim.'],['Elbette, hangi tarihe kadar gerekli olduğunu öğrenebilir miyim?','Talebinizi aldım, en kısa sürede dönüş yapacağım.']],
[['buluş','gelir misin','hafta sonu','toplantı','görüşelim','kahve','yemek','programın'],['Olur, saat kaçta ve nerede buluşalım?','Güzel fikir, biraz bakıp sana kesin cevap vereyim.'],['Teşekkür ederim, uygun olduğum saati kontrol edip size dönüş yapacağım.','Gün ve saat konusunda size hangi seçenek uygun?']],
[['kırıl','neden böyle','bıktım','yeter artık','sinir','olmaz böyle'],['Seni kırdıysam üzgünüm, ne olduğunu anlatır mısın?','Seni dinliyorum, neye en çok bozulduğunu yazar mısın?'],['Yaşadığınız rahatsızlık için üzgünüm, konuyu birlikte çözebiliriz.','Şikayetinizi dinlemek isterim, ayrıntıyı paylaşır mısınız?']],
[['üzgün','kötü hissed','canım sıkkın','yalnız','moralim','ağla','mutsuz','stres'],['Bunu duyduğuma üzüldüm, anlatmak istersen buradayım.','İstersen konuşalım, seni dinlerim.'],['Bunu duyduğuma üzüldüm, size nasıl destek olabilirim?']],
[['tebrik','mutlu yıllar','doğum günü','kutlar','hayırlı olsun','geçmiş olsun'],['Çok teşekkür ederim, çok sevindim.','Teşekkürler, düşündüğün için sağ ol.'],['Nazik sözleriniz için teşekkür ederim.']],
[['seviyorum','aşkım','sevgilim'],['Bunu duymak çok güzel, ben de seni seviyorum.','Teşekkür ederim, ben de seni çok seviyorum.'],['Bu güzel sözleriniz için teşekkür ederim.']],
[['özledim'],['Ben de seni özledim, ne zaman görüşebiliriz?','Ben de özledim, yakında görüşelim.'],['Teşekkür ederim, ben de sizi görmeyi isterim.']],
[['görüşürüz','iyi geceler','hoşça kal'],['Görüşürüz, kendine iyi bak.','İyi geceler, tatlı rüyalar.'],['İyi günler dilerim, görüşmek üzere.','İyi akşamlar dilerim.']],
[['sayın','iyi çalışmalar','saygılarımla','teklif','fiyat','sipariş','fatura','rezervasyon','müsaitlik'],['Mesajın için teşekkürler, detayları kontrol edip dönüyorum.','Bakıp sana net bilgiyle yazacağım.'],['Mesajınız için teşekkür ederim, bilgileri kontrol edip en kısa sürede dönüş yapacağım.','Talebiniz alınmıştır, size en kısa sürede bilgi vereceğim.']]
];
KAT.forEach(function(k){
if(oner.length>=4)return;
if(!k[0].some(function(w){return tr.indexOf(w)>=0;}))return;
var l=rs?k[2]:k[1];
l.slice(0,2).forEach(function(m){if(oner.length<4&&oner.indexOf(m)<0)oner.push(m);});
});
if(kel.length<=2&&KISA.indexOf(kel[0])>=0)oner.push(rs?'Her şey yolunda mı? Dilerseniz konuşabiliriz.':'Her şey yolunda mı? Konuşmak istersen buradayım.');
if(buyuk>=2||unlem>=3)oner.push(rs?'Rahatsız olduğunuzu anlıyorum, sakin bir şekilde konuşmak isterim.':'Sinirli olduğunu fark ettim. İkimiz de biraz sakinleşince konuşalım mı?');
if(bulunan.length||sen>=3)oner.push(rs?'Bu konuda neyi kastettiğinizi anlatabilir misiniz?':'Bunu böyle hissettiğini duydum. Hangi olayı kastettiğini anlatır mısın?');
if(soru>=3)oner.push(rs?'Birkaç sorunuz var, sırayla cevaplayacağım.':'Birkaç sorun var, sırayla cevaplayayım.');
if(!oner.length){
if(soru>=1){
oner.push(rs?'Sorunuz için teşekkür ederim, kontrol edip net bilgiyle döneceğim.':'Güzel soru, düşünüp sana net cevap vereyim.');
oner.push(rs?'Bu konuda size en kısa sürede bilgi vereceğim.':'Şu an emin değilim, kontrol edip yazacağım.');
}else{
oner.push(rs?'Mesajınızı aldım, konuyu biraz daha açabilir misiniz?':'Mesajını aldım. Biraz daha açar mısın, ne demek istediğini anlamak istiyorum.');
oner.push(rs?'Mesajınız için teşekkür ederim, en kısa sürede dönüş yapacağım.':'Mesajın için sağ ol, düşünüp sana döneceğim.');
}
}
oner=oner.slice(0,5);
ekle(sonuc,'div','Şöyle cevap verebilirsin:','font-weight:bold;margin:10px 0 4px');
ekle(sonuc,'div','Hazır örnekler. Kendi cümlene uydur, karşı tarafın niyetini bilemem.','font-size:13px;color:var(--soluk);margin:0 0 6px');
oner.forEach(function(m){
var k=ekle(sonuc,'div','','margin:6px 0;padding:10px;border-radius:8px;'+STIL);
ekle(k,'div',m,'margin:0 0 6px');
var kb=ekle(k,'button','📋 Kopyala','padding:6px 12px;font-size:14px;border-radius:8px;'+STIL);
kb.onclick=function(){
var tamam=function(){kb.textContent='✓ Kopyalandı';};
try{
navigator.clipboard.writeText(m).then(tamam).catch(function(){kb.textContent='Kopyalanamadı, uzun basıp seç';});
}catch(e){kb.textContent='Kopyalanamadı, uzun basıp seç';}
};
});
}
ekle(sonuc,'div','Cevap yazarken:','font-weight:bold;margin:10px 0 4px');
satir('Hemen cevap verme, birkaç dakika bekle.');
satir('Anlamadığın yeri sor: "Şunu mu kastettin?"');
satir('Sadece bir konuya cevap ver, her şeye tek tek savunma yazma.');
satir('"Sen hep..." yerine "Ben şöyle hissettim..." diye yaz.');
satir('Rahatsız edici bir mesajsa cevap vermek zorunda değilsin. Ekran görüntüsü alıp güvendiğin biriyle paylaşabilirsin.');
};
btn.onclick=function(){p.style.display=p.style.display==='none'?'block':'none';};
var ta = p.querySelector("textarea");
  if(ta){
    var hizli = document.createElement("div");
    hizli.style.display = "none";
    hizli.style.margin = "6px 0";
    var ornekler = [
      ["👀 Görüldü attı", "Görüldü attın neden yazmadın?"],
      ["💔 Eski sevgili", "Selam nasılsın uzun zaman oldu aklıma geldin"],
      ["🧊 Soğuk yapıyor", "Bir şey mi oldu çok soğuk ve garip davranıyorsun"],
      ["🚩 Love Bombing", "Sensiz yaşayamam ilk günden aşık oldum ruh ikizimsin"],
      ["🎭 Gaslighting", "Çok abartıyorsun hep senin yüzünden kafanda kuruyorsun"]
    ];
    ornekler.forEach(function(o){
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = o[0];
      b.style.cssText = "margin:2px 4px 2px 0;padding:4px 8px;font-size:12px;border-radius:12px;border:1px solid var(--soluk);background:var(--bg);color:var(--yazi);cursor:pointer";
      b.onclick = function(){
        ta.value = o[1];
        ta.dispatchEvent(new Event("input"));
      };
      hizli.appendChild(b);
    });
    ta.parentNode.insertBefore(hizli, ta);
  }
  document.body.appendChild(p);
document.body.appendChild(btn);
})();
