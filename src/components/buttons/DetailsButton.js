import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const DetailsButton = ({ className, onDetails, hasIcon }) => (
  <Button
    className={`bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                  text-white hover:text-white focus:text-white
                  border-0 rounded-sm font-bold ${className}`}
    onClick={onDetails}
  >
    Details
    {hasIcon && <RightOutlined />}
  </Button>
);
DetailsButton.propTypes = {
  className: PropTypes.string,
  hasIcon: PropTypes.bool,
  onDetails: PropTypes.func
};
DetailsButton.defaultProps = {
  hasIcon: true
};
