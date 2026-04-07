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
    const interval = setInterval(pulse, 5000); 
    return () => clearInterval(interval);
  }, []);

  const theme = {
    NOMINAL: { color: '#FFD700', label: 'NOMINAL', glow: '0 0 12px #FFD700' },
    DECOUPLED: { color: '#FFA500', label: 'DECOUPLED', glow: 'none' },
    OFFLINE: { color: '#FF4500', label: 'OFFLINE', glow: 'none' },
    INITIALIZING: { color: '#555', label: 'SYNCING', glow: 'none' }
  };

  const currentTheme = theme[health.status] || theme.INITIALIZING;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid #333',
      borderRadius: '4px',
      padding: '4px 12px',
      gap: '12px',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '12px',
      letterSpacing: '1px'
    }}>
      <style>
        {`
          @keyframes amberPulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: currentTheme.color,
        boxShadow: currentTheme.glow,
        animation: health.status === 'DECOUPLED' ? 'amberPulse 2s infinite ease-in-out' : 'none'
      }} />
      <span style={{ color: '#eee' }}>
        {currentTheme.label} <span style={{ color: '#666' }}>[ {health.anchor || '------'} ]</span>
      </span>
    </div>
  );
};

export default FrequencyMirror;
