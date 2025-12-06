"use client";

import { useState } from 'react';
import { Menu } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  description: string;
  continent: string;
  country: string;
  iso: string;
  image: {
    path: string;
    alt: string;
    type: string;
  };
}

interface Weather {
  location: {
    name: string;
    region: string;
  };
  current: {
    tempC: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        condition: {
          text: string;
          icon: string;
        };
        maxtemp_c: number;
      };
    }>;
  };
}

export default function Hero({
  destination,
  weather,
}: {
  destination?: Destination;
  weather: Weather;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroImage =
    'https://cdn.techneapp-staging.site/destinations/103/image/b1dea6cf-5438-4915-8459-9458e653a6f8.jpg?height=590&width=1330';

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getWeekDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return weekDays[date.getDay()];
  };

  return (
    <div className="relative">
      <nav className="bg-white py-4 relative z-20">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">TravelCO</div>
          <div className="hidden md:flex gap-8">
            <a href="/" className="text-gray-600 font-bold hover:text-gray-800">Home</a>
            <a href="/destination" className="text-gray-600 font-bold hover:text-gray-800">Destination</a>
            <a href="/hotels" className="text-gray-600 font-bold hover:text-gray-800">Hotels</a>
            <a href="/deals" className="text-gray-600 font-bold hover:text-gray-800">Deals</a>
            <a href="/about" className="text-gray-600 font-bold hover:text-gray-800">About Us</a>
            <a href="/contact" className="text-gray-600 font-bold hover:text-gray-800">Contact</a>
          </div>
          <div className="flex md:hidden gap-2 items-center">
            <button className="text-gray-600 font-bold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} className="text-black" />
            </button>
          </div>
          <a href="/signin" className="text-black font-bold hover:text-gray-800 hidden md:block">Sign In</a>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg">
            <a href="/" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800">Home</a>
            <a href="/destination" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800">Destination</a>
            <a href="/hotels" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800">Hotels</a>
            <a href="/deals" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800">Deals</a>
            <a href="/about" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800">About Us</a>
            <a href="/contact" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800">Contact</a>
            <a href="/signin" className="block px-6 py-2 text-gray-600 font-bold hover:text-gray-800 border-t">Sign In</a>
          </div>
        )}
      </nav>

      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>

        <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-between pt-10 sm:pt-18">
          <div className="pt-4 md:pt-12">
            <div className="flex flex-col justify-center items-center text-center max-w-2xl md:mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-poppins text-white mb-3 drop-shadow-lg">
                Explore The Beauty of Phuket
              </h1>
              
              <p className="text-base sm:text-lg md:text-lg font-semibold text-gray-200 drop-shadow-lg max-w-full mb-6">
                Phuket, a popular holiday destination in southern Thailand, provides various sights and activities.
              </p>
            </div>
          </div>

          <div className="pb-3 sm:pb-5 md:pb-8">
            <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-0 md:flex-row md:justify-between md:items-end">
              <div className="text-white">
                <h2 className="text-lg md:text-2xl font-semibold mb-1">{weather.location.name}</h2>
                <p className="text-gray-300 mb-1 text-xs md:text-sm">{weather.current.condition.text}</p>
                <p className="text-l md:text-xl font-bold">{weather.current.tempC}°C</p>
              </div>

              <div className="flex justify-between md:justify-start gap-2 sm:gap-4 md:gap-8 bg-black/50 p-2 rounded-lg mt-4 sm:mt-8 overflow-x-auto">
                {weather.forecast.forecastday.slice(0, 7).map((day, index) => (
                  <div key={day.date} className="text-center text-white w-10 sm:w-12">
                    <p className="font-semibold mb-1 text-xs sm:text-sm">{getWeekDay(day.date)}</p>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-6 h-6 mx-auto sm:w-8 sm:h-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
