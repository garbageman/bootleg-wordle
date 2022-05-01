import React from 'react';
import LetterBox from './LetterBox.js';
import './WordRow.css';

const MAX_WORD_LENGTH = 5;

export default function WordRow(props) {
  const word = props.word ?? '';
  const emptyCharLength = MAX_WORD_LENGTH - word.length;
  const filledWord = word + new Array(emptyCharLength).fill(' ').join('');
  const letterStatusList = filledWord.split('').map((letter) => ({ letter }));
  const remainingLetters = props.solution.split('');

  for (let i = 0; i < MAX_WORD_LENGTH; i++) {
    if (letterStatusList[i].letter === remainingLetters[i]) {
      letterStatusList[i].status = 'CORRECT';
      remainingLetters[i] = '';
    }
  }

  for (let i = 0; i < MAX_WORD_LENGTH; i++) {
    if (letterStatusList[i].status !== 'CORRECT') {
      const indexOfLetter = remainingLetters.indexOf(
        letterStatusList[i].letter
      );
      if (indexOfLetter >= 0) {
        letterStatusList[i].status = 'WRONG_SPOT';
        remainingLetters[indexOfLetter] = '';
      }
    }
  }

  const getLetterState = (index) => {
    if (!props.submitted) {
      return undefined;
    }

    if (!letterStatusList[index].status) {
      return 'INCORRECT';
    }

    return letterStatusList[index].status;
  };

  const letterBoxes = filledWord
    .split('')
    .map((char, index) => (
      <LetterBox
        key={`letter-box-${index}`}
        letterState={getLetterState(index)}
        letter={char}
      />
    ));
  return <div className="word-row">{letterBoxes}</div>;
}
