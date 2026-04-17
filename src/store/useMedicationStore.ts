import { create } from "zustand";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

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
  isLoading: boolean;
  subscribeToMedications: () => () => void;
  addMedication: (med: Omit<Medication, "id" | "takenToday">) => Promise<void>;
  removeMedication: (id: string) => Promise<void>;
  toggleTaken: (id: string) => Promise<void>;
}

export const useMedicationStore = create<MedicationState>((set, get) => ({
  medications: [],
  isLoading: true,

  subscribeToMedications: () => {
    return onSnapshot(
      collection(db, "medications"),
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Medication[];
        set({ medications: docs, isLoading: false });
      },
      (error) => {
        console.error("❌ Erro ao carregar medicamentos:", error.message);
      },
    );
  },

  addMedication: async (med) => {
    const { medications } = get();
    const alreadyExists = medications.some(
      (m) => m.name.toLowerCase() === med.name.toLowerCase(),
    );

    if (!alreadyExists) {
      await addDoc(collection(db, "medications"), {
        ...med,
        takenToday: false,
      });
    } else {
      console.warn("⚠️ Este medicamento já está cadastrado.");
    }
  },

  removeMedication: async (id) => {
    await deleteDoc(doc(db, "medications", id));
  },

  toggleTaken: async (id) => {
    const medication = get().medications.find((m) => m.id === id);

    if (medication) {
      const docRef = doc(db, "medications", id);
      await updateDoc(docRef, {
        takenToday: !medication.takenToday,
      });
    }
  },
}));
