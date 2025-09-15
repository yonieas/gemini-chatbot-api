import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT;

//Middleware

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'});

app.listen(port, () =>{
    console.log(`Gemini chatbot is running on port ${port}`);
});

// Route
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: 'No message provided'});
    }
    
    try {
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text});
        } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content'});
    }
});