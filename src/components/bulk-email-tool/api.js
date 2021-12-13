import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const InstructorApiBaseUrl = `${getConfig().LMS_BASE_URL}/api/instructor/v1`;

export default async function getInstructorData(courseId) {
  const InstructorApiUrl = `${InstructorApiBaseUrl}/tasks/${courseId} `;
  return getAuthenticatedHttpClient().get(InstructorApiUrl);
}
