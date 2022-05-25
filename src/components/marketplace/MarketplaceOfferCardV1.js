import PropTypes from 'prop-types';
import { Card, Progress } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import StakingStatusTag from '../staking/StakingStatusTag';
import { DetailsButton } from '../buttons/DetailsButton';
import { CancelButton } from '../buttons/CancelButton';
import { DeclineButton } from '../buttons/DeclineButton';
import { ApproveButton } from '../buttons/ApproveButton';
import { StakingPotIcon } from '../buttons/StakingPotIcon';
import { StakingRequestType } from '../../utils/StakingRequestType';

const MarketplaceOfferCardV1 = ({
  loading,
  nodeAddress,
  stakeHolderAddress,
  isMarketplace,
  type,
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
  onCancel,
  onDetails,
  onWithdraw
}) => {
  const { account } = useWeb3React();
  const isNodeOwner = () => account === nodeAddress || (account === stakeHolderAddress) === nodeAddress;

  const isStakeHolder = () => account === stakeHolderAddress;

  return (
    <Card
      // border-2 border-etny-orange-500
      className="rounded-lg bg-gray-100 dark:bg-etny-blue-gray-500 border-0 cursor-pointer"
      loading={loading}
    >
      <div className="flex items-start justify-start space-x-4 mb-4">
        <StakingPotIcon label={type === StakingRequestType.BASE ? 'B' : 'E'} />
        <p className="uppercase text-gray-800 dark:text-gray-50 text-2xl font-medium m-0 ml-2">{title}</p>
        {/* <StakingStatusTag status={status} /> */}
      </div>
      <p className="text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">{subtitle || 'Staking'}</p>
      {description !== '' && <p className="text-gray-600 dark:text-gray-100 text-md font-bold mt-4">{description}</p>}
      <div className="flex items-center justify-between py-2 space-x-4">
        <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-2xl">
          <span className="font-grotesk slashed-zero font-bold">{secondaryLeftValue}</span>
          {secondaryLeftValueSuffix} <span className="text-xs text-gray-400 font-bold">{secondaryLeftLabel}</span>
        </div>

        <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-2xl text-right">
          <span className="font-grotesk slashed-zero font-bold">{secondaryRightValue}</span>
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
            <span className="font-grotesk slashed-zero font-bold">{mainLeftValue}</span>
            {mainLeftUnit}
            <span className="block text-xl">{mainLeftValueSuffix}</span>
          </p>
        </div>

        <div className="ml-0 text-right">
          <p className="uppercase text-gray-800 dark:text-blue-400 text-lg font-medium mb-1">{mainRightLabel}</p>
          <p className="uppercase text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">
            <span className="font-grotesk slashed-zero font-bold"> {mainRightValue}</span>
            {mainRightUnit}
            <span className="block text-xl">{mainRightValueSuffix}</span>
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
      <div className="flex items-center justify-between w-full space-x-2">
        {status === StakingPotStatus.PENDING && isStakeHolder() && (
          <>
            <CancelButton onCancel={onCancel} />
            <DetailsButton onDetails={onDetails} />
          </>
        )}

        {status === StakingPotStatus.PENDING && isNodeOwner() && (
          <>
            <DeclineButton onCancel={onDecline} />
            <ApproveButton onCancel={onApprove} />
            <DetailsButton onDetails={onDetails} />
          </>
        )}

        {status === StakingPotStatus.APPROVED && isStakeHolder() && (
          <>
            <CancelButton onDetails={onCancel} />
            <DetailsButton onDetails={onDetails} />
          </>
        )}

        {status === StakingPotStatus.APPROVED && isNodeOwner() && <DetailsButton onDetails={onDetails} />}

        {status === StakingPotStatus.DECLINED && <DetailsButton onDetails={onDetails} />}

        {status === StakingPotStatus.CANCELED && <DetailsButton onDetails={onDetails} />}
      </div>
    </Card>
  );
};

MarketplaceOfferCardV1.propTypes = {
  type: PropTypes.string,
  nodeAddress: PropTypes.string.isRequired,
  stakeHolderAddress: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.number,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  pro: PropTypes.array,
  cons: PropTypes.array,
  secondaryLeftLabel: PropTypes.string,
  secondaryLeftValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondaryLeftValueSuffix: PropTypes.string,
  secondaryRightLabel: PropTypes.string,
  secondaryRightValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondaryRightValueSuffix: PropTypes.string,
  mainLeftLabel: PropTypes.string,
  mainLeftValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mainLeftUnit: PropTypes.string,
  mainLeftValueSuffix: PropTypes.string,
  mainRightLabel: PropTypes.string,
  mainRightValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mainRightUnit: PropTypes.string,
  mainRightValueSuffix: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  percentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  percentLabel: PropTypes.string,
  percentLabelSuffix: PropTypes.string,
  onApprove: PropTypes.func,
  onDecline: PropTypes.func,
  onCancel: PropTypes.func,
  onDetails: PropTypes.func
};

MarketplaceOfferCardV1.defaultProps = {
  pro: [],
  cons: []
};
export default MarketplaceOfferCardV1;
