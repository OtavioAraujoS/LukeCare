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
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";
import { getLocalDateString } from "../lib/utils";

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
  addActivity: (
    activity: Omit<Activity, "id" | "timestamp"> & { timestamp?: string },
  ) => Promise<string | null>;
  removeActivity: (id: string) => Promise<void>;
  clearActivities: () => Promise<void>;
}

export const useActivities = create<ActivityState>((set, get) => ({
  activities: [],
  isLoading: true,

  subscribeToActivities: () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const minTimestamp = thirtyDaysAgo.toISOString();

    const q = query(
      collection(db, "activities"),
      where("timestamp", ">=", minTimestamp),
      orderBy("timestamp", "desc"),
    );

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
        toast.error("❌ Erro nas Atividades:", {
          description: error.message,
        });
      },
    );
  },

  addActivity: async (activityData) => {
    const { activities } = get();
    const targetTimestamp = activityData.timestamp || new Date().toISOString();
    const targetDateOnly = getLocalDateString(new Date(targetTimestamp));
    const medicationId = activityData.metadata?.medicationId;

    const isDuplicate = activities.some((existing) => {
      const existingDateOnly = getLocalDateString(new Date(existing.timestamp));
      return (
        existingDateOnly === targetDateOnly &&
        existing.type === activityData.type &&
        (medicationId
          ? existing.metadata?.medicationId === medicationId
          : existing.description === activityData.description)
      );
    });

    if (isDuplicate) {
      toast.warning(
        "🚫 Atividade ignorada: Já existe registro para este item hoje.",
        {
          description: "Por favor, verifique se a atividade já foi registrada.",
        },
      );
      return null;
    }

    try {
      const docRef = await addDoc(collection(db, "activities"), {
        ...activityData,
        timestamp: targetTimestamp,
      });
      return docRef.id;
    } catch (error) {
      toast.error("❌ Erro técnico ao salvar no Firebase:", {
        description: String(error),
      });
      throw error;
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
