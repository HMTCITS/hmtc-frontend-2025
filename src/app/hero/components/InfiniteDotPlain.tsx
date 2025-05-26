'use client';
import React, { useEffect, useRef } from 'react';

const DOT_SPACING = 15;
const DOT_SIZE = 1.1;
const BG_COLOR = '#17202A';
const PERSPECTIVE = 1100;
const DOT_OPACITY = 0.01;
const MIN_Z = 50;
const MAX_Z = 800;
const CAMERA_Y = 1.05;
const CAMERA_X = 0.5;
const CAMERA_Z = -35;
const TILT_DEG = 25;
const ROT_X = 0;
const ROT_Y = 0;
const ROT_Z = 0;
const PLANE_WIDTH = 10000;
const PLANE_LENGTH = 1500;
const OFFSET_X = 250;
const OFFSET_Y = -360;
const OFFSET_Z = -910;

const degToRad = (d: number) => (d * Math.PI) / 180;

// Banyak sumber gelombang dominan arah kiri ke kanan, bentuk pantai
const WAVE_PARAMS = Array.from({ length: 15 }, () => {
  const direction = degToRad(Math.random() * 30 - 15); // -15° to 15°, dominan kiri ke kanan
  return {
    amplitude: 1.5 + Math.random() * 1.5, // Lebih kecil (1.5–3)
    wavelength: 60 + Math.random() * 120, // Lebih pendek (frekuensi tinggi)
    speed: 1.0 + Math.random() * 1.5, // Lebih cepat (1.0–2.2)
    direction,
    phase: Math.random() * Math.PI * 2,
  };
});

const WAVE_PARAMS_OPT = WAVE_PARAMS.map((wave) => ({
  ...wave,
  k: (2 * Math.PI) / wave.wavelength,
  cos: Math.cos(wave.direction),
  sin: Math.sin(wave.direction),
}));

function gerstnerDisplacement(
  x: number,
  z: number,
  t: number,
  waves = WAVE_PARAMS_OPT,
) {
  let dx = 0,
    dy = 0,
    dz = 0;

  // Redam makin jauh ke belakang (pantai: gelombang tinggi di depan)
  const zFactor = 1 - (z - MIN_Z) / (MAX_Z - MIN_Z);
  const damp = Math.max(0.2, Math.min(1, zFactor));

  for (let i = 0; i < waves.length; i++) {
    const { amplitude, k, speed, cos, sin, phase } = waves[i];
    const omega = k * Math.sqrt(9.81 / k) * speed;
    const arg = k * (cos * x + sin * z) - omega * t + phase;
    dx += damp * amplitude * cos * Math.cos(arg);
    dy += damp * amplitude * Math.sin(arg);
    dz += damp * amplitude * sin * Math.cos(arg);
  }
  return { dx, dy, dz };
}

const TILT_RAD = degToRad(TILT_DEG);
const ROT_X_RAD = degToRad(ROT_X);
const ROT_Y_RAD = degToRad(ROT_Y);
const ROT_Z_RAD = degToRad(ROT_Z);

