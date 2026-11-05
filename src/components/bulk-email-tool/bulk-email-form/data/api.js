import { getAuthenticatedHttpClient, getSiteConfig, logError } from '@openedx/frontend-base';

export async function postBulkEmailInstructorTask(email, courseId) {
  try {
    const url = `${getSiteConfig().lmsBaseUrl}/courses/${courseId}/instructor/api/send_email`;
    const response = await getAuthenticatedHttpClient().post(url, email);
    return response;
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}

export async function patchScheduledBulkEmailInstructorTask(emailData, courseId, scheduleId) {
  const endpointUrl = `${getSiteConfig().lmsBaseUrl}/api/instructor_task/v1/schedules/${courseId}/bulk_email/${scheduleId}`;
  try {
    const response = await getAuthenticatedHttpClient().patch(endpointUrl, emailData);
    return response;
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}
