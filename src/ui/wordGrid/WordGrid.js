import React from 'react';
import WordRow from './WordRow.js';
import './WordGrid.css';

const MAX_ROW_COUNT = 6;

export default function WordGrid(props) {
  const guesses = props.guesses ?? [];
  const extraRowCount = MAX_ROW_COUNT - guesses.length;
  const extraRows = extraRowCount
    ? new Array(extraRowCount).fill({
        guess: '',
        submitted: false,
      })
    : [];
  const gridData = [...guesses, ...extraRows];
  const grid = gridData.map(({ guess, submitted }, index) => (
    <WordRow
      key={`word-row-${index}`}
      word={guess}
      solution={props.solution}
      submitted={submitted}
    />
  ));
  return <div className="word-grid">{grid}</div>;
}
