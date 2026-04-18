import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import FilterPanel from '../components/products/FilterPanel';

const ProductListing = ({ products }) => {
  const location = useLocation();
  const presetCategory = location.state?.presetCategory;
  
  const [filters, setFilters] = useState({ 
    risk: [], 
    minReturn: 0, 
    maxReturn: 30, 
    category: presetCategory ? [presetCategory] : [], 
    liquidity: 'all', 
    timeHorizon: 'all', 
    userBudget: 100000 
  });
  
  // Update filters when presetCategory changes
  useEffect(() => {
    if (presetCategory) {
      setFilters(prev => ({
        ...prev,
        category: [presetCategory]
      }));
    }
  }, [presetCategory]);
  
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filters.risk.length > 0) filtered = filtered.filter(p => filters.risk.includes(p.riskLevel));
    filtered = filtered.filter(p => p.expectedReturn >= filters.minReturn && p.expectedReturn <= filters.maxReturn);
    if (filters.category.length > 0) filtered = filtered.filter(p => filters.category.includes(p.category));
    if (filters.liquidity !== 'all') filtered = filtered.filter(p => p.liquidity === filters.liquidity);
    if (filters.timeHorizon !== 'all') filtered = filtered.filter(p => p.timeHorizon === filters.timeHorizon);
    filtered = filtered.filter(p => p.minInvestment <= filters.userBudget);
    return filtered;
  }, [products, filters]);
  
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>Financial Products</h1>
        <p>Explore our curated selection of financial instruments</p>
        {presetCategory && (
          <div style={{ 
            background: '#e3f2fd', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            display: 'inline-block',
            marginTop: '12px'
          }}>
            Showing {presetCategory} products
          </div>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        <FilterPanel filters={filters} onFilterChange={setFilters} productCount={filteredProducts.length} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductListing;
