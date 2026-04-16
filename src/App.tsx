import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense, useState } from "react";
import routes from "~react-pages";

import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { AddMedicationModal } from "./components/AddMedicationModal";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-white font-sans overflow-hidden text-[#3B362E]">
        <Sidebar setIsModalOpen={setIsModalOpen} />

        <main className="flex-1 flex flex-col h-full bg-white relative overflow-y-auto">
          <Header />
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                Carregando...
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </main>

        <AddMedicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
