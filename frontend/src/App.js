import React, { useState, useEffect } from 'react';
// Import child components
import Header from './components/Header';
import PasswordDisplay from './components/PasswordDisplay';
import StrengthIndicator from './components/StrengthIndicator';
import PasswordSettings from './components/PasswordSettings';
import GenerateButton from './components/GenerateButton';
import PasswordHistory from './components/PasswordHistory';

// Backend API base url
const API_URL = 'https://password-generator-api-xnuu.onrender.com/api';

// Store all component data that can change
export default function PasswordGenerator() {
  // Current generated password
  const [password, setPassword] = useState('');
  // Password length (default: 12)
  const [length, setLength] = useState(12);
  // Include uppercase letters
  const [uppercase, setUppercase] = useState(true);
  // Include lowercase letters 
  const [lowercase, setLowercase] = useState(true);
  // Include digits
  const [digits, setDigits] = useState(true);
  // Include symbols
  const [symbols, setSymbols] = useState(true);
  // Password strength (weak/medium/strong)
  const [strength, setStrength] = useState('');
  // Array of previously generated passwords
  const [history, setHistory] = useState([]);
  // Temporary flag to show "copied" message
  const [copied, setCopied] = useState(false);
  // Error message to display
  const [error, setError] = useState('');
  // Loading state during API calls
  const [loading, setLoading] = useState(false);

  // Runs once when page first loads and fetches any existing password history from Flask backend
  useEffect(() => {
    fetchHistory();
  }, []);

  // Fetches password history from Flask backend, called on component load and after generating new passwords
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
        // Send user settings as JSON to Flask
        body: JSON.stringify({
          length: parseInt(length),
          uppercase,
          lowercase,
          digits,
          symbols,
        }),
      });

      const data = await response.json();
      
      // Update UI with new password data
      if (response.ok) {
        setPassword(data.password);
        setStrength(data.strength);
        fetchHistory();
      } else {
        // Backend returned an error
        setError(data.error || 'Failed to generate password');
      }
    } catch (err) {
      // Network error
      setError('Could not connect to server');
    } finally {
      // Always hide loading icon
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (password) {
      // Copy password to clipboard
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Copies a password from history to clipboard
  const copyHistoryItem = (pwd) => {
    navigator.clipboard.writeText(pwd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = async () => {
    try {
      // Clears password history
      await fetch(`${API_URL}/history`, { method: 'DELETE' });
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header component */}
        <Header />

        {/* Password generation*/}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          
          {/* Password display */}
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