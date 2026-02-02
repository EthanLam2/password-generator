import React from 'react';

// Controls password length and character type options
export default function PasswordSettings({
  length,
  setLength,
  uppercase,
  setUppercase,
  lowercase,
  setLowercase,
  digits,
  setDigits,
  symbols,
  setSymbols,
}) {
  // Character option checkboxes
  const options = [
    { label: "Uppercase (A-Z)", checked: uppercase, onChange: setUppercase },
    { label: "Lowercase (a-z)", checked: lowercase, onChange: setLowercase },
    { label: "Numbers (0-9)", checked: digits, onChange: setDigits },
    { label: "Symbols (!@#$%^&*()_+-=[]{}|;:,.<>?)", checked: symbols, onChange: setSymbols },
  ];

  return (
    <div className="mb-8 space-y-6">
      {/* Password length slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-l font-bold text-black">
            Password Length
          </label>
          <span className="font-mono text-xl font-bold text-black">
            {length}
          </span>
        </div>

        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full h-2 cursor-pointer rounded-lg bg-gray-200 accent-blue-500"
        />

        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>4</span>
          <span>64</span>
        </div>
      </div>

      {/* Character selection options */}
      <div className="grid grid-cols-2 gap-4">
        {options.map(({ label, checked, onChange }) => (
          <label
            key={label}
            className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md cursor-pointer transition hover:bg-gray-100"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="w-5 h-5 cursor-pointer accent-blue-600"
            />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}