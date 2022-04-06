import { Col, Row } from 'antd';
import MarketplaceOfferCard from './MarketplaceOfferCard';
import MarketplaceOfferCardV1 from './MarketplaceOfferCardV1';

const MarketplaceOffers = ({ status, className }) => (
  <div className={`py-4 antFadeIn ${className}`}>
    <Row justify="start" gutter={[16, 16]}>
      {Array(30)
        .fill()
        .map((i, index) => (
          <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24}>
            <MarketplaceOfferCardV1
              title={`Staking pot 000${index + 1}`}
              status={status}
              subtitle="GOLD"
              // description="Some short description that needs to be added"
              apr="12.5"
              maturityPeriod="6M"
              poolSize={55}
              amount={2}
              amountSuffix="K"
              percent={50}
              percentLabel="Time till maturity"
              percentLabelSuffix="days"
              actionLabel="Withdraw"
            />
            {/* <MarketplaceOfferCard index={index + 1} status={status} type="BASE STAKING" /> */}
          </Col>
        ))}
    </Row>
  </div>
);
export default MarketplaceOffers;
