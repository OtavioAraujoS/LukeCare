import { useMedicationStore } from "../../store/useMedicationStore";
import { RemedyCard } from "../../components/medicacoes/RemedyCard";
import { RemedyHeader } from "../../components/medicacoes/RemedyHeader";
import { RemedyForm } from "../../components/medicacoes/RemedyForm";
import { Pill } from "lucide-react";

export default function RemedyLibrary() {
  const { medications, addMedication, removeMedication } = useMedicationStore();
  return (
    <div className="px-16 py-10 max-w-6xl mx-auto w-full">
      <RemedyHeader medicationsLength={medications.length} />

      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4 bg-[#F5F3ED] rounded-[2.5rem] p-8 flex flex-col shadow-sm">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-[#3B362E] mb-2">
              Registrar novo remédio
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Adicione um novo elemento medicinal ou nutricional ao ciclo diário
              do Luke.
            </p>
          </div>
          <div className="bg-[#2D85C5] flex w-full h-full rounded-full items-center justify-center">
            <Pill size={80} className="text-[#F5F3ED]" />
          </div>
        </div>
        <RemedyForm addMedication={addMedication} />
      </div>
      <RemedyCard
        medications={medications}
        removeMedication={removeMedication}
      />
    </div>
  );
}
