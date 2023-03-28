import { createContext, useContext, useState, useReducer } from "react";
import { ItemsReducer } from "./ItemsReducer";

const Context = createContext();

export function UsersProvider({ children, storageKey }) {
  const [data, dispatch] = useReducer(ItemsReducer, []);
  const [uid, setUid] = useState(loadUID(storageKey));
  const values = { uid, setUid, saveUID, data, dispatch };

  function loadUID(storageKey) {
    const data = localStorage.getItem(storageKey);
    return data;
  }

  function saveUID(uid) {
    localStorage.setItem(storageKey, uid);
  }

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  if (!context) throw new Error("useUser() must be used within <UserProvider>");

  return context;
}
