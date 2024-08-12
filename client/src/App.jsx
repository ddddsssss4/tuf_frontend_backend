import React from 'react';
import Admin from './components/Admin.jsx';
import User from './components/User.jsx';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <h1>Flashcards</h1>
      <div className="admin-panel  ">
        <h2 className=''>Admin Panel</h2>
        <Admin />
      </div>
      <div className="user-panel">
        <h2>User Panel</h2>
        <User />
      </div>
    </div>
  );
};

export default App;
