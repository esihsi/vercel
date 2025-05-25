import React, { useState } from 'react';

const QuestionViewer = ({ questions }) => {
  const [index, setIndex] = useState(0);

  if (!questions.length) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <strong>Question {index + 1} of {questions.length}</strong>
        <p style={{ marginTop: '1rem' }}>{questions[index]}</p>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => setIndex(i => Math.max(i - 1, 0))} disabled={index === 0}>Previous</button>
        <button onClick={() => setIndex(i => Math.min(i + 1, questions.length - 1))} disabled={index === questions.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default QuestionViewer; 