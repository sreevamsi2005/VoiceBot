import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { VAMSI_SYSTEM_PROMPT } from '@/lib/prompt';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get API key and trim any whitespace
    const apiKey = (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY)?.trim();

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Gemini API Key not configured. Please add GEMINI_API_KEY to .env.local and restart the server.' },
        { status: 500 }
      );
    }

    // Validate API key format (Gemini API keys typically start with AIza)
    if (!apiKey.startsWith('AIza')) {
      console.error('Invalid API key format detected');
      return NextResponse.json(
        { error: 'Invalid API key format. Please check your GEMINI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    let reply: string;

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: VAMSI_SYSTEM_PROMPT,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 800,
        },
      });

      const result = await model.generateContent(message);
      const response = await result.response;
      reply = response.text();
    } catch (error: any) {
      console.error('Gemini API Error:', error);

      if (error.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env.local');
      }

      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        throw new Error('API quota exceeded. Please try again in a moment.');
      }

      if (error.message?.includes('404') || error.message?.includes('not found')) {
        throw new Error(
          'Gemini API model not available. Please ensure your API key has access to Generative Language API at https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com'
        );
      }

      throw new Error(`Gemini API error: ${error.message || 'Unknown error'}`);
    }
    
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
