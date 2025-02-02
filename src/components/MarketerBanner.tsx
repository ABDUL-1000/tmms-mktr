'use client'
import { FaTruck } from "react-icons/fa";
import { useEffect, useState } from "react";

const MarketerBanner = () => {
  const [marketer, setMarketer] = useState({
    name: "HUSA AOIL",
    email: "info@husaaoil.com",
    address: "No. 54 Rahimi road, Apapa, Lagos State, Nigeria 🇳🇬",
  });

  useEffect(() => {
    // Fetch stored marketer details from localStorage
    const storedData = localStorage.getItem("signupFormData");
    if (storedData) {
      setMarketer(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg flex items-center p-4 w-full dark:bg-slate-800 dark:text-gray-100">
      {/* Icon Section */}
      <div className="md:p-2">
        <FaTruck className="bg-[#0828b9] p-2 rounded-full md:text-2xl text-white" />
      </div>

      {/* Content Section */}
      <div className="ml-4">
        <h2 className="md:text-xl font-bold mb-1">{marketer.name}</h2>
        <p className="text-gray-700 dark:text-slate-400 mb-1">{marketer.email}</p>
        <p className="text-gray-500 dark:text-gray-300">{marketer.address}</p>
      </div>
    </div>
  );
};

export default MarketerBanner;
