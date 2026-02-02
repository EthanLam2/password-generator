import React from 'react';
import { RefreshCw } from 'lucide-react';

// Display generate button with clickable functionality
export default function GenerateButton({ loading, onClick }) {
  return (
    // trigger button on click and disables button while password is being generated
    <button
      onClick={onClick} 
      disabled={loading}
      className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* spins refresh icon and changes text to generating when loading */}
      <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
      {loading ? 'Generating...' : 'Generate Password'}
    </button>
  );
}