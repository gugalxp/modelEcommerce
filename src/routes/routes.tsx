import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CheckoutPage from '../pages/CheckoutPage';
import ProductListingPage from '../pages/ProductListingPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
