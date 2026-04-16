import { useState, useMemo } from "react";
import { Pill, Trash2 } from "lucide-react";
import { useActivities, type Activity } from "../../store/useActivities";

export default function HistoryPage() {
  const { activities, removeActivity } = useActivities();
  const [activeFilter] = useState("all");

  const groupedActivities = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? activities
        : activities.filter((a) => a.type === activeFilter);

    const sorted = [...filtered].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    const groups: Record<string, Activity[]> = {};
    sorted.forEach((activity) => {
      const date = new Date(activity.timestamp);
      const dateString = date
        .toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "short",
        })
        .toUpperCase();

      if (!groups[dateString]) groups[dateString] = [];
      groups[dateString].push(activity);
    });

    return groups;
  }, [activities, activeFilter]);

  if (Object.keys(groupedActivities).length === 0) {
    return (
      <div className="h-screen px-16 py-12 max-w-5xl mx-auto w-full relative min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="size-40 p-4 rounded-full bg-[#F5F3ED] flex items-center justify-center">
          <Pill size={24} className="text-[#65584D]" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold text-[#3B362E]">
            Nenhuma atividade registrada
          </h2>
          <p className="text-gray-400 text-center">
            Parece que ainda não há registros de atividades relacionadas aos
            remédios do Luke. Comece a adicionar atividades para acompanhar o
            histórico completo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 md:px-16 md:py-12 max-w-5xl mx-auto w-full relative min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#3B362E] tracking-tight mb-3">
          Remedy Logs
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
          Acompanhe o histórico completo das atividades relacionadas aos
          remédios do Luke.
        </p>
      </header>

      <div className="space-y-16">
        {Object.entries(groupedActivities).map(([date, items]) => (
          <section key={date}>
            <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-10 pb-4 border-b border-gray-100">
              {date ===
              new Date()
                .toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
                .toUpperCase()
                ? `TODAY, ${date}`
                : date}
            </h3>

            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start gap-3 md:gap-8 w-full"
                >
                  <div className="md:w-20 md:pt-6 md:text-right shrink-0">
                    <span className="text-xs md:text-sm font-bold text-[#3B362E] opacity-60">
                      {new Date(item.timestamp).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex-1 w-full bg-[#FDFCF9] rounded-3xl md:rounded-[2.5rem] p-5 md:p-6 border border-gray-100 shadow-sm flex items-center gap-4 md:gap-6 relative group hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Pill size={18} className="text-[#65584D]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-base md:text-lg font-bold text-[#3B362E] leading-tight">
                            {item.description}
                          </h4>
                          <div className="flex gap-2 mt-2">
                            <span className="text-[9px] md:text-[10px] font-bold bg-[#F5F3ED] text-[#65584D] px-3 py-1 rounded-full uppercase tracking-wide">
                              {item.type === "medication"
                                ? "Medicação"
                                : "Exercício"}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeActivity(item.id)}
                          className="p-2 md:p-4 cursor-pointer hover:bg-red-50 rounded-full transition-colors shrink-0"
                          aria-label="Excluir registro"
                        >
                          <Trash2
                            size={18}
                            className="text-red-400 hover:text-red-600"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
