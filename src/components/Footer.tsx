"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Newsletter subscription for:', email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#EEF7FF]">
      {/* Newsletter Section */}
      <div style={{ backgroundColor: '#4D869C' }} className="py-8">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col items-center justify-center space-y-4">
      <h3 className="text-white text-xl font-medium">Newsletter</h3>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full px-4 py-2 rounded-full pr-12 text-black" // Added text-black here
            required
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 bg-blue-500 rounded-r-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

      {/* Main Footer Content */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Main Menu */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black">MAIN MENU</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-black hover:text-gray-900 font-poppins">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-black hover:text-gray-900 font-poppins">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/membership" className="text-black hover:text-gray-900 font-poppins">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-black hover:text-gray-900 font-poppins">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Member */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black">MEMBER</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/member" className="text-black hover:text-gray-900 font-poppins">
                    Member
                  </Link>
                </li>
                
              </ul>
            </div>

            {/* Latest News */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black">LATEST NEWS</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/news" className="text-black hover:text-gray-900 font-poppins">
                    OTM Outbound Travel Mart 2025
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-black hover:text-gray-900 font-poppins">
                    Phuket Roadshow to Middle East 2025
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black">CONTACT US</h4>
              <p className="text-black font-poppins">
                <strong>TravelCO</strong>
                <br />
                100/429 Chalermprallat Bor 9 rd., Malang, Phuket 83000
                <br />
                Tel: +66 (0) 76 610 365-6
                <br />
                Fax: +66 (0) 76 610 367
                <br />
                Email: info@travelco.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#4D869C] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-white text-sm font-poppins">
            ©2025 TravelCO. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
