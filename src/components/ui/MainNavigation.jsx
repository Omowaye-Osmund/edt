import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const linkButton = () => {
  setIsMenuOpen(false)
  }
  
  return (
    <div>
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#722F37] p-8 flex justify-between items-center">
        {/* For small screens, place hamburger menu on the right */}
        <div className="flex items-center md:order-2">
          <GiHamburgerMenu
            className="cursor-pointer md:hidden"
            onClick={toggleMenu}
          />
        </div>

        <div className="text-2xl text-white md:order-1">EDT</div>

        {isMenuOpen && (
          // Render mobile menu
          <nav className="flex flex-col items-center bg-[#722F37] text-white absolute top-16 left-0 right-0 z-50">

{/* Links are wrapped around the bottons so that when clicked, the drop down menu closes */}
            <button onClick={linkButton}>
            <Link to="/" className="py-2">
              Home
              </Link>
              
            </button>
            <button onClick={linkButton}>
            <Link to="/all-materials" className="py-2">
              All Materials
            </Link>
            </button>
            <button onClick={linkButton}>
            <Link to="/add-material" className="py-2">
              Add Material
            </Link>
            </button>
            <button onClick={linkButton}>
            <Link to="/about" className="py-2">
              About
            </Link>
            </button>
          </nav>
        )}

        {/* Hide the navigation for small screens */}
        <nav className="hidden md:flex md:order-3">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-materials">All Materials</Link>
            </li>
            <li>
              <Link to="/add-material">Add Material</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainNavigation;
