import React, { useState, useEffect } from 'react';
import { checkSwarmHealth } from '../../hooks/useRiverbraidStatus.mjs';

const FrequencyMirror = () => {
  const [health, setHealth] = useState({ status: 'INITIALIZING' });

  useEffect(() => {
    const pulse = () => {
      const current = checkSwarmHealth();
      setHealth(current);
    };
    
    pulse();
    const interval = setInterval(pulse, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (health.status) {
      case 'NOMINAL': return '#FFD700'; // Gold
      case 'DECOUPLED': return '#FFA500'; // Amber Pulse
      case 'OFFLINE': return '#FF4500'; // Red
      default: return '#555'; // Grey
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      fontFamily: 'monospace'
    }}>
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: getStatusColor(),
        boxShadow: health.status === 'NOMINAL' ? '0 0 10px #FFD700' : 'none',
        animation: health.status === 'DECOUPLED' ? 'pulse 1.5s infinite' : 'none'
      }} />
      <span>{health.status} | {health.anchor || '000000'}</span>
    </div>
  );
};

export default FrequencyMirror;
