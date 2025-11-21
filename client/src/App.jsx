

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Credits from './pages/Credits';
import Community from './pages/Community';
import ChatBox from './components/ChatBox';
import { assets } from './assets/assets';
import './assets/prism.css';
import Loading from './pages/Loading';
import { useAppContext } from './context/AppContext';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { user, loadingUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Loading page ya user fetch hone tak loader
  if (pathname === '/loading' || loadingUser) return <Loading />;

  return (
    <>
      {/* Toasts visible globally */}
      <Toaster />

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white h-screen flex w-screen">

          {/* Mobile Menu Icon */}
          {!isMenuOpen && (
            <img
              src={assets.menu_icon}
              alt="menu"
              className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden dark:invert z-50"
              onClick={() => setIsMenuOpen(true)}
            />
          )}

          {/* Sidebar */}
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>
        </div>
      ) : (
        // Login view
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;

