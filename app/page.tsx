'use client';

import { useVoiceBot } from '@/hooks/useVoiceBot';
import { VoiceVisualizer } from '@/components/VoiceVisualizer';
import { Mic, Square, AlertCircle, Sparkles, Brain, MessageSquare, Settings, ExternalLink, CheckCircle2 } from 'lucide-react';
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
    <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(99,102,241,0.03)_50%,transparent_100%)]" />
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="relative px-8 pt-10 pb-8 border-b border-slate-700/50 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200">
                      Voice Interview Assistant
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">AI-Powered Conversation with Vamsi</p>
                  </div>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApiKeyHelp(!showApiKeyHelp)}
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-colors"
                title="API Key Setup"
              >
                <Settings className="w-5 h-5 text-slate-400" />
              </motion.button>
            </div>

            {/* Status Badge */}
            <motion.div
              key={state}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} ${state !== 'idle' ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium text-slate-300">{getStatusText()}</span>
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
                    <Settings className="w-5 h-5 text-indigo-400" />
                    API Key Configuration
                  </h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">1. Get your API Key</p>
                        <p className="text-slate-400">Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">Google AI Studio <ExternalLink className="w-3 h-3" /></a> to create your Gemini API key</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">2. Create .env.local file</p>
                        <p className="text-slate-400">In your project root, create a file named <code className="px-1.5 py-0.5 rounded bg-slate-900/50 text-indigo-300 font-mono text-xs">.env.local</code></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">3. Add your API key</p>
                        <p className="text-slate-400">Add this line to the file: <code className="px-1.5 py-0.5 rounded bg-slate-900/50 text-indigo-300 font-mono text-xs">GEMINI_API_KEY=your_api_key_here</code></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">4. Restart the server</p>
                        <p className="text-slate-400">Stop the dev server (Ctrl+C) and run <code className="px-1.5 py-0.5 rounded bg-slate-900/50 text-indigo-300 font-mono text-xs">npm run dev</code> again</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="p-8 md:p-10">
            {/* Visualizer Section */}
            <div className="mb-8 min-h-[200px] flex items-center justify-center bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl border border-slate-700/30 p-8">
              <VoiceVisualizer state={state} />
            </div>

            {/* Conversation Area */}
            <div className="space-y-4 mb-8 min-h-[180px]">
              <AnimatePresence mode="wait">
                {state === 'idle' && !transcript && !response && !error && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-slate-500" />
                    </div>
                    <p className="text-slate-400 text-lg font-medium mb-2">Ready to start</p>
                    <p className="text-slate-500 text-sm">Click the microphone button below to begin the conversation</p>
                  </motion.div>
                )}

                {transcript && (
                  <motion.div
                    key="transcript"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Mic className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Your Question</span>
                    </div>
                    <p className="text-slate-100 leading-relaxed">{transcript}</p>
                  </motion.div>
                )}

                {response && (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 rounded-xl border border-indigo-500/30 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Vamsi's Response</span>
                    </div>
                    <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">{response}</p>
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
                  className="group relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center transition-all shadow-xl shadow-red-500/30 border-2 border-red-400/20"
                >
                  <div className="absolute inset-0 rounded-2xl bg-red-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Square size={32} fill="currentColor" className="text-white relative z-10" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: state === 'thinking' || state === 'speaking' ? 1 : 1.05 }}
                  whileTap={{ scale: state === 'thinking' || state === 'speaking' ? 1 : 0.95 }}
                  onClick={startListening}
                  disabled={state === 'thinking' || state === 'speaking'}
                  className={`group relative w-24 h-24 rounded-2xl flex items-center justify-center transition-all shadow-xl border-2 ${
                    state === 'thinking' || state === 'speaking'
                      ? 'bg-slate-700 cursor-not-allowed opacity-50 border-slate-600/30'
                      : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 border-indigo-400/20 shadow-indigo-500/30'
                  }`}
                >
                  {state !== 'thinking' && state !== 'speaking' && (
                    <div className="absolute inset-0 rounded-2xl bg-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  <Mic size={36} className={`relative z-10 ${state === 'thinking' || state === 'speaking' ? 'text-slate-400' : 'text-white'}`} />
                </motion.button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-slate-700/50 bg-slate-900/30">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Active
              </span>
              <span className="text-slate-600">•</span>
              <span>Powered by <span className="text-slate-400 font-medium">Next.js</span> & <span className="text-slate-400 font-medium">Google Gemini</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
