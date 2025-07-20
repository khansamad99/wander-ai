# WanderWise AI Development Context

## Project Overview
WanderWise AI (TourVista) is a Next.js-based travel itinerary planning application that helps users create customized travel plans using AI.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Icons**: Custom icons in `/public/assets/icons/`

## Project Structure
```
wanderwise-ai/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with custom CSS variables
│   ├── layout.tsx         # Root layout with Inter font
│   ├── page.tsx           # Homepage
│   └── customize/         # Itinerary customization route
│       └── page.tsx       # Form and itinerary display page
├── components/            # Reusable React components
│   ├── Hero.tsx          # Homepage hero section
│   ├── Navigation.tsx    # Top navigation
│   ├── Features.tsx      # Features section
│   ├── FeaturedDestinations.tsx
│   ├── HandpickedTrips.tsx
│   ├── Footer.tsx
│   ├── ItineraryForm.tsx     # Trip customization form
│   └── ItineraryDisplay.tsx  # Generated itinerary display
├── data/
│   └── landing/
│       └── content.json  # Landing page content configuration
└── public/
    └── assets/          # Images and icons
```

## Design System

### Colors (from tailwind.config.js)
- **Primary**: #0ea5e9 (cyan-500)
- **Secondary**: #06b6d4 (cyan-600)
- **Accent**: #fbbf24 (amber-400)
- **Gradients**: from-blue-600 to-cyan-600

### Common Styling Patterns
- **Buttons**: 
  ```css
  bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700
  py-4 px-8 rounded-lg transform hover:scale-105 shadow-lg
  ```
- **Cards**: `bg-white rounded-2xl shadow-xl p-8`
- **Inputs**: `border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500`
- **Transitions**: `transition-all duration-300`

## Current Implementation Status

### Completed Features

#### 1. Homepage (`/`)
- Hero section with CTA button linked to `/customize`
- Featured destinations section
- Handpicked trips section
- Footer
- Updated button text from "Get Started" to "Plan Your Trip"

#### 2. Itinerary Customization (`/customize`)

##### Enhanced Multi-Step Form
**4-Step Process:**
1. **Basic Info** - Origin, destination, days, dates, budget
2. **Preferences** - Travel style, pace, interests, trip purpose
3. **Group & Stay** - Number of travelers, accommodation type, transport preferences
4. **Review** - Summary of all selections before generation

##### ItineraryForm Component
**Fields implemented:**

**Step 1 - Basic Information:**
- Origin Place (required, text input)
- Destination (required, text input)
- Number of Days (required, number input, 1-30 days)
- Preferable Dates/Months (optional, text input)
- Budget Range (required, min and max number inputs)

**Step 2 - Travel Preferences:**
- Travel Style (multi-select): Adventure, Relaxation, Cultural, Romantic, Family-friendly, Business
- Travel Pace: Relaxed, Moderate, Fast-paced
- Interests (multi-select): Museums & Art, Nature & Wildlife, Nightlife, Shopping, Food & Cuisine, Photography, History, Beach & Water
- Trip Purpose: Vacation, Honeymoon, Business, Family Trip, Solo Adventure, Friends Getaway

**Step 3 - Group & Accommodation:**
- Number of Travelers: Adults, Children (2-17), Infants (0-2)
- Accommodation Type (multi-select): Hotels, Hostels, Airbnb, Resorts, Boutique Hotels
- Transportation Preferences:
  - Flight Class: Economy, Premium Economy, Business, First
  - Prefer Direct Flights (checkbox)
  - Need Rental Car (checkbox)

**Form Features:**
- Progress indicator showing current step
- Step validation before proceeding
- Back/Next navigation
- Visual selection with icons for travel styles and interests
- Review step showing all selections

**Form State Interface:**
```typescript
interface ExtendedFormData {
  // Basic Info
  origin: string;
  destination: string;
  days: number;
  dates?: string;
  minBudget: number;
  maxBudget: number;
  
  // Travel Preferences
  travelStyle: string[];
  pace: string;
  interests: string[];
  
  // Group Details
  adults: number;
  children: number;
  infants: number;
  
  // Accommodation & Transport
  accommodationType: string[];
  transportPreferences: {
    flightClass: string;
    preferDirectFlights: boolean;
    needRentalCar: boolean;
  };
  
  // Additional Preferences
  dietaryRestrictions: string[];
  accessibility: string[];
  tripPurpose: string;
}
```

