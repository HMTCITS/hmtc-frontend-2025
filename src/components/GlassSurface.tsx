'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
    | 'plus-darker'
    | 'plus-lighter';
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

// Deteksi kemampuan device (low-end, mid-tier, high-end)
const useDeviceOptimization = () => {
  const [deviceTier, setDeviceTier] = useState<
    'high' | 'mid' | 'low' | 'server'
  >('server');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectTier = () => {
      const ua = navigator.userAgent;
      const memory = (navigator as any).deviceMemory || 4;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
      const isOldMobile = /Android [4-7]|iPhone [5-8]/i.test(ua);
      const cores = navigator.hardwareConcurrency || 4;

      if (isOldMobile || (isMobile && memory <= 2) || cores <= 2) {
        return 'low';
      } else if (isMobile || memory <= 4 || cores <= 4) {
        return 'mid';
      }
      return 'high';
    };

    // Gunakan session storage untuk cache hasil deteksi
    try {
      const cached = sessionStorage.getItem('device-tier');
      if (cached) {
        setDeviceTier(cached as 'high' | 'mid' | 'low');
      } else {
        const detected = detectTier();
        setDeviceTier(detected);
        sessionStorage.setItem('device-tier', detected);
      }
    } catch {
      setDeviceTier(detectTier());
    }
  }, []);

  return deviceTier;
};

