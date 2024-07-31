import React, { useState } from 'react';
import { ContentSwitcher, Switch } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import styles from './content-switcher.scss';
import { WaitingQueue } from '../tables/waiting-queue.component';

export const ContentSwitchTabs: React.FC = () => {
  const { t } = useTranslation();

  const switchTabs = [
    { name: t('waitQueue', 'Waiting queue'), component: <WaitingQueue /> },
    { name: t('admtted', 'Admitted'), component: '' },
    { name: t('discharged', 'Discharged'), component: '' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={styles.contentSwitcherWrapper}>
        <ContentSwitcher
          className={styles.contentSwitcher}
          size="sm"
          selectedIndex={activeIndex}
          onChange={(event) => setActiveIndex(event.index)}>
          {switchTabs.map((tab, index) => (
            <Switch key={index} name={tab.name} text={tab.name} />
          ))}
        </ContentSwitcher>
      </div>
      <div className={styles.tabContent}>{switchTabs[activeIndex].component}</div>
    </>
  );
};
