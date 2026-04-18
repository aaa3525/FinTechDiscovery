import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { UserProfileProvider } from './contexts/UserProfileContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import Portfolio from './pages/Portfolio';
import Recommendations from './pages/Recommendations';
import NotFound from './pages/NotFound';
import { fetchProducts } from './utils/api';
import { transformToFinancialProducts } from './utils/dataTransform';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const apiProducts = await fetchProducts();
      const transformedProducts = transformToFinancialProducts(apiProducts);
      setProducts(transformedProducts);
    } catch (err) {
      setError('Failed to load products. Please refresh the page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

  return (
    <ThemeProvider>
      <UserProfileProvider>
        <PortfolioProvider>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home products={products} />} />
              <Route path="/products" element={<ProductListing products={products} />} />
              <Route path="/product/:id" element={<ProductDetail products={products} />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/recommendations" element={<Recommendations products={products} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </PortfolioProvider>
      </UserProfileProvider>
    </ThemeProvider>
  );
}

export default App;
