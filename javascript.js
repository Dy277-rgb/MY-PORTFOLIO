// ---- Edit your content here ----
var CONFIG = {
  email: "dythan32@gmail.com", // my email address
  formEndpoint: "", // e.g. "https://api.web3forms.com/submit" or your Formspree URL
  accessKey: "",    // Web3Forms access key (leave empty for Formspree)
  photo: "", // your photo: a file path like "me.jpg" (see steps) or a data URL
  socials: [
    {name:"GitHub", url:"https://github.com/Dy277-rgb/"},
    {name:"TikTok", url:"https://tiktok.com/@boydy196"},
    {name:"Facebook", url:"https://facebook.com/profile.php?id=100065047929586&mibextid=ZbWKwL"},
    {name:"Telegram", url:"https://t.me/Dy12C"},
    {name:"My Website", url:"https://luxe-store-psi.vercel.app/"}
  ],
  skills: [["HTML & CSS",95],["JavaScript",90],["React",85],["Accessibility",80],["Node.js",70],["Photography",75]],
  roles: ["fast websites.", "accessible interfaces.", "design systems.", "things people use."],
  projects: [
    {title:"Market Maps", year:2026, type:"Web app", desc:"Interactive map of local markets with live opening hours.", tags:["JavaScript","Maps"], url:"#"},
    {title:"Quiet Notes", year:2025, type:"Web app", desc:"A distraction-free notes app that works offline.", tags:["React","PWA"], url:"#"},
    {title:"Bloom Café", year:2025, type:"Website", desc:"Brand site and online ordering for a neighborhood café.", tags:["HTML","CSS"], url:"#"},
    {title:"Pixel Kit", year:2024, type:"Open source", desc:"A small library of accessible UI components.", tags:["TypeScript","A11y"], url:"#"}
  ]
};

// ---- Theme toggle ----
(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  try{var saved=localStorage.getItem('theme'); if(saved) root.setAttribute('data-theme',saved);}catch(e){}
  btn.addEventListener('click',function(){
    var dark = root.getAttribute('data-theme')==='dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
  });
})();

// ---- Typing role line ----
(function(){
  var el=document.getElementById('word'), roles=CONFIG.roles, i=0, j=0, del=false;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=roles[0];return;}
  function tick(){
    var w=roles[i];
    j += del ? -1 : 1;
    el.textContent=w.slice(0,j);
    var d = del ? 35 : 75;
    if(!del && j===w.length){del=true; d=1600;}
    else if(del && j===0){del=false; i=(i+1)%roles.length; d=300;}
    setTimeout(tick,d);
  }
  tick();
})();

// ---- Projects + filter ----
(function(){
  var list=document.getElementById('projects'), box=document.getElementById('filters');
  var types=['All'].concat(CONFIG.projects.map(function(p){return p.type}).filter(function(t,i,a){return a.indexOf(t)===i}));
  var current='All';
  function render(){
    list.innerHTML='';
    var shown=CONFIG.projects.filter(function(p){return current==='All'||p.type===current});
    if(!shown.length){list.innerHTML='<li class="empty">No projects in this category yet.</li>';return;}
    shown.forEach(function(p){
      var li=document.createElement('li'); li.className='project';
      li.innerHTML='<span class="yr">'+p.year+'</span><div><h3><a href="'+p.url+'">'+p.title+'</a></h3><p>'+p.desc+'</p></div><div class="tags">'+p.tags.map(function(t){return '<span>'+t+'</span>'}).join('')+'</div>';
      list.appendChild(li);
    });
  }
  types.forEach(function(t){
    var b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=t;
    b.setAttribute('aria-pressed',t===current);
    b.addEventListener('click',function(){
      current=t;
      box.querySelectorAll('.chip').forEach(function(c){c.setAttribute('aria-pressed',c===b)});
      render();
    });
    box.appendChild(b);
  });
  render();
})();

// ---- Contact form (opens the visitor's email app) ----
(function(){
  var f=document.getElementById('form'), status=document.getElementById('status');
  function setErr(id,msg){f.querySelector('[data-for="'+id+'"]').textContent=msg;}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('name').value.trim();
    var m=document.getElementById('email').value.trim();
    var t=document.getElementById('msg').value.trim();
    var ok=true;
    setErr('name',''); setErr('email',''); setErr('msg','');
    if(!n){setErr('name','Enter your name.');ok=false;}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)){setErr('email','Enter a valid email address.');ok=false;}
    if(t.length<10){setErr('msg','Write at least 10 characters.');ok=false;}
    if(!ok){status.textContent='';return;}
    var body=encodeURIComponent(t+'\n\n— '+n+' ('+m+')');
    if(CONFIG.formEndpoint){
      var sendBtn=f.querySelector('button[type=submit]');
      sendBtn.disabled=true; status.textContent='Sending…';
      fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({access_key:CONFIG.accessKey||undefined,name:n,email:m,message:t})})
        .then(function(r){if(!r.ok) throw new Error('Request failed'); return r.json().catch(function(){return {};});})
        .then(function(data){if(data.success===false) throw new Error('Form service rejected the message'); f.reset(); status.textContent='Thanks! Your message was sent.';})
        .catch(function(){status.textContent='Could not send. Please email me at '+CONFIG.email+'.';})
        .then(function(){sendBtn.disabled=false;});
      return;
    }
    window.location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent('Message from '+n)+'&body='+body;
    status.textContent='Opening your email app…';
  });
})();

// ---- Skills: bars, numbers and rows animate every time you scroll to them ----
(function(){
  var ul=document.getElementById('skills');
  CONFIG.skills.forEach(function(s,i){
    var li=document.createElement('li');
    li.style.transitionDelay=(i*90)+'ms';
    li.innerHTML='<div class="sk-top"><span>'+s[0]+'</span><span class="pct">0%</span></div><div class="bar"><i></i></div>';
    li.querySelector('i').style.transitionDelay=(i*90+200)+'ms';
    ul.appendChild(li);
  });
  var items=ul.querySelectorAll('li');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(on){
    ul.classList.toggle('go',on);
    items.forEach(function(li,i){
      var pct=CONFIG.skills[i][1], bar=li.querySelector('i'), num=li.querySelector('.pct');
      bar.style.width=on?pct+'%':'0';
      if(!on||reduce){num.textContent=(on?pct:0)+'%';return;}
      var start=null, delay=i*90+200;
      (function step(t){
        if(start===null) start=t+delay;
        var p=Math.max(0,Math.min(1,(t-start)/1100));
        num.textContent=Math.round(pct*(1-Math.pow(1-p,3)))+'%';
        if(p<1&&ul.classList.contains('go')) requestAnimationFrame(step);
      })(performance.now());
    });
  }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){show(es[0].isIntersecting);},{threshold:.25}).observe(ul);
  }else{show(true);}
})();

// ---- Photo (set CONFIG.photo) ----
(function(){
  if(CONFIG.photo) document.getElementById('photo').src=CONFIG.photo;
})();

// ---- Social links ----
(function(){
  document.querySelectorAll('.socials').forEach(function(ul){
    CONFIG.socials.forEach(function(s){
      var li=document.createElement('li'), a=document.createElement('a');
      a.href=s.url; a.textContent=s.name; a.target='_blank'; a.rel='noopener noreferrer';
      li.appendChild(a); ul.appendChild(li);
    });
  });
})();

document.getElementById('year').textContent=new Date().getFullYear();