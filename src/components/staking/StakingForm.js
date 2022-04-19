import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Card,
  Statistic,
  Space,
  InputNumber,
  Modal,
  notification,
  Switch,
  Tooltip
} from 'antd';
import { CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from '../../redux/store';
import { createStake } from '../../redux/slices/staking';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import { uuidv4 } from '../../utils/uuid';

const { Option } = Select;

const StakingForm = ({ onClose }) => {
  const BASE_REQUEST = 'Base Staking';
  const EXTENDED_REQUEST = 'Extended Staking';
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  const [requestType, setRequestType] = useState('Base Staking');
  const { error, isLoading } = useSelector((state) => state.staking);

  const onRequestTypeChanged = (value) => {
    setRequestType(value);
  };

  const onFinish = (values) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Are you sure you want to create a new STAKING POT for the amount of{' '}
          <span className="bg-amber-300 p-1 font-semibold">{values.amount} ETNY</span> ? The amount of gas fee used for
          this transaction is 0.005 ETNY
        </span>
      ),
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        console.log(JSON.stringify(values));
        values.id = uuidv4();
        values.status = values.approved ? StakingPotStatus.APPROVED : StakingPotStatus.PENDING;
        values.createdOn = new Date();
        // values.status = statuses[randomIntFromInterval(0, 2)];
        await dispatch(createStake(values));

        notification.success({
          placement: 'bottomRight',
          message: `Ethernity`,
          description: `Staking pot 0002 was successfully created!`
        });

        onClose();
      }
    });
  };
  return (
    <>
      <Card className="bg-[#BEECFF]	border-transparent rounded-lg shadow-md dark:shadow-gray-500 mb-6">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Statistic
              title="Your Reward"
              value={29}
              precision={2}
              prefix="+"
              suffix="ETNY"
              style={{ fontWeight: 500 }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Statistic title="Account Balance" value={112893} precision={2} suffix="ETNY" style={{ fontWeight: 500 }} />
          </Col>
        </Row>
      </Card>
      <Form
        layout="vertical"
        hideRequiredMark
        initialValues={{
          type: 'Base Staking',
          amount: 1900,
          period: 12,
          split: 100,
          stakingAddress: account,
          nodeAddress: '',
          rewardAddress: '',
          approved: false
        }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="w-full font-medium text-gray-500 dark:text-gray-400"
              name="type"
              label={<span className="text-black dark:text-white">Staking request type</span>}
              rules={[{ required: true, message: 'Please enter amount for staking' }]}
            >
              <Select placeholder="Staking type" defaultValue={requestType} onChange={onRequestTypeChanged}>
                <Option value="Base Staking">Base Staking</Option>
                <Option value="Extended Staking">Extended Staking</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="amount"
              label={<span className="text-black dark:text-white">Staking amount (ETNY)</span>}
              rules={[{ required: true, message: 'Please enter amount for staking' }]}
            >
              <InputNumber placeholder="Staking amount" step="10" className="w-full" defaultValue={1900} min="1900" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="period"
              label={<span className="text-black dark:text-white">Staking period (months)</span>}
              rules={[{ required: true, message: 'Please select staking period' }]}
            >
              <Select placeholder="Staking period">
                {[...Array(11).keys()]
                  .map((x) => (
                    <Option key={x} value={x * 6}>
                      {x * 6}
                    </Option>
                  ))
                  .slice(1)}
              </Select>
            </Form.Item>

            {/* <Form.Item */}
            {/*  name="apr" */}
            {/*  label={<span className="text-black dark:text-white">Annual percentage rate (%)</span>} */}
            {/* > */}
            {/*  <Input defaultValue="5" disabled /> */}
            {/* </Form.Item> */}
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            {requestType === EXTENDED_REQUEST && (
              <Form.Item
                name="split"
                label={<span className="text-black dark:text-white">Reward split (%)</span>}
                rules={[{ required: true, message: 'Please choose the reward split' }]}
              >
                <Select placeholder="Reward split" defaultValue="50" disabled={requestType === BASE_REQUEST}>
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="40">40</Option>
                  <Option value="50">50</Option>
                  <Option value="60">60</Option>
                  <Option value="70">70</Option>
                  <Option value="80">80</Option>
                  <Option value="90">90</Option>
                  <Option value="100">100</Option>
                </Select>
              </Form.Item>
            )}
          </Col>
        </Row>

        <Form.Item
          name="stakingAddress"
          label={<span className="text-black dark:text-white">Staking wallet address</span>}
        >
          <Input
            defaultValue={account}
            addonAfter={
              <Tooltip title="Copy wallet address">
                <CopyOutlined
                  onClick={() =>
                    notification.success({
                      placement: 'bottomRight',
                      message: `Ethernity`,
                      description: `Wallet address has been copied.`
                    })
                  }
                />
              </Tooltip>
            }
            disabled
          />
        </Form.Item>

        <Form.Item name="nodeAddress" label={<span className="text-black dark:text-white">Node wallet address</span>}>
          <Input
            addonBefore="0x"
            addonAfter={
              <Tooltip title="Copy node wallet address">
                <CopyOutlined
                  onClick={() =>
                    notification.success({
                      placement: 'bottomRight',
                      message: `Ethernity`,
                      description: `Wallet address has been copied.`
                    })
                  }
                />
              </Tooltip>
            }
            placeholder="Node wallet address"
          />
        </Form.Item>

        <Form.Item
          name="rewardAddress"
          label={<span className="text-black dark:text-white">Reward wallet address</span>}
          rules={[{ required: true, message: 'Please enter the reward wallet address' }]}
        >
          <Input
            addonBefore="0x"
            addonAfter={
              <Tooltip title="Copy reward wallet address">
                <CopyOutlined
                  onClick={() =>
                    notification.success({
                      placement: 'bottomRight',
                      message: `Ethernity`,
                      description: `Wallet address has been copied.`
                    })
                  }
                />
              </Tooltip>
            }
            placeholder="Reward account address"
          />
        </Form.Item>

        <Form.Item
          name="approved"
          label={<span className="text-black dark:text-white">Is staking pot pre-approved?</span>}
        >
          <Switch checkedChildren="YES" unCheckedChildren="NO" />
        </Form.Item>

        {/* <Row gutter={16}> */}
        {/*  <Col span={24}> */}
        {/*    <Form.Item */}
        {/*      name="description" */}
        {/*      label="Description" */}
        {/*      rules={[ */}
        {/*        { */}
        {/*          required: true, */}
        {/*          message: 'Please enter details about your transaction' */}
        {/*        } */}
        {/*      ]} */}
        {/*    > */}
        {/*      <Input.TextArea rows={4} placeholder="Please enter details about your transaction" /> */}
        {/*    </Form.Item> */}
        {/*  </Col> */}
        {/* </Row> */}

        <Row gutter={16} className="mt-4 mx-1 float-right">
          <Space size="middle">
            <Form.Item>
              <Button className="w-28">Cancel</Button>
            </Form.Item>

            <Form.Item>
              <Button className="w-28" type="danger">
                Reset
              </Button>
            </Form.Item>

            <Form.Item>
              <Button className="w-28" type="primary" htmlType="submit" loading={isLoading}>
                Review stake
              </Button>
            </Form.Item>
          </Space>
        </Row>
      </Form>
    </>
  );
};

StakingForm.propTypes = {
  onClose: PropTypes.func
};

export default StakingForm;
