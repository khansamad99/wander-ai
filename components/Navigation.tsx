'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gray-800">WanderWise AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#destinations" className="text-gray-700 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Destinations
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#blog" className="text-gray-700 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Blog
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-cyan-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Log In
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-cyan-600 p-2 rounded-md"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-lg bg-white/10 border border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#destinations" className="text-gray-700 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium">
              Destinations
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium">
              Pricing
            </a>
            <a href="#blog" className="text-gray-700 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium">
              Blog
            </a>
            <div className="flex flex-col space-y-2 px-3 py-2">
              <button className="text-gray-700 hover:text-cyan-600 text-left">Log In</button>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}