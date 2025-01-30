import { FaTruck } from "react-icons/fa";

const MarketerBanner = () => {
  return (
    <div className="bg-white shadow-md rounded-lg flex items-center p-2 w-full dark:bg-slate-800 dark:text-gray-100">
      {/* Icon Section */}
      <div className="md:p-2">
        <FaTruck className="bg-[#0828b9] p-2 rounded-full md:text-2xl text-white" />
      </div>

      {/* Content Section */}
      <div className="sm:p-2 mb-4 md:mb-0">
        <h2 className="md:text-xl font-bold mb-2">HUSA AOIL</h2>
        <p className="text-gray-700 dark:text-slate-400 mb-1">info@husaaoil.com</p>
        <p className="text-gray-500 dark:text-gray-300">
          No. 54 Rahimi road, Apapa, Lagos State, Nigeria 🇳🇬
        </p>
      </div>
    </div>
  );
};

export default MarketerBanner;
