import PropTypes from 'prop-types';

export const CardStatistics = ({ label, value, valuePrefix, valueSuffix, hasTextOnRight }) => (
  <div className={`mt-6 md:mt-0 text-black dark:text-white font-bold text-md ${hasTextOnRight ? 'text-right' : ''}`}>
    <span className="slashed-zero uppercase text-md text-neutral-450 font-bold">{label}</span>
    <p className="slashed-zero text-etny-500 text-2xl">
      {valuePrefix}
      {value}
      {valueSuffix}{' '}
    </p>
  </div>
);

CardStatistics.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valuePrefix: PropTypes.string,
  valueSuffix: PropTypes.string,
  hasTextOnRight: PropTypes.bool
};
