import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Column,
  Form,
  Layer,
  Stack,
  TextInput,
  Row,
  DatePicker,
  MultiSelect,
  Dropdown,
  ButtonSet,
  Button,
  DatePickerInput,
} from '@carbon/react';
import styles from './claims-form.scss';

const ClaimsForm: React.FC = () => {
  const { t } = useTranslation();

  const dropdownItems = [{ id: 'select-a-visittype', label: 'Select a visit Type' }];
  const dropdownItems_facility = [{ id: 'select-a-visittype', label: 'Select a visit Type' }];

  return (
    <Form className={styles.form}>
      <span className={styles.claimFormTitle}>{t('formTitle', 'Fill in the form details')}</span>
      <Stack gap={4} className={styles.grid}>
        <Column>
          <Layer className={styles.input}>
            <TextInput
              id="claimExplanation"
              invalidText="Required"
              placeholder="Claim Explanation"
              labelText={t('claimExplanation', 'Claim Explanation')}
            />
          </Layer>
        </Column>
        <Row className={styles.facilityVisitRow}>
          <Column className={styles.facilityColumn}>
            <Layer className={styles.input}>
              <DatePicker datePickerType="single" className={styles.datePickerInput}>
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText={t('treatmentstart', 'Treatment Start')}
                  id="date-picker-single-claims-1"
                  size="md"
                />
              </DatePicker>
            </Layer>
          </Column>
          <Column className={styles.facilityColumn}>
            <Layer className={styles.input}>
              <DatePicker datePickerType="single">
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText={t('treatmentend', 'Treatment End')}
                  id="date-picker-single-claims-2"
                  size="md"
                  // className={styles.datePickerInput}
                />
              </DatePicker>
            </Layer>
          </Column>
        </Row>
        <Row className={styles.facilityVisitRow}>
          <Column className={styles.facilityColumn}>
            <Layer className={styles.input}>
              <Dropdown
                id="visitType"
                titleText={t('visitType', 'Visit Type')}
                initialSelectedItem={dropdownItems[0]}
                items={dropdownItems}
                itemToString={(item) => (item ? item.label : '')}
              />
            </Layer>
          </Column>
          <Column className={styles.facilityColumn}>
            <Layer className={styles.input}>
              <Dropdown
                id="faciity"
                titleText={t('facility', 'Facility')}
                initialSelectedItem={dropdownItems_facility[0]}
                items={dropdownItems_facility}
                itemToString={(item) => (item ? item.label : '')}
              />
            </Layer>
          </Column>
        </Row>
        <Row className={styles.facilityVisitRow}>
          <Column className={styles.facilityColumn}>
            <Layer className={styles.input}>
              <TextInput
                id="claimcode"
                invalidText="Required"
                placeholder="Claim Code"
                labelText={t('claimcode', ' Claim Code')}
              />
            </Layer>
          </Column>
          <Column className={styles.facilityColumn}>
            <Layer className={styles.input}>
              <TextInput
                id="guarantee"
                invalidText="Required"
                placeholder="Guarantee ID"
                labelText={t('guarantee', 'Guarantee ID')}
              />
            </Layer>
          </Column>
        </Row>
        <Column>
          <Layer className={styles.input}>
            <MultiSelect
              label="Diagnosis"
              id="diagnosis"
              titleText="Diagnosis"
              items={dropdownItems_facility}
              itemToString={(item) => (item ? item.text : '')}
              selectionFeedback="top-after-reopen"
            />
          </Layer>
        </Column>
      </Stack>
      <ButtonSet className={styles.buttonSet}>
        <Button className={styles.button} kind="danger">
          {t('discardClaim', 'Discard Claim')}
        </Button>
        <Button className={styles.button} kind="primary" type="submit">
          {t('processClaim', 'Process Claim')}
        </Button>
      </ButtonSet>
    </Form>
  );
};

export default ClaimsForm;
