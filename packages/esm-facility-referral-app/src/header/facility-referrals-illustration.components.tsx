import React from 'react';
import { ShareKnowledge } from '@carbon/react/icons';
import styles from './facility-referrals-header.scss';

const FacilityReferralsIllustration: React.FC = () => {
  return (
    <div className={styles.svgContainer}>
      <ShareKnowledge className={styles.iconOverrides} />
    </div>
  );
};

export default FacilityReferralsIllustration;
