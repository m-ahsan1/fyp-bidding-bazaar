import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-bold mb-2">Company</h5>
            <p className="text-gray-400">
              We are a leading car listing company providing the best services
              for buying and selling cars.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-bold mb-2">Useful Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h5 className="text-lg font-bold mb-2">Reach Us</h5>
            <p className="text-gray-400">
              852-B Milaad St, Block B Faisal Town<br />
              Lahore, Punjab 54770<br />
              Email: <a href="mailto:info@biddingbazaar.pk" className="text-gray-400 hover:text-white underline">info@biddingbazaar.pk</a><br />
              Phone: <a href="tel:+1234567890" className="text-gray-400 hover:text-white underline">(123) 456-7890</a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-3 mt-3 text-center">
          <p className="text-gray-500">&copy; 2024 BiddingBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
