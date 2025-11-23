'use client';

import { motion } from 'framer-motion';
import { Mic, Brain, Volume2, Radio } from 'lucide-react';

interface VoiceVisualizerProps {
    state: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export function VoiceVisualizer({ state }: VoiceVisualizerProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-8">
            {/* Icon Indicator */}
            <motion.div
                key={state}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
            >
                {state === 'idle' && (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 flex items-center justify-center shadow-lg">
                        <Mic className="w-12 h-12 text-slate-500" />
                    </div>
                )}
                {state === 'listening' && (
                    <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-2 border-blue-400/50 flex items-center justify-center shadow-lg shadow-blue-500/20"
                    >
                        <Radio className="w-12 h-12 text-blue-400" />
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-blue-400/40"
                            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                    </motion.div>
                )}
                {state === 'thinking' && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 flex items-center justify-center shadow-lg shadow-purple-500/20"
                    >
                        <Brain className="w-12 h-12 text-purple-400" />
                    </motion.div>
                )}
                {state === 'speaking' && (
                    <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    >
                        <Volume2 className="w-12 h-12 text-emerald-400" />
                    </motion.div>
                )}
            </motion.div>

            {/* Visualizer Bars */}
            <div className="flex items-end justify-center h-20 w-full gap-1 px-2 max-w-md">
                {state === 'idle' && (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-slate-500 text-sm font-medium">Waiting for input...</p>
                    </div>
                )}

                {state === 'listening' && (
                    <>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-gradient-to-t from-blue-500 via-indigo-400 to-blue-300 rounded-full"
                                animate={{
                                    height: [
                                        Math.random() * 15 + 8,
                                        Math.random() * 50 + 25,
                                        Math.random() * 15 + 8,
                                    ],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.3,
                                    repeat: Infinity,
                                    delay: i * 0.04,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </>
                )}

                {state === 'thinking' && (
                    <div className="flex items-center justify-center gap-3 w-full">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/30"
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                )}

                {state === 'speaking' && (
                    <>
                        {Array.from({ length: 24 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-gradient-to-t from-emerald-500 via-green-400 to-emerald-300 rounded-full"
                                animate={{
                                    height: [
                                        Math.random() * 10 + 5,
                                        Math.random() * 60 + 30,
                                        Math.random() * 10 + 5,
                                    ],
                                }}
                                transition={{
                                    duration: 0.35 + Math.random() * 0.25,
                                    repeat: Infinity,
                                    delay: i * 0.025,
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
