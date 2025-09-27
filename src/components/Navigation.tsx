'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 300); // Match the transition duration
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const closeMobileMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsAnimating(false);
    }, 300); // Match the transition duration
  };

  const navigationLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className={`text-xl font-bold text-gradient ${isActiveLink('/') && 'text-gradient'}`}>
            EduCoder.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${isActiveLink(link.href) ? 'text-secondary-500 transition-colors' : 'hover:text-primary-500 transition-colors'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden z-60 relative"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen || isAnimating}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div
                className={`w-full h-0.5 bg-foreground transition-transform duration-300 ${
                  (isMobileMenuOpen || isAnimating) && !(!isMobileMenuOpen && isAnimating) ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <div
                className={`w-full h-0.5 bg-foreground transition-opacity duration-300 ${
                  (isMobileMenuOpen || isAnimating) && !(!isMobileMenuOpen && isAnimating) ? 'opacity-0' : ''
                }`}
              />
              <div
                className={`w-full h-0.5 bg-foreground transition-transform duration-300 ${
                  (isMobileMenuOpen || isAnimating) && !(!isMobileMenuOpen && isAnimating) ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          (isMobileMenuOpen || isAnimating) ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-background border-l border-neutral-800 shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen && !isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 px-6">
            <div className="flex flex-col space-y-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg hover:text-primary-500 transition-colors py-2 border-b border-neutral-800/50 last:border-b-0"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;