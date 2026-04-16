import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Medication {
  id: string;
  name: string;
  scheduledTime: string;
  dosage: string;
  startDate: string;
  endDate: string;
  takenToday: boolean;
}

interface MedicationState {
  medications: Medication[];
  addMedication: (med: Omit<Medication, "id" | "takenToday">) => void;
  removeMedication: (id: string) => void;
  toggleTaken: (id: string) => void;
}

export const useMedicationStore = create<MedicationState>()(
  persist(
    (set) => ({
      medications: [],

      addMedication: (med) =>
        set((state) => ({
          medications: [
            ...state.medications,
            { ...med, id: crypto.randomUUID(), takenToday: false },
          ],
        })),

      removeMedication: (id) =>
        set((state) => ({
          medications: state.medications.filter((m) => m.id !== id),
        })),

      toggleTaken: (id) =>
        set((state) => ({
          medications: state.medications.map((m) =>
            m.id === id ? { ...m, takenToday: !m.takenToday } : m,
          ),
        })),
    }),
    {
      name: "luke-meds-storage",
    },
  ),
);
