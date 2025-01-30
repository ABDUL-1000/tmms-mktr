'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For accessing URL parameters

const SinglePurchasePage = () => {
  const { id } = useParams(); // Get the payment ID from the URL
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/purchase-payment-proofs/${id}`
        );
        setPayment(response.data.data);
      } catch (err) {
        console.error('Error fetching payment details:', err);
        setError('Failed to fetch payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]); // Run the effect when the ID changes

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment Proof Details</h2>
      {payment ? (
        <div>
          <p><strong>ID:</strong> {payment.id}</p>
          <p><strong>Bank Name:</strong> {payment.bank_name}</p>
          <p><strong>Reference Number:</strong> {payment.reference_number}</p>
          <p><strong>Amount:</strong> {payment.amount} NGN</p>
          <p><strong>Date:</strong> {payment.date}</p>
          {/* Display any other details you need */}
        </div>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
};

export default SinglePurchasePage;
