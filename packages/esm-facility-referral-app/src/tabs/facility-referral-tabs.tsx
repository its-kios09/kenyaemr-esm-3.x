import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '@carbon/react';
import styles from './facility-referral-tabs.scss';

const FacilityReferralTabs = () => {
  const { t } = useTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = ({ selectedIndex }: { selectedIndex: number }) => {
    setActiveTabIndex(selectedIndex);
  };

  return (
    <div className={styles.referralsList} data-testid="referralsList-list">
      <Tabs selectedIndex={activeTabIndex} onChange={handleTabChange} className={styles.tabs}>
        <div style={{ display: 'flex' }}>
          <TabList style={{ paddingLeft: '1rem' }} aria-label="Referrals tabs" contained>
            <Tab className={styles.tab}>{t('active', 'Active Referrals')}</Tab>
            <Tab className={styles.tab}>{t('completed', 'Completed Referrals')}</Tab>
            <Tab className={styles.tab}>{t('refer', 'Referred Patients')}</Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel className={styles.tabPanel}></TabPanel>
          <TabPanel className={styles.tabPanel}></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default FacilityReferralTabs;
