"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChangeEvent } from "react";
import { MdToken } from "react-icons/md";
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
  programId: number;
  closeModal: () => void;
  quantity: number;

  data: {};
  driver: {
    first_name: string;
    last_name: string;
  };
}
interface Program {
  id: number;
  name: string;
  selectedProgramId: number | null;
}

const TruckForm = ({ closeModal, programId }: TruckFormProps) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [liters, setLiters] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [programDetails, setProgramDetails] = useState<Program | null>(null);
  

  // Fetch program details
  useEffect(() => {
    if (!programId) return; // Ensure programId is present
    const fetchProgramId = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/programs/${programId}`
        );
        setProgramDetails(response.data.data);
        console.log("Fetched Program Details:", response.data.data);
      } catch (err) {
        console.error("Error fetching program details:", err);
      }
    };
    fetchProgramId();
  }, [programId]);

  // Fetch trucks from API
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const fetchTrucks = async () => {
      try {
        const response = await axios.get(
          "https://tms.sdssn.org/api/transporters/trucks",
          {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          }
        );
        setTrucks(response.data.data);

        console.log("Trucks res fetched successfully:", response.data);
        console.log(
          "Trucks status fetched successfully:",
          response.data.status
        );
        console.log("Trucks msg fetched successfully:", response.data.message);
        console.log("Trucks data fetched successfully:", response.data.data);
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
  const handleSubmit = async () => {
    if (!selectedTruck || !liters || !programId) {
      alert("Please select a truck and enter liters.");
      return;
    }

    const payload = {
      truck_id: selectedTruck.id,
      program_id: programId,
      liters: Number(liters),
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "https://tms.sdssn.org/api/marketers/program-trucks",
        {
          headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Data submitted successfully!");
      console.log(response.data);

      // Update the local state (UI) without refreshing
      setTrucks((prevTrucks) => [...prevTrucks, selectedTruck]);

      closeModal();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  console.log("TruckForm rendered", liters);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Truck</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form
          onSubmit={(e) => {
            // e.preventDefault(); // Prevents default form submission
            handleSubmit();
          }}
        >
          {/* Select Truck */}
          <label className="block mb-2 font-medium">Select Truck:</label>
          <select
            onChange={handleTruckSelect}
            className="w-full border p-2 rounded mb-4"
          >
            <option disabled value="">
              select truck
            </option>

            {trucks.map(
              (truck) => (
                console.log("calling map on trucks"),
                (
                  <option
                    key={truck.id}
                    value={truck.id}
                    className="bg-gray-100"
                  >
                    🚛 {truck.name}- {truck.quantity}
                  </option>
                )
              )
            )}
          </select>

          {/* Display Driver Name */}
          {selectedTruck && (
            <div className="mb-4">
              <p className="font-medium">Driver:</p>
              <p className="text-gray-700">
                {selectedTruck.driver.first_name}{" "}
                {selectedTruck.driver.last_name}
              </p>
            </div>
          )}

          {/* Input Liters */}
          <label className="block mb-2 font-medium">Liters:</label>
          <input
            type="number"
            value={liters}
            onChange={(e) => setLiters(e.target.value.replace(/\D/, ""))}
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
