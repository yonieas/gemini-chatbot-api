# Gemini Chatbot API

A modern, responsive chatbot web app powered by Express.js and Google Generative AI (Gemini). This project provides a simple API backend and a beautiful frontend for chatting with Gemini AI.

## Features
- Modern, mobile-friendly chat UI
- Markdown and code highlighting in responses
- Express.js backend with Google Generative AI
- Easy to run locally

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)
- Google Generative AI API key (set in `.env`)

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd gemini-chatbot-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add your Gemini API key:
```
GOOGLE_API_KEY=your-gemini-api-key-here
```

### 4. Run the app
#### For development (with auto-reload):
```bash
npm run dev
```
#### For production:
```bash
npm start
```

### 5. Open in your browser
Go to: [http://localhost:3000](http://localhost:3000)

## Scripts
- `npm start` — Start the server
- `npm run dev` — Start with auto-reload (requires `nodemon`)
- `npm run build` — No build step (placeholder)

## Project Structure
```
public/
  index.html      # Chatbot UI
  style.css       # Modern responsive styles
  script.js       # Chat logic (frontend)
index.js          # Express server & API
package.json      # Project config & scripts
.env              # Your API key (not committed)
```

## Customization
- Edit `public/style.css` for UI tweaks
- Update `index.js` for backend logic

## License
MIT
