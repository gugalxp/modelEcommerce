import React from 'react';
import ProductList from '../components/ProductList';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const ProductListingPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <ProductList />
      <Footer />
    </div>
  );
};

export default ProductListingPage;
