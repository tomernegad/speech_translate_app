import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
    const { text, target } = req.body;
    const source = target === 'en' ? 'he' : 'en';
    try {
        const response = await axios.post(
            'https://libretranslate-xzrr.onrender.com/translate',
            {
                q: text,
                source: source,
                target: target,
                format: "text"
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        res.json({ translation: response.data.translatedText });
    } catch (err) {
        console.error(err.response ? err.response.data : err.message); // Log error details
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});