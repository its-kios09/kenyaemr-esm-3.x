import React from 'react';
import { useTranslation } from 'react-i18next';
import MetricsHeader from './facility-referral-metrics-header';
import MetricsCard from './facility-referral-cards';
import styles from './facility-referral-metrics.scss';

export interface Service {
  uuid: string;
  display: string;
}

function FacilityReferralMetric() {
  const { t } = useTranslation();

  return (
    <>
      <MetricsHeader />
      <div className={styles.cardContainer}>
        <MetricsCard
          label={t('active-referrals', 'Total Active Referrals')}
          value={'0'}
          headerLabel={t('active', 'Active Referrals')}
        />
        <MetricsCard
          label={t('complete-referrals', 'Total Complete Referrals')}
          value={'0'}
          headerLabel={t('complete', 'Complete Referrals')}
        />
        <MetricsCard
          label={t('outwards-referrals', 'Total Refer Patients')}
          value={'0'}
          headerLabel={t('refer-patients', 'Refer to Other Facilities')}
        />
      </div>
    </>
  );
}

export default FacilityReferralMetric;
