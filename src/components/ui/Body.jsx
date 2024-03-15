import React from "react";
import background from "../images/background.avif";

const Body = () => {
  return (
    <div className="relative text-white flex items-center justify-center min-h-screen">
      {/* Background Image */}
      <img
        className="absolute h-full w-full object-cover"
        src={background} // Replace with the path to your image
        alt="Background"
      />

      {/* Dark Overlay */}
      <div className="absolute h-full w-full bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to EDT - Home for exciting educational materials
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl">
          Explore the amazing educational materials curated by students like
          you, for you.
        </p>
      </div>
    </div>
  );
};

export default Body;
