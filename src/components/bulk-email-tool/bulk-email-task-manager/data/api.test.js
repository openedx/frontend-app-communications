import { getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import MockAdapter from 'axios-mock-adapter';
import { initializeMockApp } from '../../../../setupTest';
import { getEmailTaskHistory, getInstructorTasks, getSentEmailHistory } from './api';

describe('bulk email task manager api', () => {
  const courseId = 'test-course-id';
  let axiosMock;

  beforeAll(async () => {
    await initializeMockApp();
  });

  beforeEach(() => {
    axiosMock = new MockAdapter(getAuthenticatedHttpClient());
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test.each([
    ['getSentEmailHistory', getSentEmailHistory, 'list_email_content'],
    ['getEmailTaskHistory', getEmailTaskHistory, 'list_background_email_tasks'],
    ['getInstructorTasks', getInstructorTasks, 'list_instructor_tasks'],
  ])('%s posts to the %s endpoint and returns its data', async (_name, apiFn, endpoint) => {
    const responseData = { results: [{ id: 1 }] };
    const url = `${getSiteConfig().lmsBaseUrl}/courses/${courseId}/instructor/api/${endpoint}`;
    axiosMock.onPost(url).reply(200, responseData);

    const data = await apiFn(courseId);

    expect(data).toEqual(responseData);
    expect(axiosMock.history.post).toHaveLength(1);
    expect(axiosMock.history.post[0].url).toEqual(url);
  });

  test('propagates request errors', async () => {
    axiosMock.onPost().reply(500);

    await expect(getSentEmailHistory(courseId)).rejects.toThrow();
  });
});
