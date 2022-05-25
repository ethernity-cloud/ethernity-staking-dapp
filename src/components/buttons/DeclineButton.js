import { Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const DeclineButton = ({ className, onDecline, hasIcon }) => (
  <Button
    className={`bg-white hover:bg-red-100 focus:bg-red-200
                text-red-500 hover:text-red-500 focus:text-red-500
                border-2 border-primary hover:border-primary dark:border-0 rounded-md ${className}`}
    onClick={onDecline}
  >
    Decline
    {hasIcon && <StopOutlined />}
  </Button>
);
DeclineButton.propTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  onDecline: PropTypes.func
};
DeclineButton.defaultProps = {
  hasIcon: true
};
