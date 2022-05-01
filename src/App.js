import React, { useState, useEffect } from 'react';
import wordList from 'word-list';
import { getWordsList } from 'most-common-words-by-language';
import WordGrid from './ui/wordGrid/WordGrid.js';
import KeyBoard from './ui/keyboard/KeyBoard.js';
import Overlay from './ui/overlay/Overlay.js';
import './style.css';

const potentialSolutions = getWordsList('english', 10000).filter(
  (word) => word.length === 5 && word.charAt(word.length - 1) !== 's'
);
const solutionIndex = Math.floor(Math.random() * potentialSolutions.length);
const SOLUTION = potentialSolutions[solutionIndex].toUpperCase();

export default function App() {
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [validWords, setValidWords] = useState([]);
  const [completed, setCompleted] = useState(false);

  let overlayMessage = '';
  if (currentGuess === SOLUTION) {
    overlayMessage = 'CONGRATS!';
  } else {
    overlayMessage = SOLUTION;
  }

  useEffect(() => {
    fetch(wordList)
      .then((t) => t.text())
      .then((text) => text.split('\n'))
      .then((wordList) =>
        wordList
          .filter((word) => word.length === 5)
          .map((word) => word.toUpperCase())
      )
      .then((wordList) => setValidWords(wordList));
  }, []);

  const handleLetterKeyPress = (keyValue) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + keyValue);
    }
  };

  const handleDeletePress = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  };

  const handleEnterPress = () => {
    if (currentGuess.length === 5) {
      if (validWords.includes(currentGuess)) {
        setGuesses([...guesses, currentGuess]);
        updateGuessedLetters(currentGuess);
        setCurrentGuess('');
      }
    }

    setCompleted(guesses.length === 5 || currentGuess === SOLUTION);
  };

  const updateGuessedLetters = (guess) => {
    const newLetters = [];
    for (var i = 0; i < 5; i++) {
      const letter = guess[i];
      if (!guessedLetters.includes(letter)) {
        newLetters.push(letter);
      }
      if (!correctLetters.includes(letter) && SOLUTION.charAt(i) === letter) {
        setCorrectLetters([...correctLetters, letter]);
      }
    }
    if (newLetters.length) {
      const newGuessedLetters = [...guessedLetters, ...newLetters];
      setGuessedLetters(newGuessedLetters);
    }
  };

  const handleKeyPress = (keyValue) => {
    if (completed) {
      return;
    }

    if (keyValue === 'ENTER') {
      handleEnterPress();
      return;
    }

    if (keyValue === 'DELETE') {
      handleDeletePress();
      return;
    }

    handleLetterKeyPress(keyValue);
  };

  const guessObjects = guesses.map((guess) => ({ guess, submitted: true }));
  if (guessObjects.length < 6) {
    guessObjects.push({ guess: currentGuess, submitted: false });
  }

  return (
    <div className="app-container">
      {completed ? <Overlay overlayMessage={overlayMessage} /> : null}
      <WordGrid guesses={guessObjects} solution={SOLUTION} />
      <KeyBoard
        onKeyPress={handleKeyPress}
        solution={SOLUTION}
        guessedLetters={guessedLetters}
        correctLetters={correctLetters}
      />
    </div>
  );
}
