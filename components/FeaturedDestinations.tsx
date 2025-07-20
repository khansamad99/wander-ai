interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tag?: string;
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Rialto Bridge",
    country: "Italy",
    image: "/assets/images/sample.jpeg",
    tag: "Bali"
  },
  {
    id: "2",
    name: "Amalfi",
    country: "Italy",
    image: "/assets/images/sample1.jpg",
    tag: "Tokyo"
  },
  {
    id: "3",
    name: "London",
    country: "United Kingdom",
    image: "/assets/images/sample2.jpg"
  },
  {
    id: "4",
    name: "Australia",
    country: "Tour",
    image: "/assets/images/sample3.jpg"
  },
  {
    id: "5",
    name: "Maui",
    country: "Hawaii",
    image: "/assets/images/sample4.jpg",
    tag: "Maui"
  },
  {
    id: "6",
    name: "Paris",
    country: "France",
    image: "/assets/images/sample5.jpg",
    tag: "Santorini"
  }
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Travel Destinations</h2>
        <p className="text-gray-600 mb-12">Explore some of the best places around the world and plan next trip</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large featured destination */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer md:col-span-2 md:row-span-2">
            <img 
              src={destinations[0].image} 
              alt={destinations[0].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {destinations[0].tag && (
              <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {destinations[0].tag}
              </span>
            )}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{destinations[0].name}</h3>
              <p className="text-white/80 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {destinations[0].country}
              </p>
            </div>
          </div>

          {/* Smaller destinations */}
          {destinations.slice(1).map((destination) => (
            <div key={destination.id} className="relative rounded-2xl overflow-hidden group cursor-pointer h-64">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {destination.tag && (
                <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {destination.tag}
                </span>
              )}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{destination.name}</h3>
                <p className="text-white/80 text-sm flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {destination.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}