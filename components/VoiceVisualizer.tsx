'use client';

import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
    state: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export function VoiceVisualizer({ state }: VoiceVisualizerProps) {
    return (
        <div className="flex items-center justify-center h-32 w-full gap-2">
            {state === 'idle' && (
                <div className="text-gray-400 text-sm animate-pulse">Ready to chat...</div>
            )}

            {state === 'listening' && (
                <>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 bg-blue-500 rounded-full"
                            animate={{
                                height: [20, 40, 20],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </>
            )}

            {state === 'thinking' && (
                <div className="flex gap-2">
                    <motion.div
                        className="w-4 h-4 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-4 h-4 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-4 h-4 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                </div>
            )}

            {state === 'speaking' && (
                <>
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-green-500 rounded-full"
                            animate={{
                                height: [10, 60, 10],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                                repeatType: "mirror"
                            }}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
