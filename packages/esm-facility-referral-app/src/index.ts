import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createLeftPanelLink } from './create-dashboard-link';

const moduleName = '@kenyaemr/esm-facility-referrals-app';

const options = {
  featureName: '@kenyaemr/esm-facility-referrals-app',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const faciityReferralsDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    name: 'faciity-referrals',
    title: 'Facility referrals',
  }),
  options,
);
