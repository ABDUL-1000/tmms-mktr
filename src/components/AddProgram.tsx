import axios from "axios";
import { useState } from "react";


interface AddProgramProps {
    isOpen: boolean;
    onClose: () => void;
    purchaseId: number | null;
    refreshPrograms:() => void;
}

const AddProgramModal: React.FC<AddProgramProps> = ({ isOpen, onClose, purchaseId, refreshPrograms }) => {
    const [liters, setLiters] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const handleAddProgram = async () => {
    if (liters < 0){
        setError('liters must be greater than 0')
        return;
    }
    setLoading(true);
    try{
        const response = await axios.post( "https://tms.sdssn.org/api/marketers/programs",
          
            { liters, purchase_id: purchaseId },
            { headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}`} });
            console.log(response.data, 'programs added')
            refreshPrograms();
            onClose();

    }catch (err) {
        setError("Failed to add program.");
      } finally {
        setLoading(false);
      }
    }

    if (!isOpen)
    return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Program</h2>

        {error && <p className="text-red-500">{error}</p>}

        <label className="block text-gray-700 font-medium mb-2">Liters</label>
        <input
          type="number"
          value={liters}
          onChange={(e) => setLiters(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          min="1"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button
            onClick={handleAddProgram}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            {loading ? "Adding..." : "Add Program"}
          </button>
        </div>
      </div>
    </div>

)
    
        
}
export default AddProgramModal;