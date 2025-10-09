import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import {
  BatteryStatus,
  detectDeviceTier,
  devicePresets,
  getBatteryStatus,
} from '../lib/utils/device-detection';

export interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  adaptiveQuality?: boolean; // enable automatic quality scaling (default: true)
  lowFpsThreshold?: number; // FPS below which quality is reduced (default: 30)
  highFpsThreshold?: number; // FPS above which quality is restored (default: 55)
  minResolution?: number; // minimum resolution scale (default: 0.2)
  qualityStep?: number; // multiplicative step when changing quality (default: 0.85)
  // Smoothing controls
  adaptiveWarmupMs?: number; // delay before first quality adjustment
  adjustCooldownMs?: number; // minimum interval between adjustments
  // Mobile idle FPS cap
  capMobileFps?: number; // target FPS when capping on mobile idle (default: 30)
  fpsCapIdleAfterMs?: number; // inactivity before applying cap (default: 1500)
}

interface SimOptions {
  iterations_poisson: number;
  iterations_viscous: number;
  mouse_force: number;
  resolution: number;
  cursor_size: number;
  viscous: number;
  isBounce: boolean;
  dt: number;
  isViscous: boolean;
  BFECC: boolean;
}

interface LiquidEtherWebGL {
  output?: { simulation?: { options: SimOptions; resize: () => void } };
  autoDriver?: {
    enabled: boolean;
    speed: number;
    resumeDelay: number;
    rampDurationMs: number;
    mouse?: { autoIntensity: number; takeoverDuration: number };
    forceStop: () => void;
  };
  // Adaptive tuning knobs (optional public for runtime tweaking)
  lowFpsThreshold?: number;
  highFpsThreshold?: number;
  minResolution?: number;
  qualityStep?: number;
  adaptiveQuality?: boolean;
  adaptiveWarmupMs?: number;
  adjustCooldownMs?: number;
  capMobileFps?: number;
  fpsCapIdleAfterMs?: number;
  // Battery-aware and optimization methods
  updateBatteryStatus?: (
    status: BatteryStatus,
    usePowerSaving: boolean,
  ) => void;
  resize: () => void;
  start: () => void;
  pause: () => void;
  dispose: () => void;
}

