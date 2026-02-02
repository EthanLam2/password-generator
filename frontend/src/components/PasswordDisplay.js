import React from 'react';
import { Copy, AlertCircle } from 'lucide-react';

// Displays generated password with copy to clipboard function
// Displays generated password with copy-to-clipboard functionality
export default function PasswordDisplay({ password, copied, error, onCopy }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Generate a password"
          className="w-full pr-16 px-4 py-3 font-mono text-lg rounded border"
        />

        <button
          onClick={onCopy}
          disabled={!password}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded transition ${
            password
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          title="Copy to clipboard"
        >
          <Copy size={16} />
        </button>
      </div>

      {copied && <p className="mt-2 text-sm text-green-600">Copied!</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}