import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

export const ThemeContext = createContext({
  darkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [darkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDarkModePreference = async () => {
      try {
        const value = await AsyncStorage.getItem('userOptions');
        const parseValue = value ? JSON.parse(value) : '';
        console.log(value, 'valje');
        if (parseValue.darkMode !== null) {
          setIsDarkMode(parseValue.darkMode === true);
        }
      } catch (error) {
        console.error('Error loading dark mode preference:', error);
      }
    };

    fetchDarkModePreference();
  }, []);

  const theme = {
    darkMode,
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : '#ffffff',
    },
    text: {
      color: darkMode ? '#ffffff' : '#000000',
    },
  };
  console.log(theme);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
