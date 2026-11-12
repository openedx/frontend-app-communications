import { providesCourseBarRolesId } from '@openedx/frontend-base';
import { communicationsRole } from './constants';

const provides = {
  [providesCourseBarRolesId]: communicationsRole,
};

export default provides;
