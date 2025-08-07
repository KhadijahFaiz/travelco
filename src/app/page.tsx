import { fetchDestination, fetchPreferredHotels, fetchWeather } from "@/lib/api";
import Hero from "@/components/Hero";
import ClientLogger from "@/components/ClientLogger";
import AboutDestination from "@/components/AboutDestination";
import DestinationFeatures from "@/components/DestinationFeatures";
import Deals from "@/components/Deals";
import Footer from "@/components/Footer";

export default async function Home() {
  const destination = await fetchDestination();
  const hotelsResponse = await fetchPreferredHotels();
  const weatherResponse = await fetchWeather();

  return (
    <main className="min-h-screen">
      <ClientLogger 
        destination={destination}
        hotels={hotelsResponse}
        weather={weatherResponse}
      />
      <Hero 
        destination={destination}
        weather={weatherResponse}
      />
      <AboutDestination />
      <DestinationFeatures destination={destination} />
      <Deals/>
      <Footer />
    </main>
  );
}
