/**
 * Utility functions for device capability detection and optimization
 * This helps optimize the WebGL experience for different device capabilities
 */

/**
 * Device tier types for performance optimization
 */
export type DeviceTier = 'low' | 'mid' | 'high' | 'server';

/**
 * Battery status for power-aware rendering adjustments
 */
export interface BatteryStatus {
  charging: boolean;
  level: number;
  lowPowerMode: boolean;
}

/**
 * Default battery status when API is not available
 */
const DEFAULT_BATTERY_STATUS: BatteryStatus = {
  charging: true,
  level: 1.0,
  lowPowerMode: false,
};

/**
 * Detects device capabilities and returns a performance tier.
 * - 'high': Desktop or high-end mobile devices with good GPU/CPU
 * - 'mid': Mid-range mobile devices
 * - 'low': Low-end mobile devices or devices with limited resources
 * - 'server': Server-side rendering (fallback)
 */
export function detectDeviceTier(): DeviceTier {
  // Server-side rendering check
  if (typeof window === 'undefined') return 'server';

  // User agent detection for mobile
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);

  // If not mobile, assume high-end desktop
  if (!isMobile) return 'high';

  // Memory detection for capable browsers
  const memory = (navigator as any).deviceMemory || 4; // fallback to mid-tier

  // Detect low-end devices based on memory or specific old models
  const lowEndDevice =
    memory <= 2 ||
    /Android [4-7]|iPhone ([5-8]|SE)|iPad Air 1|iPad Mini [1-3]/i.test(ua);

  // Detect mid-tier devices
  const midTierDevice =
    (memory > 2 && memory < 6) ||
    /iPhone (X|XR|XS|1[0-3])|iPad Air [23]|iPad Pro|iPad 201[7-9]|Android [89]/i.test(
      ua,
    );

  // CPU core detection when available
  let cores = 4;
  try {
    cores = navigator.hardwareConcurrency || 4;
  } catch {
    // Ignore errors in browsers that don't support this
  }

  // Make final determination
  if (lowEndDevice || cores <= 2) return 'low';
  if (midTierDevice || cores <= 4) return 'mid';
  return 'high'; // High-end mobile devices
}

/**
 * Configuration presets for different device tiers
 */
export interface DevicePreset {
  resolution: number;
  iterationsPoisson: number;
  iterationsViscous: number;
  dt: number;
  viscous?: number;
  autoDemo?: boolean;
  capMobileFps: number;
  fpsCapIdleAfterMs?: number;
  adaptiveQuality?: boolean;
  qualityStep?: number;
  minResolution?: number;
  frameBudgetMs?: number;
  // Battery-aware settings
  lowPowerResolution?: number; // Resolution when in low power mode
  lowPowerIterations?: number; // Iterations when in low power mode
  lowBatteryThreshold?: number; // Level below which to apply power saving (0-1)
  // Texture memory optimizations
  useSimplifiedTextures?: boolean; // Use simpler textures for low-end devices
  textureDownsample?: number; // Texture downsampling factor (1 = full res, 2 = half res, etc.)
  useMonochromeColors?: boolean; // Use simplified color scheme for better compression
  // Progressive loading
  initialResolution?: number; // Starting resolution for progressive loading
  progressiveDuration?: number; // Duration in ms for progressive quality increase
  progressiveSteps?: number; // Number of steps for progressive quality increase
  // Motion throttling during scroll
  scrollThrottleEnabled?: boolean; // Whether to throttle quality during scroll
  scrollThrottleResolution?: number; // Reduced resolution during scroll
  scrollThrottleIterations?: number; // Reduced iterations during scroll
  scrollThrottleDuration?: number; // How long to maintain reduced quality after scroll stops (ms)
}

/**
 * Get current battery status if available
 * @returns Promise resolving to battery status
 */
export async function getBatteryStatus(): Promise<BatteryStatus> {
  // Return default values if not in browser
  if (typeof window === 'undefined') return DEFAULT_BATTERY_STATUS;

  try {
    // Try the standard Battery API
    if ('getBattery' in navigator) {
      const battery = await (navigator as any).getBattery();
      return {
        charging: battery.charging,
        level: battery.level,
        // iOS specific detection via media query
        lowPowerMode:
          window.matchMedia?.('(prefers-reduced-data: reduce)').matches ||
          window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches,
      };
    }

    // iOS devices may expose battery status via media query
    if (
      window.matchMedia?.('(prefers-reduced-data: reduce)').matches ||
      window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches
    ) {
      return {
        charging: false, // Assume not charging in low power mode
        level: 0.5, // Assume half battery when in low power mode
        lowPowerMode: true,
      };
    }
  } catch {
    // Silent fallback if API access fails
  }

  return DEFAULT_BATTERY_STATUS;
}

