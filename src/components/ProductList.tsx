import React, { useState } from 'react';
import { Button, Card, Modal, message } from 'antd';
import Product from '../types/Product';
import ProductRating from './ProductRating';
import { useCart } from '../context/CartContext';
import { ShoppingOutlined } from '@ant-design/icons';
import Filter from './Filter';

const ProductList: React.FC = () => {
  const { products, getProductsCart, addItemToCart, updateCartAndSaveToStorage, getProducts } = useCart();
  const initialProductsList: Product[] = getProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProductsList);

  const numberInstallments = 3;

  const handleAddToCart = (product: Product) => {
    const isItemInCart = products.some((item) => item.id === product.id);

    if (isItemInCart) {
      message.warning(`${product.name} já está no seu carrinho. Verifique o carrinho para ajustar a quantidade.`);
    } else {
      addItemToCart(product);
      const updatedProducts = [...products, product];
      updateCartAndSaveToStorage(updatedProducts);
      getProductsCart();

      Modal.success({
        title: 'Produto Adicionado ao Carrinho',
        content: `${product.name} foi adicionado ao seu carrinho de compras.`,
      });
    }
  };

  const handleFilter = (filters: { name?: string; price?: number; startDate?: string | undefined; endDate?: string | undefined }) => {
    const { name, price, startDate, endDate } = filters;

    const filteredList = initialProductsList.filter((product) => {
      const productName = product.name.trim().toLowerCase();
      const nameFilter = name ? productName.startsWith(name.toLowerCase()) : true;

      const productPrice = product.price;
      const priceFilter = price ? productPrice <= price : true;

      if (startDate && endDate) {
        const productDate = new Date(product.dateAdded);
        const startFilter = productDate >= new Date(startDate);
        const endFilter = productDate <= new Date(endDate);

        return nameFilter && priceFilter && startFilter && endFilter;
      }

      return nameFilter && priceFilter;
    });

    if (name?.length === 1) {
      return setFilteredProducts(initialProductsList);
    }

    setFilteredProducts(filteredList);
  };

  return (
    <>
      <div>
        <h1 data-aos="zoom-in" data-aos-duration="1700" className="header">
          <ShoppingOutlined style={{ marginRight: '8px', fontSize: '35px' }} />
          Produtos
        </h1>
      </div>
      <Filter onFilter={handleFilter} />
      <div className="product-list" data-aos="fade-up" data-aos-duration="1700">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="product-card ">
            <div className="product-card__image-container">
              <img src={product.image} alt={product.name} className="product-card__image" />
            </div>
            <div className="product-card__name">
              <p className="product-card__name-text">{product.name}</p>
            </div>
            <div className="product-card__description">
              <p className="product-card__description-text">{product.description}</p>
            </div>
            <div className="product-card__price">
              <p className="product-card__price-text">
                <del className="product-card__old-price-text">R$ {product.oldPrice}</del> <br /> R$ {product.price}
              </p>
            </div>
            <div className="product-card__installments">
              <p className="product-card__installments-text">
                boleto/pix
                ou 3x de {(product.price / numberInstallments).toFixed(2)}
              </p>
            </div>
            <div className="product-card__rating">
              <ProductRating rating={1} />
            </div>
            <div className="product-card__add-to-cart-button">
              <Button
                className="product-card__add-button"
                onClick={() => handleAddToCart(product)}
                style={{
                  boxShadow: '0 0 10px #020024',
                  animation: '0.5s infinite alternate',
                }}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
