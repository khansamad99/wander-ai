interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  features: Feature[];
}

const iconMap: { [key: string]: string } = {
  map: "🗺️",
  clock: "⏰",
  passport: "📘",
  money: "💰",
  sparkles: "✨",
};

export default function Features({ features }: FeaturesProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_70%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900">Why Choose </span>
            <span className="text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              WanderWise AI?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the future of travel planning with our AI-powered platform that transforms your wanderlust into unforgettable adventures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-cyan-200 ${
                index === 1 ? 'lg:scale-105' : ''
              }`}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{iconMap[feature.icon]}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
              
              <div className="mt-6 flex items-center text-cyan-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mr-2">Learn more</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}