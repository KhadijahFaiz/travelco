"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Deal {
  dealId: number;
  deal: {
    title: string;
    price: string;
    highlight: { caption: string };
    currency: string;
    // Removed imageUrl since we're using local images
  };
}

export default function DealsCarousel() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch(
          "https://api.techneapp-staging.site/api/public/destinations/PHUKET?siteCode=whv"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // To verify data
        setDeals(data.dealDestinations || []);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    }
    fetchDeals();
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    const maxIndex = deals.length - 1;
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : maxIndex
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex < maxIndex ? prevIndex + 1 : 0
      );
    }
  };

  // Function to get local image paths
  const getLocalImage = (index: number) => {
    return `/deals/deal${(index % 16) + 1}.jpg`; // Modulo to ensure index is within 1-16
  };

  if (!deals.length) {
    return (
      <section className="py-12 bg-[#EEF7FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">Deals</h2>
          <p>Loading deals...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#EEF7FF]">
      <div className="container mx-auto px-4">
        {/* Left-aligned Heading */}
        <h2 className="text-3xl font-bold text-black mb-8">Deals</h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-[#E8F4F4] rounded-full shadow-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={32} className="text-gray-700" />
          </button>

          {/* Carousel Wrapper */}
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {deals.map(({ dealId, deal }, index) => (
                <div
                  key={dealId}
                  className="w-full flex-shrink-0"
                  style={{
                    flexBasis: "100%",
                    flexGrow: 0,
                    flexShrink: 0,
                  }}
                >
                  {/* Card */}
                  <div className="mx-auto max-w-xl"> {/* Increased max-w to enlarge the card */}
                    {/* Card Image */}
                    <div className="relative h-96 w-full rounded-t-lg overflow-hidden shadow-lg"> {/* Increased height */}
                      <Image
                        src={getLocalImage(index)}
                        alt={`Deal ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 bg-[#CDE8E5] rounded-b-lg shadow-lg"> {/* Updated background color */}
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">
                        {deal.highlight.caption}
                      </h3>
                      <p className="text-gray-800 mb-4">{deal.title}</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {deal.currency} {deal.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-[#E8F4F4] rounded-full shadow-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronRight size={32} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
