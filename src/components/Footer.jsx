import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const headingColor = "#7B1FA2"; // richer purple
  const textColor = "#5E3B76"; // medium lavender
  const iconBgHover = "#9C27B0"; // vibrant purple for hover
  
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: headingColor }}>
            MediBridge
          </h2>
          <p className="text-sm" style={{ color: textColor }}>
            Bridging the gap between patients and essential healthcare services.
            Reliable. Accessible. Compassionate.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: headingColor }}>
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: textColor }}>
            <li><a href="#home" className="hover:text-[#9C27B0] transition">Home</a></li>
            <li><a href="#services" className="hover:text-[#9C27B0] transition">Services</a></li>
            <li><a href="#equipment" className="hover:text-[#9C27B0] transition">Equipment</a></li>
            <li><a href="#about" className="hover:text-[#9C27B0] transition">About Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: headingColor }}>
            Contact
          </h3>
          <ul className="space-y-3 text-sm" style={{ color: textColor }}>
            <li className="flex items-center gap-2"><Phone size={16} color={headingColor} /> +92 300 0000000</li>
            <li className="flex items-center gap-2"><Mail size={16} color={headingColor} /> support@medibridge.com</li>
            <li className="flex items-center gap-2"><MapPin size={16} color={headingColor} /> Karachi, Pakistan</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: headingColor }}>
            Follow Us
          </h3>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-white rounded-full p-3 shadow-md hover:bg-[#9C27B0] hover:text-white transition"
              >
                <Icon size={18} color={headingColor} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-gray-200 mt-10 pt-6 text-center text-sm"
        style={{ color: textColor }}
      >
        © {new Date().getFullYear()} MediBridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
