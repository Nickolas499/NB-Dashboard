import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { AssignProvider } from "./context/assignContext";
import { ProductionProvider } from "./context/ProductionContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductionProvider>
        <AssignProvider>
          <BrowserRouter>
            <div class="background">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <App />
          </BrowserRouter>
        </AssignProvider>
      </ProductionProvider>
    </AuthProvider>
  </React.StrictMode>
);
