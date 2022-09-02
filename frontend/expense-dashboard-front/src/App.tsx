import React from 'react';
import { Routes, Route } from "react-router-dom";

import { ResponsiveMenuBar } from './components/ui/MenuBar';
import { Home } from "./components/pages/Home";
import { Shops } from "./components/pages/Shops";
import { Receipts } from './components/pages/Receipts';

import './App.css';


function App() {
  return (
    <div className="App">
      <ResponsiveMenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shops" element={<Shops />} />
        <Route path="receipts" element={<Receipts />} />
      </Routes>
    </div>
  );
}


export default App;
