import { App } from '@openedx/frontend-base';

import { appId } from './constants';
import routes from './routes';
import provides from './provides';

const app: App = {
  appId,
  routes,
  provides,
};

export default app;
