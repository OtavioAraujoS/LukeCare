import { ScheduleList } from "../components/ScheduleList";
import { ProgressCard } from "../components/ProgressCard";
import { ActivityList } from "../components/ActivityList";
import { useMedicationStore } from "../store/useMedicationStore";
import { useActivities } from "../store/useActivities";
import { Loading } from "../components/Loading";
import { NextRemedy } from "../components/NextRemedy";

export default function Dashboard() {
  const { medications, isLoading: loadingMeds } = useMedicationStore();
  const { isLoading: loadingActs } = useActivities();

  const isPageLoading = loadingMeds || loadingActs;

  const todayFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
  }).format(new Date());

  if (isPageLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-8 px-6 py-8 lg:px-16 lg:py-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
      <header className="mb-4 lg:mb-8">
        <h2 className="text-3xl lg:text-[2.75rem] font-extrabold text-[#3B362E] tracking-tight mb-2">
          Bom dia, Luke.
        </h2>
        <p className="text-gray-500 font-medium text-sm lg:text-base">
          Você tem {medications.length} remédio(s) agendado(s) para hoje.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-6 lg:gap-12 items-stretch">
        <aside className="col-span-12 lg:col-span-4 order-1">
          <div className="flex flex-col gap-6 h-full min-h-112.5">
            <div className="flex-1 flex flex-col">
              <ProgressCard />
            </div>
            <div className="flex-1 flex flex-col">
              <NextRemedy />
            </div>
          </div>
        </aside>

        <div className="col-span-12 lg:col-span-8 order-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 px-2 gap-2">
            <h3 className="text-xl lg:text-2xl font-bold text-[#3B362E]">
              Cronograma Diário
            </h3>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">
              Hoje, {todayFormatted}
            </span>
          </div>
          <ScheduleList />
        </div>
      </div>

      <div className="w-full mt-4 lg:mt-8">
        <ActivityList />
      </div>
    </div>
  );
}
