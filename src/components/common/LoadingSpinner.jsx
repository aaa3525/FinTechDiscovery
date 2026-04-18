import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '50px', height: '50px', border: '4px solid #e0e0e0', borderTopColor: '#0066cc', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p>Loading financial products...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;