'use client';

import { useVoiceBot } from '@/hooks/useVoiceBot';
import { VoiceVisualizer } from '@/components/VoiceVisualizer';
import { Mic, Square, AlertCircle, Briefcase, Brain, MessageSquare, Settings, ExternalLink, CheckCircle2, User2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const { state, transcript, response, startListening, stopListening, cancel, error } = useVoiceBot();
  const [showApiKeyHelp, setShowApiKeyHelp] = useState(false);

  const isApiKeyError = error?.includes('Gemini API Key not configured');

  const getStatusText = () => {
    switch (state) {
      case 'idle':
        return 'Ready to chat';
      case 'listening':
        return 'Listening...';
      case 'thinking':
        return 'Processing...';
      case 'speaking':
        return 'Speaking...';
      default:
        return 'Ready';
    }
  };

  const getStatusColor = () => {
    switch (state) {
      case 'idle':
        return 'bg-slate-500';
      case 'listening':
        return 'bg-blue-500';
      case 'thinking':
        return 'bg-purple-500';
      case 'speaking':
        return 'bg-emerald-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/30 shadow-2xl shadow-black/20 overflow-hidden"
        >
          {/* Header Section */}
          <div className="relative px-6 md:px-8 pt-8 pb-6 border-b border-slate-700/30">
            <div className="flex items-start justify-between mb-5">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-4 mb-3"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      Voice Interview Assistant
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                      <User2 className="w-3.5 h-3.5" />
                      Interview with Sree Vamsi Pydikondala
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApiKeyHelp(!showApiKeyHelp)}
                className="p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/40 transition-all duration-200"
                title="API Key Setup"
              >
                <Settings className="w-4 h-4 text-slate-400" />
              </motion.button>
            </div>

            {/* Status Badge */}
            <motion.div
              key={state}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm"
            >
              <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${state !== 'idle' ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium text-slate-200">{getStatusText()}</span>
            </motion.div>
          </div>

          {/* API Key Help Panel */}
          <AnimatePresence>
            {showApiKeyHelp && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-b border-slate-700/50 bg-slate-800/30"
              >
                <div className="px-8 py-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    API Key Configuration
                  </h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">1. Get your API Key</p>
                        <p className="text-slate-400">Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors">Google AI Studio <ExternalLink className="w-3 h-3" /></a> to create your Gemini API key</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">2. Create .env.local file</p>
                        <p className="text-slate-400">In your project root, create a file named <code className="px-1.5 py-0.5 rounded bg-slate-900/50 text-blue-300 font-mono text-xs">.env.local</code></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">3. Add your API key</p>
                        <p className="text-slate-400">Add this line to the file: <code className="px-1.5 py-0.5 rounded bg-slate-900/50 text-blue-300 font-mono text-xs">GEMINI_API_KEY=your_api_key_here</code></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">4. Restart the server</p>
                        <p className="text-slate-400">Stop the dev server (Ctrl+C) and run <code className="px-1.5 py-0.5 rounded bg-slate-900/50 text-blue-300 font-mono text-xs">npm run dev</code> again</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            {/* Visualizer Section */}
            <div className="mb-6 min-h-[220px] flex items-center justify-center bg-gradient-to-br from-slate-800/20 to-slate-900/30 rounded-xl border border-slate-700/20 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
              <VoiceVisualizer state={state} />
            </div>

            {/* Conversation Area */}
            <div className="space-y-4 mb-6 min-h-[180px]">
              <AnimatePresence mode="wait">
                {state === 'idle' && !transcript && !response && !error && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-300 text-base font-semibold mb-2">Ready to Start</p>
                    <p className="text-slate-500 text-sm">Click the microphone button below to begin your interview</p>
                  </motion.div>
                )}

                {transcript && (
                  <motion.div
                    key="transcript"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-800/30 rounded-lg border border-slate-700/40 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <Mic className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Your Question</span>
                    </div>
                    <p className="text-slate-100 leading-relaxed text-[15px]">{transcript}</p>
                  </motion.div>
                )}

                {response && (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-emerald-900/20 via-blue-900/15 to-slate-900/20 rounded-lg border border-emerald-500/30 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Vamsi's Response</span>
                    </div>
                    <p className="text-slate-100 leading-relaxed whitespace-pre-wrap text-[15px]">{response}</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl border p-5 backdrop-blur-sm ${
                      isApiKeyError
                        ? 'bg-amber-900/20 border-amber-500/30'
                        : 'bg-red-900/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isApiKeyError ? 'text-amber-400' : 'text-red-400'}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-semibold mb-1 ${isApiKeyError ? 'text-amber-400' : 'text-red-400'}`}>
                          {isApiKeyError ? 'API Key Required' : 'Error'}
                        </p>
                        <p className={`text-sm leading-relaxed ${isApiKeyError ? 'text-amber-200' : 'text-red-200'}`}>
                          {error}
                        </p>
                        {isApiKeyError && (
                          <button
                            onClick={() => setShowApiKeyHelp(true)}
                            className="mt-3 text-xs text-amber-300 hover:text-amber-200 underline"
                          >
                            Click here for setup instructions
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Control Button */}
            <div className="flex justify-center">
              {state === 'listening' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopListening}
                  className="group relative w-20 h-20 rounded-xl bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center transition-all duration-200 shadow-lg shadow-red-500/25 border border-red-400/30"
                >
                  <div className="absolute inset-0 rounded-xl bg-red-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Square size={28} fill="currentColor" className="text-white relative z-10" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: state === 'thinking' || state === 'speaking' ? 1 : 1.05 }}
                  whileTap={{ scale: state === 'thinking' || state === 'speaking' ? 1 : 0.95 }}
                  onClick={startListening}
                  disabled={state === 'thinking' || state === 'speaking'}
                  className={`group relative w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg border ${
                    state === 'thinking' || state === 'speaking'
                      ? 'bg-slate-700/50 cursor-not-allowed opacity-50 border-slate-600/30'
                      : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400/30 shadow-blue-500/25'
                  }`}
                >
                  {state !== 'thinking' && state !== 'speaking' && (
                    <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  <Mic size={32} className={`relative z-10 ${state === 'thinking' || state === 'speaking' ? 'text-slate-400' : 'text-white'}`} />
                </motion.button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-5 border-t border-slate-700/30 bg-slate-900/20">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
                System Online
              </span>
              <span className="text-slate-600">•</span>
              <span>Powered by <span className="text-slate-400 font-medium">Next.js</span> & <span className="text-slate-400 font-medium">Google Gemini AI</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