function project3D(x: number, y: number, z: number, cx: number, cy: number) {
  x += OFFSET_X;
  y += OFFSET_Y;
  z += OFFSET_Z + MIN_Z + (MAX_Z - MIN_Z) / 2;
  // RotX
  const x1 = x;
  let y1 = y * Math.cos(ROT_X_RAD) - z * Math.sin(ROT_X_RAD);
  let z1 = y * Math.sin(ROT_X_RAD) + z * Math.cos(ROT_X_RAD);
  // TILT
  const y1b = y1 * Math.cos(TILT_RAD) - z1 * Math.sin(TILT_RAD);
  const z1b = y1 * Math.sin(TILT_RAD) + z1 * Math.cos(TILT_RAD);
  y1 = y1b;
  z1 = z1b;
  // RotY
  const x2 = x1 * Math.cos(ROT_Y_RAD) + z1 * Math.sin(ROT_Y_RAD);
  const y2 = y1;
  const z2 = -x1 * Math.sin(ROT_Y_RAD) + z1 * Math.cos(ROT_Y_RAD);
  // RotZ
  let x3 = x2 * Math.cos(ROT_Z_RAD) - y2 * Math.sin(ROT_Z_RAD);
  let y3 = x2 * Math.sin(ROT_Z_RAD) + y2 * Math.cos(ROT_Z_RAD);
  let z3 = z2;
  // Camera offset
  x3 -= (PLANE_WIDTH / 2) * (1 - CAMERA_X);
  y3 -= (PLANE_LENGTH / 2) * (1 - CAMERA_Y);
  z3 += CAMERA_Z;
  // Perspective projection
  const scale = PERSPECTIVE / (PERSPECTIVE + z3);
  const screenX = cx + x3 * scale;
  const screenY = cy + y3 * scale;
  return { screenX, screenY, scale, z3 };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const InfiniteDotPlane: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({
    w: 0,
    h: 0,
    dpr: 1,
  });

  function getEffectiveSpacing() {
    const dpr = window.devicePixelRatio || 1;
    return dpr > 1.5 ? DOT_SPACING * 1.5 : DOT_SPACING;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', {
      alpha: false,
      willReadFrequently: true,
    });
    if (!ctx) return;

    // Set image smoothing for better perf
    ctx.imageSmoothingEnabled = false;

    function resizeCanvas(
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
    ) {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        sizeRef.current = { w: width, h: height, dpr };
      }
    }

    function onResize() {
      if (!canvas || !ctx) return;
      resizeCanvas(canvas, ctx);
    }
    onResize();
    window.addEventListener('resize', onResize);

    // Precompute grid positions based on spacing (and devicePixelRatio)
    let GRID_X: number[] = [];
    let GRID_Z: number[] = [];
    let GRID_X_COUNT = 0;
    let GRID_Z_COUNT = 0;
    function updateGrid() {
      const spacing = getEffectiveSpacing();
      const reduction = sizeRef.current.dpr > 1.5 ? 1.2 : 1;
      GRID_X_COUNT = Math.ceil(PLANE_WIDTH / (spacing * reduction)) + 2;
      GRID_Z_COUNT = Math.ceil(PLANE_LENGTH / (spacing * reduction)) + 2;
      GRID_X = Array.from(
        { length: GRID_X_COUNT },
        (_, i) => (i - Math.floor(GRID_X_COUNT / 2)) * spacing * reduction,
      );
      GRID_Z = Array.from(
        { length: GRID_Z_COUNT },
        (_, i) =>
          MIN_Z + (i - Math.floor(GRID_Z_COUNT / 2)) * spacing * reduction,
      );
    }
    updateGrid();

    let dprMedia: MediaQueryList | undefined;
    if ((window as any).matchMedia) {
      dprMedia = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`,
      );
      if (dprMedia) {
        dprMedia.addEventListener?.('change', () => {
          updateGrid();
        });
      }
    }

    let running = true;
    let time = 0;
    let lastT = performance.now();
    let frameId: number;

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      const delta = Math.min(0.07, (now - lastT) / 1000);
      time += delta;

      const { w: width, h: height } = sizeRef.current;
      if (!width || !height) {
        lastT = now;
        frameId = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      const cx = width * CAMERA_X;
      const cy = height * CAMERA_Y;

      // Alpha batching: group dots by alpha value
      const alphaBuckets: Record<
        string,
        {
          x: number;
          y: number;
          r: number;
          color: string;
          glow: [number, number, number];
        }[]
      > = {};

      for (let gz = 0; gz < GRID_Z_COUNT; gz++) {
        const z = GRID_Z[gz];
        for (let gx = 0; gx < GRID_X_COUNT; gx++) {
          const x = GRID_X[gx];
          const { dx, dy, dz } = gerstnerDisplacement(x, z, time);
          const px = x + dx;
          const py = dy;
          const pz = z + dz;
          const { screenX, screenY, scale, z3 } = project3D(px, py, pz, cx, cy);

          if (
            screenX < 0 ||
            screenX > width ||
            screenY < 0 ||
            screenY > height ||
            z3 < -PERSPECTIVE
          ) {
            continue;
          }

          const relZ = (z - MIN_Z) / Math.max(1, MAX_Z - MIN_Z);
          const alpha =
            lerp(1, DOT_OPACITY, relZ) * lerp(0.8, 1, (py + 20) / 40);

          // Color based on height (dy)
          // Ocean blue to cyan white (crest)
          const colorFactor = Math.max(0, Math.min(1, (py + 12) / 22));
          const r = Math.round(lerp(20, 170, colorFactor)); // R: dark blue(20) -> cyan(170)
          const g = Math.round(lerp(80, 255, colorFactor)); // G: blue-green(80) -> white(255)
          const b = Math.round(lerp(180, 255, colorFactor)); // B: deep blue(180) -> white(255)
          const color = `rgba(${r},${g},${b},${alpha})`;

          // Glow color (brighter, less alpha)
          const glowColor = [
            Math.round(lerp(90, 255, colorFactor)),
            Math.round(lerp(180, 255, colorFactor)),
            Math.round(lerp(220, 255, colorFactor)),
          ];

          const alphaKey = (Math.round(alpha * 100) / 100).toFixed(2);
          (alphaBuckets[alphaKey] ||= []).push({
            x: screenX,
            y: screenY,
            r: Math.max(1, DOT_SIZE * scale),
            color,
            glow: glowColor as [number, number, number],
          });
        }
      }

      // Draw dots by alpha batch (with glow/gradient)
      for (const [, points] of Object.entries(alphaBuckets)) {
        for (const { x, y, r, color, glow } of points) {
          // Glow ring
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.3);
          grad.addColorStop(0, `rgba(${glow[0]},${glow[1]},${glow[2]},0.06)`);
          grad.addColorStop(1, `rgba(${glow[0]},${glow[1]},${glow[2]},0)`);
          ctx.beginPath();
          ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowBlur = 0; // Matikan shadowBlur demi performa
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      lastT = now;
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (dprMedia) dprMedia.removeEventListener?.('change', updateGrid);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: BG_COLOR,
        transition: 'background 0.3s',
      }}
      aria-hidden='true'
      tabIndex={-1}
    />
  );
});
InfiniteDotPlane.displayName = 'InfiniteDotPlane';

export default InfiniteDotPlane;
