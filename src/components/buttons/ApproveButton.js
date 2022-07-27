import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const ApproveButton = ({ className, onApprove, hasIcon }) => (
  <Button
    size="large"
    className={`bg-white hover:bg-etny-approve-hover focus:bg-etny-approve-focus
                text-etny-approve-text hover:text-etny-approve-text focus:text-white
                border-2 border-etny-approve-text hover:border-etny-approve-text dark:border-0 rounded-md ${className}`}
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
