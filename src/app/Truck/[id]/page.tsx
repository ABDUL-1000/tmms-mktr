"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

const TruckDetailPage = () => {
  const params = useParams();
  const truckId = params?.id; // Get the truck ID from the URL

  const [truck, setTruck] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!truckId) return;

    const fetchTruckDetails = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/program-trucks/${truckId}`
        );
        setTruck(response.data.data);
      } catch (err) {
        setError("Failed to fetch truck details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTruckDetails();
  }, [truckId]);
  console.log(truckId, 'truckId');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!truck) return <p>Truck not found.</p>;

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
            <section className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 capitalize">
                Truck Details - {truck.truck?.name}
              </h2>

              <div className="grid grid-cols-2 gap-y-3 text-gray-600">
                <span className="font-medium text-gray-800">Truck Number:</span>
                <span>{truck.truck?.truck_number}</span>

                <span className="font-medium text-gray-800">Liters:</span>
                <span>{truck.liters}</span>

                <span className="font-medium text-gray-800">Status:</span>
                <span>{truck.status}</span>

                <span className="font-medium text-gray-800">Waybill Number:</span>
                <span>{truck.waybill_number}</span>

                <span className="font-medium text-gray-800">Created At:</span>
                <span>{new Date(truck.created_at).toLocaleString()}</span>
              </div>
            </section>

            {/* Driver Details */}
            <section className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 mt-6">
              <h3 className="text-2xl text-center font-bold text-gray-800 mb-4">
                Driver Details
              </h3>

              <div className="grid grid-cols-2 gap-y-3 text-gray-600">
                <span className="font-medium text-gray-800">Driver Name:</span>
                <span>
                  {truck.truck?.driver?.first_name} {truck.truck?.driver?.last_name}
                </span>

                <span className="font-medium text-gray-800">License Number:</span>
                <span>{truck.truck?.driver?.license_number}</span>

                <span className="font-medium text-gray-800">License Details:</span>
                <span>{truck.truck?.driver?.license_details}</span>

                <span className="font-medium text-gray-800">Status:</span>
                <span>{truck.truck?.driver?.status}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDetailPage;
