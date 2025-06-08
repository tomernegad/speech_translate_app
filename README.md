# Speech Translate App (Local Version)

A simple React + Express app for real-time speech-to-text and translation between English and Hebrew, running **entirely on your local machine**.

![Screenshot App](https://github.com/user-attachments/assets/788dc725-ce77-4250-b5e7-65afeaf85389)

---

## Features

- 🎤 Speak in English or Hebrew and get instant transcription.
- 🌐 Translates your speech between English and Hebrew using LibreTranslate.
- 🖥️ Runs locally—no cloud deployment needed.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/speech_translate_app.git
cd speech_translate_app
```

### 2. Start LibreTranslate Locally

Make sure you have [Docker](https://www.docker.com/) installed, then run:

```bash
docker run -p 5001:5000 -e LT_LOAD_ONLY="en,he" libretranslate/libretranslate
```

### 3. Start the Backend

```bash
cd backend
npm install
npm start
```
- Runs at [http://localhost:5000](http://localhost:5000)

### 4. Start the Frontend

```bash
cd ../frontend
npm install
npm start
```
- Runs at [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Select input and output languages.
3. Click "🎤 Speak" and start talking.
4. See your transcript and translation instantly.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Express.js
- **Translation:** LibreTranslate (Docker)

---

## License

MIT
