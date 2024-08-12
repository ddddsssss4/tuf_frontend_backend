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
      <button onClick={() => setDialogOpen(true)}>Add Flashcard</button>
      {flashcards.map((flashcard) => (
        <div key={flashcard.id} className="flashcard-item">
          <div>
            <strong>{flashcard.question}</strong>
          </div>
          <div>{flashcard.answer}</div>
          <button onClick={() => handleEdit(flashcard)}>Edit</button>
          <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
        </div>
      ))}
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
  );
};

export default Admin;
