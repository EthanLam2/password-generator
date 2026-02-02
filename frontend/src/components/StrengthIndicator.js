import React from 'react';

// Shows password strength label and progress bar
export default function StrengthIndicator({ strength }) {
  // Do not render if strength is undefined or empty
  if (!strength) return null;

  // Configuration for each strength level
  const strengthConfig = {
    weak: {
      labelColor: "text-red-600",
      barColor: "bg-red-600",
      width: "33%",
    },
    medium: {
      labelColor: "text-orange-500",
      barColor: "bg-orange-500",
      width: "66%",
    },
    strong: {
      labelColor: "text-green-600",
      barColor: "bg-green-600",
      width: "100%",
    },
  };

  // Get styling values for current strength level
  const { labelColor, barColor, width } = strengthConfig[strength];

  return (
    <div className="mb-6">
      {/* Strength label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Password Strength
        </span>
        <span className={`text-sm font-bold uppercase ${labelColor}`}>
          {strength}
        </span>
      </div>

      {/* Strength progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className={`h-3 rounded-full transition-all ${barColor}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}