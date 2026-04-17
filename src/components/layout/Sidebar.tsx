import { Book, Calendar, Clock, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  setIsModalOpen: (open: boolean) => void;
}

export function Sidebar({ setIsModalOpen }: SidebarProps) {
  const baseItemClass =
    "group flex items-center gap-4 text-sm px-4 py-3 rounded-2xl transition-all duration-200 -mx-4";

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${baseItemClass} font-extrabold text-[#3B362E] bg-gray-50` // Estilo Ativo
      : `${baseItemClass} font-bold text-gray-400 hover:text-gray-800 hover:bg-gray-50/50`; // Estilo Inativo
  };
  return (
    <aside className="hidden w-72 md:flex flex-col border-r border-gray-100 p-8 pb-10">
      <h1 className="text-2xl font-extrabold tracking-tight mb-10 text-[#3B362E]">
        LukeCare
      </h1>

      <div className="flex items-center gap-4 mb-10">
        <img
          src="/luke.png"
          alt="Avatar do Luke"
          className="size-20 rounded-full object-cover"
        />
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
        <NavLink to="/" className={getLinkStyle}>
          {({ isActive }) => (
            <>
              <Calendar
                size={20}
                className={
                  isActive
                    ? "text-[#3B362E]"
                    : "text-gray-400 group-hover:text-gray-800"
                }
              />
              Cuidados de Hoje
            </>
          )}
        </NavLink>

        <NavLink to="/remedios" className={getLinkStyle}>
          {({ isActive }) => (
            <>
              <Book
                size={20}
                className={
                  isActive
                    ? "text-[#3B362E]"
                    : "text-gray-400 group-hover:text-gray-800"
                }
              />
              Biblioteca de Remédios
            </>
          )}
        </NavLink>

        <NavLink to="/historico" className={getLinkStyle}>
          {({ isActive }) => (
            <>
              <Clock
                size={20}
                className={
                  isActive
                    ? "text-[#3B362E]"
                    : "text-gray-400 group-hover:text-gray-800"
                }
              />
              Histórico de Atividades
            </>
          )}
        </NavLink>
      </nav>

      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer w-full py-4 bg-[#635A4D] hover:bg-[#4E463C] text-white font-bold rounded-[1.25rem] flex items-center justify-center gap-2 shadow-md transition-all"
      >
        <Plus size={18} strokeWidth={3} /> Novo Remédio
      </button>
    </aside>
  );
}
