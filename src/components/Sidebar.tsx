import React from 'react';
import { Button, InputNumber, Modal } from 'antd';
import { CloseOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { Scrollbars } from 'react-custom-scrollbars';
import { updateCartItemQuantityInStorage } from '../utils/localStorageUtils';
import { Link } from 'react-router-dom';
import './css/sidebar.css';

interface SidebarProps {
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ setSidebarVisible, sidebarVisible }) => {
  const { products, removeItemCart, getProductsCart } = useCart();

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleDelete = (productId: string) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Tem certeza que deseja excluir este produto do carrinho?',
      okText: 'Sim',
      onOk: () => {
        removeItemCart(productId);
        getProductsCart();
      },
      onCancel: () => {
      },
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateCartItemQuantityInStorage(productId, quantity);
    getProductsCart();
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <>
      <div className={`overlay${sidebarVisible ? ' active' : ''}`} onClick={closeSidebar}></div>
      <div data-aos='fade-left' className={`custom-sidebar${sidebarVisible ? '' : ' collapsed'}`}>
        <div data-aos='fade-left' className="sidebar-header">
          <div className='sidebar-header-content'>
            <ShoppingCartOutlined className="cart-icon" />
            <h1 className="cart-title">Carrinho de Compras</h1>
          </div>
          <CloseOutlined className="close-icon" onClick={closeSidebar} />
        </div>
        {(!products || products.length === 0) && (
          <div className="cart-empty">
            <ShoppingCartOutlined className="empty-cart-icon" />
            <p>Seu carrinho está vazio</p>
          </div>
        )}
        <Scrollbars
          renderThumbVertical={({ style, ...props }) => (
            <div {...props} style={{ ...style, backgroundColor: 'transparent', borderRadius: '8px' }} />
          )}
          autoHideTimeout={3000}
          autoHideDuration={1000}
          className="scrollbars"
        >
          <div className="cart-items">
            {products && products.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width={35} height={35} />
                <span className="product-name">{item.name}</span>
                <span className="product-price">${item.price.toFixed(2)}</span>
                <InputNumber
                  className="quantity-input"
                  min={1}
                  max={50}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(item.id, value || 1)}
                />
                <Button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            ))}
          </div>
        </Scrollbars>
        {products && products.length > 0 && (
          <div className="checkout-section">
            <div className="total-section">
              <p>Total: $ {calculateTotal()}</p>
            </div>
            <Link to="/checkout">
              <Button
                className="checkout-button"
              >
                Completar compra
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
