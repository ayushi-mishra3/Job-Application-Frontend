import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        
        <h1 className="text-lg font-bold text-blue-600">
          JobPortal
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Find your dream job with ease.
        </p>

        <div className="border-t mt-6 pt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;