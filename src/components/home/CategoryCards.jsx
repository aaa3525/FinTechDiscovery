import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCards = () => {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'savings', icon: '🏦', description: 'Secure, low-risk accounts', color: '#4caf50' },
    { name: 'investment', icon: '📈', description: 'Growth-focused products', color: '#2196f3' },
    { name: 'insurance', icon: '🛡️', description: 'Protection & security', color: '#ff9800' },
    { name: 'crypto', icon: '₿', description: 'Digital assets, high risk', color: '#f44336' }
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to products page with category filter in state
    navigate('/products', { state: { presetCategory: categoryName } });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '40px 0' }}>
      {categories.map(cat => (
        <div 
          key={cat.name} 
          onClick={() => handleCategoryClick(cat.name)}
          style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            textAlign: 'center', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            transition: 'transform 0.3s ease', 
            cursor: 'pointer' 
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{cat.icon}</div>
          <h3 style={{ textTransform: 'capitalize', marginBottom: '8px', color: cat.color }}>{cat.name}</h3>
          <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>{cat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;