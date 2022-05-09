import PropTypes from 'prop-types';
import { Button, Card, Progress } from 'antd';
import { RightOutlined, StopOutlined } from '@ant-design/icons';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import StakingStatusTag from '../staking/StakingStatusTag';

const MarketplaceOfferCardV1 = ({
  loading,
  isMarketplace,
  title,
  status,
  subtitle,
  description,
  pro,
  cons,
  secondaryLeftLabel,
  secondaryLeftValue,
  secondaryLeftValueSuffix,
  secondaryRightLabel,
  secondaryRightValue,
  secondaryRightValueSuffix,
  mainLeftLabel,
  mainLeftValue,
  mainLeftUnit,
  mainLeftValueSuffix,
  mainRightLabel,
  mainRightValue,
  mainRightUnit,
  mainRightValueSuffix,
  percent,
  percentValue,
  percentLabel,
  percentLabelSuffix,
  onApprove,
  onDecline,
  onWithdraw
}) => (
  <Card className="rounded-lg bg-gray-100 dark:bg-[#151515] border-1 border-[#26292C] cursor-pointer" loading={loading}>
    <div className="flex items-center justify-between space-x-4 mb-4">
      <p className="uppercase text-gray-800 dark:text-gray-50 text-2xl font-medium m-0">{title}</p>
      <StakingStatusTag status={status} />
    </div>

    <p className="text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">{subtitle || 'Staking'}</p>

    {description !== '' && <p className="text-gray-600 dark:text-gray-100 text-md font-bold mt-4">{description}</p>}

    <div className="flex items-center justify-between py-2 space-x-4">
      <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-2xl">
        {secondaryLeftValue}
        {secondaryLeftValueSuffix} <span className="text-xs text-gray-400 font-bold">{secondaryLeftLabel}</span>
      </div>

      <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl text-right">
        {secondaryRightValue}
        {secondaryRightValueSuffix} <span className="uppercase text-xs text-gray-400">{secondaryRightLabel}</span>
      </div>
    </div>

    {pro.length > 0 && (
      <ul className="text-sm text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
        {pro.map((item, index) => (
          <li key={`cons_${index}`} className="mb-3 flex items-center">
            <CheckmarkSvg />
            {item}
          </li>
        ))}
      </ul>
    )}

    {cons.length > 0 && (
      <ul className="text-sm text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
        {cons.map((item, index) => (
          <li key={`cons_${index}`} className="mb-3 flex items-center opacity-50">
            <NotCheckmarkSvg />
            {item}
          </li>
        ))}
      </ul>
    )}

    <div className="flex items-center justify-between">
      <div>
        <p className="uppercase text-gray-800 dark:text-blue-400 text-lg font-medium mb-1">{mainLeftLabel}</p>
        <p className="uppercase text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">
          {mainLeftValue}
          {mainLeftUnit} <span className="text-xl">{mainLeftValueSuffix}</span>
        </p>
      </div>

      <div className="ml-0 text-right">
        <p className="uppercase text-gray-800 dark:text-blue-400 text-lg font-medium mb-1">{mainRightLabel}</p>
        <p className="uppercase text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">
          {mainRightValue}
          {mainRightUnit} <span className="text-xl">{mainRightValueSuffix}</span>
        </p>
      </div>
    </div>
    <div className="block m-auto my-2">
      <div>
        <span className="text-sm inline-block text-gray-500 dark:text-gray-100">
          {percentLabel} :{' '}
          <span className="text-gray-700 dark:text-white font-bold">
            {percentValue}
            {percentLabelSuffix}
          </span>
        </span>
      </div>
      <Progress
        percent={percent}
        showInfo={false}
        strokeColor={{
          '0%': '#75CEFB',
          '25%': '#0286C8',
          '75%': '#108ee9',
          '100%': '#0069A3'
        }}
      />
    </div>
    {status !== StakingPotStatus.DECLINED && (
      <div className="flex items-center justify-between w-full space-x-2">
        {status !== StakingPotStatus.APPROVED && !isMarketplace && (
          <Button type="primary" className="w-full text-green-500 font-bold hover:bg-green-100" onClick={onApprove}>
            Approve
            <RightOutlined />
          </Button>
        )}

        {/* {!isMarketplace && ( */}
        {/*  <Button type="primary" onClick={onWithdraw} className="w-full"> */}
        {/*    Withdraw */}
        {/*    <CreditCardOutlined /> */}
        {/*  </Button> */}
        {/* )} */}

        {!isMarketplace && (
          <Button type="primary" danger className="w-full" onClick={onDecline}>
            Decline
            <StopOutlined />
          </Button>
        )}
      </div>
    )}
  </Card>
);

MarketplaceOfferCardV1.propTypes = {
  type: PropTypes.oneOf(['base', 'extended']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pro: PropTypes.array,
  cons: PropTypes.array
};

MarketplaceOfferCardV1.defaultProps = {
  pro: [],
  cons: []
};
export default MarketplaceOfferCardV1;
