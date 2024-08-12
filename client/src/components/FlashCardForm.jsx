import React, { useState, useEffect } from 'react';

const FlashcardForm = ({ onClose, onAdd, onUpdate, flashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (flashcard) {
      setQuestion(flashcard.question);
      setAnswer(flashcard.answer);
    }
  }, [flashcard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const flashcardData = { question, answer };
    if (flashcard) {
      onUpdate(flashcard.id, flashcardData);
    } else {
      onAdd(flashcardData);
    }
  };

  return (
    <div className="dialog">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit">{flashcard ? 'Update Flashcard' : 'Add Flashcard'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default FlashcardForm;
