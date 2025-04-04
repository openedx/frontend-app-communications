/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, fireEvent, cleanup, initializeMockApp,
} from '../../../../setupTest';
import { BulkEmailProvider } from '../../bulk-email-context';
import BulkEmailContentHistory from '../BulkEmailContentHistory';
import { getSentEmailHistory } from '../data/api';
import buildEmailContentHistoryData from '../data/__factories__/emailContentHistory.factory';

jest.mock('../data/api', () => ({
  __esModule: true,
  getSentEmailHistory: jest.fn(() => {}),
}));

function renderBulkEmailContentHistory() {
  return (
    <BulkEmailProvider>
      <BulkEmailContentHistory courseId="test-course-id" />
    </BulkEmailProvider>
  );
}

describe('BulkEmailContentHistory component', () => {
  beforeEach(() => jest.resetModules());
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(cleanup);

  test('renders correctly', async () => {
    render(renderBulkEmailContentHistory());
    const tableDescription = await screen.findByText(
      'View the content of previously sent emails',
    );
    expect(tableDescription).toBeTruthy();
    const showEmailContentHistoryButton = await screen.findByText('Show Sent Email History');
    expect(showEmailContentHistoryButton).toBeTruthy();
  });

  test('renders a table when the button is pressed and data is returned', async () => {
    const emailHistoryData = buildEmailContentHistoryData(1);
    getSentEmailHistory.mockImplementation(() => emailHistoryData);

    render(renderBulkEmailContentHistory());

    const showEmailContentHistoryButton = await screen.findByText('Show Sent Email History');
    fireEvent.click(showEmailContentHistoryButton);

    // verify component structure
    const tableDescription = await screen.findByText(
      'To read a sent email message, click the `View Message` button within the table.',
    );
    expect(tableDescription).toBeTruthy();

    // verify table structure
    expect(await screen.findByText('Subject')).toBeTruthy();
    expect(await screen.findByText('Sent By')).toBeTruthy();
    expect(await screen.findByText('Sent To')).toBeTruthy();
    expect(await screen.findByText('Time Sent')).toBeTruthy();
    expect(await screen.findByText('Number Sent')).toBeTruthy();

    // verify table contents
    const { emails } = emailHistoryData;
    const email = emails[0];
    const createdDate = new Date(email.created).toLocaleString();
    expect(await screen.findByText(createdDate)).toBeTruthy();
    expect(await screen.findByText(email.number_sent)).toBeTruthy();
    expect(await screen.findByText(email.requester)).toBeTruthy();
    expect(await screen.findByText(email.sent_to.join(', '))).toBeTruthy();
    expect(await screen.findByText(email.email.subject)).toBeTruthy();
    // verify screen reader only <span />
    expect(await screen.findByText('0')).toHaveClass('sr-only');
    expect(await screen.findAllByText('View Message')).toBeTruthy();
  });

  test('renders a modal that will display the contents of the previously sent message to a user', async () => {
    const emailHistoryData = buildEmailContentHistoryData(1);
    getSentEmailHistory.mockImplementation(() => emailHistoryData);

    render(renderBulkEmailContentHistory());

    const showEmailContentHistoryButton = await screen.findByText('Show Sent Email History');
    fireEvent.click(showEmailContentHistoryButton);

    const viewMessageButton = await screen.findByText('View Message');
    fireEvent.click(viewMessageButton);

    // verify modal components and behavior
    const { emails } = emailHistoryData;
    const email = emails[0];
    const closeButton = await screen.findAllByText('Close');

    expect(closeButton).toBeTruthy();
    expect(await screen.findByText('Subject:')).toBeTruthy();
    expect(await screen.findByText('Sent by:')).toBeTruthy();
    expect(await screen.findByText('Time sent:')).toBeTruthy();
    expect(await screen.findByText('Sent to:')).toBeTruthy();
    expect(await screen.findByText('Message:')).toBeTruthy();
    expect(await screen.findAllByText(email.email.subject)).toBeTruthy();
    expect(await screen.findAllByText(email.requester)).toBeTruthy();
    const createdDate = new Date(email.created).toLocaleString();
    expect(await screen.findAllByText(createdDate)).toBeTruthy();
    expect(await screen.findAllByText(email.sent_to.join(', '))).toBeTruthy();
    // .replace() call strips the HTML tags from the string
    expect(await screen.findByText(email.email.html_message.replace(/<[^>]*>?/gm, ''))).toBeTruthy();
  });

  test('renders a warning Alert when the button is pressed but there is no data to display', async () => {
    const emailHistoryData = buildEmailContentHistoryData(0);
    getSentEmailHistory.mockImplementation(() => emailHistoryData);
    // render the component
    render(renderBulkEmailContentHistory());
    // press the `show sent email history` button to initiate data retrieval
    const showEmailContentHistoryButton = await screen.findByText('Show Sent Email History');
    fireEvent.click(showEmailContentHistoryButton);
    // verify that an alert is displayed since the array of tasks is empty
    const alertMessage = await screen.findByText('There is no email history for this course.');
    expect(alertMessage).toBeTruthy();
  });

  test('renders an error Alert when the button is pressed and an error occurs retrieving data', async () => {
    getSentEmailHistory.mockImplementation(() => {
      throw new Error();
    });
    // render the component
    render(renderBulkEmailContentHistory());
    // press the `show sent email history` button to initiate data retrieval
    const showEmailContentHistoryButton = await screen.findByText('Show Sent Email History');
    fireEvent.click(showEmailContentHistoryButton);
    // verify that an alert is displayed since the array of tasks is empty
    const alertMessage = await screen.findByText(
      'An error occurred retrieving email history data for this course. Please try again later.',
    );
    expect(alertMessage).toBeTruthy();
  });
});
