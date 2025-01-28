"use client";

import { getAllProducts, Product } from "@/lib/getAllProducts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"view" | "purchase">("view");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [liters, setLiters] = useState<number>(0);
  const [totalNaira, setTotalNaira] = useState<number>(0);
  const [totalUSD, setTotalUSD] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();
        if (Array.isArray(productData)) {
          setProducts(productData);
        } else {
          setError("Unexpected data format.");
        }
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleModalOpen = (product: Product, type: "view" | "purchase") => {
    setSelectedProduct(product);
    setModalType(type);
    setLiters(0); // Reset liters input for purchase
    setTotalNaira(0);
    setTotalUSD(0);
    setShowModal(true);
  };

  const handleLitersChange = (value: string) => {
    const liters = parseFloat(value) || 0;
    setLiters(liters);

    if (selectedProduct) {
      const pricePerLiter = Number(selectedProduct.price); // Ensure price is a number
      setTotalNaira(pricePerLiter * liters);
      setTotalUSD((pricePerLiter * liters) / 750); // Assuming conversion rate 1 USD = 750 NGN
    }
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct || liters <= 0) {
      alert("Please enter a valid number of liters.");
      return;
    }
  
    const options = {
      method: "POST",
      url: "https://tms.sdssn.org/api/marketers/purchases",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      data: { product_id: selectedProduct.id, liters },
    };
  
    try {
      await axios.request(options);
      setShowNotification(true);
      setShowModal(false);
  
      // Redirect to the purchase page
      router.push(`/purchase-success?product=${selectedProduct.id}&liters=${liters}&total=${totalNaira}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your purchase. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-x-auto py-2">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Refinery</th>
            <th className="px-4 py-2">Amount (NGN)</th>
            <th className="px-4 py-2">Last Updated</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2">{product.product_type.name}</td>
              <td className="px-4 py-2">{product.refinery.user.name}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.updated_at}</td>
              <td className="px-4 py-2">{product.status}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => handleModalOpen(product, "view")}
                >
                  View
                </button>
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => handleModalOpen(product, "purchase")}
                >
                  Purchase
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h3 className="text-lg font-semibold mb-2">
              {modalType === "view" ? "Product Details" : "Confirm Purchase"}
            </h3>
            <p>
              Product: <span className="text-blue-500 font-medium">{selectedProduct.product_type.name}</span>
            </p>
            <p>Refinery: {selectedProduct.refinery.user.name}</p>
            <p>Price per liter: {selectedProduct.price} NGN</p>
            <p>Status: {selectedProduct.status}</p>

            {modalType === "purchase" && (
              <>
                <input
                  type="number"
                  value={liters}
                  onChange={(e) => handleLitersChange(e.target.value)}
                  placeholder="Enter liters"
                  className="w-full mt-4 px-3 py-2 border rounded-md"
                />
                <div className="mt-4">
                  <p>Total (NGN): <span className="font-medium">{totalNaira.toFixed(2)}</span></p>
                  <p>Total (USD): <span className="font-medium">{totalUSD.toFixed(2)}</span></p>
                </div>
              </>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg text-sm hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {modalType === "purchase" && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  onClick={handleConfirmPurchase}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-transform transform animate-slide-in">
          You have successfully purchased the product!
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
