'use client';
import { useEffect, useState } from "react";

// Define TypeScript types
interface Marketer {
  name: string;
  email: string;
  address: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MarketerBanner: React.FC = () => {
  const [marketer, setMarketer] = useState<Marketer>({
    name: "Company Name",
    email: "company@gmail.com",
    address: "No. 100 Street, City, Country", 
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Ensure this runs only in the client-side
    if (typeof window !== "undefined") {
      // Get stored subscription end date
      let storedEndDate = localStorage.getItem("subscriptionEndDate");
      let targetDate: Date;

      if (storedEndDate) {
        targetDate = new Date(storedEndDate);
      } else {
        targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() + 2);
        localStorage.setItem("subscriptionEndDate", targetDate.toISOString());
      }

      const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      };

      // Set initial time left
      setTimeLeft(calculateTimeLeft());

      // Start countdown timer
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    // Fetch stored marketer details from localStorage
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("signupFormData");
      if (storedData) {
        try {
          setMarketer(JSON.parse(storedData));
        } catch (error) {
          console.error("Error parsing marketer data:", error);
        }
      }
    }
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg flex justify-between items-center p-4 w-full dark:bg-slate-800 dark:text-gray-100">
      {/* Content Section */}
      <div>
        <h2 className="md:text-xl font-bold mb-1">
          <span className="font-bold text-blue-800 text-lg">COMPANY NAME: </span>
          {marketer.name}
        </h2>
        <p className="text-gray-700 dark:text-slate-400 mb-1">
          <span className="font-bold text-blue-800 text-lg">COMPANY EMAIL: </span>
          {marketer.email}
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          <span className="font-bold text-blue-800 text-lg">COMPANY ADDRESS: </span>
          {marketer.address}
        </p>
      </div>

      {/* Timer Section */}
      <div className="text-center bg-blue-100 dark:bg-slate-700 p-3 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-white">Subscription Ends In:</h3>
        <p className="text-blue-700 dark:text-gray-300 font-bold text-xl">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </p>
      </div>
    </div>
  );
};

export default MarketerBanner;
