'use client';

import { useVoiceBot } from '@/hooks/useVoiceBot';
import { VoiceVisualizer } from '@/components/VoiceVisualizer';
import { Mic, Square, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { state, transcript, response, startListening, stopListening, cancel, error } = useVoiceBot();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10" />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Talk to Vamsi
          </h1>
          <p className="text-slate-400 mt-2">AI Engineer & Product Builder</p>
        </div>

        {/* Visualizer Area */}
        <div className="mb-8 min-h-[120px] flex items-center justify-center">
          <VoiceVisualizer state={state} />
        </div>

        {/* Transcript / Response Area */}
        <div className="space-y-6 mb-8 min-h-[150px]">
          {state === 'idle' && !transcript && !response && (
            <div className="text-center text-slate-500 italic">
              Tap the microphone to start the interview...
            </div>
          )}

          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 p-4 rounded-xl border border-white/5"
            >
              <p className="text-sm text-slate-400 mb-1">You asked:</p>
              <p className="text-lg">{transcript}</p>
            </motion.div>
          )}

          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20"
            >
              <p className="text-sm text-blue-400 mb-1">Vamsi says:</p>
              <p className="text-lg leading-relaxed">{response}</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/20 p-4 rounded-xl border border-red-500/20 flex items-center gap-2 text-red-300"
            >
              <AlertCircle size={20} />
              <p>{error}</p>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {state === 'listening' ? (
            <button
              onClick={stopListening}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg shadow-red-500/30"
            >
              <Square size={24} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={startListening}
              disabled={state === 'thinking' || state === 'speaking'}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg 
                ${state === 'thinking' || state === 'speaking'
                  ? 'bg-slate-700 cursor-not-allowed opacity-50'
                  : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30 hover:scale-105'
                }`}
            >
              <Mic size={28} />
            </button>
          )}
        </div>

        <div className="text-center mt-6 text-xs text-slate-500">
          Powered by Next.js & OpenAI
        </div>
      </div>
    </main>
  );
}
