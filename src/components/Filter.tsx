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
          Filtrar por Período
        </Checkbox>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row justify="center">
      <Col span={100}>
        <Space style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end', gap: '1em' }}>
          <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
            <Button className='DropDownfilter'>
              Filtros <DownOutlined />
            </Button>
          </Dropdown>
          {selectedFilters.includes('name') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em' }}>
              <label style={{ fontSize: '13px' }} htmlFor="nameFilter">Buscar por Nome:</label>
              <Input
                id="nameFilter"
                name="nameFilter"
                onInput={handleFilter}
                placeholder="Filtrar por nome"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
          )}
          {selectedFilters.includes('price') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em', border: '1px solid #b8b9ba', padding: '.5em', borderRadius: '5px' }}>
              <label htmlFor="priceFilter">Buscar por Preço:</label>
              <Input
                id="priceFilter"
                name="priceFilter"
                type="range"
                min={0}
                max={10000}
                step={1}
                value={priceFilter}
                onChange={(e) => setPriceFilter(parseFloat(e.target.value))}
              />
              <span>A partir de: R$ {priceFilter}</span>
            </div>
          )}
          {selectedFilters.includes('date') && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em' }}>

                <label htmlFor="startDateFilter">Data Inicial:</label>
                <Input
                  id="startDateFilter"
                  name="startDateFilter"
                  type="date"
                  onChange={(e) => setStartDateFilter(e.target.value)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em' }}>

                <label htmlFor="endDateFilter">Data Final:</label>
                <Input
                  id="endDateFilter"
                  name="endDateFilter"
                  type="date"
                  onChange={(e) => setEndDateFilter(e.target.value)} />
              </div>
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
