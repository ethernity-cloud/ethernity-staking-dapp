import React from 'react';
import { QRCode } from 'react-qrcode-logo';

import PropTypes from 'prop-types';
import useTheme from '../hooks/useTheme';

const EtnyQRCode = ({ account, size }) => {
  const { theme, THEME_DARK } = useTheme();

  console.log(account);
  return (
    <div className="qr-code-container">
      <QRCode
        size={size || 150}
        value={account}
        removeQrCodeBehindLogo
        bgColor={theme === THEME_DARK ? '#070E1D' : '#FFF'}
        fgColor={theme === THEME_DARK ? '#FFFFFF' : '#000000'}
        ecLevel="H"
        logoImage={theme === THEME_DARK ? '/static/logo/logo_dark.svg' : '/static/logo/logo_white.svg'}
        logoWidth={48}
        logoHeight={48}
        className="qr-code"
      />
    </div>
  );
};

EtnyQRCode.propTypes = {
  account: PropTypes.string,
  size: PropTypes.number
};
export default EtnyQRCode;
