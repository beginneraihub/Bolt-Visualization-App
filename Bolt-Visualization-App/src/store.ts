import { create } from 'zustand';
import { Wave } from './types';

interface Store {
  waves: Wave[];
  activeWaveId: string | null;
  addWave: () => void;
  removeWave: (id: string) => void;
  setActiveWave: (id: string | null) => void;
  updateWave: (id: string, updates: Partial<Omit<Wave, 'id'>>) => void;
}

const createWave = (): Wave => ({
  id: Math.random().toString(36).substring(7),
  frequency: 1,
  amplitude: 0.5,
  waveType: 'sine',
  speed: 1,
  phase: 0,
  modDepth: 0,
  rotation: 0,
  color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
  opacity: 0.8,
  thickness: 2,
});

export const useStore = create<Store>((set) => ({
  waves: [createWave()],
  activeWaveId: null,
  addWave: () => set((state) => ({ 
    waves: [...state.waves, createWave()],
  })),
  removeWave: (id) => set((state) => ({
    waves: state.waves.filter(wave => wave.id !== id),
    activeWaveId: state.activeWaveId === id ? null : state.activeWaveId
  })),
  setActiveWave: (id) => set({ activeWaveId: id }),
  updateWave: (id, updates) => set((state) => ({
    waves: state.waves.map(wave => 
      wave.id === id ? { ...wave, ...updates } : wave
    )
  }))
}));