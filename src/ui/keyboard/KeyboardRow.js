import React from 'react';
import KeyboardKey from './KeyboardKey.js';
import './KeyboardRow.css';

export default function KeyboardRow(props) {
  const getKeyState = (keyValue) => {
    if (props.guessedLetters.includes(keyValue)) {
      if (props.correctLetters.includes(keyValue)) {
        return 'CORRECT';
      }
      if (props.solution.includes(keyValue)) {
        return 'WRONG_SPOT';
      }
      return 'INCORRECT';
    }
    return 'UNKNOWN';
  };

  const keys = props.keyList.map((keyValue, index) => (
    <KeyboardKey
      key={`keyboard-key-${index}`}
      keyState={getKeyState(keyValue)}
      keyValue={keyValue}
      onClick={() => props.keyClickCallback(keyValue)}
    />
  ));
  return <div className="keyboard-row">{keys}</div>;
}
