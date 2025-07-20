interface Trip {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
}

const trips: Trip[] = [
  {
    id: "1",
    title: "Beach Vacation-Bali",
    location: "Canggu & Chanangti",
    duration: "7 days",
    price: "$299",
    rating: 4.5,
    reviews: 234,
    image: "/assets/images/trip-1.jpg",
    tags: ["Beach", "Villa"]
  },
  {
    id: "2",
    title: "Sealodie Stum",
    location: "Loredta Mist, Visingsöka",
    duration: "5 days",
    price: "$199",
    rating: 4.8,
    reviews: 156,
    image: "/assets/images/trip-2.jpg",
    tags: ["Mountain", "Lake"]
  },
  {
    id: "3",
    title: "Westin Heart",
    location: "Copain",
    duration: "3 days",
    price: "$149",
    rating: 4.3,
    reviews: 89,
    image: "/assets/images/trip-3.jpg",
    tags: ["Forest", "Nature"]
  },
  {
    id: "4",
    title: "Lake Shore Safari",
    location: "Sakwa Valley",
    duration: "4 days",
    price: "$249",
    rating: 4.7,
    reviews: 312,
    image: "/assets/images/trip-4.jpg",
    tags: ["Safari", "Lake"]
  },
  {
    id: "5",
    title: "Rose Stance of Argent",
    location: "Les Corts, Barcelona",
    duration: "6 days",
    price: "$349",
    rating: 4.6,
    reviews: 201,
    image: "/assets/images/trip-5.jpg",
    tags: ["City", "Culture"]
  },
  {
    id: "6",
    title: "Apollo Region",
    location: "Prisdanora, Toct",
    duration: "8 days",
    price: "$399",
    rating: 4.4,
    reviews: 167,
    image: "/assets/images/trip-6.jpg",
    tags: ["Beach", "Island"]
  },
  {
    id: "7",
    title: "Kamos Heights",
    location: "Mannasset, California",
    duration: "5 days",
    price: "$279",
    rating: 4.5,
    reviews: 142,
    image: "/assets/images/trip-7.jpg",
    tags: ["Mountain", "Adventure"]
  },
  {
    id: "8",
    title: "Chinigua Landform",
    location: "Ghana, Lagos",
    duration: "4 days",
    price: "$219",
    rating: 4.2,
    reviews: 98,
    image: "/assets/images/trip-8.jpg",
    tags: ["Safari", "Wildlife"]
  }
];

export default function HandpickedTrips() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Handpicked Trips</h2>
        <p className="text-gray-600 mb-12">Discover travel designed for different tastes and preferences.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="relative h-48">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                  {trip.price}
                </span>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{trip.title}</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {trip.location}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{trip.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({trip.reviews})</span>
                  </div>
                  <span className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {trip.duration}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {trip.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button className="text-gray-400 hover:text-gray-600">Previous</button>
          <div className="flex space-x-1">
            <span className="w-8 h-2 bg-blue-600 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
          <button className="text-gray-600 hover:text-gray-800">Next →</button>
        </div>
      </div>
    </section>
  );
}