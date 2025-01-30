'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchasePaymentProofId: string | number;
}

const UploadReceiptModal: React.FC<UploadReceiptModalProps> = ({ isOpen, onClose, purchasePaymentProofId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [bankName, setBankName] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !bankName || !referenceNumber || !amount) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('purchase_id', String(purchasePaymentProofId));
    formData.append('file', file);
    formData.append('bank_name', bankName);
    formData.append('reference_number', String(referenceNumber));
    formData.append('amount', String(amount));
    formData.append('currency', 'NGN');

    try {
      await axios.post(
        'https://tms.sdssn.org/api/marketers/purchase-payment-proofs',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );
      alert('Payment proof uploaded successfully.');
      onClose();
      window.location.href = '/uploaded-payed-purchase'; // Redirect after success
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload payment proof. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload Payment Proof</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Reference Number" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} className="border p-2 w-full mb-2" />
          <input type="number" placeholder="Amount (NGN)" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 w-full mb-2" />
          <div className="flex justify-between mt-4">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReceiptModal;
