// Bond — motor de la animación (canvas). Lo usa BondHero.jsx; no hace falta tocarlo.
export function mountBondHero(root, logoSrc) {

// geometría del lazo medida sobre el logo (fracciones del ancho/alto de la imagen)
const G = { cx:.5, cy:.495, A:.3516, B:.28, brush:.16 };

const hero = root;
const canvas = root.querySelector('.bh-stage');
const ctx = canvas.getContext('2d');
const box = root.querySelector('.bh-logo-box');
const bond = root.querySelector('.bh-bond:not(.bh-reflect)');
const bondR = root.querySelector('.bh-bond.bh-reflect');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// grano de película
(() => {
  const n = document.createElement('canvas'); n.width = n.height = 160;
  const c = n.getContext('2d'); const d = c.createImageData(160,160);
  for (let i=0;i<d.data.length;i+=4){ const v = Math.random()*255; d.data[i]=d.data[i+1]=d.data[i+2]=v; d.data[i+3]=255; }
  c.putImageData(d,0,0);
  root.querySelector('.bh-grain').style.backgroundImage = `url(${n.toDataURL()})`;
})();

const img = new Image();
let W=0,H=0,DPR=1, L={x:0,y:0,w:0,h:0};
let particles=[], dust=[], samples=null;
let mask=document.createElement('canvas'), mctx=mask.getContext('2d');
let hl=document.createElement('canvas'), hctx=hl.getContext('2d');
let t0=0, raf=0;

// tiempos (ms)
const T = { gather:300, strokeStart:1300, strokeDur:2500, fly:1150, full:4150, fullDur:900, word:4350, spots:5000, done:5900 };

const ease = x => x<.5 ? 4*x*x*x : 1-Math.pow(-2*x+2,3)/2;
const easeOut = x => 1-Math.pow(1-x,3);
const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));

// punto del lazo (Gerono) en coords de pantalla, u in [0,1]; empieza en el extremo izquierdo
function curve(u){
  const t = Math.PI + u*Math.PI*2;
  return {
    x: L.x + (G.cx + G.A*Math.cos(t)) * L.w,
    y: L.y + G.cy*L.h + G.B*L.w*Math.sin(t)*Math.cos(t)
  };
}

function layout(){
  DPR = Math.min(window.devicePixelRatio||1, 2);
  const r = hero.getBoundingClientRect();
  W = r.width; H = r.height;
  canvas.width = Math.round(W*DPR); canvas.height = Math.round(H*DPR);
  const b = box.getBoundingClientRect();
  L = { x:b.left-r.left, y:b.top-r.top, w:b.width, h:b.height };
  mask.width = hl.width = Math.round(L.w*DPR); mask.height = hl.height = Math.round(L.h*DPR);
  makeDot();
}

function sampleLogo(){
  // muestrea píxeles opacos de la cinta (no del halo)
  const sw = 320, sh = Math.round(320*img.height/img.width);
  const c = document.createElement('canvas'); c.width=sw; c.height=sh;
  const cx = c.getContext('2d'); cx.drawImage(img,0,0,sw,sh);
  const d = cx.getImageData(0,0,sw,sh).data;
  // tabla de la curva en coords normalizadas para asignar orden de trazo
  const N=600, tab=[];
  for(let i=0;i<=N;i++){ const t=Math.PI+i/N*Math.PI*2; tab.push([G.cx+G.A*Math.cos(t), G.cy + G.B*(img.width/img.height)*Math.sin(t)*Math.cos(t)]); }
  const out=[];
  for(let y=0;y<sh;y+=1) for(let x=0;x<sw;x+=1){
    const i=(y*sw+x)*4; if(d[i+3]<215) continue;
    if(Math.random()>.55) continue;
    const nx=x/sw, ny=y/sh;
    let best=0,bd=1e9;
    for(let k=0;k<=N;k+=2){ const dx=tab[k][0]-nx, dy=(tab[k][1]-ny)*img.height/img.width; const dd=dx*dx+dy*dy; if(dd<bd){bd=dd;best=k;} }
    // brillo realzado para que el verde no se pierda en lo oscuro
    let r=d[i],g=d[i+1],bb=d[i+2];
    const lum=(r+g+bb)/3; const k2 = lum<110 ? 1.9 : 1.15;
    out.push({ nx, ny, u: best/N, r:Math.min(255,r*k2), g:Math.min(255,g*k2), b:Math.min(255,bb*k2) });
  }
  return out;
}

