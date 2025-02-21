"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Purchase } from "@/auth/types/purchaseTypes";
import AddProgramModal from "@/components/AddProgram";
import Link from "next/link";
import { MoreVerticalIcon } from "lucide-react";
import Navigation from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

interface Program {
  id: number;
  atc_number: string;
  liters: number;
  status: string;
  comment?: string;
  created_at: string;
}

const PurchaseDetailPage = () => {
  const params = useParams();
  const id = params.id;
  console.log("Purchase ID:", id);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionOpen, setActionOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPurchase = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/purchases/${id}`
        );
        setPurchase(response.data);
        setPrograms(response.data.data.programs);
      } catch (err) {
        setError("Failed to fetch purchase details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [id]);

  const refreshPrograms = async () => {
    if (!id) return;
    try {
      const response = await axios.get(
        `https://tms.sdssn.org/api/marketers/purchases/${id}`
      );
      setPrograms(response.data.data.programs);
    } catch (err) {
      console.error("Error refreshing programs:", err);
    }
  };

  // Compute Liters Lifted & Remaining
  const litersLifted = programs.reduce((sum, program) => sum + program.liters, 0);
  const totalLiters = purchase?.data.liters || 0;
  const litersRemaining = totalLiters - litersLifted;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!purchase) return <p>Purchase not found.</p>;

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
            <section className="p-2 w-full mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 capitalize">
                {purchase.data.product.product_type.name}
              </h2>

              <div className="grid grid-cols-2 gap-y-3 items-center text-gray-600">
                <span className="font-medium text-gray-800">Amount (NGN):</span>
                <span>{purchase.data.amount}</span>
                <span className="font-medium text-gray-800">PFI Number:</span>
                <span>{purchase.data.pfi_number}</span>
                <span className="font-medium text-gray-800">Status:</span>
                <span>{purchase.data.status}</span>
                <span className="font-medium text-gray-800">Total Liters:</span>
                <span>{totalLiters}</span>
                <span className="font-medium text-gray-800">Liters Lifted:</span>
                <span>{litersLifted}</span>
                <span className="font-medium text-gray-800">Liters Remaining:</span>
                <span>{litersRemaining}</span>
                <span className="font-medium text-gray-800">Program Created At:</span>
                <span>{new Date(purchase.data.created_at).toLocaleString()}</span>
                <span className="font-medium text-gray-800">Purchased At:</span>
                <span>{new Date(purchase.data.created_at).toLocaleString()}</span>
              </div>

              <button className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
                Edit Purchase
              </button>
            </section>

            {purchase.data.status === "approve" && (
              <div className="flex justify-end m-4">
                <button
                  className="flex justify-center text-blue-400 rounded-md px-4 py-2 bg-blue-900 hover:bg-blue-800"
                  onClick={() => setIsModalOpen(true)}
                >
                  ➕ Add Program
                </button>
              </div>
            )}

            <section className="m-3">
              <h3 className="text-xl font-bold mt-6">Programs</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">ATC Number</th>
                      <th className="p-3 text-left">Liters</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Comment</th>
                      <th className="p-3 text-left">Created At</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.length > 0 ? (
                      programs.map((program: Program) => (
                        <tr key={program.id} className="border-b hover:bg-gray-100">
                          <td className="p-3">{program.id}</td>
                          <td className="p-3">{program.atc_number}</td>
                          <td className="p-3">{program.liters.toLocaleString()}</td>
                          <td className="p-3">{program.status}</td>
                          <td className="p-3">{program.comment || "N/A"}</td>
                          <td className="p-3">
                            {new Date(program.created_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-2 relative">
                            <MoreVerticalIcon
                              className="cursor-pointer"
                              onClick={() =>
                                setActionOpen(actionOpen === program.id ? null : program.id)
                              }
                            />
                            {actionOpen && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                                <ul className="py-2 text-sm text-gray-700">
                                  <li>
                                    <Link href={`/programTruck/${program.id}`}>
                                      <button
                                        className="block w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setActionOpen(null)}
                                      >
                                        View Program
                                      </button>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-500">
                          Programs not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <AddProgramModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              purchaseId={Number(id) || null}
              refreshPrograms={refreshPrograms}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailPage;
