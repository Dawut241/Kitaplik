(function () {
  var T = {
    "crime and punishment": "Yoksul öğrenci Raskolnikov bir tefeci kadını öldürür; roman cinayetten sonraki vicdan azabını anlatır. Dostoyevski, 1866.",
    "the brothers karamazov": "Karamazov ailesinin, babanın öldürülmesi etrafında gelişen hikâyesi. İnanç, özgürlük ve suç üzerine. Dostoyevski, 1879-80.",
    "war and peace": "Napolyon'un 1812'deki Rusya seferi döneminde birkaç soylu ailenin hayatı. Tolstoy, 1869'da tamamlandı.",
    "anna karenina": "Anna'nın Vronski'ye aşkı ve bunun sonuçları; paralel olarak Levin ve Kitty'nin hayatı. Tolstoy, 1870'ler.",
    "the idiot": "İyi yürekli ve saf Prens Mışkin'in Rusya'ya dönüşü ve yaşadıkları. Dostoyevski, 1868-69.",
    "notes from underground": "Hayattan kopuk bir adamın ağzından yazılmış kısa roman. Dostoyevski, 1864.",
    "resurrection": "Prens Nehludov ile Katyuşa Maslova'nın hikâyesi. Tolstoy'un son büyük romanı, 1899.",
    "the possessed": "Taşra kasabasında bir grup devrimcinin etrafında geçen roman (Ecinniler / Şeytanlar). Dostoyevski, 1871-72.",
    "the gambler": "Kumarbaz. Dostoyevski romanı 1866'da çok kısa sürede stenograf Anna Snitkina'ya yazdırdı.",
    "poor folk": "Dostoyevski'nin ilk romanı (1846). Yoksul bir memur ile genç bir kadının mektuplaşması.",
    "the house of the dead": "Dostoyevski'nin Omsk'taki kürek cezası yıllarından esinlenen eser. 1860-62.",
    "white nights and other stories": "Beyaz Geceler, St. Petersburg'da geçen, hayalci bir gencin kısa aşk hikâyesidir (1848). Dostoyevski.",
    "uncle's dream and the permanent husband": "Dostoyevski'nin iki ayrı eserini bir arada içeren derleme.",
    "the grand inquisitor": "Karamazov Kardeşler'den bir bölüm: Ivan'ın Alyoşa'ya anlattığı Büyük Engizisyoncu hikâyesi. İnanç, özgürlük ve otorite üzerine.",
    "childhood": "Tolstoy'un ilk yayımlanan eseri (1852). Bir çocuğun büyümesini anlatan üçlemenin ilk kitabı.",
    "boyhood": "Tolstoy'un Çocukluk, İlkgençlik, Gençlik üçlemesinin ikinci kitabı.",
    "youth": "Tolstoy'un Çocukluk, İlkgençlik, Gençlik üçlemesinin üçüncü kitabı.",
    "the cossacks": "Kafkasya'daki bir Kazak köyüne giden genç soylu Olenin'in hikâyesi. Tolstoy, 1863.",
    "the kreutzer sonata and other stories": "Kreutzer Sonat novellası ve Tolstoy'un diğer öyküleri.",
    "master and man": "Kar fırtınasında yolda kalan bir tüccar ile uşağının hikâyesi. Tolstoy, 1895.",
    "what men live by, and other tales": "Tolstoy'un kısa öykülerinden oluşan bir derleme.",
    "sevastopol": "Tolstoy'un Kırım Savaşı'nda Sivastopol'da yaşadıklarından esinlenen öyküler, 1855-56.",
    "a letter to a hindu": "Tolstoy'un şiddetsizlik üzerine 1908 tarihli mektubu. Gandhi ile mektuplaşması bilinir.",
    "the double": "Memur Golyadkin'in kendine benzeyen biriyle karşılaşması. Dostoyevski, 1846.",
    "the adolescent": "Genç Arkady'nin babasını ve kendi yerini bulma çabası. Dostoyevski, 1875.",
    "a raw youth": "Genç Arkady'nin babasını ve kendi yerini bulma çabası (Genç Delikanlı). Dostoyevski, 1875.",
    "the eternal husband": "Dostoyevski'nin Sonsuz Koca adlı kısa romanı.",
    "the kreutzer sonata": "Evlilik, kıskançlık ve cinsellik üzerine sert görüşler içeren novella. Tolstoy, 1889.",
    "the death of ivan ilyich": "Bir yargıcın hastalığı ve ölümle yüzleşmesi. Tolstoy, 1886.",
    "hadji murad": "Kafkasya'da Çeçen komutan Hacı Murat'ın hikâyesi. Tolstoy'un ölümünden sonra, 1912'de yayımlandı.",
    "the crocodile": "Dostoyevski'nin hiciv türündeki kısa öyküsü.",
    "bobok": "Dostoyevski'nin kısa öyküsü; mezarlıkta geçer.",
    "the insulted and humiliated": "Sürgün dönüşünde yazılan, yoksul ve ezilmiş insanların hikâyesi. Dostoyevski, 1861.",
    "the village of stepanchikovo": "Dostoyevski'nin romanı.",
    "a faint heart": "Dostoyevski'nin erken dönem kısa öyküsü.",
    "the landlady": "Dostoyevski'nin erken dönem öyküsü.",
    "the grishka trilogy": "Tolstoy'un eseri.",
    "the decembrists": "Tolstoy'un tamamlanmamış romanı; Dekabristler konusunu işler.",
    "a prisoner in the caucasus": "Kafkasya'da esir düşen bir Rus subayının esaretten kurtulma çabası. Tolstoy.",
    "albert": "Yetenekli ama içkiye düşkün bir kemancının hikâyesi. Tolstoy.",
    "two hussars": "Baba ve oğul olan iki subayı karşılaştıran öykü. Tolstoy, 1856."
  };

  var baslik = document.getElementById('baslik');
  if (!baslik || typeof ac === 'undefined') return;

  var kutu = document.createElement('p');
  kutu.style.cssText = 'display:none;margin:8px 0;padding:10px 12px;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:15px;line-height:1.5;';
  baslik.parentNode.insertBefore(kutu, baslik.nextSibling);

  var eski = ac;
  ac = function (k) {
    eski(k);
    var t = T[String(k.baslik).toLowerCase().trim()];
    if (t) { kutu.textContent = '📖 ' + t; kutu.style.display = 'block'; }
    else { kutu.style.display = 'none'; }
  };
})();
