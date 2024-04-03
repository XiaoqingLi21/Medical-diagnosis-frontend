// src/App.tsx
import React from 'react';
import HomePage from './components/HomePage';
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
