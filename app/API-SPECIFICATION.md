# WanderAI API Specification

## Overview
This document outlines the API endpoints required for the WanderAI travel planning application. The API should support user authentication, trip planning, destination management, and booking functionalities.

## Base URL
```
https://api.wanderai.com/v1
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### 1. Authentication

#### 1.1 User Registration
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

#### 1.2 User Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

#### 1.3 Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "token": "new_jwt_token_here",
  "refreshToken": "new_refresh_token_here"
}
```

### 2. User Profile

#### 2.1 Get User Profile
```http
GET /users/profile
```

**Headers:** Authorization required

**Response (200):**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "preferences": {
    "travelStyle": ["adventure", "cultural"],
    "budget": "moderate",
    "accommodationType": ["hotel", "resort"],
    "dietaryRestrictions": ["vegetarian"]
  },
  "savedDestinations": ["dest_456", "dest_789"],
  "upcomingTrips": 3,
  "pastTrips": 12
}
```

#### 2.2 Update User Profile
```http
PUT /users/profile
```

**Headers:** Authorization required

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "preferences": {
    "travelStyle": ["adventure", "cultural", "relaxation"],
    "budget": "luxury",
    "accommodationType": ["hotel", "villa"],
    "dietaryRestrictions": ["vegetarian", "gluten-free"]
  }
}
```

### 3. Destinations

