import React, { useEffect, useState } from 'react';
import { commerce } from './lib/commerce';

import Products from './components/products/Products';
import NavBar from './components/NavBar/NavBar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import  Alert  from '../src/components/Alert/Alert.js';


const App = () => {
  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState({});
  const [order,setOrder] = useState({});
  const [errorMessage,setErrorMessage] = useState("");



  const user = JSON.parse(localStorage.getItem("profile"));


  const fetchProducts = async () =>{
    const {data} = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async ()=>{
    setCart(await commerce.cart.retrieve());
  }
  const handleAddToCart = async (productId,quantity)=>{
    const item = await commerce.cart.add(productId,quantity);
    setCart(item.cart);
  }

  const handleUpdateCartQty = async (productId,quantity)=>{
    const {cart} = await commerce.cart.update(productId,{quantity});
    setCart(cart)
  }

  const handleRemoveFromCart = async (productId)=>{
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async ()=>{
    const {cart} = await commerce.cart.empty();
    setCart(cart);
  }
  
  const refreshCart = async ()=>{
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId,newOrder)=>{
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
  
  return (
    <div>
        <BrowserRouter>
        <div>
              <NavBar totalItems={cart.total_items} />
              
              <Routes>
                <Route index path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />          
                <Route exact path="/cart" element={<Cart
                  cart={cart} 
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                 />} />     
                 <Route exact path="/checkout" element={<Checkout 
                  cart={cart} 
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                 />} />    
                 <Route exact path="/auth" element={<Auth />} />    
              </Routes>
             
          </div>
      </BrowserRouter>
      
    </div>
    
          
  )
}

export default App;
