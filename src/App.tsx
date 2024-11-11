import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DayDetail } from './pages/DayDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day/:day" element={<DayDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;