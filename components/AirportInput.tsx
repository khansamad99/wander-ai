"use client";

import { useState, useRef, useEffect } from "react";
import { getAirportSuggestions, resolveAirportCode, type AirportInfo } from "@/lib/airport-codes";

interface AirportInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  label: string;
}

export default function AirportInput({ 
  id, 
  name, 
  value, 
  onChange, 
  required = false, 
  placeholder = "Enter city name or airport code (e.g., Delhi, DEL, ATL)",
  label 
}: AirportInputProps) {
  const [suggestions, setSuggestions] = useState<AirportInfo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [resolvedCode, setResolvedCode] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when value changes
  useEffect(() => {
    if (value && value.length >= 2) {
      const newSuggestions = getAirportSuggestions(value, 5);
      setSuggestions(newSuggestions);
      
      // Try to resolve the current input
      const resolved = resolveAirportCode(value);
      setResolvedCode(resolved);
    } else {
      setSuggestions([]);
      setResolvedCode("");
    }
  }, [value]);

  // Handle suggestion selection
  const handleSuggestionClick = (airport: AirportInfo) => {
    const syntheticEvent = {
      target: {
        name,
        value: airport.city,
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
    setShowSuggestions(false);
    setResolvedCode(airport.code);
  };

  // Handle input focus
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur (with delay to allow clicking suggestions)
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} *
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-20"
          autoComplete="off"
        />
        
        {/* Airport code indicator */}
        {resolvedCode && resolvedCode.length === 3 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
            {resolvedCode}
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((airport, index) => (
            <button
              key={`${airport.code}-${index}`}
              type="button"
              onClick={() => handleSuggestionClick(airport)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{airport.city}</div>
                  <div className="text-sm text-gray-600">{airport.name}</div>
                  <div className="text-xs text-gray-500">{airport.country}</div>
                </div>
                <div className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {airport.code}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Help text */}
      <div className="mt-2 text-xs text-gray-500">
        {value && resolvedCode && resolvedCode.length === 3 ? (
          <span className="text-green-600">✓ Will use airport code: {resolvedCode}</span>
        ) : value && value.length >= 2 ? (
          <span className="text-amber-600">⚠ Enter a valid city name or airport code</span>
        ) : (
          <span>Enter city name (e.g., Delhi, Paris) or airport code (e.g., DEL, CDG)</span>
        )}
      </div>
    </div>
  );
}