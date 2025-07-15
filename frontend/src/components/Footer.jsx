import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-gray-200 text-sm">
        {/* LEFT */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Logo" />
          <p className="text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* CENTER */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            COMPANY
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#5f6fff] cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-[#5f6fff] cursor-pointer transition">
              About Us
            </li>
            <li className="hover:text-[#5f6fff] cursor-pointer transition">
              Contact Us
            </li>
            <li className="hover:text-[#5f6fff] cursor-pointer transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            GET IN TOUCH
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#5f6fff] transition">
              +1-212-456-7890
            </li>
            <li className="hover:text-[#5f6fff] transition">
              forpracticeonly@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 pb-10 text-center text-gray-500 text-xs">
        &copy; 2024 Abubakar — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
