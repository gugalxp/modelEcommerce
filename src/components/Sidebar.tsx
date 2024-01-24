import React from 'react';
import { Button, InputNumber, Modal } from 'antd';
import { CloseOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { Scrollbars } from 'react-custom-scrollbars';
import { updateCartItemQuantityInStorage } from '../utils/localStorageUtils';
import { Link } from 'react-router-dom';

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
      <div data-aos="fade-left" className={`custom-sidebar${sidebarVisible ? '' : ' collapsed'}`}>
        <div data-aos="fade-left" className="sidebar-header">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ShoppingCartOutlined style={{ fontSize: '25px', marginRight: '8px' }} />
            <h1 className="cart-title">Carrinho de Compras</h1>
          </div>
          <CloseOutlined className="close-icon" onClick={closeSidebar} />
        </div>
        {(!products || products.length === 0) && (
          <div className="cart-empty">
            <ShoppingCartOutlined style={{ fontSize: '36px', color: '#fff' }} />
            <p>Seu carrinho está vazio</p>
          </div>
        )}
        <Scrollbars
          renderThumbVertical={({ style, ...props }) => (
            <div {...props} style={{ ...style, backgroundColor: 'transparent', borderRadius: '8px' }} />
          )}
          autoHideTimeout={3000}
          autoHideDuration={1000}
          style={{ maxHeight: 'calc(100vh - 180px)', paddingRight: '8px', zIndex: 1 }}
        >
          <div className="cart-items" data-aos="fade-left">
            {products && products.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width={35} height={35} style={{ marginRight: '8px' }} />
                <span style={{ fontWeight: 'bolder' }}>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <InputNumber
                  style={{
                    width: '3.5em'
                  }}
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
          <div>
            <div style={{ position: 'absolute', bottom: 130, left: 0, width: '100%', textAlign: 'center', zIndex: 2 }}>
              <p style={{ color: '#fff' }}>Total: $ {calculateTotal()}</p>
            </div>
            <Link to="/checkout">
              <Button
                className="checkout-button"
                style={{
                  boxShadow: '0 0 10px #3498db', // Sombra inicial (azul)
                  animation: '0.5s infinite alternate', // Alterne entre as sombras em meio segundo
                }}
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
