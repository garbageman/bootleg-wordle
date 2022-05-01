import React from 'react';
import './KeyboardKey.css';

export default function KeyboardKey(props) {
  let getKeyboardKeyClasses = () => {
    let keyClass = 'keyboard-key';
    if (props.keyState === 'CORRECT') {
      keyClass = keyClass + ' correct';
    }

    if (props.keyState === 'INCORRECT') {
      keyClass = keyClass + ' incorrect';
    }

    if (props.keyValue === 'ENTER' || props.keyValue === 'DELETE') {
      keyClass = keyClass + ' special';
    }

    return keyClass;
  };

  let getTruncatedVal = () => {
    if (props.keyValue === 'DELETE') {
      return 'DEL';
    }

    return props.keyValue;
  };
  return (
    <div
      onClick={props.onClick}
      className={getKeyboardKeyClasses()}
    >
      {getTruncatedVal()}
    </div>
  );
}
