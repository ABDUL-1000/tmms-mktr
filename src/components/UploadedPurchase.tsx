"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MoreVerticalIcon } from "lucide-react"; // Import the MoreVerticalIcon

interface PurchaseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchase: any; // or define the type of purchase if you know it
}

// Modal component for viewing purchase details
const PurchaseDetailsModal = ({ isOpen, onClose, purchase }: PurchaseDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Purchase Details</h3>
        <div className="mb-2">
          <strong>Liters:</strong> {purchase.liters}
        </div>
        <div className="mb-2">
          <strong>Amount (NGN):</strong> {purchase.amount}
        </div>
        <div className="mb-4">
          <strong>Bank Details:</strong> {purchase.bank_details || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Bank Details:</strong> {purchase.bank_details || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Bank Details:</strong> {purchase.bank_details || "N/A"}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const PurchasePaymentProofPage = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionDropdown, setActionDropdown] = useState<number | null>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<any | null>(null); // To store selected purchase data
  const router = useRouter();

  // Fetch payment proofs
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "https://tms.sdssn.org/api/marketers/purchase-payment-proofs"
        );
        setPayments(response.data.data);
      } catch (err) {
        setError("Failed to fetch payment proofs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Fetch purchase details for a particular payment
  const fetchPurchaseDetails = async (purchaseId: string) => {
    try {
      const response = await axios.get(
        `https://tms.sdssn.org/api/marketers/purchases/${purchaseId}`
      );
      const purchase = response.data.data;
      setSelectedPurchase({
        liters: purchase.liters,
        amount: purchase.amount || "N/A", // Assuming `amount` might not be directly available in the response
        bank_details: purchase.comment || "N/A", // Using `comment` as a placeholder for bank details
      });
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  };

  // Handle downloading the receipt
  const handleDownloadReceipt = (url: string) => {
    window.open(url, "_blank");
  };

  // Handle viewing the purchase
  const handleViewPurchase = (purchaseId: string) => {
    fetchPurchaseDetails(purchaseId); // Fetch the purchase details when viewing
    setActionDropdown(null); // Close the action dropdown
  };

  // Handle adding a new program
  
  if (loading) return <p>Loading payment proofs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Purchase Payment Proofs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Bank Name</th>
              <th className="border p-2">Liters</th>
              <th className="border p-2">Reference Number</th>
              <th className="border p-2">Amount (NGN)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="border p-2">{payment.id}</td>
                <td className="border p-2">{payment.bank_name}</td>
                <td className="border p-2">{payment.purchase.liters}</td>
                <td className="border p-2">{payment.reference_number}</td>
                <td className="border p-2">{payment.amount}</td>
                <td className="border p-2 relative">
                  <MoreVerticalIcon
                    className="cursor-pointer"
                    onClick={() =>
                      setActionDropdown(actionDropdown === index ? null : index)
                    }
                  />
                  {actionDropdown === index && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <button
                            className="block w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleDownloadReceipt(payment.receipt_url)}
                          >
                            Download Receipt
                          </button>
                        </li>
                        <li>
                          <button
                            className="block w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleViewPurchase(payment.purchase_id)}
                          >
                            View Purchase
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
      </div>

      {/* Modal for Purchase Details */}
      <PurchaseDetailsModal
        isOpen={!!selectedPurchase}
        onClose={() => setSelectedPurchase(null)}
        purchase={selectedPurchase}
      />
    </div>
  );
};

export default PurchasePaymentProofPage;
