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
        set((state) => {
          const today = new Date().toISOString().slice(0, 10);
          const medicationId = activity.metadata?.medicationId as
            | string
            | undefined;

          const isDuplicate = state.activities.some((existing) => {
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

          if (isDuplicate) {
            return state;
          }

          return {
            activities: [
              ...state.activities,
              {
                ...activity,
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }),

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
