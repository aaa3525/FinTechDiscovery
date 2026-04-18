import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { portfolio } = usePortfolio();
  const { darkMode, toggleTheme } = useTheme();
  
  const isActive = (path) => location.pathname === path;
  const portfolioCount = portfolio.items.length;
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">FinTech</span>
          <span className="logo-sub">Discovery</span>
        </Link>
        
        <ul className="nav-menu">
          <li><Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link></li>
          <li><Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>Products</Link></li>
          <li><Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>Profile</Link></li>
          <li><Link to="/recommendations" className={`nav-link ${isActive('/recommendations') ? 'active' : ''}`}>Recommendations</Link></li>
          <li>
            <Link to="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}>
              Portfolio
              {portfolioCount > 0 && <span className="portfolio-count">{portfolioCount}</span>}
            </Link>
          </li>
          <li>
            <button onClick={toggleTheme} className="theme-toggle">
              <span className="theme-toggle-icon">{darkMode ? '☀️' : '🌙'}</span>
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;