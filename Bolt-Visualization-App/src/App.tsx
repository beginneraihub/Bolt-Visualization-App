import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Waveform } from './components/Waveform';
import { Controls } from './components/Controls';
import { AudioAnalyzer } from './components/AudioAnalyzer';
import { Settings, Sliders, Waves } from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Main 3D Visualization */}
      <main className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Waveform />
          <OrbitControls />
        </Canvas>

        {/* Overlay Controls */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <Waves className="w-6 h-6" />
          </button>
          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </main>

      {/* Side Panel */}
      <aside className="w-96 bg-gray-900 p-6 overflow-y-auto">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sliders className="w-6 h-6" />
            Controls
          </h1>
          <Controls />
          <AudioAnalyzer />
        </div>
      </aside>
    </div>
  );
}

export default App;