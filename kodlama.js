(function() {
  const sar = document.createElement("div");
  sar.style.cssText = "margin:12px 0;";
  const btn = document.createElement("button");
  btn.textContent = "👑 PRO Kodlama Akademiýasy (24 Baplyk Programmirleme Kitaby)";
  btn.style.cssText = "width:100%;padding:12px;border:none;border-radius:10px;background:linear-gradient(135deg,#1e3799,#0984e3);color:#fff;font-weight:bold;font-size:15px;cursor:pointer;";
  const panel = document.createElement("div");
  panel.style.cssText = "display:none;background:var(--kart);color:var(--yazi);padding:15px;border-radius:10px;margin-top:8px;";
  sar.append(btn, panel);
  const hedef = document.getElementById("liste") || document.body;
  hedef.parentNode.insertBefore(sar, hedef);

  let gizliDers = null;
  let vipPaket = null;
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const filigran = (no) => {
    let d = document.getElementById("vipfiligran");
    if (!d) { d = document.createElement("div"); d.id = "vipfiligran";
      d.style.cssText = "position:fixed;right:6px;bottom:4px;font-size:10px;opacity:.35;pointer-events:none;z-index:9999;color:var(--yazi)";
      document.body.appendChild(d); }
    d.textContent = "VIP #" + no;
  };
  const checkVip = async (k) => {
    k = (k || "").trim().toUpperCase();
    const m = k.match(/^TM-(\d{4})-([0-9A-F]{16})$/);
    if (!m) return 0;
    try {
      if (!vipPaket) vipPaket = await (await fetch("kodlama/vip.enc")).json();
      const s = vipPaket.slots[m[1]];
      if (!s) return 0;
      const ham = await crypto.subtle.importKey("raw", new TextEncoder().encode(k), "PBKDF2", false, ["deriveKey"]);
      const kk = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(s.s), iterations: vipPaket.it, hash: "SHA-256" }, ham, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      const bilgi = JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(s.i) }, kk, b64(s.c))));
      const kalan = Math.ceil((bilgi.exp * 1000 - Date.now()) / 86400000);
      if (kalan <= 0) return 0;
      const mk = await crypto.subtle.importKey("raw", b64(bilgi.mk), "AES-GCM", false, ["decrypt"]);
      const acik = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(vipPaket.i) }, mk, b64(vipPaket.c));
      gizliDers = JSON.parse(new TextDecoder().decode(acik));
      filigran(bilgi.no);
      return kalan;
    } catch (e) {}
    return 0;
  };
  let yuklendi = false;
  btn.onclick = async () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    if (yuklendi) return;
    yuklendi = true;
    const veri = await (await fetch("kodlama/veri.json")).json();
    let sonGun = Number(localStorage.getItem("kod_vip_son") || "0");
    let isVip = sonGun > Date.now();
    if (isVip) await checkVip(localStorage.getItem("kod_vip_kod") || "");

    const vipKutu = document.createElement("div");
    vipKutu.style.cssText = "background:rgba(241,196,15,0.15);border:1px solid #f39c12;padding:12px;border-radius:8px;margin-bottom:12px;font-size:13px;";
    const dersAlan = document.createElement("div");
    panel.append(vipKutu, dersAlan);

    const guncelleVip = () => {
      vipKutu.innerHTML = "";
      if (isVip) {
        const galan = Math.ceil((sonGun - Date.now()) / 86400000);
        vipKutu.textContent = "🌟 VIP PRO Agzalygyňyz Işjeň! Galan möhlet: " + (galan > 3650 ? "Ömürlik" : galan + " gün");
        return;
      }
      const info = document.createElement("div");
      info.textContent = "🔓 Ilkinji 4 bap mugt! Doly giriş (24 bap + PRO Proýektler) üçin VIP kod alyň: +993 62 09 87 42";
      info.style.marginBottom = "8px";
      const kInp = document.createElement("input");
      kInp.placeholder = "VIP Kod...";
      kInp.style.cssText = "padding:8px;border-radius:6px;border:1px solid #ccc;margin-right:6px;";
      const kBtn = document.createElement("button");
      kBtn.textContent = "Aç";
      kBtn.style.cssText = "padding:8px 14px;background:#e67e22;color:#fff;border:none;border-radius:6px;font-weight:bold;";
      kBtn.onclick = async () => {
        const gun = await checkVip(kInp.value.trim());
        if (gun > 0) {
          sonGun = Date.now() + gun * 86400000;
          isVip = true;
          localStorage.setItem("kod_vip_son", String(sonGun));
          localStorage.setItem("kod_vip_kod", kInp.value.trim().toUpperCase());
          guncelleVip();
          cizDers();
        } else alert("Nädogry kod! Kod almak üçin: +993 62 09 87 42");
      };
      vipKutu.append(info, kInp, kBtn);
    };
    const cizDers = () => {
      dersAlan.innerHTML = ""; window.kodDersler = veri.dersler.concat(gizliDers || veri.kilitli);
      veri.dersler.concat(gizliDers || veri.kilitli).forEach((d, idx) => {
        const kilit = idx >= 4 && !gizliDers;
        const k = document.createElement("div");
        k.style.cssText = "border:1px solid rgba(128,128,128,0.3);border-radius:8px;padding:12px;margin-bottom:10px;";
        const h = document.createElement("h3");
        h.textContent = (kilit ? "🔒 " : "") + d.baslik;
        const p = document.createElement("p");
        p.textContent = d.aciklama; p.style.whiteSpace = "pre-wrap"; p.style.lineHeight = "1.6";
        k.append(h, p);
        if (kilit) {
          const uy = document.createElement("div");
          uy.textContent = "🔒 VIP bap. Kod almak üçin: +993 62 09 87 42";
          uy.style.color = "#e74c3c";
          k.appendChild(uy);
        } else {
          const pre = document.createElement("pre");
          pre.textContent = d.kod;
          pre.style.cssText = "background:#1e272e;color:#00d8d6;padding:10px;border-radius:6px;overflow-x:auto;font-size:13px;";
          const ac = document.createElement("button");
          ac.textContent = "⚡ Redaktorda Aç";
          ac.style.cssText = "padding:6px 10px;background:#8e44ad;color:#fff;border:none;border-radius:5px;margin-top:6px;";
          ac.onclick = () => {
            const ta = document.getElementById("janly_kod_ta");
            if (ta) { ta.parentElement.style.display = "block"; ta.value = d.kod; ta.scrollIntoView(); }
          };
          k.append(pre, ac);
        }
        dersAlan.appendChild(k);
      });
    };
    guncelleVip();
    cizDers();
  };
})();
