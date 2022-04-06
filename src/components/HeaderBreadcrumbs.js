import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node
};

export default function HeaderBreadcrumbs({ links, action, ...other }) {
  return (
    <div className="ml-4 text-3xl">
      <Breadcrumb separator={<span className="text-black dark:text-white">/</span>}>
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined className="text-black dark:text-white" />
        </Breadcrumb.Item>
        {links.map((link, index) => (
          <Breadcrumb.Item key={index} href={link.href}>
            <span className="text-black dark:text-white">{link.name}</span>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}
