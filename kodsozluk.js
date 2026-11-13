(function() {
  const sar = document.createElement("div");
  sar.style.cssText = "margin:12px 0;";
  const btn = document.createElement("button");
  btn.textContent = "📖 Programmirleme Sözlügi we Çalt Gözleg (Cheat Sheet)";
  btn.style.cssText = "width:100%;padding:12px;border:none;border-radius:10px;background:#d35400;color:#fff;font-weight:bold;font-size:15px;cursor:pointer;box-shadow:var(--golge);";
  const panel = document.createElement("div");
  panel.style.cssText = "display:none;background:var(--kart);color:var(--yazi);padding:15px;border-radius:10px;margin-top:8px;box-shadow:var(--golge);";
  sar.append(btn, panel);
  const hedef = document.getElementById("liste") || document.body;
  hedef.parentNode.insertBefore(sar, hedef);

  const terimler = [
    { k: "<h1> ... <h6>", d: "HTML", a: "Sözbaşy tegleri (h1 iň uly, h6 iň kiçi)." },
    { k: "<p>", d: "HTML", a: "Tekst abzasyny (paragraf) döredýär." },
    { k: "<a href='...'>", d: "HTML", a: "Başga sahypa ýa-da saýta geçýän baglanyşyk (link)." },
    { k: "<img src='...'>", d: "HTML", a: "Sahypa surat ýerleşdirýär." },
    { k: "<input>", d: "HTML", a: "Ulanyjydan tekst, san ýa-da parol alýan giriş gutusy." },
    { k: "<ul> / <ol> / <li>", d: "HTML", a: "Nokatly (ul) we sanly (ol) sanaw elementleri (li)." },
    { k: "color / background-color", d: "CSS", a: "Ýazgy reňkini we arka fon reňkini üýtgedýär." },
    { k: "padding / margin", d: "CSS", a: "padding içki boşlugy, margin daşky boşlugy sazlaýar." },
    { k: "display: flex / grid", d: "CSS", a: "Elementleri hatara (flex) ýa-da tora (grid) düzýär." },
    { k: "border-radius", d: "CSS", a: "Gutularyň we düwmeleriň burçlaryny tegeleýär." },
    { k: "let / const", d: "JS", a: "Üýtgeýji (let) we hemişelik baha (const) döredýär." },
    { k: "document.getElementById()", d: "JS", a: "HTML elementini ID ady boýunça tapyp dolandyrýar." },
    { k: "localStorage.setItem()", d: "JS", a: "Maglumaty brauzerde hemişelik ýatda saklaýar." },
    { k: "print() / input()", d: "Python", a: "Ekrana ýazgy çykarýar (print) we ulanyjydan maglumat alýar (input)." },
    { k: "if / elif / else", d: "Python", a: "Şertli karar bermek bloklary." },
    { k: "for / while", d: "Python", a: "Gaýtalanýan işler üçin sikl (loop) buýruklary." },
    { k: "def / return", d: "Python", a: "Täze funksiýa döredýär we netijesini gaýtarýar." },
    { k: "mkdir / cd / ls", d: "Termux", a: "Bukja döretmek (mkdir), bukja girmek (cd) we faýllary görmek (ls)." },
    { k: "git add . / commit / push", d: "Git", a: "Kod üýtgeşmelerini ýatda saklamak we GitHub-a ibermek." }
  ];

  btn.onclick = () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    if (panel.dataset.hazir) return;
    panel.dataset.hazir = "1";

    const ara = document.createElement("input");
    ara.placeholder = "🔍 Teg, buýruk ýa-da söz gözle (meselem: flex, python, input)...";
    ara.style.cssText = "width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;margin-bottom:10px;box-sizing:border-box;";
    const liste = document.createElement("div");
    panel.append(ara, liste);

    const goster = (f) => {
      liste.innerHTML = "";
      terimler.filter(t => (t.k + " " + t.d + " " + t.a).toLowerCase().includes(f.toLowerCase())).forEach(t => {
        const satir = document.createElement("div");
        satir.style.cssText = "padding:8px;border-bottom:1px solid rgba(128,128,128,0.2);font-size:13px;";
        const ust = document.createElement("div");
        ust.style.cssText = "font-weight:bold;color:#00a8ff;font-family:monospace;";
        ust.textContent = "[" + t.d + "] " + t.k;
        const alt = document.createElement("div");
        alt.textContent = t.a;
        satir.append(ust, alt);
        liste.appendChild(satir);
      });
    };
    goster("");
    ara.oninput = () => goster(ara.value);
  };
})();
