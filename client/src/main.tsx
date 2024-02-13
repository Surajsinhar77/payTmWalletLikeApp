import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../app/globals.css";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { BrowserRouter as Routers } from "react-router-dom";
// import AuthProvider from "./common/Store/authStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routers>
      {/* <AuthProvider> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      {/* </AuthProvider> */}
    </Routers>
  </React.StrictMode>
);
