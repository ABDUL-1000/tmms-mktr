'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import Link from 'next/link';

const PurchasePaymentProofPage = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://tms.sdssn.org/api/marketers/purchase-payment-proofs');
        console.log(response.data, 'API Response'); // Debugging
        setPayments(response.data.data); // ✅ Extract the `data` array correctly
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to fetch payment proofs.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const downloadPDF = (payment: any) => {
    const doc = new jsPDF();
    
    // Add payment details to the PDF
    doc.text(`ID: ${payment.id}`, 10, 10);
    doc.text(`Bank Name: ${payment.bank_name}`, 10, 20);
    doc.text(`Reference Number: ${payment.reference_number}`, 10, 30);
    doc.text(`Amount: ${payment.amount} NGN`, 10, 40);
    
    // Add any additional details or styles if needed

    // Save the PDF
    doc.save(`payment-proof-${payment.id}.pdf`);
  };

  if (loading) return <p>Loading payment proofs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Purchase Payment Proofs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Bank Name</th>
              <th className="border p-2">Reference Number</th>
              <th className="border p-2">Amount (NGN)</th>
              <th className="border p-2">Proof</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                
                <tr key={payment.id} className="text-center">
                  <td className="border p-2">{payment.id}</td>
                  <td className="border p-2">{payment.bank_name}</td>
                  <td className="border p-2">{payment.reference_number}</td>
                  <td className="border p-2">{payment.amount}</td>
                  <td className="border p-2">
                  <Link
                    href={`/uploaded-payed-purchase/${payment.id}`} // Navigate to the SinglePurchasePage
                      className="text-blue-500 underline"
                    >
                      View Payment Details
                    </Link>
                    <button
                      onClick={() => downloadPDF(payment)} // Trigger the PDF download
                      className="text-blue-500 underline"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center border p-4">
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasePaymentProofPage;
