(function () {
  function duzelt() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      var t = n.nodeValue.trim();
      if (t === 'Terminal' || t === '🟩 Terminal' || t === '🟩') {
        n.nodeValue = n.nodeValue.replace('Terminal', 'Tema').replace('🟩', '🎨');
      }
    }
  }
  duzelt();
  setTimeout(duzelt, 1000);
  setTimeout(duzelt, 3000);
})();
