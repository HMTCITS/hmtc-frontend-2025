'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PlaneBackgroundProps {
  className?: string;
}

export default function PlaneBackground({
  className = '',
}: PlaneBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const originalPositionsRef = useRef<Float32Array | null>(null);

  // Simplex noise function (simplified)
  const noise = (x: number, y: number, z: number): number => {
    return Math.sin(x * 0.5) * Math.cos(y * 0.5) * Math.sin(z * 0.3);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const mountElement = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background
    sceneRef.current = scene;

    // Get container dimensions for proper sizing
    const containerWidth = mountElement.offsetWidth || window.innerWidth;
    const containerHeight =
      mountElement.offsetHeight ||
      Math.max(window.innerHeight, document.documentElement.scrollHeight);

    // Camera setup - Ground perspective (looking at horizon)
    const camera = new THREE.PerspectiveCamera(
      60, // Slightly narrower FOV for more natural perspective
      containerWidth / containerHeight, // Use container aspect ratio
      0.1,
      1000,
    );
    // Position camera as if standing on ground looking toward horizon
    camera.position.set(0, 2, 0); // Elevated slightly above ground
    camera.lookAt(0, 0, -20); // Look toward the horizon
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountElement.appendChild(renderer.domElement);

    // Create particle plane geometry (horizontal ground plane)
    const width = 100; // Larger width for ground effect
    const depth = 100; // Depth instead of height for ground
    const widthSegments = 150;
    const depthSegments = 150;

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    // Create horizontal grid of particles (like ground/terrain)
    for (let i = 0; i <= widthSegments; i++) {
      for (let j = 0; j <= depthSegments; j++) {
        const x = (i / widthSegments - 0.5) * width;
        const z = (j / depthSegments - 0.5) * depth; // Z instead of Y for depth
        const y = 0; // Ground level

        positions.push(x, y, z);

        // Create distance-based color gradient (closer = brighter)
        const distanceFromCenter = Math.sqrt(x * x + z * z);
        const maxDistance = width * 0.5;
        const intensity = Math.max(0.3, 1 - distanceFromCenter / maxDistance);

        // White gradient with distance falloff
        colors.push(1 * intensity, 1 * intensity, 1 * intensity);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Store original positions for animation
    originalPositionsRef.current = new Float32Array(positions);

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 0.05, // Smaller size for more subtle effect
      transparent: true,
      opacity: 0.6, // Reduced opacity
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    // Create particle system
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Mouse tracking for interaction with delay
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Window resize handler
    const handleResize = () => {
      if (!camera || !renderer || !mountElement) return;

      const newWidth = mountElement.offsetWidth || window.innerWidth;
      const newHeight =
        mountElement.offsetHeight ||
        Math.max(window.innerHeight, document.documentElement.scrollHeight);

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clockRef.current.getElapsedTime();

      if (particleSystem && originalPositionsRef.current) {
        // Smooth mouse interaction with delay (lerp)
        const lerpFactor = 0.02; // Slower lerp for delayed effect
        mouseRef.current.x +=
          (targetMouseRef.current.x - mouseRef.current.x) * lerpFactor;
        mouseRef.current.y +=
          (targetMouseRef.current.y - mouseRef.current.y) * lerpFactor;

        const positions = particleSystem.geometry.attributes.position
          .array as Float32Array;
        const originalPositions = originalPositionsRef.current;

        // Create terrain-like wave effect with simplex noise
        for (let i = 0; i < positions.length; i += 3) {
          const originalX = originalPositions[i];
          const originalY = originalPositions[i + 1]; // This is always 0 (ground level)
          const originalZ = originalPositions[i + 2];

          // 1. Base terrain height using simplified noise (reduced intensity)
          const terrainHeight = noise(
            originalX * 0.015 + elapsedTime * 0.1, // Slower and smaller scale
            originalZ * 0.015 + elapsedTime * 0.05,
            elapsedTime * 0.05,
          );

          // 2. Secondary rolling waves across the terrain (reduced intensity)
          const rollingWave =
            Math.sin(originalX * 0.03 + originalZ * 0.02 + elapsedTime * 0.8) *
            0.4; // Reduced amplitude and speed

          // 3. Mouse interaction - create ripple effect on ground (reduced intensity)
          const mouseWorldX = mouseRef.current.x * 30; // Reduced scale
          const mouseWorldZ = mouseRef.current.y * 30;

          const distanceToMouse = Math.sqrt(
            Math.pow(originalX - mouseWorldX, 2) +
              Math.pow(originalZ - mouseWorldZ, 2),
          );

          const maxDistance = 20; // Increased range but reduced effect
          let mouseInfluence = 0;

          if (distanceToMouse < maxDistance) {
            const normalizedDistance = distanceToMouse / maxDistance;
            mouseInfluence = Math.cos(normalizedDistance * Math.PI * 0.5) * 1.5; // Reduced amplitude
            mouseInfluence *= Math.sin(elapsedTime * 2 - distanceToMouse * 0.2); // Slower oscillation
          }

          // Combine all effects to create Y displacement (height) with reduced overall intensity
          const finalY =
            originalY + terrainHeight * 1 + rollingWave + mouseInfluence; // Reduced multipliers

          // Update position (X and Z stay the same, only Y changes for terrain height)
          positions[i] = originalX;
          positions[i + 1] = finalY;
          positions[i + 2] = originalZ;
        }

        // Mark positions as needing update
        particleSystem.geometry.attributes.position.needsUpdate = true;

        // No rotation needed for ground plane - keep it horizontal
      }

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }

      // Dispose of Three.js resources
      if (particleSystem) {
        particleSystem.geometry.dispose();
        (particleSystem.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`bg-black absolute right-0 bottom-0 left-0 -z-20 ${className}`}
      style={{
        width: '100%',
        height: '100vh', // Full viewport height anchored from bottom
      }}
    />
  );
}
