"use client";

import { AIResponse } from "@/lib/api";
import { parseMarkdown, parseAIRecommendation } from "@/lib/markdown";

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

interface ItineraryDisplayProps {
  formData: ExtendedFormData | null;
  apiResponse: AIResponse | null;
  onBack: () => void;
}

export default function ItineraryDisplay({ formData, apiResponse, onBack }: ItineraryDisplayProps) {
  // If no data available, show error state
  if (!formData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
        <p className="text-gray-600 mb-6">Please go back and submit the form again.</p>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Extract real data from API response
  const hasApiData = apiResponse && (apiResponse.flights.length > 0 || apiResponse.hotels.length > 0 || apiResponse.itinerary);
  const bestFlight = apiResponse?.flights?.[0];
  const bestHotel = apiResponse?.hotels?.[0];
  
  // Calculate costs
  const flightCost = bestFlight ? parseFloat(bestFlight.price) || 450 : 450;
  const hotelCostPerNight = bestHotel ? parseFloat(bestHotel.price) || 120 : 120;
  const totalEstimatedCost = (flightCost * 2) + (hotelCostPerNight * (formData.days - 1)) + (formData.days * 50);
  
  // Calculate total travelers
  const totalTravelers = (formData.adults || 1) + (formData.children || 0) + (formData.infants || 0);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your {formData.destination} Itinerary
          </h1>
          <p className="text-gray-600">
            {formData.days} days • {totalTravelers} traveler{totalTravelers > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          ← Back to Form
        </button>
      </div>

      {/* API Status */}
      {hasApiData ? (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-green-500 text-xl mr-3">✅</span>
            <span className="text-green-800 font-medium">
              Live data retrieved from travel APIs
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-yellow-500 text-xl mr-3">⚠️</span>
            <span className="text-yellow-800 font-medium">
              Showing sample data - API integration in progress
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Trip Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Overview</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Route:</span>
                <p className="text-gray-600">{formData.origin} → {formData.destination}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Duration:</span>
                <p className="text-gray-600">{formData.days} days</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Budget Range:</span>
                <p className="text-gray-600">${formData.minBudget} - ${formData.maxBudget}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Estimated Total:</span>
                <p className="text-gray-600 font-bold text-lg">${Math.round(totalEstimatedCost)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Travel Style:</span>
                <p className="text-gray-600">{formData.travelStyle.join(', ') || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Interests:</span>
                <p className="text-gray-600">{formData.interests.join(', ') || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Travelers</h3>
            <div className="space-y-2">
              {formData.adults > 0 && (
                <p className="text-gray-600">👥 {formData.adults} Adult{formData.adults > 1 ? 's' : ''}</p>
              )}
              {formData.children > 0 && (
                <p className="text-gray-600">👶 {formData.children} Child{formData.children > 1 ? 'ren' : ''}</p>
              )}
              {formData.infants > 0 && (
                <p className="text-gray-600">🍼 {formData.infants} Infant{formData.infants > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Flights Section */}
          {apiResponse?.flights && apiResponse.flights.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✈️ Flight Options</h2>
              <div className="space-y-4">
                {apiResponse.flights.slice(0, 3).map((flight, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
                      <span className="text-lg font-bold text-blue-600">${flight.price}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Duration:</span> {flight.duration}
                      </div>
                      <div>
                        <span className="font-medium">Stops:</span> {flight.stops}
                      </div>
                      <div>
                        <span className="font-medium">Class:</span> {flight.travel_class}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>Departure:</strong> {flight.departure}</p>
                      <p><strong>Arrival:</strong> {flight.arrival}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* AI Flight Recommendation */}
              {apiResponse.ai_flight_recommendation && (
                <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🤖</span>
                    <h3 className="text-xl font-semibold text-blue-900">AI Flight Recommendation</h3>
                  </div>
                  <div 
                    className="text-blue-800 space-y-4"
                    dangerouslySetInnerHTML={{ 
                      __html: parseAIRecommendation(apiResponse.ai_flight_recommendation) 
                    }} 
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✈️ Transportation</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Outbound Flight</h3>
                  <p className="text-gray-600">
                    {formData.transportPreferences?.preferDirectFlights ? 'Direct' : 'Connecting'} flight from {formData.origin} to {formData.destination}
                  </p>
                  <p className="text-sm text-gray-500">Class: {formData.transportPreferences?.flightClass || 'Economy'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Hotels Section */}
          {apiResponse?.hotels && apiResponse.hotels.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🏨 Hotel Options</h2>
              <div className="space-y-4">
                {apiResponse.hotels.slice(0, 3).map((hotel, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
                      <span className="text-lg font-bold text-green-600">${hotel.price}/night</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{hotel.rating}</span>
                      </div>
                      <div>{hotel.location}</div>
                    </div>
                    {hotel.link !== 'N/A' && (
                      <a 
                        href={hotel.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              {/* AI Hotel Recommendation */}
              {apiResponse.ai_hotel_recommendation && (
                <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🤖</span>
                    <h3 className="text-xl font-semibold text-green-900">AI Hotel Recommendation</h3>
                  </div>
                  <div 
                    className="text-green-800 space-y-4"
                    dangerouslySetInnerHTML={{ 
                      __html: parseAIRecommendation(apiResponse.ai_hotel_recommendation) 
                    }} 
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🏨 Accommodation</h2>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Recommended Accommodation Type</h3>
                <p className="text-gray-600">{formData.accommodationType.join(', ')}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Estimated cost: ${hotelCostPerNight}/night × {formData.days - 1} nights = ${hotelCostPerNight * (formData.days - 1)}
                </p>
              </div>
            </div>
          )}

          {/* Itinerary Section */}
          {apiResponse?.itinerary ? (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">📅</span>
                <h2 className="text-2xl font-bold text-gray-900">AI-Generated Itinerary</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: parseMarkdown(apiResponse.itinerary) 
                  }} 
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Sample Itinerary</h2>
              <div className="space-y-4">
                {Array.from({ length: Math.min(formData.days, 3) }, (_, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Day {index + 1}</h3>
                    <p className="text-gray-600">
                      Explore {formData.destination} based on your interests: {formData.interests.slice(0, 2).join(', ')}
                    </p>
                  </div>
                ))}
                {formData.days > 3 && (
                  <div className="text-center py-4 text-gray-500">
                    ... and {formData.days - 3} more days of adventure!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ← Modify Trip
        </button>
        {hasApiData && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Save Itinerary
          </button>
        )}
      </div>
    </div>
  );
}