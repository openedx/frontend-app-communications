import { EnvironmentTypes, SiteConfig } from '@openedx/frontend-base';

import { appId } from './src/constants';

const siteConfig: SiteConfig = {
  siteId: 'communications-test',
  siteName: 'Communications Test',
  baseUrl: 'http://localhost:8080',
  lmsBaseUrl: 'http://localhost:8000',
  cmsBaseUrl: 'http://localhost:8001',
  loginUrl: 'http://localhost:8000/login',
  logoutUrl: 'http://localhost:8000/logout',

  environment: EnvironmentTypes?.TEST ?? 'test',
  apps: [{
    appId,
    config: {
      SCHEDULE_EMAIL_SECTION: true,
    },
  }],
};

export default siteConfig;
