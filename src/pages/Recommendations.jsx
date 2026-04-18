import React from 'react';
import { Link } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import ProductCard from '../components/products/ProductCard';

const Recommendations = ({ products }) => {
  const { profile, isProfileComplete, getRecommendations } = useUserProfile();
  
  if (!isProfileComplete()) {
    return <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}><h2>Complete Your Profile First</h2><p>Get personalized recommendations by completing your financial profile.</p><Link to="/profile" className="btn-primary" style={{ background: '#0066cc', color: 'white', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', display: 'inline-block', marginTop: '16px' }}>Complete Profile</Link></div>;
  }
  
  const recommendations = getRecommendations(products);
  
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>Personalized Recommendations</h1>
        <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginTop: '16px', display: 'inline-block' }}>
          <p>Based on: <strong>{profile.riskTolerance}</strong> risk · <strong>{profile.investmentHorizon}</strong> term · PKR {profile.monthlyCapacity.toLocaleString()}/month</p>
        </div>
      </div>
      
      {recommendations.length === 0 ? (<div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}><p>No products match your profile criteria.</p><p>Try adjusting your preferences or increasing your budget.</p><Link to="/profile" style={{ color: '#0066cc', marginTop: '16px', display: 'inline-block' }}>Edit Profile →</Link></div>) : (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>{recommendations.map(product => <ProductCard key={product.id} product={product} />)}</div>)}
      
      <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', marginTop: '40px' }}>
        <h3>About These Recommendations</h3>
        <p style={{ color: '#6c757d', marginTop: '8px' }}>These products are dynamically selected based on your risk tolerance, investment horizon, liquidity needs, and monthly capacity. The recommendations change automatically when you update your profile.</p>
        <p style={{ color: '#6c757d', marginTop: '8px', fontSize: '0.9rem' }}><strong>Note:</strong> Higher expected returns typically come with higher risk. Always consider your financial goals before investing.</p>
      </div>
    </div>
  );
};

export default Recommendations;