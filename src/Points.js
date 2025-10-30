import React from 'react';

function Points({ points, challengePoints }) {
  return (
    <div className="section">
      <h2>Your Points</h2>
      <div>
        <span style={{fontSize:'2em',color:'#384'}}>Normal Points:</span> <b>{points} ⭐</b>
      </div>
      <div>
        <span style={{fontSize:'2em',color:'#559'}}>Challenge Points:</span> <b>{challengePoints} 🌉</b>
      </div>
      <p>Earn normal points by marking tasks done.<br />Earn challenge points by submitting verified reflections and completing bonus challenges!</p>
    </div>
  );
}

export default Points;
