"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navbar";
import Map, { Marker } from "react-map-gl";
import Sidebar from "@/components/SideBar";
import mapboxgl from "mapbox-gl"; // Import mapbox-gl
import { useRouter } from "next/navigation"; // Import useRouter

const MAPBOX_TOKEN = "pk.eyJ1Ijoic29mdG1hZ2ljIiwiYSI6ImNrMGJraGRnbjB2YXUzbnE4bm9ibTFzYm4ifQ.RZfNvqLNr4UbHmcpbzbd_Q";

interface TruckLocation {
  id: string;
  latitude: number;
  longitude: number;
  driver: {
    first_name: string;
    second_name: string;
    phone: string;
  };
  truck_number: string;
  name: string;
}

const AllTrucksMapPage = () => {
  const [truckLocations, setTruckLocations] = useState<TruckLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 7.49508, // Default center (Nigeria)
    latitude: 9.05785,
    zoom: 6,
  });

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchAllTruckLocations = async () => {
      try {
        const response = await axios.get("https://tms.sdssn.org/api/marketers/movements");
        console.log("API response:", response.data);

        if (!response.data || !response.data.data) {
          throw new Error("Invalid API response");
        }

        // Validate and filter locations
        const validLocations = response.data.data
          .map((truck: any) => {
            const latestLocation = truck.truck?.driver?.locations?.[truck.truck.driver.locations.length - 1];
            return {
              id: truck.id,
              latitude: latestLocation?.latitude || null,
              longitude: latestLocation?.longitude || null,
              driver: {
                first_name: truck.truck.driver.first_name,
                second_name: truck.truck.driver.last_name,
                phone: truck.truck.driver.phone,
              },
              truck_number: truck.truck.truck_number,
              name: truck.truck.name,
            };
          })
          .filter((truck: any) => {
            return (
              truck.latitude !== null &&
              truck.longitude !== null &&
              truck.latitude >= -90 &&
              truck.latitude <= 90 &&
              truck.longitude >= -180 &&
              truck.longitude <= 180
            );
          });

        if (validLocations.length === 0) {
          setError("No valid truck locations found.");
          return;
        }

        // Set truck locations
        setTruckLocations(validLocations);

        // Adjust map view to fit all markers
        const bounds = new mapboxgl.LngLatBounds();
        validLocations.forEach((truck: any) => {
          bounds.extend([truck.longitude, truck.latitude]);
        });
        setViewState({
          longitude: bounds.getCenter().lng,
          latitude: bounds.getCenter().lat,
          zoom: 8,
        });
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch truck locations.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTruckLocations();
  }, []);

  // Handle click on a truck
  const handleTruckClick = (truckId: string) => {
    router.push(`/movements/${truckId}`); // Navigate to the truck's detail page
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (truckLocations.length === 0) return <p className="text-gray-600">No truck locations available.</p>;

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Trucks Locations</h2>

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
                  {truckLocations.map((truck) => (
                    <Marker key={truck.id} longitude={truck.longitude} latitude={truck.latitude}>
                      <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    </Marker>
                  ))}
                </Map>
              </div>

              {/* Trucks List - Takes 1/3 width */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">Trucks List</h3>
                {truckLocations.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {truckLocations.map((truck) => (
                      <div
                        key={truck.id}
                        className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                        onClick={() => handleTruckClick(truck.id)} // Add click handler
                      >
                        <p className="text-gray-800"><strong>Truck Name:</strong> {truck.name}</p>
                        <p className="text-gray-800"><strong>Truck Number:</strong> {truck.truck_number}</p>
                        <p className="text-gray-800"><strong>Driver:</strong> {truck.driver.first_name} {truck.driver.second_name}</p>
                        <p className="text-gray-800"><strong>Phone:</strong> {truck.driver.phone}</p>
                        <p className="text-gray-800"><strong>Location:</strong> {truck.latitude}, {truck.longitude}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No trucks available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTrucksMapPage;