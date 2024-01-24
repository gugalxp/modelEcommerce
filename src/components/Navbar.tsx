import React, { useState, useEffect } from 'react';
import { Layout, Button, Space, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar'; // Importe o componente Sidebar
import { useCart } from '../context/CartContext';
import Product from '../types/Product';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [countProducts, setCountProducts] = useState<Product[]>([])
  const { products, getProductsCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolling = window.scrollY > 0;
      setScrolling(isScrolling);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setCountProducts(products)
  }, [products])

  const toggleSidebar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSidebarVisible(!sidebarVisible);
    getProductsCart();
  };

  return (
    <>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          backgroundColor: scrolling ? '#020024' : '#fff',
          color: scrolling ? '#fff' : '#242424',
          boxShadow: scrolling ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : '',
          transition: 'background 1s, color 1s',
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 0px',
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: scrolling ? '#fff' : '#242424' }}>GNA</div>
          <Space>
            <Badge count={countProducts.length} showZero>
              <Button shape="circle" icon={<ShoppingCartOutlined />} size="large" onClick={toggleSidebar} />
            </Badge>
          </Space>
        </div>
      </Header>
      {sidebarVisible && <Sidebar setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible} />} 
    </>
  );
};

export default Navbar;
