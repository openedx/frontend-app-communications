/* eslint-disable import/prefer-default-export */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

export async function postBulkEmailInstructorTask(email, courseId) {
  try {
    const url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/instructor/api/send_email`;
    const response = await getAuthenticatedHttpClient().post(url, email);
    return response;
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}

export async function patchScheduledBulkEmailInstructorTask(emailData, courseId, scheduleId) {
  const endpointUrl = `${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/${courseId}/bulk_email/${scheduleId}`;
  try {
    const response = await getAuthenticatedHttpClient().patch(endpointUrl, emailData);
    return response;
  } catch (error) {
    logError(error);
    throw new Error(error);
  }
}
