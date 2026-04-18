import React from 'react';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = ({ products }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};

export default FeaturedProducts;