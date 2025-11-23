# Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local` file**
   
   Create a file named `.env.local` in the root directory of the project with the following content:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Get your Gemini API Key**
   
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the API key and paste it in your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Error: "Gemini API Key not configured"
- Make sure you've created the `.env.local` file in the root directory
- Verify the file contains: `GEMINI_API_KEY=your_key_here`
- Restart the development server after creating/modifying `.env.local`
- Make sure there are no spaces around the `=` sign

### Browser Compatibility
- This app requires a modern browser with Speech Recognition API support
- Chrome, Edge, and Safari (desktop) are recommended
- Make sure you grant microphone permissions when prompted

