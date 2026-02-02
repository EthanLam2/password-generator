import React, { useState, useEffect } from 'react';
// import child components
import Header from './components/Header';
import PasswordDisplay from './components/PasswordDisplay';
import StrengthIndicator from './components/StrengthIndicator';
import PasswordSettings from './components/PasswordSettings';
import GenerateButton from './components/GenerateButton';
import PasswordHistory from './components/PasswordHistory';

// backend API base url
const API_URL = 'http://localhost:5000/api';

// store all component data that can change
export default function PasswordGenerator() {
  // current generated password
  const [password, setPassword] = useState('');
  // password length (default: 12)
  const [length, setLength] = useState(12);
  // include uppercase letters
  const [uppercase, setUppercase] = useState(true);
  // include lowercase letters 
  const [lowercase, setLowercase] = useState(true);
  // include digits
  const [digits, setDigits] = useState(true);
  // include symbols
  const [symbols, setSymbols] = useState(true);
  // password strength (weak/medium/strong)
  const [strength, setStrength] = useState('');
  // array of previously generated passwords
  const [history, setHistory] = useState([]);
  // temporary flag to show "copied" message
  const [copied, setCopied] = useState(false);
  // error message to display
  const [error, setError] = useState('');
  // loading state during API calls
  const [loading, setLoading] = useState(false);

  // runs once when page first loads and fetches any existing password history from Flask backend
  useEffect(() => {
    fetchHistory();
  }, []);

  // fetches password history from Flask backend, called on component load and after generating new passwords
  const fetchHistory = async () => {
    try {
      // GET request to Flask history endpoint
      const response = await fetch(`${API_URL}/history`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const generatePassword = async () => {
    setLoading(true);
    setError('');
    
    try {
      // POST request to Flask generate endpoint
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // send user settings as JSON to Flask
        body: JSON.stringify({
          length: parseInt(length),
          uppercase,
          lowercase,
          digits,
          symbols,
        }),
      });

      const data = await response.json();
      
      // update UI with new password data
      if (response.ok) {
        setPassword(data.password);
        setStrength(data.strength);
        fetchHistory();
      } else {
        // backend returned an error
        setError(data.error || 'Failed to generate password');
      }
    } catch (err) {
      // network error
      setError('Could not connect to server');
    } finally {
      // always hide loading icon
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (password) {
      // copy password to clipboard
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // copies a password from history to clipboard
  const copyHistoryItem = (pwd) => {
    navigator.clipboard.writeText(pwd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = async () => {
    try {
      // clears password history
      await fetch(`${API_URL}/history`, { method: 'DELETE' });
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Component */}
        <Header />

        {/* Main Card - Password Generation */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          
          {/* Password Display Section */}
          <PasswordDisplay
            password={password}
            copied={copied}
            error={error}
            onCopy={copyToClipboard}
          />

          {/* Strength Indicator */}
          <StrengthIndicator strength={strength} />

          {/* Settings (Length + Checkboxes) */}
          <PasswordSettings
            length={length}
            setLength={setLength}
            uppercase={uppercase}
            setUppercase={setUppercase}
            lowercase={lowercase}
            setLowercase={setLowercase}
            digits={digits}
            setDigits={setDigits}
            symbols={symbols}
            setSymbols={setSymbols}
          />

          {/* Generate Button */}
          <GenerateButton loading={loading} onClick={generatePassword} />
        </div>

        {/* Password History Section */}
        <PasswordHistory
          history={history}
          onClear={clearHistory}
          onCopyHistoryItem={copyHistoryItem}
        />
      </div>
    </div>
  );
}