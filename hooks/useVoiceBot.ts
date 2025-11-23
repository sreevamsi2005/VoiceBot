'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface UseVoiceBotReturn {
    state: VoiceState;
    transcript: string;
    response: string;
    startListening: () => void;
    stopListening: () => void;
    cancel: () => void;
    error: string | null;
}

export function useVoiceBot(): UseVoiceBotReturn {
    const [state, setState] = useState<VoiceState>('idle');
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Speech Recognition
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onstart = () => {
                    setState('listening');
                    setError(null);
                };

                recognition.onresult = (event: any) => {
                    const current = event.resultIndex;
                    const transcriptText = event.results[current][0].transcript;
                    setTranscript(transcriptText);
                };

                recognition.onend = () => {
                    // If we were listening, now we should process the input
                    // We need to check if we actually got input
                };

                recognition.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                    setError('Error listening: ' + event.error);
                    setState('idle');
                };

                recognitionRef.current = recognition;
            } else {
                setError('Speech Recognition API not supported in this browser.');
            }

            // Initialize Speech Synthesis
            if ('speechSynthesis' in window) {
                synthRef.current = window.speechSynthesis;
            } else {
                setError('Text-to-Speech not supported.');
            }
        }
    }, []);

    const processInput = async (text: string) => {
        if (!text.trim()) {
            setState('idle');
            return;
        }

        setState('thinking');
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            setResponse(data.reply);
            speakResponse(data.reply);
        } catch (err: any) {
            setError(err.message);
            setState('idle');
        }
    };

    const speakResponse = (text: string) => {
        if (!synthRef.current) return;

        // Cancel any current speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setState('speaking');
        utterance.onend = () => setState('idle');
        utterance.onerror = (e) => {
            console.error('TTS Error:', e);
            setState('idle');
        };

        // Select a nice voice if available
        const voices = synthRef.current.getVoices();
        // Try to find a natural sounding voice (e.g., Google US English)
        const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang === 'en-US');
        if (preferredVoice) utterance.voice = preferredVoice;

        synthRef.current.speak(utterance);
    };

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            setTranscript('');
            setResponse('');
            try {
                recognitionRef.current.start();
            } catch (e) {
                // Sometimes it throws if already started
                console.warn('Recognition already started', e);
            }
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            // The onend event doesn't give us the final transcript reliably in all browsers if we stop manually
            // But for 'continuous: false', it should stop automatically when silence is detected.
            // If manual stop, we trigger processing.
            // We'll rely on the transcript state.
            // Wait a tick for the final result
            setTimeout(() => {
                // We need to access the latest transcript. 
                // Since we are in a callback, we might need a ref or just pass it.
                // Actually, let's just trigger the process in a useEffect when state changes from listening to thinking?
                // Or better: handle it in onend.
            }, 100);
        }
    }, []);

    // Handle the flow: Listening -> (Silence/Stop) -> Thinking -> Speaking
    useEffect(() => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        const handleEnd = () => {
            // Only process if we were listening
            // We can't easily check previous state here without ref, but we can check if we have a transcript
            // and we are not already thinking/speaking.
            // Actually, let's use a ref for the current state to avoid closure staleness if needed, 
            // but 'transcript' dependency in useEffect is better.
        };

        // We need to attach the handler that closes over the current transcript
        recognition.onend = () => {
            if (state === 'listening' && transcript) {
                processInput(transcript);
            } else if (state === 'listening') {
                setState('idle');
            }
        };

        // Cleanup
        return () => {
            recognition.onend = null;
        }
    }, [state, transcript]); // Re-bind onend when these change

    const cancel = useCallback(() => {
        if (recognitionRef.current) recognitionRef.current.abort();
        if (synthRef.current) synthRef.current.cancel();
        setState('idle');
    }, []);

    return { state, transcript, response, startListening, stopListening, cancel, error };
}
