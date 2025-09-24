import React, { useState } from 'react';
import './SignUpPage.css';

function SignUpPage({ navigateTo }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log('Sign up attempt:', formData);
    // Handle sign up logic here
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="signup-icon">
              <span>🌱</span>
            </div>
            <h1 className="signup-title gradient-text">Join CropGuard</h1>
            <p className="signup-subtitle">Create your account and start protecting your crops</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div className="terms-container">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I agree to the{' '}
                  <a href="#" className="terms-link">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="terms-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary signup-btn">
              Create Account
            </button>
          </form>

          <div className="signup-footer">
            <p className="footer-text">
              Already have an account?{' '}
              <button 
                onClick={() => navigateTo('signin')} 
                className="link-btn"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;