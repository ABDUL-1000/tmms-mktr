'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { ChangeEvent } from 'react';
interface TruckFormProps {
    programId: number;
    closeModal: () => void;
  }
  interface Truck {
  id: number;
  plate_number: string;
  name: string;
  model: string;
  truck_number: string;
  
  data:{
    driver:{
      first_name: string;
      last_name: string
    }
  }
}

const TruckForm = ({ programId, closeModal }: TruckFormProps) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [liters, setLiters] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  
  // Fetch trucks from API
  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get("https://tms.sdssn.org/api/transporters/trucks", {
          headers: { Accept: "application/json" }
        });
        setTrucks(response.data);
        console.log("Trucks fetched successfully:", response.data);
      } catch (err) {
        console.error("Error fetching trucks:", err);
        setError("Failed to load trucks");
      }
    };

    fetchTrucks();
  }, []);

  // Handle truck selection
  const handleTruckSelect = (event: ChangeEvent<HTMLSelectElement>) => {

    const truckId = event.target.value;
    const truck = trucks?.find((t: { id: number }) => t.id === Number(truckId));
    setSelectedTruck(truck || null);
  };

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!selectedTruck || !liters) {
      setError("Please select a truck and enter liters");
      return;
    }

    setLoading(true);
    setError("");
 
    try {
      const response = await axios.post(
        "https://tms.sdssn.org/api/marketers/program-trucks",
        {
          program_id: programId,
          truck_id: selectedTruck.id,
          liters: parseFloat(liters)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      console.log("Truck added successfully:", response.data);
      closeModal(); // Close modal after success
    } catch (err) {
      console.error("Error adding truck:", err);
      setError("Failed to add truck. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Truck</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Select Truck */}
          <label className="block mb-2 font-medium">Select Truck:</label>
          <select
            onChange={handleTruckSelect}
            className="w-full border p-2 rounded mb-4"
          >
             
           
{trucks.map(truck => (
    console.log('calling map on trucks'),
  <option key={truck.id} value={truck.id}>
    {truck.plate_number} - {truck.model}
  </option>
))}

          </select>

          {/* Display Driver Name */}
          {selectedTruck && (
            <div className="mb-4">
              <p className="font-medium">Driver:</p>
              <p className="text-gray-700">{selectedTruck.data.driver.first_name} {selectedTruck.data.driver.last_name}</p>
            </div>
          )}

          {/* Input Liters */}
          <label className="block mb-2 font-medium">Liters:</label>
          <input
            type="number"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter liters"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Truck"}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="w-full mt-2 text-center text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TruckForm;
