/**
 * @jest-environment jsdom
 */
import React from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import MockAdapter from 'axios-mock-adapter';
import {
  render, screen, cleanup, fireEvent, initializeMockApp, getConfig,
} from '../../../../setupTest';
import BulkEmailForm from '..';
import * as bulkEmailFormApi from '../data/api';
import { BulkEmailContext, BulkEmailProvider } from '../../bulk-email-context';

jest.mock('../../text-editor/TextEditor');

const appendMock = jest.spyOn(FormData.prototype, 'append');
const dispatchMock = jest.fn();

function renderBulkEmailForm() {
  return (
    <BulkEmailProvider>
      <BulkEmailForm courseId="test" />
    </BulkEmailProvider>
  );
}

function renderBulkEmailFormContext(value) {
  return (
    <BulkEmailContext.Provider value={[value, dispatchMock]}>
      <BulkEmailForm courseId="test" />
    </BulkEmailContext.Provider>
  );
}

describe('bulk-email-form', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  beforeEach(() => jest.resetModules());
  afterEach(() => cleanup());
  test('it renders', () => {
    render(renderBulkEmailForm());
    expect(screen.getByText('Send email')).toBeTruthy();
  });
  test('it shows a warning when clicking submit', async () => {
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByText('Send email'));
    const warning = await screen.findByText('CAUTION!', { exact: false });
    expect(warning).toBeTruthy();
  });
  test('Prevent form POST if invalid', async () => {
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByText('Send email'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('At least one recipient is required', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('A subject is required')).toBeInTheDocument();
  });
  test('Shows complete message on completed POST', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onPost().reply(200, {
      course_id: 'test',
      success: true,
    });
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));
    expect(screen.getByRole('checkbox', { name: 'Myself' })).toBeChecked();
    fireEvent.change(screen.getByRole('textbox', { name: 'Subject' }), { target: { value: 'test subject' } });
    fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
    fireEvent.click(screen.getByText('Send email'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('Submitting')).toBeInTheDocument();
    expect(await screen.findByText('Email Created')).toBeInTheDocument();
  });
  test('Shows Error on failed POST', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onPost(`${getConfig().LMS_BASE_URL}/courses/test/instructor/api/send_email`).reply(500);
    render(renderBulkEmailForm());
    const subjectLine = screen.getByRole('textbox', { name: 'Subject' });
    const recipient = screen.getByRole('checkbox', { name: 'Myself' });
    fireEvent.click(recipient);
    fireEvent.change(subjectLine, { target: { value: 'test subject' } });
    fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
    fireEvent.click(screen.getByText('Send email'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(await screen.findByRole('button', { name: /continue/i }));
    expect(await screen.findByText('An error occured while attempting to send the email.')).toBeInTheDocument();
  });
  test('Shows scheduling form when checkbox is checked and submit is changed', async () => {
    render(renderBulkEmailForm());
    const scheduleCheckbox = screen.getByText('Schedule this email for a future date');
    fireEvent.click(scheduleCheckbox);
    expect(screen.getByText('Send time'));
    expect(screen.getByText('Send date'));
    expect(screen.getByText('Schedule Email'));
  });
  test('Prevents sending email when scheduling inputs are empty', async () => {
    render(renderBulkEmailForm());
    const scheduleCheckbox = screen.getByText('Schedule this email for a future date');
    fireEvent.click(scheduleCheckbox);
    const submitButton = await screen.findByText('Schedule Email');
    fireEvent.click(submitButton);
    const continueButton = await screen.findByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);
    expect(screen.getByText('Date and time cannot be blank'));
  });
  test('Adds scheduling data to POST requests when schedule is selected', async () => {
    const postBulkEmailInstructorTask = jest.spyOn(bulkEmailFormApi, 'postBulkEmailInstructorTask');
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Subject' }), { target: { value: 'test subject' } });
    fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
    const scheduleCheckbox = screen.getByText('Schedule this email for a future date');
    fireEvent.click(scheduleCheckbox);
    const submitButton = screen.getByText('Schedule Email');
    const scheduleDate = screen.getByTestId('scheduleDate');
    const scheduleTime = screen.getByTestId('scheduleTime');
    fireEvent.change(scheduleDate, { target: { value: '2020-05-24' } });
    fireEvent.change(scheduleTime, { target: { value: '10:00' } });
    fireEvent.click(submitButton);
    const continueButton = await screen.findByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);
    expect(appendMock).toHaveBeenCalledWith('schedule', expect.stringContaining('2020-05-24'));
    expect(postBulkEmailInstructorTask).toHaveBeenCalledWith(expect.any(FormData), expect.stringContaining('test'));
  });
  test('will PATCH instead of POST when in edit mode', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onPatch().reply(200);
    render(
      renderBulkEmailFormContext({
        editor: {
          editMode: true,
          emailBody: 'test',
          emailSubject: 'test',
          emailRecipients: ['test'],
          scheduleDate: '2020-05-24',
          scheduleTime: '10:00',
          schedulingId: 1,
          emailId: 1,
          isLoading: false,
          errorRetrievingData: false,
        },
      }),
    );
    const submitButton = screen.getByText('Reschedule Email');
    fireEvent.click(submitButton);
    expect(
      await screen.findByText(
        'This will not create a new scheduled email task and instead overwrite the one currently selected. Do you want to overwrite this scheduled email?',
      ),
    ).toBeInTheDocument();
    const continueButton = await screen.findByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
