import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FacilityReferrals from './facility-referrals';

const Root: React.FC = () => {
  const baseName = window.getOpenmrsSpaBase() + 'home/facility-referrals';
  const { t } = useTranslation();
  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<FacilityReferrals />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
