import { Check, Pill } from "lucide-react";
import {
  useMedicationStore,
  type Medication,
} from "../store/useMedicationStore";
import { useActivities } from "../store/useActivities";
import { toast } from "sonner";

export function ScheduleList() {
  const { medications } = useMedicationStore();
  const { activities, addActivity } = useActivities();

  const sortedMeds = [...medications].sort((a, b) =>
    a.scheduledTime.localeCompare(b.scheduledTime),
  );

  const isMedicationTakenToday = (medId: string) => {
    const today = new Date().toISOString().slice(0, 10);
    return activities.some(
      (activity) =>
        activity.metadata?.medicationId === medId &&
        activity.timestamp.slice(0, 10) === today &&
        activity.type === "medication",
    );
  };

  async function handleAction(medication: Medication) {
    const taken = isMedicationTakenToday(medication.id);

    if (!taken) {
      const newId = await addActivity({
        type: "medication",
        description: `Remédio ${medication.name} marcado como ingerido`,
        metadata: { medicationId: medication.id },
      });

      if (newId) {
        toast.success(`${medication.name} registrado!`);
      }
    } else {
      toast.info("Este medicamento já foi registrado hoje.");
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full max-w-[90%]">
      {sortedMeds.map((med) => {
        const isTaken = isMedicationTakenToday(med.id);
        return (
          <div
            key={med.id}
            className="bg-[#F9F8F6] p-4 pr-6 gap-4 rounded-4xl flex items-center justify-between shadow-sm transition-all hover:bg-[#f3f1eb]  overflow-x-scroll md:overflow-hidden"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#E8E4DA] rounded-2xl flex items-center justify-center text-[#8C7E6A] shrink-0">
                <Pill size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#3E3831] text-lg mb-0.5">
                  {med.name}
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  {med.scheduledTime} • {med.dosage}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleAction(med)}
              className={`cursor-pointer px-5 py-2.5 max-h-15 rounded-full font-bold transition-all ${
                isTaken
                  ? "bg-[#E2F0D9] text-[#4E7A3A]"
                  : "bg-[#EAE5D9] text-[#635A4D] hover:bg-[#dcd6c8]"
              }`}
            >
              <span className="flex items-center justify-between text-xs md:text-sm ">
                {isTaken ? (
                  <>
                    <span className="mr-1">ADMINISTRADO</span>
                    <div className="bg-[#4CAF50] text-white rounded-full p-0.5 shadow-sm">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </>
                ) : (
                  "Marcar como ingerido"
                )}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
