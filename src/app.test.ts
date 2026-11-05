import { providesCourseBarRolesId } from '@openedx/frontend-base';

import app from './app';
import routes from './routes';
import { appId, bulkEmailRole } from './constants';

describe('app', () => {
  it('registers the app id and routes', () => {
    expect(app.appId).toBe(appId);
    expect(app.routes).toBe(routes);
  });

  it('provides the bulk email role to the course bar', () => {
    expect(app.provides).toEqual({ [providesCourseBarRolesId]: [bulkEmailRole] });
  });
});
