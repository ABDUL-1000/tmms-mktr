"use client"; // Ensure this is at the very top

import { ProgramTruck, ProgramData } from "@/auth/types/programTruck";
import Navigation from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import TruckForm from "@/components/TruckForm";

import axios from "axios";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProgramDetailPage = () => {
  const params = useParams();
  const id = params?.id; // Ensure id is correctly accessed

  console.log("Purchase ID:", id);

  const [program, setProgram] = useState<{ data: ProgramData } | null>(null);
  const [programTrucks, setProgramTrucks] = useState<ProgramTruck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionOpen, setActionOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `https://tms.sdssn.org/api/marketers/programs/${id}`,
          { headers: { Accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setProgram(response.data);
        setProgramTrucks(response.data.data.program_trucks || []);
      } catch (err) {
        setError("Failed to fetch purchase details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!program) return <p>Purchase not found.</p>;

  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
            <section className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 capitalize">
                {program.data.purchase.product.product_type.name}
              </h2>

              <div className="grid grid-cols-2 gap-y-3 items-center text-gray-600">
                <span className="font-medium text-gray-800">Price (NGN):</span>
                <span>{program.data.purchase.product.price}</span>
                <span className="font-medium text-gray-800">PFI Number:</span>
                <span className="truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {program.data.purchase.pfi_number}
                </span>

                <span className="font-medium text-gray-800">Status:</span>
                <span>{program.data.status}</span>
                <span className="font-medium text-gray-800">Liters:</span>
                <span>{program.data.liters}</span>
                <span className="font-medium text-gray-800">Purchased At:</span>
                <span>
                  {new Date(program.data.created_at).toLocaleString()}
                </span>
              </div>
            </section>

            <div className="flex justify-end m-4">
              <button
                className="flex justify-center  text-blue-400 rounded-md px-4 py-2 bg-blue-900 hover:bg-blue-800"
                onClick={() => setIsModalOpen(true)}
              >
                ➕ Add Truck 🚚
              </button>
            </div>

            <section className="m-3">
              <h3 className="text-xl font-bold mt-6">Programs</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">ATC Number</th>
                      <th className="p-3 text-left">Liters Lifted</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Truck_ID</th>
                      <th className="p-3 text-left">Created At</th>
                      <th className="p-3 text-left">Truck</th>

                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programTrucks.length > 0 ? (
                      programTrucks.map((programTruck: ProgramTruck) => (
                        <tr
                          key={programTruck.id}
                          className="border-b hover:bg-gray-100"
                        >
                          <td className="p-3">{programTruck.id}</td>
                          <td className="p-3">{programTruck.atc_number}</td>
                          <td className="p-3">
                            {programTruck.liters.toLocaleString()}
                          </td>
                          <td className="p-3">{programTruck.status}</td>
                          <td className="p-3">
                            {programTruck.truck_id || "N/A"}
                          </td>
                          <td className="p-3">
                            {programTruck.created_at || "N/A"}
                          </td>
                          <td className="p-3">
                            {new Date(programTruck.created_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-2 relative">
                            <MoreVerticalIcon
                              className="cursor-pointer"
                              onClick={() =>
                                setActionOpen(
                                  actionOpen === programTruck.id
                                    ? null
                                    : programTruck.id
                                )
                              }
                            />
                            {actionOpen === programTruck.id && (
                              <div className="absolute right-0  w-40 bg-white border rounded-lg shadow-lg z-10">
                                <ul className="py-2 text-sm text-gray-700">
                                  <li>
                                    <Link href={`/Truck/${programTruck.id}`}>
                                      <button
                                        className="block w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setActionOpen(null)}
                                      >
                                        View ProgramTruck
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
                        <td
                          colSpan={7}
                          className="p-4 text-center text-gray-500"
                        >
                          Programs not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
            {isModalOpen && (
              <TruckForm
              
              
                programId={id ? Number(id) : 0}
                closeModal={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
