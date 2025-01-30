'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditPurchaseModal = ({ productId, onClose }: any) => {
  const [productData, setProductData] = useState({ product_id: 0, liters: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://tms.sdssn.org/api/marketers/purchases/${productId}`
      );
      setProductData(response.data); // Pre-fill with the existing product data
    } catch (err) {
      setError('Failed to load product details');
    }
  };

  useEffect(() => {
    if (productId !== null) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const options = {
        method: 'PUT',
        url: `https://tms.sdssn.org/api/marketers/purchases/${productId}`,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { product_id: productData.product_id, liters: productData.liters },
      };

      const response = await axios.request(options);
      console.log('Product updated:', response.data);
      onClose(); // Close the modal on success
    } catch (error) {
      setError('Failed to update product.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div>
          <label className="block mb-2">Product ID:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
            value={productData.product_id}
            onChange={(e) => setProductData({ ...productData, product_id: parseInt(e.target.value) })}
          />
          <label className="block mb-2">Liters:</label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
            value={productData.liters}
            onChange={(e) => setProductData({ ...productData, liters: parseInt(e.target.value) })}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={handleSaveChanges}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
