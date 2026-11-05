import { camelCaseObject, getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';

export const getCourseHomeBaseUrl = () => `${getSiteConfig().lmsBaseUrl}/api/course_home/v1/course_metadata`;

export async function getCourseHomeCourseMetadata(courseId) {
  const courseHomeMetadataUrl = `${getCourseHomeBaseUrl()}/${courseId}`;
  const { data } = await getAuthenticatedHttpClient().get(courseHomeMetadataUrl);
  return camelCaseObject(data);
}

export async function getCohorts(courseId) {
  const url = `${getSiteConfig().lmsBaseUrl}/courses/${courseId}/cohorts/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
}
