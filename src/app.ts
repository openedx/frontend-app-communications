import { App } from '@openedx/frontend-base';
import { appId } from './constants';
import provides from './provides';
import routes from './routes';
import slots from './slots';

const app: App = {
  appId,
  routes,
  provides,
  slots,
};

export default app;
