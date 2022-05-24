import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { NotCheckmarkSvg } from '../common/svg/NotCheckmarkSvg';
import { CheckmarkSvg } from '../common/svg/CheckmarkSvg';
import useTheme from '../../hooks/useTheme';
import { CardStatistics } from '../cards/CardStatistics';

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

  const background = theme === THEME_LIGHT ? 'white' : '#000046';

  return (
    <Card
      style={{
        background,
        boxShadow: 'inset 0px 0px 4.63297px rgba(255, 255, 255, 0.23)'
      }}
      className="bg-white rounded-3xl my-2 p-6 border-none"
    >
      <p className="text-gray-800 dark:text-gray-50 text-4xl text-center font-medium mb-4">{title}</p>
      <p className="text-gray-800 dark:text-gray-50 text-4xl text-center font-medium mb-4">{subtitle}</p>

      <p className="text-gray-600 dark:text-gray-100 text-center text-md my-8 mb-20">{description}</p>

      <div className="bg-map-pattern-light dark:bg-map-pattern bg-cover bg-no-repeat bg-center my-8">
        <div className="flex items-center justify-between py-2 space-x-4">
          <CardStatistics label="APR" value={apr} valueSuffix="%" />
          <CardStatistics label="maturity period" value={maturityPeriod} hasTextOnRight />
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
          <CardStatistics label="Pool size" value={poolSize} valueSuffix="M ETNY" />
          <CardStatistics label="Reward split" value={rewardSplit} hasTextOnRight />
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
