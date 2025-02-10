'use client';
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import Navigation from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

mapboxgl.accessToken = "pk.eyJ1IjoibGludGFuZzIiLCJhIjoiY2pzNDJkaGJuMDBscDRhbGczMm1nOGM3aSJ9.9mrUUK4Z_YX9bZDMm1YZFA";

const MapComponent: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{ longitude: number; latitude: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://tms.sdssn.org/api/marketers/program-trucks/1",
          headers: { Accept: "application/json" },
        };
        
        const { data } = await axios.request(options);
        
        if (data.success && data.data?.truck?.driver?.locations?.length > 0) {
          const location = data.data.truck.driver.locations[0];
          setCoordinates({
            longitude: location.longitude / 1000000, // Adjusting the scale
            latitude: location.latitude / 1000000, // Adjusting the scale
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (coordinates) {
      const map = new mapboxgl.Map({
        container: "map", 
        style: "mapbox://styles/mapbox/streets-v11", 
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 12,
      });
      
      new mapboxgl.Marker()
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(map);
      
      return () => map.remove();
    }
  }, [coordinates]);

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen"></div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold text-gray-700 mb-4">Truck Location</h1>
      <div id="map" className="w-full h-96 rounded-lg shadow-lg"></div>
    </div>
          </div>
        </div>  
    </div>
  );
};

export default MapComponent;
