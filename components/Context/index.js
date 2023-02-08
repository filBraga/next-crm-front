import { createContext, useState } from "react";

export const AppContext = createContext();

export const Context = ({ children }) => {
  const [token, setToken] = useState("");

  const [clientListFromBackend, setClientListFromBackend] = useState([]);

  const [clientSelected, setClientSelected] = useState(["oi"]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,

        clientListFromBackend,
        setClientListFromBackend,

        clientSelected,
        setClientSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
