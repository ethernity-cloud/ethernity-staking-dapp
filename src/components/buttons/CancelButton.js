import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const CancelButton = ({ className, onCancel, hasIcon }) => (
  <Button
    className={`bg-white hover:bg-red-100 focus:bg-red-200
                text-red-500 hover:text-red-500 focus:text-red-500
                border-2 border-primary hover:border-primary dark:border-0 rounded-md ${className}`}
    onClick={onCancel}
  >
    Cancel
    {hasIcon && <CloseOutlined />}
  </Button>
);
CancelButton.propTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  onCancel: PropTypes.func
};
CancelButton.defaultProps = {
  hasIcon: true
};
