import { Link } from 'react-router-dom';
import { Button, Card, Col, Drawer, Modal, notification, Row, Space, Statistic, Tag, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined, FileDoneOutlined, FileExclamationOutlined, InfoOutlined } from '@ant-design/icons';
import { useState } from 'react';
import StakingForm from '../staking/StakingForm';

const { Title } = Typography;
const { Meta } = Card;

const MarketplaceOfferCard = ({ index, status, type }) => {
  const [stakingDrawerVisible, setStakingDrawerVisible] = useState(false);

  const onDrawerClosed = () => {
    setStakingDrawerVisible(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'PENDING':
        return 'gold';
      case 'APPROVED':
        return 'success';
      case 'DECLINED':
        return 'error';
      default:
        return 'success';
    }
  };
  const onApprove = () => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to decline staking pot #001?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        notification.success({
          message: `Staking pot #001`,
          description: 'Offer for the staking pot #001 has been approved'
        });
      }
    });
  };

  const onDecline = () => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to approve staking pot #001?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        notification.error({
          message: `Staking pot #001`,
          description: 'Offer for staking pot #001 has been rejected'
        });
      }
    });
  };

  const onInfoDetails = () => {
    setStakingDrawerVisible(true);
  };
  const createCardActions = () => [
    <Tooltip key={1} title="Decline offer">
      {/* <Link */}
      {/*  to={{ */}
      {/*    pathname: `/dashboard` */}
      {/*  }} */}
      {/* > */}
      <FileExclamationOutlined onClick={onDecline} />
      {/* </Link> */}
    </Tooltip>,
    <Tooltip key={2} title="Approve offer">
      <FileDoneOutlined onClick={onApprove} />
    </Tooltip>,
    <Tooltip key={3} title="More details">
      <InfoOutlined onClick={onInfoDetails} />
    </Tooltip>
  ];

  return (
    <>
      <Card
        hoverable
        actions={createCardActions()}
        title={`#00${index} - 04 Feb 2022`}
        extra={[<Tag color="success">{type}</Tag>, <Tag color={getStatusColor()}>{status}</Tag>]}
        className="text-black dark:text-white bg-white dark:bg-gray-300 dark:border-0"
      >
        <Link
          to={{
            pathname: `/ibp/datasources/details`
          }}
        >
          {/* <Meta */}
          {/*  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} */}
          {/*  title="Card title" */}
          {/*  description="This is the description" */}
          {/* /> */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Verified member"
                value="Rank I"
                precision={2}
                style={{ fontWeight: 600, textAlign: 'center' }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Account Balance (ETNY)"
                value={112893}
                precision={2}
                style={{ fontWeight: 500, textAlign: 'center' }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Anual percentage rate"
                value={5}
                precision={2}
                suffix="%"
                style={{ fontWeight: 500, textAlign: 'center' }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Reward split"
                value={50}
                precision={0}
                suffix="%"
                style={{ fontWeight: 500, textAlign: 'center' }}
              />
            </Col>
          </Row>
          <Row gutter={16} />
          {/* <div className="bg-[#DEF0BF] border-transparent rounded-lg shadow-lg mt-2 pt-5 px-4"> */}
          {/*  <Row gutter={[16, 16]}> */}
          {/*    <Col xs={24} sm={24} md={12} lg={12} xl={12}> */}
          {/*      <p className="text-black text-md font-semibold">Cycle ends in:</p> */}
          {/*    </Col> */}
          {/*    <Col xs={24} sm={24} md={12} lg={12} xl={12}> */}
          {/*      <p className="text-lg font-semibold">23:00:01</p> */}
          {/*    </Col> */}
          {/*  </Row> */}
          {/* </div> */}
        </Link>
      </Card>
      <Drawer
        title="Create new staking pot"
        width={480}
        onClose={onDrawerClosed}
        visible={stakingDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        headerStyle={{ backgroundColor: '#3FA9FF', color: '#fff', height: 64 }}
        footer={
          <Space>
            <Button onClick={onDrawerClosed}>Cancel</Button>
            <Button onClick={onDrawerClosed} type="primary">
              Submit
            </Button>
          </Space>
        }
        // extra={
        //   <Space>
        //     <Button onClick={onDrawerClosed}>Cancel</Button>
        //     <Button onClick={onDrawerClosed} type="primary">
        //       Submit
        //     </Button>
        //   </Space>
        // }
      >
        <StakingForm onClose={onDrawerClosed} />
      </Drawer>
    </>
  );
};
export default MarketplaceOfferCard;
