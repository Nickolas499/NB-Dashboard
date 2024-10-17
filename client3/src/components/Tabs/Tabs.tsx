import React, { useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.css';
import Tab from './Tab';

interface TabsProps {
  title: string;
  children: ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ title, children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <div>
      <div className={styles.tabs}>
        <ul className={styles.tab_list}>
          <div>
            {children.map((child: React.ReactElement) => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                />
              );
            })}
          </div>
        </ul>
        <div className={styles.tab_date}>{title}</div>
      </div>
      <div className={styles.tab_content}>
        {children.map((child: React.ReactElement) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
