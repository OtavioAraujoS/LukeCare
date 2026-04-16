import { Book, Calendar, Clock, Plus } from "lucide-react";

interface SidebarProps {
  setIsModalOpen: (open: boolean) => void;
}

export function Sidebar({ setIsModalOpen }: SidebarProps) {
  return (
    <aside className="w-72 flex flex-col border-r border-gray-100 p-8 pb-10">
      <h1 className="text-2xl font-extrabold tracking-tight mb-10 text-[#3B362E]">
        LukeCare
      </h1>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl overflow-hidden shadow-inner border-2 border-white">
          🐶
        </div>
        <div>
          <p className="font-extrabold text-[#3B362E] text-lg leading-none mb-1">
            Luke
          </p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Protocolo Ativo
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-6 flex-1">
        <button className="flex items-center gap-4 text-sm font-extrabold text-[#3B362E] bg-gray-50 -mx-4 px-4 py-3 rounded-2xl">
          <Calendar size={20} className="text-[#3B362E]" /> Cuidados de Hoje
        </button>
        <button className="flex items-center gap-4 text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors">
          <Book size={20} /> Biblioteca de Remédios
        </button>
        <button className="flex items-center gap-4 text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors">
          <Clock size={20} /> Histórico de Atividades
        </button>
      </nav>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-4 bg-[#635A4D] hover:bg-[#4E463C] text-white font-bold rounded-[1.25rem] flex items-center justify-center gap-2 shadow-md transition-all"
      >
        <Plus size={18} strokeWidth={3} /> Novo Remédio
      </button>
    </aside>
  );
}
