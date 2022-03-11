/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Factory } from 'rosie';
import {
  act, cleanup, render, screen,
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
  afterEach(cleanup);

  test('PageContainer renders properly when given course metadata', async () => {
    await act(async () => {
      const cohorts = { cohorts: [Factory.build('cohort'), Factory.build('cohort')] };
      const courseMetadata = Factory.build('courseMetadata');

      getCohorts.mockImplementation(() => cohorts);
      getCourseHomeCourseMetadata.mockImplementation(() => courseMetadata);

      render(<PageContainer />);

      // Look for the org, title, and number of the course, which should be displayed in the Header.
      expect(await screen.findByText(`${courseMetadata.org} ${courseMetadata.number}`)).toBeTruthy();
      expect(await screen.findByText(courseMetadata.title)).toBeTruthy();
    });
  });

  test('PageContainer renders children nested within it.', async () => {
    await act(async () => {
      const cohorts = { cohorts: [Factory.build('cohort'), Factory.build('cohort')] };
      const courseMetadata = Factory.build('courseMetadata');

      getCohorts.mockImplementation(() => cohorts);
      getCourseHomeCourseMetadata.mockImplementation(() => courseMetadata);

      render(
        <PageContainer>
          <span>Test Text</span>
        </PageContainer>,
      );

      expect(await screen.findByText('Test Text')).toBeTruthy();
    });
  });
});
