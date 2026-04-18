import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '12px' }}>
      <h1 style={{ fontSize: '4rem', color: '#0066cc' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: '#6c757d', marginBottom: '24px' }}>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ background: '#0066cc', color: 'white', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', display: 'inline-block' }}>Return Home</Link>
    </div>
  );
};

export default NotFound;