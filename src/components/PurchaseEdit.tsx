import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Purchase } from '@/auth/types/purchaseTypes';

interface EditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseId: number | null;
  onUpdatePurchase: (updatedPurchase: Purchase) => void;
}

const EditPurchaseModal: React.FC<EditPurchaseModalProps> = ({ isOpen, onClose, purchaseId, onUpdatePurchase }) => {
  const [liters, setLiters] = useState<number>(0);
  const [productId, setProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add successMessage state
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to control popup visibility

  useEffect(() => {
    if (purchaseId) {
      setLoading(true);
      setError(null);
      axios
        .get(`https://tms.sdssn.org/api/marketers/purchases/${purchaseId}`)
        .then((response) => {
          console.log('Fetched Purchase Data:', response.data);
          setLiters(response.data.data.liters);
          setProductId(response.data.data.product_id);
        })
        .catch((error) => {
          console.error('Error fetching purchase details:', error);
          setError('Failed to fetch purchase details.');
        })
        .finally(() => setLoading(false));
    }
  }, [purchaseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiters(Number(e.target.value));
  };
  const handleSuccess = () => {
    setSuccessMessage("Purchase updated successfully!");
    setTimeout(() => setSuccessMessage(null), 3000); // Hide the message after 3 seconds
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) {
      alert('Error: Product ID not found. Please try again.');
      return;
    }

    try {
      const response = await axios.put(
        `https://tms.sdssn.org/api/marketers/purchases/${purchaseId}`,
        { product_id: productId, liters },
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
 
      );


      console.log('Update successful:', response.data);
      onUpdatePurchase(response.data.data);
      handleSuccess()
      setShowPopup(true); // Show the success popup
      setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
      onClose();
    } catch (error: any) {
      console.error('Error updating purchase:', error);
      alert(`Error: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Purchase</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="liters" className="block font-medium">Liters</label>
            <input
              type="number"
              name="liters"
              value={liters}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              placeholder="Enter new liters"
            />

            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        )}
        {successMessage && (
  <div className="bg-green-500 text-white p-2 rounded-lg mb-4">
    {successMessage}
  </div>
)}
      
      </div>
    </div>
  );
};

export default EditPurchaseModal;
