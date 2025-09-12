/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Factory } from 'rosie';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  render, screen, cleanup, initializeMockApp,
} from '../../../setupTest';
import BulkEmailTool from '../BulkEmailTool';
import { CourseMetadataContext } from '../../page-container/PageContainer';
import '../../page-container/data/__factories__/cohort.factory';
import '../../page-container/data/__factories__/courseMetadata.factory';

jest.mock('../text-editor/TextEditor');
jest.mock('../bulk-email-task-manager/api', () => ({
  getInstructorTasks: jest.fn(() => ({ tasks: {} })),
  getEmailTaskHistory: jest.fn(() => ({ tasks: {} })),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({
    courseId: 'test-course-id',
  })),
}));
jest.mock('@edx/frontend-component-header', () => ({
  __esModule: true,
  default: () => null,
}));

describe('BulkEmailTool', () => {
  beforeEach(() => jest.resetModules());
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(cleanup);

  /**
   * Utility function to munge course data in the form the components expect.
   *
   */
  function buildCourseMetadata(cohortData, courseData) {
    const {
      org, number, title, tabs, originalUserIsStaff,
    } = camelCaseObject(courseData);
    const { cohorts } = cohortData;

    return {
      org,
      number,
      title,
      originalUserIsStaff,
      tabs: [...tabs],
      cohorts: cohorts.map(({ name }) => name),
    };
  }

  /**
   * Function that wraps component under test in a context provider. This allows us to make the data needed for testing
   * availble to the component under test.
   */
  function renderBulkEmailTool(courseMetadata) {
    return render(
      <CourseMetadataContext.Provider value={courseMetadata}>
        <BulkEmailTool />
      </CourseMetadataContext.Provider>,
    );
  }

  test('BulkEmailTool renders properly when given course metadata through context', async () => {
    const cohorts = { cohorts: [] };
    const courseInfo = Factory.build('courseMetadata');
    const courseMetadata = buildCourseMetadata(cohorts, courseInfo);
    renderBulkEmailTool(courseMetadata);
    // verify all tab data expected is displayed within our component
    expect(await screen.findByText('Course')).toBeTruthy();
    expect(await screen.findByText('Discussion')).toBeTruthy();
    expect(await screen.findByText('Wiki')).toBeTruthy();
    expect(await screen.findByText('Progress')).toBeTruthy();
    expect(await screen.findByText('Instructor')).toBeTruthy();
    expect(await screen.findByText('Dates')).toBeTruthy();
  });

  test('BulkEmailTool renders error page on no staff user', async () => {
    const cohorts = { cohorts: [] };
    const courseInfo = Factory.build('courseMetadata', { original_user_is_staff: false });
    const courseMetadata = buildCourseMetadata(cohorts, courseInfo);
    renderBulkEmailTool(courseMetadata);
    // verify error page is displayed for user without staff permissions
    expect(
      await screen.findByText('An unexpected error occurred. Please click the button below to refresh the page.'),
    ).toBeTruthy();
  });
});
