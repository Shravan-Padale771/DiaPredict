import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Assessment from './pages/Assessment';
import Footer from './components/Footer';


export default function App() {
    return (
      <div>
        <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />

            <Route path='/assessment' element={<Assessment/>} />
          
          </Routes>
          <Footer/>
      </div>
    );
}