function build(){
  particles = samples.map(s => {
    // origen: disperso en el espacio, con profundidad
    const ang = Math.random()*Math.PI*2, rad = (.35 + Math.random()*.9) * Math.max(W,H)*.6;
    const z = Math.random();
    // frente del trazo algo irregular (ruido espacial suave + azar)
    const n = .5*Math.sin(s.nx*23+s.ny*7) + .5*Math.sin(s.nx*11-s.ny*29+1.3);
    const arrive = T.strokeStart + s.u*T.strokeDur + n*90 + (Math.random()-.5)*160;
    const strokeEnd = T.strokeStart + T.strokeDur;
    // el comienzo del trazo se queda difuso y solo se solidifica al cerrarse el lazo
    const fade = s.u < .14 ? Math.max(500, strokeEnd + 250 - arrive) * (1 - s.u/.14*.5) + 0 : 520;
    return {
      ...s,
      ox: W/2 + Math.cos(ang)*rad, oy: H/2 + Math.sin(ang)*rad*.75,
      z, swirl:(Math.random()-.5)*2, phase:Math.random()*6.28,
      arrive, start: arrive - T.fly*(.8+Math.random()*.4),
      appear: Math.random()*900,
      sparkle: Math.random() < .12,
      fade, inMask: Math.random() < .3
    };
  });
  dust = Array.from({length: Math.round(Math.min(140, W*H/9000))}, () => ({
    x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.06, vy:-(.02+Math.random()*.08),
    s:.4+Math.random()*1.2, a:.05+Math.random()*.22, ph:Math.random()*6.28
  }));
}

// máscara: cada partícula aterrizada revela su zona de forma gradual (sin bordes duros)
const dot=document.createElement('canvas');
function makeDot(){
  const r=Math.max(6, L.w*.022*DPR); dot.width=dot.height=Math.ceil(r*2);
  const c=dot.getContext('2d'); const g=c.createRadialGradient(r,r,0,r,r,r);
  g.addColorStop(0,'rgba(0,0,0,.6)'); g.addColorStop(.55,'rgba(0,0,0,.25)'); g.addColorStop(1,'rgba(0,0,0,0)');
  c.fillStyle=g; c.fillRect(0,0,r*2,r*2);
}
function drawMask(t){
  const lag=120, d=dot.width/2, mw=mask.width, mh=mask.height;
  mctx.setTransform(1,0,0,1,0,0);
  mctx.globalCompositeOperation='source-over';
  mctx.clearRect(0,0,mw,mh);
  for(const p of particles){
    if(!p.inMask) continue;
    const r = (t - p.arrive - lag)/p.fade;
    if(r<=0) continue;
    const k = Math.min(1,r);
    mctx.globalAlpha = k*k*(3-2*k)*.8;
    mctx.drawImage(dot, p.nx*mw-d, p.ny*mh-d);
  }
  mctx.globalAlpha=1;
  mctx.globalCompositeOperation='source-in';
  mctx.drawImage(img,0,0,mw,mh);
}

function drawSpots(time, strength){
  // focos de luz que se desplazan sobre el logo (solo donde hay logo)
  const s = time/1000;
  const spots = [
    { x: .5 + .42*Math.sin(s*.31), y: .38 + .14*Math.sin(s*.23+1.3), r:.30, a:.85 },
    { x: .5 + .40*Math.sin(s*.19+2.4), y: .62 + .12*Math.cos(s*.27), r:.24, a:.55 }
  ];
  hctx.setTransform(DPR,0,0,DPR,0,0);
  hctx.globalCompositeOperation='source-over';
  hctx.clearRect(0,0,L.w,L.h);
  hctx.globalCompositeOperation='lighter';
  for(const sp of spots){
    const gx=sp.x*L.w, gy=sp.y*L.h, gr=sp.r*L.w;
    const g=hctx.createRadialGradient(gx,gy,0,gx,gy,gr);
    g.addColorStop(0,`rgba(255,246,220,${sp.a})`); g.addColorStop(.45,`rgba(255,226,160,${sp.a*.35})`); g.addColorStop(1,'rgba(255,220,150,0)');
    hctx.fillStyle=g; hctx.fillRect(0,0,L.w,L.h);
  }
  hctx.globalCompositeOperation='destination-in';
  hctx.drawImage(img,0,0,L.w,L.h);
  ctx.globalCompositeOperation='lighter';
  ctx.globalAlpha=.42*strength;
  ctx.drawImage(hl,L.x,L.y,L.w,L.h);
  ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';

  // el mismo foco principal recorre el texto
  const wr = bond.getBoundingClientRect(), hr = hero.getBoundingClientRect();
  const fx = L.x + spots[0].x*L.w + hr.left;
  const lx = ((fx - wr.left)/wr.width)*100;
  const ly = 35 + 25*Math.sin(s*.4);
  for(const el of [bond,bondR]){ el.style.setProperty('--lx', lx.toFixed(1)+'%'); el.style.setProperty('--ly', ly.toFixed(1)+'%'); el.style.setProperty('--li', strength.toFixed(3)); }
}

