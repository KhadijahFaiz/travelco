"use client";

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
  const heroImage = 'https://cdn.techneapp-staging.site/destinations/103/image/b1dea6cf-5438-4915-8459-9458e653a6f8.jpg?height=590&width=1330';
  
  // Format date and time
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  const dateString = now.toLocaleDateString('en-US', { 
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Get weekday names for forecast
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const getWeekDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return weekDays[date.getDay()];
  };
console.log("Khadijah",weather)
  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="bg-white py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">TravelCO</div>
          <div className="flex gap-8">
            <a href="/" className="text-gray-600 font-bold hover:text-gray-800">Home</a>
            <a href="/destination" className="text-gray-600 font-bold hover:text-gray-800">Destination</a>
            <a href="/hotels" className="text-gray-600 font-bold hover:text-gray-800">Hotels</a>
            <a href="/deals" className="text-gray-600 font-bold hover:text-gray-800">Deals</a>
            <a href="/about" className="text-gray-600 font-bold hover:text-gray-800">About Us</a>
            <a href="/contact" className="text-gray-600 font-bold hover:text-gray-800">Contact</a>
          </div>
          <button className="text-black font-bold hover:text-gray-800">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[590px]">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          {/* Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage})`
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative h-full container mx-auto px-6">
          {/* Main Content - Centered */}
          <div className="h-full flex flex-col justify-center items-start max-w-2xl">
            <h1 className="text-7xl font-bold text-white mb-4">
              Explore The Beauty of Phuket!
            </h1>
            <p className="text-xl text-gray-200">
              Phuket, a popular holiday destination in southern Thailand,
              provides various sights and activities.
            </p>
          </div>

          {/* Weather Info - Absolute positioned at bottom */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="flex justify-between items-end">
              {/* Location and Current Weather */}
              <div className="text-white">
                <h2 className="text-2xl font-semibold mb-1">
                  {weather.location.name}
                </h2>
                <p className="text-gray-300 mb-1">
                  {weather.current.condition.text}
                </p>
                <p className="text-4xl font-bold">
                  {weather.current.tempC}°C
                </p>
              </div>

              {/* 5-Day Forecast */}
              <div className="flex gap-12">
                {weather.forecast.forecastday.slice(0, 5).map((day, index) => (
                  <div key={day.date} className="text-center text-white">
                    <p className="font-medium mb-2">{getWeekDay(day.date)}</p>
                    <img 
                      src={day.day.condition.icon} 
                      alt={day.day.condition.text}
                      className="w-8 h-8 mx-auto"
                    />
                  </div>
                ))}
              </div>

              {/* Date and Time */}
              <div className="text-white text-right">
                <p className="text-lg font-semibold">{timeString} GMT</p>
                <p className="text-gray-300">{dateString}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
