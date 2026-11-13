(function () {
  var A = 'dil';
  var dil = 'tr';
  try { dil = localStorage.getItem(A) === 'en' ? 'en' : 'tr'; } catch (e) {}

  var ara = document.getElementById('ara');
  var d = document.createElement('button');
  d.setAttribute('data-dil', '1');
  d.textContent = dil === 'en' ? '🌐 Türkçe' : '🌐 English';
  d.style.cssText = 'padding:8px 14px;margin:6px 0;border-radius:12px;border:1px solid var(--soluk);background:var(--kart);color:var(--yazi);font-size:14px;';
  d.onclick = function () {
    try { localStorage.setItem(A, dil === 'en' ? 'tr' : 'en'); } catch (e) {}
    location.reload();
  };
  if (ara && ara.parentNode) ara.parentNode.insertBefore(d, ara);
  else document.body.insertBefore(d, document.body.firstChild);

  if (dil !== 'en') return;
  document.documentElement.lang = 'en';

  var D = {
    "Online Kitaplık": "Online Library",
    "Kitaplık": "Library",
    "Terminal": "Theme",
    "Tema": "Theme",
    "Kitap veya yazar ara...": "Search book or author...",
    "Konulara göre oku": "Read by topic",
    "Suç ve vicdan": "Crime and conscience",
    "Ölümle yüzleşme": "Facing death",
    "Dostoyevski ve Tolstoy karşılaştırması": "Dostoevsky and Tolstoy compared",
    "Kurtuluş nasıl gelir?": "How does salvation come?",
    "Özgürlük mü, kader mi?": "Freedom or fate?",
    "Soru sor": "Ask a question",
    "Testler": "Quizzes",
    "✍️ Kitap yaz": "✍️ Write a book",
    "Ara": "Search",
    "Kitaplarda ara": "Search in books",
    "Benzer sorular:": "Similar questions:",
    "Bulunan kitaplar:": "Books found:",
    "⭐ Favorilerim": "⭐ My favorites",
    "☆ Favorilere ekle": "☆ Add to favorites",
    "⭐ Favorilerde (kaldırmak için bas)": "⭐ In favorites (tap to remove)",
    "📲 Ana ekrana ekle": "📲 Add to home screen",
    "🎨 Tema": "🎨 Theme",
    "📤 Arkadaşına gönder": "📤 Share with a friend",
    "✅ Link kopyalandı": "✅ Link copied",
    "💬 Fikrin var mı?": "💬 Got an idea?",
    "💡 Günün bilgisi": "💡 Fact of the day",
    "🎲 Başka bir tane": "🎲 Another one",
    "← Geri": "← Back",
    "Geri": "Back"
  };
  var P = [
    ["▶ Kaldığın yerden devam et: ", "▶ Continue where you left off: "]
  ];

  var EN = {
    "crime and punishment": "A poor student, Raskolnikov, murders a pawnbroker; the novel follows his guilt afterwards. Dostoevsky, 1866.",
    "the brothers karamazov": "The story of the Karamazov family, built around the murder of the father. About faith, freedom and guilt. Dostoevsky, 1879-80.",
    "war and peace": "The lives of several noble families during Napoleon's 1812 invasion of Russia. Tolstoy, completed 1869.",
    "anna karenina": "Anna's love for Vronsky and its consequences, alongside the life of Levin and Kitty. Tolstoy, 1870s.",
    "the idiot": "The return of the kind-hearted, naive Prince Myshkin to Russia and what happens to him. Dostoevsky, 1868-69.",
    "notes from underground": "A short novel narrated by a man cut off from life. Dostoevsky, 1864.",
    "resurrection": "The story of Prince Nekhlyudov and Katyusha Maslova. Tolstoy's last major novel, 1899.",
    "the possessed": "A novel about a group of revolutionaries in a provincial town (also known as Demons or Devils). Dostoevsky, 1871-72.",
    "the gambler": "Dostoevsky dictated this novel in 1866, in a very short time, to his stenographer Anna Snitkina.",
    "poor folk": "Dostoevsky's first novel (1846): letters between a poor clerk and a young woman.",
    "the house of the dead": "Inspired by Dostoevsky's years of hard labor in Omsk. 1860-62.",
    "white nights and other stories": "White Nights is a short love story of a dreamy young man in St. Petersburg (1848). Dostoevsky.",
    "uncle's dream and the permanent husband": "A collection with two separate works by Dostoevsky.",
    "the grand inquisitor": "A chapter from The Brothers Karamazov: the tale Ivan tells Alyosha. About faith, freedom and authority.",
    "childhood": "Tolstoy's first published work (1852), the first book of his trilogy about a boy growing up.",
    "boyhood": "The second book of Tolstoy's Childhood, Boyhood, Youth trilogy.",
    "youth": "The third book of Tolstoy's Childhood, Boyhood, Youth trilogy.",
    "the cossacks": "A young nobleman, Olenin, goes to a Cossack village in the Caucasus. Tolstoy, 1863.",
    "the kreutzer sonata and other stories": "The Kreutzer Sonata novella and other stories by Tolstoy.",
    "master and man": "A merchant and his servant caught in a blizzard. Tolstoy, 1895.",
    "what men live by, and other tales": "A collection of Tolstoy's short stories.",
    "sevastopol": "Stories inspired by Tolstoy's experience at Sevastopol in the Crimean War, 1855-56.",
    "a letter to a hindu": "Tolstoy's 1908 letter on nonviolence. He is known to have corresponded with Gandhi.",
    "the double": "Clerk Golyadkin meets a man who looks just like him. Dostoevsky, 1846.",
    "the adolescent": "Young Arkady's search for his father and his own place. Dostoevsky, 1875.",
    "a raw youth": "Young Arkady's search for his father and his own place. Dostoevsky, 1875.",
    "the eternal husband": "Dostoevsky's short novel The Eternal Husband.",
    "the kreutzer sonata": "A novella with harsh views on marriage, jealousy and sexuality. Tolstoy, 1889.",
    "the death of ivan ilyich": "A judge's illness and his confrontation with death. Tolstoy, 1886.",
    "hadji murad": "The story of the Chechen commander Hadji Murad in the Caucasus. Published in 1912, after Tolstoy's death.",
    "the crocodile": "A short satirical story by Dostoevsky.",
    "bobok": "A short story by Dostoevsky, set in a cemetery.",
    "the insulted and humiliated": "Written after his return from exile: the story of poor and downtrodden people. Dostoevsky, 1861.",
    "the village of stepanchikovo": "A novel by Dostoevsky.",
    "a faint heart": "An early short story by Dostoevsky.",
    "the landlady": "An early story by Dostoevsky.",
    "the grishka trilogy": "A work by Tolstoy.",
    "the decembrists": "An unfinished novel by Tolstoy, dealing with the Decembrists.",
    "a prisoner in the caucasus": "A Russian officer captured in the Caucasus tries to escape. Tolstoy.",
    "albert": "The story of a talented but heavy-drinking violinist. Tolstoy.",
    "two hussars": "A story comparing two officers, a father and son. Tolstoy, 1856."
  };

  var eksik = {};
  var yapilan = new WeakMap();

  function cevir(s) {
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var t = m[2];
    if (!t) return null;
    if (Object.prototype.hasOwnProperty.call(D, t)) return m[1] + D[t] + m[3];
    for (var i = 0; i < P.length; i++) {
      if (t.indexOf(P[i][0]) === 0) return m[1] + P[i][1] + t.slice(P[i][0].length) + m[3];
    }
    return null;
  }

  function atla(el) {
    return !el || (el.closest && el.closest('#metin,#kitaplar,[data-dil],script,style,textarea'));
  }

  function metin(n) {
    var v = n.nodeValue;
    if (yapilan.get(n) === v) return;
    if (!v || !v.trim()) return;
    if (atla(n.parentElement)) return;
    var c = cevir(v);
    if (c !== null) { yapilan.set(n, c); n.nodeValue = c; }
    else if (/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(v) && !/^[\s\d%]+(px)?$/.test(v)) eksik[v.trim()] = 1;
  }

  function ozellik(el) {
    ['placeholder', 'title', 'aria-label'].forEach(function (a) {
      var v = el.getAttribute(a);
      if (!v) return;
      var c = cevir(v);
      if (c !== null) el.setAttribute(a, c); else eksik[v] = 1;
    });
  }

  function tara(root) {
    if (!root) return;
    if (root.nodeType === 3) { metin(root); return; }
    if (root.nodeType !== 1 || atla(root)) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) metin(n);
    if (root.matches('[placeholder],[title],[aria-label]')) ozellik(root);
    root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(ozellik);
  }

  function baslikCevir() {
    var c = cevir(document.title);
    if (c !== null) document.title = c;
  }

  tara(document.body);
  baslikCevir();
  setTimeout(function () { tara(document.body); }, 1000);
  setTimeout(function () { tara(document.body); }, 3000);

  var kuyruk = [], bekle = false;
  new MutationObserver(function (list) {
    list.forEach(function (m) {
      if (m.type === 'characterData') kuyruk.push(m.target);
      else m.addedNodes.forEach(function (n) { kuyruk.push(n); });
    });
    if (bekle) return;
    bekle = true;
    setTimeout(function () {
      bekle = false;
      var k = kuyruk; kuyruk = [];
      k.forEach(tara);
    }, 50);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  if (typeof ac !== 'undefined') {
    var eski = ac;
    ac = function (k) {
      eski(k);
      var t = EN[String(k.baslik).toLowerCase().trim()];
      if (!t) return;
      var ps = document.querySelectorAll('p');
      for (var i = 0; i < ps.length; i++) {
        if (ps[i].style.display !== 'none' && ps[i].textContent.indexOf('📖') === 0) {
          ps[i].setAttribute('data-dil', '1');
          ps[i].textContent = '📖 ' + t;
          break;
        }
      }
    };
  }

  if (location.hash === '#dilkontrol') {
    setTimeout(function () {
      var t = document.createElement('textarea');
      t.setAttribute('data-dil', '1');
      t.readOnly = true;
      t.rows = 12;
      t.style.cssText = 'width:100%;margin:12px 0;';
      t.value = Object.keys(eksik).join('\n');
      document.body.appendChild(t);
    }, 4000);
  }
})();
