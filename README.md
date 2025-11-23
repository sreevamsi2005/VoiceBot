# VoiceBot - AI Interview Assistant

A professional voice-powered interview assistant built with Next.js, featuring real-time speech recognition and AI-powered responses using Google Gemini API.

## Features

- 🎤 Real-time voice recognition
- 🤖 AI-powered responses using Google Gemini
- 🔊 Text-to-speech responses
- 🎨 Modern, professional UI with smooth animations
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd VoiceBot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. Click the microphone button to start recording
2. Ask your question (the app will listen for your voice)
3. Click the stop button or wait for silence to process your question
4. The AI will respond both visually and audibly

## Technology Stack

- **Framework**: Next.js 16
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
