import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, InputNumber, Select, Table } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';

const { Option } = Select;

const BASE_REQUEST = 'Base Staking';
const EXTENDED_REQUEST = 'Extended Staking';
const STAKING_MODE_TEXT = 0;
const STAKING_MODE_TABLE = 1;

const StakingRequestWelcomeCard = ({ title, description, pro, cons }) => {
  const [mode, setMode] = useState(0); // 0 means details, 1 means details per years
  const [requestType, setRequestType] = useState('Base Staking');
  const [amount, setAmount] = useState(1900);
  const [dataTable, setDataTable] = useState([]);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days'
    },
    {
      title: 'Reward/day',
      dataIndex: 'rewardPerDay',
      key: 'rewardPerDay'
    },
    {
      title: 'Total reward',
      dataIndex: 'reward',
      key: 'reward'
    }
  ];

  const ratesPerYear = {
    2022: 10,
    2023: 9,
    2024: 8,
    2025: 7,
    2026: 6,
    2027: 5,
    2028: 4,
    2029: 3,
    2030: 2,
    2031: 1,
    2032: 0
  };

  const onRequestTypeChanged = (value) => {
    setRequestType(value);
  };

  const getDaysForYear = (year) => {
    const firstDayInYear = moment(`${year}-01-01`);
    const lastDayInYear = moment(`${year}-12-31`);
    return moment.duration(lastDayInYear.diff(firstDayInYear)).asDays();
  };

  const getRewardPerDay = (amount, year) => {
    const days = getDaysForYear(year);
    const percentage = ratesPerYear[year];

    return (((amount / days) * percentage) / 100).toFixed(4);
  };

  const getDaysLeftUntilEndOfYear = (year, lastPeriod) => {
    const endOfYearDate = lastPeriod || moment(`${year}-12-31`);
    let currentDate = moment();
    const isCurrentYear = currentDate.year() === year;
    if (!isCurrentYear) currentDate = moment(`${year}-01-01`);
    return endOfYearDate.diff(currentDate, 'days');
  };

  const getDaysForPeriods = (periods) => {
    console.log('_____________________________');
    console.log(periods);
    const daysPerYear = {};
    const lastPeriod = moment().add(periods, 'M');
    const currentDate = moment().startOf('day');
    const currentYear = moment().year();
    // const maxYear = getMaxYearFromPeriods(periods);
    // const years = moment().diff(lastPeriod, 'years');
    const y = moment.duration(lastPeriod.diff(currentDate)).asYears();
    const years = parseInt(y.toFixed(), 10);
    const lastYear = lastPeriod.year() < currentYear + years ? lastPeriod.year() : currentYear + years;

    // eslint-disable-next-line no-plusplus
    for (let year = currentYear; year <= lastYear; year++) {
      console.log(getDaysForYear(year));
      // first year
      let daysUntilEndOfYear;
      if (year === currentYear || year !== lastYear) {
        daysUntilEndOfYear = getDaysLeftUntilEndOfYear(year);
      } else {
        // last year
        // if (year === lastYear)
        daysUntilEndOfYear = getDaysLeftUntilEndOfYear(year, lastPeriod);
      }
      // console.log(`${year} = ${daysUntilEndOfYear} remaining`);
      daysPerYear[year] = daysUntilEndOfYear;
    }
    return daysPerYear;
  };

  const calculate = (type, amount, periods, split) => {
    const daysPerYears = getDaysForPeriods(periods);
    const rewardPerYear = [];
    Object.keys(daysPerYears).forEach((year) => {
      const reward = getRewardPerDay(amount, year);
      const totalReward =
        type === BASE_REQUEST ? reward * daysPerYears[year] : (reward * daysPerYears[year] * split) / 100;
      rewardPerYear.push({ year, reward: totalReward.toFixed(4), rewardPerDay: reward, days: daysPerYears[year] });
      console.log(
        `Reward for year ${year} is: rewardPerDay = ${reward}; days = ${daysPerYears[year]}; totalReward = ${totalReward} ETNY`
      );
    });

    setDataTable(rewardPerYear);
    return rewardPerYear;
  };

  const onFormSubmit = (values) => {
    calculate(requestType, values.amount, values.period, values.split);

    setMode(STAKING_MODE_TABLE);
  };

  return (
    <div className="dark:bg-gray-800 pricing-box max-w-lg mx-auto rounded-2xl shadow-lg overflow-hidden lg:max-w-none lg:flex mt-4">
      {mode === STAKING_MODE_TEXT && (
        <div className="bg-white dark:bg-gray-800 w-full px-6 py-8 lg:p-12 transition-all ease-in-out duration-1000 oopacity-100">
          <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9 dark:text-white">
            {requestType} Request
          </h3>
          <p className="mt-6 text-base leading-6 text-gray-500 dark:text-gray-200">{description}</p>
          <div className="mt-8">
            <div className="flex items-center">
              <h4 className="flex-shrink-0 pr-4 bg-white dark:bg-gray-800 text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">
                What&#x27;s included
              </h4>
              <div className="flex-1 border-t-2 border-gray-200" />
            </div>
            <ul className="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
              {pro.map((item, index) => (
                <li key={`pro_${index}`} className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <CheckmarkSvg />
                  </div>
                  <p className="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <h4 className="flex-shrink-0 pr-4 bg-white text-sm dark:bg-gray-800 leading-5 tracking-wider font-semibold uppercase text-indigo-600">
                &amp; What&#x27;s not
              </h4>
            </div>
            <ul className="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
              {cons.map((item, index) => (
                <li key={`cons_${index}`} className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <NotCheckmarkSvg />
                  </div>
                  <p className="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {mode === STAKING_MODE_TABLE && (
        <div
          className={`bg-white dark:bg-gray-800 w-full px-6 py-8 lg:p-12 transition-all ease-in-out duration-300 ${
            mode === STAKING_MODE_TABLE ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9 dark:text-white">
            <LeftOutlined onClick={() => setMode(STAKING_MODE_TEXT)} />
            <span className="px-2">{requestType} Request</span>
          </h3>

          <div className="bg-white dark:bg-gray-600 my-6 shadow overflow-hidden sm:rounded-md">
            <Table columns={columns} dataSource={dataTable} pagination={{ position: ['none'] }} />
          </div>
        </div>
      )}

      <div className="py-8 px-6 text-center bg-gray-50 dark:bg-gray-600 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <p className="text-lg leading-6 font-bold text-gray-900 dark:text-white">Calculator</p>
        <Form
          layout="vertical"
          hideRequiredMark
          className="etny-welcome-calculator text-left"
          onFinish={onFormSubmit}
          initialValues={{ type: 'Base Staking', amount: 1900, period: 12, split: 50 }}
        >
          <Form.Item
            className="w-full font-medium text-gray-500 dark:text-gray-400"
            name="type"
            label="Staking request type"
            rules={[{ required: true, message: 'Please enter amount for staking' }]}
          >
            <Select placeholder="Staking type" defaultValue={requestType} onChange={onRequestTypeChanged}>
              <Option value="Base Staking">Base Staking</Option>
              <Option value="Extended Staking">Extended Staking</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="font-medium text-gray-500 dark:text-gray-400"
            name="amount"
            label="Staking amount (ETNY)"
            rules={[{ required: true, message: 'Please enter amount for staking' }]}
          >
            <InputNumber
              placeholder="Staking amount"
              step="10"
              className="w-full"
              defaultValue={amount}
              min="1900"
              onChange={(value) => setAmount(value)}
            />
          </Form.Item>

          <Form.Item
            className="font-medium text-gray-500 dark:text-gray-400"
            name="period"
            label="Staking period (months)"
            rules={[{ required: true, message: 'Please select staking period' }]}
          >
            <Select placeholder="Staking period" defaultValue="12">
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

          {/* <Form.Item */}
          {/*  className="font-medium text-gray-500 dark:text-white" */}
          {/*  name="apr" */}
          {/*  label="Annual percentage rate (%)" */}
          {/*  rules={[{ required: true, message: 'Please select staking period' }]} */}
          {/* > */}
          {/*  <Input defaultValue="5" disabled /> */}
          {/* </Form.Item> */}

          <Form.Item
            className="font-medium text-gray-500 dark:text-white"
            name="split"
            label="Operator reward split (%)"
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

          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="uppercase w-full rounded-md bg-blue-500 border-2 border-transparent text-white text-md font-semibold mr-4 hover:bg-blue-400 hover:text-white"
            >
              Calculate
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

StakingRequestWelcomeCard.propTypes = {
  type: PropTypes.oneOf(['base', 'extended']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pro: PropTypes.array,
  cons: PropTypes.array
};

export default StakingRequestWelcomeCard;
