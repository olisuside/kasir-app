import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto max-w-screen-2xl">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sukses" element={<Sukses />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
