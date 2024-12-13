import './styles/App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ExchangeRates from './pages/ExchangeRates.jsx';
import Navbar from './components/navbar.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ExchangeRates' element={<ExchangeRates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;   