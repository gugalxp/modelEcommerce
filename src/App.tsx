import React, { useEffect } from 'react';
import AppRoutes from './routes/routes';
import { CartProvider } from './context/CartContext';
import '../src/index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    setTimeout(() => {
      AOS.init();
    }, 500);
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </CartProvider>
  );
}

export default App;
