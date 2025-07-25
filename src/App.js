import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ScrollToTop from './ScrollToTop';
import PostPage from './components/PostPage';
import './App.css';

function App() {
  return (
    <Router>
        <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;