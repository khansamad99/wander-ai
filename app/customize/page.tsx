"use client";

import { useState, useEffect } from "react";
import ItineraryForm from "@/components/ItineraryForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import LoadingScreen from "@/components/LoadingScreen";

export default function CustomizePage() {
  const [showItinerary, setShowItinerary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsLoading(false);
      setShowItinerary(true);
    }, 5000);
  };

  const handleBack = () => {
    setShowItinerary(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <ItineraryDisplay formData={formData} onBack={handleBack} />
          )}
        </div>
      </main>
    </>
  );
}