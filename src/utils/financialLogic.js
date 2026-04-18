// Risk to return mapping
export const getReturnForRisk = (riskLevel) => {
  const returns = {
    'low': 3 + Math.random() * 4,     // 3-7%
    'medium': 7 + Math.random() * 5,   // 7-12%
    'high': 12 + Math.random() * 15    // 12-27%
  };
  return parseFloat(returns[riskLevel].toFixed(2));
};

// Generate decision insights for a product
export const generateDecisionInsight = (product) => {
  const insights = [];
  
  if (product.riskLevel === 'low') {
    insights.push("✓ Suitable for conservative investors prioritizing capital preservation");
    insights.push("✓ Lower volatility with steady, predictable returns");
  } else if (product.riskLevel === 'medium') {
    insights.push("⚖ Balanced risk-return profile for moderate investors");
    insights.push("⚖ Potential for growth with managed volatility");
  } else if (product.riskLevel === 'high') {
    insights.push("📈 Best for aggressive investors comfortable with significant volatility");
    insights.push("📈 Higher growth potential with increased market risk");
  }
  
  if (product.liquidity === 'easy') {
    insights.push("💰 High liquidity - funds accessible anytime without penalty");
  } else if (product.liquidity === 'moderate') {
    insights.push("⏱ Moderate liquidity - some restrictions on withdrawals may apply");
  } else if (product.liquidity === 'locked') {
    insights.push("🔒 Locked liquidity - early withdrawal may incur significant penalties");
  }
  
  if (product.timeHorizon === 'short') {
    insights.push("📅 Optimal for short-term goals (1-2 years)");
  } else if (product.timeHorizon === 'medium') {
    insights.push("📅 Best for medium-term objectives (3-5 years)");
  } else if (product.timeHorizon === 'long') {
    insights.push("📅 Ideal for long-term wealth building (5+ years)");
  }
  
  if (product.category === 'savings') {
    insights.push("🏦 Secure option with guaranteed returns");
  } else if (product.category === 'investment') {
    insights.push("📊 Diversified exposure to market opportunities");
  } else if (product.category === 'insurance') {
    insights.push("🛡 Combines protection with investment benefits");
  } else if (product.category === 'crypto') {
    insights.push("₿ High-risk digital asset with potential for substantial returns");
  }
  
  return insights;
};

// Calculate projected returns
export const calculateProjectedReturns = (principal, annualReturn, years) => {
  const futureValue = principal * Math.pow(1 + annualReturn / 100, years);
  const totalReturn = futureValue - principal;
  return {
    futureValue: futureValue.toFixed(2),
    totalReturn: totalReturn.toFixed(2),
    percentageReturn: ((futureValue / principal - 1) * 100).toFixed(2)
  };
};

// Get risk color
export const getRiskColor = (riskLevel) => {
  const colors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336'
  };
  return colors[riskLevel] || '#757575';
};

// Calculate weighted return for portfolio
export const calculateWeightedReturn = (items, totalInvested) => {
  if (totalInvested === 0) return 0;
  return items.reduce((sum, item) => {
    return sum + ((item.allocatedAmount / totalInvested) * item.product.expectedReturn);
  }, 0);
};

// Calculate risk distribution
export const calculateRiskDistribution = (items, totalInvested) => {
  const distribution = { low: 0, medium: 0, high: 0 };
  if (totalInvested === 0) return distribution;
  
  items.forEach(item => {
    distribution[item.product.riskLevel] += item.allocatedAmount;
  });
  
  Object.keys(distribution).forEach(key => {
    distribution[key] = (distribution[key] / totalInvested) * 100;
  });
  
  return distribution;
};

// Calculate category distribution
export const calculateCategoryDistribution = (items, totalInvested) => {
  const distribution = {};
  if (totalInvested === 0) return distribution;
  
  items.forEach(item => {
    const category = item.product.category;
    distribution[category] = (distribution[category] || 0) + item.allocatedAmount;
  });
  
  Object.keys(distribution).forEach(key => {
    distribution[key] = (distribution[key] / totalInvested) * 100;
  });
  
  return distribution;
};

// Calculate diversification score
export const calculateDiversificationScore = (categoryDistribution, riskDistribution) => {
  if (Object.keys(categoryDistribution).length === 0) return 0;
  
  const categoriesScore = (Object.keys(categoryDistribution).length / 4) * 50;
  const riskBalance = 100 - Math.abs(riskDistribution.high - 33) / 33 * 100;
  const riskScore = (riskBalance / 100) * 50;
  
  return Math.min(100, Math.max(0, categoriesScore + riskScore));
};

// Get recommendations based on user profile
export const getRecommendations = (products, profile) => {
  if (!profile) return [];
  
  const riskMapping = {
    'conservative': ['low'],
    'moderate': ['low', 'medium'],
    'aggressive': ['low', 'medium', 'high']
  };
  
  const horizonMapping = {
    'short': ['short'],
    'medium': ['short', 'medium'],
    'long': ['short', 'medium', 'long']
  };
  
  const liquidityMapping = {
    'easy': ['easy'],
    'moderate': ['easy', 'moderate'],
    'locked': ['easy', 'moderate', 'locked']
  };
  
  const allowedRisk = riskMapping[profile.riskTolerance] || ['low'];
  const allowedHorizon = horizonMapping[profile.investmentHorizon] || ['short'];
  const allowedLiquidity = liquidityMapping[profile.liquidityPreference] || ['easy'];
  
  let recommended = products.filter(p => 
    allowedRisk.includes(p.riskLevel) &&
    allowedHorizon.includes(p.timeHorizon) &&
    allowedLiquidity.includes(p.liquidity) &&
    p.minInvestment <= (profile.monthlyCapacity || 100000)
  );
  
  if (profile.riskTolerance === 'conservative') {
    recommended = recommended.sort((a, b) => a.riskLevel === 'low' ? -1 : 1);
  } else if (profile.riskTolerance === 'aggressive') {
    recommended = recommended.sort((a, b) => b.expectedReturn - a.expectedReturn);
  } else {
    recommended = recommended.sort((a, b) => 
      (b.expectedReturn / (b.riskLevel === 'low' ? 1 : 2)) -
      (a.expectedReturn / (a.riskLevel === 'low' ? 1 : 2))
    );
  }
  
  return recommended.slice(0, 10);
};