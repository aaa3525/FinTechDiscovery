import React from 'react';

const ReturnDisplay = ({ value, showTrend = false }) => {
  const isPositive = value > 0;
  
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745' }}>{value}%</span>
      {showTrend && <span style={{ fontSize: '0.8rem', color: isPositive ? '#28a745' : '#dc3545' }}>{isPositive ? '↑' : '↓'}</span>}
      <span style={{ fontSize: '0.7rem', color: '#6c757d' }}>Expected Return</span>
    </div>
  );
};

export default ReturnDisplay;