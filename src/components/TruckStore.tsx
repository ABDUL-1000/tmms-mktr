"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Driver {
  first_name: string;
  last_name: string;
}

interface Truck {
  id: number;
  name: string;
  truck_number: string;
  driver?: Driver | null;
}

interface Program {
  id: number;
  name: string;
  liters: number;
}

interface TrucksTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgramId: number | null;
  liters: number;
  purchase_id: number | null; // Add purchase_id to the props
}

const TrucksTableModal: React.FC<TrucksTableModalProps> = ({
  isOpen,
  onClose,
  selectedProgramId,
  liters,
  purchase_id,
}) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [newliters, setNewLiters] = useState<number | "">("");
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [programDetails, setProgramDetails] = useState<Program | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trucks
  useEffect(() => {
    if (isOpen) {
      const fetchTrucks = async () => {
        try {
          const response = await axios.get(
            "https://tms.sdssn.org/api/transporters/trucks",
            {
              headers: { Accept: "application/json" },
            }
          );
          setTrucks(response.data.data);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchTrucks();
    }
  }, [isOpen]);

  // Fetch program details when program ID is selected
  useEffect(() => {
    if (selectedProgramId && programDetails) {
      setNewLiters(programDetails.liters);
      const fetchProgramDetails = async () => {
        try {
          const response = await axios.get(
            `https://tms.sdssn.org/api/programs/${selectedProgramId}`
          );
          setProgramDetails(response.data.data);
        } catch (err: unknown) {
          console.error("Error fetching program details:", err);
        }
      };
      fetchProgramDetails();
    }
  }, [selectedProgramId, programDetails]);
  console.log("Selected Program ID:", selectedProgramId);
  console.log("Program Details:", programDetails);

  // Handle truck selection
  const handleSelectTruck = (truck: Truck) => {
    setSelectedTruck((prev) => (prev?.id === truck.id ? null : truck));
  };

  // Handle form submission (Post API)
  const handleSubmit = async () => {
    if (!selectedTruck || !selectedProgramId || !liters || !purchase_id) {
      console.log("Submitted Program ID:", selectedProgramId);
      console.log("Submitted Liters:", liters);
      alert("Please select a truck and enter liters.");
      return;
    }

    const payload = {
      truck_id: selectedTruck.id,
      program_id: selectedProgramId,
      liters: Number(liters),
      purchase_id: purchase_id,
    };

    try {
      const response = await axios.post(
        "https://tms.sdssn.org/api/marketers/program-trucks",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Data submitted successfully!");
      console.log(response.data);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };
  console.log("Passed liters:", liters);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-lg text-black"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Select a Truck
        </h2>

        {loading && (
          <p className="text-center text-blue-500">Loading trucks...</p>
        )}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {!loading && !error && (
          <div>
            <ul className="space-y-2">
              {trucks.map((truck) => (
                <li
                  key={truck.id}
                  className={`p-3 border rounded cursor-pointer hover:bg-gray-100 text-black ${
                    selectedTruck?.id === truck.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSelectTruck(truck)}
                >
                  🚛 {truck.name} ({truck.truck_number})
                </li>
              ))}
            </ul>

            {selectedTruck && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-center text-black">
                  <strong>Selected Truck:</strong> {selectedTruck.name}
                </p>
                <p className="text-center text-black">
                  <strong>Driver:</strong>{" "}
                  {selectedTruck.driver
                    ? `${selectedTruck.driver.first_name} ${selectedTruck.driver.last_name}`
                    : "N/A"}
                </p>
              </div>
            )}

            {selectedProgramId && programDetails && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-center text-black">
                  <strong>Selected Program:</strong> {programDetails.name}
                </p>
                <p className="text-center text-black">
                  <strong>Liters Available:</strong> {programDetails.liters}
                </p>
                <input
                  type="number"
                  placeholder="Enter Liters to Lift"
                  className="w-full mt-2 p-2 border rounded"
                  value={newliters === "" ? "" : newliters} // Ensure it's correctly handled
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setNewLiters("");
                    } else if (!isNaN(Number(value))) {
                      setNewLiters(Number(value));
                    }
                  }}
                />
              </div>
            )}

            <button
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit Assignment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrucksTableModal

