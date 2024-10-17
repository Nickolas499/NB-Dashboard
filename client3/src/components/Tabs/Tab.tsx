import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.css';

interface TabProps {
  activeTab: string;
  label: string;
  onClick: (label: string) => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, label, onClick }) => {
  const handleClick = () => {
    onClick(label);
  }

  let className = styles.tab_list_item;

  if (activeTab === label) {
    className += " " + styles.tab_list_active;
  }

  return (
    <li
      key={label}
      className={className}
      onClick={handleClick}
    >
      {label}
    </li>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
