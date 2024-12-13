import './styles/App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ExchangeRates from './pages/ExchangeRates.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ExchangeRates' element={<ExchangeRates />} />
      </Routes>
    </Router>
  )
}
export default App