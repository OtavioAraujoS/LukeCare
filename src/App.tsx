import { AddMedicationModal } from "./components/AddMedicationModal";
import { ScheduleList } from "./components/ScheduleList";
import { ProgressCard } from "./components/ProgressCard";
import { useMedicationStore } from "./store/useMedicationStore";
import { useState } from "react";
import { ActivityList } from "./components/ActivityList";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";

export default function App() {
  const medications = useMedicationStore((state) => state.medications);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
  }).format(new Date());

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden text-[#3B362E]">
      <Sidebar setIsModalOpen={setIsModalOpen} />

      <main className="flex-1 flex flex-col h-full bg-white relative overflow-y-auto">
        <Header />

        <div className="px-16 py-10 max-w-6xl mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-[2.5rem] font-extrabold text-[#3B362E] tracking-tight mb-2">
              Bom dia, Luke.
            </h2>
            <p className="text-gray-500 font-medium">
              Você tem {medications.length} remédio(s) agendado(s) para hoje.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-4">
              <ProgressCard />
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="flex justify-between items-end mb-6 px-2">
                <h3 className="text-xl font-bold text-[#3B362E]">
                  Cronograma Diário
                </h3>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Hoje, {todayFormatted}
                </span>
              </div>
              <ScheduleList />
            </div>

            <div className="col-span-12">
              <ActivityList />
            </div>
          </div>
        </div>
      </main>

      <AddMedicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
