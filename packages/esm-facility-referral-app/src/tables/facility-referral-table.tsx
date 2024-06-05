import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  DataTable,
  InlineLoading,
  Layer,
  Pagination,
  Search,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tile,
  DataTableSkeleton,
  Link,
} from '@carbon/react';
import { useLayoutType, isDesktop, usePagination } from '@openmrs/esm-framework';
import styles from '../tabs/facility-referral-tabs.scss';
import { useTranslation } from 'react-i18next';

type FacilityReferralProps = {
  status: string;
};

const FacilityReferralsTable: React.FC<FacilityReferralProps> = (data) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const [searchString, setSearchString] = useState('');
  const responsiveSize = isDesktop(layout) ? 'lg' : 'sm';
  const pageSizes = [10, 20, 30, 40, 50];
  const [pageSize, setPageSize] = useState(10);

  const setName = (record: any) => {
    return record.givenName + ' ' + record.middleName + ' ' + record.familyName;
  };

  const headerData = [
    {
      header: t('nupi', 'UPI'),
      key: 'nupi',
    },
    {
      header: t('name', 'Name'),
      key: 'name',
    },
    {
      header: t('gender', 'Gender'),
      key: 'gender',
    },
    {
      header: t('birthdate', 'Date of birth'),
      key: 'birthdate',
    },
    {
      header: t('dateReferred', 'Date Referred'),
      key: 'dateReferred',
    },
    {
      header: t('referredFrom', 'Referred From'),
      key: 'referredFrom',
    },
    {
      header: t('referralService', 'Department'),
      key: 'referralService',
    },
    {
      header: t('actions', 'Actions'),
      key: 'actions',
    },
  ];

  // const searchResults = useMemo(() => {
  //   if (referrals !== undefined && referrals.length > 0) {
  //     if (searchString && searchString.trim() !== '') {
  //       const search = searchString.toLowerCase();
  //       return referrals?.filter((service) =>
  //         Object.entries(service).some(([header, value]) => {
  //           return header === 'uuid' ? false : `${value}`.toLowerCase().includes(search);
  //         }),
  //       );
  //     }
  //   }
  //   return referrals;
  // }, [searchString, referrals]);

  const { paginated, goTo, currentPage } = usePagination([], pageSize);

  let rowData = [];

  const handleSearch = useCallback(
    (e) => {
      goTo(1);
      setSearchString(e.target.value);
    },
    [goTo, setSearchString],
  );

  return (
    <div className={styles.serviceContainer}>
      <FilterableTableHeader handleSearch={handleSearch} layout={layout} responsiveSize={responsiveSize} t={t} />
      <DataTable
        isSortable
        rows={rowData}
        headers={headerData}
        size={responsiveSize}
        useZebraStyles={rowData?.length > 1 ? true : false}>
        {({ rows, headers, getRowProps, getTableProps }) => (
          <TableContainer>
            <Table {...getTableProps()} aria-label="Referred Patients">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader key={header.key}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    {...getRowProps({
                      row,
                    })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      {paginated && (
        <Pagination
          forwardText="Next page"
          backwardText="Previous page"
          page={currentPage}
          pageSize={pageSize}
          pageSizes={pageSizes}
          className={styles.pagination}
          size={responsiveSize}
          onChange={({ pageSize: newPageSize, page: newPage }) => {
            if (newPageSize !== pageSize) {
              setPageSize(newPageSize);
            }
            if (newPage !== currentPage) {
              goTo(newPage);
            }
          }}
        />
      )}
    </div>
  );
};

function FilterableTableHeader({ layout, handleSearch, responsiveSize, t }) {
  return (
    <>
      <div className={styles.headerContainer}>
        <div
          className={classNames({
            [styles.tabletHeading]: !isDesktop(layout),
            [styles.desktopHeading]: isDesktop(layout),
          })}>
          <h4>{t('referredPatients', 'Referred Patients')}</h4>
        </div>
        <div className={styles.backgroundDataFetchingIndicator}>
          {/* <span>{isValidating ? <InlineLoading /> : null}</span> */}
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <Search
          labelText=""
          placeholder={t('filterTable', 'Filter table')}
          onChange={handleSearch}
          size={responsiveSize}
        />
      </div>
    </>
  );
}
export default FacilityReferralsTable;
