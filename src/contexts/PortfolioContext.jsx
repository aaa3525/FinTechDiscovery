import React, { createContext, useState, useContext, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('portfolio');
    return saved ? JSON.parse(saved) : { items: [], totalInvested: 0, weightedReturn: 0, riskDistribution: { low: 0, medium: 0, high: 0 }, categoryDistribution: {} };
  });

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const calculateStats = (items) => {
    const total = items.reduce((sum, item) => sum + item.allocatedAmount, 0);
    if (total === 0) return { totalInvested: 0, weightedReturn: 0, riskDistribution: { low: 0, medium: 0, high: 0 }, categoryDistribution: {} };
    
    const weightedReturn = items.reduce((sum, item) => sum + ((item.allocatedAmount / total) * item.product.expectedReturn), 0);
    const riskDist = { low: 0, medium: 0, high: 0 };
    items.forEach(item => { riskDist[item.product.riskLevel] += item.allocatedAmount; });
    Object.keys(riskDist).forEach(key => { riskDist[key] = (riskDist[key] / total) * 100; });
    
    const categoryDist = {};
    items.forEach(item => { categoryDist[item.product.category] = (categoryDist[item.product.category] || 0) + item.allocatedAmount; });
    Object.keys(categoryDist).forEach(key => { categoryDist[key] = (categoryDist[key] / total) * 100; });
    
    return { totalInvested: total, weightedReturn: parseFloat(weightedReturn.toFixed(2)), riskDistribution: riskDist, categoryDistribution: categoryDist };
  };

  const addToPortfolio = (product, allocatedAmount) => {
    setPortfolio(prev => {
      const existingItem = prev.items.find(item => item.product.id === product.id);
      const newItems = existingItem ? prev.items.map(item => item.product.id === product.id ? { ...item, allocatedAmount: item.allocatedAmount + allocatedAmount } : item) : [...prev.items, { product, allocatedAmount }];
      const stats = calculateStats(newItems);
      return { items: newItems, ...stats };
    });
  };

  const removeFromPortfolio = (productId) => {
    setPortfolio(prev => {
      const newItems = prev.items.filter(item => item.product.id !== productId);
      const stats = calculateStats(newItems);
      return { items: newItems, ...stats };
    });
  };

  const updateAllocation = (productId, newAmount) => {
    if (newAmount <= 0) { removeFromPortfolio(productId); return; }
    setPortfolio(prev => {
      const newItems = prev.items.map(item => item.product.id === productId ? { ...item, allocatedAmount: newAmount } : item);
      const stats = calculateStats(newItems);
      return { items: newItems, ...stats };
    });
  };

  const isInPortfolio = (productId) => portfolio.items.some(item => item.product.id === productId);

  return <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio, updateAllocation, isInPortfolio }}>{children}</PortfolioContext.Provider>;
};