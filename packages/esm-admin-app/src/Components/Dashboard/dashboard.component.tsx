import React from 'react';
import Header from '../Header/header.component';
import { useTranslation } from 'react-i18next';
import { Layer, ComboButton, MenuItem } from '@carbon/react';
import { Add, WatsonHealthScalpelSelect } from '@carbon/react/icons';
import styles from './dashboard.scss';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={`omrs-main-content`}>
      <Header title={t('home', 'Home')} />
      <Layer className={styles.btnLayer}>
        <ComboButton tooltipAlignment="left" label={t('etlOperation', 'ETL operations')} size="md">
          <MenuItem label={t('refreshTables', 'Refresh tables')} />
          <MenuItem label={t('recreateTables', 'Recreate tables')} />
          <MenuItem label={t('recreateDatatools', 'Recreate datatools')} />
          <MenuItem label={t('refreshDwapi', 'Refresh DWAPI tables')} />
        </ComboButton>
      </Layer>
    </div>
  );
};

export default Dashboard;
