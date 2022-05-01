import React from 'react';
import LetterBox from './LetterBox.js';
import './WordRow.css';

const MAX_WORD_LENGTH = 5;

export default function WordRow(props) {
  const getLetterState = (letter, solution, index) => {
    if (!props.submitted) {
      return undefined;
    }

    if (solution[index] === letter) {
      return 'CORRECT';
    }

    if (solution.includes(letter)) {
      return 'WRONG_SPOT';
    }

    return 'INCORRECT';
  };

  const word = props.word ?? '';
  const emptyCharLength = MAX_WORD_LENGTH - word.length;
  const filledWord = word + new Array(emptyCharLength).fill(' ').join('');

  const letterBoxes = filledWord
    .split('')
    .map((char, index) => (
      <LetterBox
        key={`letter-box-${index}`}
        letterState={getLetterState(char, props.solution, index)}
        letter={char}
      />
    ));
  return <div className="word-row">{letterBoxes}</div>;
}
