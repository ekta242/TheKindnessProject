import React from 'react';

function BridgeGraphic({ challengePoints }) {
  return (
    <div className="section">
      <h2>Your Bridge Progress</h2>
      <div style={{
        fontSize: '3em',
        textAlign: 'center',
        padding: '24px',
        background: '#eef',
        borderRadius: '14px'
      }}>
        {'🌉'.repeat(challengePoints)}
      </div>
      <p>Each challenge point you earn builds the bridge higher between two cities!</p>
    </div>
  );
}

export default BridgeGraphic;
