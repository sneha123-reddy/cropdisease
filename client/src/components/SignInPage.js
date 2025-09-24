import React, { useState } from 'react';
import './SignInPage.css';

function SignInPage({ navigateTo }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in attempt:', formData);
    // Handle sign in logic here
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <div className="signin-icon">
              <span>👤</span>
            </div>
            <h1 className="signin-title gradient-text">Welcome Back</h1>
            <p className="signin-subtitle">Sign in to access your crop analysis dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="checkbox-text">Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary signin-btn">
              Sign In
            </button>
          </form>

          <div className="signin-footer">
            <p className="footer-text">
              Don't have an account?{' '}
              <button 
                onClick={() => navigateTo('signup')} 
                className="link-btn"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;