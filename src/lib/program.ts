import { fetchData } from "./api";

interface Program {
    id: number;
    liters: number;
    name: string;
}
const loadPrograms = async () => {
    try {
    const programs = await fetchData<Program[]>("programs");
    console.log(programs);
    return programs;
    } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
    }
    
};
export default loadPrograms;