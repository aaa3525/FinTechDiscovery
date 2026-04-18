const categoryMapping = {
  'electronics': 'investment',
  'jewelery': 'savings',
  "men's clothing": 'insurance',
  "women's clothing": 'crypto'
};

const riskMapping = {
  'investment': 'medium',
  'savings': 'low',
  'insurance': 'low',
  'crypto': 'high'
};

export const assignLiquidity = (category, riskLevel) => {
  if (category === 'savings') return 'easy';
  if (category === 'insurance') return 'locked';
  if (category === 'crypto') return 'easy';
  if (riskLevel === 'low') return 'moderate';
  if (riskLevel === 'medium') return 'moderate';
  return 'moderate';
};

const assignTimeHorizon = (riskLevel, liquidity, category) => {
  if (liquidity === 'locked') return 'long';
  if (category === 'crypto') return 'long';
  if (riskLevel === 'low') return 'short';
  if (riskLevel === 'medium') return 'medium';
  return 'long';
};

const getReturnForRisk = (riskLevel) => {
  const returns = {
    'low': 3 + Math.random() * 4,
    'medium': 7 + Math.random() * 5,
    'high': 12 + Math.random() * 15
  };
  return parseFloat(returns[riskLevel].toFixed(2));
};

export const transformToFinancialProducts = (apiProducts) => {
  return apiProducts.map(product => {
    const category = categoryMapping[product.category] || 'investment';
    const riskLevel = riskMapping[category];
    const liquidity = assignLiquidity(category, riskLevel);
    const timeHorizon = assignTimeHorizon(riskLevel, liquidity, category); // Pass all params
    
    return {
      id: product.id,
      name: product.title.substring(0, 50),
      category: category,
      description: product.description.substring(0, 200),
      minInvestment: Math.round(product.price * 1000),
      riskLevel: riskLevel,
      expectedReturn: getReturnForRisk(riskLevel),
      liquidity: liquidity,
      timeHorizon: timeHorizon,  // Now consistent!
      image: product.image || 'https://via.placeholder.com/200',
      originalPrice: product.price
    };
  });
};