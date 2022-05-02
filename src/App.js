import React, { useState, useEffect, useRef } from 'react';
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
  const latestCurrentGuess = useRef(currentGuess);
  const latestGuesses = useRef(guesses);
  const latestGuessedLetters = useRef(guessedLetters);
  const latestCorrectLetters = useRef(correctLetters);
  const latestValidWords = useRef(validWords);
  const latestCompleted = useRef(completed);

  const overlayMessage = solved ? 'CONGRATS!' : SOLUTION;

  useEffect(() => {
    latestCurrentGuess.current = currentGuess;
    latestGuesses.current = guesses;
    latestGuessedLetters.current = guessedLetters;
    latestCorrectLetters.current = correctLetters;
    latestValidWords.current = validWords;
    latestCompleted.current = completed;
  });

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
      if (latestCompleted.current) {
        return;
      }

      const keyValue = e.key.toUpperCase();
      if (keyValue === 'BACKSPACE') {
        handleDeletePress();
        return;
      }

      if (keyValue === 'ENTER') {
        handleEnterPress();
        return;
      }

      if (keyValue.match(/[A-Z]/i)) {
        handleLetterKeyPress(keyValue);
      }
    });
  }, []);

  const handleLetterKeyPress = (keyValue) => {
    if (latestCurrentGuess.current.length < 5) {
      setCurrentGuess(latestCurrentGuess.current + keyValue);
    }
  };

  const handleDeletePress = () => {
    if (latestCurrentGuess.current.length > 0) {
      setCurrentGuess(latestCurrentGuess.current.slice(0, -1));
    }
  };

  const handleEnterPress = () => {
    console.log(latestCurrentGuess.current);
    if (latestCurrentGuess.current.length === 5) {
      if (latestValidWords.current.includes(latestCurrentGuess.current)) {
        const newGuesses = [
          ...latestGuesses.current,
          latestCurrentGuess.current,
        ];
        setGuesses(newGuesses);
        updateGuessedLetters(latestCurrentGuess.current);
        setCurrentGuess('');
      }
    }

    setCompleted(
      latestGuesses.current.length === 5 ||
        latestCurrentGuess.current === SOLUTION
    );
    setSolved(latestCurrentGuess.current === SOLUTION);
  };

  const updateGuessedLetters = (guess) => {
    const newLetters = [];
    const newCorrectLetters = [];
    for (var i = 0; i < 5; i++) {
      const letter = guess.charAt(i);
      if (!latestGuessedLetters.current.includes(letter)) {
        newLetters.push(letter);
      }
      if (
        !latestCorrectLetters.current.includes(letter) &&
        SOLUTION.charAt(i) === letter
      ) {
        newCorrectLetters.push(letter);
      }
    }
    if (newLetters.length) {
      setGuessedLetters([...latestGuessedLetters.current, ...newLetters]);
    }
    if (newCorrectLetters.length) {
      setCorrectLetters([
        ...latestCorrectLetters.current,
        ...newCorrectLetters,
      ]);
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
