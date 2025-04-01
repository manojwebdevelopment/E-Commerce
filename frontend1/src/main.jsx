import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported here
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from "@/components/ui/provider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
