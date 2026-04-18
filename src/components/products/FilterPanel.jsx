import React, { useState } from 'react';

const FilterPanel = ({ filters, onFilterChange, productCount }) => {
  const [minReturn, setMinReturn] = useState(filters.minReturn || 0);
  const [maxReturn, setMaxReturn] = useState(filters.maxReturn || 30);
  const [userBudget, setUserBudget] = useState(filters.userBudget || 100000);
  
  const handleRiskChange = (risk) => {
    const newRisk = filters.risk.includes(risk) 
      ? filters.risk.filter(r => r !== risk) 
      : [...filters.risk, risk];
    onFilterChange({ ...filters, risk: newRisk });
  };
  
  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category) 
      ? filters.category.filter(c => c !== category) 
      : [...filters.category, category];
    onFilterChange({ ...filters, category: newCategories });
  };
  
  const clearFilters = () => {
    onFilterChange({ 
      risk: [], 
      minReturn: 0, 
      maxReturn: 30, 
      category: [], 
      liquidity: 'all', 
      timeHorizon: 'all', 
      userBudget: 100000 
    });
    setMinReturn(0);
    setMaxReturn(30);
    setUserBudget(100000);
  };
  
  const activeFilterCount = () => {
    let count = 0;
    if (filters.risk.length > 0) count++;
    if (filters.minReturn > 0 || filters.maxReturn < 30) count++;
    if (filters.category.length > 0) count++;
    if (filters.liquidity !== 'all') count++;
    if (filters.timeHorizon !== 'all') count++;
    if (filters.userBudget !== 100000) count++;
    return count;
  };
  
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px', 
      padding: '20px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
      position: 'sticky', 
      top: '80px',
      maxHeight: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '20px', 
        paddingBottom: '10px', 
        borderBottom: '2px solid #e0e0e0',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0 }}>Filters</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {activeFilterCount() > 0 && (
            <span style={{ 
              background: '#0066cc', 
              color: 'white', 
              borderRadius: '20px', 
              padding: '2px 8px', 
              fontSize: '12px' 
            }}>
              {activeFilterCount()} active
            </span>
          )}
          <button 
            onClick={clearFilters} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#dc3545', 
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Filter 1: Risk Level */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>📊 Risk Level</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { level: 'low', label: 'Low', color: '#4caf50', bg: '#e8f5e9' },
            { level: 'medium', label: 'Medium', color: '#ff9800', bg: '#fff3e0' },
            { level: 'high', label: 'High', color: '#f44336', bg: '#ffebee' }
          ].map(risk => (
            <label 
              key={risk.level} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '20px',
                background: filters.risk.includes(risk.level) ? risk.bg : '#f5f5f5',
                border: filters.risk.includes(risk.level) ? `1px solid ${risk.color}` : '1px solid #e0e0e0',
                transition: 'all 0.2s ease'
              }}
            >
              <input 
                type="checkbox" 
                checked={filters.risk.includes(risk.level)} 
                onChange={() => handleRiskChange(risk.level)} 
                style={{ cursor: 'pointer' }}
              />
              <span style={{ color: risk.color, fontWeight: '500' }}>{risk.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Filter 2: Return Range */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>💰 Expected Return Range</h4>
        <div style={{ marginBottom: '12px' }}>
          <input 
            type="range" 
            min="0" 
            max="30" 
            step="0.5" 
            value={minReturn} 
            onChange={(e) => setMinReturn(parseFloat(e.target.value))} 
            onMouseUp={() => onFilterChange({ ...filters, minReturn, maxReturn })}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
            <span>30%</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#6c757d' }}>Min %</label>
            <input 
              type="number" 
              value={minReturn} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setMinReturn(val);
                onFilterChange({ ...filters, minReturn: val, maxReturn });
              }}
              style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
          </div>
          <span>→</span>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#6c757d' }}>Max %</label>
            <input 
              type="number" 
              value={maxReturn} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setMaxReturn(val);
                onFilterChange({ ...filters, minReturn, maxReturn: val });
              }}
              style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
          </div>
        </div>
      </div>
      
      {/* Filter 3: Category */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>🏷️ Category</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { name: 'savings', icon: '🏦', color: '#4caf50' },
            { name: 'investment', icon: '📈', color: '#2196f3' },
            { name: 'insurance', icon: '🛡️', color: '#ff9800' },
            { name: 'crypto', icon: '₿', color: '#f44336' }
          ].map(cat => (
            <label 
              key={cat.name} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                background: filters.category.includes(cat.name) ? `${cat.color}10` : '#f8f9fa',
                border: filters.category.includes(cat.name) ? `1px solid ${cat.color}` : '1px solid #e0e0e0',
                transition: 'all 0.2s ease'
              }}
            >
              <input 
                type="checkbox" 
                checked={filters.category.includes(cat.name)} 
                onChange={() => handleCategoryChange(cat.name)} 
                style={{ cursor: 'pointer' }}
              />
              <span>{cat.icon}</span>
              <span style={{ textTransform: 'capitalize' }}>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Filter 4: Liquidity */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>💧 Liquidity</h4>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          {[
            { value: 'all', label: 'All', icon: '🌊' },
            { value: 'easy', label: 'Easy Access', icon: '⚡', desc: 'Withdraw anytime' },
            { value: 'moderate', label: 'Moderate', icon: '⏱️', desc: 'Some restrictions' },
            { value: 'locked', label: 'Locked', icon: '🔒', desc: 'Long-term commitment' }
          ].map(opt => (
            <label 
              key={opt.value} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                background: filters.liquidity === opt.value ? '#e3f2fd' : '#f8f9fa',
                border: filters.liquidity === opt.value ? '1px solid #0066cc' : '1px solid #e0e0e0'
              }}
            >
              <input 
                type="radio" 
                name="liquidity" 
                value={opt.value} 
                checked={filters.liquidity === opt.value} 
                onChange={() => onFilterChange({ ...filters, liquidity: opt.value })}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '20px' }}>{opt.icon}</span>
              <div>
                <div style={{ fontWeight: '500' }}>{opt.label}</div>
                {opt.desc && <div style={{ fontSize: '11px', color: '#6c757d' }}>{opt.desc}</div>}
              </div>
            </label>
          ))}
        </div>
      </div>
      
      {/* Filter 5: Time Horizon */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>⏰ Time Horizon</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { value: 'all', label: 'All', color: '#6c757d' },
            { value: 'short', label: 'Short', desc: '1-2 yrs', color: '#4caf50' },
            { value: 'medium', label: 'Medium', desc: '3-5 yrs', color: '#ff9800' },
            { value: 'long', label: 'Long', desc: '5+ yrs', color: '#f44336' }
          ].map(opt => (
            <label 
              key={opt.value} 
              style={{ 
                flex: 1,
                textAlign: 'center',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                background: filters.timeHorizon === opt.value ? `${opt.color}20` : '#f8f9fa',
                border: filters.timeHorizon === opt.value ? `1px solid ${opt.color}` : '1px solid #e0e0e0'
              }}
            >
              <input 
                type="radio" 
                name="timeHorizon" 
                value={opt.value} 
                checked={filters.timeHorizon === opt.value} 
                onChange={() => onFilterChange({ ...filters, timeHorizon: opt.value })}
                style={{ display: 'none' }}
              />
              <div style={{ fontWeight: '500' }}>{opt.label}</div>
              {opt.desc && <div style={{ fontSize: '10px', color: '#6c757d' }}>{opt.desc}</div>}
            </label>
          ))}
        </div>
      </div>
      
      {/* Filter 6: Minimum Investment */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>💰 Maximum Budget (PKR)</h4>
        <div>
          <input 
            type="range" 
            min="0" 
            max="50000000" 
            step="10000" 
            value={userBudget} 
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setUserBudget(val);
              onFilterChange({ ...filters, userBudget: val });
            }}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
            <span>PKR 0</span>
            <span>PKR 250K</span>
            <span>PKR 50M</span>
          </div>
        </div>
        <div style={{ marginTop: '8px' }}>
          <div style={{ 
            background: '#e3f2fd', 
            padding: '10px', 
            borderRadius: '8px', 
            textAlign: 'center',
            fontSize: '14px'
          }}>
            💰 Can afford up to <strong>PKR {userBudget.toLocaleString()}</strong>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div style={{ 
        textAlign: 'center', 
        paddingTop: '16px', 
        borderTop: '2px solid #e0e0e0',
        marginTop: '8px'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#0066cc' 
        }}>
          {productCount}
        </div>
        <div style={{ color: '#6c757d', fontSize: '12px' }}>
          products found
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;