#### 3.1 Get Featured Destinations
```http
GET /destinations/featured
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 6)
- `category` (optional): Filter by category (beach, mountain, city, etc.)

**Response (200):**
```json
{
  "destinations": [
    {
      "id": "dest_123",
      "name": "Rialto Bridge",
      "country": "Italy",
      "city": "Venice",
      "description": "Historic bridge spanning the Grand Canal",
      "images": {
        "primary": "https://cdn.wanderai.com/destinations/rialto-main.jpg",
        "gallery": [
          "https://cdn.wanderai.com/destinations/rialto-1.jpg",
          "https://cdn.wanderai.com/destinations/rialto-2.jpg"
        ]
      },
      "coordinates": {
        "latitude": 45.4380,
        "longitude": 12.3358
      },
      "tags": ["historic", "architecture", "romantic"],
      "popularityScore": 95,
      "bestTimeToVisit": ["April", "May", "September", "October"]
    }
  ],
  "total": 50,
  "page": 1,
  "hasMore": true
}
```

#### 3.2 Get Destination Details
```http
GET /destinations/{destinationId}
```

**Response (200):**
```json
{
  "id": "dest_123",
  "name": "Rialto Bridge",
  "country": "Italy",
  "city": "Venice",
  "description": "The Rialto Bridge is the oldest of the four bridges spanning the Grand Canal...",
  "images": {
    "primary": "https://cdn.wanderai.com/destinations/rialto-main.jpg",
    "gallery": [
      "https://cdn.wanderai.com/destinations/rialto-1.jpg",
      "https://cdn.wanderai.com/destinations/rialto-2.jpg"
    ]
  },
  "coordinates": {
    "latitude": 45.4380,
    "longitude": 12.3358
  },
  "tags": ["historic", "architecture", "romantic"],
  "attractions": [
    {
      "name": "Rialto Market",
      "description": "Historic market near the bridge",
      "distance": "100m"
    }
  ],
  "averageRating": 4.7,
  "reviewCount": 15234,
  "priceRange": {
    "currency": "EUR",
    "entranceFee": null,
    "averageMealCost": 25,
    "averageHotelCost": 150
  },
  "weatherInfo": {
    "currentTemp": 22,
    "conditions": "Partly cloudy"
  }
}
```

#### 3.3 Search Destinations
```http
GET /destinations/search
```

**Query Parameters:**
- `q`: Search query (required)
- `country` (optional): Filter by country
- `type` (optional): beach, mountain, city, cultural, adventure
- `budget` (optional): budget, moderate, luxury
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)

**Response (200):**
```json
{
  "results": [
    {
      "id": "dest_456",
      "name": "Santorini",
      "country": "Greece",
      "matchScore": 0.95,
      "snippet": "Beautiful Greek island known for its white-washed buildings..."
    }
  ],
  "total": 156,
  "page": 1,
  "hasMore": true
}
```

### 4. Trip Planning

#### 4.1 Create AI-Generated Itinerary
```http
POST /trips/generate
```

**Headers:** Authorization required

**Request Body:**
```json
{
  "destination": "Paris, France",
  "startDate": "2024-06-15",
  "endDate": "2024-06-22",
  "travelers": {
    "adults": 2,
    "children": 0
  },
  "preferences": {
    "pace": "moderate",
    "interests": ["art", "food", "history"],
    "budget": "moderate",
    "accommodationType": "hotel"
  },
  "mustVisit": ["Eiffel Tower", "Louvre Museum"],
  "specialRequests": "Need wheelchair accessible options"
}
```

**Response (201):**
```json
{
  "itinerary": {
    "id": "itin_789",
    "destination": "Paris, France",
    "duration": 7,
    "days": [
      {
        "day": 1,
        "date": "2024-06-15",
        "title": "Arrival & Eiffel Tower District",
        "activities": [
          {
            "time": "09:00",
            "duration": 120,
            "name": "Eiffel Tower Visit",
            "description": "Start your Paris adventure with the iconic Eiffel Tower",
            "location": {
              "address": "Champ de Mars, 5 Avenue Anatole",
              "coordinates": {
                "latitude": 48.8584,
                "longitude": 2.2945
              }
            },
            "cost": {
              "amount": 26.80,
              "currency": "EUR",
              "per": "person"
            },
            "bookingRequired": true,
            "wheelchairAccessible": true
          }
        ],
        "meals": [
          {
            "type": "lunch",
            "restaurant": "Café de l'Homme",
            "cuisine": "French",
            "priceRange": "€€€",
            "reservationRecommended": true
          }
        ],
        "accommodation": {
          "name": "Hotel Plaza Athénée",
          "address": "25 Avenue Montaigne",
          "checkIn": "15:00",
          "checkOut": "11:00"
        }
      }
    ],
    "estimatedCost": {
      "total": 2450,
      "currency": "EUR",
      "breakdown": {
        "accommodation": 1400,
        "activities": 450,
        "meals": 600
      }
    }
  }
}
```

#### 4.2 Get User's Trips
```http
GET /trips
```

**Headers:** Authorization required

**Query Parameters:**
- `status` (optional): upcoming, ongoing, completed
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response (200):**
```json
{
  "trips": [
    {
      "id": "trip_123",
      "destination": "Bali, Indonesia",
      "startDate": "2024-07-01",
      "endDate": "2024-07-10",
      "status": "upcoming",
      "travelers": 2,
      "totalCost": 3200,
      "currency": "USD",
      "coverImage": "https://cdn.wanderai.com/trips/bali-cover.jpg"
    }
  ],
  "total": 8,
  "page": 1
}
```

#### 4.3 Get Trip Details
```http
GET /trips/{tripId}
```

**Headers:** Authorization required

**Response (200):**
Returns full trip details including complete itinerary

#### 4.4 Update Trip
```http
PUT /trips/{tripId}
```

**Headers:** Authorization required

**Request Body:**
Partial update of trip details

#### 4.5 Delete Trip
```http
DELETE /trips/{tripId}
```

**Headers:** Authorization required

**Response (204):** No content

### 5. Handpicked Trips

#### 5.1 Get Handpicked Trips
```http
GET /trips/handpicked
```

**Query Parameters:**
- `category` (optional): beach, mountain, city, adventure, cultural
- `duration` (optional): short (1-3 days), medium (4-7 days), long (8+ days)
- `priceRange` (optional): budget, moderate, luxury
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response (200):**
```json
{
  "trips": [
    {
      "id": "hp_trip_001",
      "title": "Beach Vacation - Bali",
      "location": "Canggu & Seminyak",
      "duration": "7 days",
      "price": {
        "amount": 299,
        "currency": "USD",
        "per": "person"
      },
      "rating": 4.5,
      "reviewCount": 234,
      "images": {
        "primary": "https://cdn.wanderai.com/handpicked/bali-beach.jpg",
        "gallery": []
      },
      "tags": ["Beach", "Villa", "Surfing"],
      "highlights": [
        "Private villa with pool",
        "Surfing lessons included",
        "Traditional Balinese spa"
      ],
      "included": [
        "Accommodation",
        "Daily breakfast",
        "Airport transfers",
        "2 guided tours"
      ]
    }
  ],
  "total": 45,
  "page": 1,
  "hasMore": true
}
```

#### 5.2 Get Handpicked Trip Details
```http
GET /trips/handpicked/{tripId}
```

**Response (200):**
```json
{
  "id": "hp_trip_001",
  "title": "Beach Vacation - Bali",
  "location": "Canggu & Seminyak",
  "duration": "7 days",
  "price": {
    "amount": 299,
    "currency": "USD",
    "per": "person",
    "originalPrice": 399,
    "discount": 25
  },
  "rating": 4.5,
  "reviewCount": 234,
  "images": {
    "primary": "https://cdn.wanderai.com/handpicked/bali-beach.jpg",
    "gallery": [
      "https://cdn.wanderai.com/handpicked/bali-villa.jpg",
      "https://cdn.wanderai.com/handpicked/bali-sunset.jpg"
    ]
  },
  "tags": ["Beach", "Villa", "Surfing"],
  "description": "Experience the best of Bali's beaches...",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Paradise",
      "description": "Airport pickup and villa check-in",
      "activities": ["Airport transfer", "Welcome drink", "Villa orientation"]
    }
  ],
  "included": [
    "7 nights accommodation in private villa",
    "Daily breakfast",
    "Return airport transfers",
    "2 guided tours",
    "Surfing lesson"
  ],
  "excluded": [
    "International flights",
    "Lunch and dinner",
    "Personal expenses"
  ],
  "bookingTerms": {
    "cancellation": "Free cancellation up to 7 days before",
    "deposit": "20% required to secure booking",
    "groupSize": {
      "min": 2,
      "max": 6
    }
  }
}
```

### 6. Bookings

#### 6.1 Create Booking
```http
POST /bookings
```

**Headers:** Authorization required

**Request Body:**
```json
{
  "tripId": "hp_trip_001",
  "startDate": "2024-08-15",
  "travelers": {
    "adults": 2,
    "children": 0,
    "details": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-01-15",
        "passportNumber": "AB123456"
      }
    ]
  },
  "specialRequests": "Vegetarian meals preferred",
  "addOns": ["travel-insurance", "extra-luggage"]
}
```

**Response (201):**
```json
{
  "booking": {
    "id": "book_456",
    "confirmationNumber": "WA-2024-0815-456",
    "status": "pending_payment",
    "tripDetails": {
      "name": "Beach Vacation - Bali",
      "startDate": "2024-08-15",
      "endDate": "2024-08-22"
    },
    "totalAmount": 618,
    "currency": "USD",
    "paymentDue": "2024-07-15T23:59:59Z",
    "cancellationDeadline": "2024-08-08T23:59:59Z"
  },
  "paymentUrl": "https://pay.wanderai.com/secure/book_456"
}
```

#### 6.2 Get User Bookings
```http
GET /bookings
```

**Headers:** Authorization required

**Query Parameters:**
- `status` (optional): pending_payment, confirmed, cancelled, completed
- `page` (optional): Page number
- `limit` (optional): Results per page

### 7. Reviews

#### 7.1 Create Review
```http
POST /reviews
```

**Headers:** Authorization required

**Request Body:**
```json
{
  "tripId": "hp_trip_001",
  "rating": 5,
  "title": "Amazing Bali Experience!",
  "content": "The villa was beautiful and the included activities were well organized...",
  "photos": [
    "https://uploads.wanderai.com/reviews/photo1.jpg"
  ]
}
```

#### 7.2 Get Reviews
```http
GET /reviews
```

**Query Parameters:**
- `tripId` (required): Trip ID to get reviews for
- `sort` (optional): newest, oldest, highest, lowest
- `page` (optional): Page number
- `limit` (optional): Results per page

### 8. Real-time Updates

#### 8.1 Get Flight Prices
```http
GET /realtime/flights
```

**Query Parameters:**
- `origin`: Origin airport code (e.g., JFK)
- `destination`: Destination airport code (e.g., CDG)
- `departDate`: Departure date (YYYY-MM-DD)
- `returnDate` (optional): Return date for round trips
- `adults`: Number of adult passengers
- `class` (optional): economy, premium, business, first

**Response (200):**
```json
{
  "flights": [
    {
      "id": "fl_123",
      "airline": "Air France",
      "price": {
        "amount": 456,
        "currency": "USD"
      },
      "departure": {
        "airport": "JFK",
        "time": "2024-06-15T22:30:00Z"
      },
      "arrival": {
        "airport": "CDG",
        "time": "2024-06-16T11:45:00Z"
      },
      "duration": 435,
      "stops": 0
    }
  ],
  "cheapest": 456,
  "average": 523
}
```

#### 8.2 Get Hotel Availability
```http
GET /realtime/hotels
```

**Query Parameters:**
- `destination`: City or location
- `checkIn`: Check-in date
- `checkOut`: Check-out date
- `guests`: Number of guests
- `priceRange` (optional): Filter by price

### 9. Visa Information

#### 9.1 Get Visa Requirements
```http
GET /visa/requirements
```

**Query Parameters:**
- `nationality`: User's nationality (ISO country code)
- `destination`: Destination country (ISO country code)
- `duration`: Trip duration in days
- `purpose` (optional): tourism, business, transit

**Response (200):**
```json
{
  "visaRequired": true,
  "visaType": "Tourist Visa",
  "requirements": {
    "documents": [
      "Valid passport (6 months validity)",
      "Passport photos (2)",
      "Proof of accommodation",
      "Return flight tickets",
      "Bank statements"
    ],
    "processingTime": "5-7 business days",
    "validity": "90 days",
    "maxStay": "30 days",
    "fee": {
      "amount": 50,
      "currency": "USD"
    }
  },
  "embassyInfo": {
    "website": "https://embassy.example.com",
    "address": "123 Embassy Road, Washington DC",
    "phone": "+1-202-555-0100"
  },
  "alternativeOptions": [
    {
      "type": "eVisa",
      "available": true,
      "applicationUrl": "https://evisa.example.com"
    }
  ]
}
```

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested destination was not found",
    "details": {
      "destinationId": "dest_999"
    }
  }
}
```

### Common Error Codes:
- `UNAUTHORIZED`: Invalid or missing authentication
- `FORBIDDEN`: User lacks permission
- `VALIDATION_ERROR`: Invalid request data
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `CONFLICT`: Resource conflict (e.g., duplicate email)
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642082400
```

## Webhooks

Configure webhooks to receive real-time updates:

### Booking Status Update
```json
{
  "event": "booking.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "bookingId": "book_456",
    "previousStatus": "pending_payment",
    "newStatus": "confirmed",
    "userId": "user_123"
  }
}
```

### Price Alert
```json
{
  "event": "price.alert",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "alertId": "alert_789",
    "type": "flight",
    "currentPrice": 299,
    "previousPrice": 456,
    "currency": "USD",
    "details": {
      "route": "JFK-CDG",
      "date": "2024-06-15"
    }
  }
}
```

## SDK Support

Official SDKs available for:
- JavaScript/TypeScript
- Python
- Ruby
- Go
- Java
- Swift (iOS)
- Kotlin (Android)

## Testing

Test environment available at:
```
https://api-test.wanderai.com/v1
```

Test API keys can be obtained from the developer dashboard.