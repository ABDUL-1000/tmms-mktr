'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Purchase {
  id: number;
  product_name: string;
  refinery_name: string;
  liters: number;
  amount: number;
  status: string;
  purchased_at: string;
}

const PurchasePage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>(''); // For filtering by status
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://tms.sdssn.org/api/marketers/purchases/1',
          headers: { Accept: 'application/json' },
        };
        const { data } = await axios.request(options);
        setPurchases(data);
        setFilteredPurchases(data); // Initial load: display all purchases
      } catch (err) {
        setError('Failed to fetch purchases.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // Filter purchases by status
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setFilteredPurchases(
      purchases.filter((purchase) =>
        status === '' ? true : purchase.status.toLowerCase() === status.toLowerCase()
      )
    );
  };

  // Search purchases by product or refinery name
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    setFilteredPurchases(
      purchases.filter(
        (purchase) =>
          purchase.product_name.toLowerCase().includes(lowerQuery) ||
          purchase.refinery_name.toLowerCase().includes(lowerQuery)
      )
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-x-auto py-4">
      <h2 className="text-2xl font-semibold mb-4">Your Purchases</h2>
      <div className="flex items-center justify-between mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by product or refinery name..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/3"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        {/* Filter Dropdown */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Purchase Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Refinery</th>
            <th className="px-4 py-2">Liters</th>
            <th className="px-4 py-2">Amount (NGN)</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Purchased At</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.length > 0 ? (
            filteredPurchases.map((purchase) => (
              <tr key={purchase.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{purchase.product_name}</td>
                <td className="px-4 py-2">{purchase.refinery_name}</td>
                <td className="px-4 py-2">{purchase.liters}</td>
                <td className="px-4 py-2">{purchase.amount}</td>
                <td className="px-4 py-2">{purchase.status}</td>
                <td className="px-4 py-2">{new Date(purchase.purchased_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">
                No purchases found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasePage;
