# wander-ai

WanderAI (TourVista) - AI-powered travel itinerary planning application built with Next.js

## Features

- 🌍 Multi-step travel planning form
- 🎯 Personalized travel preferences
- ✈️ Smart flight and accommodation recommendations
- 📅 Day-by-day itinerary generation
- 💰 Budget-aware planning
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:khansamad99/wander-ai.git
cd wander-ai/wanderwise-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
wanderwise-ai/
├── app/                    # Next.js App Router
│   ├── customize/         # Travel planning page
│   └── page.tsx          # Homepage
├── components/           # React components
│   ├── ItineraryForm.tsx # Multi-step form
│   ├── ItineraryDisplay.tsx
│   └── LoadingScreen.tsx
└── public/              # Static assets
```

## Development

See [DEVELOPMENT_CONTEXT.md](./DEVELOPMENT_CONTEXT.md) for detailed development documentation.

## License

MIT