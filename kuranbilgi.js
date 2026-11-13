(function(){
  function kontrolEt(){
    var baslik = document.getElementById("baslik");
    var okuyucu = document.getElementById("okuyucu");
    if (!baslik || !okuyucu || okuyucu.style.display === "none") return;
    var eski = document.getElementById("kuran-bilgi-kutusu");
    var metin = (baslik.textContent || "").toLowerCase();
    if (metin.indexOf("kur'an") !== -1 || metin.indexOf("kuran") !== -1 || metin.indexOf("koran") !== -1) {
      if (!eski) {
        var kutu = document.createElement("div");
        kutu.id = "kuran-bilgi-kutusu";
        kutu.className = "kart";
        kutu.style.cssText = "border-left:4px solid #16a34a;margin:12px 0;padding:12px 14px;font-size:14px;line-height:1.6;";
        var b = document.createElement("strong");
        b.style.display = "block";
        b.textContent = "📖 Eser Hakkında Kısa Bilgi";
        var p = document.createElement("p");
        p.style.cssText = "margin:6px 0 0;color:var(--soluk);";
        p.textContent = "Kur'an-ı Kerim toplam 114 sureden oluşur. İlk suresi Fatiha, son suresi ise Nas suresidir. Bu metin, J.M. Rodwell tarafından hazırlanan kronolojik sıraya dayalı İngilizce çeviri nüshasıdır.";
        kutu.appendChild(b); kutu.appendChild(p);
        baslik.parentNode.insertBefore(kutu, baslik.nextSibling);
      }
    } else if (eski) {
      eski.remove();
    }
  }
  setInterval(kontrolEt, 600);
})();
