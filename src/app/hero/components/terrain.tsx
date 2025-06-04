'use client';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import { terrain2d } from '@/contents/terrain';

const BORDER_COLOR = '#2a3b21'; // Darker shade for borders
const CELL_COLOR = '#4f6d3c'; // Cell fill color
const BORDER_WIDTH = '2px'; // Consistent border for outer edges

const VoxelSideView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    // Get grid dimensions
    const gridWidth = terrain2d[0].length;
    const gridHeight = terrain2d.length;

    // Calculate adaptive cell size based on container dimensions
    const calculateCellSize = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Take the smaller dimension to ensure the terrain fits on screen
      const maxCellSizeWidth = (containerWidth * 0.85) / gridWidth;
      const maxCellSizeHeight = (containerHeight * 0.85) / gridHeight;

      // Use the smaller value to ensure it fits completely
      return Math.min(maxCellSizeWidth, maxCellSizeHeight);
    };

    // Initial cell size calculation
    const adaptiveCellSize = calculateCellSize();

    // Create container elements
    const fragment = document.createDocumentFragment();
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText =
      'position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;';

    // Create the wrapper with calculated dimensions
    const wrapper = document.createElement('div');
    const wrapperWidth = gridWidth * adaptiveCellSize;
    const wrapperHeight = gridHeight * adaptiveCellSize;

    wrapper.style.cssText = `
      position:relative;
      width:${wrapperWidth}px;
      height:${wrapperHeight}px;
      margin:0 auto; /* Ensure horizontal centering */
    `;

    // Create the timeline for animation
    const timeline = gsap.timeline();
    animationRef.current = timeline;

    // Efficient cell tracking
    const cellExists = new Set<string>();
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (terrain2d[y][x] === 1) {
          cellExists.add(`${x},${y}`);
        }
      }
    }

    // Animation calculation
    const bottomCenterX = gridWidth / 2;
    const bottomCenterY = gridHeight;
    const animDelays: number[] = [];
    const cells: HTMLDivElement[] = [];

    // Create cells
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (terrain2d[y][x] !== 1) continue;

        const cell = document.createElement('div');
        cell.style.cssText = `
          position:absolute;
          width:${adaptiveCellSize}px;
          height:${adaptiveCellSize}px;
          background-color:${CELL_COLOR};
          left:${x * adaptiveCellSize}px;
          top:${y * adaptiveCellSize}px;
          transform:scale(0);
          transform-origin:center;
          box-sizing:border-box;
        `;

        // Border handling
        const hasTopNeighbor = cellExists.has(`${x},${y - 1}`);
        const hasRightNeighbor = cellExists.has(`${x + 1},${y}`);
        const hasBottomNeighbor = cellExists.has(`${x},${y + 1}`);
        const hasLeftNeighbor = cellExists.has(`${x - 1},${y}`);

        let borderString = '';
        if (!hasTopNeighbor)
          borderString += `border-top:${BORDER_WIDTH} solid ${BORDER_COLOR};`;
        if (!hasRightNeighbor)
          borderString += `border-right:${BORDER_WIDTH} solid ${BORDER_COLOR};`;
        if (!hasBottomNeighbor)
          borderString += `border-bottom:${BORDER_WIDTH} solid ${BORDER_COLOR};`;
        if (!hasLeftNeighbor)
          borderString += `border-left:${BORDER_WIDTH} solid ${BORDER_COLOR};`;

        if (borderString) {
          cell.style.cssText += borderString;
        }

        // Calculate animation parameters
        const dx = x - bottomCenterX;
        const dy = y - bottomCenterY;
        const distFromBottomCenter = Math.sqrt(dx * dx + dy * dy);

        animDelays.push(distFromBottomCenter + Math.random() * 0.1);
        cells.push(cell);
        wrapper.appendChild(cell);
      }
    }

    // Sort for animation sequence
    const sortedIndices = animDelays
      .map((delay, index) => ({ delay, index }))
      .sort((a, b) => a.delay - b.delay)
      .map((item) => item.index);

    // Set up animations
    const durationGrow = 1.5;
    const delayBetweenCells = 0.025;

    sortedIndices.forEach((originalIndex, newIndex) => {
      timeline.to(
        cells[originalIndex],
        {
          scale: 1.07,
          duration: durationGrow,
          ease: 'elastic.out(1.2)',
        },
        newIndex * delayBetweenCells,
      );
    });

    // Add to DOM
    gridContainer.appendChild(wrapper);
    fragment.appendChild(gridContainer);
    container.appendChild(fragment);

    // Improved resize handler
    let resizeTimeout: number;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        // Recalculate cell size based on new container dimensions
        const newCellSize = calculateCellSize();

        // Update wrapper dimensions
        const newWrapperWidth = gridWidth * newCellSize;
        const newWrapperHeight = gridHeight * newCellSize;

        wrapper.style.width = `${newWrapperWidth}px`;
        wrapper.style.height = `${newWrapperHeight}px`;

        // Update each cell position and size
        cells.forEach((cell, i) => {
          // Find the original x,y from the terrain grid
          let x = -1,
            y = -1;
          let count = 0;

          for (let gy = 0; gy < gridHeight && x === -1; gy++) {
            for (let gx = 0; gx < gridWidth && x === -1; gx++) {
              if (terrain2d[gy][gx] === 1) {
                if (count === i) {
                  x = gx;
                  y = gy;
                }
                count++;
              }
            }
          }

          if (x !== -1 && y !== -1) {
            cell.style.width = `${newCellSize}px`;
            cell.style.height = `${newCellSize}px`;
            cell.style.left = `${x * newCellSize}px`;
            cell.style.top = `${y * newCellSize}px`;
          }
        });
      }, 100);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'transparent',
        touchAction: 'none',
        userSelect: 'none',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default VoxelSideView;
