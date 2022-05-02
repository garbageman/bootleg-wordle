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
  const [solved, setSolved] = useState(false);

  const overlayMessage = solved ? 'CONGRATS!' : SOLUTION;

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

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      const keyValue = e.key.toUpperCase();
      console.log(keyValue);
      if (keyValue === 'BACKSPACE') {
        setCurrentGuess((currentGuess) =>
          currentGuess.length > 0 ? currentGuess.slice(0, -1) : currentGuess
        );
        return;
      }
      if (keyValue === 'ENTER') {
        console.log('handling submission');
        console.log(currentGuess);
        return;
      }
      if (keyValue.match(/[A-Z]/i)) {
        console.log('handling letter keypress');
        setCurrentGuess((currentGuess) =>
          currentGuess.length < 5 ? currentGuess + keyValue : currentGuess
        );
      }
    });
  }, []);

  const handleLetterKeyPress = (keyValue) => {
    console.log(currentGuess);
    if (currentGuess.length < 5) {
      setCurrentGuess((currentGuess) => currentGuess + keyValue);
    }
  };

  const handleDeletePress = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess((currentGuess) => currentGuess.slice(0, -1));
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
    setSolved(currentGuess === SOLUTION);
  };

  const updateGuessedLetters = (guess) => {
    const newLetters = [];
    const newCorrectLetters = [];
    for (var i = 0; i < 5; i++) {
      const letter = guess.charAt(i);
      if (!guessedLetters.includes(letter)) {
        newLetters.push(letter);
      }
      if (!correctLetters.includes(letter) && SOLUTION.charAt(i) === letter) {
        newCorrectLetters.push(letter);
      }
    }
    if (newLetters.length) {
      const totalGuessedLetters = [...guessedLetters, ...newLetters];
      setGuessedLetters(totalGuessedLetters);
    }
    if (newCorrectLetters.length) {
      const totalCorrectLetters = [...correctLetters, ...newCorrectLetters];
      setCorrectLetters(totalCorrectLetters);
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

    if (keyValue === 'DELETE' || keyValue === 'BACKSPACE') {
      console.log('Deleting letter');
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
