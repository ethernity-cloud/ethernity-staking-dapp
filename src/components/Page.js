import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', className, ...other }, ref) => (
  <div ref={ref} {...other} className={`bg-white dark:bg-gray-700 h-full ${className}`}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
