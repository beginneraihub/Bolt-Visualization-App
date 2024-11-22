export interface Wave {
  id: string;
  frequency: number;
  amplitude: number;
  waveType: 'sine' | 'square' | 'sawtooth' | 'triangle';
  speed: number;
  phase: number;
  modDepth: number;
  rotation: number;
  color: string;
  opacity: number;
  thickness: number;
}