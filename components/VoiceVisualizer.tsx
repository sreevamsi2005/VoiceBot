'use client';

import { motion } from 'framer-motion';
import { Mic, Brain, Volume2, Radio } from 'lucide-react';

interface VoiceVisualizerProps {
    state: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export function VoiceVisualizer({ state }: VoiceVisualizerProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-6 relative z-10">
            {/* Icon Indicator */}
            <motion.div
                key={state}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
            >
                {state === 'idle' && (
                    <div className="w-20 h-20 rounded-xl bg-slate-800/30 border border-slate-700/40 flex items-center justify-center shadow-lg">
                        <Mic className="w-10 h-10 text-slate-500" />
                    </div>
                )}
                {state === 'listening' && (
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/25 to-blue-600/20 border border-blue-400/50 flex items-center justify-center shadow-lg shadow-blue-500/30"
                    >
                        <Radio className="w-10 h-10 text-blue-400" />
                        <motion.div
                            className="absolute inset-0 rounded-xl border border-blue-400/40"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                    </motion.div>
                )}
                {state === 'thinking' && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                    >
                        <Brain className="w-10 h-10 text-cyan-400" />
                    </motion.div>
                )}
                {state === 'speaking' && (
                    <motion.div
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500/25 to-green-500/20 border border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                    >
                        <Volume2 className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                )}
            </motion.div>

            {/* Visualizer Bars */}
            <div className="flex items-end justify-center h-16 w-full gap-1 px-2 max-w-lg">
                {state === 'idle' && (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-slate-500 text-sm">Click the microphone to begin</p>
                    </div>
                )}

                {state === 'listening' && (
                    <>
                        {Array.from({ length: 32 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-full"
                                animate={{
                                    height: [
                                        Math.random() * 12 + 6,
                                        Math.random() * 48 + 20,
                                        Math.random() * 12 + 6,
                                    ],
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 0.4 + Math.random() * 0.3,
                                    repeat: Infinity,
                                    delay: i * 0.03,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </>
                )}

                {state === 'thinking' && (
                    <div className="flex items-center justify-center gap-2.5 w-full">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/40"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                )}

                {state === 'speaking' && (
                    <>
                        {Array.from({ length: 32 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-full"
                                animate={{
                                    height: [
                                        Math.random() * 8 + 4,
                                        Math.random() * 52 + 24,
                                        Math.random() * 8 + 4,
                                    ],
                                }}
                                transition={{
                                    duration: 0.3 + Math.random() * 0.2,
                                    repeat: Infinity,
                                    delay: i * 0.02,
                                    repeatType: "mirror",
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
