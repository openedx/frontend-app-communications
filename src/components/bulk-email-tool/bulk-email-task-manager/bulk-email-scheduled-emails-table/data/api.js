import {
  camelCaseObject, getAuthenticatedHttpClient, getSiteConfig, logError,
} from '@openedx/frontend-base';

export async function getScheduledBulkEmailIntructorTaskData(courseId, page = 1) {
  const endpointUrl = `${
    getSiteConfig().lmsBaseUrl
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
  const endpointUrl = `${getSiteConfig().lmsBaseUrl}/api/instructor_task/v1/schedules/${courseId}/bulk_email/${scheduleId}`;
  try {
    const { status } = await getAuthenticatedHttpClient().delete(endpointUrl);
    return status;
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}
