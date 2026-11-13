window.metneAtla=function(a,nth){
  var kok=document.getElementById('metin');
  if(!kok||!a) return false;
  var w=document.createTreeWalker(kok,NodeFilter.SHOW_TEXT,null,false);
  var n,sira=nth||0;
  while((n=w.nextNode())){
    var v=n.nodeValue,i=-1;
    while((i=v.indexOf(a,i+1))!==-1){
      if(sira===0){
        var r=document.createRange();
        r.setStart(n,i);
        r.setEnd(n,i+a.length);
        var mk=document.createElement('mark');
        r.surroundContents(mk);
        mk.scrollIntoView({block:'center'});
        return true;
      }
      sira--;
    }
  }
  return false;
};
