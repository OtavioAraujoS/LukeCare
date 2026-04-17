import { useMedicationStore } from "../../store/useMedicationStore";
import { RemedyCard } from "../../components/medicacoes/RemedyCard";
import { RemedyHeader } from "../../components/medicacoes/RemedyHeader";
import { RemedyForm } from "../../components/medicacoes/RemedyForm";
import { Pill } from "lucide-react";
import { Loading } from "../../components/Loading";

export default function RemedyLibrary() {
  const { medications, addMedication, removeMedication, isLoading } =
    useMedicationStore();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-6 py-8 md:px-16 md:py-10 max-w-6xl mx-auto w-full">
      <RemedyHeader medicationsLength={medications.length} />

      <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4 bg-[#F5F3ED] rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 flex flex-col shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#3B362E] mb-2">
              Registrar novo remédio
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Adicione um novo elemento medicinal ou nutricional ao ciclo
              diário.
            </p>
          </div>
          <div className="hidden lg:flex bg-[#2D85C5] w-full h-full min-h-37.5 rounded-4xl items-center justify-center">
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