const defaultColors = ['#5227FF', '#FF9FFC', '#B19EEF'];

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = defaultColors,
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
  adaptiveQuality = true,
  lowFpsThreshold = 30,
  highFpsThreshold = 55,
  minResolution = 0.2,
  qualityStep = 0.85,
  adaptiveWarmupMs = 1200,
  adjustCooldownMs = 1000,
  capMobileFps = 30,
  fpsCapIdleAfterMs = 1500,
}: LiquidEtherProps): React.ReactElement {
  // Detect device capability and get optimized presets
  const deviceTier = useMemo(() => detectDeviceTier(), []);
  const devicePreset = useMemo(() => devicePresets[deviceTier], [deviceTier]);

  // Track battery status for power-aware rendering
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    charging: true,
    level: 1.0,
    lowPowerMode: false,
  });

  // Battery monitoring
  useEffect(() => {
    // Initial battery status check
    const checkBattery = async () => {
      try {
        const status = await getBatteryStatus();
        setBatteryStatus(status);
      } catch {
        // Silently fail if battery API isn't available
      }
    };

    checkBattery();

    // Set up battery status monitoring
    const batteryCheckInterval = setInterval(checkBattery, 30000); // Check every 30 seconds

    // Clean up
    return () => {
      clearInterval(batteryCheckInterval);
    };
  }, []);

  // Determine if we should use power saving mode based on battery
  const usePowerSaving = useMemo(() => {
    if (batteryStatus.lowPowerMode) return true;
    if (
      !batteryStatus.charging &&
      devicePreset.lowBatteryThreshold &&
      batteryStatus.level <= devicePreset.lowBatteryThreshold
    ) {
      return true;
    }
    return false;
  }, [batteryStatus, devicePreset]);

  // Apply device-optimized defaults when not explicitly overridden by props
  // We use props object spread to ensure passed values take priority

  // First apply device tier presets (if not explicitly overridden)
  let appliedResolution =
    resolution === 0.5 ? devicePreset.resolution : resolution;
  let appliedIterationsPoisson =
    iterationsPoisson === 32
      ? devicePreset.iterationsPoisson
      : iterationsPoisson;
  let appliedIterationsViscous =
    iterationsViscous === 32
      ? devicePreset.iterationsViscous
      : iterationsViscous;

  // Then apply power saving adjustments if needed
  if (usePowerSaving) {
    if (devicePreset.lowPowerResolution) {
      appliedResolution = devicePreset.lowPowerResolution;
    }
    if (devicePreset.lowPowerIterations) {
      appliedIterationsPoisson = devicePreset.lowPowerIterations;
      appliedIterationsViscous = devicePreset.lowPowerIterations;
    }
  }

  // Assign the final values
  resolution = appliedResolution;
  iterationsPoisson = appliedIterationsPoisson;
  iterationsViscous = appliedIterationsViscous;

  dt = dt === 0.014 ? devicePreset.dt : dt;
  if (devicePreset.viscous && viscous === 30) viscous = devicePreset.viscous;
  if (devicePreset.minResolution) minResolution = devicePreset.minResolution;
  if (devicePreset.qualityStep) qualityStep = devicePreset.qualityStep;
  if (typeof devicePreset.capMobileFps === 'number')
    capMobileFps = devicePreset.capMobileFps;
  if (typeof devicePreset.fpsCapIdleAfterMs === 'number')
    fpsCapIdleAfterMs = devicePreset.fpsCapIdleAfterMs;

  // For debugging in development
  if (process.env.NODE_ENV === 'development') {
    // Dev-only diagnostics
    // eslint-disable-next-line no-console
    console.log(`[LiquidEther] Using ${deviceTier} device preset:`, {
      resolution,
      iterationsPoisson,
      iterationsViscous,
      dt,
      capMobileFps,
      powerSaving: usePowerSaving,
      batteryLevel: batteryStatus.level,
      charging: batteryStatus.charging,
      lowPowerMode: batteryStatus.lowPowerMode,
    });
  }

  // For debugging in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[LiquidEther] Using ${deviceTier} device preset:`, {
      resolution,
      iterationsPoisson,
      iterationsViscous,
      dt,
      capMobileFps,
    });
  }
  const mountRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<LiquidEtherWebGL | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const resizeRafRef = useRef<number | null>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track if any form field is currently focused and save original resolution
  const isFormFocusedRef = useRef(false);
  const preFormFocusResRef = useRef<number | null>(null);

  // Update WebGL rendering quality when battery status changes
  useEffect(() => {
    if (webglRef.current && webglRef.current.output?.simulation) {
      const sim = webglRef.current.output.simulation;

      // Only apply if we're in power saving mode and the WebGL context is initialized
      if (usePowerSaving && devicePreset.lowPowerResolution) {
        // Don't override if form focus is already active
        if (!isFormFocusedRef.current) {
          sim.options.resolution = devicePreset.lowPowerResolution;

          if (devicePreset.lowPowerIterations) {
            sim.options.iterations_poisson = devicePreset.lowPowerIterations;
            sim.options.iterations_viscous = devicePreset.lowPowerIterations;
          }

          sim.resize();
        }
      }
    }
  }, [batteryStatus, usePowerSaving, devicePreset]);

  // Setup form focus detection
  useEffect(() => {
    // Helper to detect if an element is a form input
    const isFormField = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      return (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        el.getAttribute('contenteditable') === 'true'
      );
    };

    // Event handlers
    const handleFocusIn = (e: FocusEvent) => {
      if (isFormField(e.target as Element)) {
        if (!isFormFocusedRef.current && webglRef.current) {
          // Drastically reduce resolution when form is focused
          const sim = webglRef.current.output?.simulation;
          if (sim && sim.options) {
            preFormFocusResRef.current = sim.options.resolution;
            sim.options.resolution = Math.min(
              0.1,
              sim.options.resolution * 0.5,
            );
            sim.resize();
            isFormFocusedRef.current = true;
          }
        }
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (isFormField(e.target as Element)) {
        if (
          isFormFocusedRef.current &&
          webglRef.current &&
          preFormFocusResRef.current !== null
        ) {
          // Restore resolution when form focus is released
          const sim = webglRef.current.output?.simulation;
          if (sim && sim.options) {
            sim.options.resolution = preFormFocusResRef.current;
            preFormFocusResRef.current = null;
            sim.resize();
            isFormFocusedRef.current = false;
          }
        }
      }
    };

    // Add global focus event listeners
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops: string[]): THREE.DataTexture {
      // Check if we should use simplified textures based on device tier
      const shouldUseSimplifiedTextures = devicePreset.useSimplifiedTextures;
      const useMonochrome = devicePreset.useMonochromeColors;

      // Process the color stops based on device capabilities
      let arr: string[];
      if (Array.isArray(stops) && stops.length > 0) {
        if (shouldUseSimplifiedTextures) {
          // For low-end devices, use fewer color stops
          const primaryColor = stops[0];
          arr = useMonochrome
            ? [primaryColor, primaryColor] // Single color for extreme optimization
            : [
                stops[0],
                stops[Math.floor(stops.length / 2)],
                stops[stops.length - 1],
              ]; // Simplified gradient
        } else {
          arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
        }
      } else {
        arr = ['#ffffff', '#ffffff'];
      }

      // Create the texture data
      const w = arr.length;
      const data = new Uint8Array(w * 4);

      if (useMonochrome) {
        // For extreme optimization, use a single base color with varying alpha
        const baseColor = new THREE.Color(arr[0]);
        const r = Math.round(baseColor.r * 255);
        const g = Math.round(baseColor.g * 255);
        const b = Math.round(baseColor.b * 255);

        for (let i = 0; i < w; i++) {
          data[i * 4 + 0] = r;
          data[i * 4 + 1] = g;
          data[i * 4 + 2] = b;
          data[i * 4 + 3] = Math.round(255 * (i / (w - 1))); // Vary alpha from 0 to 255
        }
      } else {
        // Regular color mapping
        for (let i = 0; i < w; i++) {
          const c = new THREE.Color(arr[i]);
          data[i * 4 + 0] = Math.round(c.r * 255);
          data[i * 4 + 1] = Math.round(c.g * 255);
          data[i * 4 + 2] = Math.round(c.b * 255);
          data[i * 4 + 3] = 255;
        }
      }

      // Create the texture with appropriate settings based on device tier
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false; // Disable mipmaps to save memory
      tex.needsUpdate = true;

      return tex;
    }

    const paletteTex = makePaletteTexture(colors);
    // Hard-code transparent background vector (alpha 0)
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    class CommonClass {
      width = 0;
      height = 0;
      aspect = 1;
      pixelRatio = 1;
      isMobile = false;
      breakpoint = 768;
      fboWidth: number | null = null;
      fboHeight: number | null = null;
      time = 0;
      delta = 0;
      container: HTMLElement | null = null;
      renderer: THREE.WebGLRenderer | null = null;
      clock: THREE.Clock | null = null;
      init(container: HTMLElement) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        // Always transparent
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        const el = this.renderer.domElement;
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.display = 'block';
        this.clock = new THREE.Clock();
        this.clock.start();
      }
      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer)
          this.renderer.setSize(this.width, this.height, false);
      }
      update() {
        if (!this.clock) return;
        this.delta = this.clock.getDelta();
        this.time += this.delta;
      }
    }
    const Common = new CommonClass();

    class MouseClass {
      mouseMoved = false;
      coords = new THREE.Vector2();
      coords_old = new THREE.Vector2();
      diff = new THREE.Vector2();
      timer: number | null = null;
      container: HTMLElement | null = null;
      isHoverInside = false;
      hasUserControl = false;
      isAutoActive = false;
      autoIntensity = 2.0;
      takeoverActive = false;
      takeoverStartTime = 0;
      takeoverDuration = 0.25;
      takeoverFrom = new THREE.Vector2();
      takeoverTo = new THREE.Vector2();
      onInteract: (() => void) | null = null;
      private _onMouseMove = this.onDocumentMouseMove.bind(this);
      private _onTouchStart = this.onDocumentTouchStart.bind(this);
      private _onTouchMove = this.onDocumentTouchMove.bind(this);
      private _onMouseEnter = this.onMouseEnter.bind(this);
      private _onMouseLeave = this.onMouseLeave.bind(this);
      private _onTouchEnd = this.onTouchEnd.bind(this);
      init(container: HTMLElement) {
        this.container = container;
        // Listen at the window level so cursor interactions are captured even if overlays sit above the canvas.
        window.addEventListener('mousemove', this._onMouseMove, {
          passive: true,
        } as any);
        window.addEventListener('touchstart', this._onTouchStart, {
          passive: true,
        });
        window.addEventListener('touchmove', this._onTouchMove, {
          passive: true,
        });
        window.addEventListener('touchend', this._onTouchEnd);
        // mouseenter/leave won't fire for window; we'll infer hover state from coordinates in onDocumentMouseMove.
      }
      dispose() {
        // Remove window listeners safely.
        try {
          window.removeEventListener('mousemove', this._onMouseMove as any);
          window.removeEventListener('touchstart', this._onTouchStart as any);
          window.removeEventListener('touchmove', this._onTouchMove as any);
          window.removeEventListener('touchend', this._onTouchEnd as any);
        } catch {
          /* noop */
        }
      }
      setCoords(x: number, y: number) {
        if (!this.container) return;
        if (this.timer) window.clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = window.setTimeout(() => {
          this.mouseMoved = false;
        }, 100);
      }
      setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
      }
      onDocumentMouseMove(event: MouseEvent) {
        if (this.onInteract) this.onInteract();
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
          if (!this.container) return;
          const rect = this.container.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width;
          const ny = (event.clientY - rect.top) / rect.height;
          this.takeoverFrom.copy(this.coords);
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
          this.takeoverStartTime = performance.now();
          this.takeoverActive = true;
          this.hasUserControl = true;
          this.isAutoActive = false;
          return;
        }
        this.setCoords(event.clientX, event.clientY);
        // infer hover state relative to container bounds
        if (this.container) {
          const rect = this.container.getBoundingClientRect();
          const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
          this.isHoverInside = inside;
        }
        this.hasUserControl = true;
      }
      onDocumentTouchStart(event: TouchEvent) {
        if (event.touches.length === 1) {
          const t = event.touches[0];
          if (this.onInteract) this.onInteract();
          this.setCoords(t.pageX, t.pageY);
          this.hasUserControl = true;
        }
      }
      onDocumentTouchMove(event: TouchEvent) {
        if (event.touches.length === 1) {
          const t = event.touches[0];
          if (this.onInteract) this.onInteract();
          this.setCoords(t.pageX, t.pageY);
        }
      }
      onTouchEnd() {
        this.isHoverInside = false;
      }
      onMouseEnter() {
        this.isHoverInside = true;
      }
      onMouseLeave() {
        this.isHoverInside = false;
      }
      update() {
        if (this.takeoverActive) {
          const t =
            (performance.now() - this.takeoverStartTime) /
            (this.takeoverDuration * 1000);
          if (t >= 1) {
            this.takeoverActive = false;
            this.coords.copy(this.takeoverTo);
            this.coords_old.copy(this.coords);
            this.diff.set(0, 0);
          } else {
            const k = t * t * (3 - 2 * t);
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
          }
        }
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0)
          this.diff.set(0, 0);
        if (this.isAutoActive && !this.takeoverActive)
          this.diff.multiplyScalar(this.autoIntensity);
      }
    }
    const Mouse = new MouseClass();

    class AutoDriver {
      mouse: MouseClass;
      manager: WebGLManager;
      enabled: boolean;
      speed: number;
      resumeDelay: number;
      rampDurationMs: number;
      active = false;
      current = new THREE.Vector2(0, 0);
      target = new THREE.Vector2();
      lastTime = performance.now();
      activationTime = 0;
      margin = 0.2;
      private _tmpDir = new THREE.Vector2();
      constructor(
        mouse: MouseClass,
        manager: WebGLManager,
        opts: {
          enabled: boolean;
          speed: number;
          resumeDelay: number;
          rampDuration: number;
        },
      ) {
        this.mouse = mouse;
        this.manager = manager;
        this.enabled = opts.enabled;
        this.speed = opts.speed;
        this.resumeDelay = opts.resumeDelay || 3000;
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;
        this.pickNewTarget();
      }
      pickNewTarget() {
        const r = Math.random;
        this.target.set(
          (r() * 2 - 1) * (1 - this.margin),
          (r() * 2 - 1) * (1 - this.margin),
        );
      }
      forceStop() {
        this.active = false;
        this.mouse.isAutoActive = false;
      }
      update() {
        if (!this.enabled) return;
        const now = performance.now();
        const idle = now - this.manager.lastUserInteraction;
        if (idle < this.resumeDelay) {
          if (this.active) this.forceStop();
          return;
        }
        if (this.mouse.isHoverInside) {
          if (this.active) this.forceStop();
          return;
        }
        if (!this.active) {
          this.active = true;
          this.current.copy(this.mouse.coords);
          this.lastTime = now;
          this.activationTime = now;
        }
        if (!this.active) return;
        this.mouse.isAutoActive = true;
        let dtSec = (now - this.lastTime) / 1000;
        this.lastTime = now;
        if (dtSec > 0.2) dtSec = 0.016;
        const dir = this._tmpDir.subVectors(this.target, this.current);
        const dist = dir.length();
        if (dist < 0.01) {
          this.pickNewTarget();
          return;
        }
        dir.normalize();
        let ramp = 1;
        if (this.rampDurationMs > 0) {
          const t = Math.min(
            1,
            (now - this.activationTime) / this.rampDurationMs,
          );
          ramp = t * t * (3 - 2 * t);
        }
        const step = this.speed * dtSec * ramp;
        const move = Math.min(step, dist);
        this.current.addScaledVector(dir, move);
        this.mouse.setNormalized(this.current.x, this.current.y);
      }
    }

    const face_vert = `
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`;
    const line_vert = `
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}
`;
    const mouse_vert = `
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`;
    const advection_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform bool isBFECC;
    uniform vec2 fboSize;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}
