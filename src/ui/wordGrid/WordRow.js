import React from 'react';
import LetterBox from './LetterBox.js';
import './WordRow.css';

const MAX_WORD_LENGTH = 5;

export default function WordRow(props) {
  const getLetterState = (letter, word, solution, index) => {
    console.log(solution);
    if (!props.submitted) {
      return undefined;
    }

    if (solution[index] === letter) {
      return 'CORRECT';
    }

    if (solution.includes(letter)) {
      const indicesOfLetterInWord = word
        .split('')
        .map((char, index) => (char === letter ? index : -1))
        .filter((index) => index > 0);
      const relativePositionOfLetterInWord =
        indicesOfLetterInWord.indexOf(index) + 1;

      const unGuessedLetters = solution
        .split('')
        .map((char, index) => ({ char, index }))
        .filter(
          ({ char, index }) => solution.charAt(index) !== word.charAt(index)
        );
      console.log('unguessedletters');
      console.log(unGuessedLetters);
      const countOfLetterInSolution = unGuessedLetters
        .map(({ char, index }) => char)
        .map((char) => (char === letter ? char : null))
        .filter((char) => char !== null).length;

      console.log('relative position of letter in word');
      console.log(relativePositionOfLetterInWord);
      console.log('count of letter in solution');
      console.log(countOfLetterInSolution);

      if (relativePositionOfLetterInWord < countOfLetterInSolution) {
        return 'WRONG_SPOT';
      }
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
        letterState={getLetterState(char, word, props.solution, index)}
        letter={char}
      />
    ));
  return <div className="word-row">{letterBoxes}</div>;
}
