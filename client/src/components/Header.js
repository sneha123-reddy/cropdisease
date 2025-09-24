import React from 'react';
import './Header.css';

function Header({ currentPage, navigateTo }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigateTo('home')}>
          <div className="logo-icon">
            <span className="leaf-icon">🌿</span>
          </div>
          <span className="logo-text">CropGuard</span>
        </div>
        
        <nav className="nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'detect' ? 'active' : ''}`}
            onClick={() => navigateTo('detect')}
          >
            Detect
          </button>
          <button 
            className="nav-link"
            onClick={() => navigateTo('signin')}
          >
            Sign In
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('signup')}
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;