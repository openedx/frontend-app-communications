import { camelCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

// eslint-disable-next-line import/prefer-default-export
export async function getScheduledBulkEmailIntructorTaskData(courseId, page = 1) {
  const endpointUrl = `${
    getConfig().LMS_BASE_URL
  }/api/instructor_task/v1/schedules/${courseId}/bulk_email/?page=${page}`;
  try {
    const { data } = await getAuthenticatedHttpClient().get(endpointUrl);
    return camelCaseObject(data);
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}

export async function deleteScheduledBulkEmailInstructorTask(courseId, scheduleId) {
  const endpointUrl = `${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/${courseId}/bulk_email/${scheduleId}`;
  try {
    const { status } = await getAuthenticatedHttpClient().delete(endpointUrl);
    return status;
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}
