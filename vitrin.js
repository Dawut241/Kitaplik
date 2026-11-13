(function(){
  var kutu = document.getElementById("kitaplar");
  if (!kutu || document.getElementById("vitrin")) return;
  fetch("books.json").then(function(r){ return r.json(); }).then(function(d){
    var l = d.filter(function(k){ return ["Machiavelli","Nietzsche","Le Bon","Schopenhauer","Sun Tzu"].indexOf(k.yazar) >= 0; });
    if (!l.length || typeof window.ac !== "function") return;
    var v = document.createElement("div");
    v.id = "vitrin";
    v.style.cssText = "margin:14px 0 20px";
    var h = document.createElement("h3");
    h.textContent = "🧠 Karanlık Psikoloji Rafı";
    var a = document.createElement("p");
    a.style.cssText = "color:var(--soluk);margin:0 0 8px;font-size:15px";
    a.textContent = "Güç, manipülasyon ve insan doğası üzerine klasikler (" + l.length + " kitap)";
    v.append(h, a);
    l.forEach(function(k){
      var c = document.createElement("div");
      c.className = "kart";
      var b = document.createElement("b"); b.textContent = k.baslik;
      var s = document.createElement("small"); s.textContent = k.yazar;
      c.append(b, document.createElement("br"), s);
      c.onclick = function(){ window.ac(k); };
      v.appendChild(c);
    });
    kutu.parentNode.insertBefore(v, kutu);
  });
})();
