import { useState } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Button, Col, Form, InputNumber, Row, Select, Table } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import useTheme from '../../hooks/useTheme';
import { calculate } from '../../utils/StakingPotCalculator';
import { StakingRequestType } from '../../utils/StakingRequestType';

const { Option } = Select;

const STAKING_MODE_TEXT = 0;
const STAKING_MODE_TABLE = 1;

const StakingCalculatorCard = ({ description, pro, cons }) => {
  const [mode, setMode] = useState(0); // 0 means details, 1 means details per years
  const [requestType, setRequestType] = useState(StakingRequestType.BASE);
  const [amount, setAmount] = useState(1900);
  const [dataTable, setDataTable] = useState([]);
  const { theme, THEME_LIGHT } = useTheme();

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'APY (%)',
      dataIndex: 'apy',
      key: 'apy'
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days'
    },
    {
      title: 'Reward/Day (ETNY)',
      dataIndex: 'rewardPerDay',
      key: 'rewardPerDay'
    },
    {
      title: 'Total Reward (ETNY)',
      dataIndex: 'reward',
      key: 'reward',
      render: (text, record) => <span className="text-primary">{record.reward}</span>
    }
  ];

  const onRequestTypeChanged = (value) => {
    setRequestType(value);
  };

  const calculateReward = (type, amount, periods, split) => {
    const rewardsPerYear = calculate(type, amount, periods, split);

    const rewardsPerYearWithKeys = rewardsPerYear.map((item, index) => ({ key: index, ...item }));
    setDataTable(rewardsPerYearWithKeys);
  };

  const onFormSubmit = (values) => {
    calculateReward(requestType, values.amount, values.period, values.split);

    setMode(STAKING_MODE_TABLE);
  };

  const border = theme === THEME_LIGHT ? '15px solid #C4E2FF' : '15px solid #01014F';

  return (
    <Row
      style={{ border }}
      className="max-w-lg lg:max-w-none lg:flex mx-auto
      bg-white dark:bg-etny-background
      border-4 border-etny-100 dark:border-[#333333] rounded-2xl
      overflow-hidden mt-4"
    >
      {mode === STAKING_MODE_TEXT && (
        <Col className="hidden md:block w-full md:w-4/6 p-8 lg:p-12 transition-all ease-in-out duration-1000 opacity-100">
          <p className="text-xl leading-8 sm:text-2xl sm:leading-9 text-etny-500">{requestType} Request</p>
          <p className="mt-6 text-base leading-6 text-gray-500 dark:text-gray-200">{description}</p>
          <div className="mt-8">
            <div className="flex items-center">
              <h4 className="flex-shrink-0 pr-4 text-lg leading-5 tracking-wider font-semibold uppercase text-black dark:text-white">
                What&#x27;s included
              </h4>
              <div className="flex-1 border-t-2 border-gray-200" />
            </div>

            {pro.map((item, index) => (
              <Row key={`pro_${index}`} align="middle">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-white" />
                <span className="ml-4 text-md text-gray-700 dark:text-gray-200">{item}</span>
              </Row>
            ))}
          </div>

          <div className="mt-20">
            <div className="flex items-center">
              <h4 className="flex-shrink-0 pr-4 text-lg leading-5 tracking-wider font-semibold uppercase text-black dark:text-white">
                What&#x27;s not included
              </h4>
            </div>
            {cons.map((item, index) => (
              <Row key={`cons_${index}`} align="middle">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-white" />
                <span className="ml-4 text-md text-gray-700 dark:text-gray-200">{item}</span>
              </Row>
            ))}
          </div>
        </Col>
      )}

      {mode === STAKING_MODE_TABLE && (
        <Col
          className={`w-full md:w-4/6 p-8 lg:p-12 transition-all ease-in-out duration-300 ${
            mode === STAKING_MODE_TABLE ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xl leading-8 text-gray-900 sm:text-2xl sm:leading-9 dark:text-primary">
            <LeftOutlined onClick={() => setMode(STAKING_MODE_TEXT)} className="text-etny-500" />
            <span className="px-2 text-etny-500">{requestType} Request</span>
          </p>

          <div className="bg-white dark:bg-gray-600 my-6 dark:shadow overflow-hidden sm:rounded-md">
            <Table
              className="welcome-calculator dark:welcome-calculator"
              bordered={false}
              columns={columns}
              dataSource={dataTable}
              pagination={{ position: ['none'] }}
            />
          </div>
        </Col>
      )}

      <Col
        className={`${
          mode === STAKING_MODE_TABLE && isMobile ? 'hidden' : 'block'
        } w-full md:w-2/6 p-8 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12`}
      >
        <p className="text-xl leading-8 sm:text-2xl sm:leading-9 text-etny-500">Staking Calculator</p>
        <Form
          layout="vertical"
          requiredMark={false}
          className="text-left"
          onFinish={onFormSubmit}
          initialValues={{ type: StakingRequestType.BASE, amount: 1900, period: 12, split: 50 }}
        >
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

          <Form.Item
            className="font-medium text-gray-500 dark:text-gray-400"
            name="amount"
            label={<span className="text-black dark:text-white">Staking amount (ETNY)</span>}
            rules={[{ required: true, message: 'Please enter amount for staking' }]}
          >
            <InputNumber
              placeholder="Staking amount"
              step="10"
              className="w-full dark:input-number-calculator"
              min="1900"
              onChange={(value) => setAmount(value)}
            />
          </Form.Item>

          <Form.Item
            className="font-medium text-gray-500 dark:text-gray-400"
            name="period"
            label={<span className="text-black dark:text-white">Staking period (months)</span>}
            rules={[{ required: true, message: 'Please select staking period' }]}
          >
            <Select className="dark:select" placeholder="Staking period">
              <Option value="6">6</Option>
              <Option value="12">12</Option>
              <Option value="18">18</Option>
              <Option value="24">24</Option>
              <Option value="30">30</Option>
              <Option value="36">36</Option>
              <Option value="42">42</Option>
              <Option value="48">48</Option>
              <Option value="54">54</Option>
              <Option value="60">60</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="font-medium text-gray-500 dark:text-white"
            name="split"
            label={<span className="text-black dark:text-white">Operator reward split (%)</span>}
            rules={[{ required: true, message: 'Please choose the reward split' }]}
          >
            <Select
              className="dark:select"
              placeholder="Reward split"
              disabled={requestType === StakingRequestType.BASE}
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

          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-md
              bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
              text-white hover:text-white focus:text-white
              text-md font-semibold
              border-none mr-4"
            >
              Calculate
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

StakingCalculatorCard.propTypes = {
  description: PropTypes.string,
  pro: PropTypes.array,
  cons: PropTypes.array
};

export default StakingCalculatorCard;
