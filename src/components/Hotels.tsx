"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Head from 'next/head';

interface Hotel {
  id: string;
  code: number;
  name: string;
  address: {
    content: string;
  };
  star: number;
}

interface AvailabilityHotel {
  code: number;
  minRate: string;
  currency: string;
}

interface Root {
  hotels: Hotel[];
  availabilityHotels: AvailabilityHotel[];
}

export default function PreferredHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [availabilityHotels, setAvailabilityHotels] = useState<AvailabilityHotel[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch(
          "https://api.techneapp-staging.site/api/public/hotels/prefered-hotel?DestinationCode=ALG&SiteCode=whv"
        );
        const data: Root = await response.json();
        setHotels(data.hotels || []);
        setAvailabilityHotels(data.availabilityHotels || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
    fetchHotels();
  }, []);

  const getLocalImage = (index: number) => {
    return `/hotels/hotel${index + 1}.jpg`;
  };

  const getHotelRate = (hotelCode: number) => {
    const availabilityHotel = availabilityHotels.find(ah => ah.code === hotelCode);
    return availabilityHotel ? {
      rate: availabilityHotel.minRate,
      currency: availabilityHotel.currency
    } : null;
  };

  const visibleHotels = showAll ? hotels : hotels.slice(0, 3);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <section className="py-4 pb-8 bg-[#EEF7FF]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Reduced margin below heading */}
          <h2 className="text-3xl font-bold text-black font-poppins mb-4">PREFERRED HOTELS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleHotels.map((hotel, index) => {
              const rateInfo = getHotelRate(hotel.code);

              return (
                <div
                  key={hotel.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full flex flex-col"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={getLocalImage(index)}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.src = '/deals/default-hotel.jpg';
                      }}
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-[#1E1E1E]">{hotel.name}</h3>
                      <div className="flex items-center">
                        <span className="text-xl font-semibold text-[#1E1E1E] mr-1">{hotel.star.toFixed(1)}</span>
                        <Star className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 flex-grow">{hotel.address.content}</p>

                    {rateInfo && (
                      <div className="flex items-baseline">
                        <span className="text-lg font-semibold text-[#1E1E1E]">
                          {rateInfo.currency} {rateInfo.rate}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">/ night</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {hotels.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                {showAll ? 'View Less' : 'View More (6)'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
