export const validateProfileForm = (formData) => {
  const errors = {};
  
  if (!formData.riskTolerance) {
    errors.riskTolerance = 'Risk tolerance is required';
  }
  
  if (!formData.investmentHorizon) {
    errors.investmentHorizon = 'Investment horizon is required';
  }
  
  if (!formData.monthlyCapacity || formData.monthlyCapacity < 1000) {
    errors.monthlyCapacity = 'Monthly investment capacity must be at least PKR 1,000';
  }
  
  if (!formData.liquidityPreference) {
    errors.liquidityPreference = 'Liquidity preference is required';
  }
  
  if (!formData.investmentGoal) {
    errors.investmentGoal = 'Investment goal is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAllocation = (amount, productMinInvestment, monthlyCapacity) => {
  const errors = [];
  
  if (amount < productMinInvestment) {
    errors.push(`Minimum investment for this product is PKR ${productMinInvestment.toLocaleString()}`);
  }
  
  if (amount > monthlyCapacity * 0.5) {
    errors.push(`Cannot allocate more than 50% of monthly capacity (PKR ${(monthlyCapacity * 0.5).toLocaleString()}) to a single product`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};