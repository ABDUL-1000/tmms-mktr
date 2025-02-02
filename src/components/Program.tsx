"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MoreVerticalIcon } from "lucide-react";

import useStore from "@/lib/useStore";
import { TrucksTableModal } from "@/app/trucks/page";


const ProgramListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionDropdown, setActionDropdown] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({
    liters: 0,
    purchase_id: 0,
    status: "pending",
  });

  // Access the Zustand store's selectedProgram and setSelectedProgram
  const { selectedProgram, setSelectedProgram } = useStore();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          "https://tms.sdssn.org/api/marketers/programs",
          {
            headers: { Accept: "application/json" },
          }
        );
        setPrograms(response.data.data);
      } catch (err) {
        setError("Failed to fetch programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const fetchProgramDetails = async (programId: number) => {
    console.log("Fetching details for program ID:", programId); // Debugging
    if (!programId) {
      console.error("Invalid program ID");
      return;
    }

    try {
      const response = await axios.get(
        `https://tms.sdssn.org/api/marketers/programs/${programId}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      console.log("API Response:", response.data); // Debugging

      const programData = response.data.data;
      setSelectedProgram(programData); // Update Zustand store
      setFormData({
        liters: programData.liters,
        purchase_id: programData.purchase_id,
        status: programData.status,
      });
      setShowModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error("Program not found");
        alert("Program not found. Please check the program ID.");
      } else {
        console.error("Failed to fetch program details:", error);
      }
    }
  };
  if (loading) return <p>Loading programs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4 uppercase">Program List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 shadow-md">
          <thead>
            <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
              <th className="border border-gray-700 px-4 py-2">ID</th>
              <th className="border border-gray-700 px-4 py-2">Liters</th>
              <th className="border border-gray-700 px-4 py-2">Purchase ID</th>
              <th className="border border-gray-700 px-4 py-2">Status</th>
              <th className="border border-gray-700 px-4 py-2">Created At</th>
              <th className="border border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.length > 0 ? (
              programs.map((program, index) => (
                <tr
                  key={program.id}
                  className={`text-center border border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  } hover:bg-gray-700 transition-all`}
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {program.id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {program.liters}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {program.purchase_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 font-semibold">
                    {program.status}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {new Date(program.created_at).toLocaleString()}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 relative">
                    <MoreVerticalIcon
                      className="cursor-pointer hover:text-yellow-400"
                      onClick={() =>
                        setActionDropdown(
                          actionDropdown === program.id ? null : program.id
                        )
                      }
                    />
                    {actionDropdown === program.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                        <ul className="py-2 text-sm text-gray-300">
                          <li>
                            <button
                              className="block w-full px-4 py-2 hover:bg-gray-700"
                              // onClick={() => fetchProgramDetails(program.id)}
                            >
                              View Program
                            </button>
                          </li>
                          <li>
                            <button className="block w-full px-4 py-2 hover:bg-gray-700">
                              Edit Program
                            </button>
                          </li>
                          <li>
                            <button
                              className="block w-full px-4 py-2 hover:bg-gray-700"
                              onClick={() => {
                                fetchProgramDetails(program.id);
                                setIsModalOpen(true);
                              }}
                            >
                              Add Program
                            </button>
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
                  colSpan={6}
                  className="text-center border border-gray-700 p-4 text-gray-300"
                >
                  No programs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <TrucksTableModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedProgramId={selectedProgram?.id || null}
          liters={selectedProgram?.liters || 0} // Pass liters to modal
          purchase_id={selectedProgram?.purchase_id || null} // Pass purchase_id to modal
        />
      </div>
    </div>
  );
};

export default ProgramListPage;
