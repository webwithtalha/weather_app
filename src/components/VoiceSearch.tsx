'use client';

import { useState } from 'react';

export default function VoiceSearch({ onSearch }: { onSearch: (city: string) => void }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearch(transcript);
      };

      recognition.start();
    }
  };

  return (
    <button
      onClick={startListening}
      className={`p-2 rounded-full ${listening ? 'bg-red-500' : 'bg-blue-500'}`}
    >
      🎤
    </button>
  );
} 