export function Header() {
  return (
    <header className="flex justify-center items-center py-8 px-12 border-b border-gray-50/50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
      <div className="flex gap-8 text-sm font-bold text-gray-400">
        <span className="text-[#3B362E] border-b-2 border-[#3B362E] pb-1">
          Dashboard
        </span>
        <span className="hover:text-gray-800 cursor-pointer">Remédios</span>
        <span className="hover:text-gray-800 cursor-pointer">Histórico</span>
      </div>
    </header>
  );
}
