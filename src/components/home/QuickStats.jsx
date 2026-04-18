import React from 'react';

const QuickStats = ({ products }) => {
  const stats = {
    totalProducts: products.length,
    categories: new Set(products.map(p => p.category)).size,
    avgReturn: (products.reduce((sum, p) => sum + p.expectedReturn, 0) / products.length).toFixed(1),
    minInvestment: Math.min(...products.map(p => p.minInvestment))
  };

  const statCards = [
    { label: 'Financial Products', value: stats.totalProducts },
    { label: 'Categories', value: stats.categories },
    { label: 'Avg Return', value: `${stats.avgReturn}%` },
    { label: 'Min Investment', value: `PKR ${stats.minInvestment.toLocaleString()}` }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', margin: '40px 0' }}>
      {statCards.map((stat, i) => (
        <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0066cc' }}>{stat.value}</div>
          <div style={{ color: '#6c757d', marginTop: '8px' }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;