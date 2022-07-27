import React from 'react';
import { Button, Row } from 'antd';
import { FaMoon, FaSun } from 'react-icons/fa';
import MetaMaskButton from '../../components/MetaMaskButton';
import useTheme from '../../hooks/useTheme';
import Logo from '../../components/Logo';

const NavbarNotLoggedIn = () => {
  const { theme, onThemeChange, THEME_LIGHT, THEME_DARK } = useTheme();

  const onThemeChanged = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (theme === THEME_LIGHT) {
      onThemeChange('dark');
    } else {
      onThemeChange('light');
    }
  };

  const backgroundColor = `bg-white dark:bg-etny-background`;
  return (
    <div className={`fixed z-10 h-20 w-full ${backgroundColor}`}>
      <Row justify="space-between" align="middle" className="h-20 w-full md:w-4/5 mx-auto px-4">
        <Logo />

        <div className="flex justify-between items-center space-x-6">
          {theme === THEME_LIGHT && (
            <Button
              shape="circle"
              className="bg-etny-200  border-0
              dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus"
              onClick={onThemeChanged}
              icon={<FaMoon className="w-4 h-4 text-white dark:text-white pt-1" />}
            />
          )}

          {theme === THEME_DARK && (
            <Button
              shape="circle"
              className="bg-etny-200  border-0
              dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus"
              onClick={onThemeChanged}
              icon={<FaSun className="w-4 h-4 text-white dark:text-white pt-1" />}
            />
          )}

          <MetaMaskButton />
        </div>
      </Row>
    </div>
  );
};

export default NavbarNotLoggedIn;
