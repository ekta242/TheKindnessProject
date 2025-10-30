import React, { useState } from 'react';

function Challenge({ onComplete, notify }) {
  const [done, setDone] = useState(false);

  const handleComplete = () => {
    setDone(true);
    onComplete(true);
    notify('Challenge completed! +1 point');
  };

  return (
    <div className="section challenge-section">
      <h2>Synchronized Solace: Empathy Network Challenge</h2>
      <p>
        In the sprawling arcology of Xylos, residents live connected but often feel isolated.
        Your challenge is to bridge the gap between two vastly different social strata—a sky-dweller and a sub-level inhabitant—
        through a simple shared act of kindness that encourages real-world interaction.
      </p>

      <p><strong>Challenge:</strong> Send a thoughtful message or do a small act that promotes connection across social boundaries.</p>

      {/* Placeholder for graphic */}
      <div style={{ margin: '20px 0', height: '150px', backgroundColor: '#eef', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>
        <p style={{ color: '#446', fontWeight: 'bold' }}>[Split city with glowing connection graphic here]</p>
      </div>

      <button onClick={handleComplete} disabled={done}>
        {done ? 'Challenge Completed!' : 'Mark Challenge as Done'}
      </button>
    </div>
  );
}

export default Challenge;
