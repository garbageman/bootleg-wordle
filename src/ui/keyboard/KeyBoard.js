import React from 'react';
import KeyboardRow from './KeyboardRow.js';
import './KeyBoard.css';

const FIRST_ROW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const SECOND_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const THIRD_ROW = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];
export default function KeyBoard(props) {
  return (
    <div className="keyboard">
      <KeyboardRow
        keyList={FIRST_ROW}
        solution={props.solution}
        guessedLetters={props.guessedLetters}
        keyClickCallback={props.onKeyPress}
      />
      <KeyboardRow
        keyList={SECOND_ROW}
        solution={props.solution}
        guessedLetters={props.guessedLetters}
        keyClickCallback={props.onKeyPress}
      />
      <KeyboardRow
        keyList={THIRD_ROW}
        solution={props.solution}
        guessedLetters={props.guessedLetters}
        keyClickCallback={props.onKeyPress}
      />
    </div>
  );
}
