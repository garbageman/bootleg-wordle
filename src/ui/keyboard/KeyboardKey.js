import React from 'react';
import './KeyboardKey.css';

export default function KeyboardKey(props) {
  let getKeyboardKeyClasses = (state) => {
    let keyClass = 'keyboard-key';
    if (state === 'CORRECT') {
      keyClass = keyClass + ' correct';
    }

    if (state === 'INCORRECT') {
      keyClass = keyClass + ' incorrect';
    }

    return keyClass;
  };
  return (
    <div
      onClick={props.onClick}
      className={getKeyboardKeyClasses(props.keyState)}
    >
      {props.keyValue}
    </div>
  );
}
