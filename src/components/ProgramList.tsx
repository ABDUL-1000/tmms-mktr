'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProgramList
 {
  id: number;
  name: string;
  program_id: number;
  truck_id: number;
  liters: number;
  status: string;
  purchase_id: number;
  created_at: string;
  purchase:{
    id:number;
    created_at:string;
    pfi_number:string;
    liters:number;
    amount:number;
    product:{
        name:string;
        price:number;
    }
  }
}

const ProgramListTable: React.FC = () => {
  const [programLists, setProgramLists] = useState<ProgramList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchProgramList = async () => {
      try {
        const response = await axios.get('https://tms.sdssn.org/api/marketers/programs',
          { headers:
            { Accept: "application/json", Authorization: `Bearer ${token}` } 
           }
        );
        
        setProgramLists(response.data.data);
      } catch (err) {
        setError('Failed to fetch programs');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramList();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">All Programs</h2>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
               
               
                <th className="py-1 px-2 text-left">Program ID</th>
                <th className="py-1 px-2 text-left">Purchase ID</th>
                <th className="py-1 px-2 text-left">Liters</th>
                <th className="py-1 px-2 text-left">Status</th>
                <th className="py-1 px-2 text-left">amount</th>
                <th className="py-1 px-2 text-left">pfi_number</th>
                <th className="py-1 px-2 text-left">Price</th>
                <th className="py-1 px-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {programLists.map((program) => (
                <tr key={program.id} className="border-b border-gray-200 hover:bg-gray-100">
                
                  <td className="py-3 px-2">{program.id}</td>
                  <td className="py-3 px-2">{program.purchase.id}</td>
                  <td className="py-3 px-2">{program.liters}</td>
                 
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded text-white ${program.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>{program.status}</span>
                  </td>
                  <td className="py-3 px-6">#{program.purchase.amount}</td>
                  <td className="py-3 px-1">{program.purchase.pfi_number}</td>
                  <td className="py-3 px-1">{program.purchase.product.price}</td>
                  <td className="py-3 px-6">{new Date(program.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgramListTable;
