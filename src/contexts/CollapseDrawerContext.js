import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

// ----------------------------------------------------------------------

const initialState = {
  onToggleCollapse: () => {}
};

const CollapseDrawerContext = createContext(initialState);

CollapseDrawerProvider.propTypes = {
  children: PropTypes.node
};

function CollapseDrawerProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapsed: collapsed,
        onToggleCollapse: handleToggleCollapse
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
