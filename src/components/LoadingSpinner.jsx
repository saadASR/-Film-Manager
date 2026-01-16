import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="spinner"></div>
      <p style={{ marginTop: '1rem', color: '#6b7280' }}>Chargement...</p>
    </div>
  );
};

export default LoadingSpinner;
