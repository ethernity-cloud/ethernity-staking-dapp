import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const ApproveButton = ({ className, onApprove, hasIcon }) => (
  <Button
    className={`bg-white hover:bg-green-100 focus:bg-green-200
                text-green-500 hover:text-green-500 focus:text-green-500
                border-2 border-primary hover:border-primary dark:border-0 rounded-md ${className}`}
    onClick={onApprove}
  >
    Approve
    {hasIcon && <CheckCircleOutlined />}
  </Button>
);

ApproveButton.propTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  onApprove: PropTypes.func
};
ApproveButton.defaultProps = {
  hasIcon: true
};
