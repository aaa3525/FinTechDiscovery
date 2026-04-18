import React from 'react';

const RiskBadge = ({ riskLevel, size = 'medium' }) => {
  const colors = { low: '#4caf50', medium: '#ff9800', high: '#f44336' };
  const color = colors[riskLevel] || '#757575';
  
  const sizes = { small: '0.6rem', medium: '0.7rem', large: '0.9rem' };
  const fontSize = sizes[size];
  const padding = size === 'small' ? '2px 6px' : size === 'large' ? '6px 12px' : '4px 8px';
  
  return (
    <span className="risk-badge" style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}`, padding, fontSize, borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
      {riskLevel} RISK
    </span>
  );
};

export default RiskBadge;