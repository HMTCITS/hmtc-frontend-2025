'use client';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { terrain } from '@/contents/terrain';

const SIZE_X = 30;
const SIZE_Z = 30;
const SIZE_Y = 60;
const BLOCK_SIZE = 1;

// Convert [x,y,z][] to {x,z,ys:number[]}
function xyzArrayToXZYS(
  arr: [number, number, number][],
  _: number,
): Array<{ x: number; z: number; ys: number[] }> {
  const map = new Map<string, number[]>();
  for (const [x, y, z] of arr) {
    const key = `${x},${z}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(y);
  }
  return Array.from(map.entries()).map(([key, ys]) => {
    const [x, z] = key.split(',').map(Number);
    return { x, z, ys };
  });
}

// Fallback: terrain default
function mapTerrainToObjects(
  arr: number[][],
  sizeX: number,
): Array<{ x: number; z: number; ys: number[] }> {
  return arr.map((ys, i) => ({
    x: i % sizeX,
    z: Math.floor(i / sizeX),
    ys,
  }));
}

const terrainData = mapTerrainToObjects(terrain, SIZE_X);

const VoxelSideView: React.FC<{ xyzBlocks?: [number, number, number][] }> = ({
  xyzBlocks,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- SETUP ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#b3e0ff');

    // --- CAMERA ---
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300);
    camera.position.set(14.39, 16.3, -35.49);
    camera.lookAt(12.32, 11.34, 7.16);

    // --- LIGHTING ---
    const camPos = camera.position.clone();
    const camTarget = new THREE.Vector3(12.32, 11.34, 7.16);
    const viewDir = camTarget.clone().sub(camPos).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const left = new THREE.Vector3().crossVectors(up, viewDir).normalize();
    const lightPos = camPos
      .clone()
      .add(left.multiplyScalar(18))
      .add(up.multiplyScalar(18))
      .add(viewDir.clone().multiplyScalar(-13));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.12);
    dirLight.position.copy(lightPos);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.44));

    // --- SHARED GEOM & MATERIAL ---
    const blockGeo = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    // Hanya 3 warna gradien untuk semua blok (hemat RAM)
    const colorLow = new THREE.Color('#4f6d3c');
    const colorMid = new THREE.Color('#b7c96d');
    const colorHi = new THREE.Color('#e7e5b2');
    const matCache: THREE.Material[] = [
      new THREE.MeshLambertMaterial({ color: colorLow }),
      new THREE.MeshLambertMaterial({ color: colorMid }),
      new THREE.MeshLambertMaterial({ color: colorHi }),
    ];
    function getBlockMaterial(y: number) {
      if (y < SIZE_Y * 0.45) return matCache[0];
      if (y < SIZE_Y * 0.75) return matCache[1];
      return matCache[2];
    }

    // Outline: 1 instance, re-used by all outline meshes
    const outlineMat = new THREE.MeshBasicMaterial({
      color: 0x222222,
      side: THREE.BackSide,
      depthWrite: false,
    });

    // --- DATA ---
    const useData = xyzBlocks ? xyzArrayToXZYS(xyzBlocks, SIZE_X) : terrainData;

    // --- GROUP ---
    const group = new THREE.Group();
    scene.add(group);

    // --- BLOCKS (build mesh list, belum ditambah ke scene) ---
    type BlockAnim = {
      mesh: THREE.Mesh;
      outline: THREE.Mesh;
      animOrder: number;
    };
    const blocksToAnimate: BlockAnim[] = [];
    for (const { x, z, ys } of useData) {
      const sortedYs = ys.length > 1 ? ys.slice().sort((a, b) => a - b) : ys;
      for (let idx = 0; idx < sortedYs.length; idx++) {
        const y = sortedYs[idx];
        // Block
        const mesh = new THREE.Mesh(blockGeo, getBlockMaterial(y));
        mesh.position.set(
          x * BLOCK_SIZE,
          y * BLOCK_SIZE + BLOCK_SIZE / 2,
          z * BLOCK_SIZE,
        );
        mesh.scale.set(1, 0, 1); // y=0 (tidak terlihat)
        mesh.matrixAutoUpdate = true;

        // Outline
        const outline = new THREE.Mesh(blockGeo, outlineMat);
        outline.position.copy(mesh.position);
        outline.scale.set(1.07, 0, 1.07);

        // Batching animasi: radius + y + random
        const cx = SIZE_X / 2 - 0.5,
          cz = SIZE_Z / 2 - 0.5;
        const dx = x - cx,
          dz = z - cz;
        const radius = Math.sqrt(dx * dx + dz * dz);
        const animOrder = radius * 1.5 + y * 0.9 + Math.random() * 0.06;
        blocksToAnimate.push({ mesh, outline, animOrder });
      }
    }

    // --- ANIMATION: Bounce batch, seefisien mungkin ---
    blocksToAnimate.sort((a, b) => a.animOrder - b.animOrder);

    // Lebih banyak per batch, delay sangat kecil
    const batchSize = 48;
    const durationGrow = 0.09;
    const delayPerBatch = 0.009;

    let batchIdx = 0;
    function animateBatch() {
      const start = batchIdx * batchSize;
      const end = Math.min(start + batchSize, blocksToAnimate.length);
      for (let i = start; i < end; i++) {
        const block = blocksToAnimate[i];
        group.add(block.mesh);
        group.add(block.outline);

        gsap.to(block.mesh.scale, {
          y: 1.08,
          duration: durationGrow,
          ease: 'back.out(2.7)',
          onUpdate: () => {
            block.outline.scale.y = block.mesh.scale.y * 1.07;
          },
          onComplete: () => {
            gsap.to(block.mesh.scale, {
              y: 1,
              duration: 0.11,
              ease: 'elastic.out(1.05, 0.4)',
              onUpdate: () => {
                block.outline.scale.y = block.mesh.scale.y * 1.07;
              },
            });
          },
        });
        gsap.to(block.mesh.scale, {
          x: 1.07,
          z: 1.07,
          duration: durationGrow * 0.82,
          ease: 'back.out(1.5)',
          onUpdate: () => {
            block.outline.scale.x = block.mesh.scale.x * 1.01;
            block.outline.scale.z = block.mesh.scale.z * 1.01;
          },
          onComplete: () => {
            gsap.to(block.mesh.scale, {
              x: 1,
              z: 1,
              duration: 0.1,
              ease: 'elastic.out(1.03, 0.41)',
              onUpdate: () => {
                block.outline.scale.x = block.mesh.scale.x * 1.01;
                block.outline.scale.z = block.mesh.scale.z * 1.01;
              },
            });
          },
        });
      }
      batchIdx++;
      if (end < blocksToAnimate.length) {
        setTimeout(animateBatch, delayPerBatch * 1000);
      }
    }
    animateBatch();

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    let frameId: number;
    const animate = () => {
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      matCache.forEach((mat) => mat.dispose());
      blockGeo.dispose();
      blocksToAnimate.forEach(({ mesh, outline }) => {
        mesh.geometry.dispose();
        outline.geometry.dispose();
      });
      group.clear();
      scene.clear();
    };
  }, [xyzBlocks]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#b3e0ff',
        touchAction: 'none',
        userSelect: 'none',
      }}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
};

export default VoxelSideView;
