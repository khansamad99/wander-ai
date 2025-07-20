import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import HandpickedTrips from "@/components/HandpickedTrips";
import Footer from "@/components/Footer";
import landingContent from "@/data/landing/content.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero content={landingContent.hero} cta={landingContent.cta} />
      <FeaturedDestinations />
      <HandpickedTrips />
      <Footer />
    </main>
  );
}