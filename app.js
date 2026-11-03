(()=>{
const $=id=>document.getElementById(id);
const passages={
 school:"Reading is an important skill that helps us learn new things. It allows us to understand people, places, and ideas. Students who read regularly can improve their vocabulary and communication skills. Even a few minutes of reading each day can make a difference.",
 environment:"Our environment gives us air, water, food, and a place to live. We can protect it by planting trees, saving water, and reducing waste. Small actions can create positive changes when people work together. Every student can help keep the community clean and safe.",
 technology:"Technology helps us communicate, study, and find information. However, we must use it wisely. We should check whether online information is reliable and protect our personal details. Balanced use of technology can support learning and creativity."
};
const norm=s=>(s.toLowerCase().match(/[a-z0-9']+/g)||[]);
let recognition=null,running=false,last=null,finalText='';
function getPassage(){return $('choice').value==='custom'?$('custom').value:passages[$('choice').value]}
function refresh(){ $('customBox').hidden=$('choice').value!=='custom';$('passage').textContent=getPassage()||'Enter a passage above.';$('report').hidden=true}
$('choice').addEventListener('change',refresh);$('custom').addEventListener('input',refresh);refresh();
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
$('support').textContent=SR?'Speech recognition appears available. Results still require teacher checking.':'Live speech recognition is unavailable in this browser. Type your transcript and select Check my reading.';
function align(a,b){
let n=a.length,m=b.length,d=Array.from({length:n+1},()=>Array(m+1).fill(0));
for(let i=0;i<=n;i++)d[i][0]=i;for(let j=0;j<=m;j++)d[0][j]=j;
for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
let i=n,j=m,o=[];while(i||j){if(i&&j&&d[i][j]===d[i-1][j-1]+(a[i-1]===b[j-1]?0:1)){o.unshift({t:a[i-1]===b[j-1]?'match':'sub',a:a[i-1],b:b[j-1]});i--;j--;}else if(i&&d[i][j]===d[i-1][j]+1){o.unshift({t:'omit',a:a[i-1]});i--;}else{o.unshift({t:'extra',b:b[j-1]});j--;}}return o;
}
$('start').onclick=()=>{
if(!SR){$('support').textContent='Type your reading transcript in the box, then check it.';$('transcript').focus();return}
if(running)return;
recognition=new SR();recognition.continuous=true;recognition.interimResults=true;recognition.lang='en-US';finalText='';$('transcript').value='';running=true;
recognition.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){let t=e.results[i][0].transcript;if(e.results[i].isFinal)finalText+=t+' ';else interim+=t;}$('transcript').value=(finalText+interim).trim()};
recognition.onerror=e=>{$('support').textContent='Recognition issue: '+e.error+'. Check microphone permission or type the transcript.'};
recognition.onend=()=>{running=false;$('start').disabled=false;$('finish').disabled=true;$('status').textContent='Session ended'};
try{recognition.start();$('start').disabled=true;$('finish').disabled=false;$('status').textContent='Listening…'}catch(e){running=false;$('support').textContent='Could not start. Check microphone permission or type the transcript.'}
};
$('finish').onclick=()=>{running=false;try{recognition&&recognition.stop()}catch(e){}$('start').disabled=false;$('finish').disabled=true;$('status').textContent='Finished'};
$('listen').onclick=()=>{if(!speechSynthesis){$('support').textContent='Text-to-speech is unavailable.';return}speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(getPassage());u.lang='en-US';speechSynthesis.speak(u)};
$('stopVoice').onclick=()=>speechSynthesis&&speechSynthesis.cancel();
$('clear').onclick=()=>{$('transcript').value='';$('report').hidden=true;$('status').textContent='Ready'};
$('analyze').onclick=()=>{
if(running){$('support').textContent='Finish the reading first.';return}
let a=norm(getPassage()),b=norm($('transcript').value);if(!a.length||!b.length){$('support').textContent='Choose a passage and provide a transcript first.';return}
let ops=align(a,b),subs=ops.filter(x=>x.t==='sub').length,omits=ops.filter(x=>x.t==='omit').length,extra=ops.filter(x=>x.t==='extra').length,reps=0;
for(let k=1;k<b.length;k++)if(b[k]===b[k-1])reps++;
let matches=ops.filter(x=>x.t==='match').length,acc=Math.round(matches/a.length*100);
$('accuracy').textContent=acc+'%';$('subs').textContent=subs;$('omits').textContent=omits;$('reps').textContent=reps;
$('marked').replaceChildren();ops.forEach(x=>{let s=document.createElement('span');s.className='word '+(x.t==='match'?'match':'flag');s.textContent=x.t==='omit'?'['+x.a+' – possible omission]':x.t==='sub'?x.a+' → '+x.b:x.t==='extra'?'['+x.b+' – extra word]':x.a;$('marked').append(s)});
$('feedback').textContent=acc>=95?'Great effort! Review highlighted words with your teacher.':acc>=80?'Good practice. Review highlighted words with your teacher and try again.':'Keep practicing one sentence at a time. Listen to the model and ask your teacher for help.';
$('vsub').value=subs;$('vomit').value=omits;$('vrep').value=reps;$('vmis').value=0;
last={learner:$('learner').value||'Not provided',passage:$('choice').selectedOptions[0].text,accuracy:acc,subs,omits,reps,transcript:$('transcript').value};$('report').hidden=false;$('report').scrollIntoView({behavior:'smooth'});
};
$('print').onclick=()=>window.print();
$('again').onclick=()=>{$('transcript').value='';$('report').hidden=true;$('status').textContent='Ready';$('start').focus()};
$('csv').onclick=()=>{
if(!last){$('support').textContent='Complete a reading check first.';return}
let rows=[['READWISE Teacher Review'],['Learner code',last.learner],['Passage',last.passage],['Estimated text match',last.accuracy+'%'],['Possible substitutions',last.subs],['Possible omissions',last.omits],['Possible repetitions',last.reps],['Teacher verified mispronunciations',$('vmis').value],['Teacher verified substitutions',$('vsub').value],['Teacher verified repetitions',$('vrep').value],['Teacher verified omissions',$('vomit').value],['Teacher notes',$('notes').value],['Transcript',last.transcript],['Reminder','Automated flags are tentative and require teacher verification.']];
let csv=rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');let blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='READWISE_teacher_review.csv';a.click();URL.revokeObjectURL(url);
};
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();