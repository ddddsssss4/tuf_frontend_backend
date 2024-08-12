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
    <div className=" border-[2px] px-8 py-4 rounded-xl border-gray-700 ">
      <form onSubmit={handleSubmit}>
       <div className='flex gap-8'>
    
        <input
            type="text"
            placeholder="Question"
            value={question}
            className='bg-black border-white border-[2px] rounded-xl px-2 py-2 text-white'
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Answer"
            value={answer}
             className='bg-black border-white border-[2px] rounded-xl px-2 py-2 text-white'
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
       </div>
        <div className='mt-6 flex justify-between '>
          <button type="submit" className='bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-800 '>{flashcard ? 'Update Flashcard' : 'Add Flashcard'}</button>
          <button type="button" className='bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800 ' onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardForm;