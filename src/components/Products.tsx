'use client';
import { useEffect, useState } from "react";
import { getAllProducts, Product } from "@/lib/getAllProducts";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"view" | "purchase">("view");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [liters, setLiters] = useState('');
  const [totalNaira, setTotalNaira] = useState<number>(0);
  const [totalUSD, setTotalUSD] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

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
    setLiters("");
    setTotalNaira(0);
    setTotalUSD(0);
    setShowModal(true);
  };

  const handleLitersChange = (value: string) => {
    const liters = parseFloat(value) || 0;
    setLiters(liters.toString());

    if (selectedProduct) {
      const pricePerLiter = Number(selectedProduct.price);
      setTotalNaira(pricePerLiter * liters);
      setTotalUSD((pricePerLiter * liters) / 750);
    }
  };

  const handleConfirmPurchase = async () => {
    const litersValue = parseFloat(liters);
    if (!selectedProduct || isNaN(litersValue) || litersValue <= 0) {
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
      const response = await axios.request(options);
      setShowNotification(true);
      setShowModal(false);
      console.log(response.data);
      router.push(`/purchase?product=${selectedProduct.id}&liters=${liters}&total=${totalNaira}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your purchase. Please try again.");
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500 text-white rounded-full px-3 py-1 text-xs";
      case "pending":
        return "bg-yellow-500 text-white rounded-full px-3 py-1 text-xs";
      case "regect":
        return "bg-red-500 text-white rounded-full px-3 py-1 text-xs";
      default:
        return "bg-gray-400 text-white rounded-full px-3 py-1 text-xs";
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
              <td className="px-4 py-2">{new Date(product.updated_at).toDateString()}</td>
              <td className="px-4 py-2">
                <span className={getStatusClass(product.status)}>{product.status}</span>
              </td>
              <td className="px-4 py-2">
                <select
                  className="border rounded px-2 py-1"
                  onChange={(e) => handleModalOpen(product, e.target.value as "view" | "purchase")}
                >
                  <option value="">Select Action</option>
                  <option value="view">View</option>
                  <option value="purchase">Purchase</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h3 className="text-lg font-semibold mb-2">{modalType === "view" ? "Product Details" : "Confirm Purchase"}</h3>
            <p>Product: <span className="text-blue-500 font-medium">{selectedProduct.product_type.name}</span></p>
            <p>Refinery: {selectedProduct.refinery.user.name}</p>
            <p>Price per liter: {selectedProduct.price}</p>
            <p>Status: {selectedProduct.status}</p>

            {modalType === "purchase" && (
              <>
                <input type="number" value={liters} onChange={(e) => handleLitersChange(e.target.value)} placeholder="Enter liters" className="w-full mt-4 px-3 py-2 border rounded-md" />
                <div className="mt-4">
                  <p>Total (NGN): {formatCurrency(totalNaira)}</p>
                  <p>Total (USD): ${totalUSD.toFixed(2)}</p>
                </div>
                <button onClick={handleConfirmPurchase} className="mt-4 w-full bg-green-500 text-white py-2 rounded-md">Confirm Purchase</button>
              </>
            )}

            <button onClick={() => setShowModal(false)} className="mt-4 text-gray-600 hover:underline">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
