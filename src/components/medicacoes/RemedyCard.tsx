import { Pill, Trash2 } from "lucide-react";
import type { Medication } from "../../store/useMedicationStore";

interface RemedyCardProps {
  medications: Medication[];
  removeMedication: (id: string) => void;
}

export function RemedyCard({ medications, removeMedication }: RemedyCardProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#3B362E]">
          Medicações Ativas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medications.map((med) => (
          <div
            key={med.id}
            className="flex flex-col gap-4 bg-white border border-gray-100 rounded-4xl p-6 shadow-sm relative group"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 m:gap-0">
              <div className="flex justify-between items-start">
                <div className="size-12 rounded-full bg-[#F5F3ED] flex items-center justify-center">
                  <Pill className="text-[#65584D]" size={22} />
                </div>
              </div>
              <button
                onClick={() => removeMedication(med.id)}
                className="cursor-pointer flex items-center justify-center bg-red-700 text-white size-12 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-xl font-bold text-[#3B362E]">{med.name}</h4>

              <div className="space-y-4">
                <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">Dosagem</span>
                  <span className="font-bold text-[#3B362E]">{med.dosage}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">Horário</span>
                  <span className="font-bold text-[#3B362E]">
                    {med.scheduledTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
