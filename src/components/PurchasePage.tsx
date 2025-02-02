"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { MoreVerticalIcon } from "lucide-react";
import EditPurchaseModal from "./PurchaseEdit";
import UploadReceiptModal from "./UploadReciept";
import ViewPurchaseModal from "@/lib/purchaseView";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

interface Purchase {
  id: number;
  name: string;
  refinery_name: string;
  liters: number;
  amount: number;
  status: string;
  created_at: string;
}

const PurchasePage = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(null);
  const [actionDropdown, setActionDropdown] = useState<number | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedEditPurchaseId, setSelectedEditPurchaseId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [viewedPurchase, setViewedPurchase] = useState<Purchase | null>(null);

  // Fetch all purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const { data } = await axios.get(
          "https://tms.sdssn.org/api/marketers/purchases",
          { headers: { Accept: "application/json" } }
        );
        setPurchases(data.data);
        setFilteredPurchases(data.data);
      } catch (err) {
        setError("Failed to fetch Purchases.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // Fetch details of a single purchase
  const fetchPurchaseDetails = async (purchaseId: number) => {
    try {
      const { data } = await axios.get(
        `https://tms.sdssn.org/api/marketers/purchases/${purchaseId}`,
        { headers: { Accept: "application/json" } }
      );
      setViewedPurchase(data);
      setOpenViewModal(true);
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  };

  // Handle updating a purchase
  const handleUpdatePurchase = (updatedPurchase: Purchase) => {
    setPurchases((prevPurchases) =>
      prevPurchases.map((purchase) =>
        purchase.id === updatedPurchase.id ? updatedPurchase : purchase
      )
    );
    setFilteredPurchases((prevFilteredPurchases) =>
      prevFilteredPurchases.map((purchase) =>
        purchase.id === updatedPurchase.id ? updatedPurchase : purchase
      )
    );
    toast.success("Purchase updated successfully!"); // Toast for successful edit
  };

  // Handle filter change
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setFilteredPurchases(
      purchases.filter((purchase) =>
        status === "" ? true : purchase.status.toLowerCase() === status.toLowerCase()
      )
    );
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    setFilteredPurchases(
      purchases.filter(
        (purchase) =>
          purchase.name.toLowerCase().includes(lowerQuery) ||
          purchase.refinery_name.toLowerCase().includes(lowerQuery)
      )
    );
  };

  // Open the upload receipt modal
  const openReceiptModal = (purchaseId: number) => {
    setSelectedPurchaseId(purchaseId);
    setOpenModal(true);
  };

  // Close the upload receipt modal
  const closeReceiptModal = () => {
    setOpenModal(false);
    setSelectedPurchaseId(null);
  };

  // Handle successful file upload
  const handleUploadSuccess = () => {
    toast.success("File uploaded successfully!"); // Toast for successful upload
    closeReceiptModal();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="overflow-x-auto py-4">
        <h2 className="text-2xl font-semibold mb-4">Your Purchases</h2>

        {/* Search & Filter */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Purchase or refinery name..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/3"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approve">Approved</option>
            <option value="failed">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-2">Purchase</th>
              <th className="px-4 py-2">Refinery</th>
              <th className="px-4 py-2">Liters</th>
              <th className="px-4 py-2">Amount (NGN)</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Purchased At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((purchase) => (
              <tr key={purchase.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{purchase.name}</td>
                <td className="px-4 py-2">{purchase.refinery_name}</td>
                <td className="px-4 py-2">{purchase.liters}</td>
                <td className="px-4 py-2">{purchase.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${
                      purchase.status === "approve"
                        ? "bg-green-500"
                        : purchase.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(purchase.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 relative">
                  <MoreVerticalIcon
                    className="cursor-pointer"
                    onClick={() => setActionDropdown(actionDropdown === purchase.id ? null : purchase.id)}
                  />
                  {actionDropdown === purchase.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <button
                            className="block w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              openReceiptModal(purchase.id);
                              setActionDropdown(null);
                            }}
                          >
                            Upload Payment
                          </button>
                        </li>
                        <li>
                          <button
                            className="block w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              fetchPurchaseDetails(purchase.id);
                              setActionDropdown(null);
                            }}
                          >
                            View Purchase
                          </button>
                        </li>
                        <li>
                          <button
                            className="block w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedEditPurchaseId(purchase.id);
                              setOpenEditModal(true);
                              setActionDropdown(null);
                            }}
                          >
                            Edit Purchase
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Upload Receipt Modal */}
        {openModal && selectedPurchaseId && (
          <UploadReceiptModal
            isOpen={openModal}
            onClose={closeReceiptModal}
            purchasePaymentProofId={selectedPurchaseId}
            onUploadSuccess={handleUploadSuccess} // Pass the success handler
          />
        )}

        {/* Edit Purchase Modal */}
        {openEditModal && selectedEditPurchaseId && (
          <EditPurchaseModal
            isOpen={openEditModal}
            onClose={() => setOpenEditModal(false)}
            purchaseId={selectedEditPurchaseId}
            onUpdatePurchase={handleUpdatePurchase}
          />
        )}

        {/* View Purchase Modal */}
        {openViewModal && viewedPurchase && (
          <ViewPurchaseModal
            isOpen={openViewModal}
            onClose={() => setOpenViewModal(false)}
            purchase={viewedPurchase}
          />
        )}

        {/* Toast Notifications */}
        <Toaster position="bottom-right" />
      </div>
    </Suspense>
  );
};

export default PurchasePage;