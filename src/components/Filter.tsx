// Filter.tsx
import React, { useState } from 'react';
import { Input, Button, Space, Row, Col, Checkbox, Dropdown, Menu } from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';

interface FilterProps {
  onFilter: (filters: { name?: string; price?: number; date?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<number | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const data: string[] = ["Item C", "Item A", "Item B"];

  const handleFilter = () => {
    let filtered = [...data];

    if (selectedFilters.includes('name') && nameFilter) {
      filtered = filtered.filter((item) => {
        return item.toLowerCase().includes(nameFilter.toLowerCase());
      });
    }

    if (selectedFilters.includes('price') && rangeValue > 0) {
      filtered = filtered.filter((item) => {
        const itemPrice = parseFloat(item);
        return itemPrice >= rangeValue;
      });
    }

    if (selectedFilters.includes('date') && dateFilter) {
      filtered = filtered.filter((item) => {
        return item.includes(dateFilter || '');
      });
    }

    onFilter({ name: nameFilter, price: priceFilter, date: dateFilter });
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
                max={100}
                step={1}
                value={rangeValue}
                onChange={(e) => setRangeValue(parseFloat(e.target.value))}
              />
              <span>A partir de: R$ {rangeValue}</span>
            </>
          )}
          {selectedFilters.includes('date') && (
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
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
