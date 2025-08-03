// Test script for API integration
// This can be run in browser console to test API connectivity

import { apiClient } from './api';

export async function testAPIConnection() {
  console.log('Testing WanderAI API Connection...');
  
  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await apiClient.healthCheck();
    console.log('✅ Health check passed:', health);
    
    // Test complete search with sample data
    console.log('2. Testing complete search...');
    const completeRequest = {
      flight_request: {
        origin: 'ATL',
        destination: 'LAX',
        outbound_date: '2024-06-15',
        return_date: '2024-06-22'
      }
    };
    
    const searchResult = await apiClient.completeSearch(completeRequest);
    console.log('✅ Complete search passed:', {
      flights: searchResult.flights.length,
      hotels: searchResult.hotels.length,
      hasFlightRec: !!searchResult.ai_flight_recommendation,
      hasHotelRec: !!searchResult.ai_hotel_recommendation,
      hasItinerary: !!searchResult.itinerary
    });
    
    return {
      success: true,
      health,
      searchResult
    };
    
  } catch (error) {
    console.error('❌ API test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).testWanderAI = testAPIConnection;
  console.log('WanderAI API test available. Run: testWanderAI()');
}