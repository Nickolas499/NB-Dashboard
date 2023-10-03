import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { GraphProvider } from "./context/graphContext";
import { RegistrationProvider } from "./context/registrationContext";
import { ScanedProvider } from "./context/scanedContext";
import { DesignedProvider } from "./context/designedContext";
import { RedesignedProvider } from "./context/redesignedContext";
import { WorkProvider } from "./context/workContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GraphProvider>
        <WorkProvider>
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
        </WorkProvider>
      </GraphProvider>
    </AuthProvider>
  </React.StrictMode>
);
