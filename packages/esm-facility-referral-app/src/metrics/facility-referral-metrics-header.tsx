import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AirlineManageGates, ApplicationVirtual } from '@carbon/react/icons';
import { Button, Modal, DatePickerInput, DatePicker } from '@carbon/react';
import { spaBasePath } from '../constants';
import styles from './facility-referral-metrics-header.scss';
import { ExtensionSlot, navigate } from '@openmrs/esm-framework';

const MetricsHeader = () => {
  const { t } = useTranslation();
  const metricsTitle = t('facilitytofacility', 'Facility To Facility Referrals');
  const workLoadScreenText = t('workload', 'View Work Load');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigateToDepartmentalScreen = () => {
    navigate({ to: `${spaBasePath}/financials/departments` });
  };

  return (
    <div className={styles.metricsContainer}>
      <span className={styles.metricsTitle}>{metricsTitle}</span>
      <div className={styles.actionBtn}>
        <Button
          kind="tertiary"
          renderIcon={(props) => <ApplicationVirtual size={18} {...props} />}
          iconDescription={t('pullfacilityreferrals', 'Pull Facility Referrals')}>
          {t('pullfacilityreferrals', 'Pull Facility Referrals')}
        </Button>
        <ExtensionSlot
          name="patient-search-button-slot"
          state={{
            buttonText: t('refer', 'Refer a Patient'),
            overlayHeader: t('refer', 'Refer a Patient'),
            buttonProps: {
              kind: 'primary',
              renderIcon: (props) => <AirlineManageGates size={32} {...props} />,
            },
          }}
        />
      </div>
    </div>
  );
};

export default MetricsHeader;
