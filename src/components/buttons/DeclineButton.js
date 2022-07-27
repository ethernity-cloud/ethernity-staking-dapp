import { Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const DeclineButton = ({ className, onDecline, hasIcon }) => (
  <Button
    size="large"
    className={`bg-white hover:bg-etny-cancel-hover focus:bg-etny-cancel-focus
                text-etny-cancel-text hover:text-etny-cancel-text focus:text-etny-cancel-text
                border-2 border-etny-cancel-text hover:border-etny-cancel-text dark:border-0 rounded-md ${className}`}
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
