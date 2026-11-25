(function(root){
function shuffle(a,rng){rng=rng||Math.random;a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
// rows: [q, correct, [wrong x3], level]; seen: array of indexes already shown for this pool
function pool(rows,level){const out=[];rows.forEach((r,i)=>{if(level==='mixed'||r[3]===level)out.push(i);});return out;}
function pickQuestions(rows,level,n,seen,rng){const all=pool(rows,level);let seenSet=new Set(seen||[]);let fresh=all.filter(i=>!seenSet.has(i));
 if(fresh.length<n){seenSet=new Set();fresh=all;}
 const picked=shuffle(fresh,rng).slice(0,Math.min(n,fresh.length));
 return {indexes:picked,seen:[...seenSet].concat(picked)};}
function present(row,rng){const opts=shuffle([row[1]].concat(row[2]),rng);return {q:row[0],options:opts,answer:opts.indexOf(row[1]),level:row[3]};}
const api={shuffle,pool,pickQuestions,present};
if(typeof module!=='undefined')module.exports=api;else root.QZ=api;
})(typeof window!=='undefined'?window:globalThis);
