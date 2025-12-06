"use client";
import { useState } from "react";

export default function AboutDestination() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex gap-8 items-stretch">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-between">
            <ul className="space-y-4 text-gray-700 flex-1">
              <li>
                Phuket is the perfect last-minute getaway for thrill seekers. Located on Thailand's Andaman coast, this tropical paradise has every type of adventure you can imagine.
              </li>
              <li>
                When you think of holidays in Phuket, you wouldn't be wrong to envision stunning beaches, sparkling blue ocean and picturesque natural beauty.
              </li>
              <li>But it's the unexpected treasures that will surprise and delight you.</li>
              <li>
                The many contrasts of Phuket make it appealing for both holidaymakers and investors.
              </li>
              <li>
                Whether you want to relax on pristine beaches or enjoy a night out in the vibrant hotspots, whether you are looking to buy a home with breathtaking views or a shop with potential, this tropical paradise is waiting for you.
              </li>
              <li className="flex justify-between items-end">
                <span>
                  There is more to Phuket than meets the eye - from historical sites to cultural attractions; there is no shortage of things to do and places to see.
                </span>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 font-semibold hover:text-blue-700 whitespace-nowrap"
                >
                  {isExpanded ? "Show Less..." : "Read More..."}
                </button>
              </li>
              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4">
                  <p>
                    If you're after adventure and excitement, look no further than Phuket's plentiful activities. There are several waterfalls to take a swim at or climb through, and if you are looking for more extreme action, head down south, where the limestone cliffs are perfect for rock climbing.
                  </p>
                  <p>
                    Those who prefer staying on dry land can stroll along the beautiful coastline or discover exotic marine life at the many nearby reefs and islands. Phuket certainly lives up to its superstar status regarding beaches - there is something here for everyone.
                  </p>
                  <p>
                    The prices are affordable, and the savings are enormous! You'll be able to save money while having fun with Our Holiday Vibes are Good Vibes Only!
                  </p>
                  <p>
                    Capital: Phuket<br />
                    International Airport: Phuket International Airport<br />
                    Population: 437,963<br />
                    Currency: Thai Baht<br />
                    Time: GMT+7<br />
                    Driving Side: Left<br />
                    Main Electricity: 230v-50hz<br />
                    Official Language: Thai Language<br />
                    Religion: Buddhist
                  </p>
                </div>
              )}
            </ul>
          </div>

          {/* Image */}
          <div className="w-2/5 flex-shrink-0">
            <img 
              src="/phuket-about.jpg"
              alt="Phuket Beach"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
