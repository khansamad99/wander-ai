"use client";

import { useEffect, useState } from "react";

const TRAVEL_FACTS = [
  "Did you know? The Great Wall of China is not visible from space without aid.",
  "Fun fact: Monaco is smaller than Central Park in New York City!",
  "Travel tip: Iceland has no mosquitoes, making it perfect for outdoor adventures.",
  "Did you know? There are more than 24 time zones around the world.",
  "Fun fact: Russia spans 11 time zones!",
  "Travel tip: Japan has over 6,800 islands, but only about 430 are inhabited.",
  "Did you know? The shortest commercial flight is only 57 seconds long (Scotland).",
  "Fun fact: France is the most visited country in the world.",
  "Travel tip: Singapore's Changi Airport has a butterfly garden and movie theater!",
  "Did you know? Venice is built on more than 100 small islands.",
];

export default function LoadingScreen() {
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Change fact every 3 seconds
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % TRAVEL_FACTS.length);
    }, 3000);

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(factInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto mb-4">
              <svg
                className="animate-spin"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">✈️</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Creating Your Perfect Itinerary
          </h2>
          <p className="text-gray-600 mb-8">
            Our AI is crafting a personalized travel plan just for you...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Analyzing preferences...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Travel Facts */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">While you wait...</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {TRAVEL_FACTS[currentFact]}
              </p>
            </div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="mt-8 space-y-3">
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${progress > 20 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-5 h-5 rounded-full ${progress > 20 ? 'bg-green-500' : 'bg-gray-300'}`}>
              {progress > 20 && (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700">Analyzing your travel preferences</span>
          </div>
          
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${progress > 50 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-5 h-5 rounded-full ${progress > 50 ? 'bg-green-500' : 'bg-gray-300'}`}>
              {progress > 50 && (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700">Finding best activities and attractions</span>
          </div>
          
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${progress > 80 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-5 h-5 rounded-full ${progress > 80 ? 'bg-green-500' : 'bg-gray-300'}`}>
              {progress > 80 && (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700">Optimizing your daily schedule</span>
          </div>
        </div>
      </div>
    </div>
  );
}