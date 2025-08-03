"use client";

import { useState, useEffect } from "react";
import ItineraryForm from "@/components/ItineraryForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import LoadingScreen from "@/components/LoadingScreen";
import { apiClient, handleAPIError, formatDateForAPI, addDaysToDate } from "@/lib/api";
import type { AIResponse, CompleteSearchRequest } from "@/lib/api";

interface ExtendedFormData {
  origin: string;
  destination: string;
  days: number;
  dates?: string;
  minBudget: number;
  maxBudget: number;
  travelStyle: string[];
  pace: string;
  interests: string[];
  adults: number;
  children: number;
  infants: number;
  accommodationType: string[];
  transportPreferences: {
    flightClass: string;
    preferDirectFlights: boolean;
    needRentalCar: boolean;
  };
  dietaryRestrictions: string[];
  accessibility: string[];
  tripPurpose: string;
}

export default function CustomizePage() {
  const [showItinerary, setShowItinerary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ExtendedFormData | null>(null);
  const [apiResponse, setApiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (data: ExtendedFormData) => {
    setFormData(data);
    setIsLoading(true);
    setError("");
    
    try {
      // Convert form data to API request format
      const today = new Date();
      let departureDate: Date;
      
      // Handle date parsing with validation
      if (data.dates && data.dates.trim()) {
        // Try to parse the date string in various formats
        let parsedDate: Date | null = null;
        
        // Try parsing as-is first
        parsedDate = new Date(data.dates);
        
        // If that fails, try some common formats
        if (isNaN(parsedDate.getTime())) {
          // Try to extract year and month from strings like "June 2024"
          const monthYearMatch = data.dates.match(/(\w+)\s+(\d{4})/);
          if (monthYearMatch) {
            parsedDate = new Date(`${monthYearMatch[1]} 1, ${monthYearMatch[2]}`);
          }
        }
        
        // If parsing succeeded and date is in the future (or today), use it
        if (!isNaN(parsedDate.getTime()) && parsedDate >= today) {
          departureDate = parsedDate;
          console.log('Successfully parsed date:', data.dates, '→', departureDate.toISOString().split('T')[0]);
        } else {
          console.warn('Could not parse date or date is in past:', data.dates, 'Using default date');
          departureDate = addDaysToDate(today, 7); // Default to 7 days from today
        }
      } else {
        departureDate = addDaysToDate(today, 7); // Default to 7 days from today
      }
      
      const returnDate = addDaysToDate(departureDate, data.days);
      
      const completeRequest: CompleteSearchRequest = {
        flight_request: {
          origin: data.origin.toUpperCase(),
          destination: data.destination.toUpperCase(),
          outbound_date: formatDateForAPI(departureDate),
          return_date: formatDateForAPI(returnDate),
        },
        hotel_request: {
          location: data.destination,
          check_in_date: formatDateForAPI(departureDate),
          check_out_date: formatDateForAPI(returnDate),
        }
      };

      // Call the backend API
      const response = await apiClient.completeSearch(completeRequest);
      setApiResponse(response);
      setShowItinerary(true);
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowItinerary(false);
    setError("");
    setApiResponse(null);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-red-500 text-xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-700">{error}</p>
                  <button 
                    onClick={() => setError("")}
                    className="mt-2 text-red-600 hover:text-red-800 font-medium"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {!showItinerary ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Plan Your Perfect Trip
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Tell us about your travel preferences and we'll create a customized itinerary just for you
                </p>
              </div>
              <ItineraryForm onSubmit={handleFormSubmit} />
            </>
          ) : (
            <ItineraryDisplay 
              formData={formData} 
              apiResponse={apiResponse}
              onBack={handleBack} 
            />
          )}
        </div>
      </main>
    </>
  );
}