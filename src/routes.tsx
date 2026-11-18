import { authenticatedLoader } from '@openedx/frontend-base';

import { communicationsRole } from './constants';

const routes = [
  {
    id: 'org.openedx.frontend.route.communications.bulkEmail',
    path: 'communications/courses/:courseId/bulk_email',
    loader: authenticatedLoader,
    handle: {
      roles: [communicationsRole],
    },
    async lazy() {
      const module = await import(/* webpackChunkName: "communications-main" */ './Main');
      return { Component: module.default };
    },
  },
];

export default routes;
