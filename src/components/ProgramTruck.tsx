'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProgramTruck {
  id: number;
  program_id: number;
  truck_id: number;
  liters: number;
  status: string;
  customer_status: string;
  driver_status: string;
  created_at: string;
}

const ProgramTrucksTable: React.FC = () => {
  const [programTrucks, setProgramTrucks] = useState<ProgramTruck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramTrucks = async () => {
      try {
        const response = await axios.get('https://tms.sdssn.org/api/marketers/program-trucks');
        setProgramTrucks(response.data.data);
      } catch (err) {
        setError('Failed to fetch program trucks');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramTrucks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Program Trucks</h2>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Program ID</th>
                <th className="py-3 px-6 text-left">Truck ID</th>
                <th className="py-3 px-6 text-left">Liters</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Customer Status</th>
                <th className="py-3 px-6 text-left">Driver Status</th>
                <th className="py-3 px-6 text-left">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {programTrucks.map((truck) => (
                <tr key={truck.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{truck.id}</td>
                  <td className="py-3 px-6">{truck.program_id}</td>
                  <td className="py-3 px-6">{truck.truck_id}</td>
                  <td className="py-3 px-6">{truck.liters}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-white ${truck.status === 'moving' ? 'bg-blue-500' : 'bg-gray-500'}`}>{truck.status}</span>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-white ${truck.customer_status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>{truck.customer_status}</span>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-white ${truck.driver_status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>{truck.driver_status}</span>
                  </td>
                  <td className="py-3 px-6">{new Date(truck.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgramTrucksTable;
