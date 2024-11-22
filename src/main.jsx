import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
// Propseja voi tehdä vain juuresta lapsiinpäin
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App subject="Mappa ♥" />
  </StrictMode>
);
