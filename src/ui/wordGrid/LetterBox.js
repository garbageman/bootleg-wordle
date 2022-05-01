import React from 'react';
import './LetterBox.css';

export default function LetterBox(props) {
  let getLetterClasses = (state) => {
    let letterClass = 'letter';
    if (state === 'CORRECT') {
      letterClass = letterClass + ' correct';
    }

    if (state === 'WRONG_SPOT') {
      letterClass = letterClass + ' wrong-spot';
    }

    if (state === 'INCORRECT') {
      letterClass = letterClass + ' incorrect';
    }

    return letterClass;
  };
  return (
    <div className={getLetterClasses(props.letterState)}>{props.letter}</div>
  );
}
