import React from 'react';
import GenericTable from './generic-table.component';
import { ConfigurableLink, ErrorState, formatDate, launchWorkspace } from '@openmrs/esm-framework';
import { toUpperCase } from '../helpers/expression-helper';
import { Tag, Button, DataTableSkeleton, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import styles from './generic-table.scss';
import { useTranslation } from 'react-i18next';
import { useDeceasedPatient } from '../hook/useMorgue.resource';
import { formatDateTime } from '../utils/utils';

interface DischargedProps {
  isLoading: boolean;
  deceasedPatients: any;
  error: any;
}

export const DischargedBodies: React.FC<DischargedProps> = ({ isLoading, deceasedPatients, error }) => {
  const { t } = useTranslation();
  const dischargedInLine = t('dischargeBodies', 'Discharged bodies');
  const patientChartUrl = '${openmrsSpaBase}/patient/${patientUuid}/chart/deceased-panel';

  const genericTableHeader = [
    { header: 'Patient Name', key: 'name' },
    { header: 'Gender', key: 'gender' },
    { header: 'Identifier', key: 'identifier' },
    { header: 'Age', key: 'age' },
    { header: 'Date of Death', key: 'deathDate' },
    { header: 'Cause of Death', key: 'causeOfDeath' },
    { header: 'Status', key: 'status' },
  ];

  if (isLoading) {
    return (
      <div className={styles.table}>
        <DataTableSkeleton
          headers={genericTableHeader}
          aria-label="discharged-datatable"
          showToolbar={false}
          showHeader={false}
          rowCount={10}
          zebra
          columnCount={7}
        />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} headerTitle={t('dischargeBodies', 'Discharged bodies')} />;
  }

  const dischargedDeceased = deceasedPatients?.filter((patient) => patient?.status === 'discharged') || [];

  const rows = dischargedDeceased.map((patient, index) => {
    const openMrsId =
      patient?.patient?.identifiers
        ?.find((id) => id.display.startsWith('OpenMRS ID'))
        ?.display.split('=')[1]
        ?.trim() || t('missingIdentifier', '--');

    return {
      id: `${patient?.patient?.uuid}`,
      name: (
        <ConfigurableLink
          style={{ textDecoration: 'none', maxWidth: '50%' }}
          to={patientChartUrl}
          templateParams={{ patientUuid: patient?.person?.uuid }}>
          {patient.person.display?.toUpperCase()}
        </ConfigurableLink>
      ),
      gender: patient?.person?.person?.gender || t('unknownGender', '--'),
      age: patient?.person?.person?.age || t('unknownAge', '--'),
      identifier: openMrsId,
      deathDate: formatDateTime(patient?.person?.person?.deathDate) || t('nullDate', '--'),
      causeOfDeath: patient?.person?.person?.causeOfDeath?.display || t('unknownCause', '--'),
      status: <Tag type="magenta">{patient?.status || t('unknownStatus', '--')}</Tag>,
    };
  });

  return <GenericTable rows={rows} headers={genericTableHeader} title={dischargedInLine} />;
};
