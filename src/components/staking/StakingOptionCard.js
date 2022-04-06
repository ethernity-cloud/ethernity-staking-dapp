import PropTypes from 'prop-types';
import { Progress } from 'antd';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';

const StakingOptionCard = ({ title, subtitle, description, pro, cons, poolSize, percent, apr, maturityPeriod }) => (
  <div className="w-96 shadow-md dark:shadow-gray-600 rounded-2xl bg-white dark:bg-gray-800 my-2 p-6">
    <p className="uppercase text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">{title}</p>
    <p className="text-gray-800 dark:text-gray-50 text-4xl font-medium mb-4">{subtitle || 'Staking'}</p>

    <p className="text-gray-600 dark:text-gray-100 text-md mt-4">{description}</p>

    <div className="flex items-center justify-between py-2 space-x-4">
      <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-2xl">
        {apr}% <span className="text-xs text-gray-400 font-bold">APR</span>
      </div>

      <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
        {maturityPeriod} <span className="uppercase text-xs text-gray-400">maturity period</span>
      </div>
    </div>

    {pro.length > 0 && (
      <ul className="text-sm text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
        {pro.map((item, index) => (
          <li key={`cons_${index}`} className="mb-3 flex items-center">
            <CheckmarkSvg />
            {item}
          </li>
        ))}
      </ul>
    )}

    {cons.length > 0 && (
      <ul className="text-sm text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
        {cons.map((item, index) => (
          <li key={`cons_${index}`} className="mb-3 flex items-center opacity-50">
            <NotCheckmarkSvg />

            {item}
          </li>
        ))}
      </ul>
    )}

    <p className="uppercase text-gray-800 dark:text-blue-400 text-lg font-medium mb-1">Pool size</p>
    <p className="uppercase text-gray-800 dark:text-gray-50 text-5xl font-medium mb-4">
      {poolSize}M <span className="text-xl">ETNY</span>
    </p>
    <div className="block m-auto my-4">
      <div>
        <span className="text-sm inline-block text-gray-500 dark:text-gray-100">
          Staking pool : <span className="text-gray-700 dark:text-white font-bold">{percent}%</span>
        </span>
      </div>
      <Progress percent={percent} showInfo={false} />
      {/* <div className="w-full h-2 bg-gray-200 rounded-full mt-2"> */}
      {/*  <div className="w-1/2 h-full text-center text-xs text-white bg-blue-500 rounded-full" /> */}
      {/* </div> */}
    </div>

    <button
      type="button"
      className="uppercase py-2 px-4 w-full rounded-2xl
                bg-blue-500 border-2 border-transparent
                text-center text-white text-md mr-4
                font-medium
                hover:bg-blue-400 hover:text-white
                transition-colors duration-200
                cursor-pointer"
    >
      Stake now
    </button>
  </div>
);

StakingOptionCard.propTypes = {
  type: PropTypes.oneOf(['base', 'extended']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pro: PropTypes.array,
  cons: PropTypes.array
};

StakingOptionCard.defaultProps = {
  pro: [],
  cons: []
};
export default StakingOptionCard;
