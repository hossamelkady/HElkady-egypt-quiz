const $=id=>document.getElementById(id);
const load=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}};
function loadCat(id){return new Promise((res,rej)=>{if(window.QUIZ_DATA&&window.QUIZ_DATA[id])return res(window.QUIZ_DATA[id]);const s=document.createElement('script');s.src='data/'+id+'.js';s.onload=()=>res(window.QUIZ_DATA[id]);s.onerror=rej;document.head.appendChild(s);});}
function menu(){$('menu').style.display='block';$('game').style.display='none';$('end').style.display='none';const L=$('cats');L.innerHTML='';
 QUIZ_CATS.forEach(c=>{const d=document.createElement('div');d.className='card cat';const best=load('quiz-best-'+c.id,0);
  d.innerHTML='<div><b>'+c.icon+' '+c.name+'</b><div class="muted">'+c.count+' سؤال | أفضل نتيجة: '+best+'</div></div>';
  const b=document.createElement('button');b.textContent='ابدأ';b.onclick=()=>start(c);d.appendChild(b);L.appendChild(d);});}
let cur,qs,i,score,cat;
async function start(c){cat=c;const rows=await loadCat(c.id);const lvl=$('level').value;const n=+$('n').value;
 const key='quiz-seen-'+c.id+'-'+lvl;const p=QZ.pickQuestions(rows,lvl,n,load(key,[]));localStorage.setItem(key,JSON.stringify(p.seen));
 if(!p.indexes.length){alert('مفيش أسئلة في المستوى ده');return;}
 qs=p.indexes.map(ix=>QZ.present(rows[ix]));i=0;score=0;$('menu').style.display='none';$('end').style.display='none';$('game').style.display='block';show();}
function show(){const q=qs[i];$('prog').textContent='سؤال '+(i+1)+' من '+qs.length;$('score').textContent='النقاط: '+score;$('q').textContent=q.q;$('next').style.display='none';
 const O=$('opts');O.innerHTML='';q.options.forEach((o,k)=>{const b=document.createElement('button');b.className='opt';b.textContent=o;b.onclick=()=>pick(k,O);O.appendChild(b);});}
function pick(k,O){const q=qs[i];[...O.children].forEach((b,j)=>{b.disabled=true;if(j===q.answer)b.classList.add('ok');else if(j===k)b.classList.add('bad');});if(k===q.answer)score++;$('score').textContent='النقاط: '+score;$('next').style.display='block';$('next').textContent=i+1<qs.length?'التالي':'النتيجة';}
$('next').onclick=()=>{i++;if(i<qs.length)return show();$('game').style.display='none';$('end').style.display='block';$('res').textContent='نتيجتك '+score+' من '+qs.length;
 const k='quiz-best-'+cat.id;if(score>load(k,0))localStorage.setItem(k,score);};
$('again').onclick=menu;menu();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
