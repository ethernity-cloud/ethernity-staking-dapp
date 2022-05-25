import { Button } from 'antd';
import PropTypes from 'prop-types';

export const PrimaryButton = ({ className, isSubmitButton, icon, label, onClick }) => (
  <Button
    className={`bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                  text-white hover:text-white focus:text-white
                  border-0 rounded-md ${className}`}
    onClick={onClick}
    htmlType={isSubmitButton ? 'submit' : 'button'}
  >
    {label}
    {icon}
  </Button>
);

PrimaryButton.propTypes = {
  className: PropTypes.string,
  isSubmitButton: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func
};
