'use client';
import { gsap } from 'gsap';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import NextImage from '@/components/NextImage';
import { terrain2d } from '@/contents/terrain';

/**
 * Styling constants for terrain cells
 */
const BORDER_COLOR = 'black';
const BORDER_WIDTH = 1.2;
const BORDER_RADIUS = 4;

/**
 * Lighthouse position coordinates in the terrain grid
 * These determine where the lighthouse will be placed
 */
const ANCHOR_COL = 33;
const ANCHOR_ROW = 13;

/**
 * Layout constants for the overall scene
 */
const MAX_TERRAIN_WIDTH = 1280;
const OCEAN_HEIGHT_PERCENTAGE = 35;
const TERRAIN_BOTTOM_PADDING_PERCENTAGE = 5;

/**
 * Color constants for water and sky gradients
 */
const OCEAN_LEFT_COLOR = '#0ea5e9';
const OCEAN_MID_COLOR = '#2563eb';
const OCEAN_RIGHT_COLOR = '#1e3a8a';
const SKY_GRADIENT = 'linear-gradient(to right, #22d3ee, #3b82f6, #1e40af)';
const OCEAN_GRADIENT = 'linear-gradient(to right, #0ea5e9, #2563eb, #1e3a8a)';

/**
 * Animation timing constants
 */
const GROW_DURATION = 1.5;
const DELAY_BETWEEN_CELLS = 0.01;

/**
 * Configuration for a single layer of the lighthouse
 * @interface LayerConfig
 * @property {string} key - Identifier for the layer (top, middle, bottom)
 * @property {string} src - Source path for the layer image
 * @property {[number, number]} baseSize - Base width and height of the layer
 * @property {number} z - Z-index value for layer stacking
 * @property {number} [offsetY] - Optional vertical offset for positioning
 */
interface LayerConfig {
  key: 'top' | 'middle' | 'bottom';
  src: string;
  baseSize: [number, number];
  z: number;
  offsetY?: number;
}

/**
 * Configuration for all lighthouse layers
 * Ordered from top to bottom for proper stacking
 */
const LIGHTHOUSE_LAYERS: LayerConfig[] = [
  {
    key: 'top',
    src: '/cover/topMercusuar.svg',
    baseSize: [106, 75],
    z: 30,
    offsetY: 12,
  },
  {
    key: 'middle',
    src: '/cover/middleMercusuar.svg',
    baseSize: [129, 102],
    z: 20,
    offsetY: 4,
  },
  {
    key: 'bottom',
    src: '/cover/bottomMercusuar.svg',
    baseSize: [156, 152],
    z: 10,
    offsetY: 8,
  },
];

/**
 * Represents a single cell in the terrain grid
 * @interface CellData
 * @property {number} x - X coordinate in the grid
 * @property {number} y - Y coordinate in the grid
 * @property {HTMLDivElement} element - DOM element representing the cell
 * @property {number} animOrder - Animation sequence order value
 */
interface CellData {
  x: number;
  y: number;
  element: HTMLDivElement;
  animOrder: number;
}

/**
 * Represents the dimensions of an element relative to the terrain size
 * @interface RelativeSize
 * @property {number} width - Relative width
 * @property {number} height - Relative height
 */
interface RelativeSize {
  width: number;
  height: number;
}

/**
 * Represents the position of the lighthouse anchor point
 * @interface AnchorPosition
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 * @property {number} cellSize - Size of a single terrain cell
 * @property {number} terrainWidth - Total width of the terrain
 */
interface AnchorPosition {
  x: number;
  y: number;
  cellSize: number;
  terrainWidth: number;
}

/**
 * Creates a unique key for a cell based on its coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {string} Unique cell identifier
 */
const createCellKey = (x: number, y: number): string => `${x},${y}`;

/**
 * Checks if a cell has a neighbor in the specified direction
 * @param {number} x - X coordinate of the cell
 * @param {number} y - Y coordinate of the cell
 * @param {'top' | 'right' | 'bottom' | 'left'} direction - Direction to check
 * @param {Set<string>} cellExists - Set of existing cell keys
 * @returns {boolean} True if a neighbor exists in the specified direction
 */
const hasNeighbor = (
  x: number,
  y: number,
  direction: 'top' | 'right' | 'bottom' | 'left',
  cellExists: Set<string>,
): boolean => {
  const offsets = {
    top: [0, -1],
    right: [1, 0],
    bottom: [0, 1],
    left: [-1, 0],
  };
  const [dx, dy] = offsets[direction];
  return cellExists.has(createCellKey(x + dx, y + dy));
};

/**
 * Main component that renders a terrain with a lighthouse and ocean effects
 * Includes animations for terrain appearance, lighthouse reveal, and water reflections
 */
