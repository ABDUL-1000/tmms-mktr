'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import UploadReceiptModal from './UploadReciept';
import { MoreVerticalIcon } from 'lucide-react';

interface Purchase {
  id: number;
  name: string;
  refinery_name: string;
  liters: number;
  amount: number;
  status: string;
  created_at: string;
  data: {
    status: string;
  };
}
const ActionModal = ({ onClose, onEdit, onView, onUpload }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg">
      <ul className="space-y-2">
        <li>
          <button
            className="text-blue-600"
            onClick={() => {
              onUpload(); // Handle upload payment
              onClose();
            }}
          >
            Upload Payment
          </button>
        </li>
        <li>
          <button
            className="text-blue-600"
            onClick={() => {
              onView(); // Handle view purchase
              onClose();
            }}
          >
            View Purchase
          </button>
        </li>
        <li>
          <button
            className="text-blue-600"
            onClick={() => {
              onEdit(); // Handle edit purchase
              onClose();
            }}
          >
            Edit Purchase
          </button>
        </li>
      </ul>
    </div>
  </div>
);

const PurchasePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve values from query parameters
  const Purchase = searchParams.get("Purchase") || "N/A";
  const liters = searchParams.get("liters") || "0";
  const total = searchParams.get("total") || "0";
  
  const [Purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>(''); // For filtering by status
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal state to open/close
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(null); // Store selected Purchase ID

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://tms.sdssn.org/api/marketers/purchases',
          headers: { Accept: 'application/json' },
        };
        const { data } = await axios.request(options);
        console.log('Fetched Purchase data:', data.data);
        setPurchases(data.data);
        setFilteredPurchases(data.data); // Initial load: display all Purchases
      } catch (err) {
        setError('Failed to fetch Purchases.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // Filter Purchases by status
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setFilteredPurchases(
      Purchases.filter((Purchase) =>
        status === '' ? true : Purchase.status.toLowerCase() === status.toLowerCase()
      )
    );
  };

  // Search Purchases by name or refinery name
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    setFilteredPurchases(
      Purchases.filter(
        (Purchase) =>
          Purchase.name.toLowerCase().includes(lowerQuery) ||
          Purchase.refinery_name.toLowerCase().includes(lowerQuery)
      )
    );
  };

  // Function to open the modal and set selected Purchase ID
  const openReceiptModal = (PurchaseId: number) => {
    setSelectedPurchaseId(PurchaseId);
    setOpenModal(true);
  };

  // Close the modal
  const closeReceiptModal = () => {
    setOpenModal(false);
    setSelectedPurchaseId(null); // Reset the selected Purchase ID when closing
  };

  return (
    <div className="overflow-x-auto py-4">
      <h2 className="text-2xl font-semibold mb-4">Your Purchases</h2>
      
      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Purchase or refinery name..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/3"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        {/* Filter Dropdown */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Purchase Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Purchase</th>
            <th className="px-4 py-2">Refinery</th>
            <th className="px-4 py-2">Liters</th>
            <th className="px-4 py-2">Amount (NGN)</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Purchased At</th>
            <th className="px-4 py-2">Actions</th> {/* Added actions column */}
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((Purchase) => (
            <tr key={Purchase.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2">{Purchase.name}</td>
              <td className="px-4 py-2">{Purchase.refinery_name}</td>
              <td className="px-4 py-2">{Purchase.liters}</td>
              <td className="px-4 py-2">{Purchase.amount}</td>
              <td className="px-4 py-2">{Purchase.status}</td>
              <td className="px-4 py-2">{new Date(Purchase.created_at).toLocaleString()}</td>
              <td className="px-4 py-2">
                <MoreVerticalIcon
                  className="cursor-pointer"
                  onClick={() => openReceiptModal(Purchase.id)
                    
                  }
                
                   // Open modal for the selected Purchase
                />
              </td>
            </tr>
          ))}
  
        </tbody>
      </table>
  

      {/* Modal Component for Uploading Receipt */}
      {openModal && selectedPurchaseId && (
        <UploadReceiptModal
          isOpen={openModal}
          onClose={closeReceiptModal}
          purchasePaymentProofId={selectedPurchaseId}
        />
      )}
    </div>
  );
};

export default PurchasePage;