// Feature detection yang ter-cache untuk peningkatan performa
const useFeatureDetection = () => {
  const [features, setFeatures] = useState({
    svgFilters: false,
    backdropFilter: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Coba ambil dari session storage dulu
    try {
      const cached = sessionStorage.getItem('glass-features');
      if (cached) {
        setFeatures(JSON.parse(cached));
        return;
      }
    } catch {
      // Ignore errors, continue with detection
    }

    // Lakukan deteksi jika belum ada cache
    const svgFilters = (() => {
      const isWebkit =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);

      if (isWebkit || isFirefox) return false;

      const div = document.createElement('div');
      try {
        (div.style as any).backdropFilter = 'url(#test)';
        return !!(div.style as any).backdropFilter;
      } catch {
        return false;
      }
    })();

    const backdropFilter = (() => {
      try {
        return (
          CSS &&
          typeof CSS.supports === 'function' &&
          CSS.supports('backdrop-filter', 'blur(10px)')
        );
      } catch {
        return false;
      }
    })();

    const newFeatures = { svgFilters, backdropFilter };
    setFeatures(newFeatures);

    // Cache hasil untuk session
    try {
      sessionStorage.setItem('glass-features', JSON.stringify(newFeatures));
    } catch {
      // Ignore storage errors
    }
  }, []);

  return features;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  // Refs untuk optimasi
  const cachedMapRef = useRef<string | null>(null);
  const lastDimsRef = useRef<{ width: number; height: number } | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isScrollingRef = useRef<boolean>(false);
  const resizeDebounceRef = useRef<number | null>(null);
  const initialRenderRef = useRef<boolean>(true);

  const isDarkMode = useDarkMode();
  const deviceTier = useDeviceOptimization();
  const useLightweightMode = deviceTier === 'low';
  const useMidMode = deviceTier === 'mid';
  const features = useFeatureDetection();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    initialRenderRef.current = true;

    // Tandai render awal selesai setelah paint pertama
    const timeout = setTimeout(() => {
      initialRenderRef.current = false;
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Props yang disesuaikan untuk berbagai tier device
  const adjustedProps = {
    borderRadius: useMidMode ? Math.min(borderRadius, 16) : borderRadius,
    borderWidth: useLightweightMode ? 0.03 : useMidMode ? 0.05 : borderWidth,
    brightness: useMidMode ? brightness - 5 : brightness,
    opacity: useLightweightMode ? Math.min(opacity + 0.05, 1) : opacity,
    blur: useLightweightMode ? Math.min(blur - 3, 8) : useMidMode ? Math.min(blur, 10) : blur,
    displace: useLightweightMode ? Math.max(displace - 2, 0) : displace,
  };

  const generateDisplacementMap = useCallback(() => {
    if (!containerRef.current) return '';

    // If cached and dimensions exist, try to reuse
    if (cachedMapRef.current && lastDimsRef.current) {
      const { width: lw, height: lh } = lastDimsRef.current;
      const rect = containerRef.current.getBoundingClientRect();
      const actualWidth = Math.max(1, Math.round(rect.width || 400));
      const actualHeight = Math.max(1, Math.round(rect.height || 200));
      const threshold = useMidMode ? 10 : 4;
      if (Math.abs(lw - actualWidth) < threshold && Math.abs(lh - actualHeight) < threshold) {
        return cachedMapRef.current || '';
      }
    }

    // Skip if not visible and we have a cache
    if (!isVisibleRef.current && cachedMapRef.current) return cachedMapRef.current;

    // Skip during scrolling
    if (isScrollingRef.current) return cachedMapRef.current || '';

    const rect = containerRef.current.getBoundingClientRect();
    const actualWidth = Math.max(1, Math.round(rect.width || 400));
    const actualHeight = Math.max(1, Math.round(rect.height || 200));

    // Threshold changes
    if (lastDimsRef.current) {
      const { width: lw, height: lh } = lastDimsRef.current;
      const threshold = useMidMode ? 10 : 4;
      if (Math.abs(lw - actualWidth) < threshold && Math.abs(lh - actualHeight) < threshold) {
        return cachedMapRef.current || '';
      }
    }

    const edgeSize = Math.min(actualWidth, actualHeight) * (adjustedProps.borderWidth * 0.5);

    // Simple SVG for mid-tier
    if (useMidMode) {
      const simpleSvgContent = `
        <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${adjustedProps.borderRadius}" fill="hsl(0 0% ${adjustedProps.brightness}% / ${adjustedProps.opacity})" />
        </svg>
      `;
      const dataUrl = `data:image/svg+xml,${encodeURIComponent(simpleSvgContent)}`;
      cachedMapRef.current = dataUrl;
      lastDimsRef.current = { width: actualWidth, height: actualHeight };
      return dataUrl;
    }

    // Full SVG for high-end
    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${adjustedProps.borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${adjustedProps.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${adjustedProps.borderRadius}" fill="hsl(0 0% ${adjustedProps.brightness}% / ${adjustedProps.opacity})" style="filter:blur(${adjustedProps.blur}px)" />
      </svg>
    `;

    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    cachedMapRef.current = dataUrl;
    lastDimsRef.current = { width: actualWidth, height: actualHeight };
    return dataUrl;
  }, [
    useMidMode,
    adjustedProps.borderWidth,
    adjustedProps.borderRadius,
    adjustedProps.brightness,
    adjustedProps.opacity,
    adjustedProps.blur,
    mixBlendMode,
    redGradId,
    blueGradId,
  ]);

  const updateDisplacementMap = useCallback(() => {
    // Lewati update untuk mode lightweight
    if (useLightweightMode) return;

    // Lewati jika tidak visible atau selama render awal
    if (!isVisibleRef.current || initialRenderRef.current) return;

    // Lewati jika scrolling
    if (isScrollingRef.current) return;

    // Hanya update SVG jika kita menggunakannya
    if (feImageRef.current && deviceTier === 'high') {
      feImageRef.current.setAttribute('href', generateDisplacementMap());
    }
  }, [generateDisplacementMap, useLightweightMode, deviceTier]);

  // Deteksi scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      isScrollingRef.current = true;

      // Hapus timeout yang ada
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Set timeout baru
      scrollTimeout = setTimeout(
        () => {
          isScrollingRef.current = false;

          // Update setelah scrolling berhenti, tapi hanya jika visible dan bukan lightweight mode
          if (
            isVisibleRef.current &&
            !useLightweightMode &&
            feImageRef.current
          ) {
            updateDisplacementMap();
          }
        },
        useMidMode ? 300 : 150,
      ); // Timeout lebih lama untuk mid-tier
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [updateDisplacementMap, useLightweightMode, useMidMode]);

  // Apply parameter filter SVG saat properti terkait berubah
  useEffect(() => {
    // Lewati untuk lightweight mode
    if (useLightweightMode) return;

    // Hanya update jika kita di high-end device
    if (deviceTier === 'high') {
      updateDisplacementMap();

      // Update parameter displacement
      [
        { ref: redChannelRef, offset: redOffset },
        { ref: greenChannelRef, offset: greenOffset },
        { ref: blueChannelRef, offset: blueOffset },
      ].forEach(({ ref, offset }) => {
        if (ref.current) {
          ref.current.setAttribute(
            'scale',
            (distortionScale + offset).toString(),
          );
          ref.current.setAttribute('xChannelSelector', xChannel);
          ref.current.setAttribute('yChannelSelector', yChannel);
        }
      });

      gaussianBlurRef.current?.setAttribute(
        'stdDeviation',
        adjustedProps.displace.toString(),
      );
    }
  }, [
    width,
    height,
    adjustedProps.borderRadius,
    adjustedProps.borderWidth,
    adjustedProps.brightness,
    adjustedProps.opacity,
    adjustedProps.blur,
    adjustedProps.displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
    updateDisplacementMap,
    useLightweightMode,
    deviceTier,
  ]);

  // ResizeObserver yang dioptimasi
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Delay debounce berbeda berdasarkan device
    const debounceDelay = useLightweightMode ? 0 : useMidMode ? 200 : 100;

    // ResizeObserver dengan debounce yang sesuai
    const resizeObserver = new ResizeObserver(() => {
      if (resizeDebounceRef.current)
        cancelAnimationFrame(resizeDebounceRef.current);

      // Tidak perlu jadwalkan update untuk lightweight mode
      if (useLightweightMode) return;

      resizeDebounceRef.current = requestAnimationFrame(() => {
        // Hanya jadwalkan jika visible dan tidak scrolling
        if (
          isVisibleRef.current &&
          !isScrollingRef.current &&
          !initialRenderRef.current
        ) {
          setTimeout(updateDisplacementMap, debounceDelay);
        }
      });
    });

    // IntersectionObserver yang kurang sensitif untuk performa lebih baik
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current =
          entry.isIntersecting && entry.intersectionRatio > 0.05;

        // Hanya update saat menjadi visible setelah invisible
        if (
          isVisibleRef.current &&
          !wasVisible &&
          !useLightweightMode &&
          !initialRenderRef.current
        ) {
          setTimeout(updateDisplacementMap, 100);
        }
      },
      { threshold: [0, 0.05] }, // Threshold lebih sedikit untuk performa lebih baik
    );

    resizeObserver.observe(el);
    io.observe(el);

    return () => {
      try {
        resizeObserver.disconnect();
      } catch (e: unknown) {
        void e;
      }
      try {
        io.disconnect();
      } catch (e: unknown) {
        void e;
      }
      if (resizeDebounceRef.current)
        cancelAnimationFrame(resizeDebounceRef.current);
      resizeDebounceRef.current = null;
    };
  }, [updateDisplacementMap, useLightweightMode, useMidMode]);

  const getContainerStyles = (client = false): React.CSSProperties => {
    // style dasar yang sama untuk semua rendering
    const baseStyles: React.CSSProperties = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${adjustedProps.borderRadius}px`,
      ['--glass-frost' as any]: String(backgroundOpacity),
      ['--glass-saturation' as any]: String(saturation),
    };

    // Server / pre-mount: kembalikan minimal styles untuk SSR
    if (!client) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `rgba(0,0,0,${backgroundOpacity})`
          : `rgba(255,255,255,${backgroundOpacity})`,
      };
    }

    // Mobile low-end: sangat disederhanakan
    if (useLightweightMode) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `rgba(0,0,0,${backgroundOpacity * 1.3})`
          : `rgba(255,255,255,${backgroundOpacity * 1.3})`,
        backdropFilter: features.backdropFilter
          ? `blur(8px) saturate(${saturation})`
          : undefined,
        WebkitBackdropFilter: features.backdropFilter
          ? `blur(8px) saturate(${saturation})`
          : undefined,
        border:
          '1px solid ' +
          (isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)'),
        boxShadow: isDarkMode
          ? '0 0 1px 0 rgba(255,255,255,0.15)'
          : '0 0 1px 0 rgba(0,0,0,0.08)',
      };
    }

    // Mid-range mobile: CSS sederhana saja, lewati SVG filters
    if (useMidMode) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `rgba(0,0,0,${backgroundOpacity * 1.2})`
          : `rgba(255,255,255,${backgroundOpacity * 1.2})`,
        backdropFilter: features.backdropFilter
          ? `blur(${adjustedProps.blur}px) saturate(${saturation})`
          : undefined,
        WebkitBackdropFilter: features.backdropFilter
          ? `blur(${adjustedProps.blur}px) saturate(${saturation})`
          : undefined,
        border:
          '1px solid ' +
          (isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)'),
        boxShadow: isDarkMode
          ? '0 1px 2px 0 rgba(0,0,0,0.1), 0 0 1px 0 rgba(255,255,255,0.08) inset'
          : '0 1px 3px 0 rgba(0,0,0,0.08), 0 0 1px 0 rgba(255,255,255,0.25) inset',
      };
    }

    // High-end: full SVG filter dan efek
    if (features.svgFilters) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `hsl(0 0% 0% / ${backgroundOpacity})`
          : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode
          ? `0 0 2px 1px rgba(255,255,255,0.15) inset,
             0 0 10px 4px rgba(255,255,255,0.05) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05)`
          : `0 0 2px 1px rgba(0,0,0,0.15) inset,
             0 0 10px 4px rgba(0,0,0,0.1) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05)`,
      };
    }

    // Fallback untuk browser tanpa SVG filters
    if (features.backdropFilter) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 0.25)',
        backdropFilter: `blur(${adjustedProps.blur}px) saturate(${saturation}) brightness(1.1)`,
        WebkitBackdropFilter: `blur(${adjustedProps.blur}px) saturate(${saturation}) brightness(1.1)`,
        border: isDarkMode
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: isDarkMode
          ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      };
    }

    // Fallback absolut untuk browser lama
    return {
      ...baseStyles,
      background: isDarkMode
        ? 'rgba(0, 0, 0, 0.4)'
        : 'rgba(255, 255, 255, 0.4)',
      border: isDarkMode
        ? '1px solid rgba(255, 255, 255, 0.2)'
        : '1px solid rgba(255, 255, 255, 0.3)',
    };
  };

  const glassSurfaceClasses =
    'relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out';

  const focusVisibleClasses = isDarkMode
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';

  return (
    <div
      ref={containerRef}
      className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
      style={isMounted ? getContainerStyles(true) : getContainerStyles(false)}
    >
      {/* Render SVG filter hanya untuk device high-end */}
      {isMounted && deviceTier === 'high' && features.svgFilters && (
        <svg
          className='pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters='sRGB'
              x='0%'
              y='0%'
              width='100%'
              height='100%'
            >
              <feImage
                ref={feImageRef}
                x='0'
                y='0'
                width='100%'
                height='100%'
                preserveAspectRatio='none'
                result='map'
              />

              <feDisplacementMap
                ref={redChannelRef}
                in='SourceGraphic'
                in2='map'
                id='redchannel'
                result='dispRed'
              />
              <feColorMatrix
                in='dispRed'
                type='matrix'
                values='1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0'
                result='red'
              />

              <feDisplacementMap
                ref={greenChannelRef}
                in='SourceGraphic'
                in2='map'
                id='greenchannel'
                result='dispGreen'
              />
              <feColorMatrix
                in='dispGreen'
                type='matrix'
                values='0 0 0 0 0
                        0 1 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0'
                result='green'
              />

              <feDisplacementMap
                ref={blueChannelRef}
                in='SourceGraphic'
                in2='map'
                id='bluechannel'
                result='dispBlue'
              />
              <feColorMatrix
                in='dispBlue'
                type='matrix'
                values='0 0 0 0 0
                        0 0 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0'
                result='blue'
              />

              <feBlend in='red' in2='green' mode='screen' result='rg' />
              <feBlend in='rg' in2='blue' mode='screen' result='output' />
              <feGaussianBlur
                ref={gaussianBlurRef}
                in='output'
                stdDeviation='0.7'
              />
            </filter>
          </defs>
        </svg>
      )}

      <div className='relative z-10 flex h-full w-full items-center justify-center rounded-[inherit] p-2'>
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
