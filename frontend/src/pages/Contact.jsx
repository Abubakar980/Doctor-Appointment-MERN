import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-4 md:px-10 py-8">
      {/* Heading */}
      <div className="text-center text-base md:text-lg font-medium text-gray-500">
        CONTACT <span className="text-gray-800 font-semibold">US</span>
      </div>

      {/* Centered Wrapper */}
      <div className="max-w-4xl mx-auto">
        {/* Main Section */}
        <div className="mt-10 flex flex-col md:flex-row gap-10 justify-center items-center">
          {/* Left Image */}
          <img
            className="w-full md:w-[320px] rounded-md"
            src={assets.contact_image}
            alt="Doctor"
          />

          {/* Right Content */}
          <div className="w-full md:w-1/2 space-y-6 text-sm">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-800 mb-1">
                OUR OFFICE
              </h3>
              <p className="text-gray-600 leading-5">54709 Wilms Station</p>
              <p className="text-gray-600 leading-5">
                Suite 350, Washington, USA
              </p>
              <p className="text-gray-600 leading-5 mt-2">
                Tel: (415) 555-0132
              </p>
              <p className="text-gray-600 leading-5">
                Email: greatstroke4dev@gmail.com
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-gray-800 mb-1">
                CAREERS AT PRESCRIPTO
              </h3>
              <p className="text-gray-600 mb-3 leading-5">
                Learn more about our teams and job openings.
              </p>
              <button className="border border-gray-400 px-4 py-1.5 rounded hover:bg-black hover:text-white transition-all duration-300 text-sm">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
