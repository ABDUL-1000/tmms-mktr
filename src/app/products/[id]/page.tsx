'use client';

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  id: string;
  name: string;
  refinery: {
    status: string;
    updated_at:string;
    product_type: string;
    description: string;
  };
  amountCostNGN: number;
  amountCostUSD: number;
  lastUpdated: string;
  status: string;
  price: string;
  query: string;
  updated_at: string;
  product_type: string;
  description: string;
}

const ProductDetailPage = () => {
  const params = useParams()
  const id = params.id // Note: Changed from 'query' to 'id'
  console.log('Product ID:', id);


  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before making the API call

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/products/${id}`
        );
        setProduct(response.data); // Update the product state with fetched data
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
  <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
    {product.product_type}
  </h2>
  <div className="text-gray-600 space-y-3">
    <p className="text-lg">
      <span className="font-medium text-gray-800">Amount (NGN):</span> {product.price}
    </p>
    <p className="text-lg">
      {/* <span className="font-medium text-gray-800">Amount (USD):</span> {product.amount_usd || 'N/A'} */}
    </p>
    <p className="text-lg">
      <span className="font-medium text-gray-800">Status:</span> {product.status}
    </p>
    <p className="text-lg">
      <span className="font-medium text-gray-800">Description:</span> {product.description}
    </p>
    <p className="text-lg">
      <span className="font-medium text-gray-800">Last Updated:</span> {product.updated_at}
    </p>
  </div>
  <button className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
    Edit Product
  </button>
</div>

  );
};

export default ProductDetailPage;
