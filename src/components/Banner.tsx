import React from 'react';
import { Carousel } from 'antd';
import { products } from '../data/productsData';
import './css/banner.css'

const Banner: React.FC = () => {
  const selectedProducts = [
    {
      name: 'Xbox Series S',
    },
    {
      name: 'Xbox Series X',
    },
    {
      name: 'PlayStation 5',
    },
  ];

  const filteredProducts = products.filter((product) =>
    selectedProducts.some((selectedProduct) => selectedProduct.name === product.name)
  );

  return (
    <div className="container-banner">
      <Carousel className='carousel-banner' infinite={true} autoplay autoplaySpeed={3000} dotPosition="left" effect="fade">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className='container-content-banner'
          >
            <div
              className='content-banner'
            >
              <img
                data-aos="fade-up"
                data-aos-duration="2000"
                alt={product.name}
                src={product.image}
                className='content-banner-image'
              />
              <div data-aos="flip-down" className='content-banner-text'>
                <h3 style={{ color: '#fff', background: product.name === "PlayStation 5" ? 'green' : '', fontWeight: 900, fontSize: '13px', padding: '.2em .7em', borderRadius: '5px' }}>{product.name === "PlayStation 5" ? 'Mais vendido' : ''}</h3>
                <h3 style={{ color: '#020024', fontWeight: 900, fontSize: '35px' }}>{product.name}</h3>
                <h3 style={{ color: 'green', fontSize: '20px', marginTop: '.5em', }}>R$ {product.price}</h3>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
