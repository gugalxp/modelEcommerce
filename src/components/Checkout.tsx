import React from 'react';
import { Steps, Button, message, Form, Input, Select, Row, Col, Typography, Divider, Table, DatePicker } from 'antd';
import { ShoppingCartOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [form] = Form.useForm();
  const { products, getProductsCart, clearCart } = useCart();

  const nextStep = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    }).catch((error) => {
      message.error('Por favor, preencha todos os campos corretamente.');
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {

    const isValid = form.getFieldsError().every((field) => {
      return !field.errors.length
    });

    if (isValid) {
      message.success('Compra Finalizada!');
      clearCart();
      getProductsCart();
    } else {
      message.error('Por favor, preencha todos os campos corretamente.');
    }
  };

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

  const renderDeliveryForm = () => {
    return (
      <Form
        form={form}
        name="deliveryForm"
        onFinish={nextStep}
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

  const renderPaymentForm = () => {
    return (
      <div>
        <Title level={4}>Detalhes do Pagamento</Title>
        <Divider />

        <Form form={form} name="paymentForm" onFinish={handleFinish} layout="vertical">
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
            <Link to="/">
              <Button type="primary" htmlType="submit" onClick={handleFinish}>
                Finalizar Compra
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const steps = [
    {
      title: 'Carrinho',
      content: (
        <>
          <Table columns={columns} dataSource={products} pagination={false} />
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Total:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>$ {products.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Text>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Informações de Entrega',
      content: renderDeliveryForm(),
    },
    {
      title: 'Detalhes do Pagamento',
      content: renderPaymentForm(),
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>

      <Steps current={currentStep} size="small">
        <Step title="Carrinho" icon={<ShoppingCartOutlined />} />
        <Step title="Entrega" icon={<UserOutlined />} />
        <Step title="Pagamento" icon={<SolutionOutlined />} />
      </Steps>

      <div className="steps-content" style={{ marginTop: '24px', marginBottom: '24px' }}>
        {currentStep === steps.length - 1 ? (
          renderPaymentForm()
        ) : (
          steps[currentStep].content
        )}
      </div>

      <div className="steps-action" style={{ textAlign: 'center' }}>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prevStep}>
            Voltar
          </Button>
        )}
        {currentStep === 0 && (
          <Link to="/">
            <Button type="primary" style={{ marginRight: '.51em', background: '#228b22'}}>
              Voltar ao home
            </Button>
          </Link>
        )}
        {currentStep < steps.length - 1 && (
          <>
            <Button type="primary" onClick={nextStep}>
              Próximo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
