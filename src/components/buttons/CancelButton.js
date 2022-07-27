import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const CancelButton = ({ className, onCancel, hasIcon }) => (
  <Button
    size="large"
    className={`bg-white hover:bg-etny-cancel-hover focus:bg-etny-cancel-focus
                text-etny-cancel-text hover:text-etny-cancel-text focus:text-etny-cancel-text
                border-2 border-etny-cancel-text hover:border-etny-cancel-text dark:border-0 rounded-md ${className}`}
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
