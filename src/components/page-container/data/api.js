import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const courseHomeBaseUrl = `${getConfig().LMS_BASE_URL}/api/course_home/v1/course_metadata`;

export async function getCourseHomeCourseMetadata(courseId) {
  const courseHomeMetadataUrl = `${courseHomeBaseUrl}/${courseId}`;
  const { data } = await getAuthenticatedHttpClient().get(courseHomeMetadataUrl);
  return data;
}

export async function getCohorts(courseId) {
  const url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/cohorts/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
}
