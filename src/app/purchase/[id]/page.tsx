'use client';

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Purchase } from "@/auth/types/purchaseTypes";

// export interface Purchase {
//   id: string;
//   name: string;
//   refinery: {
//     status: string;
//     updated_at:string;
//     purchase_type: string;
//     description: string;
//   };
//   amountCostNGN: number;
//   amountCostUSD: number;
//   lastUpdated: string;
//   status: string;
//   price: string;
//   query: string;
//   updated_at: string;
//   purchase_type: string;
//   description: string;
// }

const purchaseDetailPage = () => {
  const params = useParams()
  const id = params.id // Note: Changed from 'query' to 'id'
  console.log('purchase ID:', id);


  const [purchase, setpurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before making the API call

    const fetchpurchase = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/purchases/${id}`
        );
        setpurchase(response.data); // Update the purchase state with fetched data
      } catch (err) {
        setError("Failed to fetch purchase details.");
      } finally {
        setLoading(false);
      }
    };

    fetchpurchase();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!purchase) {
    return <p>purchase not found.</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
  <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
    {purchase.data.product.product_type.name}
  </h2>
  <div className="text-gray-600 space-y-3">
    <p className="text-lg">
      <span className="font-medium text-gray-800">Amount (NGN):</span> {purchase.data.amount}</p>
    
    <p>Liters: {purchase.data.liters}</p>
  
    <p>
              Purchased At:{" "}
              {new Date(purchase.data.created_at).toLocaleString()}
            </p>
  </div>
  <button className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
    Edit purchase
  </button>
</div>

  );
};

export default purchaseDetailPage;
