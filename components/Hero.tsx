import Link from 'next/link';

interface HeroProps {
  content: {
    mainTitle: string;
    tagline: string;
    headline: string;
    subheadline: string;
  };
  cta: {
    text: string;
    href: string;
  };
}

export default function Hero({ content, cta }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/hero-img.png" 
          alt="Mountain landscape with orange van and travelers" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="text-white font-semibold">TourVista</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </nav>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Main Content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Plan Your
            <br />
            Trip with Ease
          </h1>
          
          <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
            Customize your travel itinerary in minutes—free and
            destinations set your preferences, and explore with tailored plans.
          </p>

          {/* Call to Action */}
          <div className="mb-12">
            <Link
              href="/customize"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}