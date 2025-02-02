// src/store/useStore.ts
import { create } from 'zustand';

interface ProgramState {
  selectedProgram: any | null;
  setSelectedProgram: (program: any) => void;
}

const useStore = create<ProgramState>((set) => ({
  selectedProgram: null,
  setSelectedProgram: (program) => set({ selectedProgram: program }),
}));

export default useStore;
