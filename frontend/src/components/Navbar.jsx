import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {token, setToken} = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }


  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" className="hover:text-[#5f6fff]">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors" className="hover:text-[#5f6fff]">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about" className="hover:text-[#5f6fff]">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className="hover:text-[#5f6fff]">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* Right Side Buttons / User */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer relative">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={assets.profile_pic}
              alt="Profile"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown"
              onClick={() => setShowDropdown((prev) => !prev)}
            />

            {showDropdown && (
              <div className="absolute top-10 right-0 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow">
                  <NavLink
                    to="/my-profile"
                    className="hover:text-black cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/my-appointments"
                    className="hover:text-black cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Appointments
                  </NavLink>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6fff] cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu Drawer */}
      {showMenu && (
        <div className="fixed inset-0 bg-white z-30 flex flex-col p-6 gap-6">
          <div className="flex justify-between items-center mb-6">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-36 cursor-pointer"
              onClick={() => {
                navigate("/");
                setShowMenu(false);
              }}
            />
            <img
              src={assets.cross_icon}
              alt="Close"
              className="w-6 cursor-pointer"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col gap-4 items-center text-lg font-medium">
            <NavLink
              to="/"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded inline-block ${
                  isActive ? "text-white bg-[#5f6fff]" : ""
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded inline-block ${
                  isActive ? "text-white bg-[#5f6fff]" : ""
                }`
              }
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded inline-block ${
                  isActive ? "text-white bg-[#5f6fff]" : ""
                }`
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded inline-block ${
                  isActive ? "text-white bg-[#5f6fff]" : ""
                }`
              }
            >
              CONTACT
            </NavLink>
            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-[#5f6fff] text-white px-6 py-2 rounded-full mt-4"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
