import React, { useState } from 'react';
import { Input, Button, Space, Row, Col, Checkbox, Dropdown, Menu } from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';

interface FilterProps {
  onFilter: (filters: { name?: string; price?: number; startDate?: string; endDate?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<string | undefined>(undefined);
  const [endDateFilter, setEndDateFilter] = useState<string | undefined>(undefined);

  const handleFilter = () => {
    onFilter({ name: nameFilter, price: priceFilter, startDate: startDateFilter, endDate: endDateFilter });
  };

  const handleMenuClick = (value: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      } else {
        return [...prevFilters, value];
      }
    });
  };

  const menu = (
    <Menu onClick={(e) => handleMenuClick(e.key)}>
      <Menu.Item key="name">
        <Checkbox checked={selectedFilters.includes('name')}>
          Filtrar por Nome
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="price">
        <Checkbox checked={selectedFilters.includes('price')}>
          Filtrar por Preço
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="date">
        <Checkbox checked={selectedFilters.includes('date')}>
          Filtrar por Data de Inclusão
        </Checkbox>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row justify="center" style={{ marginBottom: '20px' }}>
      <Col span={100}>
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              Filtros <DownOutlined />
            </Button>
          </Dropdown>
          {selectedFilters.includes('name') && (
            <Input
              onInput={handleFilter}
              placeholder="Filtrar por nome"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          )}
          {selectedFilters.includes('price') && (
            <>
              <Input
                type="range"
                min={0}
                max={10000}
                step={1}
                value={priceFilter}
                onChange={(e) => setPriceFilter(parseFloat(e.target.value))}
              />
              <span>A partir de: R$ {priceFilter}</span>
            </>
          )}
          {selectedFilters.includes('date') && (
            <>
            <Input
              type="date"
              onChange={(e) => setStartDateFilter(e.target.value)} />
              <Input
              type="date"
              onChange={(e) => setEndDateFilter(e.target.value)} />
            </>
          )}
          {selectedFilters.length > 0 && (
            <Button icon={<FilterOutlined />} onClick={handleFilter}>
              Aplicar Filtros
            </Button>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default Filter;
