import React from 'react';
import { Layout, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './css/footer.css';

const { Footer: AntdFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntdFooter className="container-footer">
      <Row gutter={[16, 16]} className='container-footer-content'>
        <Col xs={24} sm={12} md={8} lg={6}>
          <MailOutlined /> exemplo@email.com
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <PhoneOutlined /> (11) 2222-3333
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <EnvironmentOutlined /> Endereço, Cidade, Estado, CEP
        </Col>
        <Col span={24} className='container-footer-content-item' >
          <p>Direitos Reservados © {new Date().getFullYear()} - Seu Nome ou Nome da Empresa</p>
        </Col>
      </Row>
    </AntdFooter>
  );
};

export default Footer;
