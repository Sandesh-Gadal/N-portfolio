import { useEffect, useRef } from 'react';
import {
  Color,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer
} from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  varying vec3 vNormal;
  varying vec3 vView;

  // Cheap smooth 3D wobble; enough for a soft, living surface.
  float wobble(vec3 p, float t) {
    return sin(p.x * 2.6 + t) * sin(p.y * 3.1 + t * 1.3) * sin(p.z * 2.2 + t * 0.7)
         + 0.5 * sin(p.x * 5.0 - t * 1.1) * sin(p.y * 4.3 + t * 0.9);
  }

  void main() {
    vec3 pos = position + normal * wobble(position, uTime) * uDistort;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 light = normalize(vec3(-0.5, 0.8, 0.6));
    float diffuse = max(dot(n, light), 0.0);
    float spec = pow(max(dot(reflect(-light, n), vView), 0.0), 24.0);
    float fresnel = pow(1.0 - max(dot(n, vView), 0.0), 2.4);

    vec3 base = mix(uColor * 0.5, uColor, diffuse);
    vec3 col = mix(base, uRim, fresnel * 0.9) + spec * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const cssColor = (name: string, fallback: string) =>
  new Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback);

/**
 * The hero "sun" as a lit, gently warping three.js sphere: lime body, violet rim light.
 * Turns with page scroll, leans and swells toward the pointer. Pauses off-screen and in
 * background tabs; renders a single still frame under reduced motion. Calls `onReady`
 * after the first frame so the flat CSS circle behind it can step aside.
 */
export default function HeroOrb({ onReady }: { onReady: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return; // No WebGL: the CSS circle stays.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 20);
    camera.position.z = 3.6;

    const uniforms = {
      uTime: { value: 0 },
      uDistort: { value: 0.1 },
      uColor: { value: cssColor('--fill', '#c6f432') },
      uRim: { value: cssColor('--violet', '#8b7cff') }
    };
    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const geometry = new IcosahedronGeometry(1, 48);
    const orb = new Mesh(geometry, material);
    scene.add(orb);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, near: 0 };
    let visible = true;
    let raf = 0;
    let readySent = false;

    const resize = () => {
      const size = host.clientWidth;
      renderer.setSize(size, size, false);
      renderer.domElement.style.width = `${size}px`;
      renderer.domElement.style.height = `${size}px`;
    };

    const frame = (now: number) => {
      const t = now / 1000;
      uniforms.uTime.value = t * 0.6;
      uniforms.uDistort.value += (0.1 + pointer.near * 0.14 - uniforms.uDistort.value) * 0.05;
      const scroll = window.scrollY * 0.0016;
      orb.rotation.y += ((reduced ? 0 : t * 0.15) + scroll + pointer.x * 0.5 - orb.rotation.y) * 0.08;
      orb.rotation.x += (pointer.y * 0.35 + scroll * 0.4 - orb.rotation.x) * 0.08;
      renderer.render(scene, camera);
      if (!readySent) {
        readySent = true;
        onReady();
      }
    };

    const loop = (now: number) => {
      frame(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) frame(0);
      else raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      pointer.x = Math.max(-1, Math.min(1, dx));
      pointer.y = Math.max(-1, Math.min(1, dy));
      pointer.near = Math.max(0, 1 - Math.hypot(dx, dy) * 1.4);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame(0);
    });
    ro.observe(host);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(host);

    const onVisibility = () => !document.hidden && visible && start();
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    // Follow theme changes.
    const mo = new MutationObserver(() => {
      uniforms.uColor.value = cssColor('--fill', '#c6f432');
      uniforms.uRim.value = cssColor('--violet', '#8b7cff');
      if (reduced) frame(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={ref} aria-hidden className="absolute inset-0" />;
}
