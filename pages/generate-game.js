import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styles from '../styles/GenerateGame.module.css';

const GenerateGame = () => {
  const [gameDescription, setGameDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-game-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameDescription }),
      });

      if (response.ok) {
        const { code } = await response.json();
        setGeneratedCode(code);
        runGeneratedCode(code);
        setIsGenerated(true);
      } else {
        const { error } = await response.json();
        setErrorMessage(error);
      }
    } catch (error) {
      setErrorMessage('An error occurred while generating the game code');
    }
    setIsLoading(false);
  };

  const runGeneratedCode = (code) => {
    try {
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      eval(code);
    } catch (error) {
      setErrorMessage('An error occurred while running the generated game code');
    }
  };

  const isGenerateDisabled = () => !gameDescription || isLoading || isGenerated;
  const isShowCodeDisabled = () => !gameDescription || isLoading || !isGenerated;


  return (
    <div className={styles.container}>
      <h1>Game Generator</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Write the game description here (max 200 chars)..."
        maxLength="200"
        value={gameDescription}
        onChange={(e) => setGameDescription(e.target.value)}
      />
      <button
        className={`${styles.generateButton} ${isGenerateDisabled() ? styles.disabled : ''}`}
        onClick={handleGenerate}
        disabled={isGenerateDisabled()}
      >
        {isLoading ? 'Generating...' : 'Generate Game'}
      </button>
      <button
        className={`${styles.toggleButton} ${isShowCodeDisabled() ? styles.disabled : ''}`}
        onClick={() => setShowCode(!showCode)}
        disabled={isShowCodeDisabled()}
      >
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {showCode && (
        <>
          <h3>Generated code:</h3>
          <MonacoEditor
            height="30vh"
            language="javascript"
            theme="vs-dark"
            value={generatedCode}
            options={{ lineNumbers: true }}
            onChange={(value) => setGeneratedCode(value)}
          />
        </>
      )}
      <canvas className={styles.canvas} id="gameCanvas" width="1024" height="860" />
    </div>
  );
};

export default GenerateGame;