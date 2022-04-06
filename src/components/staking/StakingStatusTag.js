import { Tag } from 'antd';
import PropTypes from 'prop-types';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const StakingStatusTag = ({ status }) => (
  <>
    {status === StakingPotStatus.PENDING && <Tag color="gold">{status}</Tag>}
    {status === StakingPotStatus.APPROVED && <Tag color="success">{status}</Tag>}
    {status === StakingPotStatus.DECLINED && <Tag color="error">{status}</Tag>}
  </>
);
StakingStatusTag.propTypes = {
  status: PropTypes.string
};
export default StakingStatusTag;
