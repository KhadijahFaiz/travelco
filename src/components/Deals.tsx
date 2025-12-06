"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWindowSize } from 'react-use';

interface Deal {
  dealId: number;
  deal: {
    title: string;
    price: string;
    highlight: { caption: string };
    currency: string;
  };
}

export default function DealsCarousel() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowSize();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const itemsToShow = width < 640 ? 1 : width < 768 ? 2 : 3;
  const isMobile = width < 640;

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch(
          "https://api.techneapp-staging.site/api/public/destinations/PHUKET?siteCode=whv"
        );
        const data = await response.json();
        setDeals(data.dealDestinations || []);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    }
    fetchDeals();
  }, []);

  useEffect(() => {
    if (isAutoplaying && isMobile && deals.length > itemsToShow) {
      const timer = setInterval(() => {
        scrollCarousel("right");
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isAutoplaying, isMobile, deals.length, itemsToShow, currentIndex]);

  const scrollCarousel = (direction: "left" | "right") => {
    const maxIndex = Math.max(0, deals.length - itemsToShow);
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
    }
  };

  const getLocalImage = (index: number) => {
    return `/deals/deal${(index % 16) + 1}.jpg`;
  };

  if (!deals.length) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-left font-poppins">DEALS</h2>
          <p>Loading deals...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 bg-[#EEF7FF]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-3xl font-bold text-black mb-4 text-left font-poppins">DEALS</h2>

        <div className="relative">
          <div className="relative overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {deals.map(({ dealId, deal }, index) => (
                <div
                  key={dealId}
                  className={`w-full ${width >= 640 ? 'md:w-1/3' : ''} ${width < 640 ? 'sm:w-full' : ''} flex-shrink-0 px-2 sm:px-4`}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col transform transition duration-300 hover:shadow-lg hover:scale-105">
                    <div className="relative h-48 w-full">
                      <Image
                        src={getLocalImage(index)}
                        alt={`Deal ${index + 1}`}
                        fill
                        sizes="(max-width: 320px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src = '/deals/default-deal.jpg';
                        }}
                      />
                    </div>

                    <div className="p-1 sm:p-2 flex-grow" style={{ backgroundColor: "#CDE8E5" }}>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        {deal.highlight.caption || "Dubai & Phuket"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                        {deal.title || "The Arabian pearl to Satie Heaven"}
                      </p>

                      <p className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
                        {deal.currency} {deal.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <>
              <button
                onClick={() => scrollCarousel("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shadow-md text-gray-700 hover:bg-blue-200 transition-colors"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => scrollCarousel("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shadow-md text-gray-700 hover:bg-teal-200 transition-colors"
                disabled={currentIndex >= deals.length - itemsToShow}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {isMobile && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(deals.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
