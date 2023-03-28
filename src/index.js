import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UsersProvider } from "./state/UsersProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersProvider storageKey="user-uid">
      <App />
    </UsersProvider>
  </React.StrictMode>
);

reportWebVitals();
