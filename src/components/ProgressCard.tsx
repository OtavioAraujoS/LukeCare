import { useMedicationStore } from "../store/useMedicationStore";

export function ProgressCard() {
  const medications = useMedicationStore((state) => state.medications);
  const total = medications.length;
  const taken = medications.filter((m) => m.takenToday).length;
  const percentage = total === 0 ? 0 : Math.round((taken / total) * 100);

  return (
    <div className="bg-[#F5F3ED] rounded-4xl p-8 flex flex-col items-center justify-center shadow-sm">
      <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-8">
        Progresso Diário
      </p>

      <div
        className="w-40 h-40 rounded-full flex items-center justify-center mb-8 relative"
        style={{
          background: `conic-gradient(#5C5446 ${percentage}%, #E3DFD5 0)`,
        }}
      >
        <div className="absolute inset-0 m-3 bg-[#F5F3ED] rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-4xl font-extrabold text-[#3E3831]">
            {percentage}%
          </span>
          <span className="text-xs font-bold text-gray-500 mt-1">
            {taken} de {total}
          </span>
        </div>
      </div>

      <p className="text-sm text-center font-medium text-[#7A7369] px-2 leading-relaxed">
        {percentage === 100
          ? "Tudo certo! Rotina concluída."
          : "Falta pouco! Continue administrando a rotina."}
      </p>
    </div>
  );
}
