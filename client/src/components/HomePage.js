import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage({ navigateTo }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const pesticides = [
    {
      name: "Organic Neem Oil",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      description: "Natural pest control for aphids and mites",
      effectiveness: 92
    },
    {
      name: "Copper Fungicide",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
      description: "Prevents bacterial and fungal diseases",
      effectiveness: 88
    },
    {
      name: "Bacillus Thuringiensis",
      image: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=300&h=200&fit=crop",
      description: "Biological control for caterpillars",
      effectiveness: 95
    }
  ];

  const testimonials = [
    { name: "Rahul Sharma", role: "Rice Farmer", text: "Saved my entire harvest! Detected blast disease early.", rating: 5 },
    { name: "Priya Patel", role: "Cotton Farmer", text: "Amazing accuracy in pest identification. Highly recommend!", rating: 5 },
    { name: "Kumar Singh", role: "Vegetable Farmer", text: "User-friendly and incredibly fast diagnosis.", rating: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title gradient-text">AI Crop Protection</h1>
            <p className="hero-subtitle">
              Revolutionize your farming with cutting-edge AI technology that detects crop diseases and pests instantly
            </p>
            <button 
              className="btn btn-primary hero-btn"
              onClick={() => navigateTo('detect')}
            >
              Explore Now →
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful AI Features</h2>
            <p className="section-subtitle">Experience the future of agriculture with our interactive tools</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon red">
                <span>🔍</span>
              </div>
              <h3 className="feature-title">Disease Scanner</h3>
              <p className="feature-description">
                Advanced neural networks identify 50+ crop diseases with 99.2% accuracy in under 3 seconds.
              </p>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Detection Speed</span>
                  <span>99.2%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill red" style={{width: '99.2%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon blue">
                <span>🐛</span>
              </div>
              <h3 className="feature-title">Pest Analyzer</h3>
              <p className="feature-description">
                Real-time pest identification with treatment recommendations tailored to your crop type.
              </p>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Pest Database</span>
                  <span>300+ Species</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill blue" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon green">
                <span>⚡</span>
              </div>
              <h3 className="feature-title">Smart Treatment</h3>
              <p className="feature-description">
                AI-powered treatment plans with dosage calculations and application timing for maximum effectiveness.
              </p>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Success Rate</span>
                  <span>96.8%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill green" style={{width: '96.8%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pesticides & Testimonials */}
      <section className="pesticides-section section">
        <div className="container">
          {/* Pesticides */}
          <div className="pesticides-container">
            <div className="section-header">
              <h2 className="section-title">Recommended Pesticides</h2>
              <p className="section-subtitle">AI-curated solutions for optimal crop protection</p>
            </div>
            
            <div className="pesticides-grid">
              {pesticides.map((pesticide, index) => (
                <div key={index} className="pesticide-card">
                  <div className="pesticide-image-container">
                    <img 
                      src={pesticide.image} 
                      alt={pesticide.name}
                      className="pesticide-image"
                    />
                    <div className="effectiveness-badge">
                      {pesticide.effectiveness}% Effective
                    </div>
                  </div>
                  <div className="pesticide-content">
                    <h3 className="pesticide-name">{pesticide.name}</h3>
                    <p className="pesticide-description">{pesticide.description}</p>
                    <div className="pesticide-footer">
                      <div className="rating">
                        {"⭐".repeat(5)}
                      </div>
                      <button className="learn-more-btn">Learn More →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="testimonials-container">
            <h2 className="section-title">Farmer Success Stories</h2>
            <div className="testimonial-carousel">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {"⭐".repeat(testimonials[currentTestimonial].rating)}
                </div>
                <blockquote className="testimonial-text">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-name">{testimonials[currentTestimonial].name}</div>
                  <div className="author-role">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
              
              <div className="testimonial-controls">
                <button 
                  className="play-pause-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <div className="testimonial-dots">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;