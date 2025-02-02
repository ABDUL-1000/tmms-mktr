import React from "react";

interface Purchase {
  id: number;
  name: string;
  refinery_name: string;
  liters: number;
  amount: number;
  status: string;
  created_at: string;
}

interface ViewPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchase?: Purchase; // Optional to prevent errors
}

const ViewPurchaseModal: React.FC<ViewPurchaseModalProps> = ({
  isOpen,
  onClose,
  purchase,
}) => {
  if (!isOpen || !purchase) return null; // Prevent rendering if no purchase

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">Purchase:</span> {purchase.name}
          </p>
          <p>
            <span className="font-semibold">Refinery:</span> {purchase.refinery_name}
          </p>
          <p>
            <span className="font-semibold">Liters:</span> {purchase.liters}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ₦
            {Number(purchase.amount).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
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
          </p>
          <p>
            <span className="font-semibold">Purchased At:</span>{" "}
            {new Date(purchase.created_at).toLocaleString()}
          </p>
        </div>

        {/* Close Button */}
        <button
          className="mt-5 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewPurchaseModal;