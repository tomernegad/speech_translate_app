import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use((cors()));
app.use(express.json());

app.post('/translate', async (req,res)=>{
    const {text,target} = req.body;
     // Determine source language based on target
    const source = target === 'en' ? 'he' : 'en';
    try{
        const response = await axios.post('https://libretranslate.com/translate',{
            q: text,
            source: source,
            target: target,
            format: "text"
        });
        res.json({translation: response.data.translateText});
    }
    catch(err){
        res.status(500).json({error: 'Translation failed'});
    }
})

app.listen(5000,()=> { console.log('server runinng on port 5000')});