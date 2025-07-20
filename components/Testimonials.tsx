const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Blogger",
    location: "San Francisco, CA",
    content: "WanderWise AI transformed my travel planning completely! The AI-generated itinerary for my Japan trip was spot-on, including hidden gems I never would have found on my own.",
    rating: 5,
    avatar: "/images/avatar1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Digital Nomad",
    location: "Remote",
    content: "As someone who travels constantly for work, WanderWise AI saves me hours of research. The real-time updates and personalized recommendations are incredibly accurate.",
    rating: 5,
    avatar: "/images/avatar2.jpg"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Adventure Enthusiast",
    location: "Austin, TX",
    content: "I used WanderWise AI for my solo backpacking trip through South America. The safety recommendations and local insights were invaluable. Highly recommend!",
    rating: 5,
    avatar: "/images/avatar3.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900">What Our </span>
            <span className="text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Travelers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied travelers who have discovered the world with WanderWise AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                index === 1 ? 'lg:scale-105' : ''
              }`}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 leading-relaxed mb-6 text-lg italic">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-700 font-semibold">50,000+ Happy Travelers</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">★</span>
              </div>
              <span className="text-gray-700 font-semibold">4.9/5 Average Rating</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">⚡</span>
              </div>
              <span className="text-gray-700 font-semibold">200+ Countries Covered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}