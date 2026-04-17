import { Pen, Pill, Trash2 } from "lucide-react";
import type { Medication } from "../../store/useMedicationStore";
import { EditRemedyModal } from "./EditRemedyModal";
import { useState } from "react";

interface RemedyCardProps {
  medications: Medication[];
  removeMedication: (id: string) => void;
}

export function RemedyCard({ medications, removeMedication }: RemedyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRemedy, setSelectedRemedy] = useState<Medication>();

  if (medications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="size-20 p-4 rounded-full bg-[#F5F3ED] flex items-center justify-center">
          <Pill size={32} className="text-[#65584D]" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center max-w-sm">
          <h2 className="text-xl font-bold text-[#3B362E]">
            Nenhum remédio registrado
          </h2>
          <p className="text-gray-400">
            Parece que ainda não há remédios registrados. Comece a adicionar
            para acompanhar o ciclo de cuidados!
          </p>
        </div>
      </div>
    );
  }

  console.log("Renderizando RemedyCard com medicamentos:", medications);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#3B362E]">
          Medicações Ativas
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {medications.map((med) => (
          <div
            key={med.id}
            className="flex flex-col gap-4 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow relative h-full"
          >
            <div className="flex justify-between items-start">
              <div className="size-12 rounded-full bg-[#F5F3ED] flex items-center justify-center">
                <Pill className="text-[#65584D]" size={22} />
              </div>
              <button
                onClick={() => removeMedication(med.id)}
                className="cursor-pointer flex items-center justify-center bg-[#C52121] text-white size-10 rounded-full hover:bg-red-800 transition-colors"
                title="Remover medicação"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <h4 className="text-lg md:text-2xl font-extrabold text-[#3B362E] leading-tight min-h-14">
                {med.name}
              </h4>
              <p className="text-sm text-gray-400 font-medium">
                Cuidado Diário
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-bold">Dosagem</span>
                <span className="font-extrabold text-[#3B362E]">
                  {med.dosage}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-bold">Horário</span>
                <span className="font-extrabold text-[#3B362E]">
                  {med.scheduledTime}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-bold">Começo</span>
                <span className="font-extrabold text-[#3B362E]">
                  {new Date(med.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-bold">Fim</span>
                <span className="font-extrabold text-[#3B362E]">
                  {new Date(med.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedRemedy(med);
                setIsModalOpen(true);
              }}
              className="mt-auto cursor-pointer w-full flex items-center justify-center gap-2 py-3.5 bg-[#DEE7FF] text-[#4859A9] font-bold rounded-2xl hover:bg-[#D0DCFF] transition-all active:scale-95"
            >
              <Pen size={18} />
              Editar
            </button>
          </div>
        ))}
      </div>

      <EditRemedyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        remedy={selectedRemedy}
      />
    </section>
  );
}
