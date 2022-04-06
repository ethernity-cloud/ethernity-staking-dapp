import { Button, Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import WalletCard from '../wallet/WalletCard';
import MarketplaceOfferCardV1 from '../marketplace/MarketplaceOfferCardV1';
import { randomIntFromInterval } from '../../utils/Math';
import { useSelector } from '../../redux/store';

const statuses = ['PENDING', 'APPROVED', 'DECLINED'];
const pools = ['GOLD', 'PLATINUM', 'DIAMOND'];
const StakingOverview = ({ ...props }) => {
  const { error, isLoading, stakes } = useSelector((state) => state.staking);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <div className="py-4 antFadeI">
            <Row justify="start" gutter={[16, 16]}>
              {stakes.map((stake, index) => (
                <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24}>
                  <MarketplaceOfferCardV1
                    title={`Staking pot 000${index + 1}`}
                    status={statuses[randomIntFromInterval(0, 2)]}
                    subtitle={stake.type}
                    // description="Some short description that needs to be added"
                    secondaryLeftValue="12"
                    secondaryLeftValueSuffix="%"
                    secondaryLeftLabel="APR FIRST YEAR"
                    secondaryRightValue={stake.period}
                    secondaryRightValueSuffix="M"
                    secondaryRightLabel="maturity period"
                    mainLeftLabel="SPLIT"
                    mainLeftValue={stake.split || 100}
                    mainLeftUnit="%"
                    mainLeftValueSuffix="ETNY"
                    mainRightLabel="AMOUNT"
                    mainRightValue={stake.amount}
                    mainRightUnit=""
                    mainRightValueSuffix="ETNY"
                    percent={randomIntFromInterval(10, 100)}
                    percentLabel="Time till maturity"
                    percentLabelSuffix="days"
                    actionLabel="Withdraw"
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StakingOverview;
