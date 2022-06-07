import { Tag } from 'antd';
import PropTypes from 'prop-types';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const StakingStatusTag = ({ status }) => (
  <>
    {status === StakingPotStatus.PENDING && <Tag color="#252525">PENDING</Tag>}
    {status === StakingPotStatus.APPROVED && <Tag color="success">APPROVED</Tag>}
    {status === StakingPotStatus.DECLINED && <Tag color="error">DECLINED</Tag>}
    {status === StakingPotStatus.CANCELED && <Tag color="error">CANCELED</Tag>}
  </>
);
StakingStatusTag.propTypes = {
  status: PropTypes.number
};
export default StakingStatusTag;
