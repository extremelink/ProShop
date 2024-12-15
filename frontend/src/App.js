import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
