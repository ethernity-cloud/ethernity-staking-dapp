import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row, Input, Select, Space, InputNumber, Modal, notification, Switch, Tooltip } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { IoCopyOutline } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WalletRewardCard from '../wallet/WalletRewardCard';
import { StakingRequestType } from '../../utils/StakingRequestType';
import EtnyStakingContract from '../../operations/etnyStakingContract';
import { emptyWalletAddress, isAddress } from '../../utils/web3Utils';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { CancelButton } from '../buttons/CancelButton';
import { parseExceptionReason } from '../../utils/parsing';
import { isNullOrUndefined } from '../../utils/objectUtils';

const { Option } = Select;

const StakingForm = ({ onClose }) => {
  const { account, library } = useWeb3React();
  const etnyStakingContract = new EtnyStakingContract(library);
  const [requestType, setRequestType] = useState(StakingRequestType.BASE);
  const [amount, setAmount] = useState(1900);
  const [minAmount, setMinAmount] = useState(1900);
  const [maxAmount, setMaxAmount] = useState(0);
  const [period, setPeriod] = useState(6);
  const [split, setSplit] = useState(100);

  const [nodeAddress, setNodeAddress] = useState('');
  const [rewardAddress, setRewardAddress] = useState('');
  const [canBeSplitted, setCanBeSplitted] = useState(true);
  const [initialValues, setInitialValues] = useState({
    type: StakingRequestType.BASE,
    amount: 1900,
    period: 12,
    split: 100,
    stakingAddress: account,
    nodeAddress: '',
    rewardAddress: account,
    canBeSplitted: true,
    isPreApproved: false
  });

  useEffect(() => {
    const initialize = async () => {
      const minAmount = await etnyStakingContract.getMinBaseStakeAmount();
      const maxAmount = await etnyStakingContract.getMaxBaseStakeAmount();
      setAmount(minAmount);
      setMinAmount(minAmount);
      setMaxAmount(maxAmount);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (requestType === StakingRequestType.EXTENDED && nodeAddress && isAddress(nodeAddress)) {
      setCanBeSplitted(false);
    }
  }, [nodeAddress, requestType]);

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

  const handleCanBeSplitted = (value) => {
    console.log(value);
    setCanBeSplitted(value);
  };

  const onFinish = (values) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      // style: `backgroundColor: ${theme === THEME_LIGHT ? '#FFFFFF' : '#0F0F0F'}`,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <>
          <p>
            Users interacting with digital assets as financial investment should be aware that investment involves
            risks, including the possible loss of some or all assets. Losses are not insured.
          </p>
          <p>
            Users are advised to exercise caution, conduct research and not invest more than they can afford to lose.
          </p>
          <p>
            Are you sure you want to create a new STAKING POT for the amount of{' '}
            <span className="font-grotesk bg-red-500 p-1 font-semibold">{values.amount} ETNY</span> ?
          </p>
        </>
      ),
      okButtonProps: { type: 'primary', danger: true },
      okText: 'I agree',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          if (values.type === StakingRequestType.BASE) {
            await etnyStakingContract.addBaseStakeRequest(values.nodeAddress, values.amount, values.period);
          }

          if (values.type === StakingRequestType.EXTENDED) {
            if (isNullOrUndefined(values.nodeAddress) || values.nodeAddress === '') {
              values.nodeAddress = emptyWalletAddress;
            }
            await etnyStakingContract.addExtendedStakeRequest(
              values.nodeAddress,
              values.amount,
              values.rewardAddress,
              values.period,
              values.split,
              canBeSplitted,
              values.isPreApproved
            );
          }

          notification.success({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">Ethernity</span>,
            description: `A new staking pot was successfully created!`
          });

          onClose();
        } catch (e) {
          notification.error({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">Ethernity</span>,
            description: parseExceptionReason(e.reason)
          });
        }
      }
    });
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <WalletRewardCard
          className="mb-6"
          requestType={requestType}
          amount={amount}
          period={period}
          split={split}
          actionLabel="Refresh"
        />
      </div>
      <Form layout="vertical" requiredMark="optional" initialValues={initialValues} onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="w-full font-medium text-gray-500 dark:text-gray-400"
              name="type"
              label={<span className="text-black dark:text-white">Staking request type</span>}
              tooltip={{
                title: 'Request type',
                icon: <InfoCircleOutlined />
              }}
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
              className="w-full font-medium text-gray-500 dark:text-gray-400"
              name="amount"
              label={<span className="text-black dark:text-white">Staking amount (ETNY)</span>}
              tooltip={{
                title: 'Request type',
                icon: <InfoCircleOutlined />
              }}
              rules={[{ required: true, message: 'Please enter amount for staking' }]}
            >
              <InputNumber
                placeholder="Staking amount"
                step="10"
                className="w-full dark:input-number-calculator"
                min={minAmount}
                max={maxAmount}
                onChange={onAmountChanged}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="w-full font-medium text-gray-500 dark:text-gray-400"
              name="period"
              label={<span className="text-black dark:text-white">Staking period (Months)</span>}
              tooltip={{
                title: 'Staking period is the time used to keep tokens blocked using a staking request',
                icon: <InfoCircleOutlined />
              }}
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
                className="w-full font-medium text-gray-500 dark:text-gray-400"
                name="split"
                label={<span className="text-black dark:text-white">Reward split for op. (%)</span>}
                tooltip={{
                  title: 'The percentage of ETNY tokens gained by staking that goes to the node operator',
                  icon: <InfoCircleOutlined />
                }}
                rules={[{ required: true, message: 'Please choose the reward split' }]}
              >
                <Select
                  className="dark:select"
                  placeholder="Reward split for operator"
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
          className="w-full font-medium text-gray-500 dark:text-gray-400"
          name="stakingAddress"
          label={<span className="text-black dark:text-white">Staking wallet address</span>}
          tooltip={{
            title: 'Wallet address is the current address',
            icon: <InfoCircleOutlined />
          }}
          rules={[
            { required: true, message: 'Please provide staking wallet address' },
            {
              message: 'The provided input is not a valid address!',
              validator(_, value) {
                if (value && isAddress(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The provided input is not a valid address!'));
              }
            }
          ]}
        >
          <Input
            className="w-full input-calculator dark:input-calculator"
            addonAfter={
              <CopyToClipboard text={account}>
                {/* <Tooltip title="Copy wallet address"> */}
                <IoCopyOutline
                  className="text-lg cursor-pointer"
                  onClick={() =>
                    notification.success({
                      placement: 'bottomRight',
                      message: `Ethernity`,
                      description: `Wallet address has been copied.`
                    })
                  }
                />
                {/* </Tooltip> */}
              </CopyToClipboard>
            }
            disabled
          />
        </Form.Item>

        {requestType === StakingRequestType.BASE && (
          <Form.Item
            className="w-full font-medium text-gray-500 dark:text-gray-400"
            name="nodeAddress"
            label={<span className="text-black dark:text-white">Node wallet address</span>}
            tooltip={{
              title: 'Node address is the address where ...',
              icon: <InfoCircleOutlined />
            }}
            rules={[
              { required: true, message: 'Please provide node wallet address' },
              {
                message: 'The provided input is not a valid address!',
                validator(_, value) {
                  if (value === '' || (value && isAddress(value))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The provided input is not a valid address!'));
                }
              }
            ]}
          >
            <Input
              className="w-full input-calculator dark:input-calculator"
              // addonBefore="0x"
              addonAfter={
                <CopyToClipboard text={nodeAddress}>
                  {/* <Tooltip title="Copy node wallet address"> */}
                  <IoCopyOutline
                    className="text-lg cursor-pointer"
                    onClick={() =>
                      notification.success({
                        placement: 'bottomRight',
                        message: `Ethernity`,
                        description: `Node wallet address has been copied.`
                      })
                    }
                  />
                  {/* </Tooltip> */}
                </CopyToClipboard>
              }
              placeholder="Node wallet address"
              onChange={(e) => setNodeAddress(e.target.value)}
            />
          </Form.Item>
        )}

        {requestType === StakingRequestType.EXTENDED && (
          <Form.Item
            className="w-full font-medium text-gray-500 dark:text-gray-400"
            name="nodeAddress"
            label={<span className="text-black dark:text-white">Node wallet address</span>}
            tooltip={{
              title: 'Node address is the address where ...',
              icon: <InfoCircleOutlined />
            }}
            rules={[
              {
                message: 'The provided input is not a valid address!',
                validator(_, value) {
                  if (value === '' || (value && isAddress(value))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The provided input is not a valid address!'));
                }
              }
            ]}
          >
            <Input
              className="w-full input-calculator dark:input-calculator"
              // addonBefore="0x"
              addonAfter={
                <CopyToClipboard text={nodeAddress}>
                  {/* <Tooltip title="Copy node wallet address"> */}
                  <IoCopyOutline
                    className="text-lg cursor-pointer"
                    onClick={() =>
                      notification.success({
                        placement: 'bottomRight',
                        message: `Ethernity`,
                        description: `Node wallet address has been copied.`
                      })
                    }
                  />
                  {/* </Tooltip> */}
                </CopyToClipboard>
              }
              placeholder="Node wallet address"
              onChange={(e) => setNodeAddress(e.target.value)}
            />
          </Form.Item>
        )}

        {requestType === StakingRequestType.EXTENDED && (
          <Form.Item
            className="w-full font-medium text-gray-500 dark:text-gray-400"
            name="rewardAddress"
            label={<span className="text-black dark:text-white">Reward wallet address</span>}
            tooltip={{
              title: 'Reward address is the address where all gained tokens are stored',
              icon: <InfoCircleOutlined />
            }}
            rules={[{ required: true, message: 'Please enter the reward wallet address' }]}
          >
            <Input
              className="w-full input-calculator dark:input-calculator"
              addonAfter={
                <CopyToClipboard text={rewardAddress || account}>
                  {/* <Tooltip title="Copy reward wallet address"> */}
                  <IoCopyOutline
                    className="text-lg cursor-pointer"
                    onClick={() =>
                      notification.success({
                        placement: 'bottomRight',
                        message: `Ethernity`,
                        description: `Reward wallet address has been copied.`
                      })
                    }
                  />
                  {/* </Tooltip> */}
                </CopyToClipboard>
              }
              placeholder="Reward account address"
              onChange={(e) => setRewardAddress(e.target.value)}
            />
          </Form.Item>
        )}

        {requestType === StakingRequestType.EXTENDED && (
          <Form.Item
            className="w-full font-medium text-gray-500 dark:text-gray-400"
            name="canBeSplitted"
            label={<span className="text-black dark:text-white">Can staking pot be splitted?</span>}
            tooltip={{
              title: 'If true then a staking pot can be splitted and can be used by multiple node operators',
              icon: <InfoCircleOutlined />
            }}
          >
            <Switch
              checkedChildren="YES"
              unCheckedChildren="NO"
              defaultChecked
              checked={canBeSplitted}
              onChange={handleCanBeSplitted}
            />
          </Form.Item>
        )}

        {requestType === StakingRequestType.EXTENDED && (
          <Form.Item
            className="w-full font-medium text-gray-500 dark:text-gray-400"
            name="isPreApproved"
            label={<span className="text-black dark:text-white">Is staking pot pre-approved?</span>}
            tooltip={{
              title: 'In case that staking pot is pre-approved then is not required to approve contracts by the staker',
              icon: <InfoCircleOutlined />
            }}
          >
            <Switch checkedChildren="YES" unCheckedChildren="NO" />
          </Form.Item>
        )}

        <Row gutter={16} className="mt-4 mx-1 float-right">
          <Space size="middle">
            <Form.Item>
              <CancelButton
                className="w-32"
                onCancel={() => {
                  onClose();
                }}
                hasIcon={false}
              />
            </Form.Item>

            <Form.Item>
              <PrimaryButton className="w-32" isSubmitButton label="Review Stake" />
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
