import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './dashboard.scss';
import ServiceMetrics from './service-metrics.component';
import BillableServices from '../billable-services.component';

export const BillableServicesDashboard = ({ onEditService, onDeleteService }) => {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <ServiceMetrics />
      <main className={styles.servicesTableContainer}>
        <BillableServices onEditService={onEditService} onDeleteService={onDeleteService} />
      </main>
    </main>
  );
};
