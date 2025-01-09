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
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import ProfileScreen from './screens/ProfileScreen';
import { Container } from 'react-bootstrap';

const App = () => { 
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={ true }>
    <BrowserRouter>
    <div className='app-container'>
      <Header />
      <Container className='fluid'>
      <main className="main py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />        
          <Route element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
        </Route>     
        </Routes>
      </main>
      </Container>
      <Footer/>
      <ToastContainer />
      </div>
    </BrowserRouter>
    </PayPalScriptProvider>
    </Provider>
  );
};
 
export default App;
