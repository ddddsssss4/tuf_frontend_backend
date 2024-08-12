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
    <div className='grid grid-cols-3'>
      {flashcards.map((flashcard) => (
        <div key={flashcard.id} className={` flashcard mb-6 bg-black border-[2px] border-gray-600 text-white rounded-xl w-[24rem] h-[10rem] ${flipped[flashcard.id] ? 'flipped' : ''}`}>
          <div className="front text-xl font-bold" onClick={() => toggleFlip(flashcard.id)}>
            Que.{" "}{flashcard.question}
          </div>
          <div className="back text-xl font-bold" onClick={() => toggleFlip(flashcard.id)}>
            Ans.{" "}{flashcard.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;