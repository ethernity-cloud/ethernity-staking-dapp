import React, { useEffect, useState } from 'react';
import { Col, PageHeader, Row, Tabs } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Page from '../../components/Page';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import MarketplaceOfferCardV1 from '../../components/marketplace/MarketplaceOfferCardV1';
import { getDaysUntil, getPercentOfDaysUntil, getRatePerYear } from '../../utils/StakingPotCalculator';
import { formatNumber } from '../../utils/numberFormatter';
import { StakingRequestType } from '../../utils/StakingRequestType';
import EtnyStakingContract from '../../operations/etnyStakingContract';
import StakingPotContracts from '../../components/contract/StakingPotContracts';

const { TabPane } = Tabs;

const StakingPotDetailsPage = () => {
  const { id } = useParams();
  const { account, library } = useWeb3React();
  const etnyStakingContract = new EtnyStakingContract(library);
  const [stake, setStake] = useState({
    type: StakingRequestType.BASE,
    amount: 1900,
    period: 12,
    split: 100,
    stakingAddress: account,
    nodeAddress: '',
    rewardAddress: account,
    canBeSplitted: true,
    isPreApproved: false,
    pendingContracts: 0,
    approvedContracts: 0,
    declinedContracts: 0
  });
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [updatingPending, setUpdatingPending] = useState(false);
  const [updatingApproved, setUpdatingApproved] = useState(false);
  const [updatingCanceled, setUpdatingCanceled] = useState(false);
  const [updatingDeclined, setUpdatingDeclined] = useState(false);

  useEffect(() => {
    getStakingPotDetails(id);
  }, [id]);

  const getStakingPotDetails = async (id) => {
    setIsLoading(true);
    const item = await etnyStakingContract.getExtendedStake(id - 1);
    const stats = await etnyStakingContract.getExtendedStakeRequestContractStats(id - 1);
    item.total = stats.total;
    item.approvedContracts = stats.approvedContracts;
    item.canceledContracts = stats.canceledContracts;
    item.declinedContracts = stats.declinedContracts;
    item.pendingContracts = stats.pendingContracts;
    item.terminatedContracts = stats.terminatedContracts;

    setStake(item);

    const contractsPromises = [];
    for (let i = 0; i < item.total; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      contractsPromises.push(await etnyStakingContract.getStakeContractForStake(id - 1, i));
    }
    const contractsResult = await Promise.all(contractsPromises);
    console.log(contractsResult);

    setContracts(contractsResult);

    setIsLoading(false);
  };
  const onStakingTabChanged = (activeKey) => {
    // eslint-disable-next-line default-case
    switch (parseInt(activeKey, 10)) {
      case 2:
        setUpdatingPending(true);
        break;
      case 3:
        setUpdatingApproved(true);
        break;
      case 4:
        setUpdatingCanceled(true);
        break;
      case 5:
        setUpdatingDeclined(true);
        break;
    }
  };

  return (
    <Page title="Staking overview | ETNY" className="w-4/5 mx-auto my-4">
      <PageHeader
        onBack={() => window.history.back()}
        backIcon={<FaArrowLeft className="text-black dark:text-white" />}
        footer={
          <Tabs
            defaultActiveKey="1"
            className="etny-tabs dark:etny-tabs text-black dark:text-white"
            onChange={onStakingTabChanged}
          >
            <TabPane tab={<span>Pending ({stake.pendingContracts})</span>} key="2">
              <StakingPotContracts
                status={StakingPotStatus.PENDING}
                contracts={contracts.filter((contract) => contract.status === StakingPotStatus.PENDING)}
                onUpdateFinished={() => setUpdatingPending(false)}
                updating={updatingPending}
              />
            </TabPane>
            <TabPane tab={<span>Approved ({stake.approvedContracts})</span>} key="3">
              <StakingPotContracts
                status={StakingPotStatus.APPROVED}
                contracts={contracts.filter((contract) => contract.status === StakingPotStatus.APPROVED)}
                onUpdateFinished={() => setUpdatingApproved(false)}
                updating={updatingApproved}
              />
            </TabPane>
            <TabPane tab={<span>Declined ({stake.declinedContracts})</span>} key="4">
              <StakingPotContracts
                status={StakingPotStatus.CANCELED}
                contracts={contracts.filter((contract) => contract.status === StakingPotStatus.CANCELED)}
                onUpdateFinished={() => setUpdatingCanceled(false)}
                updating={updatingCanceled}
              />
            </TabPane>
          </Tabs>
        }
        title={<span className="uppercase text-black dark:text-white">Back to Marketplace</span>}
      >
        <Row justify="start" gutter={[16, 16]}>
          <Col xl={6} lg={8} md={12} sm={24} xs={24}>
            <MarketplaceOfferCardV1
              loading={isLoading}
              hasActionButtons={false}
              hasProgressBar={false}
              isMarketplace={false}
              nodeAddress={stake.nodeAddress}
              stakeHolderAddress={stake.stakeHolderAddress}
              title={`Offer 000${stake.id + 1}`}
              type={stake.type}
              status={stake.status}
              subtitle={stake.type}
              // description="Some short description that needs to be added"
              secondaryLeftValue={getRatePerYear(stake.timestamp)}
              secondaryLeftValueSuffix="%"
              secondaryLeftLabel="APR FIRST YEAR"
              secondaryCenterValue={stake.split || 100}
              secondaryCenterValueSuffix="%"
              secondaryCenterLabel="Reward split"
              secondaryRightValue={stake.period}
              secondaryRightValueSuffix="M"
              secondaryRightLabel="maturity period"
              mainLeftLabel="Available"
              mainLeftValue={formatNumber(stake.amount - stake.amountBooked)}
              mainLeftUnit=""
              mainLeftValueSuffix="ETNY"
              mainRightLabel="AMOUNT"
              mainRightValue={formatNumber(stake.amount)}
              mainRightUnit=""
              mainRightValueSuffix="ETNY"
              percent={getPercentOfDaysUntil(stake.timestamp, stake.period)}
              percentValue={getDaysUntil(stake.timestamp, stake.period)}
              percentLabel="Time till maturity"
              percentLabelSuffix="days"
            />
          </Col>
        </Row>
      </PageHeader>
    </Page>
  );
};
export default StakingPotDetailsPage;
