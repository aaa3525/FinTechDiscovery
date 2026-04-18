import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
        <p>No products match your filters.</p>
        <p style={{ color: '#6c757d' }}>Try adjusting your criteria.</p>
      </div>
    );
  }
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
      {products.map((product, index) => (
        <div key={product.id} style={{ animation: `fadeIn 0.5s ease ${index * 0.05}s forwards`, opacity: 0, transform: 'translateY(20px)' }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;