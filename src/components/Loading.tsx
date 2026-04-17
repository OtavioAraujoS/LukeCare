import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-4 text-[#8C7E6A]">
      <Loader2 className="animate-spin" size={40} />
      <p className="font-medium animate-pulse">Sincronizando com a nuvem...</p>
    </div>
  );
}
