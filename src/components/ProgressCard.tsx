import { useMedicationStore } from "../store/useMedicationStore";
import { useActivities } from "../store/useActivities";

export function ProgressCard() {
  const medications = useMedicationStore((state) => state.medications);
  const activities = useActivities((state) => state.activities);
  const today = new Date().toISOString().slice(0, 10);
  const total = medications.length;

  const taken = medications.filter((med) =>
    activities.some(
      (act) =>
        act.type === "medication" &&
        act.metadata?.medicationId === med.id &&
        act.timestamp.slice(0, 10) === today,
    ),
  ).length;
  const percentage = total === 0 ? 0 : Math.round((taken / total) * 100);
  return (
    <div className="h-full bg-[#F5F3ED] rounded-3xl lg:rounded-4xl p-6 lg:p-8 flex flex-col items-center justify-center shadow-sm">
      <p className="text-sm lg:text-[1.2rem] text-center font-bold text-gray-500 tracking-widest uppercase mb-6 lg:mb-8">
        Progresso Diário
      </p>

      <div
        className="w-32 h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center mb-6 lg:mb-8 relative transition-all duration-500"
        style={{
          background: `conic-gradient(#5C5446 ${percentage}%, #E3DFD5 0)`,
        }}
      >
        <div className="absolute inset-0 m-2.5 lg:m-3 bg-[#F5F3ED] rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-3xl lg:text-4xl font-extrabold text-[#3E3831]">
            {percentage}%
          </span>
          <span className="text-[10px] lg:text-xs font-bold text-gray-500 mt-1">
            {taken} de {total}
          </span>
        </div>
      </div>

      <p className="text-xs lg:text-sm text-center font-medium text-[#7A7369] px-2 leading-relaxed">
        {percentage === 100
          ? "Excelente! Todos os cuidados de hoje foram concluídos."
          : percentage > 50
            ? "Mais da metade já foi! Falta pouco."
            : "Vamos começar os cuidados de hoje?"}
      </p>
    </div>
  );
}
