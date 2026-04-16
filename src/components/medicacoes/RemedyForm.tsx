import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Medication } from "../../store/useMedicationStore";

export function RemedyForm({
  addMedication,
}: {
  addMedication: (med: Omit<Medication, "id" | "takenToday">) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    scheduledTime: "08:00",
    frequency: "Daily",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;

    addMedication({
      name: formData.name,
      dosage: formData.dosage,
      scheduledTime: formData.scheduledTime,
      startDate: new Date().toISOString(),
      endDate: "",
    });

    setFormData({
      name: "",
      dosage: "",
      scheduledTime: "08:00",
      frequency: "Daily",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-12 lg:col-span-8 bg-[#FDFCF9] rounded-[2.5rem] p-10 border border-gray-100 shadow-sm"
    >
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Nome do Remédio
          </label>
          <input
            type="text"
            placeholder="e.g. Glucosamine Chews"
            className="bg-white border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F1DECE]"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Tipo
          </label>
          <select className="bg-white border border-gray-100 rounded-xl px-4 py-3 appearance-none">
            <option>Cápsula</option>
            <option>íquido</option>
            <option>Comestível</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Dosagem
          </label>
          <input
            type="text"
            placeholder="e.g. 500mg"
            className="bg-white border border-gray-100 rounded-xl px-4 py-3"
            value={formData.dosage}
            onChange={(e) =>
              setFormData({ ...formData, dosage: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Frequência
          </label>
          <input
            type="text"
            placeholder="Diario, Semanal, etc."
            className="bg-white border border-gray-100 rounded-xl px-4 py-3"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Horário Agendado
          </label>
          <input
            type="time"
            className="bg-white border border-gray-100 rounded-xl px-4 py-3 w-1/2"
            value={formData.scheduledTime}
            onChange={(e) =>
              setFormData({ ...formData, scheduledTime: e.target.value })
            }
          />
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer bg-[#67574B] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#52443A] transition-colors"
      >
        <CheckCircle2 size={20} />
        Confirmar Registro
      </button>
    </form>
  );
}
