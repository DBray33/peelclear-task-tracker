import { useState } from 'react';
import { generateSummary } from '../utils/generateSummary';

export default function CopyButton({ selectedPeriod }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const summary = generateSummary(selectedPeriod);

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        // Fall through to fallback
      }
    }

    // Fallback for older browsers / Safari
    const textarea = document.createElement('textarea');
    textarea.value = summary;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Copy failed. Please try again.');
    }
    document.body.removeChild(textarea);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-center gap-2 bg-dark text-white font-medium py-3 px-4 rounded-xl min-h-[44px] hover:bg-opacity-90 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy All Text
        </>
      )}
    </button>
  );
}
