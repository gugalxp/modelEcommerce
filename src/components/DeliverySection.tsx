import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const DeliverySection: React.FC = () => {
  const [form] = Form.useForm();

  const renderDeliveryForm = () => {
    return (
      <Form
        form={form}
        name="deliveryForm"
        onFinish={() => {}}
        layout="vertical"
        initialValues={{ addressType: 'residential' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="fullName"
              rules={[{ required: true, message: 'Por favor, insira o nome.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Telefone"
              name="phoneNumber"
              rules={[{ required: true, message: 'Por favor, insira o número de telefone.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Endereço"
          name="address"
          rules={[{ required: true, message: 'Por favor, insira o endereço.' }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Cidade"
              name="city"
              rules={[{ required: true, message: 'Por favor, insira a cidade.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="CEP"
              name="postalCode"
              rules={[{ required: true, message: 'Por favor, insira o CEP.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Tipo de Endereço"
          name="addressType"
          rules={[{ required: true, message: 'Por favor, selecione o tipo de endereço.' }]}
        >
          <Select>
            <Option value="residential">Residencial</Option>
            <Option value="business">Comercial</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return renderDeliveryForm();
};

export default DeliverySection;
