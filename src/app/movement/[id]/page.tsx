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
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [firstLocation, setFirstLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 12,
  });
  const [driver, setDriver] = useState<{ first_name: string; truckName: string; phone:  string;  second_name:string; truckNumber: string } | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://tms.sdssn.org/api/marketers/program-trucks/${id}`);

        console.log("API response:", response.data);

        const truckData = response.data.data.truck;
        const firsttLocation = truckData.driver.locations[truckData.driver.location[0]];
        const latestLocation = truckData.driver.locations[truckData.driver.locations.length -1];

        if ( firstLocation && latestLocation ) {
          const lat = latestLocation.latitude ;
          const lon = latestLocation.longitude;

          // setLocation({ latitude: 11.9984805, longitude: 8.5588411 });
          setLocation({ latitude: lat, longitude: lon });
          setViewState({
            longitude: lon,
            latitude: lat,
            zoom: 12,
          });
        } else {
          setError("Location data not available.");
        }

        console.log(latestLocation)
        // Set driver details
        setDriver({
          first_name: truckData.driver.first_name,
          second_name: truckData.driver.first_name,
          phone: truckData.driver.phone,
          truckNumber: truckData.truck_number,
          truckName: truckData.name
          
        });

      } catch (err) {
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
              initialViewState={{
                longitude: location.longitude,
                latitude: location.latitude,
                zoom: 12,
              }}
              style={{ width: "100%", height: "500px" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              <Marker longitude={location.longitude} latitude={location.latitude}>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              </Marker>
            </Map>
          </div>

          {/* Driver/Truck Details - Takes 1/3 width */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Driver & Truck Details</h3>
            {driver ? (
              <div className="mt-4">
                <p className="text-gray-800"><strong>Driver Name:</strong><span>{driver.first_name}</span> {driver.second_name}</p>
                <p className="text-gray-800"><strong>Phone:</strong> {driver.phone}</p>
                <p className="text-gray-800"><strong>Truck Number:</strong> {driver.truckNumber}</p>
                <p className="text-gray-800"><strong>Truck Number:</strong> {driver.truckName}</p>
              </div>
            ) : (
              <p className="text-gray-600">No driver details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

  );
};

export default MapPage;
