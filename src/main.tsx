import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { toast } from "sonner";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  toast.error("Erro crítico: Não encontrei o elemento #root no HTML");
}
