// app/trucks/[id]/page.tsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigation from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic29mdG1hZ2ljIiwiYSI6ImNrMGJraGRnbjB2YXUzbnE4bm9ibTFzYm4ifQ.RZfNvqLNr4UbHmcpbzbd_Q";

interface TruckDetail {
  id: string;
  program_id: number;
  truck_id: number;
  liters: number;
  status: string;
  liters_lifted: number;
  meter_ticket_number: string;
  waybill_number: string;
  customer_id: number | null;
  customer_status: string;
  driver_status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  truck: {
    id: number;
    transporter_id: number;
    driver_id: number;
    added_by: number;
    name: string;
    description: string;
    truck_number: string;
    quantity: number;
    compartment: number;
    calibrate_one: number;
    calibrate_two: number;
    calibrate_three: number;
    status: string;
    movement_status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    driver: {
        phone_number: number;
      id: number;
      user_id: number;
      added_by: number;
      transporter_id: number;
      first_name: string;
      last_name: string;
      other_name: string;
      license_number: string;
      license_details: string;
      status: string;
      movement_status: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      locations: {
        id: number;
        driver_id: number;
        longitude: number;
        latitude: number;
        description: string | null;
        status: string | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
      }[];
    };
  };
  program: {
    id: number;
    refinery_id: number;
    marketer_id: number;
    purchase_id: number;
    liters: number;
    atc_number: string;
    generated_by: number;
    status: string;
    comment: string;
    added_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    marketer: {
      id: number;
      user_id: number;
      license_number: string;
      license_details: string;
      description: string;
      status: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        role: string;
        phone_number: string;
        address: string;
        city: string;
        state: string;
        country: string;
        created_at: string;
        updated_at: string;
        assigned_by: string | null;
        deleted_at: string | null;
      };
    };
    refinery: {
      id: number;
      user_id: number;
      license_number: string;
      license_details: string;
      description: string;
      status: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        role: string;
        phone_number: string;
        address: string;
        city: string;
        state: string;
        country: string;
        created_at: string;
        updated_at: string;
        assigned_by: string | null;
        deleted_at: string | null;
      };
    };
  };
}

const TruckDetailPage = () => {
  const { id } = useParams(); // Get the truck ID from the URL
  const [truckDetail, setTruckDetail] = useState<TruckDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const fetchTruckDetail = async () => {
      try {
        const response = await axios.get(`https://tms.sdssn.org/api/marketers/movements/${id}`, 
          {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          }
        );
        console.log("Truck detail response:", response.data);
        setTruckDetail(response.data.data);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch truck details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTruckDetail();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!truckDetail) return <p className="text-gray-600">No truck details available.</p>;

  // Get the latest location
  const latestLocation = truckDetail.truck.driver.locations?.[truckDetail.truck.driver.locations.length - 1];

  return (
    <div>

      <Navigation />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Truck Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-800"><strong>Truck Name:</strong> {truckDetail.truck.name}</p>
        <p className="text-gray-800"><strong>Truck Number:</strong> {truckDetail.truck.truck_number}</p>
        <p className="text-gray-800"><strong>Driver:</strong> {truckDetail.truck.driver.first_name} {truckDetail.truck.driver.last_name}</p>
        <p className="text-gray-800"><strong>Phone:</strong> {truckDetail.truck.driver.phone_number}</p>
        <p className="text-gray-800"><strong>Status:</strong> {truckDetail.status}</p>
        <p className="text-gray-800"><strong>Liters:</strong> {truckDetail.liters}</p>
        <p className="text-gray-800"><strong>Liters Lifted:</strong> {truckDetail.liters_lifted}</p>

        {/* Display Location Data */}
        {latestLocation ? (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Latest Location</h2>
            <p className="text-gray-800"><strong>Latitude:</strong> {latestLocation.latitude}</p>
            <p className="text-gray-800"><strong>Longitude:</strong> {latestLocation.longitude}</p>
            <p className="text-gray-800"><strong>Last Updated:</strong> {new Date(latestLocation.updated_at).toLocaleString()}</p>

            {/* Display Map */}
            <div className="mt-4">
              <Map
                initialViewState={{
                  longitude: latestLocation.longitude,
                  latitude: latestLocation.latitude,
                  zoom: 12,
                }}
                style={{ width: "100%", height: "400px" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker longitude={latestLocation.longitude} latitude={latestLocation.latitude}>
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                </Marker>
              </Map>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-6">No location data available.</p>
        )}
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default TruckDetailPage;