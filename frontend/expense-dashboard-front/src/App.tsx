import React from 'react';
import { Routes, Route } from "react-router-dom";

import { ResponsiveMenuBar } from './components/ui/MenuBar';
import { HomePage } from "./components/pages/Home.page";
import { ShopPage } from "./components/pages/Shop.page";
import { ReceiptPage } from './components/pages/Receipt.page';

import './App.css';


function App() {
  return (
    <div className="App">
      <ResponsiveMenuBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="shops" element={<ShopPage />} />
        <Route path="receipts" element={<ReceiptPage />} />
      </Routes>
    </div>
  );
}


export default App;
