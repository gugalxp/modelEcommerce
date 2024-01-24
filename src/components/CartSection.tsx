// CartSection.tsx

import React from 'react';
import { Table, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';

const { Title } = Typography;

const CartSection: React.FC = () => {
  const { products } = useCart();

  const columns = [
    {
      title: 'Produto',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$ ${price.toFixed(2)}`,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={products} pagination={false} />
      <Title level={5}>Total: $ {products.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Title>
    </>
  );
};

export default CartSection;
