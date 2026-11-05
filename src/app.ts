import { App, providesCourseBarRolesId } from '@openedx/frontend-base';

import { appId, bulkEmailRole } from './constants';
import routes from './routes';

const app: App = {
  appId,
  routes,
  provides: {
    [providesCourseBarRolesId]: [bulkEmailRole],
  },
};

export default app;
