export async function fetchDestination() {
  console.log("1. Calling Destination API...");
  try {
    const res = await fetch(
      "https://api.techneapp-staging.site/api/public/destinations/PHUKET?siteCode=whv&include=about,features,images"
    );
    if (!res.ok) throw new Error("Failed to fetch destination");
    const data = await res.json();
    console.log("1. Destination API Response:", data);
    return data;
  } catch (error) {
    console.error("Destination API Error:", error);
    throw error;
  }
}

export async function fetchPreferredHotels() {
  console.log("2. Calling Hotels API...");
  try {
    const res = await fetch("https://api.techneapp-staging.site/api/public/hotels/prefered-hotel?DestinationCode=ALG&SiteCode=whv");
    if (!res.ok) throw new Error("Failed to fetch hotels");
    const data = await res.json();
    console.log("2. Hotels API Response:", data);
    return data;
  } catch (error) {
    console.error("Hotels API Error:", error);
    throw error;
  }
}

export async function fetchWeather() {
  console.log("3. Calling Weather API...");
  try {
    const response = await fetch(
      `https://api.techneapp-staging.site/api/weather/public/forecast-weather?siteCode=whv&q=Phuket&days=14`,
      {
        next: {
          revalidate: 3600
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    console.log("3. Weather API Response:", data);
    return data;
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
}  
     