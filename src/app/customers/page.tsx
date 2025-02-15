"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import toaster

import Loader from "@/components/Loader";
import Navigation from "@/components/Navbar";
import { createCustomer } from "@/auth/types/customer";
import Sidebar from "@/components/SideBar";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    previous_page_url: null,
  });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    other_name: "",
    phone_number: "",
    password: "",
    address: "",
    city: "",
    country: "",
    state: "",
    password_confirmation: "",
  });

  const fetchCustomers = async (url = "https://tms.sdssn.org/api/marketers/customers") => {
    setLoading(true);
    try {
      const response = await axios.get(url, { headers: { Accept: "application/json" } });
      setCustomers(response.data.data);
      setPagination({
        current_page: response.data.metadata.current_page,
        last_page: response.data.metadata.last_page,
        next_page_url: response.data.metadata.next_page_url,
        previous_page_url: response.data.metadata.previous_page_url,
      });
    } catch (err) {
      setError("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    try {
      await createCustomer(newCustomer);
      setShowModal(false);
      fetchCustomers(); // Refresh customer list
      toast.success("Customer created successfully!"); // Toaster notification
    } catch (err: any) {
      console.error("Error response:", err.response?.data); // Log the error response
      alert(err.response?.data?.message || "Error creating customer");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
      <Toaster position="top-right" /> {/* Toaster Component */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customers</h2>

        {/* CREATE CUSTOMER BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          + Create Customer
        </button>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={customer.id} className="text-center border-b hover:bg-gray-100">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">
                      {customer.first_name} {customer.last_name}
                    </td>
                    <td className="p-3 border">{customer.phone_number}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-3 text-center text-gray-500">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Create New Customer</h2>

              <input
                type="text"
                placeholder="First Name"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Other Name"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, other_name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, phone_number: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, password_confirmation: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Country"
                className="border p-2 w-full mb-1"
                onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
              />

              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                  onClick={handleCreateCustomer}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
          </div>
        </div>
      </div>
    
  );
};

export default CustomersPage;
