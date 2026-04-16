import { useActivities } from "../store/useActivities";

export function ActivityList() {
  const activities = useActivities((state) => state.activities);

  return (
    <div className="bg-[#F5F3ED] rounded-4xl p-8 shadow-sm">
      <h3 className="font-bold text-xl text-[#3B362E] mb-6">
        Atividade Recente
      </h3>
      <div className="flex flex-col gap-6 relative border-l-2 border-gray-300 ml-3 pl-6 max-h-112 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <div className="relative">
            <div className="absolute -left-8.25 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-[#F5F3ED] bg-gray-400"></div>
            <p className="text-sm font-bold text-[#3B362E]">
              Nenhuma atividade registrada
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Registre atividades do dia para acompanhar o histórico.
            </p>
          </div>
        ) : (
          [...activities]
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime(),
            )
            .map((activity) => (
              <div key={activity.id} className="relative">
                <div className="absolute -left-8.25 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-[#F5F3ED] bg-[#A78B5A]"></div>
                <p className="text-sm font-bold text-[#3B362E]">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
