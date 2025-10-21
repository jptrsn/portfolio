'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = '',
  speed = 100,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hiddenRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText('');
    setShowBlinkingCursor(false);

    // Start typing after delay
    const startTimer = setTimeout(() => {
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeNextChar, speed);
        } else {
          if (showCursor) {
            setShowBlinkingCursor(true);
          }
          onComplete?.();
        }
      };

      typeNextChar();
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, showCursor, onComplete]);

  return (
    <span className="relative inline-block w-full">
      {/* Hidden text that reserves the full space */}
      <span
        ref={hiddenRef}
        className={`${className} invisible w-full inline-block`}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Visible typing text positioned absolutely with same width constraints */}
      <span
        ref={containerRef}
        className={`${className} absolute top-0 left-0 w-full`}
        style={{ maxWidth: '100%', wordWrap: 'break-word' }}
      >
        {displayText}
        {showCursor && (
          <span
            className={`typewriter-cursor ${
              showBlinkingCursor ? 'animate-pulse' : ''
            }`}
          >
            {cursorChar}
          </span>
        )}
      </span>

      <style jsx>{`
        .typewriter-cursor {
          animation: ${showBlinkingCursor ? 'blink 1s infinite' : 'none'};
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
};

// Alternative version without styled-jsx dependency
export const TypewriterSimple: React.FC<TypewriterProps> = ({
  text,
  className = '',
  speed = 100,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setShowBlinkingCursor(false);

    const startTimer = setTimeout(() => {
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeNextChar, speed);
        } else {
          if (showCursor) {
            setShowBlinkingCursor(true);
          }
          onComplete?.();
        }
      };

      typeNextChar();
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, showCursor, onComplete]);

  return (
    <span className="relative inline-block w-full">
      {/* Hidden text for space reservation */}
      <span className={`${className} invisible w-full inline-block`} aria-hidden="true">
        {text}
      </span>

      {/* Visible typing text */}
      <span
        className={`${className} absolute top-0 left-0 w-full`}
        style={{ maxWidth: '100%', wordWrap: 'break-word' }}
      >
        {displayText}
        {showCursor && (
          <span
            className={showBlinkingCursor ? 'animate-pulse' : ''}
            style={{
              animation: showBlinkingCursor ? 'typewriter-blink 1s infinite' : 'none'
            }}
          >
            {cursorChar}
          </span>
        )}
      </span>

      <style jsx global>{`
        @keyframes typewriter-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};