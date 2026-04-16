import { useState } from "react";
import { useMedicationStore } from "../store/useMedicationStore";
import { Plus } from "lucide-react";

export function AddMedication() {
  const addMedication = useMedicationStore((state) => state.addMedication);
  const [isOpen, setIsOpen] = useState(false);

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

    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#EAE5D9] text-[#4A443B] rounded-full font-medium hover:bg-[#dcd6c8] transition-colors"
      >
        <Plus size={18} /> Novo Remédio
      </button>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-2xl shadow-sm border border-[#EAE5D9] mb-6 flex flex-col gap-3"
    >
      <h3 className="font-semibold text-[#4A443B]">Cadastrar Medicação</h3>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          required
          placeholder="Nome do remédio"
          className="p-2 border rounded-lg"
        />
        <input
          name="dosage"
          required
          placeholder="Dose (ex: 1 comp.)"
          className="p-2 border rounded-lg"
        />
        <input
          name="time"
          type="time"
          required
          className="p-2 border rounded-lg"
        />
        <div className="flex gap-2">
          <input
            name="startDate"
            type="date"
            required
            className="p-2 border rounded-lg w-full"
            title="Data de Início"
          />
          <input
            name="endDate"
            type="date"
            required
            className="p-2 border rounded-lg w-full"
            title="Data de Fim"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#4A443B] text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
