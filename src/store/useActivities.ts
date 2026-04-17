import { create } from "zustand";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Activity {
  id: string;
  type: "medication" | "measurement" | "task" | "note" | string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

interface ActivityState {
  activities: Activity[];
  isLoading: boolean;
  subscribeToActivities: () => () => void;
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => Promise<void>;
  removeActivity: (id: string) => Promise<void>;
  clearActivities: () => Promise<void>;
}

export const useActivities = create<ActivityState>((set, get) => ({
  activities: [],
  isLoading: true,

  subscribeToActivities: () => {
    const q = query(collection(db, "activities"), orderBy("timestamp", "desc"));
    return onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Activity[];
        set({ activities: docs, isLoading: false });
      },
      (error) => {
        console.error("❌ Erro nas Atividades:", error.message);
      },
    );
  },

  addActivity: async (activity) => {
    const { activities } = get();
    const today = new Date().toISOString().slice(0, 10);
    const medicationId = activity.metadata?.medicationId;

    const isDuplicate = activities.some((existing) => {
      const existingDate = existing.timestamp.slice(0, 10);
      const sameMedication = medicationId
        ? existing.metadata?.medicationId === medicationId
        : true;
      return (
        existing.type === activity.type &&
        existing.description === activity.description &&
        existingDate === today &&
        sameMedication
      );
    });

    if (!isDuplicate) {
      await addDoc(collection(db, "activities"), {
        ...activity,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.warn("⚠️ Atividade duplicada ignorada.");
    }
  },

  removeActivity: async (id) => {
    await deleteDoc(doc(db, "activities", id));
  },

  clearActivities: async () => {
    const q = query(collection(db, "activities"));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  },
}));
