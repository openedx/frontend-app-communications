import { providesCourseBarRolesId } from '@openedx/frontend-base';

import app from './app';
import routes from './routes';
import { appId, communicationsRole } from './constants';

describe('app', () => {
  it('registers the app id and routes', () => {
    expect(app.appId).toBe(appId);
    expect(app.routes).toBe(routes);
  });

  it('provides the communications role to the course bar', () => {
    expect(app.provides).toEqual({ [providesCourseBarRolesId]: communicationsRole });
  });
});
