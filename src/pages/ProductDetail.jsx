import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RiskBadge from '../components/common/RiskBadge';
import ReturnDisplay from '../components/common/ReturnDisplay';
import { usePortfolio } from '../contexts/PortfolioContext';
import { generateDecisionInsight, calculateProjectedReturns, getRiskColor } from '../utils/financialLogic';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToPortfolio, isInPortfolio } = usePortfolio();
  const [investmentAmount, setInvestmentAmount] = useState(product?.minInvestment || 10000);
  const [years, setYears] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);
  const [compareProductId, setCompareProductId] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  
  if (!product) {
    return <div style={{ textAlign: 'center', padding: '60px' }}><h2>Product Not Found</h2><Link to="/products" className="btn-primary">Browse Products</Link></div>;
  }
  
  const insights = generateDecisionInsight(product);
  const projections = calculateProjectedReturns(investmentAmount, product.expectedReturn, years);
  const compareProduct = products.find(p => p.id === compareProductId);
  
  const startComparison = () => {
    if (compareProductId) {
      setIsComparing(true);
    }
  };
  
  const exitComparison = () => {
    setIsComparing(false);
    setCompareProductId(null);
  };
  
  // If in comparison mode, show split view
  if (isComparing && compareProduct) {
    return (
      <div>
        {/* Comparison Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', 
          color: 'white', 
          padding: '16px 24px',
          borderRadius: '12px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, color: 'white' }}>📊 Product Comparison</h2>
          <button 
            onClick={exitComparison}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Exit Comparison
          </button>
        </div>
        
        {/* Split View - Two Products Side by Side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* Left Column - Original Product */}
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f8f9fa', padding: '16px', borderBottom: '2px solid #0066cc' }}>
              <h3 style={{ margin: 0, color: '#0066cc' }}>Current Product</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              <h2>{product.name}</h2>
              <p style={{ color: '#6c757d', marginBottom: '16px' }}>{product.description}</p>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Category:</strong> <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Expected Return:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{product.expectedReturn}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Risk Level:</strong> <RiskBadge riskLevel={product.riskLevel} size="small" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Liquidity:</strong> <span style={{ textTransform: 'capitalize' }}>{product.liquidity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Time Horizon:</strong> <span style={{ textTransform: 'capitalize' }}>{product.timeHorizon}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <strong>Min Investment:</strong> <strong>PKR {product.minInvestment.toLocaleString()}</strong>
                </div>
              </div>
              
              <button 
                onClick={() => { addToPortfolio(product, product.minInvestment); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 2000); }}
                style={{ width: '100%', background: '#0066cc', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Add to Portfolio
              </button>
            </div>
          </div>
          
          {/* Right Column - Comparison Product */}
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f8f9fa', padding: '16px', borderBottom: '2px solid #ff9800' }}>
              <h3 style={{ margin: 0, color: '#ff9800' }}>Comparing With</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <img src={compareProduct.image} alt={compareProduct.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              <h2>{compareProduct.name}</h2>
              <p style={{ color: '#6c757d', marginBottom: '16px' }}>{compareProduct.description}</p>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Category:</strong> <span style={{ textTransform: 'capitalize' }}>{compareProduct.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Expected Return:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{compareProduct.expectedReturn}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Risk Level:</strong> <RiskBadge riskLevel={compareProduct.riskLevel} size="small" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Liquidity:</strong> <span style={{ textTransform: 'capitalize' }}>{compareProduct.liquidity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                  <strong>Time Horizon:</strong> <span style={{ textTransform: 'capitalize' }}>{compareProduct.timeHorizon}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <strong>Min Investment:</strong> <strong>PKR {compareProduct.minInvestment.toLocaleString()}</strong>
                </div>
              </div>
              
              <button 
                onClick={() => addToPortfolio(compareProduct, compareProduct.minInvestment)}
                style={{ width: '100%', background: '#ff9800', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Add to Portfolio
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom - Detailed Comparison Table */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px' }}>📋 Detailed Comparison</h3>
          
          {/* Decision Insights Comparison */}
          <div style={{ marginBottom: '24px' }}>
            <h4>Decision Insights</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ color: '#0066cc' }}>Current Product:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {generateDecisionInsight(product).map((insight, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{insight}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ color: '#ff9800' }}>Compared Product:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {generateDecisionInsight(compareProduct).map((insight, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Attributes Comparison Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Attribute</th>
                <th style={{ padding: '12px', textAlign: 'left', background: '#e3f2fd' }}>{product.name.substring(0, 30)}</th>
                <th style={{ padding: '12px', textAlign: 'left', background: '#fff3e0' }}>{compareProduct.name.substring(0, 30)}</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Winner</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Expected Return</td>
                <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>{product.expectedReturn}%</td>
                <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>{compareProduct.expectedReturn}%</td>
                <td style={{ padding: '12px' }}>
                  {product.expectedReturn > compareProduct.expectedReturn ? '🏆 Current' : 
                   compareProduct.expectedReturn > product.expectedReturn ? '🏆 Compared' : 'Tie'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Risk Level</td>
                <td style={{ padding: '12px' }}><RiskBadge riskLevel={product.riskLevel} size="small" /></td>
                <td style={{ padding: '12px' }}><RiskBadge riskLevel={compareProduct.riskLevel} size="small" /></td>
                <td style={{ padding: '12px' }}>
                  {product.riskLevel === 'low' && compareProduct.riskLevel !== 'low' ? '🏆 Current (Lower Risk)' :
                   compareProduct.riskLevel === 'low' && product.riskLevel !== 'low' ? '🏆 Compared (Lower Risk)' :
                   product.riskLevel === compareProduct.riskLevel ? 'Equal' : 'Depends on preference'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Liquidity</td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{product.liquidity}</td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{compareProduct.liquidity}</td>
                <td style={{ padding: '12px' }}>
                  {product.liquidity === 'easy' && compareProduct.liquidity !== 'easy' ? '🏆 Current' :
                   compareProduct.liquidity === 'easy' && product.liquidity !== 'easy' ? '🏆 Compared' :
                   'Similar'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Time Horizon</td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{product.timeHorizon}</td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{compareProduct.timeHorizon}</td>
                <td style={{ padding: '12px' }}>Depends on your goals</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Min Investment</td>
                <td style={{ padding: '12px' }}>PKR {product.minInvestment.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>PKR {compareProduct.minInvestment.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>
                  {product.minInvestment < compareProduct.minInvestment ? '🏆 Current (Lower)' :
                   compareProduct.minInvestment < product.minInvestment ? '🏆 Compared (Lower)' : 'Equal'}
                </td>
              </tr>
            </tbody>
          </table>
          
          {/* Risk Visualization Comparison */}
          <div style={{ marginTop: '24px' }}>
            <h4>Risk Level Comparison</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ marginBottom: '8px' }}>Current Product</div>
                <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${product.riskLevel === 'low' ? 33 : product.riskLevel === 'medium' ? 66 : 100}%`,
                    background: getRiskColor(product.riskLevel),
                    height: '30px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '8px' }}>Compared Product</div>
                <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${compareProduct.riskLevel === 'low' ? 33 : compareProduct.riskLevel === 'medium' ? 66 : 100}%`,
                    background: getRiskColor(compareProduct.riskLevel),
                    height: '30px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Normal single product view (when not comparing)
  return (
    <div>
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
          <div><img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} /></div>
          <div>
            <h1>{product.name}</h1>
            <p style={{ color: '#6c757d', marginBottom: '24px', lineHeight: '1.6' }}>{product.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <ReturnDisplay value={product.expectedReturn} showTrend />
                <small style={{ display: 'block', marginTop: '4px' }}>Annual return</small>
              </div>
              <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <RiskBadge riskLevel={product.riskLevel} size="large" />
                <small style={{ display: 'block', marginTop: '4px' }}>Risk classification</small>
              </div>
              <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>PKR {product.minInvestment.toLocaleString()}</div>
                <small>Minimum investment</small>
              </div>
            </div>
            <button 
              onClick={() => { addToPortfolio(product, investmentAmount); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }} 
              style={{ width: '100%', background: showSuccess ? '#28a745' : '#0066cc', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}
            >
              {showSuccess ? 'Added to Portfolio ✓' : 'Add to Portfolio'}
            </button>
            {isInPortfolio(product.id) && <Link to="/portfolio" style={{ display: 'block', textAlign: 'center', marginTop: '12px', color: '#0066cc' }}>View Portfolio →</Link>}
          </div>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
        <h2>📊 Compare This Product</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select product to compare:</label>
            <select 
              value={compareProductId || ''} 
              onChange={(e) => setCompareProductId(parseInt(e.target.value))}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              <option value="">Choose a product...</option>
              {products.filter(p => p.id !== product.id).map(p => (
                <option key={p.id} value={p.id}>{p.name.substring(0, 50)} - {p.expectedReturn}% return</option>
              ))}
            </select>
          </div>
          <button 
            onClick={startComparison}
            disabled={!compareProductId}
            style={{
              padding: '12px 24px',
              background: compareProductId ? '#0066cc' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: compareProductId ? 'pointer' : 'not-allowed'
            }}
          >
            Compare Products →
          </button>
        </div>
      </div>
      
      {/* Rest of the normal product detail view */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
        <h2>💡 Decision Insights</h2>
        {insights.map((insight, i) => <div key={i} style={{ padding: '12px', margin: '8px 0', background: '#f8f9fa', borderRadius: '8px', borderLeft: `3px solid ${getRiskColor(product.riskLevel)}` }}>{insight}</div>)}
      </div>
      
      <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
        <h2>📈 Return Projection Calculator</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label>Investment Amount (PKR)</label>
            <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))} min={product.minInvestment} style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>
          <div>
            <label>Investment Period (Years)</label>
            <input type="range" min="1" max="30" value={years} onChange={(e) => setYears(parseInt(e.target.value))} style={{ width: '100%', marginTop: '8px' }} />
            <div style={{ textAlign: 'center', marginTop: '8px' }}>{years} years</div>
          </div>
        </div>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span>Future Value:</span><strong>PKR {parseFloat(projections.futureValue).toLocaleString()}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span>Total Return:</span><strong>PKR {parseFloat(projections.totalReturn).toLocaleString()}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span>Percentage Return:</span><strong>{projections.percentageReturn}%</strong></div>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: '12px', padding: '32px' }}>
        <h2>⚠️ Risk Visualization</h2>
        <div className="risk-visualization">
          <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ width: `${product.riskLevel === 'low' ? 33 : product.riskLevel === 'medium' ? 66 : 100}%`, background: getRiskColor(product.riskLevel), height: '30px', transition: 'width 0.3s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Low Risk</span>
            <span>Medium Risk</span>
            <span>High Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
