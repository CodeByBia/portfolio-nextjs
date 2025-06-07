'use client';

import React, { useEffect, useState } from "react";

const Footer = () => {
  const [dogUrl, setDogUrl] = useState(null);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          setDogUrl(data.message);
        }
      });
  }, []);

  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between items-center">
        <div className="flex flex-col items-center">
          {dogUrl ? (
            <img
              src={dogUrl}
              alt="Random dog"
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 bg-[#222]"
            />
          ) : (
            <span className="text-slate-400">LOGO</span>
          )}
          <span className="text-gray-500 text-xs mt-1">
            Powered by Dog CEO API
          </span>
        </div>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;