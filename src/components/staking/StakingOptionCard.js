import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';
import useTheme from '../../hooks/useTheme';

const StakingOptionCard = ({
  title,
  subtitle,
  description,
  pro,
  cons,
  poolSize,
  percent,
  apr,
  maturityPeriod,
  rewardSplit
}) => {
  const { theme, onThemeChange, THEME_LIGHT, THEME_DARK } = useTheme();

  const background = theme === THEME_LIGHT ? 'white' : 'rgba(255, 255, 255, 0.08)';
  return (
    <Card
      style={{
        background,
        boxShadow: 'inset 0px 0px 4.63297px rgba(255, 255, 255, 0.23)'
      }}
      className="bg-white rounded-3xl my-2 p-6 dark:border-1 dark:border-[#333333]"
    >
      <p className="text-gray-800 dark:text-gray-50 text-4xl text-center font-medium mb-4">{title}</p>
      <p className="text-gray-800 dark:text-gray-50 text-4xl text-center font-medium mb-4">{subtitle}</p>

      <p className="text-gray-600 dark:text-gray-100 text-center text-md my-8">{description}</p>

      <div className="bg-map-pattern bg-cover bg-no-repeat bg-center">
        <div className="flex items-center justify-between py-2 space-x-4">
          <div className="mt-6 md:mt-0 text-black dark:text-white font-bold text-2xl">
            <span className="uppercase text-lg text-neutral-450 font-bold">APR</span>
            <p className="text-primary text-2xl">{apr}% </p>
          </div>

          <div className="mt-6 md:mt-0 text-black dark:text-white font-bold text-xl text-right">
            <span className="uppercase text-lg text-gray-400">maturity period</span>
            <p className="text-primary text-2xl">{maturityPeriod}</p>
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

        <div className="flex items-center justify-between py-2 space-x-4">
          <div>
            <p className="uppercase text-neutral-450 text-lg font-medium mb-1">Pool size</p>
            <p className="uppercase text-primary text-2xl font-medium mb-4">
              {poolSize}M <span className="text-xl">ETNY</span>
            </p>
          </div>

          <div>
            <p className="uppercase text-neutral-450 text-right text-lg font-medium mb-1">Reward split</p>
            <p className="uppercase text-primary text-right text-2xl font-medium mb-4">{rewardSplit}</p>
          </div>
        </div>
      </div>

      <Button
        size="large"
        className="h-12 w-full mt-8 bg-etny-button-primary hover:bg-etny-button-hover hover:text-white text-xl text-white border-0 rounded-md"
      >
        Stake Now
      </Button>
    </Card>
  );
};

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
