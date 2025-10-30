import React from 'react';

function Notification({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Notification;
