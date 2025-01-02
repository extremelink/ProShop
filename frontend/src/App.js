import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { ToastContainer } from 'react-toastify';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

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
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
    </Provider>
  );
};

export default App;
