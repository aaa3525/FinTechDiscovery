import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';
import RiskBadge from '../components/common/RiskBadge';

const Portfolio = () => {
  const { portfolio, removeFromPortfolio, updateAllocation } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  
  if (portfolio.items.length === 0) {
    return <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}><h2>Your Portfolio is Empty</h2><p>Start building your investment portfolio.</p><Link to="/products" className="btn-primary" style={{ background: '#0066cc', color: 'white', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', display: 'inline-block', marginTop: '16px' }}>Browse Products</Link></div>;
  }

  const getRiskWarning = () => { if (portfolio.riskDistribution.high > 50) return "⚠️ Warning: High concentration in high-risk products (>50%)"; if (portfolio.riskDistribution.high > 30) return "⚠️ Caution: High concentration in high-risk products"; return null; };
  
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Your Portfolio</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Total Invested</div><div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0066cc' }}>PKR {portfolio.totalInvested.toLocaleString()}</div></div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Weighted Return</div><div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745' }}>{portfolio.weightedReturn}%</div></div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Diversification</div><div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ff9800' }}>{Object.keys(portfolio.categoryDistribution).length}/4</div></div>
      </div>
      
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
        <h3>Risk Distribution</h3>
        {['low', 'medium', 'high'].map(risk => (<div key={risk} style={{ marginBottom: '12px' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ textTransform: 'capitalize' }}>{risk} Risk</span><span>{Math.round(portfolio.riskDistribution[risk])}%</span></div><div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}><div style={{ width: `${portfolio.riskDistribution[risk]}%`, background: risk === 'low' ? '#4caf50' : risk === 'medium' ? '#ff9800' : '#f44336', height: '20px', transition: 'width 0.3s ease' }} /></div></div>))}
        {getRiskWarning() && <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '8px', marginTop: '16px' }}>{getRiskWarning()}</div>}
      </div>
      
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
        <h3 style={{ padding: '20px', borderBottom: '1px solid #e0e0e0' }}>Portfolio Holdings</h3>
        {portfolio.items.map(item => (<div key={item.product.id} style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}><img src={item.product.image} alt={item.product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} /><div><div><strong>{item.product.name.substring(0, 40)}</strong></div><div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}><RiskBadge riskLevel={item.product.riskLevel} size="small" /><span style={{ fontSize: '0.85rem', color: '#28a745' }}>{item.product.expectedReturn}% return</span></div></div></div>
          <div style={{ textAlign: 'right' }}>{editingId === item.product.id ? (<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} style={{ width: '120px', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /><button onClick={() => { updateAllocation(item.product.id, parseFloat(editAmount)); setEditingId(null); }} style={{ padding: '6px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button><button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button></div>) : (<><div><span style={{ color: '#6c757d' }}>Allocated:</span> <strong>PKR {item.allocatedAmount.toLocaleString()}</strong></div><div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}><button onClick={() => { setEditingId(item.product.id); setEditAmount(item.allocatedAmount); }} style={{ padding: '4px 12px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button><button onClick={() => removeFromPortfolio(item.product.id)} style={{ padding: '4px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove</button></div></>)}</div>
        </div>))}
      </div>
      
      <div style={{ display: 'flex', gap: '16px', marginTop: '24px', justifyContent: 'center' }}><Link to="/products" style={{ padding: '12px 24px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>Add More Products</Link><Link to="/recommendations" style={{ padding: '12px 24px', background: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>Get Recommendations</Link></div>
    </div>
  );
};

export default Portfolio;
