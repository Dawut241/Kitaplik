(function(){
  var l = document.getElementById("liste");
  if (!l || !l.parentNode || document.getElementById("kodgrup")) return;
  var p = l.parentNode, hedef = [];
  Array.prototype.forEach.call(p.children, function(e){
    var b = e.firstElementChild;
    if (e !== l && b && b.tagName === "BUTTON" && /Akademi|Laborator|Kari.?erasy|Sözl/.test(b.textContent)) hedef.push(e);
  });
  if (hedef.length < 2) return;
  var d = document.createElement("details");
  d.id = "kodgrup";
  d.style.cssText = "margin:12px 0;border:1px solid rgba(128,128,128,0.3);border-radius:10px;padding:8px 12px;background:var(--kart);color:var(--yazi)";
  var s = document.createElement("summary");
  s.textContent = "💻 Kodlama Akademiýasy (Türkmençe)";
  s.style.cssText = "font-weight:bold;cursor:pointer;padding:6px 0";
  d.appendChild(s);
  hedef.forEach(function(e){ d.appendChild(e); });
  p.insertBefore(d, l);
})();
