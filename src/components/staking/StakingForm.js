import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col, Row, Input, Select, Space, InputNumber, Modal, notification, Switch, Tooltip } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from '../../redux/store';
import { createStake } from '../../redux/slices/staking';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import { uuidv4 } from '../../utils/uuid';
import WalletRewardCard from '../wallet/WalletRewardCard';
import { StakingRequestType } from '../../utils/StakingRequestType';

const { Option } = Select;

const StakingForm = ({ onClose }) => {
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  const [requestType, setRequestType] = useState(StakingRequestType.BASE);
  const [amount, setAmount] = useState(1900);
  const [period, setPeriod] = useState(6);
  const [split, setSplit] = useState(100);
  const { error, isLoading } = useSelector((state) => state.staking);

  const onRequestTypeChanged = (value) => {
    setRequestType(value);
  };

  const onPeriodChanged = (value) => {
    setPeriod(value);
  };

  const onAmountChanged = (value) => {
    setAmount(value);
  };

  const onSplitChanged = (value) => {
    setSplit(value);
  };

  const onFinish = (values) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      // style: `backgroundColor: ${theme === THEME_LIGHT ? '#FFFFFF' : '#0F0F0F'}`,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
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
        await dispatch(createStake(values));

        notification.success({
          placement: 'bottomRight',
          className: 'bg-white dark:bg-black text-black dark:text-white',
          message: <span className="text-black dark:text-white">Ethernity</span>,
          description: `Staking pot 0002 was successfully created!`
        });

        onClose();
      }
    });
  };
  return (
    <>
      <WalletRewardCard requestType={requestType} amount={amount} period={period} split={split} actionLabel="Refresh" />
      <Form
        layout="vertical"
        requiredMark={false}
        initialValues={{
          type: StakingRequestType.BASE,
          amount: 1900,
          period: 12,
          split: 100,
          stakingAddress: account,
          nodeAddress: '',
          rewardAddress: account,
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
              <Select className="dark:select" placeholder="Staking type" onChange={onRequestTypeChanged}>
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
              <InputNumber
                placeholder="Staking amount"
                step="10"
                className="w-full dark:input-number-calculator"
                min="1900"
                onChange={onAmountChanged}
              />
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
              <Select className="dark:select" placeholder="Staking period" onChange={onPeriodChanged}>
                {[...Array(11).keys()]
                  .map((x) => (
                    <Option key={x} value={x * 6}>
                      {x * 6}
                    </Option>
                  ))
                  .slice(1)}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            {requestType === StakingRequestType.EXTENDED && (
              <Form.Item
                name="split"
                label={<span className="text-black dark:text-white">Reward split (%)</span>}
                rules={[{ required: true, message: 'Please choose the reward split' }]}
              >
                <Select
                  className="dark:select"
                  placeholder="Reward split"
                  disabled={requestType === StakingRequestType.BASE}
                  onChange={onSplitChanged}
                >
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
            className="w-full input-calculator dark:input-calculator"
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
            className="w-full input-calculator dark:input-calculator"
            // addonBefore="0x"
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
            className="w-full input-calculator dark:input-calculator"
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
