'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  pricePerLiter: number;
  refinery: {
    user: {
      name: string;
      email: string;
    };
    status: string;
    updated_at: number;
  };
  product_type: {
    name: string;
  };
  amountCostNGN: number;
  amountCostUSD: number;
  lastUpdated: string;
  status: string;
  price: string;
  updated_at: number;
}

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token provided");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("https://tms.sdssn.org/api/marketers/products", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", data);

        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setError("Unexpected data format.");
        }
      } catch (error: any) {
        console.error("Error fetching products:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