##### LoadingScreen Component
**Features:**
- Animated airplane spinner
- Progress bar (0-100%)
- Rotating travel facts every 3 seconds
- Step completion indicators
- Full-screen overlay during AI processing
- 5-second simulated processing time

##### ItineraryDisplay Component
**Enhanced Features:**
- Trip Overview (displays all user inputs including new preferences)
- Transportation:
  - Flight costs adjusted based on selected class
  - Direct vs connecting flights based on preference
  - Rental car vs local transport based on selection
- Accommodation:
  - Dynamic pricing based on accommodation type
  - Total cost calculation based on number of nights
- Day-by-Day Itinerary (activities with costs)
- Food & Dining Recommendations

**Dynamic behavior:**
- Generates additional days if user selects more than 3 days
- Calculates total estimated cost based on:
  - Flight class multiplier (economy: 1x, premium: 1.5x, business: 3x, first: 5x)
  - Accommodation type (hostel: $50/night, hotel: $120/night, boutique: $180/night)
  - Local transport or rental car
- Displays traveler count and preferences
- All costs are displayed in USD

### Navigation Flow
1. User lands on homepage (`/`)
2. Clicks "Get Started" button in Hero section
3. Navigates to `/customize` route
4. Fills out the itinerary form
5. Submits form to see generated itinerary
6. Can go back to form to modify inputs

## Next Development Tasks

### Phase 1: AI Integration
1. **Backend API Setup**
   - Create API routes in `/app/api/itinerary/`
   - Integrate with AI service (OpenAI/Anthropic/custom)
   - Implement prompt engineering for itinerary generation

2. **Replace Hardcoded Data**
   - Connect form submission to API
   - Parse AI response into structured itinerary data
   - Handle loading and error states

### Phase 2: Enhanced Features
1. **User Preferences**
   - Travel style (adventure, relaxation, cultural, etc.)
   - Dietary restrictions
   - Accessibility requirements
   - Group size

2. **Advanced Itinerary Options**
   - Multiple destination support
   - Activity preferences
   - Time of day preferences
   - Weather considerations

### Phase 3: User Experience
1. **Authentication**
   - User registration/login
   - Save itineraries to user profile
   - Edit saved itineraries

2. **Export Features**
   - PDF generation
   - Calendar integration
   - Share via link

3. **Booking Integration**
   - Flight booking links
   - Hotel reservation links
   - Activity booking integration

### Phase 4: Additional Features
1. **Community Features**
   - Share itineraries publicly
   - Rate and review destinations
   - User-generated content

2. **Mobile Optimization**
   - Progressive Web App
   - Offline functionality
   - Mobile-specific features

## API Structure (Proposed)
```typescript
// POST /api/itinerary/generate
{
  origin: string;
  destination: string;
  days: number;
  dates?: string;
  budget: {
    min: number;
    max: number;
  };
  preferences?: {
    travelStyle?: string[];
    interests?: string[];
    dietary?: string[];
  };
}

// Response
{
  itinerary: {
    overview: {...};
    transportation: {...};
    accommodation: {...};
    dailyPlans: [...];
    dining: [...];
    totalCost: number;
  };
}
```

## Environment Variables Needed
```env
# AI Service
OPENAI_API_KEY=
# or
ANTHROPIC_API_KEY=

# Database (future)
DATABASE_URL=

# Authentication (future)
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# External APIs (future)
FLIGHT_API_KEY=
HOTEL_API_KEY=
```

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Notes for Next Session
1. The form is fully functional but currently shows hardcoded Paris itinerary
2. Form validation is basic HTML5 validation
3. No error handling implemented yet
4. Budget validation (min < max) not implemented
5. The itinerary dynamically adjusts days but activities are repeated after day 3
6. All costs are in USD, no currency conversion
7. No loading states implemented
8. Mobile responsive but could be optimized further

## Component Dependencies
- ItineraryForm and ItineraryDisplay are imported by customize/page.tsx
- Hero component updated to use Next.js Link instead of anchor tag
- No external UI libraries used (pure Tailwind CSS)

## Git Commit Convention
Based on the project history, use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `style:` for styling changes
- `refactor:` for code restructuring
- `docs:` for documentation