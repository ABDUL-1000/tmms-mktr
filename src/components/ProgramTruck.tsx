"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { headers } from "next/headers";
import Loader from "./Loader";

// Define program truck structure
interface ProgramTruck {
  id: number;
  program_id: number;
  truck_id: number;
  liters: number;
  status: string;
  customer_status: string;
  driver_status: string;
  created_at: string;
}

// Define customer structure
interface Customer {
  id: number;
  first_name: string;
  last_name: string;
}

const ProgramTrucksTable: React.FC = () => {
  const [programTrucks, setProgramTrucks] = useState<ProgramTruck[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTruck, setSelectedTruck] = useState<ProgramTruck | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [litersLifted, setLitersLifted] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Fetch program trucks
  useEffect(() => {

    const fetchProgramTrucks = async () => {
      try {
        const response = await axios.get("https://tms.sdssn.org/api/marketers/program-trucks",  { headers:
          { Accept: "application/json", Authorization: `Bearer ${token}` } 
         });
        setProgramTrucks(response.data.data);
      } catch (err) {
        setError("Failed to fetch program trucks");
      } finally {
        setLoading(false);
      }
    };

    fetchProgramTrucks();
  }, []);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://tms.sdssn.org/api/marketers/customers", { headers:
          { Accept: "application/json", Authorization: `Bearer ${token}` } 
         });
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Open modal
  const openEditModal = (truck: ProgramTruck) => {
    setSelectedTruck(truck);
    setSelectedCustomer("");
    setLitersLifted("");
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  // Update Program Truck API Call
  const updateProgramTruck = async () => {
    if (!selectedTruck || !selectedCustomer) {
      toast.error("Please select a customer and enter liters lifted.");
      return;
    }
    
    try {
      await axios.put(
        `https://tms.sdssn.org/api/marketers/program-trucks/${selectedTruck.id}`,
        
        {
          truck_id: selectedTruck.truck_id,
          liters: selectedTruck.liters,
          customer_id: selectedCustomer,
          liters_lifted: litersLifted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      
      toast.success("Customer successfully added!");
      setModalIsOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Error updating Program Truck.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Program Trucks</h2>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {loading && <p className="text-center text-blue-500"><Loader/></p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Program ID</th>
                <th className="py-3 px-6 text-left">Truck ID</th>
                <th className="py-3 px-6 text-left">Liters</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Customer's Status</th>
                <th className="py-3 px-6 text-left">Delivery Status</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {programTrucks.map((truck) => (
                <tr key={truck.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{truck.id}</td>
                  <td className="py-3 px-6">{truck.program_id}</td>
                  <td className="py-3 px-6">{truck.truck_id}</td>
                  <td className="py-3 px-6">{truck.liters}</td>
                  <td className="py-3 px-6">  <span
                    className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${
                      truck.status === "approve"
                        ? "bg-green-500"
                        : truck.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {truck.status}
                  </span></td>
                  <td className="py-3 px-6">{truck.customer_status === 'pending' ? 'Not Assigned' : 'Assigned'}</td>
                  <td className="py-3 px-6">{truck.driver_status}</td>
                  <td className="py-3 px-6">{new Date(truck.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => openEditModal(truck)}>
                      <MoreVertical className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Edit Program Truck</h2>

        <label className="block text-gray-700">Select Customer:</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">-- Select a Customer --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.first_name} {customer.last_name}
            </option>
          ))}
        </select>

        <label className="block text-gray-700">Liters Lifted:</label>
        <input
          type="number"
          value={litersLifted}
          onChange={(e) => setLitersLifted(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end space-x-3">
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={updateProgramTruck} className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProgramTrucksTable;
