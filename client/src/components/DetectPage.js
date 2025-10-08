import React, { useState, useRef } from 'react';
import './DetectPage.css';

function DetectPage({ navigateTo }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle file upload from device
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
      setPrediction(null);
    }
  };

  // Open webcam for capture
  const openCamera = async () => {
    setIsCameraOpen(true);
    setPrediction(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Camera access denied', err);
      setIsCameraOpen(false);
    }
  };

  // Capture photo from webcam
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL('image/jpeg');
    setUploadedImage(dataURL);

    // Convert to File object for backend
    fetch(dataURL)
      .then(res => res.blob())
      .then(blob => setImageFile(new File([blob], 'capture.jpg', { type: 'image/jpeg' })));

    // Stop webcam
    video.srcObject.getTracks().forEach(track => track.stop());
    setIsCameraOpen(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    setIsAnalyzing(false);
    setPrediction(null);
    setIsCameraOpen(false);
  };

  const analyzeImage = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction || 'No prediction received');
    } catch (err) {
      console.error('Error predicting image:', err);
      setPrediction('Error connecting to backend');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="detect-page">
      <div className="container">
        <div className="detect-header">
          <h1 className="detect-title gradient-text">AI Crop Analysis</h1>
          <p className="detect-subtitle">
            Upload or capture an image of your crop to get instant AI-powered diagnosis
          </p>
        </div>

        <div className="detect-container">
          {!uploadedImage && !isCameraOpen && (
            <div className="upload-area">
              <div className="upload-icon">📷</div>
              <h3 className="upload-title">Upload or Capture Crop Image</h3>
              <p className="upload-description">
                Choose an image from your device or take a photo directly
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  id="imageUpload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="imageUpload" className="btn btn-secondary upload-btn">
                  Choose Image
                </label>

                <button className="btn btn-primary upload-btn" onClick={openCamera}>
                  Open Camera
                </button>
              </div>
            </div>
          )}

          {isCameraOpen && (
            <div style={{ textAlign: 'center' }}>
              <video ref={videoRef} autoPlay style={{ width: '400px', borderRadius: '10px' }} />
              <div style={{ marginTop: '10px' }}>
                <button className="btn btn-primary" onClick={capturePhoto}>Capture Photo</button>
                <button className="btn btn-secondary" onClick={removeImage} style={{ marginLeft: '10px' }}>Cancel</button>
              </div>
            </div>
          )}

          {uploadedImage && (
            <div className="image-analysis">
              <div className="uploaded-image-container">
                <img src={uploadedImage} alt="Uploaded crop" className="uploaded-image" />
                <button onClick={removeImage} className="remove-btn">✕</button>
              </div>

              {!isAnalyzing && (
                <button onClick={analyzeImage} className="btn btn-primary analyze-btn">
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

              {prediction && (
                <div className="prediction-result">
                  <strong>🧠 Predicted Disease: </strong> {prediction}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hidden canvas for capturing photo */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default DetectPage;
