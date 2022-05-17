/* eslint-disable import/prefer-default-export */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export async function postBulkEmail(email, courseId) {
  const url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/instructor/api/send_email`;
  return getAuthenticatedHttpClient().post(url, email);
}
