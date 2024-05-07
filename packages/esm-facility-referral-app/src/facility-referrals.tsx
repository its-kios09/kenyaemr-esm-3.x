import React from 'react';
import { FacilityReferralsHeader } from './header/facility-referrals-header.components';
import FacilityReferralMetric from './metrics/facility-referral-metrics';
import FacilityReferralTabs from './tabs/facility-referral-tabs';

const FacilityReferral: React.FC = () => {
  return (
    <div className={`omrs-main-content`}>
      <FacilityReferralsHeader title={'Home'} />
      <FacilityReferralMetric />
      <FacilityReferralTabs />
    </div>
  );
};

export default FacilityReferral;
