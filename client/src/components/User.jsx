import React, { useState, useEffect } from 'react';
import axios from '../axios';

const User = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('/user');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const toggleFlip = (id) => {
    setFlipped(prevFlipped => ({
      ...prevFlipped,
      [id]: !prevFlipped[id]
    }));
  };

  return (
    <div>
      {flashcards.map((flashcard) => (
        <div key={flashcard.id} className={`flashcard ${flipped[flashcard.id] ? 'flipped' : ''}`}>
          <div className="front" onClick={() => toggleFlip(flashcard.id)}>
            {flashcard.question}
          </div>
          <div className="back" onClick={() => toggleFlip(flashcard.id)}>
            {flashcard.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
