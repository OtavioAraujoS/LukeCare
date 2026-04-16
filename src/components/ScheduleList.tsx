import { Check, Pill } from "lucide-react";
import { useMedicationStore } from "../store/useMedicationStore";
import { useActivities } from "../store/useActivities";

export function ScheduleList() {
  const { medications, toggleTaken } = useMedicationStore();
  const addActivity = useActivities((state) => state.addActivity);

  const sortedMeds = [...medications].sort((a, b) =>
    a.scheduledTime.localeCompare(b.scheduledTime),
  );

  if (medications.length === 0) {
    return (
      <div className="text-gray-400 p-8 text-center bg-[#F9F8F6] rounded-3xl border border-dashed border-gray-300">
        Nenhum remédio cadastrado para hoje.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {sortedMeds.map((med) => (
        <div
          key={med.id}
          className="bg-[#F9F8F6] p-4 pr-6 rounded-4xl flex items-center justify-between shadow-sm transition-all hover:bg-[#f3f1eb]"
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
            onClick={() => {
              if (!med.takenToday) {
                addActivity({
                  type: "medication",
                  description: `Remédio ${med.name} marcado como ingerido`,
                  metadata: { medicationId: med.id },
                });
              }
              toggleTaken(med.id);
            }}
            className={`cursor-pointer px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${
              med.takenToday
                ? "bg-[#E2F0D9] text-[#4E7A3A]"
                : "bg-[#EAE5D9] text-[#635A4D] hover:bg-[#dcd6c8]"
            }`}
          >
            {med.takenToday ? (
              <>
                <span className="mr-1">ADMINISTRADO</span>
                <div className="bg-[#4CAF50] text-white rounded-full p-0.5 shadow-sm">
                  <Check size={14} strokeWidth={3} />
                </div>
              </>
            ) : (
              "Marcar como ingerido"
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
