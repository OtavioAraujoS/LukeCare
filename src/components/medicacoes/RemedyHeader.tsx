export function RemedyHeader({
  medicationsLength,
}: {
  medicationsLength: number;
}) {
  return (
    <header className="flex justify-between items-start mb-12">
      <div className="max-w-xl">
        <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-2 block">
          Catalogo de Remedios
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-[#3B362E]">
          Biblioteca
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Explore e gerencie os medicamentos e suplementos que fazem parte da
          rotina diária do Luke.
        </p>
      </div>

      <div className="bg-[#F1DECE] rounded-2xl p-6 min-w-40 text-center shadow-sm">
        <span className="block text-4xl font-extrabold text-[#3B362E] mb-1">
          {medicationsLength}
        </span>
        <span className="text-sm font-bold text-[#65584D]">
          Remédios Cadastrados
        </span>
      </div>
    </header>
  );
}
