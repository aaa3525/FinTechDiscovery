import React from 'react';
import { RISK_COLORS } from '../../utils/constants';

const PortfolioSummary = ({ portfolio }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRiskWarning = () => {
    if (portfolio.riskDistribution.high > 50) {
      return { message: "⚠️ High concentration in high-risk assets", color: "#ef4444" };
    }
    if (portfolio.diversificationScore < 30) {
      return { message: "⚠️ Portfolio needs more diversification", color: "#f59e0b" };
    }
    if (portfolio.diversificationScore > 70) {
      return { message: "✓ Well-diversified portfolio", color: "#10b981" };
    }
    return { message: "✓ Balanced risk profile", color: "#10b981" };
  };

  const warning = getRiskWarning();

  return (
    <div className="portfolio-summary">
      <h3>Portfolio Summary</h3>
      
      <div className="summary-stats">
        <div className="stat-card">
          <span className="stat-label">Total Invested</span>
          <span className="stat-value">{formatCurrency(portfolio.totalInvested)}</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Weighted Return</span>
          <span className="stat-value return">{portfolio.weightedReturn}%</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Diversification Score</span>
          <span className="stat-value">{portfolio.diversificationScore}/100</span>
        </div>
      </div>

      <div className="risk-distribution">
        <h4>Risk Distribution</h4>
        <div className="risk-bars">
          <div className="risk-bar-item">
            <span>Low Risk</span>
            <div className="bar-container">
              <div 
                className="bar low" 
                style={{ width: `${portfolio.riskDistribution.low}%`, backgroundColor: RISK_COLORS.low }}
              />
            </div>
            <span>{portfolio.riskDistribution.low}%</span>
          </div>
          <div className="risk-bar-item">
            <span>Medium Risk</span>
            <div className="bar-container">
              <div 
                className="bar medium" 
                style={{ width: `${portfolio.riskDistribution.medium}%`, backgroundColor: RISK_COLORS.medium }}
              />
            </div>
            <span>{portfolio.riskDistribution.medium}%</span>
          </div>
          <div className="risk-bar-item">
            <span>High Risk</span>
            <div className="bar-container">
              <div 
                className="bar high" 
                style={{ width: `${portfolio.riskDistribution.high}%`, backgroundColor: RISK_COLORS.high }}
              />
            </div>
            <span>{portfolio.riskDistribution.high}%</span>
          </div>
        </div>
      </div>

      <div className="warning-message" style={{ color: warning.color }}>
        {warning.message}
      </div>
    </div>
  );
};

export default PortfolioSummary;