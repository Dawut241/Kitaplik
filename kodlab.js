(function() {
  const sar = document.createElement("div");
  sar.style.cssText = "margin:12px 0;";
  const btn = document.createElement("button");
  btn.textContent = "🚀 Janly Kod Laboratoriýasy we Resmi Şahadatnama";
  btn.style.cssText = "width:100%;padding:12px;border:none;border-radius:10px;background:#8e44ad;color:#fff;font-weight:bold;font-size:15px;cursor:pointer;box-shadow:var(--golge);";
  const panel = document.createElement("div");
  panel.style.cssText = "display:none;background:var(--kart);color:var(--yazi);padding:15px;border-radius:10px;margin-top:8px;box-shadow:var(--golge);";
  sar.append(btn, panel);
  const hedef = document.getElementById("liste") || document.body;
  hedef.parentNode.insertBefore(sar, hedef);

  btn.onclick = () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    if (panel.dataset.hazir) return;
    panel.dataset.hazir = "1";

    const h1 = document.createElement("h3");
    h1.textContent = "⚡ Janly HTML / CSS / JS Kod Redaktory";
    const acik = document.createElement("p");
    acik.textContent = "Sapaklardan kopyalan koduňyzy ýa-da öz ýazan koduňyzy şu ýere goýup 'Kody Işlet' düwmesine basyň:";
    acik.style.fontSize = "13px";

    const ta = document.createElement("textarea");
    ta.id = "janly_kod_ta";
    ta.style.cssText = "width:100%;height:140px;background:#1e272e;color:#0be881;border-radius:8px;padding:10px;font-family:monospace;font-size:13px;box-sizing:border-box;";
    ta.value = "<style>\n  .gutujyk { background: #3498db; color: white; padding: 15px; border-radius: 8px; text-align: center; }\n</style>\n<div class='gutujyk'>\n  <h2>Salam! Ilkinji Kodum Işleýär!</h2>\n  <p>Bu ýazgyny üýtgedip täzeden işledip bilersiň.</p>\n</div>";

    const runBtn = document.createElement("button");
    runBtn.textContent = "▶ Kody Işlet";
    runBtn.style.cssText = "margin:8px 0;padding:10px 16px;background:#27ae60;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;";

    const cerceve = document.createElement("iframe");
    cerceve.setAttribute("sandbox", "allow-scripts allow-modals");
    cerceve.style.cssText = "width:100%;height:160px;border:1px solid rgba(128,128,128,0.4);border-radius:8px;background:#fff;";
    cerceve.srcdoc = ta.value;
    runBtn.onclick = () => { cerceve.srcdoc = ta.value; };

    const h2 = document.createElement("h3");
    h2.textContent = "🎓 Resmi Üstünlik Şahadatnamasy (70+ Bal Şertli)";
    h2.style.marginTop = "18px";
    const adInp = document.createElement("input");
    adInp.placeholder = "Doly Adyňyz we Familiýaňyz...";
    adInp.style.cssText = "width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;margin-bottom:8px;box-sizing:border-box;";
    const sertBtn = document.createElement("button");
    sertBtn.textContent = "🏅 Şahadatnamamy Barla we Döret";
    sertBtn.style.cssText = "padding:10px 16px;background:#e67e22;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;";

    const sertKutu = document.createElement("div");
    sertKutu.style.cssText = "display:none;margin-top:12px;padding:18px;border:3px double #f1c40f;border-radius:12px;text-align:center;background:linear-gradient(135deg,#2c3e50,#1a252f);color:#fff;";
    sertBtn.onclick = () => {
      const bal = Number(localStorage.getItem("kod_bal") || "0");
      sertKutu.innerHTML = "";
      if (bal < 70) {
        const uyari = document.createElement("div");
        uyari.textContent = "⚠️ Häzirki balyňyz: " + bal + ". Şahadatnama almak üçin ýokardaky PRO Akademiýa synagyndan azyndan 70 bal almaly!";
        uyari.style.color = "#ff7675";
        sertKutu.appendChild(uyari);
        sertKutu.style.display = "block";
        return;
      }
      const ad = adInp.value.trim() || "Hormatly Okuwçy";
      const belgeNo = "OKA-" + Math.floor(100000 + Math.random() * 900000);
      const b1 = document.createElement("div");
      b1.textContent = "🏆 ONLINE KITAPLIK PRO KODLAMA AKADEMIÝASY 🏆";
      b1.style.cssText = "color:#f1c40f;font-weight:bold;font-size:14px;margin-bottom:8px;";
      const b2 = document.createElement("div");
      b2.textContent = "ÜSTÜNLIK ŞAHADATNAMASY";
      b2.style.cssText = "font-size:20px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;";
      const b3 = document.createElement("div");
      b3.textContent = "Hormatly " + ad + ", HTML, CSS, JavaScript we Python Web Programmirleme okuwyny " + bal + " bal bilen üstünlikli tamamlady.";
      b3.style.cssText = "font-size:14px;line-height:1.5;margin-bottom:8px;";
      const b4 = document.createElement("div");
      b4.textContent = "Şahadatnama Belgisi: " + belgeNo + " | Sene: " + new Date().toLocaleDateString("tr-TR");
      b4.style.cssText = "font-size:12px;color:#bdc3c7;";
      sertKutu.append(b1, b2, b3, b4);
      sertKutu.style.display = "block";
    };

    panel.append(h1, acik, ta, runBtn, cerceve, h2, adInp, sertBtn, sertKutu);
  };
})();
