import React, { useState, useEffect } from 'react';
import axios from '../axios';
import FlashcardForm from './FlashCardForm';

const Admin = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editFlashcard, setEditFlashcard] = useState(null);

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

  const handleAddFlashcard = async (flashcard) => {
    try {
      const response = await axios.post('/admin', flashcard);
      setFlashcards([...flashcards, response.data]);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleUpdateFlashcard = async (id, updatedFlashcard) => {
    try {
      await axios.put(`/admin/${id}`, updatedFlashcard);
      setFlashcards(flashcards.map(card =>
        card.id === id ? { ...card, ...updatedFlashcard } : card
      ));
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`/admin/${id}`);
      setFlashcards(flashcards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleEdit = (flashcard) => {
    setEditFlashcard(flashcard);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className='flex gap-8 px-24 items-center'>
        <button onClick={() => setDialogOpen(true)} className='border-gray-700 border-[2px] px-4 py-3 rounded-xl'>Add Flashcard</button>
        {isDialogOpen && (
        <FlashcardForm
          onClose={() => {
            setDialogOpen(false);
            setEditFlashcard(null);
          }}
          onAdd={handleAddFlashcard}
          onUpdate={handleUpdateFlashcard}
          flashcard={editFlashcard}
        />
      )}
      </div>
     <div className=' grid grid-cols-3 mt-4 px-24 '>
      {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="px-4 border-gray-600  border-[2px] rounded-xl py-2 w-[24rem] h-[10rem] overflow-x-auto mb-8">
            <div className='text-xl font-mono'>
              <strong>Que.{" "}{flashcard.question}</strong>
            </div>
            <div className='text-xl mt-2'>Ans.{" "}{flashcard.answer}</div>
            <div className='flex mt-8 gap-12'>
              <button onClick={() => handleEdit(flashcard)} className='px-4 py-2 rounded-xl bg-green-500 font-semibold hover:bg-green-700'>Edit</button>
              <button onClick={() => handleDeleteFlashcard(flashcard.id)} className='px-4 py-2 rounded-xl bg-red-500 font-semibold hover:bg-red-700'>Delete</button>
            </div>
          </div>
        ))}
     </div>
      
    </div>
  );
};

export default Admin;