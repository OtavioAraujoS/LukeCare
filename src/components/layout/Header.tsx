import { NavLink } from "react-router-dom";

export function Header() {
  const baseStyle =
    "text-xs font-bold transition-all duration-200 pb-1 border-b-2 md:text-sm";

  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${baseStyle} text-[#3B362E] border-[#3B362E]`
      : `${baseStyle} text-gray-400 border-transparent hover:text-gray-800 hover:border-gray-200`;
  return (
    <header className="flex justify-center items-center py-8 px-12 border-b border-gray-50/50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
      <nav className="flex gap-8">
        <NavLink to="/" className={getNavLinkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/remedios" className={getNavLinkStyle}>
          Remédios
        </NavLink>

        <NavLink to="/historico" className={getNavLinkStyle}>
          Histórico
        </NavLink>
      </nav>
    </header>
  );
}
