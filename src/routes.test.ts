import { authenticatedLoader } from '@openedx/frontend-base';

import MockedMain from './Main';
import routes from './routes';
import { bulkEmailRole } from './constants';

jest.mock('./Main', () => () => null);

describe('routes', () => {
  it('defines the bulk email route', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0]).toMatchObject({
      id: 'org.openedx.frontend.route.communications.bulkEmail',
      path: 'communications/courses/:courseId/bulk_email',
      loader: authenticatedLoader,
      handle: { roles: [bulkEmailRole] },
    });
  });

  it('lazy-loads Main as the bulk email route component', async () => {
    const { Component } = await routes[0].lazy();
    expect(Component).toBe(MockedMain);
  });
});
