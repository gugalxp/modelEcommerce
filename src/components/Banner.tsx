import React from 'react';
import { Carousel } from 'antd';
import { products } from '../data/productsData';

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
    <div style={{ marginTop: '1em', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Carousel className='borderBanner' style={{ height: '470px', margin: '2em', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} infinite={true} autoplay autoplaySpeed={3000} dotPosition="left" effect="fade">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', objectFit: 'cover', flexWrap: 'wrap' }}
            >
              <img
                data-aos="fade-up"
                data-aos-duration="2000"
                alt={product.name}
                src={product.image}
                style={{ objectFit: 'cover' }}
              />
              <div data-aos="flip-down" style={{ marginLeft: '1em', display: 'flex', justifyContent: 'left', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h3 style={{ color: '#fff', background: product.name === "PlayStation 5" ? 'green' : '', fontWeight: 900, fontSize: '13px', padding: '.2em .7em', borderRadius: '5px' }}>{product.name === "PlayStation 5" ? 'Mais vendido' : ''}</h3>
                <h3 style={{ color: '#020024', fontWeight: 900, fontSize: '35px' }}>{product.name}</h3>
                <h3 style={{ color: 'green', fontSize: '20px', marginTop: '.5em', }}>R$ {product.price}</h3>
              </div>
            </div>
            <div
              style={{
                paddingLeft: '1em',
              }}
            >
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
