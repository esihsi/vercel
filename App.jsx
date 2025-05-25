import React, { useState } from 'react';
import { pdfjs } from 'pdfjs-dist';
import QuestionViewer from './components/QuestionViewer';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function extractQuestions(text) {
  // Simple regex: questions start with number and dot (e.g., 1. ...)
  const questionRegex = /\d+\.\s[\s\S]*?(?=(?:\n\d+\.|$))/g;
  const matches = text.match(questionRegex) || [];
  return matches.map(q => q.trim());
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    setError('');
    setQuestions([]);
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      const qs = extractQuestions(fullText);
      setQuestions(qs);
    } catch (err) {
      setError('Failed to parse PDF.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Probability Quiz (PDF Import)</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {questions.length > 0 && <QuestionViewer questions={questions} />}
    </div>
  );
}

export default App; 