const TerrainWithMercusuar: React.FC = () => {
  // Refs for DOM elements and animations
  const containerRef = useRef<HTMLDivElement>(null);
  const lighthouseRef = useRef<HTMLDivElement>(null);
  const terrainReflectionRef = useRef<HTMLDivElement>(null);
  const lighthouseReflectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const anchorPositionRef = useRef<AnchorPosition | null>(null);

  // State for responsive sizing
  const [relativeSizes, setRelativeSizes] = useState<{
    [key: string]: RelativeSize;
  }>({});

  /**
   * Calculates the appropriate cell size based on container dimensions
   * @param {HTMLDivElement} container - The container element
   * @returns {number} Cell size in pixels
   */
  const calculateCellSize = useCallback((container: HTMLDivElement) => {
    const { height } = container.getBoundingClientRect();
    const gridWidth = terrain2d[0].length;
    const gridHeight = terrain2d.length;

    const desiredCellSize = MAX_TERRAIN_WIDTH / gridWidth;
    const maxCellSizeHeight = (height * 0.45) / gridHeight;

    return Math.floor(Math.min(desiredCellSize, maxCellSizeHeight));
  }, []);

  /**
   * Calculates the relative sizes of lighthouse layers based on terrain width
   * @param {number} terrainWidth - Width of the terrain in pixels
   * @returns {Object} Mapping of layer keys to their relative dimensions
   */
  const calculateRelativeSizes = useCallback((terrainWidth: number) => {
    const bottomBaseWidth =
      LIGHTHOUSE_LAYERS.find((layer) => layer.key === 'bottom')?.baseSize[0] ||
      156;

    const newRelativeSizes: { [key: string]: RelativeSize } = {};

    LIGHTHOUSE_LAYERS.forEach((layer) => {
      const [originalWidth, originalHeight] = layer.baseSize;
      const width = 0.2 * terrainWidth * (originalWidth / bottomBaseWidth);
      const height = width * (originalHeight / originalWidth);
      newRelativeSizes[layer.key] = { width, height };
    });

    return newRelativeSizes;
  }, []);

  /**
   * Calculates brightness effect based on horizontal position
   * Creates a lighting gradient effect across the terrain
   * @param {number} x - X coordinate
   * @param {number} gridWidth - Width of the grid in cells
   * @returns {number} Brightness factor (0-1)
   */
  const calculateLightEffect = useCallback(
    (x: number, gridWidth: number): number => {
      const position = x / gridWidth;
      return 1 - position * 0.4;
    },
    [],
  );

  /**
   * Finds all cells at the bottom edge of the terrain (touching water)
   * @param {number} gridWidth - Width of the grid in cells
   * @param {number} gridHeight - Height of the grid in cells
   * @returns {Set<string>} Set of bottom edge cell keys
   */
  const findBottomEdgeCells = useCallback(
    (gridWidth: number, gridHeight: number): Set<string> => {
      const bottomEdgeCells = new Set<string>();

      for (let x = 0; x < gridWidth; x++) {
        let maxY = -1;
        for (let y = 0; y < gridHeight; y++) {
          if (terrain2d[y][x] === 1 && y > maxY) {
            maxY = y;
          }
        }
        if (maxY !== -1) {
          bottomEdgeCells.add(createCellKey(x, maxY));
        }
      }

      return bottomEdgeCells;
    },
    [],
  );

  /**
   * Creates a set tracking which grid positions have cells
   * @param {number} gridWidth - Width of the grid in cells
   * @param {number} gridHeight - Height of the grid in cells
   * @returns {Set<string>} Set of existing cell keys
   */
  const createCellExistsSet = useCallback(
    (gridWidth: number, gridHeight: number): Set<string> => {
      const cellExists = new Set<string>();
      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          if (terrain2d[y][x] === 1) {
            cellExists.add(createCellKey(x, y));
          }
        }
      }
      return cellExists;
    },
    [],
  );

  /**
   * Applies special styles to bottom edge cells that touch the water
   * @param {HTMLDivElement} cell - Cell element to style
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} gridWidth - Width of the grid in cells
   * @param {Set<string>} cellExists - Set of existing cell keys
   */
  const styleBottomCell = useCallback(
    (
      cell: HTMLDivElement,
      x: number,
      y: number,
      gridWidth: number,
      cellExists: Set<string>,
    ): void => {
      const xPosition = x / gridWidth;
      const lightEffect = calculateLightEffect(x, gridWidth);

      // Determine ocean color based on horizontal position
      let oceanColor;
      if (xPosition < 0.33) {
        oceanColor = OCEAN_LEFT_COLOR;
      } else if (xPosition < 0.66) {
        oceanColor = OCEAN_MID_COLOR;
      } else {
        oceanColor = OCEAN_RIGHT_COLOR;
      }

      // Create water reflection effect
      const gradientHeightPercent = 50 - xPosition * 20;
      const reflectionOverlay = document.createElement('div');
      reflectionOverlay.className = 'absolute inset-x-0 bottom-0';
      reflectionOverlay.style.height = `${gradientHeightPercent}%`;
      reflectionOverlay.style.background = `linear-gradient(to top, ${oceanColor} 5%, transparent 100%)`;
      reflectionOverlay.style.opacity = '0.7';
      reflectionOverlay.style.mixBlendMode = 'lighten';
      reflectionOverlay.style.borderRadius = 'inherit';

      cell.style.backgroundColor = 'black';
      cell.style.filter = `brightness(${lightEffect})`;
      cell.appendChild(reflectionOverlay);

      if (hasNeighbor(x, y, 'bottom', cellExists)) {
        cell.style.borderBottom = 'none';
      }
    },
    [calculateLightEffect],
  );

  /**
   * Applies border radius to the corners of cells at terrain edges
   * @param {HTMLDivElement} cell - Cell element to style
   * @param {boolean} hasNoTop - Whether cell has no top neighbor
   * @param {boolean} hasNoRight - Whether cell has no right neighbor
   * @param {boolean} hasNoBottom - Whether cell has no bottom neighbor
   * @param {boolean} hasNoLeft - Whether cell has no left neighbor
   * @param {boolean} isBottomCell - Whether this is a bottom edge cell
   */
  const applyBorderRadius = useCallback(
    (
      cell: HTMLDivElement,
      hasNoTop: boolean,
      hasNoRight: boolean,
      hasNoBottom: boolean,
      hasNoLeft: boolean,
      isBottomCell: boolean,
    ): void => {
      const isOuterCell = hasNoTop || hasNoRight || hasNoBottom || hasNoLeft;

      // Skip border radius for non-outer cells and bottom cells
      if (!isOuterCell || isBottomCell) return;

      let borderRadius = '';

      borderRadius += hasNoTop && hasNoLeft ? `${BORDER_RADIUS}px ` : '0 ';
      borderRadius += hasNoTop && hasNoRight ? `${BORDER_RADIUS}px ` : '0 ';
      borderRadius += hasNoBottom && hasNoRight ? `${BORDER_RADIUS}px ` : '0 ';
      borderRadius += hasNoBottom && hasNoLeft ? `${BORDER_RADIUS}px` : '0';

      cell.style.borderRadius = borderRadius;
    },
    [],
  );

  /**
   * Applies border styles to a cell based on its neighbors
   * @param {HTMLDivElement} cell - Cell element to style
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} cellSize - Size of each cell in pixels
   * @param {Set<string>} cellExists - Set of existing cell keys
   * @param {boolean} isBottomCell - Whether this is a bottom edge cell
   */
  const applyBorderStyles = useCallback(
    (
      cell: HTMLDivElement,
      x: number,
      y: number,
      cellSize: number,
      cellExists: Set<string>,
      isBottomCell: boolean,
    ): void => {
      const hasNoTop = !hasNeighbor(x, y, 'top', cellExists);
      const hasNoRight = !hasNeighbor(x, y, 'right', cellExists);
      const hasNoBottom = !hasNeighbor(x, y, 'bottom', cellExists);
      const hasNoLeft = !hasNeighbor(x, y, 'left', cellExists);

      // Apply borders based on missing neighbors
      if (hasNoTop) {
        cell.style.borderTop = `${BORDER_WIDTH}px solid ${BORDER_COLOR}`;
      } else {
        cell.style.top = `${Math.floor(y * cellSize) - 0.5}px`;
        cell.style.height = `${cellSize + 0.5}px`;
      }

      if (hasNoRight) {
        cell.style.borderRight = `${BORDER_WIDTH}px solid ${BORDER_COLOR}`;
      } else {
        cell.style.width = `${cellSize + 0.5}px`;
      }

      if (hasNoBottom && !isBottomCell) {
        cell.style.borderBottom = `${BORDER_WIDTH}px solid ${BORDER_COLOR}`;
      } else if (!isBottomCell) {
        cell.style.height = `${cellSize + 0.5}px`;
      }

      if (hasNoLeft) {
        cell.style.borderLeft = `${BORDER_WIDTH}px solid ${BORDER_COLOR}`;
      } else {
        cell.style.left = `${Math.floor(x * cellSize) - 0.5}px`;
        cell.style.width = `${cellSize + 0.5}px`;
      }

      // Apply border radius to outer cells
      applyBorderRadius(
        cell,
        hasNoTop,
        hasNoRight,
        hasNoBottom,
        hasNoLeft,
        isBottomCell,
      );
    },
    [applyBorderRadius],
  );

  /**
   * Applies styles to a cell element based on its position and neighbors
   * @param {HTMLDivElement} cell - Cell element to style
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} cellSize - Size of each cell in pixels
   * @param {Set<string>} cellExists - Set of existing cell keys
   * @param {Set<string>} bottomEdgeCellsSet - Set of bottom edge cell keys
   * @param {number} gridWidth - Width of the grid in cells
   */
  const styleCellElement = useCallback(
    (
      cell: HTMLDivElement,
      x: number,
      y: number,
      cellSize: number,
      cellExists: Set<string>,
      bottomEdgeCellsSet: Set<string>,
      gridWidth: number,
    ): void => {
      // Apply basic styles
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.left = `${Math.floor(x * cellSize)}px`;
      cell.style.top = `${Math.floor(y * cellSize)}px`;
      cell.style.transform = 'scale(0)';
      cell.style.transformOrigin = 'center';

      const lightEffect = calculateLightEffect(x, gridWidth);
      const isBottomCell = bottomEdgeCellsSet.has(createCellKey(x, y));

      // Handle bottom cells specially (water's edge)
      if (isBottomCell) {
        styleBottomCell(cell, x, y, gridWidth, cellExists);
      } else {
        cell.style.backgroundColor = 'black';
        cell.style.filter = `brightness(${lightEffect})`;
      }

      // Apply borders based on neighbors
      applyBorderStyles(cell, x, y, cellSize, cellExists, isBottomCell);
    },
    [calculateLightEffect, styleBottomCell, applyBorderStyles],
  );

  /**
   * Creates a list of cell elements for the terrain
   * @param {number} gridWidth - Width of the grid in cells
   * @param {number} gridHeight - Height of the grid in cells
   * @param {number} cellSize - Size of each cell in pixels
   * @param {Set<string>} cellExists - Set of existing cell keys
   * @param {Set<string>} bottomEdgeCellsSet - Set of bottom edge cell keys
   * @returns {CellData[]} Array of cell data objects
   */
  const createCellElementList = useCallback(
    (
      gridWidth: number,
      gridHeight: number,
      cellSize: number,
      cellExists: Set<string>,
      bottomEdgeCellsSet: Set<string>,
    ): CellData[] => {
      const cells: CellData[] = [];
      const bottomCenterX = gridWidth / 2;
      const bottomCenterY = gridHeight;

      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          if (terrain2d[y][x] !== 1) continue;

          const cell = document.createElement('div');
          cell.className = 'absolute box-border';
          styleCellElement(
            cell,
            x,
            y,
            cellSize,
            cellExists,
            bottomEdgeCellsSet,
            gridWidth,
          );

          // Track anchor position for lighthouse
          if (x === ANCHOR_COL && y === ANCHOR_ROW) {
            anchorPositionRef.current = {
              x: x * cellSize,
              y: y * cellSize,
              cellSize,
              terrainWidth: gridWidth * cellSize,
            };
          }

          // Calculate animation order based on distance from bottom center
          const dx = x - bottomCenterX;
          const dy = y - bottomCenterY;
          const distFromBottomCenter = Math.sqrt(dx * dx + dy * dy);
          const animOrder = distFromBottomCenter + Math.random() * 0.1;

          cells.push({ x, y, element: cell, animOrder });
        }
      }

      return cells.sort((a, b) => a.animOrder - b.animOrder);
    },
    [styleCellElement],
  );

  /**
   * Positions the lighthouse and its reflection based on the anchor position
   * Called during initialization and on window resize
   */
  const positionLighthouse = useCallback(() => {
    if (
      !lighthouseRef.current ||
      !lighthouseReflectionRef.current ||
      !wrapperRef.current ||
      !containerRef.current ||
      !anchorPositionRef.current ||
      !terrainReflectionRef.current
    ) {
      return;
    }

    const lighthouse = lighthouseRef.current;
    const lighthouseReflection = lighthouseReflectionRef.current;
    const wrapper = wrapperRef.current;
    const terrainReflection = terrainReflectionRef.current;
    const container = containerRef.current;

    const wrapperRect = wrapper.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const {
      x: anchorX,
      y: anchorY,
      cellSize,
      terrainWidth,
    } = anchorPositionRef.current;

    const absoluteAnchorX = wrapperRect.left + anchorX + cellSize / 2;
    const absoluteAnchorY = wrapperRect.top + anchorY;

    const lighthouseX = absoluteAnchorX - containerRect.left;
    const lighthouseY = absoluteAnchorY - containerRect.top + 15;

    lighthouse.style.left = `${lighthouseX}px`;
    lighthouse.style.top = `${lighthouseY}px`;
    lighthouseReflection.style.left = `${lighthouseX}px`;
    terrainReflection.style.top = `${wrapperRect.height}px`;

    const newRelativeSizes = calculateRelativeSizes(terrainWidth);
    setRelativeSizes(newRelativeSizes);
  }, [calculateRelativeSizes]);

  /**
   * Creates multiple sets of animated wave lines with varying properties
   * @returns {HTMLDivElement} Container with all wave sets
   */
  const createHorizontalWaveLines = useCallback((): HTMLDivElement => {
    const waveContainer = document.createElement('div');
    waveContainer.className = 'absolute inset-0 overflow-hidden';

    /**
     * Creates a set of animated wave elements
     * @param {number} count - Number of waves to create
     * @param {number} opacity - Base opacity for waves
     * @param {number} speed - Animation speed for waves
     * @param {number} amplitude - Wave height/amplitude
     * @param {number} thickness - Wave line thickness
     * @param {number} xOffset - Horizontal offset for waves
     * @returns {HTMLDivElement} Container with animated waves
     */
    const createWaveSet = (
      count: number,
      opacity: number,
      speed: number,
      amplitude: number,
      thickness: number,
      xOffset: number,
    ): HTMLDivElement => {
      const wavesGroup = document.createElement('div');
      wavesGroup.className = 'absolute inset-0';

      const oceanHeight = Math.floor(
        ((containerRef.current?.offsetHeight || 0) * OCEAN_HEIGHT_PERCENTAGE) /
          100,
      );
      const waveSpacing = oceanHeight / (count + 1); // Equal spacing

      for (let i = 0; i < count; i++) {
        // Calculate vertical position to distribute waves evenly
        const yPosition = waveSpacing * (i + 1);

        // Create wave SVG
        const waveWidth = 3000 + Math.random() * 1000;
        const waveAmplitude = amplitude * (1 - (i / count) * 0.3);

        // Generate a wavy path with random variations
        let wavePath = `M-100 0`;
        const segments = 20 + Math.floor(Math.random() * 10);
        const segmentWidth = (waveWidth + 200) / segments;

        for (let j = 0; j <= segments; j++) {
          const x = j * segmentWidth - 100;
          const heightVariation = (Math.random() - 0.5) * waveAmplitude * 0.5;
          const y =
            Math.sin(j * (Math.PI / 5)) * waveAmplitude + heightVariation;
          wavePath += ` L${x} ${y}`;
        }

        // Create SVG with gradient
        const svgCode = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${waveWidth}" height="${waveAmplitude * 3}" preserveAspectRatio="none" viewBox="0 0 ${waveWidth} ${waveAmplitude * 3}">
            <defs>
              <linearGradient id="wave-gradient-${i}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="${OCEAN_LEFT_COLOR}" stop-opacity="${opacity}"/>
                <stop offset="50%" stop-color="${OCEAN_MID_COLOR}" stop-opacity="${opacity * 0.8}"/>
                <stop offset="100%" stop-color="${OCEAN_RIGHT_COLOR}" stop-opacity="${opacity}"/>
              </linearGradient>
            </defs>
            <path d="${wavePath}" stroke="url(#wave-gradient-${i})" stroke-width="${thickness}" fill="none" transform="translate(0,${waveAmplitude * 1.5})"/>
          </svg>
        `;

        const svgBase64 = btoa(svgCode);

        // Create wave element
        const wave = document.createElement('div');
        wave.className = 'absolute left-0 right-0';
        wave.style.height = `${waveAmplitude * 3}px`;
        wave.style.top = `${yPosition - waveAmplitude * 1.5}px`;
        wave.style.background = `url("data:image/svg+xml;base64,${svgBase64}")`;
        wave.style.backgroundRepeat = 'repeat-x';
        wave.style.backgroundPosition = `${xOffset}px center`;

        // Animate the wave
        const direction = i % 2 === 0 ? 1 : -1; // Alternate directions
        gsap.to(wave, {
          backgroundPosition: `${xOffset + direction * waveWidth}px center`,
          duration: speed * (0.8 + Math.random() * 0.4),
          repeat: -1,
          ease: 'none',
        });

        wavesGroup.appendChild(wave);
      }

      return wavesGroup;
    };

    // Create different sets of waves with varying properties
    waveContainer.appendChild(createWaveSet(5, 0.4, 120, 4, 1.2, 0)); // Thin, slow waves
    waveContainer.appendChild(createWaveSet(4, 0.3, 90, 6, 1.0, 200)); // Medium waves
    waveContainer.appendChild(createWaveSet(3, 0.25, 60, 8, 0.8, -150)); // Thicker, faster waves

    return waveContainer;
  }, []);

  /**
   * Creates the overall scene layout with sky, ocean, and containers
   * @param {HTMLDivElement} container - Main container element
   * @returns {HTMLDivElement} Flex container for terrain
   */
  const createSceneLayout = useCallback(
    (container: HTMLDivElement): HTMLDivElement => {
      // Create the sky gradient background
      const skyBackground = document.createElement('div');
      skyBackground.className = 'absolute inset-0 z-0';
      skyBackground.style.background = SKY_GRADIENT;
      container.appendChild(skyBackground);

      // Create container for terrain and ocean
      const contentContainer = document.createElement('div');
      contentContainer.className = 'relative w-full h-full';
      container.appendChild(contentContainer);

      // Create the ocean background
      const oceanBackground = document.createElement('div');
      oceanBackground.className = 'absolute bottom-0 left-0 right-0 z-10';
      oceanBackground.style.height = `${OCEAN_HEIGHT_PERCENTAGE}%`;
      oceanBackground.style.background = OCEAN_GRADIENT;

      // Add transition blur at the top of ocean
      const oceanTransition = document.createElement('div');
      oceanTransition.className = 'absolute top-0 left-0 right-0';
      oceanTransition.style.height = '15px';
      oceanTransition.style.background =
        'linear-gradient(to bottom, rgba(14, 165, 233, 0.2), transparent)';
      oceanTransition.style.backdropFilter = 'blur(2px)';
      oceanBackground.appendChild(oceanTransition);

      // Add waves
      oceanBackground.appendChild(createHorizontalWaveLines());
      contentContainer.appendChild(oceanBackground);

      // Create flex container for terrain
      const flexContainer = document.createElement('div');
      flexContainer.className =
        'w-full h-full flex flex-col justify-end relative z-20';
      flexContainer.style.paddingBottom = `${TERRAIN_BOTTOM_PADDING_PERCENTAGE}%`;
      contentContainer.appendChild(flexContainer);

      // Add light effect layer over the scene
      const lightEffectLayer = document.createElement('div');
      lightEffectLayer.className = 'absolute inset-0 z-30 pointer-events-none';
      lightEffectLayer.style.background =
        'linear-gradient(to right, rgba(255,255,255,0.15), rgba(0,0,0,0))';
      lightEffectLayer.style.mixBlendMode = 'overlay';
      contentContainer.appendChild(lightEffectLayer);

      return flexContainer;
    },
    [createHorizontalWaveLines],
  );

  /**
   * Creates terrain elements including cells and their reflections
   * @param {HTMLDivElement} container - Main container element
   * @param {number} gridWidth - Width of the grid in cells
   * @param {number} gridHeight - Height of the grid in cells
   * @returns {Object} Object containing created elements
   */
  const createTerrainElements = useCallback(
    (
      container: HTMLDivElement,
      gridWidth: number,
      gridHeight: number,
    ): {
      wrapper: HTMLDivElement;
      cellContainer: HTMLDivElement;
      cells: CellData[];
      reflectionContainer: HTMLDivElement;
    } => {
      const cellSize = calculateCellSize(container);
      const terrainWidth = gridWidth * cellSize;

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'relative';
      wrapper.style.width = `${terrainWidth}px`;
      wrapper.style.height = `${gridHeight * cellSize}px`;
      wrapper.style.transformOrigin = 'bottom center';
      wrapper.style.margin = '0 auto';
      wrapperRef.current = wrapper;

      // Create cell container
      const cellContainer = document.createElement('div');
      cellContainer.className = 'absolute top-0 left-0';
      wrapper.appendChild(cellContainer);

      // Create cells
      const cellExists = createCellExistsSet(gridWidth, gridHeight);
      const bottomEdgeCellsSet = findBottomEdgeCells(gridWidth, gridHeight);
      const cells = createCellElementList(
        gridWidth,
        gridHeight,
        cellSize,
        cellExists,
        bottomEdgeCellsSet,
      );
      cells.forEach((cell) => cellContainer.appendChild(cell.element));

      // Create reflection container
      const reflectionContainer = document.createElement('div');
      reflectionContainer.className = 'absolute left-0';
      reflectionContainer.style.width = `${terrainWidth}px`;
      reflectionContainer.style.transformOrigin = 'top center';
      terrainReflectionRef.current = reflectionContainer;

      // Clone cell container for reflection
      const reflectionCells = cellContainer.cloneNode(true) as HTMLDivElement;
      reflectionCells.style.transform = 'scale(1, -0.5) translateY(-100%)';
      reflectionCells.style.opacity = '0.35';
      reflectionCells.style.filter = 'blur(1px) brightness(0.8)';
      reflectionContainer.appendChild(reflectionCells);

      // Create gradient overlay for reflection
      const reflectionOverlay = document.createElement('div');
      reflectionOverlay.className = 'absolute inset-0';
      reflectionOverlay.style.background =
        'linear-gradient(to bottom, transparent, rgba(14, 165, 233, 0.5))';
      reflectionOverlay.style.pointerEvents = 'none';
      reflectionContainer.appendChild(reflectionOverlay);

      return { wrapper, cellContainer, cells, reflectionContainer };
    },
    [
      calculateCellSize,
      createCellElementList,
      createCellExistsSet,
      findBottomEdgeCells,
    ],
  );

  /**
   * Sets up animation for terrain cells
   * @param {CellData[]} cells - Array of cell data objects
   * @returns {gsap.core.Timeline} GSAP timeline for terrain animation
   */
  const setupTerrainAnimation = useCallback(
    (cells: CellData[]): gsap.core.Timeline => {
      const terrainTimeline = gsap.timeline();

      cells.forEach((cell, index) => {
        terrainTimeline.to(
          cell.element,
          {
            scale: 1.07,
            duration: GROW_DURATION,
            ease: 'elastic.out(1.2)',
          },
          index * DELAY_BETWEEN_CELLS,
        );
      });

      return terrainTimeline;
    },
    [],
  );

  /**
   * Sets up animation for the lighthouse and its reflection
   * @param {HTMLDivElement} lighthouse - Lighthouse container element
   * @param {HTMLDivElement} lighthouseReflection - Lighthouse reflection element
   * @param {Object} initialRelativeSizes - Initial sizes for lighthouse layers
   * @returns {gsap.core.Timeline} GSAP timeline for lighthouse animation
   */
  const setupLighthouseAnimation = useCallback(
    (
      lighthouse: HTMLDivElement,
      lighthouseReflection: HTMLDivElement,
      initialRelativeSizes: { [key: string]: RelativeSize },
    ): gsap.core.Timeline => {
      const lighthouseTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
          transformOrigin: '50% 100%',
        },
        onStart: () => {
          positionLighthouse();
          lighthouse.classList.remove('hidden');
          lighthouseReflection.classList.remove('hidden');
        },
      });

      gsap.set('.lighthouse-layer', {
        width: 0,
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      gsap.set('.lighthouse-reflection-layer', {
        width: 0,
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      lighthouseTimeline
        .to('.lighthouse-layer', {
          opacity: 1,
          y: 0,
          width: (i) => {
            const key = LIGHTHOUSE_LAYERS[i].key;
            return `${initialRelativeSizes[key].width * 1.2}px`;
          },
          scale: 1.1,
          duration: 1.2,
          stagger: {
            each: 0.3,
            from: 'start',
            ease: 'power1.in',
          },
        })
        .to(
          '.lighthouse-layer',
          {
            width: (i) => {
              const key = LIGHTHOUSE_LAYERS[i].key;
              return `${initialRelativeSizes[key].width}px`;
            },
            scale: 1,
            duration: 0.8,
            stagger: {
              each: 0.2,
              from: 'start',
            },
            ease: 'elastic.out(0.5, 0.3)',
          },
          '-=0.5',
        )
        // Add animation for lighthouse reflection
        .to(
          '.lighthouse-reflection-layer',
          {
            opacity: 0.4,
            y: 0,
            width: (i) => {
              const key = LIGHTHOUSE_LAYERS[i].key;
              return `${initialRelativeSizes[key].width * 1.2}px`;
            },
            scale: 0.5,
            duration: 1.2,
            stagger: {
              each: 0.3,
              from: 'start',
              ease: 'power1.in',
            },
          },
          '-=1.2',
        )
        .to(
          '.lighthouse-reflection-layer',
          {
            width: (i) => {
              const key = LIGHTHOUSE_LAYERS[i].key;
              return `${initialRelativeSizes[key].width}px`;
            },
            scale: 0.5,
            duration: 0.8,
            stagger: {
              each: 0.2,
              from: 'start',
            },
            ease: 'elastic.out(0.5, 0.3)',
          },
          '-=0.5',
        );

      return lighthouseTimeline;
    },
    [positionLighthouse],
  );

  /**
   * Sets up animations for the reflections in water
   * @param {HTMLDivElement} lighthouseReflection - Lighthouse reflection element
   * @param {HTMLDivElement} terrainReflection - Terrain reflection element
   */
  const setupReflectionAnimations = useCallback(
    (
      lighthouseReflection: HTMLDivElement,
      terrainReflection: HTMLDivElement,
    ): void => {
      // Animate lighthouse reflection ripples with multiple animations
      gsap.to(lighthouseReflection, {
        skewX: '2deg',
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
      });

      gsap.to(lighthouseReflection, {
        skewY: '1deg',
        repeat: -1,
        yoyo: true,
        duration: 3.7,
        ease: 'sine.inOut',
        delay: 0.7,
      });

      // Animate terrain reflection
      const terrainReflectionCells = terrainReflection.querySelector('div');
      if (terrainReflectionCells) {
        gsap.to(terrainReflectionCells, {
          skewX: '3deg',
          repeat: -1,
          yoyo: true,
          duration: 4,
          ease: 'sine.inOut',
        });

        gsap.to(terrainReflectionCells, {
          skewY: '1deg',
          repeat: -1,
          yoyo: true,
          duration: 5.5,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }

      // Subtle opacity pulsing for all reflections
      gsap.to([lighthouseReflection, terrainReflection], {
        opacity: '-=0.15',
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut',
        delay: 1,
      });
    },
    [],
  );

  /**
   * Handles window resize events, updating the layout responsively
   * Debounced to improve performance
   */
  const handleResize = useCallback(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const gridWidth = terrain2d[0].length;
    const gridHeight = terrain2d.length;

    const newCellSize = calculateCellSize(container);
    const newTerrainWidth = gridWidth * newCellSize;
    const newWrapperHeight = gridHeight * newCellSize;

    // Update terrain wrapper dimensions
    wrapper.style.width = `${newTerrainWidth}px`;
    wrapper.style.height = `${newWrapperHeight}px`;

    // Update terrain reflection
    if (terrainReflectionRef.current) {
      terrainReflectionRef.current.style.width = `${newTerrainWidth}px`;
      terrainReflectionRef.current.style.top = `${newWrapperHeight}px`;
    }

    // Update all cell positions and sizes
    const cellElements = wrapper.querySelectorAll('div > div');
    let cellIndex = 0;

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (terrain2d[y][x] !== 1) continue;

        const cell = cellElements[cellIndex] as HTMLDivElement;
        if (!cell) continue;

        cell.style.width = `${newCellSize}px`;
        cell.style.height = `${newCellSize}px`;
        cell.style.left = `${Math.floor(x * newCellSize)}px`;
        cell.style.top = `${Math.floor(y * newCellSize)}px`;

        if (x === ANCHOR_COL && y === ANCHOR_ROW) {
          anchorPositionRef.current = {
            x: x * newCellSize,
            y: y * newCellSize,
            cellSize: newCellSize,
            terrainWidth: newTerrainWidth,
          };
        }

        cellIndex++;
      }
    }

    // Update lighthouse sizes and position
    const newRelativeSizes = calculateRelativeSizes(newTerrainWidth);
    setRelativeSizes(newRelativeSizes);
    positionLighthouse();
  }, [calculateCellSize, positionLighthouse, calculateRelativeSizes]);

  /**
   * Main effect that initializes the scene and sets up animations
   * Runs once on component mount
   */
  useEffect(() => {
    if (
      !containerRef.current ||
      !lighthouseRef.current ||
      !lighthouseReflectionRef.current
    ) {
      return;
    }

    const container = containerRef.current;
    const lighthouse = lighthouseRef.current;
    const lighthouseReflection = lighthouseReflectionRef.current;

    // Hide lighthouse initially
    lighthouse.classList.add('hidden');
    lighthouseReflection.classList.add('hidden');

    // Clear container
    container.innerHTML = '';

    // Dimensions
    const gridWidth = terrain2d[0].length;
    const gridHeight = terrain2d.length;

    // Create scene layout
    const flexContainer = createSceneLayout(container);

    // Create terrain elements
    const { wrapper, cells, reflectionContainer } = createTerrainElements(
      container,
      gridWidth,
      gridHeight,
    );

    // Add wrapper to flex container
    flexContainer.appendChild(wrapper);

    // Calculate initial sizes for lighthouse
    const cellSize = calculateCellSize(container);
    const terrainWidth = gridWidth * cellSize;
    const initialRelativeSizes = calculateRelativeSizes(terrainWidth);
    setRelativeSizes(initialRelativeSizes);

    // Add reflection container below the terrain
    reflectionContainer.style.top = `${wrapper.offsetHeight}px`;
    reflectionContainer.style.zIndex = '15';
    flexContainer.appendChild(reflectionContainer);

    // Setup animations
    const mainTimeline = gsap.timeline();
    animationRef.current = mainTimeline;

    // Add terrain animation
    const terrainTimeline = setupTerrainAnimation(cells);
    mainTimeline.add(terrainTimeline);

    // Add lighthouse animation
    const lighthouseTimeline = setupLighthouseAnimation(
      lighthouse,
      lighthouseReflection,
      initialRelativeSizes,
    );
    mainTimeline.add(lighthouseTimeline, terrainTimeline.duration() * 0.8);

    // Setup reflection animations
    setupReflectionAnimations(lighthouseReflection, reflectionContainer);

    // Setup resize handler
    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [
    calculateCellSize,
    calculateRelativeSizes,
    createSceneLayout,
    createTerrainElements,
    handleResize,
    positionLighthouse,
    setupLighthouseAnimation,
    setupReflectionAnimations,
    setupTerrainAnimation,
  ]);

  return (
    <div className='relative h-screen w-full touch-none overflow-hidden select-none'>
      {/* Terrain container */}
      <div
        ref={containerRef}
        className='relative h-full w-full'
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Lighthouse container with light effect */}
      <div
        ref={lighthouseRef}
        className='absolute z-50 hidden -translate-x-1/2 -translate-y-full'
        style={{
          filter: 'brightness(0)',
          WebkitMaskImage:
            'linear-gradient(to right, rgba(0,0,0,1.2), rgba(0,0,0,0.8))',
        }}
      >
        <div className='flex flex-col items-center justify-end'>
          {LIGHTHOUSE_LAYERS.map(({ key, src, z, offsetY }) => {
            const size = relativeSizes[key] || { width: 0, height: 0 };

            return (
              <NextImage
                key={key}
                src={src}
                alt={`Mercusuar Lantai ${key}`}
                width={size.width}
                height={size.height}
                priority
                className={`z-${z} ${
                  offsetY
                    ? offsetY > 0
                      ? `mb-${Math.floor(offsetY / 2)}`
                      : `-mb-${Math.floor(-offsetY / 2)}`
                    : ''
                }`}
                imgClassName={`lighthouse-layer ${key} mx-auto max-w-full transform overflow-hidden`}
              />
            );
          })}
        </div>
      </div>

      {/* Lighthouse reflection */}
      <div
        ref={lighthouseReflectionRef}
        className='absolute z-25 hidden -translate-x-1/2'
        style={{
          filter: 'brightness(0) blur(1px)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))',
          transform: 'scale(1, -0.5)', // Flip and scale reflection
          opacity: '0.4',
        }}
      >
        <div className='flex flex-col items-center justify-end'>
          {LIGHTHOUSE_LAYERS.map(({ key, src, z, offsetY }) => {
            const size = relativeSizes[key] || { width: 0, height: 0 };

            return (
              <NextImage
                key={key}
                src={src}
                alt={`Mercusuar Lantai ${key} Reflection`}
                width={size.width}
                height={size.height}
                priority
                className={`z-${z} ${
                  offsetY
                    ? offsetY > 0
                      ? `mb-${Math.floor(offsetY / 2)}`
                      : `-mb-${Math.floor(-offsetY / 2)}`
                    : ''
                }`}
                imgClassName={`lighthouse-reflection-layer ${key} mx-auto max-w-full transform overflow-hidden`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TerrainWithMercusuar;
