import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RiskBadge from '../common/RiskBadge';
import ReturnDisplay from '../common/ReturnDisplay';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useUserProfile } from '../../contexts/UserProfileContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToPortfolio, isInPortfolio } = usePortfolio();
  const { profile } = useUserProfile();
  
  const inPortfolio = isInPortfolio(product.id);
  
  const handleAddToPortfolio = () => {
    setIsAdding(true);
    setTimeout(() => {
      const amount = profile?.monthlyCapacity || product.minInvestment;
      addToPortfolio(product, Math.min(amount, product.minInvestment * 2));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsAdding(false);
      }, 2000);
    }, 300);
  };
  
  return (
    <div className="product-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', position: 'relative' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', textTransform: 'capitalize' }}>{product.category}</div>
      </div>
      
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>{product.name.substring(0, 50)}</h3>
        <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '12px' }}>{product.description.substring(0, 80)}...</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <ReturnDisplay value={product.expectedReturn} showTrend />
          <RiskBadge riskLevel={product.riskLevel} size="small" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75rem', marginBottom: '16px' }}>
          <div><span style={{ color: '#6c757d' }}>Min:</span> PKR {product.minInvestment.toLocaleString()}</div>
          <div><span style={{ color: '#6c757d' }}>Liquidity:</span> {product.liquidity}</div>
          <div><span style={{ color: '#6c757d' }}>Horizon:</span> {product.timeHorizon}</div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/product/${product.id}`} style={{ flex: 1, background: '#f8f9fa', color: '#0066cc', textDecoration: 'none', textAlign: 'center', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>Details</Link>
          <button onClick={handleAddToPortfolio} disabled={isAdding} style={{ flex: 1, background: inPortfolio ? '#6c757d' : showSuccess ? '#28a745' : '#0066cc', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            {showSuccess ? 'Added ✓' : inPortfolio ? 'In Portfolio' : 'Add'}
          </button>
        </div>
      </div>
      
      <div className="product-hover-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <RiskBadge riskLevel={product.riskLevel} size="large" />
          <div style={{ marginTop: '12px', fontSize: '1.2rem' }}>{product.expectedReturn}% Expected Return</div>
          <div style={{ marginTop: '8px', fontSize: '0.9rem' }}>{product.liquidity} Access</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;