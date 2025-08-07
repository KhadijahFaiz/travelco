'use client';

import { useEffect } from 'react';

export default function ClientLogger({ destination, hotels, weather }: any) {
  useEffect(() => {
 
    const styles = {
      title: 'color: #2563eb; font-weight: bold; font-size: 14px;',
      endpoint: 'color: #059669; font-size: 12px;',
      data: 'color: #black; font-size: 12px;'
    };

    console.group('%c=== API Responses ===', styles.title);
    
    console.group('%c1. Destination API Response:', styles.title);
    console.log('%cEndpoint:', styles.endpoint, 'destinations/PHUKET');
    console.log('%cData:', styles.data, destination);
    console.groupEnd();

    console.group('%c2. Hotels API Response:', styles.title);
    console.log('%cEndpoint:', styles.endpoint, 'hotels/prefered-hotel');
    console.log('%cData:', styles.data, hotels);
    console.groupEnd();

    console.group('%c3. Weather API Response:', styles.title);
    console.log('%cEndpoint:', styles.endpoint, 'weather/public/forecast-weather');
    console.log('%cData:', styles.data, weather);
    console.groupEnd();

    console.groupEnd();
  }, [destination, hotels, weather]);

  return null; 
} 