import React from 'react';
import { useStore } from '../store';
import { Plus, Trash2, Settings } from 'lucide-react';
import { Wave } from '../types';

const Slider = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step,
  formatValue = (v: number) => v.toFixed(1)
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">
      {label}: {formatValue(value)}
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full accent-green-500"
    />
  </div>
);

function WaveControls({ wave, onChange }: { wave: Wave; onChange: (updates: Partial<Wave>) => void }) {
  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="color"
          value={wave.color}
          onChange={(e) => onChange({ color: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer"
        />
        <select
          value={wave.waveType}
          onChange={(e) => onChange({ waveType: e.target.value as Wave['waveType'] })}
          className="flex-1 bg-gray-700 rounded-lg p-2 text-white border border-gray-600"
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <Slider
        label="Frequency"
        value={wave.frequency}
        onChange={(frequency) => onChange({ frequency })}
        min={0.1}
        max={500}
        step={0.1}
      />

      <Slider
        label="Amplitude"
        value={wave.amplitude}
        onChange={(amplitude) => onChange({ amplitude })}
        min={0}
        max={5}
        step={0.01}
      />

      <Slider
        label="Speed"
        value={wave.speed}
        onChange={(speed) => onChange({ speed })}
        min={0}
        max={50}
        step={0.1}
      />

      <Slider
        label="Phase"
        value={wave.phase}
        onChange={(phase) => onChange({ phase })}
        min={0}
        max={Math.PI * 2}
        step={0.01}
        formatValue={(v) => (v / Math.PI).toFixed(2) + 'π'}
      />

      <Slider
        label="Modulation"
        value={wave.modDepth}
        onChange={(modDepth) => onChange({ modDepth })}
        min={0}
        max={10}
        step={0.01}
      />

      <Slider
        label="Rotation"
        value={wave.rotation}
        onChange={(rotation) => onChange({ rotation })}
        min={0}
        max={Math.PI * 2}
        step={0.01}
        formatValue={(v) => (v / Math.PI).toFixed(2) + 'π'}
      />

      <Slider
        label="Opacity"
        value={wave.opacity}
        onChange={(opacity) => onChange({ opacity })}
        min={0}
        max={1}
        step={0.01}
      />

      <Slider
        label="Thickness"
        value={wave.thickness}
        onChange={(thickness) => onChange({ thickness })}
        min={1}
        max={10}
        step={0.5}
      />
    </div>
  );
}

export function Controls() {
  const { waves, activeWaveId, addWave, removeWave, setActiveWave, updateWave } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Waves
        </h2>
        <button
          onClick={() => addWave()}
          className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {waves.map((wave) => (
          <div
            key={wave.id}
            className={`relative ${activeWaveId === wave.id ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => setActiveWave(wave.id)}
          >
            {waves.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeWave(wave.id);
                }}
                className="absolute -right-2 -top-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <WaveControls
              wave={wave}
              onChange={(updates) => updateWave(wave.id, updates)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}