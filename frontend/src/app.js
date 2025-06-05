import React, { useState, useRef } from 'react';
import axios from 'axios';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'he', label: 'Hebrew' }
];

function App() {
  const [inputLang, setInputLang] = useState('en');
  const [outputLang, setOutputLang] = useState('he');
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    console.log('SpeechRecognition:', SpeechRecognition); // Debug: check if supported
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = inputLang === 'en' ? 'en-US' : 'he-IL';
    recognition.interimResults = false;
    recognition.onstart = () => {
      console.log('Speech recognition started');
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log('Transcript:', text); // Debug: see what was recognized
      setTranscript(text);
      translateText(text);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  const translateText = async (text) => {
    const res = await axios.post('http://localhost:5000/translate', {
      text,
      target: outputLang
    });
    setTranslation(res.data.translation);
    speak(res.data.translation, outputLang);
  };

  const speak = (text, lang) => {
    const synth = window.speechSynthesis;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang === 'en' ? 'en-US' : 'he-IL';
    synth.speak(utter);
  };

  const swapLanguages = () => {
    setInputLang(outputLang);
    setOutputLang(inputLang);
    setTranscript('');
    setTranslation('');
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Real-Time Speech Translator</h2>
      <div>
        <label>From: </label>
        <select value={inputLang} onChange={e => setInputLang(e.target.value)}>
          {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
        <button onClick={swapLanguages}>⇄</button>
        <label>To: </label>
        <select value={outputLang} onChange={e => setOutputLang(e.target.value)}>
          {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </div>
      <button onClick={startListening} style={{ marginTop: 20 }}>🎤 Speak</button>
      <div style={{ marginTop: 20 }}>
        <strong>Transcript:</strong>
        <div>{transcript}</div>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>Translation:</strong>
        <div>{translation}</div>
      </div>
    </div>
  );
}

export default App;