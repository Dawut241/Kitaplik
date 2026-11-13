(function() {
  const sar = document.createElement("div");
  sar.style.cssText = "margin:12px 0;";
  const btn = document.createElement("button");
  btn.textContent = "💼 Web Programmist Kariýerasy we Portfolio Ýol Kartasy";
  btn.style.cssText = "width:100%;padding:12px;border:none;border-radius:10px;background:#16a085;color:#fff;font-weight:bold;font-size:15px;cursor:pointer;box-shadow:var(--golge);";
  const panel = document.createElement("div");
  panel.style.cssText = "display:none;background:var(--kart);color:var(--yazi);padding:15px;border-radius:10px;margin-top:8px;box-shadow:var(--golge);line-height:1.6;font-size:14px;";
  sar.append(btn, panel);
  const hedef = document.getElementById("liste") || document.body;
  hedef.parentNode.insertBefore(sar, hedef);

  const adimlar = [
    { baslik: "1-nji Ädim: Esasy Bilimi Berklemek (1-2 Hepde)", metin: "HTML, CSS we JavaScript sapaklaryny doly tamamlaň. Her sapakdaky kodlary Janly Redaktorda öz eliňiz bilen üýtgedip synap görüň." },
    { baslik: "2-nji Ädim: Öz Portfolio Saýtyňyzy Dörediň (3-nji Hepde)", metin: "Iş berijiler diploma däl-de, ýasan işleriňize seredýärler. PRO Proýektlerdäki Vizitka, Kalkulýator we Oýun kodlaryny birleşdirip öz şahsy web saýtyňyzy ýasaň." },
    { baslik: "3-nji Ädim: GitHub-da Ýaýyna Beriň (4-nji Hepde)", metin: "Ýasan saýtyňyzy GitHub Pages arkaly internete ýükläň. Indi islendik müşderä ýa-da kompaniýa öz taýýar saýt salgyňyzy görkezip bilersiňiz." },
    { baslik: "4-nji Ädim: Halal Hyzmat we Ilkinji Müşderiler", metin: "Kiçi dükanlar, okuw merkezleri, ussalar ýa-da telekeçiler üçin tanyşdyryş web sahypalaryny (Landing Page) we onlaýn katalogy ýasap berip, halal zähmetiňiz bilen girdeji gazanyp başlaň." }
  ];

  btn.onclick = () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    if (panel.dataset.hazir) return;
    panel.dataset.hazir = "1";
    adimlar.forEach(a => {
      const k = document.createElement("div");
      k.style.cssText = "border-left:4px solid #16a085;padding-left:10px;margin-bottom:12px;";
      const h = document.createElement("div");
      h.textContent = a.baslik;
      h.style.fontWeight = "bold";
      const p = document.createElement("div");
      p.textContent = a.metin;
      p.style.color = "var(--soluk)";
      k.append(h, p);
      panel.appendChild(k);
    });
  };
})();
