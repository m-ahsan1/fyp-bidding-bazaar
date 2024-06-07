import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-bold mb-4">Company</h5>
            <p>
              We are a leading car listing company providing the best services
              for buying and selling cars.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-bold mb-4">Useful Links</h5>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h5 className="text-lg font-bold mb-4">Contact Us</h5>
            <p>
              1234 Car St.<br />
              Car City, CA 12345<br />
              Email: info@carlisting.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 CarListing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
