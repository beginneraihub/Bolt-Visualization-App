import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Wave } from '../types';

const RESOLUTION = 512;

export function WaveformLine({ wave }: { wave: Wave }) {
  const meshRef = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points = new Float32Array((RESOLUTION + 1) * 3);
    
    for (let i = 0; i <= RESOLUTION; i++) {
      const x = (i / RESOLUTION) * 4 - 2;
      points[i * 3] = x;
      points[i * 3 + 1] = 0;
      points[i * 3 + 2] = 0;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const positions = geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime() * wave.speed;

    for (let i = 0; i <= RESOLUTION; i++) {
      const x = positions[i * 3];
      let y = 0;
      const t = x * wave.frequency + time + wave.phase;
      
      switch (wave.waveType) {
        case 'sine':
          y = Math.sin(t);
          break;
        case 'square':
          y = Math.sign(Math.sin(t));
          break;
        case 'sawtooth':
          y = ((t % (2 * Math.PI)) - Math.PI) / Math.PI;
          break;
        case 'triangle':
          y = Math.abs(((t % (2 * Math.PI)) - Math.PI) / (Math.PI / 2)) - 1;
          break;
      }

      y *= wave.amplitude;
      y += Math.sin(t * 0.5) * wave.modDepth;

      positions[i * 3 + 1] = y * Math.cos(wave.rotation);
      positions[i * 3 + 2] = y * Math.sin(wave.rotation);
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={meshRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial 
        attach="material" 
        color={wave.color}
        linewidth={wave.thickness}
        transparent
        opacity={wave.opacity}
      />
    </line>
  );
}