'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export default function HeroPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0d25'); // Night sky

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(0, 7, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Sky Sphere with stars
    const skyGeo = new THREE.SphereGeometry(200, 48, 32);
    const skyMat = new THREE.MeshBasicMaterial({
      color: '#0c112a',
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // --- Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 700;
    const starPositions = [];
    for (let i = 0; i < starCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 190 + Math.random() * 8;
      starPositions.push(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.cos(phi) * r,
        Math.sin(phi) * Math.sin(theta) * r,
      );
    }
    starGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    const starMat = new THREE.PointsMaterial({ color: '#fff', size: 0.7 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Example Rocks
    const rocks: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const rockGeo = new THREE.DodecahedronGeometry(
        0.7 + Math.random() * 0.8,
        0,
      );
      const mat = new THREE.MeshStandardMaterial({
        color: ['#abbabf', '#4c5561', '#7e8e9f'][i % 3],
      });
      const mesh = new THREE.Mesh(rockGeo, mat);
      const angle = Math.random() * Math.PI * 2;
      const dist = 2.8 + Math.random() * 6;
      mesh.position.set(
        Math.cos(angle) * dist,
        0.6,
        Math.sin(angle) * dist - 2,
      );
      mesh.rotation.set(Math.random(), Math.random(), Math.random());
      mesh.castShadow = mesh.receiveShadow = true;
      scene.add(mesh);
      rocks.push(mesh);
    }

    // --- Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const moonLight = new THREE.DirectionalLight(0xcfe7ff, 1.3);
    moonLight.position.set(-20, 25, 10);
    scene.add(moonLight);

    // --- Infinite Water Plane (Reflector)
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const water = new Reflector(waterGeometry, {
      clipBias: 0.003,
      textureWidth: width * window.devicePixelRatio,
      textureHeight: height * window.devicePixelRatio,
      color: 0x2e3a50,
      // transparent: true, // opsional, jika ingin semi transparan
      // opacity: 0.85,      // (gunakan jika ingin air semi-transparan)
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    scene.add(water);

    // --- Overlay Fadeout (optional): agar tepi lautan menghilang, overlay plane fade di atas
    // (Bisa gunakan THREE.ShaderMaterial dengan alpha gradient, kecil, cukup di tengah view)
    // (lihat kode asli kamu untuk referensi cara bikin fade shader plane)

    // --- Animate rocks gently
    let frameId: number;
    function animate() {
      rocks.forEach((rock, i) => {
        rock.position.y = 0.6 + Math.sin(performance.now() * 0.0006 + i) * 0.08;
        rock.rotation.y += 0.002 * (i % 2 ? 1 : -1);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      skyGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      rocks.forEach((r) => r.geometry.dispose());
      rocks.forEach((r) =>
        Array.isArray(r.material)
          ? r.material.forEach((m) => m.dispose())
          : r.material.dispose(),
      );
      waterGeometry.dispose();
      water.dispose?.();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100vw', height: '100vh', background: '#0a0d25' }}
    />
  );
}
