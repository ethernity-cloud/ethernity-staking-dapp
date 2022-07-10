import { Col, Row, Tabs } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import WalletCard from '../../wallet/WalletCard';

const AccountTab = () => (
  <div className="my-4 mx-0">
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} sm={24} md={12} lg={12} xl={6}>
        <WalletCard
          type="available"
          title="Total tokens"
          prefix={<ArrowUpOutlined />}
          suffix="ETNY"
          actionLabel="Refresh"
        />
      </Col>
      <Col xs={{ span: 24 }} sm={24} md={12} lg={12} xl={6}>
        <WalletCard
          type="available"
          title="Total staked"
          prefix={<ArrowUpOutlined />}
          suffix="ETNY"
          actionLabel="Refresh"
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={6}>
        <WalletCard
          type="total"
          title="Available tokens"
          prefix={<ArrowUpOutlined />}
          suffix="ETNY"
          actionLabel="Refresh"
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={6}>
        <WalletCard
          type="reward"
          title="Reward claimed"
          prefix={<ArrowUpOutlined />}
          value={2322.3}
          suffix="ETNY"
          actionLabel="Refresh"
        />
      </Col>
    </Row>
  </div>
);

AccountTab.propTypes = {};

AccountTab.defaultProps = {};
export default AccountTab;
