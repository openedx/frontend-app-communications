/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, cleanup, act, initializeMockApp,
} from '../../../../setupTest';
import BulkEmailPendingTasks from '../BulkEmailPendingTasks';
import { getInstructorTasks } from '../data/api';
import buildPendingInstructorTaskData from '../data/__factories__/pendingInstructorTask.factory';

jest.mock('../data/api', () => ({
  __esModule: true,
  getInstructorTasks: jest.fn(() => {}),
}));

describe('BulkEmailPendingTasks component', () => {
  beforeEach(() => jest.resetModules());
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(cleanup);

  test('renders correctly', async () => {
    render(<BulkEmailPendingTasks />);

    const alertMessage = await screen.findByText('No tasks currently running.');

    expect(alertMessage).toBeTruthy();
  });

  test('renders a table when running Instructor Task data is returned', async () => {
    jest.useFakeTimers();

    const pendingInstructorTaskData = buildPendingInstructorTaskData(1);
    getInstructorTasks.mockImplementation(() => pendingInstructorTaskData);

    act(() => {
      render(<BulkEmailPendingTasks />);
    });

    act(() => {
      // fast forward time by 31 seconds for the API call to be made to retrieve pending tasks
      jest.advanceTimersByTime(31000);
    });

    // verify component structure
    const tableDescription = await screen.findByText(
      'Email actions run in the background. The status for any active tasks - including email tasks - appears in '
        + 'the table below.',
    );
    expect(tableDescription).toBeTruthy();

    // verify table structure
    expect(await screen.findByText('Task Type')).toBeTruthy();
    expect(await screen.findByText('Task Inputs')).toBeTruthy();
    expect(await screen.findByText('Task Id')).toBeTruthy();
    expect(await screen.findByText('Requester')).toBeTruthy();
    expect(await screen.findByText('Submitted')).toBeTruthy();
    expect(await screen.findByText('Duration (seconds)')).toBeTruthy();
    expect(await screen.findByText('State')).toBeTruthy();
    expect(await screen.findByText('Status')).toBeTruthy();
    expect(await screen.findByText('Task Progress')).toBeTruthy();
    expect(await screen.findAllByText('Showing 1 - 1 of 1.')).toBeTruthy();

    // verification of table contents
    const { tasks } = pendingInstructorTaskData;
    const task = tasks[0];
    expect(await screen.findByText(task.created)).toBeTruthy();
    expect(await screen.findByText(task.duration_sec)).toBeTruthy();
    expect(await screen.findByText(task.requester)).toBeTruthy();
    expect(await screen.findByText(task.status)).toBeTruthy();
    expect(await screen.findByText(task.task_id)).toBeTruthy();
    expect(await screen.findByText(task.task_input)).toBeTruthy();
    expect(await screen.findByText(task.task_message)).toBeTruthy();
    expect(await screen.findByText(task.task_state)).toBeTruthy();
    expect(await screen.findByText(task.task_type)).toBeTruthy();
  });

  test('renders an error Alert if an error occurs retrieving data', async () => {
    jest.useFakeTimers();

    getInstructorTasks.mockImplementation(() => {
      throw new Error();
    });

    act(() => {
      render(<BulkEmailPendingTasks />);
    });

    act(() => {
      // fast forward time by 31 seconds for the API call to be made to retrieve pending tasks
      jest.advanceTimersByTime(31000);
    });

    const alertMessage = await screen.findByText(
      'Error fetching running task data. This request will be retried automatically.',
    );
    expect(alertMessage).toBeTruthy();
  });
});
