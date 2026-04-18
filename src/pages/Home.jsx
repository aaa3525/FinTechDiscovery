import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryCards from '../components/home/CategoryCards';
import QuickStats from '../components/home/QuickStats';

const Home = ({ products }) => {
  const getFeaturedProducts = () => {
    const categories = ['savings', 'investment', 'insurance', 'crypto'];
    const featured = [];
    categories.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      if (categoryProducts.length > 0) {
        const bestInCategory = categoryProducts.reduce((best, current) => current.expectedReturn > best.expectedReturn ? current : best);
        featured.push(bestInCategory);
      }
    });
    return featured.slice(0, 5);
  };

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', borderRadius: '12px', padding: '60px 40px', marginBottom: '40px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'white' }}>Discover Your Perfect Financial Products</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '24px', opacity: 0.9 }}>Smart investment decisions start with understanding your options. Find products based on your risk tolerance, goals, and budget.</p>
        <Link to="/profile" style={{ background: 'white', color: '#0066cc', textDecoration: 'none', padding: '12px 32px', borderRadius: '50px', fontWeight: 'bold', display: 'inline-block' }}>Create Your Profile →</Link>
      </div>
      
      <QuickStats products={products} />
      <CategoryCards />
      
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Featured Products</h2>
        <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '24px' }}>Top picks across different categories</p>
        <FeaturedProducts products={getFeaturedProducts()} />
      </div>
      
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {[
            { step: '1', title: 'Create Profile', desc: 'Tell us about your risk tolerance and goals' },
            { step: '2', title: 'Get Recommendations', desc: 'Receive personalized product suggestions' },
            { step: '3', title: 'Build Portfolio', desc: 'Select products and diversify your investments' },
            { step: '4', title: 'Track & Optimize', desc: 'Monitor performance and adjust as needed' }
          ].map(item => (
            <div key={item.step}>
              <div style={{ width: '50px', height: '50px', background: '#0066cc', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 16px' }}>{item.step}</div>
              <h3>{item.title}</h3>
              <p style={{ color: '#6c757d' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
