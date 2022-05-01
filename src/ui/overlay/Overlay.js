import React from 'react';
import './Overlay.css';

export default function LetterBox(props) {
  return (
    <div className="overlay">
        <div className="modal">{props.overlayMessage}</div>
    </div>
  );
}
