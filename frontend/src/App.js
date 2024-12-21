import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    </Provider>
  );
};

export default App;
