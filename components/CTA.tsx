interface CTAProps {
  cta: {
    text: string;
    href: string;
  };
}

export default function CTA({ cta }: CTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <span className="block text-gradient bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Travel Experience?
            </span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of travelers who have discovered the joy of effortless planning with WanderWise AI. 
            Your next adventure is just one click away.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={cta.href}
            className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25"
          >
            {cta.text}
            <span className="ml-2">→</span>
          </a>
          
          <button className="inline-flex items-center backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/20">
            <span className="mr-2">▶</span>
            See How It Works
          </button>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center text-white/90">
            <span className="text-green-400 text-lg mr-3">✓</span>
            <span className="font-semibold">Free to Start</span>
          </div>
          
          <div className="flex items-center justify-center text-white/90">
            <span className="text-green-400 text-lg mr-3">✓</span>
            <span className="font-semibold">No Credit Card Required</span>
          </div>
          
          <div className="flex items-center justify-center text-white/90">
            <span className="text-green-400 text-lg mr-3">✓</span>
            <span className="font-semibold">Cancel Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}