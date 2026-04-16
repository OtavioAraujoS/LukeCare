import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Activity {
  id: string;
  type: "medication" | "measurement" | "task" | "note" | string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
  removeActivity: (id: string) => void;
  clearActivities: () => void;
}

export const useActivities = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],

      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            {
              ...activity,
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        })),

      clearActivities: () => set({ activities: [] }),
    }),
    {
      name: "luke-activities-storage",
    },
  ),
);
