import { X } from "lucide-react";
import { useMedicationStore } from "../store/useMedicationStore";

export function AddMedicationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const addMedication = useMedicationStore((state) => state.addMedication);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addMedication({
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      scheduledTime: formData.get("time") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#3B362E]">Novo Remédio</h3>
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
              Nome da Medicação
            </label>
            <input
              name="name"
              required
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
              className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-500 mb-1 block">
              Data de Início
            </label>
            <input
              name="startDate"
              type="date"
              required
              className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-500 mb-1 block">
              Data de Fim
            </label>
            <input
              name="endDate"
              type="date"
              required
              className="w-full p-3 bg-[#F9F8F6] border border-transparent focus:border-[#E8E4DA] focus:bg-white rounded-xl outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-4 bg-[#635A4D] hover:bg-[#4E463C] text-white font-bold rounded-2xl transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
