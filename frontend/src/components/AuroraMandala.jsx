/**
 * AuroraMandala — fondo animado del hero de CAMY.
 *
 * Mandala de luces tipo aurora boreal dibujado en WebGL (sin vídeo, sin librerías).
 * - Aparece desde el centro en ~4,5 s.
 * - Se mueve lento, como humo; cambia suavemente con el scroll de toda la página.
 * - Fijo detrás del contenido (position: fixed); el contenido hace scroll por encima.
 * - Respeta "reducir movimiento" (se muestra quieto) y se pausa cuando la pestaña no está visible.
 * - Si el navegador no tiene WebGL, queda un degradado oscuro de respaldo.
 *
 * Uso:  <AuroraMandala />  colocado una sola vez, por ejemplo al inicio de la Home.
 */
import { useEffect, useRef } from 'react';

const VERT = 'attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }';

const FRAG = [
    'precision highp float;',
    'uniform vec2 uRes; uniform float uTime; uniform float uScroll; uniform float uIntro;',
    'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
    'float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);',
    '  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }',
    'float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }',
    'vec3 auroraPal(float h){',
    '  h = fract(h) * 6.0;',
    '  vec3 g  = vec3(0.20, 1.00, 0.55);',   /* verde aurora */
    '  vec3 tq = vec3(0.10, 0.85, 0.90);',   /* turquesa */
    '  vec3 bl = vec3(0.25, 0.45, 1.00);',   /* azul */
    '  vec3 vi = vec3(0.60, 0.30, 1.00);',   /* violeta */
    '  vec3 mg = vec3(1.00, 0.35, 0.70);',   /* magenta */
    '  vec3 fu = vec3(0.94, 0.31, 0.14);',   /* Fuego CAMY */
    '  if (h < 1.0) return mix(g, tq, h);',
    '  if (h < 2.0) return mix(tq, bl, h-1.0);',
    '  if (h < 3.0) return mix(bl, vi, h-2.0);',
    '  if (h < 4.0) return mix(vi, mg, h-3.0);',
    '  if (h < 5.0) return mix(mg, fu, h-4.0);',
    '  return mix(fu, g, h-5.0);',
    '}',
    'vec3 aurora(vec2 p, float N, float t, float s){',
    '  float r = length(p);',
    '  float a = atan(p.y, p.x) + t*0.03 + s*1.6;',
    '  float seg = 6.2831853 / N;',
    '  a = mod(a, seg); a = abs(a - seg*0.5);',
    '  vec2 q = vec2(cos(a), sin(a)) * r;',
    '  vec3 col = vec3(0.);',
    '  for (int i=0; i<5; i++) {',
    '    float fi = float(i);',
    '    float warp = fbm(q*(1.6+fi*0.4) + vec2(t*0.035*(1.+fi*0.3), fi*3.1 - t*0.02));',
    '    float rings = sin(r*(4.6+fi*1.5 + s*2.0) - t*0.22*(1.+fi*0.15) + warp*2.6 + q.x*1.0);',
    '    float band = exp(-rings*rings*1.7);',
    '    band *= smoothstep(1.3, 0.1, r) * (0.5 + 0.5*fbm(q*2.2 - t*0.04));',
    '    float hue = fi*0.19 + r*0.45 + warp*0.55 + t*0.015 + s*0.3;',
    '    col += auroraPal(hue) * band * (0.42 - fi*0.05);',
    '  }',
    '  float haze = fbm(q*1.6 + t*0.03) * smoothstep(1.4, 0.0, r);',
    '  col += vec3(0.16, 0.10, 0.32) * haze * 0.4;',
    '  return col;',
    '}',
    'void main(){',
    '  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / min(uRes.x, uRes.y);',
    '  float s = uScroll;',
    '  float t = uTime;',
    '  float tau = 6.2831853;',
    /* viaje: la cámara se desplaza, gira y hace zoom in / zoom out varias veces con el scroll */
    '  vec2 cam = vec2(sin(s*5.3) + 0.5*sin(s*11.7 + 1.9) - 0.5*sin(1.9), sin(s*4.1 + 0.7) - sin(0.7) + 0.4*sin(s*9.2)) * 0.09 * smoothstep(0.0, 0.2, s);',
    '  float zoom = 1.15 * pow(0.8, 0.5 - 0.5*cos(s*tau*1.0 + 0.6*sin(s*7.0)));',
    '  float ang = s*0.9 + 0.12*sin(s*6.7);',
    '  mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));',
    '  vec2 p = R*(uv*zoom) + cam;',
    '  float Nf = 6.0 + s*6.0;',
    '  float N0 = floor(Nf); float k = smoothstep(0.0, 1.0, fract(Nf));',
    '  vec3 col = mix(aurora(p, N0, t, s), aurora(p, N0+1.0, t, s), k);',
    '  float r = length(p);',
    '  float reveal = smoothstep(uIntro*1.6, uIntro*1.6 - 0.5, r);',
    '  col *= reveal * (0.35 + 0.65*uIntro);',
    '  col += vec3(0.94,0.31,0.14) * exp(-r*9.0) * 0.25 * uIntro;',
    /* estrellas con paralaje: se mueven con la cámara a distinta velocidad */
    '  vec3 stars = vec3(0.);',
    '  for (int L=0; L<2; L++) {',
    '    float fl = float(L);',
    '    vec2 sp = uv*mix(1.0, zoom, 0.3 + 0.2*fl) + cam*(0.3 + 0.3*fl);',
    '    vec2 g = sp*(55.0 + fl*35.0) + fl*17.3;',
    '    vec2 id = floor(g); vec2 f = fract(g) - 0.5;',
    '    float h = hash(id + fl*13.1);',
    '    vec2 o = vec2(hash(id + 3.7), hash(id + 9.1)) - 0.5;',
    '    float d = length(f - o*0.6);',
    '    float tw = 0.5 + 0.5*hash(id + 21.7);',
    '    stars += vec3(0.85, 0.9, 1.0) * step(0.982, h) * smoothstep(0.14, 0.0, d) * tw * (0.18 + 0.14*fl);',
    '  }',
    '  stars *= uIntro;',
    '  vec3 bg = mix(vec3(0.008,0.008,0.02), vec3(0.04,0.035,0.075), smoothstep(1.3, 0.0, length(uv)));',
    '  col = bg + col + stars;',
    '  col = 1.0 - exp(-col*1.35);',
    '  col = pow(col, vec3(1.08));',      /* más contraste: negros más profundos, como el espacio */
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
].join('\n');

export default function AuroraMandala({ quality = 0.6 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return undefined; // se queda el degradado de respaldo del estilo

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return undefined;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uScroll = gl.getUniformLocation(prog, 'uScroll');
    const uIntro = gl.getUniformLocation(prog, 'uIntro');

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * quality;
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let target = 0;
    let smooth = 0;
    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', readScroll, { passive: true });
    resize();
    readScroll();

    const start = performance.now();
    let raf = 0;
    const frame = (now) => {
      const t = (now - start) / 1000;
      smooth += (target - smooth) * 0.05;
      let intro = reduce ? 1 : Math.min(1, t / 4.5);
      intro = intro * intro * (3 - 2 * intro);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 20.0 : t);
      gl.uniform1f(uScroll, smooth);
      gl.uniform1f(uIntro, intro);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [quality]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, #2a2240 0%, #0E0E18 70%)',
      }}
    />
  );
}
