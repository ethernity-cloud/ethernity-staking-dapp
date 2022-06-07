import PropTypes from 'prop-types';
import { Card, Progress } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import { DetailsButton } from '../buttons/DetailsButton';
import { CancelButton } from '../buttons/CancelButton';
import { DeclineButton } from '../buttons/DeclineButton';
import { ApproveButton } from '../buttons/ApproveButton';
import { StakingPotIcon } from '../buttons/StakingPotIcon';
import { StakingRequestType } from '../../utils/StakingRequestType';
import { ApplyButton } from '../buttons/ApplyButton';

const MarketplaceOfferCardV1 = ({
  loading,
  hasIcon,
  hasActionButtons,
  hasStatisticsDetails,
  hasProgressBar,
  nodeAddress,
  stakeHolderAddress,
  isMarketplace,
  isContract,
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
  secondaryCenterLabel,
  secondaryCenterValue,
  secondaryCenterValueSuffix,
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
  pendingCountLabel,
  pendingCount,
  approvedCountLabel,
  approvedCount,
  declinedCountLabel,
  declinedCount,
  percent,
  percentValue,
  percentLabel,
  percentLabelSuffix,
  onApprove,
  onApply,
  onDecline,
  onCancel,
  onDetails,
  onWithdraw
}) => {
  const { account } = useWeb3React();
  const isNodeOwner = () => account === nodeAddress || (account === stakeHolderAddress) === nodeAddress;

  const isStakeHolder = () => account === stakeHolderAddress;

  const renderActionsForBaseStaking = () => (
    <>
      {status === StakingPotStatus.PENDING && isStakeHolder() && (
        <>
          <CancelButton onCancel={onCancel} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.PENDING && isNodeOwner() && (
        <>
          <DeclineButton onCancel={onCancel} hasIcon={false} className="w-full" />
          <ApproveButton onApprove={onApprove} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.APPROVED && isStakeHolder() && (
        <>
          <CancelButton onCancel={onCancel} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.APPROVED && isNodeOwner() && <DetailsButton onDetails={onDetails} hasIcon={false} />}

      {status === StakingPotStatus.DECLINED && <DetailsButton onDetails={onDetails} hasIcon={false} />}

      {status === StakingPotStatus.CANCELED && <DetailsButton onDetails={onDetails} hasIcon={false} />}
    </>
  );

  const renderActionsForExtendedStaking = () => (
    <>
      {status === StakingPotStatus.PENDING && isStakeHolder() && (
        <>
          <CancelButton onCancel={onCancel} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.PENDING && isNodeOwner() && (
        <>
          <DeclineButton onCancel={onCancel} hasIcon={false} className="w-full" />
          <ApproveButton onApprove={onApprove} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.APPROVED && isStakeHolder() && (
        <>
          <CancelButton onCancel={onCancel} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.APPROVED && isNodeOwner() && <DetailsButton onDetails={onDetails} hasIcon={false} />}

      {status === StakingPotStatus.DECLINED && <DetailsButton onDetails={onDetails} hasIcon={false} />}

      {status === StakingPotStatus.CANCELED && <DetailsButton onDetails={onDetails} hasIcon={false} />}
    </>
  );

  const renderActionsForContract = () => (
    <>
      {status === StakingPotStatus.PENDING && isStakeHolder() && (
        <>
          <DeclineButton onDecline={onDecline} hasIcon={false} className="w-full" />
          <ApproveButton onApprove={onApprove} hasIcon={false} className="w-full" />
        </>
      )}

      {status === StakingPotStatus.PENDING && isNodeOwner() && (
        <>
          <CancelButton onCancel={onCancel} hasIcon={false} />
        </>
      )}

      {status === StakingPotStatus.APPROVED && isStakeHolder() && (
        <>
          <CancelButton onCancel={onCancel} hasIcon={false} />
        </>
      )}

      {status === StakingPotStatus.APPROVED && isNodeOwner() && <CancelButton onCancel={onCancel} hasIcon={false} />}

      {/* {status === StakingPotStatus.DECLINED && <DetailsButton onDetails={onDetails} hasIcon={false} />} */}

      {/* {status === StakingPotStatus.CANCELED && <DetailsButton onDetails={onDetails} hasIcon={false} />} */}
    </>
  );

  const renderActionsForMarketplace = () => (
    <>
      {status === StakingPotStatus.PENDING && (
        <>
          <ApplyButton onApply={onApply} hasIcon={false} className="w-full" />
          <DetailsButton onDetails={onDetails} hasIcon={false} className="w-full" />
        </>
      )}
    </>
  );

  const renderActions = () => {
    if (!hasActionButtons) return <></>;
    if (isContract) return renderActionsForContract();
    if (isMarketplace) return renderActionsForMarketplace();
    if (type === StakingRequestType.BASE) return renderActionsForBaseStaking();
    return renderActionsForExtendedStaking();
  };

  return (
    <Card
      className="rounded-lg bg-gray-100 dark:bg-etny-dark-900 border-4 border-etny-dark-300 cursor-pointer"
      loading={loading}
    >
      <div className="flex items-start justify-start mb-1">
        {hasIcon && <StakingPotIcon label={type === StakingRequestType.BASE ? 'B' : 'E'} />}
        <p className="uppercase text-gray-800 dark:text-gray-50 text-2xl font-medium m-0">{title}</p>
        {/* <StakingStatusTag status={status} /> */}
      </div>
      <p className="text-gray-800 dark:text-gray-50 text-base font-medium mb-4">{subtitle || 'Staking'}</p>
      {description !== '' && <p className="text-gray-600 dark:text-gray-100 text-md font-bold mt-4">{description}</p>}
      <div className="flex items-center justify-between py-2 space-x-4">
        <div>
          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-xs font-bold mb-1">
            {secondaryLeftLabel}
          </p>
          <p className="uppercase text-gray-800 dark:text-gray-50 text-2xl font-medium mb-4">
            <span className="font-grotesk slashed-zero font-bold"> {secondaryLeftValue}</span>
            {secondaryLeftValueSuffix}{' '}
          </p>
        </div>

        <div className="text-center">
          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-xs font-bold mb-1">
            {secondaryCenterLabel}
          </p>
          <p className="uppercase text-gray-800 dark:text-gray-50 text-2xl font-medium mb-4">
            <span className="font-grotesk slashed-zero font-bold"> {secondaryCenterValue}</span>
            {secondaryCenterValueSuffix}{' '}
          </p>
        </div>

        <div className="ml-0 text-right">
          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-xs font-bold mb-1">
            {secondaryRightLabel}
          </p>
          <p className="uppercase text-gray-800 dark:text-gray-50 text-2xl font-medium mb-4">
            <span className="font-grotesk slashed-zero font-bold"> {secondaryRightValue}</span>
            {secondaryRightValueSuffix}{' '}
          </p>
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
          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-lg font-medium mb-1">
            {mainLeftLabel}
          </p>
          <p className="uppercase text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">
            <span className="font-grotesk slashed-zero font-bold">{mainLeftValue}</span>
            {mainLeftUnit}
            <span className="block text-xl">{mainLeftValueSuffix}</span>
          </p>
        </div>

        <div className="ml-0 text-right">
          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-lg font-medium mb-1">
            {mainRightLabel}
          </p>
          <p className="uppercase text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">
            <span className="font-grotesk slashed-zero font-bold"> {mainRightValue}</span>
            {mainRightUnit}
            <span className="block text-xl">{mainRightValueSuffix}</span>
          </p>
        </div>
      </div>
      {hasStatisticsDetails && (
        <div className="flex items-center justify-between mb-2">
          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-xs font-bold">
            {pendingCountLabel} <span className="text-black dark:text-white inline-block">{pendingCount}</span>
          </p>

          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-xs font-bold">
            {approvedCountLabel} <span className="text-black dark:text-white inline-block">{approvedCount}</span>
          </p>

          <p className="uppercase text-gray-800 dark:text-etny-blue-gray-150 text-xs font-bold">
            {declinedCountLabel} <span className="text-black dark:text-white inline-block">{declinedCount}</span>
          </p>
        </div>
      )}

      {hasProgressBar && (
        <div className="block m-auto my-2">
          <div>
            <span className="uppercase text-xs font-bold inline-block text-gray-500 dark:text-etny-blue-gray-150">
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
      )}
      <div className="flex items-center justify-end w-full space-x-1">{renderActions()}</div>
    </Card>
  );
};

MarketplaceOfferCardV1.propTypes = {
  isMarketplace: PropTypes.bool,
  isContract: PropTypes.bool,
  loading: PropTypes.bool,
  hasIcon: PropTypes.bool,
  hasActionButtons: PropTypes.bool,
  hasProgressBar: PropTypes.bool,
  hasStatisticsDetails: PropTypes.bool,
  type: PropTypes.string,
  nodeAddress: PropTypes.string,
  stakeHolderAddress: PropTypes.string,
  title: PropTypes.string.isRequired,
  status: PropTypes.number,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  pro: PropTypes.array,
  cons: PropTypes.array,
  secondaryLeftLabel: PropTypes.string,
  secondaryLeftValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondaryLeftValueSuffix: PropTypes.string,
  secondaryCenterLabel: PropTypes.string,
  secondaryCenterValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondaryCenterValueSuffix: PropTypes.string,
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
  pendingCountLabel: PropTypes.string,
  pendingCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  approvedCountLabel: PropTypes.string,
  approvedCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  declinedCountLabel: PropTypes.string,
  declinedCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  percentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  percentLabel: PropTypes.string,
  percentLabelSuffix: PropTypes.string,
  onApprove: PropTypes.func,
  onApply: PropTypes.func,
  onDecline: PropTypes.func,
  onCancel: PropTypes.func,
  onDetails: PropTypes.func
};

MarketplaceOfferCardV1.defaultProps = {
  pro: [],
  cons: [],
  hasIcon: true,
  hasActionButtons: true,
  hasProgressBar: true
};
export default MarketplaceOfferCardV1;
