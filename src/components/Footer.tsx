import React from 'react';
import { Layout, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Footer: AntdFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntdFooter style={{ backgroundColor: '#020024', color: '#fff', textAlign: 'center', height: '10em' }}>
      <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'center'}}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <MailOutlined /> exemplo@email.com
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <PhoneOutlined /> (11) 2222-3333
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <EnvironmentOutlined /> Endereço, Cidade, Estado, CEP
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: '1em'}}>
          <p style={{ marginTop: '16px', color: '#fff' }}>Direitos Reservados © {new Date().getFullYear()} - Seu Nome ou Nome da Empresa</p>
        </Col>
      </Row>
    </AntdFooter>
  );
};

export default Footer;
