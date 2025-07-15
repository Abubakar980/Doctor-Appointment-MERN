import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* ABOUT US Heading */}
      <div className="text-center mb-12">
        <p className="text-gray-500 text-2xl font-light">
          ABOUT{" "}
          <span className="text-gray-700 font-semibold tracking-wide">
            US
          </span>
        </p>
        <div className="w-20 h-1 bg-[#5f6fff] mx-auto mt-2 rounded"></div>
      </div>

      {/* ABOUT Content */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[400px] rounded-lg shadow-md"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col gap-6 text-gray-600 text-[15px] md:w-2/3">
          <p>
            Welcome to <span className="font-semibold text-gray-800">Prescripto</span>,
            your trusted partner in managing your healthcare needs conveniently
            and efficiently. At Prescripto, we understand the challenges
            individuals face when it comes to scheduling doctor appointments and
            managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-1">
              Our Vision
            </h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-center mt-16">
        <p className="text-gray-500 text-2xl font-light">
          WHY{" "}
          <span className="text-gray-700 font-semibold tracking-wide">
            CHOOSE US
          </span>
        </p>
        <div className="w-28 h-1 bg-[#5f6fff] mx-auto mt-2 rounded"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
          <h3 className="text-lg font-bold text-[#5f6fff] mb-3">
            Efficiency
          </h3>
          <p className="text-gray-600 text-sm">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
          <h3 className="text-lg font-bold text-[#5f6fff] mb-3">
            Convenience
          </h3>
          <p className="text-gray-600 text-sm">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
          <h3 className="text-lg font-bold text-[#5f6fff] mb-3">
            Personalization
          </h3>
          <p className="text-gray-600 text-sm">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
