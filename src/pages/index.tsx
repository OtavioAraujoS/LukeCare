import { ScheduleList } from "../components/ScheduleList";
import { ProgressCard } from "../components/ProgressCard";
import { ActivityList } from "../components/ActivityList";
import { useMedicationStore } from "../store/useMedicationStore";

export default function Dashboard() {
  const medications = useMedicationStore((state) => state.medications);

  const todayFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
  }).format(new Date());

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-10 max-w-6xl mx-auto w-full">
      <div className="mb-8 lg:mb-10">
        <h2 className="text-3xl lg:text-[2.5rem] font-extrabold text-[#3B362E] tracking-tight mb-2">
          Bom dia, Luke.
        </h2>
        <p className="text-gray-500 font-medium text-sm lg:text-base">
          Você tem {medications.length} remédio(s) agendado(s) para hoje.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-12 lg:col-span-4 order-1">
          <ProgressCard />
        </div>

        <div className="col-span-12 lg:col-span-8 order-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 px-2 gap-2">
            <h3 className="text-xl font-bold text-[#3B362E]">
              Cronograma Diário
            </h3>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
              Hoje, {todayFormatted}
            </span>
          </div>
          <ScheduleList />
        </div>

        <div className="col-span-12 order-3">
          <ActivityList />
        </div>
      </div>
    </div>
  );
}
