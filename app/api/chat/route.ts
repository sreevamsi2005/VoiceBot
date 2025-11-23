import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { VAMSI_SYSTEM_PROMPT } from '@/lib/prompt';

// Initialize OpenAI client
// Note: In a real production app, use server-side env vars only.
// For this demo, we check both to be flexible if the user puts it in NEXT_PUBLIC by mistake,
// but ideally it should be OPENAI_API_KEY.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'dummy-key',
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Check if API key is present (if not using a dummy/mock)
        if (!process.env.OPENAI_API_KEY && !process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
            // For the purpose of the demo without a key, we could return a mock response
            // or error out. Let's error out to prompt the user to add the key.
            return NextResponse.json(
                { error: 'OpenAI API Key not configured. Please add OPENAI_API_KEY to .env.local' },
                { status: 500 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Cost-effective and fast model
            messages: [
                { role: 'system', content: VAMSI_SYSTEM_PROMPT },
                { role: 'user', content: message },
            ],
            temperature: 0.7,
            max_tokens: 300, // Keep responses concise for voice
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
