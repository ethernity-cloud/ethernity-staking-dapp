import { Button, Dropdown } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const DropdownMenu = ({ menu }) => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: 'none',
        padding: 0
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: 'top'
        }}
      />
    </Button>
  </Dropdown>
);

export default DropdownMenu;
