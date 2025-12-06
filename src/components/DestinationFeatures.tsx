"use client"

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
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setClient(true);
  }, []);

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
    setExpanded((prevState) => ({ ...prevState, [sectionId]: !prevState[sectionId] }));
  };

  const getVisibleText = (text: string, isExpanded: boolean, sectionId: number, isMobile: boolean) => {
    if (isExpanded) return text;

    const estimatedVisibleChars = isMobile ? 300 : 1000;

    if (text.length <= estimatedVisibleChars) return text;

    const lastSpaceIndex = text.lastIndexOf(" ", estimatedVisibleChars);
    const truncatedText = text.substring(0, lastSpaceIndex);

    return `${truncatedText} ... <span class="inline font-bold text-blue-500 hover:underline cursor-pointer" onClick="document.getElementById('read-more-${sectionId}').click()">Read More</span>`;
  };

  if (!client) return <p className="text-center py-4">Loading...</p>;
  if (!destination) return <p className="text-center py-4">No destination data available.</p>;

  return (
    <section className="py-3 bg-[#EEF7FF] font-poppins">
      <div className="container mx-auto px-4 space-y-6 p-4">
        {destination.techneDestinationSection.map((section, index) => {
          const sectionTitle = section.techneDestinationSectionTitle.title.toLowerCase();
          const localImage = defaultImages[sectionTitle] || "/images/default.jpg";
          const sectionDescription = section.images?.[0]?.description || "No description available.";
          const caption = captionMap[sectionTitle] || sectionTitle;
          const isExpanded = expanded[section.id] || false;
          const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
          const visibleText = getVisibleText(sectionDescription, isExpanded, section.id, isMobile);

          return (
            <div key={section.id} className={`space-y-2 ${isMobile ? 'px-2' : ''}`}>
              <h2 className="text-3xl font-bold text-gray-900 uppercase">{section.techneDestinationSectionTitle.title}</h2>

              <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-0">
                <div className={`relative p-2 pb-4 ${isMobile ? 'p-2' : 'p-4'}`}>
                  <div className={`relative ${index % 2 === 0 ? 'float-left mr-6 mb-3' : 'float-right ml-6 mb-3'} w-full md:w-96 h-96 md:h-auto hidden md:block`}>
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10 rounded-xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-extrabold text-white text-3xl uppercase z-20 text-shadow-lg">
                      {caption}
                    </div>
                    <Image
                      src={localImage}
                      alt={section.images?.[0]?.imageAlt || "Destination Image"}
                      width={500}
                      height={500}
                      className="w-full h-96 object-cover rounded-xl"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>

                  <div className="md:hidden w-full h-64 mb-3 relative rounded-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-extrabold text-white text-2xl uppercase z-20 text-shadow-lg">
                      {caption}
                    </div>
                    <Image
                      src={localImage}
                      alt={section.images?.[0]?.imageAlt || "Destination Image"}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>

                  <div className="text-gray-700 leading-relaxed" style={{ minHeight: isMobile ? "auto" : "384px" }}>
                    {isExpanded ? (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: sectionDescription }} className="text-justify" />
                        <div className="mt-4 clear-both">
                          <span
                            className="font-bold text-blue-500 hover:underline cursor-pointer"
                            onClick={() => toggleReadMore(section.id)}
                          >
                            Read Less
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: visibleText }} className="text-justify" />
                        <button
                          id={`read-more-${section.id}`}
                          className="hidden"
                          onClick={() => toggleReadMore(section.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
