import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, ModalBody, ModalHeader, TextInput, Layer } from '@carbon/react';
import styles from './initiate-payment.scss';
import { Controller, useForm } from 'react-hook-form';
import { MappedBill } from '../../../types';
import { checkPaymentRequestStatus, initiateStkPush, usePaymentRequestStatus } from '../payment.resource';
import { showModal, showSnackbar } from '@openmrs/esm-framework';

export interface InitiatePaymentDialogProps {
  closeModal: () => void;
  bill: MappedBill;
}

const InitiatePaymentDialog: React.FC<InitiatePaymentDialogProps> = ({ closeModal, bill }) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'all',
    defaultValues: {},
  });

  const onSubmit = (data) => {
    const payload = {
      phoneNumber: data.phoneNumber,
      amount: data.billAmount,
      billUuid: bill.uuid,
      billUrl: bill.uuid,
      referenceNumber: bill.receiptNumber,
      callBackUrl: 'https://9cf8-196-106-176-56.ngrok-free.app/api/confirmation-url',
    };
    initiateStkPush(payload).then(
      (resp) => {
        showSnackbar({
          title: t('stkPush', 'STK Push'),
          subtitle: t('stkPushSucess', 'STK Push send successfully'),
          kind: 'success',
          timeoutInMs: 3500,
          isLowContrast: true,
        });
      },
      (err) => {
        showSnackbar({
          title: t('stkPush', 'STK Push'),
          subtitle: t('stkPushError', 'STK Push request failed', { error: err.message }),
          kind: 'error',
          timeoutInMs: 3500,
          isLowContrast: true,
        });
      },
    );
  };

  let paymentStatement = '';
  const handleRefresh = () => {
    checkPaymentRequestStatus('85c7961a-2b42-4c09-8b7d-a69f797a9520').then((paymentRequstStatus) => {
      paymentStatement = `Payment for amount Ksh. ${paymentRequstStatus.data[0].amount} was successfully made. Payer phone number ${paymentRequstStatus.data[0].client_phone}. Mpesa reference number is ${paymentRequstStatus.data[0].transaction_reference_number}`;
      showPaymentTransaction();
    });
  };

  const showPaymentTransaction = () => {
    const dispose = showModal('show-payment-transaction', {
      closeModal: () => dispose(),
      statement: paymentStatement,
    });
  };
  return (
    <div>
      <ModalHeader closeModal={closeModal} />
      <ModalBody>
        <Form className={styles.form}>
          <h4>{t('paymentPayment', 'Bill Payment')}</h4>
          <section className={styles.section}>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <Layer>
                  <TextInput
                    {...field}
                    id="phoneNumber"
                    type="text"
                    labelText={t('phoneNumber', 'Phone Number')}
                    size="md"
                    placeholder={t('phoneNumber', 'Phone Number')}
                  />
                </Layer>
              )}
            />
          </section>
          <section className={styles.section}>
            <Controller
              control={control}
              name="billAmount"
              render={({ field }) => (
                <Layer>
                  <TextInput
                    {...field}
                    size="md"
                    labelText={t('billAmount', 'Bill Amount')}
                    placeholder={t('billAmount', 'Bill Amount')}
                  />
                </Layer>
              )}
            />
          </section>
          <section>
            <Button type="submit" className={styles.button} onClick={handleSubmit(onSubmit)}>
              {t('sendStkPush', 'Send STK Push')}
            </Button>
            <Button className={styles.button} onClick={handleRefresh}>
              {t('refreshPayment', 'Refresh Payment')}
            </Button>
            <Button kind="secondary" className={styles.buttonLayout} onClick={closeModal}>
              {t('cancel', 'Cancel')}
            </Button>
          </section>
        </Form>
      </ModalBody>
    </div>
  );
};

export default InitiatePaymentDialog;
