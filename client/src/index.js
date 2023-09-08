import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { RegistrationProvider } from "./context/registrationContext";
import { ScanedProvider } from "./context/scanedContext";
import { DesignedProvider } from "./context/designedContext";
import { RedesignedProvider } from "./context/redesignedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RegistrationProvider>
        <ScanedProvider>
          <DesignedProvider>
            <RedesignedProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </RedesignedProvider>
        </DesignedProvider>
        </ScanedProvider>
      </RegistrationProvider>
    </AuthProvider>
  </React.StrictMode>
);
