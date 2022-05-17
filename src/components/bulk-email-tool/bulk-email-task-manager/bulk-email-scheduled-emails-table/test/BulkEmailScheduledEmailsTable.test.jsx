/**
 * @jest-environment jsdom
 */
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import {
  render, screen, cleanup, fireEvent, initializeMockApp,
} from '../../../../../setupTest';
import { BulkEmailProvider } from '../../../bulk-email-context';
import BulkEmailScheduledEmailsTable from '..';
import scheduledEmailsFactory from './__factories__/scheduledEmails.factory';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ courseId: 'test-id' }),
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
  afterEach(() => cleanup());

  it('properly renders scheduled emails', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/undefined/bulk_email/?page=1`)
      .reply(200, scheduledEmailsFactory.build(1));
    render(renderBulkEmailScheduledEmailsTable());
    expect(await screen.findByText('learners')).toBeTruthy();
    expect(await screen.findByText('subject')).toBeTruthy();
    expect(await screen.findByText('edx')).toBeTruthy();
    expect(await screen.findByLabelText('View')).toBeTruthy();
  });

  it('shows an error when the fetch fails', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/undefined/bulk_email/?page=1`)
      .reply(500, { response: 500 });
    render(renderBulkEmailScheduledEmailsTable());
    expect(
      await screen.findByText('An error occured while retrieving scheduled email information. Please try again later.'),
    ).toBeTruthy();
  });

  it('pops up the modal when viewing an email', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().LMS_BASE_URL}/api/instructor_task/v1/schedules/undefined/bulk_email/?page=1`)
      .reply(200, scheduledEmailsFactory.build(1));
    render(renderBulkEmailScheduledEmailsTable());
    fireEvent.click(await screen.findByLabelText('View'));
    expect(await screen.findByText('Subject:')).toBeTruthy();
    expect(await screen.findByText('Sent by:')).toBeTruthy();
    expect(await screen.findByText('Time sent:')).toBeTruthy();
    expect(await screen.findByText('Sent to:')).toBeTruthy();
    expect(await screen.findByText('Message:')).toBeTruthy();
  });
});
