'use client';
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { Bell } from "lucide-react"; // Importing the bell icon
import { useState } from "react";

const Navigation = () => {
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count

  return (
    <nav className="sticky top-0 bg-background/95 border-b w-full h-16 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center shadow p-2 px-3 text-xl md:px-8 md:text-2xl rounded-lg dark:text-white dark:hover:bg-gray-700 group sm:text-center hover:bg-[#0828b9] bg-[#0828ad] text-blue-100 font-bold leading"
            >
              <span className="flex-1 ms-3 whitespace-nowrap dark:text-white pe-1">
                TMMMS
              </span>
            </Link>
          </div>

          {/* Right Section (Notification & Logout) */}
          <div className="flex items-center gap-6">
            {/* Notification Icon */}
            <div className="relative inline-block">
              <Bell className="w-6 h-6 text-gray-700 cursor-pointer" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>

            {/* Logout Button */}
            <Link href="/login" className="flex items-center py-2 px-3 text-left hover:bg-gray-100">
              <FaSignOutAlt className="mr-2 w-5 h-5" />
              <span className="text-red-700">Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
