import React from 'react';

import BulkEmailPendingTasksAlert from '../BulkEmailPendingTasksAlert';
import {
  initializeMockApp, render, screen,
} from '../../../../setupTest';

describe('Testing BulkEmailPendingTasksAlert Component', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });

  test('Render without Public path', async () => {
    render(<BulkEmailPendingTasksAlert courseId="test-course-id" />);

    const linkEl = await screen.findByText('Course Info');
    expect(linkEl.href).toEqual('http://localhost:18000/courses/test-course-id/instructor#view-course-info');
  });

  test('Render with Public path', async () => {
    Object.defineProperty(window, 'location', {
      get() {
        return { pathname: '/communications/courses/test-course-id/bulk-email' };
      },
    });

    render(<BulkEmailPendingTasksAlert courseId="test-course-id" />);

    const linkEl = await screen.findByText('Course Info');
    expect(linkEl.href).toEqual('http://localhost:18000/courses/test-course-id/instructor#view-course-info');
    expect(window.location.pathname).toEqual('/communications/courses/test-course-id/bulk-email');
  });
});
