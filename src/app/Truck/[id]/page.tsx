"use client";

import { useParams } from "next/navigation"; // Correct hook for Next.js App Router
import axios from "axios";
import { useEffect, useState } from "react";
import { ProgramTruck } from "@/auth/types/programTruck";
import Loader from "@/components/Loader";
import Link from "next/link"; // Import Link for navigation
import Navigation from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

const TruckDetailPage = () => {
  const { id } = useParams(); // Get truck ID from the route
  console.log("truckid:", id);

  const [truck, setTruck] = useState<ProgramTruck | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before making the API call

    const fetchTruck = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/program-trucks/${id}`
        );
        console.log("API response:", response.data);
        setTruck(response.data.data);
      } catch (err) {
        setError("Failed to fetch truck details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTruck();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!truck) {
    return <p className="text-gray-600">Truck not found.</p>;
  }

  console.log("truck:", truck);

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
    <div className="p-6  w-full mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      
      <div className="text-gray-600 flex flex-col items-center justify-center space-y-5">
        <p className="text-lg">
          <span className="font-medium text-gray-800">Name:</span>{" "}
          {truck.truck.name || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">liters:</span>{" "}
          {truck.liters || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">program ID:</span>{" "}
          {truck.program_id || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">Drivers Name:</span>{" "}
          {truck.truck.driver.first_name} {truck.truck.driver.last_name || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">quantity:</span>{" "}
          {truck.truck.quantity || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">Truck Number:</span>{" "}
          {truck.truck.truck_number || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">Name:</span>{" "}
          {truck.truck.name || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">Name:</span>{" "}
          {truck.truck.name || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-800">Name:</span>{" "}
          {truck.truck.name || "N/A"}
        </p>
      </div>

      {/* Navigation Link to Driver's Movement Page */}
      <Link
        href={`/movement/${id}`} // Dynamic route
        className="mt-6 block w-full py-3 bg-blue-600 text-center text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        View Driver's Movement
      </Link>
    </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TruckDetailPage;
