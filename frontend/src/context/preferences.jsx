import { createContext, useContext, useState } from 'react';

const PreferencesContext = createContext();

const formatDate = (date) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  return formattedDate;
};

// eslint-disable-next-line react/prop-types
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    Continent: [],
    MinTemp: [],
    MaxTemp: [],
    Date: formatDate(Date.now())
  
  });

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);