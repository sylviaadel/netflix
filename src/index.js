import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ItemsProvider } from "./state/ItemsProvider";
import { UsersProvider } from "./state/UsersProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersProvider storageKey="user-uid">
      <ItemsProvider storageKey="items">
        <App />
      </ItemsProvider>
    </UsersProvider>
  </React.StrictMode>
);

reportWebVitals();
