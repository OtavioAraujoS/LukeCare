import { useMedicationStore } from "../store/useMedicationStore";
import { useActivities } from "../store/useActivities";
import { Clock, Bell, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function NextRemedy() {
  const { medications } = useMedicationStore();
  const { activities } = useActivities();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = now.toISOString().slice(0, 10);

  const remainingMeds = medications.filter((med) => {
    return !activities.some(
      (act) =>
        act.type === "medication" &&
        act.metadata?.medicationId === med.id &&
        act.timestamp.slice(0, 10) === today,
    );
  });

  const nextMed = [...remainingMeds].sort((a, b) =>
    a.scheduledTime.localeCompare(b.scheduledTime),
  )[0];

  const getTimeRemaining = (scheduledTime: string) => {
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const scheduledDate = new Date();
    scheduledDate.setHours(hours, minutes, 0, 0);

    const diffInMs = scheduledDate.getTime() - now.getTime();
    const diffInMins = Math.round(diffInMs / 60000);

    if (diffInMins < 0) return { label: "Horário passado", isUrgent: true };
    if (diffInMins < 60)
      return { label: `${diffInMins} min`, isUrgent: diffInMins < 15 };

    const h = Math.floor(diffInMins / 60);
    const m = diffInMins % 60;
    return { label: `${h}h ${m}m`, isUrgent: false };
  };
  if (!nextMed) {
    return (
      <div className="h-full bg-[#F5F3ED] rounded-[2rem] lg:rounded-4xl p-8 flex flex-col items-center justify-center shadow-sm border border-white/50 min-h-40">
        <div className="size-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
          <Bell size={24} className="text-gray-300" />
        </div>
        <p className="text-sm font-bold text-gray-400 text-center max-w-37.5">
          Tudo em dia por enquanto!
        </p>
      </div>
    );
  }

  const { label, isUrgent } = getTimeRemaining(nextMed.scheduledTime);
  return (
    <div className="h-full bg-[#F5F3ED] rounded-[2rem] lg:rounded-4xl p-6 lg:p-10 flex flex-col shadow-sm border border-white/50 relative overflow-hidden transition-all group">
      <div className="flex flex-wrap justify-between gap-0 lg:gap-4 items-start z-10">
        <p className="text-[0.6rem] lg:text-[0.8rem] font-bold text-[#8C7E6A] uppercase tracking-[0.2em] opacity-70">
          Próximo Cuidado
        </p>
        <div
          className={`px-3 py-1 text-center rounded-full text-[0.5rem] lg:text-[0.6rem] font-black text-white shadow-sm transition-colors ${isUrgent ? "bg-red-500 animate-pulse" : "bg-[#6B6357]"}`}
        >
          {isUrgent ? "URGENTE" : "EM BREVE"}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center py-6 z-10">
        <div
          className={`size-20 lg:size-22 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl mb-8 transition-all duration-500 group-hover:scale-110 ${isUrgent ? "bg-red-500" : "bg-[#5C5446]"}`}
        >
          {isUrgent ? (
            <AlertCircle size={30} className="lg:size-11" />
          ) : (
            <Clock size={30} className="lg:size-11" />
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-xl lg:text-2xl font-black text-[#3E3831] leading-tight px-2">
            {nextMed.name}
          </h4>
          <div className="flex flex-wrap flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 text-sm lg:text-base font-bold text-[#8C7E6A]">
            <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full">
              <span className="opacity-50 text-[0.5rem] uppercase">
                Horário
              </span>{" "}
              {nextMed.scheduledTime}
            </span>
            <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full">
              <span className="opacity-50 text-[0.5rem] uppercase">Dose</span>{" "}
              {nextMed.dosage}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[#E3DFD5] flex justify-between items-center z-10">
        <div className="flex flex-col">
          <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Faltam aproximadamente
          </p>
          <p
            className={`text-2xl lg:text-4xl font-black tracking-tighter ${isUrgent ? "text-red-600" : "text-[#3E3831]"}`}
          >
            {label}
          </p>
        </div>

        <div className="size-12 lg:size-14 rounded-full bg-white flex items-center justify-center text-[#5C5446] shadow-md border border-[#F0EDE4] transition-transform active:scale-90">
          <Bell
            size={20}
            className={`${isUrgent ? "text-red-500 animate-bounce" : "opacity-40"}`}
          />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
        <Clock size={350} strokeWidth={1} />
      </div>
    </div>
  );
}
