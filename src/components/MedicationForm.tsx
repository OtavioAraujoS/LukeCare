import { X } from "lucide-react";
import type { Medication } from "../store/useMedicationStore";

export function MedicationForm({
  onClose,
  handleSubmit,
  remedy,
  isEditing = false,
}: {
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  remedy?: Medication;
  isEditing?: boolean;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#3B362E]">
          {isEditing ? "Editar Remédio" : "Novo Remédio"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-sm font-bold text-gray-500 mb-1 block">
            Nome
          </label>
          <input
            name="name"
            required
            defaultValue={remedy?.name}
            placeholder="Ex: Bravecto"
            className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-500 mb-1 block">
            Dose
          </label>
          <input
            name="dosage"
            required
            defaultValue={remedy?.dosage}
            placeholder="Ex: 1 comp."
            className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-500 mb-1 block">
            Horário
          </label>
          <input
            name="time"
            type="time"
            required
            defaultValue={remedy?.scheduledTime}
            className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
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
            defaultValue={remedy?.startDate}
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
            defaultValue={remedy?.endDate}
            className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        className="cursor-pointer w-full mt-8 py-4 bg-[#635A4D] hover:bg-[#4E463C] text-white font-bold rounded-2xl transition-colors"
      >
        {isEditing ? "Salvar Alterações" : "Cadastrar"}
      </button>
    </form>
  );
}
