import React from 'react';
import Checkout from '../components/Checkout';

const ProductListingPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em', background: '#020024', color: '#fff', fontSize: '22px', marginBottom: '2em' }}>Checkout</h1>
      <Checkout />
    </div>
  );
};

export default ProductListingPage;
