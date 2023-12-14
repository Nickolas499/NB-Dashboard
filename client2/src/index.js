import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { AssignProvider } from "./context/assignContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AssignProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AssignProvider>
    </AuthProvider>
  </React.StrictMode>
);
