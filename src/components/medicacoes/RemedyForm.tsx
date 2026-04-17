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
    scheduledTime: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!formData.name || !formData.dosage) return;

      addMedication({
        name: formData.name,
        dosage: formData.dosage,
        scheduledTime: formData.scheduledTime,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      setFormData({
        name: "",
        dosage: "",
        scheduledTime: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar medicação:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-12 lg:col-span-8 bg-[#FDFCF9] rounded-4xl md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
            Nome
          </label>
          <input
            type="text"
            placeholder="e.g. Glucosamine Chews"
            className="bg-white border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F1DECE] transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
            Dosagem
          </label>
          <input
            type="text"
            placeholder="e.g. 500mg"
            className="bg-white border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F1DECE]"
            value={formData.dosage}
            onChange={(e) =>
              setFormData({ ...formData, dosage: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-500 mb-1 block">
            Início
          </label>
          <input
            name="startDate"
            type="date"
            required
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-500 mb-1 block">
            Fim
          </label>
          <input
            name="endDate"
            type="date"
            required
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
            Horário Agendado
          </label>
          <div className="relative w-full sm:w-1/2">
            <input
              type="time"
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F1DECE] appearance-none"
              value={formData.scheduledTime}
              onChange={(e) =>
                setFormData({ ...formData, scheduledTime: e.target.value })
              }
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto cursor-pointer bg-[#67574B] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#52443A] transition-colors active:scale-95"
      >
        <CheckCircle2 size={20} />
        Confirmar Registro
      </button>
    </form>
  );
}
