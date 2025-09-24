import React, { useState } from 'react';
import './DetectPage.css';

function DetectPage({ navigateTo }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setIsAnalyzing(false);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="detect-page">
      <div className="container">
        <div className="detect-header">
          <h1 className="detect-title gradient-text">AI Crop Analysis</h1>
          <p className="detect-subtitle">Upload an image of your crop to get instant AI-powered diagnosis</p>
        </div>

        <div className="detect-container">
          {!uploadedImage ? (
            <div className="upload-area">
              <div className="upload-icon">📷</div>
              <h3 className="upload-title">Upload Crop Image</h3>
              <p className="upload-description">Choose an image of your crop leaf for instant AI analysis</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="file-input" 
                id="imageUpload" 
              />
              <label htmlFor="imageUpload" className="btn btn-secondary upload-btn">
                Choose Image
              </label>
            </div>
          ) : (
            <div className="image-analysis">
              <div className="uploaded-image-container">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded crop" 
                  className="uploaded-image"
                />
                <button 
                  onClick={removeImage}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
              
              {!isAnalyzing && (
                <button 
                  onClick={analyzeImage}
                  className="btn btn-primary analyze-btn"
                >
                  Analyze Image
                </button>
              )}

              {isAnalyzing && (
                <div className="analysis-status">
                  <div className="analysis-content">
                    <div className="loading-spinner"></div>
                    <span className="analysis-text">Analyzing your crop image with AI...</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill analyzing"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetectPage;