"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface DestinationFeaturesProps {
  destination: {
    id: number;
    name: string;
    description: string;
    techneDestinationSection: {
      id: number;
      techneDestinationSectionTitle: { title: string };
      description: string | null;
      images: { path: string; imageAlt: string; type: string; description: string }[];
    }[];
  } | null;
}

export default function DestinationFeatures({ destination }: DestinationFeaturesProps) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const defaultImages: Record<string, string> = {
    "a sneak peak": "/images/sneak-peak.jpg",
    "highlights": "/images/thai-hua-museum.jpg",
    "seasons to travel": "/images/seasons-to-travel.jpg",
    "worth a visit": "/images/big-buddha.jpg",
    "discover more": "/images/discover-more.jpg",
    "culture & traditions": "/images/culture-and-tradition.jpg",
    "food fun fashion": "/images/green-curry.jpg",
    "nature & safari": "/images/nature-safari.jpg",
    "events & fiestas": "/images/events.jpg",
  };

  const captionMap: Record<string, string> = {
    "a sneak peak": "Phuket",
    "highlights": "Thaihua Museum",
    "seasons to travel": "November and April",
    "worth a visit": "Big Buddha",
    "discover more": "Mai Khao",
    "culture & traditions": "Temples",
    "food fun fashion": "Green Curry",
    "nature & safari": "Nai Harn Beach",
    "events & fiestas": "Phuket International Boat Show",
  };

  const toggleReadMore = (sectionId: number) => {
    setExpanded(prevState => ({ ...prevState, [sectionId]: !prevState[sectionId] }));
  };

  if (!client) return <p className="text-center py-8">Loading...</p>;
  if (!destination) return <p className="text-center py-8">No destination data available.</p>;

  return (
    <section className="py-16 bg-[#EEF7FF] font-poppins">
      <div className="container mx-auto px-6 space-y-16">
        {destination.techneDestinationSection.map((section, index) => {
          const sectionTitle = section.techneDestinationSectionTitle.title.toLowerCase();
          const localImage = defaultImages[sectionTitle] || "/images/default.jpg";
          const sectionDescription = section.images?.[0]?.description || "No description available.";

          // Get the caption from the captionMap
          const caption = captionMap[sectionTitle] || sectionTitle;

          return (
            <div key={section.id} className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 text-left">{section.techneDestinationSectionTitle.title}</h2>
              <div className={`flex flex-col md:flex-row gap-8 items-start bg-white shadow-lg rounded-2xl p-6 md:p-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="relative flex-1 h-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-extrabold text-white text-3xl uppercase z-10">
                    {caption}
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-full relative bg-gradient-to-r from-[#7AB2B2] via-transparent to-[#7AB2B2]">
                    <Image
                      src={localImage}
                      alt={section.images?.[0]?.imageAlt || "Destination Image"}
                      width={600}
                      height={300}
                      className="w-full object-cover rounded-lg shadow-xl"
                      priority
                    />
                  </div>
                </div>
                <div className="flex-1 h-full flex flex-col justify-between space-y-4 text-gray-700 leading-tight">
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: expanded[section.id] ? sectionDescription : sectionDescription.slice(0, 300) + "...",
                    }}
                  />
                  {sectionDescription.length > 300 && (
                    <button
                      onClick={() => toggleReadMore(section.id)}
                      className="text-blue-500 hover:underline"
                    >
                      {expanded[section.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
