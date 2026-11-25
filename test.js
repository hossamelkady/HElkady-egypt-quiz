const assert=require('assert');const fs=require('fs');const vm=require('vm');const Q=require('./logic.js');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data/index.js','utf8'),ctx);
const cats=ctx.window.QUIZ_CATS;
for(const c of cats){vm.runInContext(fs.readFileSync('data/'+c.id+'.js','utf8'),ctx);
 const rows=ctx.window.QUIZ_DATA[c.id];assert.strictEqual(rows.length,c.count);
 const seen=new Set();
 for(const r of rows){assert.strictEqual(r.length,4);assert.ok(!seen.has(r[0]),'dup '+r[0]);seen.add(r[0]);
  assert.strictEqual(new Set([r[1]].concat(r[2])).size,4,'options '+r[0]);assert.ok(['easy','medium','hard'].includes(r[3]));}
 console.log(c.id,rows.length);}
// verify math answers independently
const math=ctx.window.QUIZ_DATA.math;
for(const r of math){let e=r[0].replace('ما ناتج ','').replace('؟','').trim(),v;
 let m;
 if(m=e.match(/^(\d+)% من (\d+)$/))v=+m[1]*+m[2]/100;
 else if(m=e.match(/^√(\d+)$/))v=Math.sqrt(+m[1]);
 else if(m=e.match(/^(\d+)²$/))v=m[1]*m[1];
 else if(m=e.match(/^\((\d+) \+ (\d+)\) × (\d+)$/))v=(+m[1]+ +m[2])*+m[3];
 else if(m=e.match(/^(\d+) ([+−×]) (\d+)$/))v=m[2]==='+'?+m[1]+ +m[3]:m[2]==='−'?m[1]-m[3]:m[1]*m[3];
 else assert.fail('unparsed '+e);
 assert.strictEqual(String(v),r[1],e);}
// units verify
const units=ctx.window.QUIZ_DATA.units;const F={'كيلومتر>متر':1000,'متر>سنتيمتر':100,'سنتيمتر>ملليمتر':10,'كيلوجرام>جرام':1000,'طن>كيلوجرام':1000,'ساعة>دقيقة':60,'دقيقة>ثانية':60,'يوم>ساعة':24,'أسبوع>يوم':7,'لتر>ملليلتر':1000,'سنة>شهر':12,'ساعة>ثانية':3600,'يوم>دقيقة':1440,'متر>ملليمتر':1000,'كيلومتر>سنتيمتر':100000,'جنيه>قرش':100,'قدم>بوصة':12,'ياردة>قدم':3};
for(const r of units){const m=r[0].match(/^كم (\S+) في ([\d.]+) (\S+)؟$/);assert.ok(m,r[0]);
 const [,to,v,from]=m;const k=F[from+'>'+to];
 if(k){assert.ok(Math.abs(+v*k-+r[1])<1e-6,r[0]);}
 else{const k2=F[to+'>'+from];assert.ok(k2,r[0]);assert.ok(Math.abs(+v/k2-+r[1])<1e-6,r[0]);}}
// engine
const rows=ctx.window.QUIZ_DATA.egypt;let seenIdx=[];const shown=new Set();
for(let i=0;i<4;i++){const p=Q.pickQuestions(rows,'mixed',10,seenIdx,Math.random);seenIdx=p.seen;p.indexes.forEach(x=>{assert.ok(!shown.has(x));shown.add(x);});}
const pr=Q.present(rows[0]);assert.strictEqual(pr.options[pr.answer],rows[0][1]);assert.strictEqual(pr.options.length,4);
assert.ok(Q.pickQuestions(rows,'hard',10,[],Math.random).indexes.every(i=>rows[i][3]==='hard'));
console.log('quiz tests passed');
