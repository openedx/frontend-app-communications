import { Factory } from 'rosie';
import { camelCaseObject, getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import MockAdapter from 'axios-mock-adapter';
import { initializeMockApp } from '@src/setupTest';
import * as api from './api';
import './__factories__/courseMetadata.factory';

describe('api', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });

  test('getCourseHomeCourseMetadata', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    const courseMetadata = Factory.build('courseMetadata');
    const { id: courseId } = courseMetadata;
    axiosMock
      .onGet(`${api.getCourseHomeBaseUrl()}/${courseId}`)
      .reply(200, courseMetadata);
    const data = await api.getCourseHomeCourseMetadata(courseId);
    expect(data).toEqual(camelCaseObject(courseMetadata));
  });

  test('getCohorts', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    const courseId = 'test-course-id';
    const cohorts = { cohorts: [{ id: 1, name: 'cohort 1' }] };
    axiosMock
      .onGet(`${getSiteConfig().lmsBaseUrl}/courses/${courseId}/cohorts/`)
      .reply(200, cohorts);
    const data = await api.getCohorts(courseId);
    expect(data).toEqual(cohorts);
  });
});
