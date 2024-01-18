/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, fireEvent, cleanup, act, initializeMockApp,
} from '../../../../setupTest';
import BulkEmailTaskHistory from '../BulkEmailTaskHistory';
import { getEmailTaskHistory } from '../data/api';
import buildEmailTaskHistoryData from '../data/__factories__/emailTaskHistory.factory';

jest.mock('../data/api', () => ({
  __esModule: true,
  getEmailTaskHistory: jest.fn(() => {}),
}));

describe('BulkEmailTaskHistory component', () => {
  beforeEach(() => jest.resetModules());
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(cleanup);

  test('renders correctly ', async () => {
    render(<BulkEmailTaskHistory />);
    const tableDescription = await screen.findByText(
      'View the status for all email tasks created for this course',
    );
    expect(tableDescription).toBeTruthy();
    const showEmailTaskHistoryButton = await screen.findByText('Show Email Task History');
    expect(showEmailTaskHistoryButton).toBeTruthy();
  });

  test('renders a table properly when the button is pressed and data is returned', async () => {
    await act(async () => {
      // build our mocked response
      const taskHistoryData = buildEmailTaskHistoryData(1);
      getEmailTaskHistory.mockImplementation(() => taskHistoryData);
      // render the component
      render(<BulkEmailTaskHistory />);
      // press the `show task history button` to initiate data retrieval and rendering of the table in our component
      const showTaskHistoryButton = await screen.findByText('Show Email Task History');
      fireEvent.click(showTaskHistoryButton);
      // verification of table structure
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
      // verification of row contents
      const { tasks } = taskHistoryData;
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
  });

  test('renders a warning Alert when the button is pressed but there is no data to display', async () => {
    await act(async () => {
      const taskHistoryData = buildEmailTaskHistoryData(0);
      getEmailTaskHistory.mockImplementation(() => taskHistoryData);
      // render the component
      render(<BulkEmailTaskHistory />);
      // press the `show task history` button to initiate data retrieval
      const showTaskHistoryButton = await screen.findByText('Show Email Task History');
      fireEvent.click(showTaskHistoryButton);
      // verify that an alert is displayed since the array of tasks is empty
      const alertMessage = await screen.findByText('There is no email task history for this course.');
      expect(alertMessage).toBeTruthy();
    });
  });

  test('renders an error Alert when the button is pressed and an error occurs retrieving data', async () => {
    await act(async () => {
      getEmailTaskHistory.mockImplementation(() => {
        throw new Error();
      });
      // render the component
      render(<BulkEmailTaskHistory />);
      // press the `show task history` button to initiate data retrieval
      const showTaskHistoryButton = await screen.findByText('Show Email Task History');
      fireEvent.click(showTaskHistoryButton);
      // verify that an alert is displayed since the array of tasks is empty
      const alertMessage = await screen.findByText(
        'Error fetching email task history data for this course. Please try again later.',
      );
      expect(alertMessage).toBeTruthy();
    });
  });
});
