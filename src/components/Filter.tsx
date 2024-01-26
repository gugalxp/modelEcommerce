import React, { useState } from 'react';
import { Input, Button, Space, Row, Col, Checkbox, Dropdown, Menu, Modal } from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';
import './css/filter.css';

interface FilterProps {
  onFilter: (filters: { name?: string; price?: number; startDate?: string; endDate?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<string | undefined>(undefined);
  const [endDateFilter, setEndDateFilter] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFilter = () => {
    onFilter({ name: nameFilter, price: priceFilter, startDate: startDateFilter, endDate: endDateFilter });
    closeModal();
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
        <Space>
          <div className='container-filter'>
            <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
              <Button className='container-filter-dropdown-button'>
                Filtros <DownOutlined />
              </Button>
            </Dropdown>
            {selectedFilters.includes('name') && (
              <div className='container-filter-input-nome'>
                <label className='container-filter-input-nome-label' htmlFor="nameFilter">Buscar por Nome:</label>
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

            {selectedFilters.includes('date') && (
              <>
                <div className='container-filter-input-dateStart'>
                  <label htmlFor="startDateFilter">Data Inicial:</label>
                  <Input
                    id="startDateFilter"
                    name="startDateFilter"
                    type="date"
                    onChange={(e) => setStartDateFilter(e.target.value)} />
                </div>

                <div className='container-filter-input-endStart' >
                  <label htmlFor="endDateFilter">Data Final:</label>
                  <Input
                    id="endDateFilter"
                    name="endDateFilter"
                    type="date"
                    onChange={(e) => setEndDateFilter(e.target.value)} />
                </div>
              </>
            )}
            {selectedFilters.includes('price') && (
              <div className='container-filter-input-price'>
                <Button onClick={openModal}>Filtrar por preço</Button>
              </div>
            )}
            {selectedFilters.length > 0 && (
              <Button className='button-apply-filter' icon={<FilterOutlined />} onClick={handleFilter}>
                Aplicar Filtros
              </Button>
            )}
          </div>
        </Space>
        <Modal
          title="Filtrar por preço"
          open={modalVisible}
          onOk={handleFilter}
          onCancel={closeModal}
        >
          <Input
            type="range"
            min={0}
            max={10000}
            step={1}
            value={priceFilter}
            onChange={(e) => setPriceFilter(parseFloat(e.target.value))}
          />
          <span>A partir de: R$ {priceFilter}</span>
        </Modal>

      </Col>
    </Row >
  );
};

export default Filter;
