import { Factory } from 'rosie';
import { camelCaseObject, getAuthenticatedHttpClient } from '@openedx/frontend-base';
import MockAdapter from 'axios-mock-adapter';
import { initializeMockApp } from '../../../setupTest';
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
});
