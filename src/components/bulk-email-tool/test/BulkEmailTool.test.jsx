/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Factory } from 'rosie';
import { render, screen } from '../../../setupTest';
import BulkEmailTool from '../BulkEmailTool';
import { getCourseHomeCourseMetadata } from '../data/api';
import '../data/__factories__/courseMetadata.factory';

jest.mock('../text-editor/TextEditor');
jest.mock('../bulk-email-task-manager/api', () => ({
  getInstructorTasks: jest.fn(() => ({ tasks: {} })),
  getEmailTaskHistory: jest.fn(() => ({ tasks: {} })),
}));
jest.mock('../data/api', () => ({
  __esModule: true,
  getCourseHomeCourseMetadata: jest.fn(() => {}),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({
    courseId: 'test-course-id',
  })),
}));

describe('BulkEmailTool', () => {
  test('BulkEmailTool renders properly when given course metadata', async () => {
    const courseMetadata = Factory.build('courseMetadata');
    getCourseHomeCourseMetadata.mockImplementation(() => courseMetadata);
    render(<BulkEmailTool />);
    expect(await screen.findByText('Course')).toBeTruthy();
  });
  test('BulkEmailTool renders error page on no staff user', async () => {
    const courseMetadata = Factory.build('courseMetadata', { is_staff: false });
    getCourseHomeCourseMetadata.mockImplementation(() => courseMetadata);
    render(<BulkEmailTool />);
    expect(
      await screen.findByText('An unexpected error occurred. Please click the button below to refresh the page.'),
    ).toBeTruthy();
  });
});
