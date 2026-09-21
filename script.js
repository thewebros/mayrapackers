
const WA = "918603691787";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Vikash+Gol+Chakkar+near+Vikash+Sirat+Nagar+Ranchi+Neuri+Jharkhand+835217";
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function toast(msg){
  let t=$(".toast");
  if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}
  t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>t.classList.remove("show"),2600);
}
function wa(message){
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(message)}`,"_blank");
}
function call(){ window.location.href="tel:+918603691787"; }
function maps(){ window.open(MAPS,"_blank"); }

document.addEventListener("DOMContentLoaded",()=>{
  const nav=$(".nav"), menu=$(".menu");
  menu?.addEventListener("click",()=>nav.classList.toggle("open"));
  $$(".navlinks a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  // Scroll reveal
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}})
  },{threshold:.12});
  $$(".reveal").forEach((el,i)=>{el.style.transitionDelay=(Math.min(i%5,4)*70)+"ms";io.observe(el)});

  // Parallax
  const pars=$$(".parallax");
  let ticking=false;
  function parallax(){
    const y=window.scrollY;
    pars.forEach(el=>{
      const speed=parseFloat(el.dataset.speed||".12");
      const rect=el.getBoundingClientRect();
      if(rect.bottom>0 && rect.top<innerHeight) el.style.transform=`translate3d(0,${(y-(rect.top+y))*speed}px,0)`;
    });
    ticking=false;
  }
  window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});
  parallax();

  // Cursor feedback
  const dot=$(".cursor-dot");
  if(dot){
    window.addEventListener("mousemove",e=>{dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px"});
    $$("a,button,.card,.social").forEach(el=>{
      el.addEventListener("mouseenter",()=>{dot.style.width="28px";dot.style.height="28px"});
      el.addEventListener("mouseleave",()=>{dot.style.width="14px";dot.style.height="14px"});
    });
  }

  // Magnetic buttons
  $$(".magnetic").forEach(btn=>{
    btn.addEventListener("mousemove",e=>{
      const r=btn.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
      btn.style.transform=`translate(${x*.10}px,${y*.10}px)`;
    });
    btn.addEventListener("mouseleave",()=>btn.style.transform="");
  });

  // Generic actions
  $$("[data-wa]").forEach(el=>el.addEventListener("click",()=>wa(el.dataset.wa)));
  $$("[data-call]").forEach(el=>el.addEventListener("click",call));
  $$("[data-maps]").forEach(el=>el.addEventListener("click",maps));

  // Quote form -> WhatsApp
  const form=$("#quoteForm");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(form);
    const name=fd.get("name"), phone=fd.get("phone"), from=fd.get("from"), to=fd.get("to"), type=fd.get("type"), date=fd.get("date"), details=fd.get("details");
    const msg=`Hello Mayra Packers And Movers, I want a quotation.%0A%0AName: ${name}%0APhone: ${phone}%0AFrom: ${from}%0ATo: ${to}%0AService: ${type}%0APreferred date: ${date||"Not specified"}%0ADetails: ${details||"Not specified"}`.replaceAll("%0A","\n");
    wa(msg);
    toast("Quotation details opened in WhatsApp.");
    form.reset();
  });

  // Contact form same WhatsApp flow
  const cform=$("#contactForm");
  cform?.addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(cform);
    wa(`Hello Mayra Packers And Movers, I have an enquiry.\n\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nMessage: ${fd.get("message")}`);
    toast("Your enquiry is ready in WhatsApp.");
    cform.reset();
  });

  // Click feedback for buttons
  $$("button.btn").forEach(b=>b.addEventListener("click",()=>{b.animate([{transform:"scale(.97)"},{transform:"scale(1)"}],{duration:220,easing:"cubic-bezier(.2,.8,.2,1)"})}));

  // Set current year
  $$(".year").forEach(x=>x.textContent=new Date().getFullYear());
});
