import { camelCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

// eslint-disable-next-line import/prefer-default-export
export async function getScheduledBulkEmailData(courseId) {
  const endpointUrl = `${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/${courseId}/bulk_email/`;
  const { data } = await getAuthenticatedHttpClient().get(endpointUrl);
  return camelCaseObject(data);
}
