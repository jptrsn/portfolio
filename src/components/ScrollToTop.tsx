'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  /** Threshold in pixels to show the button (default: 300) */
  threshold?: number;
  /** Custom className for styling */
  className?: string;
  /** Position from bottom in pixels (default: 24) */
  bottom?: number;
  /** Position from right in pixels (default: 24) */
  right?: number;
}

export default function ScrollToTop({
  threshold = 300,
  className = '',
  bottom = 24,
  right = 24
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Set up scroll listener
  useEffect(() => {
    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  // Scroll to top smoothly
  const scrollToTop = () => {
    try {
      // Method 1: Try scrolling the document element
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      // Method 2: Try scrolling the body element
      else if (document.body.scrollTop > 0) {
        document.body.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      // Method 3: Fallback to window scrollTo
      else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      // Method 4: Final fallback without smooth behavior
      console.warn('Smooth scroll failed, using instant scroll:', error);
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Reset scrolling state after animation completes
    setTimeout(() => setIsScrolling(false), 800);
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          disabled={isScrolling}
          className={`
            fixed z-50 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out
            bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] hover:from-[var(--primary-400)] hover:to-[var(--secondary-400)]
            text-white backdrop-blur-sm
            hover:scale-110 hover:shadow-xl active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            group animate-fade-in-up
            ${className}
          `}
          style={{
            bottom: `${bottom}px`,
            right: `${right}px`,
          }}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp
            className={`w-6 h-6 transition-transform duration-300 ${
              isScrolling ? 'animate-bounce' : 'group-hover:-translate-y-0.5'
            }`}
          />
        </button>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}