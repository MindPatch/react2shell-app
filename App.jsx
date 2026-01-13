import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function VulnerableApp() {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');

  // VULNERABLE: Using dangerouslySetInnerHTML without sanitization
  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(userInput);
  };

  // VULNERABLE: Eval execution from user input
  const executeCode = () => {
    try {
      eval(userInput);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Vulnerable React App - Security Testing</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter HTML/JavaScript here..."
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit">Render HTML</button>
        <button type="button" onClick={executeCode} style={{ marginLeft: '10px' }}>
          Execute Code
        </button>
      </form>

      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Output:</h3>
        {/* VULNERABLE: XSS via dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>

      <div style={{ marginTop: '20px', color: '#666', fontSize: '12px' }}>
        <p>⚠️ This app is intentionally vulnerable for security testing purposes</p>
        <p>Vulnerabilities included:</p>
        <ul>
          <li>XSS via dangerouslySetInnerHTML without sanitization</li>
          <li>Direct eval() execution of user input</li>
          <li>No Content Security Policy</li>
        </ul>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<VulnerableApp />);
