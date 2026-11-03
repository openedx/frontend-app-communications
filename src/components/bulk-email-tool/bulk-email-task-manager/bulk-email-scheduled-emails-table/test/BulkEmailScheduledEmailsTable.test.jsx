/**
 * @jest-environment jsdom
 */
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import {
  render, screen, cleanup, fireEvent, initializeMockApp, waitFor,
} from '../../../../../setupTest';
import BulkEmailProvider, { BulkEmailContext, editorInitialState } from '../../../bulk-email-context/BulkEmailProvider';
import BulkEmailScheduledEmailsTable from '../BulkEmailScheduledEmailsTable';
import scheduledEmailsFactory from './__factories__/scheduledEmails.factory';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ courseId: 'test-id' }),
}));

function renderBulkEmailScheduledEmailsTable() {
  return (
    <BulkEmailProvider>
      <BulkEmailScheduledEmailsTable />
    </BulkEmailProvider>
  );
}

describe('BulkEmailScheduledEmailsTable', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(() => {
    cleanup();
    Factory.resetAll();
  });

  it('properly renders scheduled emails', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .reply(200, scheduledEmailsFactory.build(1));
    render(renderBulkEmailScheduledEmailsTable());
    expect(await screen.findByText('All learners')).toBeTruthy();
    expect(await screen.findByText('subject')).toBeTruthy();
    expect(await screen.findByText('edx')).toBeTruthy();
    expect(await screen.findByLabelText('View')).toBeTruthy();
  });

  it('shows an error when the fetch fails', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .reply(500, { response: 500 });
    render(renderBulkEmailScheduledEmailsTable());
    expect(
      await screen.findByText('An error occured while retrieving scheduled email information. Please try again later.'),
    ).toBeTruthy();
  });

  it('pops up the modal when viewing an email', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .reply(200, scheduledEmailsFactory.build(1));
    render(renderBulkEmailScheduledEmailsTable());
    fireEvent.click(await screen.findByLabelText('View'));
    expect(await screen.findByText('Subject:')).toBeTruthy();
    expect(await screen.findByText('Sent by:')).toBeTruthy();
    expect(await screen.findByText('Time sent:')).toBeTruthy();
    expect(await screen.findByText('Sent to:')).toBeTruthy();
    expect(await screen.findByText('Message:')).toBeTruthy();
  });

  it('properly formats data for editing mode', async () => {
    const editorObj = {
      editMode: true,
      emailId: 1,
      emailBody: '<p>body</p>',
      emailSubject: 'subject',
      emailRecipients: ['learners'],
      scheduleDate: '2022-04-27',
      scheduleTime: '00:00',
      schedulingId: 1,
    };
    const copyToEditor = jest.fn();
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .reply(200, scheduledEmailsFactory.build(1));
    render(
      <BulkEmailContext.Provider
        value={{
          editor: editorInitialState, updateEditor: jest.fn(), copyToEditor, clearEditor: jest.fn(),
        }}
      >
        <BulkEmailScheduledEmailsTable />
      </BulkEmailContext.Provider>,
    );
    fireEvent.click(await screen.findByLabelText('Edit'));
    expect(copyToEditor).toHaveBeenCalledWith(editorObj);
  });
  it('pops up alert on delete pressed', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .replyOnce(200, scheduledEmailsFactory.build(1))
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .replyOnce(200, {
        next: null,
        previous: null,
        count: 0,
        num_pages: 1,
        current_page: 1,
        start: 0,
        results: [],
      })
      .onDelete(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/1`)
      .reply(204, []);
    render(renderBulkEmailScheduledEmailsTable());
    fireEvent.click(await screen.findByLabelText('Delete'));
    expect(await screen.findByText('Caution')).toBeInTheDocument();
  });
  it('Deletes an email when clicking continue on warning', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .replyOnce(200, scheduledEmailsFactory.build(1))
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .replyOnce(200, {
        next: null,
        previous: null,
        count: 0,
        num_pages: 1,
        current_page: 1,
        start: 0,
        results: [],
      })
      .onDelete(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/1`)
      .reply(204, []);
    render(renderBulkEmailScheduledEmailsTable());
    fireEvent.click(await screen.findByLabelText('Delete'));
    expect(await screen.findByText('Caution')).toBeInTheDocument();
    fireEvent.click(await screen.findByText('Continue'));
    expect(await screen.findByText('No results found')).toBeInTheDocument();
  });

  it('keeps the table usable after a failed delete and allows dismissing the error', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .reply(200, scheduledEmailsFactory.build(1))
      .onDelete(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/1`)
      .reply(500);
    render(renderBulkEmailScheduledEmailsTable());

    fireEvent.click(await screen.findByLabelText('Delete'));
    fireEvent.click(await screen.findByText('Continue'));

    const deleteError = await screen.findByText('An error occurred while deleting the scheduled email. Please try again.');
    expect(screen.getByText('subject')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(deleteError).not.toBeInTheDocument());
    expect(screen.getByRole('table')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('View'));
    expect(await screen.findByText('Message:')).toBeInTheDocument();
  });

  it('allows retrying a failed delete without reloading or dismissing the error', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .replyOnce(200, scheduledEmailsFactory.build(1))
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/?page=1`)
      .reply(200, {
        next: null,
        previous: null,
        count: 0,
        num_pages: 1,
        current_page: 1,
        start: 0,
        results: [],
      })
      .onDelete(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/1`)
      .replyOnce(500)
      .onDelete(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/test-id/bulk_email/1`)
      .reply(204, []);
    render(renderBulkEmailScheduledEmailsTable());

    fireEvent.click(await screen.findByLabelText('Delete'));
    fireEvent.click(await screen.findByText('Continue'));
    const deleteError = await screen.findByText('An error occurred while deleting the scheduled email. Please try again.');

    fireEvent.click(screen.getByLabelText('Delete'));
    fireEvent.click(await screen.findByText('Continue'));

    expect(await screen.findByText('No results found')).toBeInTheDocument();
    expect(deleteError).not.toBeInTheDocument();
    expect(axiosMock.history.delete).toHaveLength(2);
  });
});
