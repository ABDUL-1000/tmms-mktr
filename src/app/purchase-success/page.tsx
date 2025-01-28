"use client";
import { useSearchParams, useRouter } from "next/navigation";

const PurchaseSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve values from query parameters
  const product = searchParams.get("product") || "N/A";
  const liters = searchParams.get("liters") || "0";
  const total = searchParams.get("total") || "0";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-green-600">Purchase Successful!</h2>
        <p className="mt-4">Thank you for purchasing!</p>
        <p>Product ID: <span className="font-medium">{product}</span></p>
        <p>Liters Purchased: <span className="font-medium">{liters}</span></p>
        <p>Total Amount (NGN): <span className="font-medium">{total}</span></p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/purchase")}
        >
          proceed to view purchase
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
