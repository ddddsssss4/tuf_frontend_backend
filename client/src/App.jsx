import React from 'react';
import Admin from './components/Admin.jsx';
import User from './components/User.jsx';
import './styles.css';

const App = () => {
  return (
    <div className="bg-black text-white h-screen w-screen overflow-y-auto">
     <div className='flex justify-between px-24 py-12 items-center'>
     <div>
      <h1 className='text-center text-[28px] mt-6 font-semibold'>FLASH CARDS</h1>
     </div>
      <div className='border-gray-600 border-[2px] px-4 py-2 rounded-xl text-center'>
          <p className=''>Admin Panel</p>
      </div>
     </div>
      <div className="">
        <Admin />
      </div>
      <div className="px-24 pt-12">
       <div className='flex mb-12'>
        <div className='border-gray-600 border-[2px] px-4 py-2 rounded-xl text-center flex '>
              <p className=''>User Panel</p>
          </div>
       </div>
        <User />
      </div>
    </div>
  );
};

export default App;