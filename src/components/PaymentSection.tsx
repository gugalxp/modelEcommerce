import React from 'react';
import { Form, Input, Row, Col, DatePicker, Button, Divider, Typography} from 'antd';

const PaymentSection: React.FC = () => {
  const [form] = Form.useForm();

  const { Title } = Typography;

  const renderPaymentForm = () => {
    return (
      <div>
        <Title level={4}>Detalhes do Pagamento</Title>
        <Divider />

        <Form form={form} name="paymentForm" onFinish={() => {}} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Número do Cartão"
                name="cardNumber"
                rules={[
                  { required: true, message: 'Por favor, insira o número do cartão.' },
                  { pattern: /^\d{16}$/, message: 'O número do cartão deve ter 16 dígitos.' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Data de Validade"
                name="expirationDate"
                rules={[
                  { required: true, message: 'Por favor, insira a data de validade.' },
                  { type: 'object', validator: (_, value) => value && value.isValid(), message: 'Data de validade inválida.' },
                ]}
              >
                <DatePicker picker="month" format="MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Código de Segurança (CVV)"
                name="cvv"
                rules={[
                  { required: true, message: 'Por favor, insira o código de segurança (CVV).' },
                  { pattern: /^\d{3,4}$/, message: 'O CVV deve ter 3 ou 4 dígitos.' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nome no Cartão"
                name="cardHolderName"
                rules={[{ required: true, message: 'Por favor, insira o nome no cartão.' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Finalizar Compra
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return renderPaymentForm();
};

export default PaymentSection;