/**
 * Preset configurations for different device tiers
 */
export const devicePresets: Record<DeviceTier, DevicePreset> = {
  server: {
    resolution: 0.1, // Very low for SSR
    iterationsPoisson: 8,
    iterationsViscous: 8,
    dt: 0.02,
    autoDemo: false,
    capMobileFps: 0, // No capping on server
  },
  low: {
    resolution: 0.15,
    iterationsPoisson: 12,
    iterationsViscous: 12,
    dt: 0.018,
    viscous: 20,
    capMobileFps: 24,
    fpsCapIdleAfterMs: 1000, // Quicker idle detection on low-end
    adaptiveQuality: true,
    qualityStep: 0.8, // More aggressive quality scaling
    minResolution: 0.1,
    frameBudgetMs: 32, // ~30fps max
    // Battery-aware settings - very aggressive power saving
    lowPowerResolution: 0.08,
    lowPowerIterations: 8,
    lowBatteryThreshold: 0.3, // Below 30% battery
    // Texture memory optimizations
    useSimplifiedTextures: true,
    textureDownsample: 4, // Quarter resolution textures
    useMonochromeColors: true, // Single color with opacity variations for minimal memory usage
    // Progressive loading (much more gradual for low-end devices)
    initialResolution: 0.05, // Start extremely low
    progressiveDuration: 3000, // Longer ramp-up
    progressiveSteps: 6, // More steps for smoother progression
    // Motion throttling during scroll (aggressive for low-end)
    scrollThrottleEnabled: true,
    scrollThrottleResolution: 0.07, // Very low quality during scroll
    scrollThrottleIterations: 6, // Minimum iterations
    scrollThrottleDuration: 500, // Hold reduced quality for 500ms after scroll
  },
  mid: {
    resolution: 0.35,
    iterationsPoisson: 18,
    iterationsViscous: 18,
    dt: 0.015,
    viscous: 16,
    capMobileFps: 30,
    fpsCapIdleAfterMs: 3000,
    adaptiveQuality: true,
    qualityStep: 0.9,
    minResolution: 0.2,
    frameBudgetMs: 26, // ~38fps max
    // Battery-aware settings
    lowPowerResolution: 0.2,
    lowPowerIterations: 12,
    lowBatteryThreshold: 0.2, // Below 20% battery
    // Texture memory optimizations
    useSimplifiedTextures: true,
    textureDownsample: 2, // Half resolution textures
    useMonochromeColors: false,
    // Progressive loading
    initialResolution: 0.1, // Start at lower resolution
    progressiveDuration: 2000, // 2 seconds ramp-up
    progressiveSteps: 4, // Moderate number of steps
    // Motion throttling during scroll (moderate for mid-range)
    scrollThrottleEnabled: true,
    scrollThrottleResolution: 0.15, // Reduced quality during scroll
    scrollThrottleIterations: 10, // Reduced iterations
    scrollThrottleDuration: 300, // Hold reduced quality for 300ms after scroll
  },
  high: {
    resolution: 0.5,
    iterationsPoisson: 24,
    iterationsViscous: 24,
    dt: 0.01,
    viscous: 12,
    capMobileFps: 60,
    fpsCapIdleAfterMs: 5000,
    adaptiveQuality: true,
    qualityStep: 0.95,
    minResolution: 0.3,
    frameBudgetMs: 16, // ~60fps max
    // Battery-aware settings
    lowPowerResolution: 0.3,
    lowPowerIterations: 18,
    lowBatteryThreshold: 0.15, // Below 15% battery
    // Texture memory optimizations
    useSimplifiedTextures: false,
    textureDownsample: 1, // Full resolution textures
    useMonochromeColors: false,
    // Progressive loading
    initialResolution: 0.2, // Start at moderate resolution
    progressiveDuration: 1500, // Quick ramp-up
    progressiveSteps: 3, // Fewer steps for faster progression
    // Motion throttling during scroll (light for high-end)
    scrollThrottleEnabled: true,
    scrollThrottleResolution: 0.3, // Slightly reduced quality during scroll
    scrollThrottleIterations: 16, // Slightly reduced iterations
    scrollThrottleDuration: 150, // Hold reduced quality for 150ms after scroll
  },
};
