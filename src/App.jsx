import React from "react";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ScriptProvider } from "./contexts/ScriptContext";
import { MainLayout } from "./components/layout/MainLayout";

function App() {
  return (
    <ThemeContextProvider>
      <ScriptProvider>
        <MainLayout />
      </ScriptProvider>
    </ThemeContextProvider>
  );
}

export default App;
