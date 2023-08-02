import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { RegistrationProvider } from "./context/registrationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RegistrationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RegistrationProvider>
    </AuthProvider>
  </React.StrictMode>
);
