import React, { useEffect, useRef, useState } from 'react';
import { Mic } from 'lucide-react';

export function AudioAnalyzer() {
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Audio Input</h2>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        <Mic className="w-5 h-5" />
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}