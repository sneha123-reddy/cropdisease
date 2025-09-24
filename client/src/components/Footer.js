import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span className="leaf-icon">🌿</span>
              </div>
              <span className="footer-logo-text">CropGuard AI</span>
            </div>
            <p className="footer-description">
              Revolutionizing agriculture with AI-powered crop disease detection and pest management solutions.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Products</h3>
            <ul className="footer-links">
              <li><a href="#">Disease Detection</a></li>
              <li><a href="#">Pest Analysis</a></li>
              <li><a href="#">Crop Monitoring</a></li>
              <li><a href="#">Expert Consultation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              <div className="social-link">
                <span>📧</span>
              </div>
              <div className="social-link">
                <span>📱</span>
              </div>
              <div className="social-link">
                <span>🐦</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 CropGuard AI. All rights reserved. | Protecting crops, securing futures.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;