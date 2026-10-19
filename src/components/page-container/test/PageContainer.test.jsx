/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Factory } from 'rosie';
import {
  cleanup, initializeMockApp, render, screen,
} from '../../../setupTest';

import PageContainer from '../PageContainer';
import { getCohorts, getCourseHomeCourseMetadata } from '../data/api';
import '../data/__factories__/cohort.factory';
import '../data/__factories__/courseMetadata.factory';

jest.mock('../data/api', () => ({
  __esModule: true,
  getCohorts: jest.fn(() => {}),
  getCourseHomeCourseMetadata: jest.fn(() => {}),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({
    courseId: 'test-course-id',
  })),
}));

describe('PageContainer', () => {
  beforeEach(() => jest.resetModules());
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(cleanup);

  test('PageContainer renders properly when given course metadata', async () => {
    const cohorts = { cohorts: [Factory.build('cohort'), Factory.build('cohort')] };
    const courseMetadata = Factory.build('courseMetadata');

    getCohorts.mockResolvedValue(cohorts);
    getCourseHomeCourseMetadata.mockResolvedValue(courseMetadata);

    render(<PageContainer />);

    // Look for the org, title, and number of the course, which should be displayed in the Header.
    expect(await screen.findByText(`${courseMetadata.org} ${courseMetadata.number}`)).toBeTruthy();
    expect(await screen.findByText(courseMetadata.title)).toBeTruthy();
    expect(getCourseHomeCourseMetadata).toHaveBeenCalledWith('test-course-id');
    expect(getCohorts).toHaveBeenCalledWith('test-course-id');
  });

  test('PageContainer renders children nested within it.', async () => {
    const cohorts = { cohorts: [Factory.build('cohort'), Factory.build('cohort')] };
    const courseMetadata = Factory.build('courseMetadata');

    getCohorts.mockResolvedValue(cohorts);
    getCourseHomeCourseMetadata.mockResolvedValue(courseMetadata);

    render(
      <PageContainer>
        <span>Test Text</span>
      </PageContainer>,
    );

    expect(await screen.findByText('Test Text')).toBeTruthy();
  });

  test('PageContainer keeps course metadata when only the cohorts call fails', async () => {
    const courseMetadata = Factory.build('courseMetadata');

    getCohorts.mockRejectedValue(new Error('API Error'));
    getCourseHomeCourseMetadata.mockResolvedValue(courseMetadata);

    render(<PageContainer />);

    expect(await screen.findByText(`${courseMetadata.org} ${courseMetadata.number}`)).toBeTruthy();
    expect(await screen.findByText(courseMetadata.title)).toBeTruthy();
  });

  test('PageContainer still renders children when the API calls fail', async () => {
    getCohorts.mockRejectedValue(new Error('API Error'));
    getCourseHomeCourseMetadata.mockRejectedValue(new Error('API Error'));

    render(
      <PageContainer>
        <span>Test Text</span>
      </PageContainer>,
    );

    expect(await screen.findByText('Test Text')).toBeTruthy();
  });
});
