(function(){
function el(t,x,c){var e=document.createElement(t);if(x!=null)e.textContent=x;if(c)e.style.cssText=c;return e}
function kisi(ad,rol){var d=el('div',null,'margin:10px 0');
 d.append(el('div',ad,'font-weight:bold;font-size:17px'),el('div',rol,'color:var(--soluk);font-size:13px'));return d}
function kur(){
 if(document.getElementById('yapanlar'))return;
 var k=el('div',null,'max-width:520px;margin:30px auto 20px;padding:16px;text-align:center;border:1px solid #d4af37;border-radius:12px;background:var(--kart);color:var(--yazi)');
 k.id='yapanlar';
 k.appendChild(el('h3','👥 Yapanlar','color:#d4af37;margin:0 0 8px'));
 k.appendChild(kisi('Dawut Mollayew','Kurucu ve proje sahibi'));
 k.appendChild(kisi('Claude (Anthropic)','Kod yardımcısı'));
 k.appendChild(el('div','Small site, big minds.','color:#d4af37;font-size:13px;margin-top:10px'));
 document.body.appendChild(k)}
kur();setTimeout(kur,800);
})();
