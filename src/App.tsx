// src/App.tsx
import React from 'react';
import HomePage from './pages/HomePage';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline /> {/* Normalize the stylesheet */}
      <HomePage />
    </>
  );
}

export default App;