`;
    const color_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D palette;
    uniform vec4 bgColor;
    varying vec2 uv;
    void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    vec3 outRGB = mix(bgColor.rgb, c, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
}
`;
    const divergence_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
}
`;
    const externalForce_frag = `
    precision highp float;
    uniform vec2 force;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
}
`;
    const poisson_frag = `
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}
`;
    const pressure_frag = `
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`;
    const viscous_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D velocity_new;
    uniform float v;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
}
`;

    type Uniforms = Record<string, { value: any }>;

    class ShaderPass {
      props: any;
      uniforms?: Uniforms;
      scene: THREE.Scene | null = null;
      camera: THREE.Camera | null = null;
      material: THREE.RawShaderMaterial | null = null;
      geometry: THREE.BufferGeometry | null = null;
      plane: THREE.Mesh | null = null;
      constructor(props: any) {
        this.props = props || {};
        this.uniforms = this.props.material?.uniforms;
      }
      init(..._args: any[]) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        if (this.uniforms) {
          this.material = new THREE.RawShaderMaterial(this.props.material);
          this.geometry = new THREE.PlaneGeometry(2, 2);
          this.plane = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.plane);
        }
      }
      update(..._args: any[]) {
        if (!Common.renderer || !this.scene || !this.camera) return;
        Common.renderer.setRenderTarget(this.props.output || null);
        Common.renderer.render(this.scene, this.camera);
        Common.renderer.setRenderTarget(null);
      }
    }

    class Advection extends ShaderPass {
      line!: THREE.LineSegments;
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: advection_frag,
            uniforms: {
              boundarySpace: { value: simProps.cellScale },
              px: { value: simProps.cellScale },
              fboSize: { value: simProps.fboSize },
              velocity: { value: simProps.src.texture },
              dt: { value: simProps.dt },
              isBFECC: { value: true },
            },
          },
          output: simProps.dst,
        });
        this.uniforms = this.props.material.uniforms;
        this.init();
      }
      init() {
        super.init();
        this.createBoundary();
      }
      createBoundary() {
        const boundaryG = new THREE.BufferGeometry();
        const vertices_boundary = new Float32Array([
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0,
          -1, -1, 0,
        ]);
        boundaryG.setAttribute(
          'position',
          new THREE.BufferAttribute(vertices_boundary, 3),
        );
        const boundaryM = new THREE.RawShaderMaterial({
          vertexShader: line_vert,
          fragmentShader: advection_frag,
          uniforms: this.uniforms!,
        });
        this.line = new THREE.LineSegments(boundaryG, boundaryM);
        this.scene!.add(this.line);
      }
      update(...args: any[]) {
        const { dt, isBounce, BFECC } = (args[0] || {}) as {
          dt?: number;
          isBounce?: boolean;
          BFECC?: boolean;
        };
        if (!this.uniforms) return;
        if (typeof dt === 'number') this.uniforms.dt.value = dt;
        if (typeof isBounce === 'boolean') this.line.visible = isBounce;
        if (typeof BFECC === 'boolean') this.uniforms.isBFECC.value = BFECC;
        super.update();
      }
    }

    class ExternalForce extends ShaderPass {
      mouse!: THREE.Mesh;
      constructor(simProps: any) {
        super({ output: simProps.dst });
        this.init(simProps);
      }
      init(simProps: any) {
        super.init();
        const mouseG = new THREE.PlaneGeometry(1, 1);
        const mouseM = new THREE.RawShaderMaterial({
          vertexShader: mouse_vert,
          fragmentShader: externalForce_frag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simProps.cellScale },
            force: { value: new THREE.Vector2(0, 0) },
            center: { value: new THREE.Vector2(0, 0) },
            scale: {
              value: new THREE.Vector2(
                simProps.cursor_size,
                simProps.cursor_size,
              ),
            },
          },
        });
        this.mouse = new THREE.Mesh(mouseG, mouseM);
        this.scene!.add(this.mouse);
      }
      update(...args: any[]) {
        const props = args[0] || {};
        const forceX = (Mouse.diff.x / 2) * (props.mouse_force || 0);
        const forceY = (Mouse.diff.y / 2) * (props.mouse_force || 0);
        const cellScale = props.cellScale || { x: 1, y: 1 };
        const cursorSize = props.cursor_size || 0;
        const cursorSizeX = cursorSize * cellScale.x;
        const cursorSizeY = cursorSize * cellScale.y;
        const centerX = Math.min(
          Math.max(Mouse.coords.x, -1 + cursorSizeX + cellScale.x * 2),
          1 - cursorSizeX - cellScale.x * 2,
        );
        const centerY = Math.min(
          Math.max(Mouse.coords.y, -1 + cursorSizeY + cellScale.y * 2),
          1 - cursorSizeY - cellScale.y * 2,
        );
        const uniforms = (this.mouse.material as THREE.RawShaderMaterial)
          .uniforms;
        uniforms.force.value.set(forceX, forceY);
        uniforms.center.value.set(centerX, centerY);
        uniforms.scale.value.set(cursorSize, cursorSize);
        super.update();
      }
    }

    class Viscous extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: viscous_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              velocity_new: { value: simProps.dst_.texture },
              v: { value: simProps.viscous },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
          output0: simProps.dst_,
          output1: simProps.dst,
        });
        this.init();
      }
      update(...args: any[]) {
        const { viscous, iterations, dt } = (args[0] || {}) as {
          viscous?: number;
          iterations?: number;
          dt?: number;
        };
        if (!this.uniforms) return;
        let fbo_in: any, fbo_out: any;
        if (typeof viscous === 'number') this.uniforms.v.value = viscous;
        const iter = iterations ?? 0;
        for (let i = 0; i < iter; i++) {
          if (i % 2 === 0) {
            fbo_in = this.props.output0;
            fbo_out = this.props.output1;
          } else {
            fbo_in = this.props.output1;
            fbo_out = this.props.output0;
          }
          this.uniforms.velocity_new.value = fbo_in.texture;
          this.props.output = fbo_out;
          if (typeof dt === 'number') this.uniforms.dt.value = dt;
          super.update();
        }
        return fbo_out;
      }
    }

    class Divergence extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: divergence_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }
      update(...args: any[]) {
        const { vel } = (args[0] || {}) as { vel?: any };
        if (this.uniforms && vel) {
          this.uniforms.velocity.value = vel.texture;
        }
        super.update();
      }
    }

    class Poisson extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: poisson_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.dst_.texture },
              divergence: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
            },
          },
          output: simProps.dst,
          output0: simProps.dst_,
          output1: simProps.dst,
        });
        this.init();
      }
      update(...args: any[]) {
        const { iterations } = (args[0] || {}) as { iterations?: number };
        let p_in: any, p_out: any;
        const iter = iterations ?? 0;
        for (let i = 0; i < iter; i++) {
          if (i % 2 === 0) {
            p_in = this.props.output0;
            p_out = this.props.output1;
          } else {
            p_in = this.props.output1;
            p_out = this.props.output0;
          }
          if (this.uniforms) this.uniforms.pressure.value = p_in.texture;
          this.props.output = p_out;
          super.update();
        }
        return p_out;
      }
    }

    class Pressure extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: pressure_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.src_p.texture },
              velocity: { value: simProps.src_v.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }
      update(...args: any[]) {
        const { vel, pressure } = (args[0] || {}) as {
          vel?: any;
          pressure?: any;
        };
        if (this.uniforms && vel && pressure) {
          this.uniforms.velocity.value = vel.texture;
          this.uniforms.pressure.value = pressure.texture;
        }
        super.update();
      }
    }

    class Simulation {
      options: SimOptions;
      fbos: Record<string, THREE.WebGLRenderTarget | null> = {
        vel_0: null,
        vel_1: null,
        vel_viscous0: null,
        vel_viscous1: null,
        div: null,
        pressure_0: null,
        pressure_1: null,
      };
      fboSize = new THREE.Vector2();
      cellScale = new THREE.Vector2();
      boundarySpace = new THREE.Vector2();
      advection!: Advection;
      externalForce!: ExternalForce;
      viscous!: Viscous;
      divergence!: Divergence;
      poisson!: Poisson;
      pressure!: Pressure;
      constructor(options?: Partial<SimOptions>) {
        this.options = {
          iterations_poisson: 32,
          iterations_viscous: 32,
          mouse_force: 20,
          resolution: 0.5,
          cursor_size: 100,
          viscous: 30,
          isBounce: false,
          dt: 0.014,
          isViscous: false,
          BFECC: true,
          ...options,
        };
        this.init();
      }
      init() {
        this.calcSize();
        this.createAllFBO();
        this.createShaderPass();
      }
      getFloatType() {
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;
      }
      createAllFBO() {
        const type = this.getFloatType();
        const opts = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        } as const;
        for (const key in this.fbos) {
          this.fbos[key] = new THREE.WebGLRenderTarget(
            this.fboSize.x,
            this.fboSize.y,
            opts,
          );
        }
      }
      createShaderPass() {
        this.advection = new Advection({
          cellScale: this.cellScale,
          fboSize: this.fboSize,
          dt: this.options.dt,
          src: this.fbos.vel_0,
          dst: this.fbos.vel_1,
        });
        this.externalForce = new ExternalForce({
          cellScale: this.cellScale,
          cursor_size: this.options.cursor_size,
          dst: this.fbos.vel_1,
        });
        this.viscous = new Viscous({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          viscous: this.options.viscous,
          src: this.fbos.vel_1,
          dst: this.fbos.vel_viscous1,
          dst_: this.fbos.vel_viscous0,
          dt: this.options.dt,
        });
        this.divergence = new Divergence({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.vel_viscous0,
          dst: this.fbos.div,
          dt: this.options.dt,
        });
        this.poisson = new Poisson({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.div,
          dst: this.fbos.pressure_1,
          dst_: this.fbos.pressure_0,
        });
        this.pressure = new Pressure({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src_p: this.fbos.pressure_0,
          src_v: this.fbos.vel_viscous0,
          dst: this.fbos.vel_0,
          dt: this.options.dt,
        });
      }
      calcSize() {
        const width = Math.max(
          1,
          Math.round(this.options.resolution * Common.width),
        );
        const height = Math.max(
          1,
          Math.round(this.options.resolution * Common.height),
        );
        this.cellScale.set(1 / width, 1 / height);
        this.fboSize.set(width, height);
      }
      resize() {
        this.calcSize();
        for (const key in this.fbos) {
          this.fbos[key]!.setSize(this.fboSize.x, this.fboSize.y);
        }
      }
      update() {
        if (this.options.isBounce) this.boundarySpace.set(0, 0);
        else this.boundarySpace.copy(this.cellScale);
        this.advection.update({
          dt: this.options.dt,
          isBounce: this.options.isBounce,
          BFECC: this.options.BFECC,
        });
        this.externalForce.update({
          cursor_size: this.options.cursor_size,
          mouse_force: this.options.mouse_force,
          cellScale: this.cellScale,
        });
        let vel: any = this.fbos.vel_1;
        if (this.options.isViscous) {
          vel = this.viscous.update({
            viscous: this.options.viscous,
            iterations: this.options.iterations_viscous,
            dt: this.options.dt,
          });
        }
        this.divergence.update({ vel });
        const pressure = this.poisson.update({
          iterations: this.options.iterations_poisson,
        });
        this.pressure.update({ vel, pressure });
      }
    }

    class Output {
      simulation: Simulation;
      scene: THREE.Scene;
      camera: THREE.Camera;
      output: THREE.Mesh;
      constructor() {
        this.simulation = new Simulation();
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.output = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: face_vert,
            fragmentShader: color_frag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.vel_0!.texture },
              boundarySpace: { value: new THREE.Vector2() },
              palette: { value: paletteTex },
              bgColor: { value: bgVec4 },
            },
          }),
        );
        this.scene.add(this.output);
      }
      resize() {
        this.simulation.resize();
      }
      render() {
        if (!Common.renderer) return;
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
      }
      update() {
        this.simulation.update();
        this.render();
      }
    }

    class WebGLManager implements LiquidEtherWebGL {
      props: any;
      output!: Output;
      autoDriver?: AutoDriver;
      lastUserInteraction = performance.now();
      running = false;
      private _loop = this.loop.bind(this);
      private _resize = this.resize.bind(this);
      private _handleScroll = this.handleScroll.bind(this);
      private _handleContextLost = this.handleContextLost.bind(this);
      private _handleContextRestored = this.handleContextRestored.bind(this);
      private _onVisibility?: () => void;
      // Adaptive quality state
      baseResolution = 0.5;
      baseIterationsPoisson = 32;
      baseIterationsViscous = 32;
      minResolution = 0.2;
      qualityStep = 0.85;
      lowFpsThreshold = 30;
      highFpsThreshold = 55;
      adaptiveQuality = true;
      lastFrameTime = performance.now();
      _fpsSamples: number[] = [];
      _samplesLimit = 30;
      // Smoothing controls
      adaptiveWarmupMs = 1200;
      adjustCooldownMs = 1000;
      private _createdAt = performance.now();
      private _lastAdjustAt = 0;
      private _hasFadedIn = false;
      // FPS cap for mobile idle
      capMobileFps = 30;
      fpsCapIdleAfterMs = 1500;
      private _isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        typeof navigator !== 'undefined' ? navigator.userAgent : '',
      );
      private _lastRenderAt = performance.now();
      // Battery-aware settings
      private _batteryStatus: BatteryStatus = {
        charging: true,
        level: 1.0,
        lowPowerMode: false,
      };
      private _inPowerSavingMode = false;
      // Frame budget management
      private _deviceTier = detectDeviceTier();
      private _frameBudgetMs = 16; // Default ~60fps
      private _frameStartTime = 0;
      private _frameCount = 0;
      private _skipFrameCheck = false;
      private _consecutiveHeavyFrames = 0;
      private _maxConsecutiveHeavyFrames = 5;
      // Progressive loading properties
      // Progressive loading gradually increases rendering quality to improve initial user experience
      // by starting with a low resolution and iteratively improving it over time
      private _progressiveEnabled = false; // Whether progressive loading is enabled
      private _progressiveStartTime = 0; // When the progressive loading started
      private _progressiveDuration = 2000; // How long the progression should take (ms)
      private _progressiveSteps = 4; // Number of quality steps to take
      private _initialResolution = 0.1; // Starting resolution (very low)
      private _targetResolution = 0.5; // Final target resolution
      private _progressiveStep = 0; // Current step in the progression
      private _progressiveComplete = false; // Whether progressive loading is complete

      // Motion throttling during scroll properties
      private _scrollThrottleEnabled = false; // Whether scroll throttling is enabled
      private _scrollThrottleResolution = 0.2; // Reduced resolution during scroll
      private _scrollThrottleIterations = 12; // Reduced iterations during scroll
      private _scrollThrottleDuration = 300; // How long to maintain reduced quality after scroll stops (ms)
      private _isScrolling = false; // Whether user is currently scrolling
      private _lastScrollTime = 0; // When the last scroll event happened
      private _scrollThrottleTimeout: number | null = null; // Timeout for resetting after scroll
      private _preScrollResolution = 0; // Resolution before scroll throttling
      private _preScrollIterations = 0; // Iterations before scroll throttling
      constructor(props: any) {
        this.props = props;
        Common.init(props.$wrapper);
        Mouse.init(props.$wrapper);
        Mouse.autoIntensity = props.autoIntensity;
        Mouse.takeoverDuration = props.takeoverDuration;
        Mouse.onInteract = () => {
          this.lastUserInteraction = performance.now();
          if (this.autoDriver) this.autoDriver.forceStop();
        };
        this.autoDriver = new AutoDriver(Mouse, this as any, {
          enabled: props.autoDemo,
          speed: props.autoSpeed,
          resumeDelay: props.autoResumeDelay,
          rampDuration: props.autoRampDuration,
        });
        this.baseResolution = props.baseResolution ?? 0.5;
        this.baseIterationsPoisson = props.baseIterationsPoisson ?? 32;
        this.baseIterationsViscous = props.baseIterationsViscous ?? 32;
        this.minResolution = props.minResolution ?? 0.2;
        this.qualityStep = props.qualityStep ?? 0.85;
        this.lowFpsThreshold = props.lowFpsThreshold ?? 30;
        this.highFpsThreshold = props.highFpsThreshold ?? 55;
        this.adaptiveQuality = !!props.adaptiveQuality;
        this.adaptiveWarmupMs = props.adaptiveWarmupMs ?? 1200;
        this.adjustCooldownMs = props.adjustCooldownMs ?? 1000;
        this.capMobileFps = props.capMobileFps ?? 30;
        this.fpsCapIdleAfterMs = props.fpsCapIdleAfterMs ?? 1500;

        // Set frame budget based on device capability
        const preset = devicePresets[this._deviceTier];
        this._frameBudgetMs =
          preset.frameBudgetMs ||
          (this._deviceTier === 'low'
            ? 32
            : this._deviceTier === 'mid'
              ? 20
              : 16);

        // Apply texture downsample if specified for the device tier
        if (preset.textureDownsample && preset.textureDownsample > 1) {
          try {
            // Set up WebGL params for reduced texture memory usage
            const renderer = Common.renderer;
            if (renderer) {
              // Apply memory-saving settings
              renderer.setPixelRatio(
                Math.min(1, window.devicePixelRatio / preset.textureDownsample),
              );

              if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log(
                  `[LiquidEther] Memory optimization for ${this._deviceTier} tier: textureDownsample=${preset.textureDownsample}`,
                );
              }
            }
          } catch {
            // Silent catch if WebGL context access fails
          }
        }

        // Configure progressive loading based on device tier
        if (
          preset.initialResolution &&
          preset.progressiveDuration &&
          preset.progressiveSteps
        ) {
          // Add properties for progressive loading
          this._progressiveEnabled = true;
          this._progressiveStartTime = performance.now();
          this._initialResolution = preset.initialResolution;
          this._progressiveDuration = preset.progressiveDuration;
          this._progressiveSteps = preset.progressiveSteps;
          this._targetResolution = this.baseResolution;

          // Start with initial low resolution
          this.baseResolution = this._initialResolution;

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              `[LiquidEther] Progressive loading enabled for ${this._deviceTier} tier:`,
              {
                initialResolution: this._initialResolution,
                targetResolution: this._targetResolution,
                duration: this._progressiveDuration,
                steps: this._progressiveSteps,
              },
            );
          }
        }

        this.init();
        window.addEventListener('resize', this._resize);

        // Add scroll event listener for motion throttling if enabled
        if (this._scrollThrottleEnabled) {
          window.addEventListener('scroll', this._handleScroll, {
            passive: true,
          });
        }

        this._onVisibility = () => {
          const hidden = document.hidden;
          if (hidden) {
            this.pause();
          } else if (isVisibleRef.current) {
            this.start();
          }
        };
        document.addEventListener('visibilitychange', this._onVisibility);
      }
      init() {
        if (!Common.renderer) return;
        this.props.$wrapper.prepend(Common.renderer.domElement);
        // Prepare a gentle fade-in for first start to reduce perceived flicker.
        try {
          const el = Common.renderer.domElement as HTMLCanvasElement;
          el.style.opacity = '0';
          // Keep any existing transition if set by page styles
          if (!el.style.transition) el.style.transition = 'opacity 320ms ease';

          // Add WebGL context loss/restore event listeners for enhanced recovery
          el.addEventListener('webglcontextlost', this._handleContextLost, {
            passive: false,
          });
          el.addEventListener(
            'webglcontextrestored',
            this._handleContextRestored,
          );

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              '[LiquidEther] Enhanced WebGL context loss handling enabled',
            );
          }
        } catch {
          /* noop */
        }
        this.output = new Output();
      }
      resize() {
        Common.resize();
        this.output.resize();
      }
      render() {
        // Record frame start time for budget tracking
        this._frameStartTime = performance.now();
        this._frameCount++;

        // Frame skipper: if on mobile and idle, cap FPS by skipping renders.
        const now = this._frameStartTime;
        const idleFor = now - this.lastUserInteraction;

        // Advanced frame skipping logic:
        // 1. Skip if idle on mobile (basic throttle)
        // 2. Skip if we've had too many heavy frames in a row
        const skipForIdleThrottle =
          this._isMobile &&
          idleFor >= this.fpsCapIdleAfterMs &&
          this.capMobileFps > 0 &&
          now - this._lastRenderAt < 1000 / this.capMobileFps;

        const skipForHeavyFrames =
          this._deviceTier !== 'high' &&
          this._consecutiveHeavyFrames > this._maxConsecutiveHeavyFrames &&
          this._frameCount % 2 === 1; // Skip every other frame when struggling

        if (skipForIdleThrottle || skipForHeavyFrames) {
          // Skip this frame entirely, don't update adaptive/FPS samples.
          this._skipFrameCheck = true; // Don't count skipped frames in budget analysis
          return;
        }

        this._lastRenderAt = now;

        // Handle progressive quality loading if enabled
        if (this._progressiveEnabled && !this._progressiveComplete) {
          this._updateProgressiveLoading();
        }

        if (this.autoDriver) this.autoDriver.update();
        Mouse.update();
        Common.update();
        this.output.update();

        // Check if we exceeded frame budget and track consecutive heavy frames
        this._checkFrameBudget();
      }

      private _checkFrameBudget() {
        if (this._skipFrameCheck) {
          this._skipFrameCheck = false;
          return;
        }

        const frameDuration = performance.now() - this._frameStartTime;
        if (frameDuration > this._frameBudgetMs) {
          this._consecutiveHeavyFrames++;
        } else {
          // Slowly reduce the counter to avoid flickering between states
          this._consecutiveHeavyFrames = Math.max(
            0,
            this._consecutiveHeavyFrames - 0.5,
          );
        }
      }

      /**
       * Updates the simulation resolution based on progressive loading schedule
       */
      private _updateProgressiveLoading() {
        if (!this._progressiveEnabled || this._progressiveComplete) return;

        const sim = this.output?.simulation;
        if (!sim) return;

        // Calculate progress (0-1) based on elapsed time
        const elapsed = performance.now() - this._progressiveStartTime;
        const progress = Math.min(1.0, elapsed / this._progressiveDuration);

        // Calculate current target step (0 to steps-1)
        const targetStep = Math.floor(progress * this._progressiveSteps);

        // Only update if we've moved to a new step
        if (targetStep > this._progressiveStep) {
          this._progressiveStep = targetStep;

          // Interpolate between initial and target resolution
          const stepProgress = targetStep / (this._progressiveSteps - 1);
          const newResolution =
            this._initialResolution +
            (this._targetResolution - this._initialResolution) * stepProgress;

          // Apply the new resolution
          sim.options.resolution = newResolution;
          sim.resize();

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              `[LiquidEther] Progressive quality step ${this._progressiveStep}/${this._progressiveSteps}: resolution=${newResolution.toFixed(3)}`,
            );
          }
        }

        // Mark as complete when we reach the final stage
        if (progress >= 1.0) {
          this._progressiveComplete = true;

          // Ensure final resolution is exactly as targeted
          sim.options.resolution = this._targetResolution;
          sim.resize();

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('[LiquidEther] Progressive loading complete');
          }
        }
      }

      /**
       * Handles scroll events and reduces quality during scrolling
       */
      handleScroll() {
        if (!this._scrollThrottleEnabled) return;

        const sim = this.output?.simulation;
        if (!sim) return;

        if (!this._isScrolling) {
          // Store current values before reducing quality
          this._preScrollResolution = sim.options.resolution;
          this._preScrollIterations = sim.options.iterations_poisson;

          // Apply reduced quality during scroll
          sim.options.resolution = this._scrollThrottleResolution;
          sim.options.iterations_poisson = this._scrollThrottleIterations;
          sim.options.iterations_viscous = this._scrollThrottleIterations;
          sim.resize();

          this._isScrolling = true;

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              `[LiquidEther] Scroll throttling activated: resolution=${this._scrollThrottleResolution}`,
            );
          }
        }

        // Update last scroll time
        this._lastScrollTime = performance.now();

        // Clear any existing timeout
        if (this._scrollThrottleTimeout !== null) {
          window.clearTimeout(this._scrollThrottleTimeout);
          this._scrollThrottleTimeout = null;
        }

        // Set timeout to restore quality after scrolling stops
        this._scrollThrottleTimeout = window.setTimeout(() => {
          this._resetAfterScroll();
        }, this._scrollThrottleDuration);
      }

      /**
       * Resets quality settings after scroll throttling
       */
      private _resetAfterScroll() {
        if (!this._isScrolling) return;

        const sim = this.output?.simulation;
        if (!sim) return;

        // Restore pre-scroll settings
        if (this._preScrollResolution > 0) {
          sim.options.resolution = this._preScrollResolution;
          sim.options.iterations_poisson = this._preScrollIterations;
          sim.options.iterations_viscous = this._preScrollIterations;
          sim.resize();

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              `[LiquidEther] Scroll throttling deactivated: resolution restored to ${this._preScrollResolution}`,
            );
          }
        }

        this._isScrolling = false;
        this._scrollThrottleTimeout = null;
      }

      /**
       * Handles WebGL context loss events
       * This prevents the page from becoming unresponsive when WebGL crashes
       * @param event The context lost event
       */
      handleContextLost(event: Event) {
        // Prevent the default behavior which can cause page hanging
        event.preventDefault();

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(
            '[LiquidEther] WebGL context lost. Attempting to recover...',
          );
        }

        // Pause animation loop to prevent further errors
        this.pause();

        // Notify user of the issue with a reduced-quality fallback
        try {
          // Add a visible but subtle notification if we're in a visible component
          const wrapper = this.props.$wrapper;
          if (wrapper) {
            const notification = document.createElement('div');
            notification.className = 'liquid-ether-recovery-notification';
            notification.style.position = 'absolute';
            notification.style.bottom = '8px';
            notification.style.right = '8px';
            notification.style.background = 'rgba(0,0,0,0.5)';
            notification.style.color = 'rgba(255,255,255,0.8)';
            notification.style.padding = '4px 8px';
            notification.style.borderRadius = '4px';
            notification.style.fontSize = '10px';
            notification.style.pointerEvents = 'none';
            notification.style.zIndex = '1000';
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            notification.textContent = 'Visuals recovering...';
            wrapper.appendChild(notification);

            // Fade in the notification
            setTimeout(() => {
              notification.style.opacity = '1';
            }, 10);
          }
        } catch {
          // Ignore any errors here, recovery notification is not critical
        }

        return false;
      }

      /**
       * Handles WebGL context restoration events
       */
      handleContextRestored() {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(
            '[LiquidEther] WebGL context restored. Reinitializing...',
          );
        }

        try {
          // Reinitialize WebGL components
          this.init();

          // Restart the animation loop if the component is visible
          if (isVisibleRef.current && !document.hidden) {
            this.start();
          }

          // Remove any recovery notifications
          const notification = this.props.$wrapper.querySelector(
            '.liquid-ether-recovery-notification',
          );
          if (notification) {
            notification.style.opacity = '0';
            setTimeout(() => {
              try {
                notification.parentNode?.removeChild(notification);
              } catch {
                // Ignore removal errors
              }
            }, 500); // Remove after fade out
          }
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('[LiquidEther] Error during context recovery:', err);
          }
        }
      }
      private _recordFpsAndMaybeAdjust() {
        if (!this.adaptiveQuality) return;
        const now = performance.now();
        const dt = now - this.lastFrameTime;
        this.lastFrameTime = now;
        // If we are intentionally capping FPS (mobile + idle), we still want a stable
        // average but should avoid triggering quality reductions due to artificial cap.
        // We do that by only sampling FPS toward quality when not under cap.
        const idleFor = now - this.lastUserInteraction;
        const underCap =
          this._isMobile &&
          idleFor >= this.fpsCapIdleAfterMs &&
          this.capMobileFps > 0;
        if (underCap) return;
        if (dt <= 0) return;
        const fps = 1000 / dt;
        this._fpsSamples.push(fps);
        if (this._fpsSamples.length >= this._samplesLimit) {
          const avg =
            this._fpsSamples.reduce((a, b) => a + b, 0) /
            this._fpsSamples.length;
          this._fpsSamples.length = 0;
          // Defer adjustments until warmup passes to avoid initial thrash.
          if (now - this._createdAt >= this.adaptiveWarmupMs) {
            this._adjustQuality(avg);
          }
        }
      }
      private _adjustQuality(avgFps: number) {
        const sim = this.output?.simulation;
        if (!sim) return;
        const now = performance.now();
        // Respect cooldown between quality changes to prevent visible thrashing.
        if (now - this._lastAdjustAt < this.adjustCooldownMs) return;
        const curRes = sim.options.resolution;
        const curIterP = sim.options.iterations_poisson;
        const curIterV = sim.options.iterations_viscous;
        let didAdjust = false;
        if (avgFps < this.lowFpsThreshold) {
          const newRes = Math.max(
            this.minResolution,
            curRes * this.qualityStep,
          );
          if (newRes < curRes - 1e-6) {
            sim.options.resolution = newRes;
            sim.resize();
            didAdjust = true;
          }
          const newIterP = Math.max(8, Math.floor(curIterP * this.qualityStep));
          const newIterV = Math.max(8, Math.floor(curIterV * this.qualityStep));
          if (newIterP !== curIterP || newIterV !== curIterV) {
            sim.options.iterations_poisson = newIterP;
            sim.options.iterations_viscous = newIterV;
            didAdjust = true;
          }
          if (didAdjust) this._lastAdjustAt = now;
          return;
        }
        if (avgFps > this.highFpsThreshold) {
          const newRes = Math.min(
            this.baseResolution,
            curRes / this.qualityStep,
          );
          if (newRes > curRes + 1e-6) {
            sim.options.resolution = newRes;
            sim.resize();
            didAdjust = true;
          }
          const newIterP = Math.min(
            this.baseIterationsPoisson,
            Math.max(curIterP, Math.ceil(curIterP / this.qualityStep)),
          );
          const newIterV = Math.min(
            this.baseIterationsViscous,
            Math.max(curIterV, Math.ceil(curIterV / this.qualityStep)),
          );
          if (newIterP !== curIterP || newIterV !== curIterV) {
            sim.options.iterations_poisson = newIterP;
            sim.options.iterations_viscous = newIterV;
            didAdjust = true;
          }
          if (didAdjust) this._lastAdjustAt = now;
        }
      }
      loop() {
        if (!this.running) return;

        // Skip frame entirely if page is not visible
        if (document.hidden) {
          rafRef.current = requestAnimationFrame(this._loop);
          return;
        }

        // Check if any form field is focused (this gets set from the component's focus detection)
        // We use higher frameSkip when inputs are focused to improve typing responsiveness
        if (isFormFocusedRef.current && this._deviceTier !== 'high') {
          // Only render every 4th frame when forms are focused on lower-end devices
          if (this._frameCount % 4 !== 0) {
            this._frameCount++;
            rafRef.current = requestAnimationFrame(this._loop);
            return;
          }
        }

        this.render();
        this._recordFpsAndMaybeAdjust();
        rafRef.current = requestAnimationFrame(this._loop);
      }
      start() {
        if (this.running) return;
        this.running = true;
        // Fade in the canvas on the first ever start.
        if (!this._hasFadedIn && Common.renderer) {
          try {
            const el = Common.renderer.domElement as HTMLCanvasElement;
            // Trigger transition on next frame to ensure styles are applied.
            requestAnimationFrame(() => {
              el.style.opacity = '1';
            });
            this._hasFadedIn = true;
          } catch {
            /* noop */
          }
        }
        this._loop();
      }
      pause() {
        this.running = false;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }

      /**
       * Updates internal battery status and applies power saving optimizations
       */
      updateBatteryStatus(status: BatteryStatus, usePowerSaving: boolean) {
        // Store for reference
        this._batteryStatus = status;
        this._inPowerSavingMode = usePowerSaving;

        // Log battery status in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[LiquidEther] Battery status update:', {
            level: status.level,
            charging: status.charging,
            lowPower: status.lowPowerMode,
            powerSaving: usePowerSaving,
          });
        }

        // If progressive loading is active, wait for it to complete before applying battery settings
        if (this._progressiveEnabled && !this._progressiveComplete) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(
              '[LiquidEther] Delaying battery optimization until progressive loading completes',
            );
          }
          return;
        }

        // Get device preset to check for power-saving options
        const preset = devicePresets[this._deviceTier];
        if (!preset || !usePowerSaving) return;

        // Apply battery-saving settings if simulation is active
        const sim = this.output?.simulation;
        if (sim && sim.options) {
          // Apply reduced resolution and iterations if in power-saving mode
          if (preset.lowPowerResolution) {
            sim.options.resolution = preset.lowPowerResolution;

            // Update the target resolution for progressive loading in case it resumes
            if (this._progressiveEnabled) {
              this._targetResolution = preset.lowPowerResolution;
            }
          }

          if (preset.lowPowerIterations) {
            sim.options.iterations_poisson = preset.lowPowerIterations;
            sim.options.iterations_viscous = preset.lowPowerIterations;
          }

          // Resize to apply resolution change
          sim.resize();
        }
      }

      dispose() {
        try {
          // Remove all event listeners
          window.removeEventListener('resize', this._resize);

          // Remove scroll throttling event listener if it was enabled
          if (this._scrollThrottleEnabled) {
            window.removeEventListener('scroll', this._handleScroll);
          }

          // Clear any pending scroll throttle timeout
          if (this._scrollThrottleTimeout !== null) {
            window.clearTimeout(this._scrollThrottleTimeout);
            this._scrollThrottleTimeout = null;
          }

          if (this._onVisibility)
            document.removeEventListener(
              'visibilitychange',
              this._onVisibility,
            );

          Mouse.dispose();

          if (Common.renderer) {
            const canvas = Common.renderer.domElement;

            // Remove WebGL context recovery event listeners
            try {
              canvas.removeEventListener(
                'webglcontextlost',
                this._handleContextLost,
              );
              canvas.removeEventListener(
                'webglcontextrestored',
                this._handleContextRestored,
              );
            } catch {
              // Silent catch if event removal fails
            }

            if (canvas && canvas.parentNode)
              canvas.parentNode.removeChild(canvas);

            Common.renderer.dispose();
          }
        } catch {
          /* noop */
        }
      }
    }

    const container = mountRef.current;
    container.style.position = container.style.position || 'relative';
    container.style.overflow = container.style.overflow || 'hidden';

    const webgl = new WebGLManager({
      $wrapper: container,
      autoDemo: prefersReducedMotion ? false : autoDemo,
      autoSpeed,
      autoIntensity,
      takeoverDuration,
      autoResumeDelay,
      autoRampDuration,
      adaptiveQuality,
      lowFpsThreshold,
      highFpsThreshold,
      minResolution,
      qualityStep,
      adaptiveWarmupMs,
      adjustCooldownMs,
      capMobileFps,
      fpsCapIdleAfterMs,
      baseResolution: resolution,
      baseIterationsPoisson: iterationsPoisson,
      baseIterationsViscous: iterationsViscous,
    });
    webglRef.current = webgl;

    const applyOptionsFromProps = () => {
      if (!webglRef.current) return;
      const sim = webglRef.current.output?.simulation;
      if (!sim) return;
      const prevRes = sim.options.resolution;
      Object.assign(sim.options, {
        mouse_force: mouseForce,
        cursor_size: cursorSize,
        isViscous,
        viscous,
        iterations_viscous: iterationsViscous,
        iterations_poisson: iterationsPoisson,
        dt,
        BFECC,
        resolution,
        isBounce,
      });
      if (resolution !== prevRes) sim.resize();
    };
    applyOptionsFromProps();
    webgl.start();

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
        isVisibleRef.current = isVisible;
        if (!webglRef.current) return;
        if (isVisible && !document.hidden) {
          webglRef.current.start();
        } else {
          webglRef.current.pause();
        }
      },
      // Slightly higher small threshold reduces rapid toggling around 0.
      { threshold: [0, 0.05, 0.15] },
    );
    io.observe(container);
    intersectionObserverRef.current = io;

    const ro = new ResizeObserver(() => {
      if (!webglRef.current) return;
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        if (!webglRef.current) return;
        webglRef.current.resize();
      });
    });
    ro.observe(container);
    resizeObserverRef.current = ro;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) {
        try {
          resizeObserverRef.current.disconnect();
        } catch {
          /* noop */
        }
      }
      if (intersectionObserverRef.current) {
        try {
          intersectionObserverRef.current.disconnect();
        } catch {
          /* noop */
        }
      }
      if (webglRef.current) {
        webglRef.current.dispose();
      }
      webglRef.current = null;
    };
  }, [
    BFECC,
    cursorSize,
    dt,
    isBounce,
    isViscous,
    iterationsPoisson,
    iterationsViscous,
    mouseForce,
    resolution,
    viscous,
    colors,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
    adaptiveQuality,
    lowFpsThreshold,
    highFpsThreshold,
    minResolution,
    qualityStep,
    adaptiveWarmupMs,
    adjustCooldownMs,
    capMobileFps,
    fpsCapIdleAfterMs,
    prefersReducedMotion,
    // Device preset flags used inside effect (explicitly list to satisfy hooks linter)
    devicePreset.useMonochromeColors,
    devicePreset.useSimplifiedTextures,
  ]);

  useEffect(() => {
    const webgl = webglRef.current;
    if (!webgl) return;
    const sim = webgl.output?.simulation;
    if (!sim) return;
    const prevRes = sim.options.resolution;
    Object.assign(sim.options, {
      mouse_force: mouseForce,
      cursor_size: cursorSize,
      isViscous,
      viscous,
      iterations_viscous: iterationsViscous,
      iterations_poisson: iterationsPoisson,
      dt,
      BFECC,
      resolution,
      isBounce,
    });
    if (webgl.autoDriver) {
      webgl.autoDriver.enabled = autoDemo;
      webgl.autoDriver.speed = autoSpeed;
      webgl.autoDriver.resumeDelay = autoResumeDelay;
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;
      if (webgl.autoDriver.mouse) {
        webgl.autoDriver.mouse.autoIntensity = autoIntensity;
        webgl.autoDriver.mouse.takeoverDuration = takeoverDuration;
      }
    }
    // Update adaptive quality thresholds and smoothing values dynamically
    // so tweaking props doesn't require a remount.
    webgl.lowFpsThreshold = lowFpsThreshold;
    webgl.highFpsThreshold = highFpsThreshold;
    webgl.minResolution = minResolution;
    webgl.qualityStep = qualityStep;
    webgl.adaptiveQuality = adaptiveQuality;
    webgl.adaptiveWarmupMs = adaptiveWarmupMs;
    webgl.adjustCooldownMs = adjustCooldownMs;
    webgl.capMobileFps = capMobileFps;
    webgl.fpsCapIdleAfterMs = fpsCapIdleAfterMs;
    if (resolution !== prevRes) sim.resize();
  }, [
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    dt,
    BFECC,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
    adaptiveQuality,
    lowFpsThreshold,
    highFpsThreshold,
    minResolution,
    qualityStep,
    adaptiveWarmupMs,
    adjustCooldownMs,
    capMobileFps,
    fpsCapIdleAfterMs,
  ]);

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full touch-none overflow-hidden ${className || ''}`}
      style={style}
    />
  );
}
