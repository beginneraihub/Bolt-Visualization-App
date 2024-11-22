import React from 'react';
import { useStore } from '../store';
import { WaveformLine } from './WaveformLine';

export function Waveform() {
  const waves = useStore((state) => state.waves);

  return (
    <group>
      {waves.map((wave) => (
        <WaveformLine key={wave.id} wave={wave} />
      ))}
    </group>
  );
}