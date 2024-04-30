import { createContext, useContext, useState } from 'react';

const PreferencesContext = createContext();

// eslint-disable-next-line react/prop-types
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    Continent: [],
    MinTemp: [],
    MaxTemp: [],
    startD: [],
    endD: []
  });

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);