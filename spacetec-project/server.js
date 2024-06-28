require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/get-ai-response', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = `You are an AI assistant for SpaceTec, a company defending Planet Hackunia against alien invasion. Respond to the following message from a user: "${userMessage}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});