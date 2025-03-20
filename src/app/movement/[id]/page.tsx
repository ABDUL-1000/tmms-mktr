"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navbar";
import Map, { Marker } from "react-map-gl";
import Sidebar from "@/components/SideBar";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic29mdG1hZ2ljIiwiYSI6ImNrMGJraGRnbjB2YXUzbnE4bm9ibTFzYm4ifQ.RZfNvqLNr4UbHmcpbzbd_Q";

const MapPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 9.05785,  
    longitude: 7.49508,
  });
  
  const [firstLocation, setFirstLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 12,
  });
  const [driver, setDriver] = useState<{ first_name: string; truckName: string; phone: string; second_name: string; truckNumber: string } | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!id) return;
  
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://tms.sdssn.org/api/marketers/program-trucks/${id}`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
  
        console.log("API response:", response.data);
  
        const truckData = response.data.data.truck;
        const driverLocations = truckData.driver?.locations;
  
        if (!driverLocations || driverLocations.length === 0) {
          setError("Location data not available.");
          setLoading(false);
          return;
        }
  
        // Get first and latest locations
        const firstLoc = driverLocations[0];
        const latestLoc = driverLocations[driverLocations.length - 1];
  
        // Ensure locations have valid latitude and longitude
        if (
          firstLoc?.latitude >= -90 && firstLoc?.latitude <= 90 &&
          firstLoc?.longitude >= -180 && firstLoc?.longitude <= 180
        ) {
          setFirstLocation({ latitude: firstLoc.latitude, longitude: firstLoc.longitude });
        }
  
        if (
          latestLoc?.latitude >= -90 && latestLoc?.latitude <= 90 &&
          latestLoc?.longitude >= -180 && latestLoc?.longitude <= 180
        ) {
          setLocation({ latitude: latestLoc.latitude, longitude: latestLoc.longitude });
  
          setViewState({
            longitude: latestLoc.longitude,
            latitude: latestLoc.latitude,
            zoom: 12,
          });
        } else {
          setError("Invalid location coordinates.");
        }
  
        // Set driver details
        setDriver({
          first_name: truckData.driver.first_name,
          second_name: truckData.driver.second_name,
          phone: truckData.driver.phone,
          truckNumber: truckData.truck_number,
          truckName: truckData.name
        });
  
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch truck location.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLocation();
  }, [id]);
  

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!location) return <p className="text-gray-600">No location available.</p>;

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Truck Location</h2>
            
            {/* GRID CONTAINER */}
            <div className="grid grid-cols-3 gap-6">
              
              {/* Map Section - Takes 2/3 width */}
              <div className="col-span-2">
                <Map
                  initialViewState={viewState}
                  style={{ width: "100%", height: "500px" }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={MAPBOX_TOKEN}
                >
                  {/* Marker for the Latest Location (Red) */}
                  <Marker longitude={location.longitude} latitude={location.latitude}>
                    <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                  </Marker>

                  {/* Marker for the First Location (Blue) */}
                  {firstLocation && (
                    <Marker longitude={firstLocation.longitude} latitude={firstLocation.latitude}>
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    </Marker>
                  )}
                </Map>
              </div>

              {/* Driver/Truck Details - Takes 1/3 width */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">Driver & Truck Details</h3>
                {driver ? (
                  <div className="mt-4">
                    <p className="text-gray-800"><strong>Driver Name:</strong> {driver.first_name} {driver.second_name}</p>
                    <p className="text-gray-800"><strong>Phone:</strong> {driver.phone}</p>
                    <p className="text-gray-800"><strong>Truck Number:</strong> {driver.truckNumber}</p>
                    <p className="text-gray-800"><strong>Truck Name:</strong> {driver.truckName}</p>
                  </div>
                ) : (
                  <p className="text-gray-600">No driver details available.</p>
                )}
              </div>
            </div>

            {/* Display First & Latest Location */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Truck Locations</h3>
              {firstLocation && location ? (
                <div className="mt-4">
                  <p className="text-gray-800"><strong>First Location:</strong> {firstLocation.latitude}, {firstLocation.longitude}</p>
                  <p className="text-gray-800"><strong>Latest Location:</strong> {location.latitude}, {location.longitude}</p>
                </div>
              ) : (
                <p className="text-gray-600">No location data available.</p>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
