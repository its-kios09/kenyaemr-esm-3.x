import '@carbon/charts/styles.css';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BaseIndicatorTrendChart from './base-indicator-trend-chart.component';
import BaseProgressTrackingChart from './base-progress-tracking-chart.component';
import { sevenDaysRunningDates } from '../../constants';
import styles from './charts.scss';

const MissedOpportunityChart = () => {
  const { t } = useTranslation();
  const generateRandomData = (numRecords: number) => {
    return Array.from({ length: numRecords }, (_, i) => ({
      week: sevenDaysRunningDates(i),
      abnomallPercentage: Math.floor(Math.random() * 50),
    }));
  };

  const generateRandomDataProgress = (numRecords: number) => {
    const data = [];
    for (let i = 1; i <= numRecords; i++) {
      data.push({
        group: 'Pending',
        key: sevenDaysRunningDates(i),
        value: Math.floor(Math.random() * 50),
      });
      data.push({
        group: 'Completed',
        key: sevenDaysRunningDates(i),
        value: Math.floor(Math.random() * 50),
      });
    }
    return data;
  };

  const data = useMemo(() => generateRandomDataProgress(40), []);

  const values = useMemo(() => generateRandomData(40), []);
  return (
    <>
      <div className={styles.chartGroupContainer}>
        <div className={styles.tendChart}>
          <BaseIndicatorTrendChart
            data={values}
            title={t('missedoppotunityVL', 'Missed opportunity VL')}
            yAxisTitle={t('percentageMissedVL', '% of missed opportunity VL')}
          />
        </div>
        <div className={styles.trackingChart}>
          <BaseProgressTrackingChart data={data} />
        </div>
      </div>
    </>
  );
};

export default MissedOpportunityChart;
