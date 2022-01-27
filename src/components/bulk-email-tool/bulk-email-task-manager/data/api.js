import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

async function getBulkCourseEmailData(courseId, endpoint) {
  const endpointUrl = `${getConfig().LMS_BASE_URL}/courses/${courseId}/instructor/api/${endpoint}`;
  // Yes, even though these edx-platform endpoints retrieve data, the Instructor Dashboard REST API's require a POST or
  // the call will fail with a 405 error...
  const { data } = await getAuthenticatedHttpClient().post(endpointUrl);
  return data;
}

export async function getSentEmailHistory(courseId) {
  const data = await getBulkCourseEmailData(courseId, 'list_email_content');
  return data;
}

export async function getEmailTaskHistory(courseId) {
  const data = await getBulkCourseEmailData(courseId, 'list_background_email_tasks');
  return data;
}

export async function getInstructorTasks(courseId) {
  const data = await getBulkCourseEmailData(courseId, 'list_instructor_tasks');
  return data;
}
