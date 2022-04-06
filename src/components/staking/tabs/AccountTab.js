import PropTypes from 'prop-types';
import { Button, Card, Col, Progress, Row, Statistic, Tag } from 'antd';
import { AuditOutlined, RightOutlined, StopOutlined, CreditCardOutlined, ArrowUpOutlined } from '@ant-design/icons';
import WalletCard from '../../wallet/WalletCard';

const AccountTab = () => (
  <div className="my-4 mx-0">
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} sm={24} md={12} lg={12} xl={6}>
        <Card className="bg-gray-200 dark:bg-gray-800 border-transparent rounded-2xl">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title={<span className="text-black dark:text-white">Anual percentage rate</span>}
                value={29}
                precision={2}
                suffix="%"
                style={{ fontWeight: 500 }}
                valueStyle={{ color: 'white' }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={<span className="text-black dark:text-white">Account Balance (ETNY)</span>}
                value={112893}
                precision={2}
                style={{ fontWeight: 500 }}
                valueStyle={{ color: 'white' }}
              />
              <Button style={{ marginTop: 16 }} type="primary">
                Stake all
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={24} md={12} lg={12} xl={6}>
        <WalletCard
          type="available"
          title="Available tokens"
          prefix={<ArrowUpOutlined />}
          suffix="ETNY"
          className="bg-[#BEECFF]"
          actionLabel="Refresh"
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={6}>
        <WalletCard
          type="total"
          title="Total tokens"
          prefix={<ArrowUpOutlined />}
          suffix="ETNY"
          className="bg-[#FFC7BA]"
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
          className="bg-[#DEF0BF]"
          actionLabel="Refresh"
        />
      </Col>
    </Row>
  </div>
);

AccountTab.propTypes = {};

AccountTab.defaultProps = {};
export default AccountTab;
