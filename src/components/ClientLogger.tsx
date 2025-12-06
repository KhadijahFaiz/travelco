// This component uses React's 'useEffect' hook to log API response data to the console when the component is rendered or updated.
'use client';

import { useEffect } from 'react';

export default function ClientLogger({ destination, hotels, weather }: any) {
  // useEffect hook runs the code inside whenever 'destination', 'hotels', or 'weather' props change
  useEffect(() => {
    
    // Define custom styles for the logs (to make them look nicer in the console)
    const styles = {
      title: 'color: #2563eb; font-weight: bold; font-size: 14px;', // Style for the title of each group
      endpoint: 'color: #059669; font-size: 12px;', // Style for the endpoint URL
      data: 'color: #000000; font-size: 12px;' // Style for the actual data being logged
    };

    // Group all logs under a main group with a styled title
    console.group('%c=== API Responses ===', styles.title);

    // Group logs for the destination API response
    console.group('%c1. Destination API Response:', styles.title);
    console.log('%cEndpoint:', styles.endpoint, 'destinations/PHUKET'); // Log the endpoint for the destination API
    console.log('%cData:', styles.data, destination); // Log the actual destination data passed to the component
    console.groupEnd(); // End the destination API response group

    // Group logs for the hotels API response
    console.group('%c2. Hotels API Response:', styles.title);
    console.log('%cEndpoint:', styles.endpoint, 'hotels/prefered-hotel'); // Log the endpoint for the hotels API
    console.log('%cData:', styles.data, hotels); // Log the actual hotels data passed to the component
    console.groupEnd(); // End the hotels API response group

    // Group logs for the weather API response
    console.group('%c3. Weather API Response:', styles.title);
    console.log('%cEndpoint:', styles.endpoint, 'weather/public/forecast-weather'); // Log the endpoint for the weather API
    console.log('%cData:', styles.data, weather); // Log the actual weather data passed to the component
    console.groupEnd(); // End the weather API response group

    console.groupEnd(); // End the main group for all logs
  }, [destination, hotels, weather]); // The effect runs when 'destination', 'hotels', or 'weather' change

  return null; // This component does not render anything in the UI, it only logs to the console
}