function sweepText(k){
  // destello de entrada que cruza BOND
  const lx = -20 + k*140;
  for(const el of [bond,bondR]){ el.style.setProperty('--lx', lx+'%'); el.style.setProperty('--ly','42%'); el.style.setProperty('--li', (Math.sin(k*Math.PI)).toFixed(3)); }
}

// deriva continua hacia el centro: nunca se detiene antes de ser atrapada por el trazo
function drift(p,t){
  const pull = .55*(1-Math.exp(-Math.max(0,t)/4200));
  return [ p.ox + (W/2-p.ox)*pull + Math.sin(t/1300+p.phase)*5*(1-p.z),
           p.oy + (H/2-p.oy)*pull + Math.cos(t/1500+p.phase)*5*(1-p.z) ];
}

function frame(now){
  const t = now - t0;
  ctx.setTransform(DPR,0,0,DPR,0,0);
  ctx.clearRect(0,0,W,H);

  // polvo ambiental
  ctx.globalCompositeOperation='lighter';
  for(const d of dust){
    d.x+=d.vx; d.y+=d.vy; if(d.y<-5){d.y=H+5;d.x=Math.random()*W;}
    const a = d.a*(.6+.4*Math.sin(now/900+d.ph))*clamp(t/1500);
    ctx.fillStyle=`rgba(240,214,150,${a})`; ctx.fillRect(d.x,d.y,d.s,d.s);
  }

  // logo revelado por el trazo
  const pStroke = clamp((t - T.strokeStart)/T.strokeDur);
  const fullK = clamp((t - T.full)/T.fullDur);
  ctx.globalCompositeOperation='source-over';
  if(fullK<1 && t>T.strokeStart){
    drawMask(t);
    ctx.globalAlpha = .92*(1-fullK);
    ctx.drawImage(mask,L.x,L.y,L.w,L.h);
    ctx.globalAlpha = 1;
  }
  if(fullK>0){
    // halo residual detrás del logo: se queda encendido, tenue
    const hk = easeOut(clamp((t - T.full)/2200));
    const hx=L.x+L.w/2, hy=L.y+L.h*.5, hr=L.w*.62;
    const hg = ctx.createRadialGradient(hx,hy,0,hx,hy,hr);
    hg.addColorStop(0,`rgba(255,226,160,${.075*hk})`); hg.addColorStop(.5,`rgba(232,184,74,${.035*hk})`); hg.addColorStop(1,'rgba(232,184,74,0)');
    ctx.globalCompositeOperation='lighter'; ctx.fillStyle=hg; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=easeOut(fullK); ctx.drawImage(img,L.x,L.y,L.w,L.h); ctx.globalAlpha=1;
  }

  // partículas
  if(t < T.full + 1200){
    ctx.globalCompositeOperation='lighter';
    for(const p of particles){
      const tx = L.x + p.nx*L.w, ty = L.y + p.ny*L.h;
      let x,y,a,size;
      const vis = clamp((t - p.appear)/900);
      if(t < p.start){
        // deriva lenta, condensándose hacia el centro
        const q = drift(p,t);
        x = q[0]; y = q[1];
        a = (.18+.35*(1-p.z))*vis; size = .6+1.4*(1-p.z);
      } else if(t < p.arrive){
        const k = ease(clamp((t-p.start)/(p.arrive-p.start)));
        const q0 = drift(p,p.start), sx=q0[0], sy=q0[1];
        // arco curvo, como arrastrado por el pincel
        const mx=(sx+tx)/2, my=(sy+ty)/2, dx=tx-sx, dy=ty-sy;
        const cx=mx - dy*.35*p.swirl, cy=my + dx*.35*p.swirl;
        const u=1-k; x = u*u*sx + 2*u*k*cx + k*k*tx; y = u*u*sy + 2*u*k*cy + k*k*ty;
        a = (.35 + .65*k)*vis; size = (.6+1.4*(1-p.z))*(1-k) + 1.3*k;
      } else {
        const k = clamp((t-p.arrive)/650);
        x = tx; y = ty; a = (1-k)*(p.sparkle?1:.75); size = 1.3 + (p.sparkle? (1-k)*2.2 : 0);
        if(a<=0) continue;
      }
      ctx.fillStyle=`rgba(${p.r|0},${p.g|0},${p.b|0},${a.toFixed(3)})`;
      ctx.fillRect(x-size/2,y-size/2,size,size);
    }
    // cabeza del pincel
    if(pStroke>0 && pStroke<1){
      const h = curve(pStroke);
      const g = ctx.createRadialGradient(h.x,h.y,0,h.x,h.y,L.w*.09);
      g.addColorStop(0,'rgba(255,244,214,.55)'); g.addColorStop(.35,'rgba(240,196,98,.18)'); g.addColorStop(1,'rgba(240,196,98,0)');
      ctx.fillStyle=g; ctx.fillRect(h.x-L.w*.1,h.y-L.w*.1,L.w*.2,L.w*.2);
    }
    ctx.globalCompositeOperation='source-over';
  }

  // destello de revelado completo
  if(fullK>0 && fullK<1){
    ctx.globalCompositeOperation='lighter';
    const f = Math.sin(fullK*Math.PI)*.2;
    const g = ctx.createRadialGradient(L.x+L.w/2,L.y+L.h*.5,0,L.x+L.w/2,L.y+L.h*.5,L.w*.6);
    g.addColorStop(0,`rgba(255,236,190,${f})`); g.addColorStop(1,'rgba(255,236,190,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
  }

  // texto y focos
  if(t > T.word && !hero.classList.contains('bh-is-word')) hero.classList.add('bh-is-word');
  const sw = clamp((t - (T.word+500))/1100);
  const spotK = clamp((t - T.spots)/1600);
  if(t > T.full) {
    if(spotK>0) drawSpots(now, easeOut(spotK));
    else if(sw>0) sweepText(ease(sw));
  }
  if(t > T.done && !hero.classList.contains('bh-is-done')) hero.classList.add('bh-is-done');

  if(alive) raf = requestAnimationFrame(frame);
}

function staticFrame(){
  // movimiento reducido: estado final quieto
  hero.classList.add('bh-is-lit','bh-is-word','bh-is-done');
  ctx.setTransform(DPR,0,0,DPR,0,0); ctx.clearRect(0,0,W,H);
  ctx.drawImage(img,L.x,L.y,L.w,L.h);
  for(const el of [bond,bondR]){ el.style.setProperty('--li','.6'); el.style.setProperty('--lx','38%'); }
}

function start(){
  cancelAnimationFrame(raf);
  hero.classList.remove('bh-is-word','bh-is-done','bh-is-lit');
  for(const el of [bond,bondR]) el.style.setProperty('--li','0');
  // reinicia animaciones CSS del texto
  void bond.offsetWidth;
  layout(); build();
  if(reduce){ staticFrame(); return; }
  requestAnimationFrame(() => hero.classList.add('bh-is-lit'));
  t0 = performance.now();
  raf = requestAnimationFrame(frame);
}

let alive = true;
img.onload = () => { if(!alive) return; layout(); samples = sampleLogo(); start(); };
img.src = logoSrc;

let rt; const onResize = () => { clearTimeout(rt); rt = setTimeout(() => {
  const elapsed = performance.now()-t0; layout();
  if(reduce || hero.classList.contains('bh-is-done')) { if(reduce) staticFrame(); } else build();
  if(elapsed < 0) start();
}, 120); };
addEventListener('resize', onResize);
const replayBtn = root.querySelector('.bh-replay');
if (replayBtn) replayBtn.addEventListener('click', start);

return () => {
  alive = false;
  cancelAnimationFrame(raf);
  clearTimeout(rt);
  removeEventListener('resize', onResize);
  if (replayBtn) replayBtn.removeEventListener('click', start);
};

}
