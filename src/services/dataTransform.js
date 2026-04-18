import { RISK_LEVELS, LIQUIDITY_TYPES, TIME_HORIZONS, CATEGORIES } from '../utils/constants';
import { getReturnForRisk, assignLiquidity, assignTimeHorizon } from '../utils/financialLogic';

// Systematic category mapping based on API category
const categoryMapping = {
  'electronics': CATEGORIES.INVESTMENT,
  'jewelery': CATEGORIES.SAVINGS,
  "men's clothing": CATEGORIES.INSURANCE,
  "women's clothing": CATEGORIES.CRYPTO
};

// Deterministic risk mapping based on category
const riskMapping = {
  [CATEGORIES.SAVINGS]: RISK_LEVELS.LOW,
  [CATEGORIES.INVESTMENT]: RISK_LEVELS.MEDIUM,
  [CATEGORIES.INSURANCE]: RISK_LEVELS.LOW,
  [CATEGORIES.CRYPTO]: RISK_LEVELS.HIGH
};

// Generate description based on product attributes
function generateDescription(product, category, riskLevel) {
  const baseDesc = product.description.substring(0, 150);
  const riskText = riskLevel === RISK_LEVELS.LOW ? 'low-risk' : 
                   riskLevel === RISK_LEVELS.MEDIUM ? 'moderate-risk' : 'high-risk';
  
  return `${baseDesc} This ${category} product offers ${riskText} exposure with ` +
         `suitable for ${riskLevel === RISK_LEVELS.LOW ? 'conservative' : 
                        riskLevel === RISK_LEVELS.MEDIUM ? 'balanced' : 'growth-oriented'} investors.`;
}

export function transformToFinancialProduct(apiProduct) {
  const category = categoryMapping[apiProduct.category] || CATEGORIES.INVESTMENT;
  const riskLevel = riskMapping[category];
  
  // Scale price to realistic minimum investment (PKR)
  const minInvestment = Math.max(1000, Math.round(apiProduct.price * 500));
  
  // Ensure return is consistent with risk level
  const expectedReturn = getReturnForRisk(riskLevel);
  const liquidity = assignLiquidity(category, riskLevel);
  const timeHorizon = assignTimeHorizon(riskLevel);
  
  return {
    id: apiProduct.id,
    name: apiProduct.title.length > 50 ? apiProduct.title.substring(0, 50) + '...' : apiProduct.title,
    category: category,
    description: generateDescription(apiProduct, category, riskLevel),
    expectedReturn: expectedReturn,
    riskLevel: riskLevel,
    liquidity: liquidity,
    timeHorizon: timeHorizon,
    minInvestment: minInvestment,
    image: apiProduct.image,
    originalPrice: apiProduct.price
  };
}

// Ensure consistent transformation (same input -> same output)
const transformationCache = new Map();

export function transformProducts(apiProducts) {
  return apiProducts.map(product => {
    if (transformationCache.has(product.id)) {
      return transformationCache.get(product.id);
    }
    const transformed = transformToFinancialProduct(product);
    transformationCache.set(product.id, transformed);
    return transformed;
  });
}