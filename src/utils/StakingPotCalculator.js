import moment from 'moment';
import { StakingRequestType } from './StakingRequestType';

export const ratesPerYear = {
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

export const getDaysForYear = (year) => {
  const firstDayInYear = moment(`${year}-01-01`);
  const lastDayInYear = moment(`${year}-12-31`);
  return moment.duration(lastDayInYear.diff(firstDayInYear)).asDays();
};

export const getRewardPerDay = (amount, year) => {
  const days = getDaysForYear(year);
  const percentage = ratesPerYear[year];

  return (((amount / days) * percentage) / 100).toFixed(4);
};

export const getDaysLeftUntilEndOfYear = (year, lastPeriod) => {
  const endOfYearDate = lastPeriod || moment(`${year}-12-31`);
  let currentDate = moment();
  const isCurrentYear = currentDate.year() === year;
  if (!isCurrentYear) currentDate = moment(`${year}-01-01`);
  return endOfYearDate.diff(currentDate, 'days');
};

export const getDaysForPeriods = (periods) => {
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

export const calculate = (type, amount, periods, split) => {
  const daysPerYears = getDaysForPeriods(periods);
  const rewardPerYear = [];
  Object.keys(daysPerYears).forEach((year) => {
    const reward = getRewardPerDay(amount, year);
    const totalReward =
      type === StakingRequestType.BASE ? reward * daysPerYears[year] : (reward * daysPerYears[year] * split) / 100;
    rewardPerYear.push({
      year,
      apy: ratesPerYear[year],
      reward: totalReward.toFixed(4),
      rewardPerDay: reward,
      days: daysPerYears[year]
    });
    console.log(
      `Reward for year ${year} is: rewardPerDay = ${reward}; days = ${daysPerYears[year]}; totalReward = ${totalReward} ETNY`
    );
  });

  return rewardPerYear;
};

export const getPercentOfDaysUntil = (createdOn, months) => {
  const currentDate = moment();
  const lastDate = moment(createdOn).add(months, 'M');

  const daysUntil = lastDate.diff(currentDate, 'days');

  return 365 / daysUntil;
};

export const getDaysUntil = (createdOn, months) => {
  const currentDate = moment();
  const lastDate = moment(createdOn).add(months, 'M');

  return lastDate.diff(currentDate, 'days');
};

export const getRatePerYear = (createdOn) => ratesPerYear[moment(createdOn).year()];
