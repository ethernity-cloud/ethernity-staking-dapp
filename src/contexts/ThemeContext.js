import PropTypes from 'prop-types';
import { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// ----------------------------------------------------------------------

const initialState = {
  onThemeChange: () => {}
};

const ThemeContext = createContext(initialState);

ThemeProvider.propTypes = {
  children: PropTypes.node
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('etny-theme', 'light');
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  useEffect(() => {
    handleThemeChange(theme);
  }, []);

  const handleThemeChange = (theme) => {
    setTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        THEME_LIGHT,
        THEME_DARK,
        theme,
        onThemeChange: handleThemeChange
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
