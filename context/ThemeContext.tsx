import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';

export const ThemeContext = createContext({
  darkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [darkMode, setDarkMode] = useState(false);
  const fetchDarkModePreference = async () => {
    try {
      const value = await AsyncStorage.getItem('userOptions');
      const parseValue = value ? JSON.parse(value) : '';
      console.log(value, 'valje');
      if (parseValue.darkMode !== null) {
        setDarkMode(parseValue.darkMode);
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };
  useEffect(() => {
    fetchDarkModePreference();
  }, [AsyncStorage]);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    AsyncStorage.setItem(
      'userOptions',
      JSON.stringify({darkMode: newValue}),
    ).catch(error => console.error('Error storing options:', error));
  };

  const theme = useMemo(() => {
    return {
      darkMode,
      toggleDarkMode: toggleDarkMode,
      colors: {
        white: 'white',
        black: 'black',
        grey: '#b7b7b7',
        lightwhite: '#eaeaea',
        blue: '#3a9dff',
      },
      mainContainerDarkMode: {
        backgroundColor: 'black',
        color: 'white',
      },
      textColor: {
        color: 'white',
      },
    };
  }, [darkMode]);
  console.log(theme, 'themememe');
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
