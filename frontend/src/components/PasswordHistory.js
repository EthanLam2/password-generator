import React from 'react';
import { Copy, Trash2 } from 'lucide-react';

// Displays a list of recently generated passwords with copy and clear all functionality
export default function PasswordHistory({ history, onClear, onCopyHistoryItem }) {
   // Map password strength to text color
  const strengthColor = {
    weak: "text-red-600",
    medium: "text-orange-500",
    strong: "text-green-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with title and clear button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black">
          Recent Passwords
        </h2>

        {/* Show clear button only when history is not empty */}
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-sm font-medium text-red-600"
          >
            <Trash2 size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          No passwords generated
        </p>
      ) : (
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-md transition hover:bg-gray-100"
            >
              {/* Generated password */}
              <code className="text-sm font-mono text-black">
                {item.password}
              </code>

              <div className="flex items-center gap-3">
                {/* Password strength label */}
                <span
                  className={`text-xs font-semibold uppercase ${
                    strengthColor[item.strength]
                  }`}
                >
                  {item.strength}
                </span>

                {/* Copy password button */}
                <button
                  onClick={() => onCopyHistoryItem(item.password)}
                  className="text-blue-600 hover:text-blue-700 transition"
                  title="Copy password"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}