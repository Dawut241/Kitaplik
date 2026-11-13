(function(){
  var st = document.createElement('style');
  st.textContent = '#ykskutu{margin:0 16px 12px}#ykskutu small{display:block;color:var(--soluk);margin-bottom:8px}#ykskutu .etiket{display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid var(--soluk);border-radius:20px;cursor:pointer;font-size:15px}#ykssayfa{display:none;padding:16px;max-width:700px;margin:0 auto}#ykssayfa .ust{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}#ykssayfa .sec{display:block;width:100%;text-align:left;margin:0 0 10px;padding:12px;font-size:15px;border:1px solid var(--soluk);border-radius:8px;background:var(--kart);color:var(--yazi);cursor:pointer}#ykssayfa .sec.secili{border:2px solid #2563eb;font-weight:bold}#ykssayfa .kart{padding:14px;background:var(--kart);border-radius:10px;box-shadow:0 1px 4px var(--golge);margin-bottom:14px}#ykssayfa .netkutu{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center;margin:12px 0}#ykssayfa .netkutu div{padding:10px;border-radius:8px;background:var(--bg);border:1px solid var(--soluk)}';
  document.head.appendChild(st);

  var yp = document.createElement('div');
  yp.id = 'ykssayfa';
  document.body.appendChild(yp);

  var kutu = document.createElement('div');
  kutu.id = 'ykskutu';
  var hedef = document.getElementById('testler') || document.getElementById('kitaplar');
  if(hedef) hedef.parentNode.insertBefore(kutu, hedef);

  var timer = null;

  function kapat(){
    if(timer) clearInterval(timer);
    yp.style.display = 'none';
    document.getElementById('liste').style.display = 'block';
  }

  function baslat(test){
    document.getElementById('liste').style.display = 'none';
    yp.style.display = 'block';
    window.scrollTo(0,0);
    var cevaplar = new Array(test.sorular.length).fill(-1);
    var idx = 0;
    var saniye = (test.sure || 10) * 60;

    if(timer) clearInterval(timer);
    timer = setInterval(function(){
      saniye--;
      var el = document.getElementById('ykssure');
      if(el){
        var dk = Math.floor(saniye/60);
        var sn = saniye%60;
        el.textContent = (dk<10?'0':'')+dk+':'+(sn<10?'0':'')+sn;
      }
      if(saniye <= 0){
        clearInterval(timer);
        bitir(test, cevaplar);
      }
    }, 1000);

    function ciz(){
      var s = test.sorular[idx];
      var dk = Math.floor(saniye/60);
      var sn = saniye%60;
      var sureStr = (dk<10?'0':'')+dk+':'+(sn<10?'0':'')+sn;
      yp.innerHTML = '';

      var ust = document.createElement('div');
      ust.className = 'ust';
      var geriBtn = document.createElement('button');
      geriBtn.textContent = '← Çıkış';
      geriBtn.onclick = kapat;
      var sureSpan = document.createElement('strong');
      sureSpan.id = 'ykssure';
      sureSpan.textContent = '⏱ ' + sureStr;
      ust.appendChild(geriBtn);
      ust.appendChild(sureSpan);
      yp.appendChild(ust);

      var baslik = document.createElement('h3');
      baslik.textContent = test.baslik + ' (' + (idx+1) + '/' + test.sorular.length + ')';
      yp.appendChild(baslik);

      var kart = document.createElement('div');
      kart.className = 'kart';
      var soruP = document.createElement('p');
      soruP.style.whiteSpace = 'pre-line';
      soruP.style.fontWeight = 'bold';
      soruP.textContent = s.s;
      kart.appendChild(soruP);

      var harfler = ['A','B','C','D','E'];
      s.sec.forEach(function(metin, i){
        var b = document.createElement('button');
        b.className = 'sec' + (cevaplar[idx] === i ? ' secili' : '');
        b.textContent = harfler[i] + ') ' + metin;
        b.onclick = function(){
          cevaplar[idx] = (cevaplar[idx] === i) ? -1 : i;
          ciz();
        };
        kart.appendChild(b);
      });
      yp.appendChild(kart);

      var alt = document.createElement('div');
      alt.style.display = 'flex';
      alt.style.gap = '8px';

      if(idx > 0){
        var onceki = document.createElement('button');
        onceki.textContent = '← Önceki';
        onceki.onclick = function(){ idx--; ciz(); };
        alt.appendChild(onceki);
      }

      if(idx + 1 < test.sorular.length){
        var sonraki = document.createElement('button');
        sonraki.textContent = 'Sonraki →';
        sonraki.style.marginLeft = 'auto';
        sonraki.onclick = function(){ idx++; ciz(); };
        alt.appendChild(sonraki);
      } else {
        var bitirBtn = document.createElement('button');
        bitirBtn.textContent = 'Sınavı Bitir ✓';
        bitirBtn.style.marginLeft = 'auto';
        bitirBtn.onclick = function(){ clearInterval(timer); bitir(test, cevaplar); };
        alt.appendChild(bitirBtn);
      }
      yp.appendChild(alt);
    }
    ciz();
  }

  function bitir(test, cevaplar){
    window.scrollTo(0,0);
    var d = 0, y = 0, b = 0;
    test.sorular.forEach(function(s, i){
      if(cevaplar[i] === -1) b++;
      else if(cevaplar[i] === s.dogru) d++;
      else y++;
    });
    var net = (d - (y * 0.25)).toFixed(2);
    try{window.yksPlus&&window.yksPlus.kaydet(test,cevaplar);}catch(e){}
    try {
      var gecmis = JSON.parse(localStorage.getItem("yks_gecmis") || "[]");
      gecmis.unshift({ders: test.baslik.split("–")[0].trim(), net: parseFloat(net), dogru: d, yanlis: y, toplam: test.sorular.length, tarih: new Date().toLocaleDateString("tr-TR")});
      localStorage.setItem("yks_gecmis", JSON.stringify(gecmis.slice(0, 30)));
    } catch(e){}

    yp.innerHTML = '';
    var geriBtn = document.createElement('button');
    geriBtn.textContent = '← Ana Sayfaya Dön';
    geriBtn.onclick = kapat;
    yp.appendChild(geriBtn);

    var h2 = document.createElement('h2');
    h2.textContent = 'Sınav Sonucu: ' + test.baslik;
    yp.appendChild(h2);

    var ozet = document.createElement('div');
    ozet.className = 'kart';
    ozet.innerHTML = '<div class="netkutu">' +
      '<div><strong>'+d+'</strong><br><small>Doğru</small></div>' +
      '<div><strong>'+y+'</strong><br><small>Yanlış</small></div>' +
      '<div><strong>'+b+'</strong><br><small>Boş</small></div>' +
      '<div><strong>'+net+'</strong><br><small>Net</small></div>' +
      '</div>';
    yp.appendChild(ozet);
    if(test.tavsiyeler){
      var oran = d / test.sorular.length;
      var mesaj = oran >= 0.8 ? test.tavsiyeler.yuksek : (oran >= 0.4 ? test.tavsiyeler.orta : test.tavsiyeler.dusuk);
      var tk = document.createElement("div");
      tk.className = "kart";
      tk.style.borderLeft = "4px solid #2563eb";
      var tb = document.createElement("strong");
      tb.textContent = "💡 YKS Koç Tavsiyesi:";
      var tp = document.createElement("p");
      tp.style.margin = "6px 0 0";
      tp.textContent = mesaj;
      tk.appendChild(tb); tk.appendChild(tp);
      yp.appendChild(tk);
    }

    var harfler = ['A','B','C','D','E'];
    test.sorular.forEach(function(s, i){
      var k = document.createElement('div');
      k.className = 'kart';
      var durum = cevaplar[i] === -1 ? '⚪ Boş' : (cevaplar[i] === s.dogru ? '✅ Doğru' : '❌ Yanlış (Senin: ' + harfler[cevaplar[i]] + ')');
      var p1 = document.createElement('p');
      p1.style.fontWeight = 'bold';
      p1.textContent = (i+1) + '. ' + durum;
      var p2 = document.createElement('p');
      p2.textContent = s.s;
      var p3 = document.createElement('p');
      p3.style.color = '#16a34a';
      p3.textContent = 'Doğru Cevap: ' + harfler[s.dogru] + ') ' + s.sec[s.dogru];
      var p4 = document.createElement('p');
      p4.style.fontSize = '14px';
      p4.style.color = 'var(--soluk)';
      p4.textContent = 'Çözüm: ' + s.aciklama;
      k.appendChild(p1); k.appendChild(p2); k.appendChild(p3); k.appendChild(p4);
      yp.appendChild(k);
    });

    var tekrar = document.createElement('button');
    tekrar.textContent = 'Tekrar Çöz';
    tekrar.onclick = function(){ baslat(test); };
    yp.appendChild(tekrar);
  }

  kutu.innerHTML = '<small>YKS Deneme Merkezi</small>';
  var rehberBtn = document.createElement("span");
  rehberBtn.className = "etiket";
  rehberBtn.style.borderColor = "#2563eb";
  rehberBtn.textContent = "📖 YKS Taktik & Süre Rehberi";
  rehberBtn.onclick = function(){
    document.getElementById("liste").style.display = "none";
    yp.style.display = "block";
    window.scrollTo(0,0);
    yp.innerHTML = "";
    var gb = document.createElement("button");
    gb.textContent = "← Geri";
    gb.onclick = kapat;
    yp.appendChild(gb);
    var h = document.createElement("h2");
    h.textContent = "YKS Sınav Stratejisi & Net Artırma Rehberi";
    yp.appendChild(h);
    var altNot = document.createElement("p");
    altNot.style.color = "var(--soluk)";
    altNot.textContent = "Detayları okumak için başlıkların üzerine dokun:";
    yp.appendChild(altNot);
    var kartlar = [
      {
        baslik: "⏱ 1. TYT Süre Yönetimi (165 Dakika Planı)",
        detay: "• Türkçe (40 Soru): 45-50 dakika ayır. Paragraflarda önce soru kökünü oku.\n• Sosyal Bilimler (20 Soru): 15-20 dakikada bitir.\n• Matematik (40 Soru): 65-70 dakika ayır. İşlemi uzayan soruda inatlaşma.\n• Fen Bilimleri (20 Soru): 20-25 dakika ayır.\n• Turlama Tekniği: 90 saniyede çıkmayan soruyu yuvarlak içine al ve geç; sınav sonunda turladığın sorulara dön."
      },
      {
        baslik: "🎯 2. Net Artırma & 4 Yanlış 1 Doğru Kuralı",
        detay: "• Hiç bilmediğin soruyu boş bırakmak sana +0.25 net kazandırır.\n• İki şık arasında kaldıysan: İlk aklına gelen ve metne en doğrudan dayanan şıkkı işaretle.\n• Günde 20 Paragraf + 15 Problem rutini 1 ayda ortalama 10-12 net artış sağlar."
      },
      {
        baslik: "📊 3. TYT ve AYT Puan Ağırlıkları",
        detay: "• Yerleştirme puanında TYT %40, AYT ise %60 etkilidir.\n• TYT baraj ve hız sınavıdır; asıl sıralamayı AYT alan dersleri (Matematik, Edebiyat, Fen veya Sosyal-2) belirler.\n• OBP (Ortaöğretim Başarı Puanı) sıralamayı binlerce kişi ileri veya geri atabilir."
      },
      {
        baslik: "🧠 4. Deneme Analizi Nasıl Yapılır?",
        detay: "• Deneme bittikten sonra sadece netine bakıp kitapçığı kapatma.\n• Yanlış yaptığın ve boş bıraktığın her sorunun hangi konudan geldiğini küçük bir deftere yaz.\n• Haftada en az 1 gün sadece yanlış defterindeki konuları tekrar et."
      }
    ];
    kartlar.push(
    {baslik: "⚡ 5. Paragraf ve Problem Hızlandırma Taktikleri", detay: "• Paragrafta önce soru kökünü (koyu yazılı kısmı) oku; metni ne aradığını bilerek tara.\n• 'Değinilmemiştir / çıkarılamaz' sorularında önce şıklara göz at, metni tek seferde ele.\n• Matematik problemlerinde denklemi kurmadan işlem yapma; verilenleri madde madde yaz."},
    {baslik: "🎓 6. OBP (Okul Puanı) ve Yerleştirme Kuralı", detay: "• Ortaöğretim Başarı Puanı (OBP), diploma notunun 5 ile çarpılmasıyla oluşur (En fazla 500).\n• Bu puanın %12'si (en fazla +60 puan) ham puanına eklenerek Yerleştirme Puanını belirler.\n• Bir önceki yıl yerleştiysen OBP katsayısı yarıya düşer (+30 puana iner)."},
    {baslik: "🛡️ 7. Sınav Sabahı ve Optik Kodlama Stratejisi", detay: "• Her soruyu çözdükten hemen sonra veya her sayfa bitiminde optiğe kodla; sona bırakma.\n• Sınavdan önceki akşam yeni konu çalışma, sadece kısa özet notlarına bak.\n• Sınavda arka arkaya 3 zor soru gelirse derin nefes al; o sorular herkes için zordur."}
  );
  yp.style.paddingBottom = "95px";
  kartlar.forEach(function(item){
      var d = document.createElement("div");
      d.className = "kart";
      d.style.cursor = "pointer";
      var b = document.createElement("strong");
      b.style.display = "block";
      b.textContent = item.baslik + " ▾";
      var p = document.createElement("p");
      p.style.cssText = "display:none;margin:10px 0 0;white-space:pre-line;line-height:1.5";
      p.textContent = item.detay;
      d.onclick = function(){
        var acik = p.style.display === "block";
        p.style.display = acik ? "none" : "block";
        b.textContent = item.baslik + (acik ? " ▾" : " ▴");
      };
      d.appendChild(b); d.appendChild(p);
      yp.appendChild(d);
    });
  };
  var sayacKutu = document.createElement("div");
  sayacKutu.style.cssText = "width:100%;padding:10px 12px;margin-bottom:10px;border-radius:10px;background:var(--bg);border-left:4px solid #f59e0b;box-sizing:border-box;font-size:14px;";
  var hedefTarih = new Date("2027-06-19T10:15:00").getTime();
  function guncelleSayac(){
    var simdi = new Date().getTime();
    var fark = hedefTarih - simdi;
    if (fark > 0) {
      var gun = Math.floor(fark / (1000 * 60 * 60 * 24));
      var saat = Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var dk = Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60));
      sayacKutu.textContent = "⏳ YKS 2027'ye Kalan Süre: " + gun + " Gün " + saat + " Saat " + dk + " Dakika — Bugün çözdüğün her soru seni öne geçirir!";
    } else {
      sayacKutu.textContent = "🎯 Sınav zamanı geldi! Kendine güven, emeklerinin karşılığını alacaksın.";
    }
  }
  guncelleSayac();
  setInterval(guncelleSayac, 60000);
  kutu.appendChild(sayacKutu);
  kutu.appendChild(rehberBtn);
  var karneBtn = document.createElement("span");
  karneBtn.className = "etiket";
  karneBtn.style.borderColor = "#16a34a";
  karneBtn.textContent = "📊 Gelişim Karnem";
  karneBtn.onclick = function(){
    document.getElementById("liste").style.display = "none";
    yp.style.display = "block";
    window.scrollTo(0,0);
    yp.innerHTML = "";
    var gb = document.createElement("button");
    gb.textContent = "← Geri";
    gb.onclick = kapat;
    yp.appendChild(gb);
    var h = document.createElement("h2");
    h.textContent = "📊 YKS Gelişim Karnem & Net Analizi";
    yp.appendChild(h);
    var gecmis = [];
    try { gecmis = JSON.parse(localStorage.getItem("yks_gecmis") || "[]"); } catch(e){}
    if(!gecmis.length){
      var bos = document.createElement("div");
      bos.className = "kart";
      bos.textContent = "Henüz tamamlanmış bir denemen yok. Herhangi bir testi bitirdiğinde netlerin ve kişisel analizin burada otomatik birikecek!";
      yp.appendChild(bos);
      return;
    }
    var enDusuk = gecmis.reduce(function(min, item){ return (item.net/item.toplam) < (min.net/min.toplam) ? item : min; }, gecmis[0]);
    var tavsiye = document.createElement("div");
    tavsiye.className = "kart";
    tavsiye.style.borderLeft = "4px solid #16a34a";
    var tb = document.createElement("strong");
    tb.textContent = "🎯 Yapay Zeka Koç Analizi:";
    var tp = document.createElement("p");
    tp.style.margin = "6px 0 0";
    tp.textContent = "Toplam " + gecmis.length + " deneme tamamladın. Başarı oranına göre öncelikli odaklanman gereken ders: " + enDusuk.ders + " (" + enDusuk.net + " Net).";
    tavsiye.appendChild(tb); tavsiye.appendChild(tp);
    yp.appendChild(tavsiye);
    gecmis.forEach(function(g){
      var k = document.createElement("div");
      k.className = "kart";
      var b = document.createElement("strong");
      b.textContent = g.ders + " — " + g.net + " Net";
      var p = document.createElement("p");
      p.style.cssText = "margin:4px 0 0;font-size:14px;color:var(--soluk)";
      p.textContent = "Tarih: " + g.tarih + " | Doğru: " + g.dogru + " | Yanlış: " + g.yanlis + " / " + g.toplam + " Soru";
      k.appendChild(b); k.appendChild(p);
      yp.appendChild(k);
    });
  };
  kutu.appendChild(karneBtn);
  var puanBtn = document.createElement("span");
  puanBtn.className = "etiket";
  puanBtn.style.borderColor = "#9333ea";
  puanBtn.textContent = "🧮 YKS Puan Hesapla";
  puanBtn.onclick = function(){
    document.getElementById("liste").style.display = "none";
    yp.style.display = "block";
    yp.style.paddingBottom = "95px";
    window.scrollTo(0,0);
    yp.innerHTML = "";
    var gb = document.createElement("button");
    gb.textContent = "← Geri";
    gb.onclick = kapat;
    yp.appendChild(gb);
    var h2 = document.createElement("h2");
    h2.textContent = "🧮 TYT Puan Hesaplama Robotu";
    yp.appendChild(h2);
    var aciklama = document.createElement("p");
    aciklama.style.color = "var(--soluk)";
    aciklama.textContent = "Netlerini ve diploma notunu yaz, tahmini ÖSYM TYT puanını hesapla:";
    yp.appendChild(aciklama);
    var kutuForm = document.createElement("div");
    kutuForm.className = "kart";
    var alanlar = [
      {id: "p_tr", ad: "Türkçe Neti (0-40)", max: 40, val: "25"},
      {id: "p_sos", ad: "Sosyal Neti (0-20)", max: 20, val: "12"},
      {id: "p_mat", ad: "Matematik Neti (0-40)", max: 40, val: "15"},
      {id: "p_fen", ad: "Fen Neti (0-20)", max: 20, val: "8"},
      {id: "p_obp", ad: "Diploma Notu (50-100)", max: 100, val: "80"}
    ];
    alanlar.forEach(function(a){
      var lbl = document.createElement("label");
      lbl.style.cssText = "display:block;margin:10px 0 4px;font-weight:bold;";
      lbl.textContent = a.ad;
      var inp = document.createElement("input");
      inp.type = "number"; inp.id = a.id; inp.value = a.val; inp.step = "0.25";
      inp.style.cssText = "width:100%;padding:10px;border-radius:8px;border:1px solid var(--soluk);background:var(--bg);color:var(--yazi);box-sizing:border-box;";
      kutuForm.appendChild(lbl); kutuForm.appendChild(inp);
    });
    var hesBtn = document.createElement("button");
    hesBtn.textContent = "Puanımı Hesapla";
    hesBtn.style.cssText = "margin-top:14px;width:100%;padding:12px;background:#9333ea;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;";
    var sonucKutu = document.createElement("div");
    sonucKutu.style.cssText = "margin-top:14px;padding:12px;border-radius:8px;background:var(--bg);display:none;";
    hesBtn.onclick = function(){
      var tr = Math.max(0, Math.min(40, parseFloat(document.getElementById("p_tr").value) || 0));
      var sos = Math.max(0, Math.min(20, parseFloat(document.getElementById("p_sos").value) || 0));
      var mat = Math.max(0, Math.min(40, parseFloat(document.getElementById("p_mat").value) || 0));
      var fen = Math.max(0, Math.min(20, parseFloat(document.getElementById("p_fen").value) || 0));
      var obp = Math.max(50, Math.min(100, parseFloat(document.getElementById("p_obp").value) || 50));
      var ham = 145 + (tr * 3.1) + (sos * 3.1) + (mat * 3.2) + (fen * 3.1);
      if (ham > 500) ham = 500;
      var ekPuan = obp * 0.6;
      var yer = ham + ekPuan;
      sonucKutu.style.display = "block";
      sonucKutu.textContent = "📊 Toplam Net: " + (tr+sos+mat+fen).toFixed(2) + " | TYT Ham Puan: " + ham.toFixed(2) + " | OBP Katkısı: +" + ekPuan.toFixed(2) + " | Yerleştirme Puanı: " + yer.toFixed(2);
    };
    kutuForm.appendChild(hesBtn);
    kutuForm.appendChild(sonucKutu);
    yp.appendChild(kutuForm);
  };
  kutu.appendChild(puanBtn);
  var planBtn = document.createElement("span");
  planBtn.className = "etiket";
  planBtn.style.borderColor = "#ea580c";
  planBtn.textContent = "📅 Günlük Çalışma Planım";
  planBtn.onclick = function(){
    document.getElementById("liste").style.display = "none";
    yp.style.display = "block";
    yp.style.paddingBottom = "95px";
    window.scrollTo(0,0);
    yp.innerHTML = "";
    var gb = document.createElement("button");
    gb.textContent = "← Geri";
    gb.onclick = kapat;
    yp.appendChild(gb);
    var h2 = document.createElement("h2");
    h2.textContent = "📅 Günlük YKS Akıllı Çalışma Planı";
    yp.appendChild(h2);
    var alanlar = {
      "Sayısal (SAY)": ["📖 20 Paragraf Sorusu (Süre tutarak)", "📐 15 Matematik Problemi", "⚛️ 1 Adet TYT Fizik veya Kimya Denemesi", "🧬 AYT Fen Konu Tekrarı (45 dk)", "📝 Yanlış Defteri Kontrolü (15 dk)"],
      "Eşit Ağırlık (EA)": ["📖 25 Paragraf Sorusu (Süre tutarak)", "📐 15 Matematik Problemi", "📚 AYT Edebiyat Yazar-Eser Tekrarı", "🏛️ TYT/AYT Tarih veya Coğrafya Testi", "📝 Yanlış Defteri Kontrolü (15 dk)"],
      "Sözel (SÖZ)": ["📖 30 Paragraf + Anlam Bilgisi Sorusu", "📚 AYT Edebiyat Dönem & Şiir Analizi", "🌍 Coğrafya Harita ve İklim Tekrarı", "🧠 TYT Felsefe Kavram Sözlüğü Okuması", "📝 Yanlış Defteri Kontrolü (15 dk)"]
    };
    Object.keys(alanlar).forEach(function(alan){
      var k = document.createElement("div");
      k.className = "kart";
      var b = document.createElement("strong");
      b.style.cssText = "display:block;margin-bottom:8px;color:#ea580c;";
      b.textContent = "🎯 " + alan + " Günlük Rutini";
      k.appendChild(b);
      alanlar[alan].forEach(function(gorev){
        var satir = document.createElement("label");
        satir.style.cssText = "display:flex;align-items:center;gap:8px;margin:6px 0;cursor:pointer;";
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.onchange = function(){ satir.style.textDecoration = cb.checked ? "line-through" : "none"; satir.style.opacity = cb.checked ? "0.6" : "1"; };
        var sp = document.createElement("span");
        sp.textContent = gorev;
        satir.appendChild(cb); satir.appendChild(sp);
        k.appendChild(satir);
      });
      yp.appendChild(k);
    });
  };
  kutu.appendChild(planBtn);
  fetch('yks/sorular.json').then(function(r){ return r.json(); }).then(function(veri){
    veri.testler.forEach(function(t){
      var e = document.createElement('span');
      e.className = 'etiket';
      e.textContent = t.baslik;
      e.onclick = function(){ baslat(t); };
      kutu.appendChild(e);
    });
  }).catch(function(){});
})();
