import React, { useCallback, useEffect, useState } from 'react';
import { InlineLoading, InlineNotification, FilterableMultiSelect } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { showSnackbar, useConfig } from '@openmrs/esm-framework';
import styles from './billing-checkin-form.scss';
import VisitAttributesForm from './visit-attributes/visit-attributes-form.component';
import { BillingConfig } from '../config-schema';
import { hasPatientBeenExempted } from './helper';
import { EXEMPTED_PAYMENT_STATUS, PENDING_PAYMENT_STATUS } from '../constants';
import { BillingService } from '../types';
import SHANumberValidity from './social-health-authority/sha-number-validity.component';
import { createPatientBill, useBillableItems, useCashPoint } from '../billing.resource';

type BillingCheckInFormProps = {
  patientUuid: string;
  setExtraVisitInfo: (state) => void;
};

const BillingCheckInForm: React.FC<BillingCheckInFormProps> = ({ patientUuid, setExtraVisitInfo }) => {
  const { t } = useTranslation();
  const {
    visitAttributeTypes: { isPatientExempted },
  } = useConfig<BillingConfig>();
  const { cashPoints, isLoading: isLoadingCashPoints, error: cashError } = useCashPoint();
  const { lineItems, isLoading: isLoadingLineItems, error: lineError } = useBillableItems();
  const [attributes, setAttributes] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState<any>();
  const [isPatientExemptedValue, setIsPatientExemptedValue] = useState<string | null>(null);

  const handleCreateBill = useCallback((createBillPayload) => {
    createPatientBill(createBillPayload).then(
      () => {
        showSnackbar({ title: 'Patient Bill', subtitle: 'Patient has been billed successfully', kind: 'success' });
      },
      (error) => {
        const errorMessage = JSON.stringify(error?.responseBody?.error?.message?.replace(/\[/g, '').replace(/\]/g, ''));
        showSnackbar({
          title: 'Patient Bill Error',
          subtitle: `An error has occurred while creating patient bill, Contact system administrator quoting this error ${errorMessage}`,
          kind: 'error',
          isLowContrast: true,
        });
      },
    );
  }, []);

  const handleBillingService = (selectedItems: Array<BillingService>) => {
    const cashPointUuid = cashPoints?.[0]?.uuid ?? '';
    const billStatus = hasPatientBeenExempted(attributes, isPatientExempted)
      ? EXEMPTED_PAYMENT_STATUS
      : PENDING_PAYMENT_STATUS;

    const lineItems = selectedItems.map((item, index) => {
      const priceForPaymentMode =
        item.servicePrices.find((p) => p.paymentMode?.uuid === paymentMethod) || item?.servicePrices[0];
      return {
        billableService: item?.uuid ?? '',
        quantity: 1,
        price: priceForPaymentMode ? priceForPaymentMode.price : '0.000',
        priceName: 'Default',
        priceUuid: priceForPaymentMode ? priceForPaymentMode.uuid : '',
        lineItemOrder: index,
        paymentStatus: billStatus,
      };
    });

    const billPayload = {
      lineItems: lineItems,
      cashPoint: cashPointUuid,
      patient: patientUuid,
      status: billStatus,
      payments: [],
    };

    setExtraVisitInfo({
      handleCreateExtraVisitInfo: () => handleCreateBill(billPayload),
      attributes,
    });
  };

  useEffect(() => {
    setExtraVisitInfo({
      handleCreateExtraVisitInfo: () => {},
      attributes,
    });
  }, [attributes, setExtraVisitInfo]);

  if (isLoadingLineItems || isLoadingCashPoints) {
    return (
      <InlineLoading
        status="active"
        iconDescription={t('loading', 'Loading')}
        description={t('loadingBillingServices', 'Loading billing services...')}
      />
    );
  }

  if (cashError || lineError) {
    return (
      <InlineNotification
        kind="error"
        lowContrast
        title={t('billErrorService', 'Bill service error')}
        subtitle={t('errorLoadingBillServices', 'Error loading bill services')}
      />
    );
  }

  return (
    <>
      <VisitAttributesForm
        setAttributes={setAttributes}
        setPaymentMethod={setPaymentMethod}
        setIsPatientExempted={setIsPatientExemptedValue}
      />
      <SHANumberValidity paymentMethod={paymentMethod} />
      {paymentMethod && (
        <section className={styles.sectionContainer}>
          <div className={styles.sectionTitle}>{t('billing', 'Billing')}</div>
          <div className={styles.sectionField}>
            <FilterableMultiSelect
              key={isPatientExemptedValue}
              id="billing-service"
              titleText={t('searchServices', 'Search services')}
              items={lineItems ?? []}
              itemToString={(item) => (item ? item?.name : '')}
              onChange={({ selectedItems }) => handleBillingService(selectedItems)}
              disabled={isPatientExemptedValue === ''}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default React.memo(BillingCheckInForm);
