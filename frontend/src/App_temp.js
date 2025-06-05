import './App.css';
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
    const res = await axios.post('https://speech-translate-app.onrender.com/translate', {
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
    <div className="translator-card">
  <h2 style={{textAlign: 'center', color: '#2563eb', marginBottom: 24}}>Real-Time Speech Translator</h2>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16}}>
    <label>From: </label>
    <select className="translator-select" value={inputLang} onChange={e => setInputLang(e.target.value)}>
      {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
    </select>
    <button onClick={swapLanguages} className="translator-btn" style={{width: 40, padding: 0, margin: '0 8px'}}>⇄</button>
    <label>To: </label>
    <select className="translator-select" value={outputLang} onChange={e => setOutputLang(e.target.value)}>
      {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
    </select>
  </div>
  <button onClick={startListening} className="translator-btn">🎤 Speak</button>
  <div style={{ marginTop: 24 }}>
    <strong>Transcript:</strong>
    <div className="translator-transcript">{transcript}</div>
  </div>
  <div style={{ marginTop: 16 }}>
    <strong>Translation:</strong>
    <div className="translator-translation">{translation}</div>
  </div>
</div>
  );
}

export default App;