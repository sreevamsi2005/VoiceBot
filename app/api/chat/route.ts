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
    
    // Try different model configurations for free tier
    // Some free tier accounts may need different model names
    let model;
    let reply: string;
    
    try {
      // First try: gemini-pro with system instruction
      model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        systemInstruction: VAMSI_SYSTEM_PROMPT,
      });
      const result = await model.generateContent(message);
      const response = await result.response;
      reply = response.text();
    } catch (firstError: any) {
      // If that fails, try without system instruction (some free tier may not support it)
      if (firstError.message?.includes('404') || firstError.message?.includes('not found')) {
        try {
          console.log('Trying gemini-pro without system instruction...');
          model = genAI.getGenerativeModel({ 
            model: 'gemini-pro',
          });
          // Prepend system prompt to the message instead
          const promptWithSystem = `${VAMSI_SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:`;
          const result = await model.generateContent(promptWithSystem);
          const response = await result.response;
          reply = response.text();
        } catch (secondError: any) {
          // If still failing, try with models/ prefix
          try {
            console.log('Trying with models/gemini-pro...');
            model = genAI.getGenerativeModel({ 
              model: 'models/gemini-pro',
            });
            const promptWithSystem = `${VAMSI_SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:`;
            const result = await model.generateContent(promptWithSystem);
            const response = await result.response;
            reply = response.text();
          } catch (thirdError: any) {
            console.error('All model attempts failed:', {
              first: firstError.message,
              second: secondError.message,
              third: thirdError.message
            });
            // Provide helpful error message
            const errorMsg = thirdError.message || 'Unknown error';
            if (errorMsg.includes('404') || errorMsg.includes('not found')) {
              throw new Error(
                'Gemini API model not found. Please ensure:\n' +
                '1. Your API key has the "Generative Language API" enabled in Google Cloud Console\n' +
                '2. Visit https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com to enable it\n' +
                '3. Wait a few minutes after enabling, then try again\n' +
                `Error details: ${errorMsg}`
              );
            }
            throw new Error(`Unable to connect to Gemini API: ${errorMsg}`);
          }
        }
      } else {
        throw firstError;
      }
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
