/**
 * @jest-environment jsdom
 */
import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import MockAdapter from 'axios-mock-adapter';
import {
  render, screen, cleanup, fireEvent, initializeMockApp, waitFor,
} from '../../../../setupTest';
import BulkEmailForm from '../BulkEmailForm';
import * as bulkEmailFormApi from '../data/api';
import BulkEmailProvider, { BulkEmailContext, editorInitialState } from '../../bulk-email-context/BulkEmailProvider';
import { formatDate } from '../../../../utils/formatDateAndTime';
import cohortFactory from '../data/__factories__/bulkEmailFormCohort.factory';
import courseModeFactory from '../data/__factories__/bulkEmailFormCourseMode.factory';

jest.mock('../../text-editor/TextEditor');

const appendMock = jest.spyOn(FormData.prototype, 'append');

const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
const courseMode = courseModeFactory();

function renderBulkEmailForm() {
  const { cohorts } = cohortFactory.build();
  return (
    <BulkEmailProvider>
      <BulkEmailForm
        courseId="test"
        cohorts={cohorts}
        courseModes={courseMode}
      />
    </BulkEmailProvider>
  );
}

function renderBulkEmailFormContext(editor, actions = {}) {
  const { cohorts } = cohortFactory.build();
  const value = {
    editor,
    updateEditor: jest.fn(),
    copyToEditor: jest.fn(),
    clearEditor: jest.fn(),
    ...actions,
  };
  return (
    <BulkEmailContext.Provider value={value}>
      <BulkEmailForm courseId="test" cohorts={cohorts} courseModes={courseMode} />
    </BulkEmailContext.Provider>
  );
}

describe('bulk-email-form', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  beforeEach(() => jest.resetModules());
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
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
    expect(screen.getByText('Email successfully created')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(await screen.findByRole('button', { name: 'Send email' })).toBeInTheDocument();
    expect(screen.queryByText('Email successfully created')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Subject' })).toHaveValue('');
    expect(screen.getByRole('checkbox', { name: 'Myself' })).not.toBeChecked();
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
    expect(await screen.findByRole('button', { name: 'Error' })).toBeEnabled();
    expect(axiosMock.history.post).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(await screen.findByRole('button', { name: 'Send email' })).toBeInTheDocument();
    expect(screen.queryByText('An error occured while attempting to send the email.')).not.toBeInTheDocument();
    expect(subjectLine).toHaveValue('test subject');
    expect(screen.getByTestId('textEditor')).toHaveValue('test body');
    expect(recipient).toBeChecked();
  });
  test.each([
    { status: 200, buttonLabel: 'Email Created', preservesEditor: false },
    { status: 500, buttonLabel: 'Error', preservesEditor: true },
  ])('Automatically resets after a $status POST response', async ({ status, buttonLabel, preservesEditor }) => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onPost(`${getConfig().LMS_BASE_URL}/courses/test/instructor/api/send_email`).reply(status, {
      course_id: 'test',
      success: status === 200,
    });
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Subject' }), { target: { value: 'test subject' } });
    fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send email' }));
    fireEvent.click(await screen.findByRole('button', { name: /continue/i }));
    expect(await screen.findByRole('button', { name: buttonLabel })).toBeInTheDocument();

    expect(await screen.findByRole('button', { name: 'Send email' }, { timeout: 4000 })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Subject' })).toHaveValue(preservesEditor ? 'test subject' : '');
    expect(screen.getByRole('checkbox', { name: 'Myself' }).checked).toBe(preservesEditor);
  });
  test('Checking "All learners" removes selected cohorts and tracks but preserves other recipients', () => {
    const updateEditor = jest.fn();
    const { cohorts } = cohortFactory.build();
    const cohort = `cohort:${cohorts[0]}`;
    const editor = { ...editorInitialState, emailRecipients: ['myself', 'staff'] };
    const { rerender } = render(renderBulkEmailFormContext(editor, { updateEditor }));

    fireEvent.click(screen.getByRole('checkbox', { name: `Cohort: ${cohorts[0]}` }));
    expect(updateEditor).toHaveBeenLastCalledWith({ emailRecipients: ['myself', 'staff', cohort] });

    rerender(renderBulkEmailFormContext({
      ...editor,
      emailRecipients: ['myself', 'staff', cohort, 'track:verified', 'track:audit'],
    }, { updateEditor }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'All learners' }));

    expect(updateEditor).toHaveBeenLastCalledWith({ emailRecipients: ['myself', 'staff', 'learners'] });
  });
  test('Unchecking a recipient removes only that recipient', () => {
    const updateEditor = jest.fn();
    render(renderBulkEmailFormContext({
      ...editorInitialState,
      emailRecipients: ['myself', 'staff'],
    }, { updateEditor }));

    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));

    expect(updateEditor).toHaveBeenCalledWith({ emailRecipients: ['staff'] });
  });
  test('Cancel clears the editor when editing a scheduled email', async () => {
    const clearEditor = jest.fn();
    render(renderBulkEmailFormContext({
      ...editorInitialState,
      editMode: true,
      emailSubject: 'Scheduled subject',
      emailBody: 'Scheduled body',
      emailRecipients: ['myself'],
      scheduleDate: formatDate(tomorrow),
      scheduleTime: '10:00',
    }, { clearEditor }));
    expect(await screen.findByRole('button', { name: 'Reschedule Email' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(clearEditor).toHaveBeenCalledTimes(1);
  });
  test('Checking "All learners" disables each learner group', async () => {
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByRole('checkbox', { name: 'All learners' }));
    const verifiedLearners = screen.getByRole('checkbox', { name: 'Learners in the Verified Certificate Track' });
    const auditLearners = screen.getByRole('checkbox', { name: 'Learners in the Audit Track' });
    const { cohorts } = cohortFactory.build();
    cohorts.forEach(cohort => expect(screen.getByRole('checkbox', { name: `Cohort: ${cohort}` })).toBeDisabled());
    expect(verifiedLearners).toBeDisabled();
    expect(auditLearners).toBeDisabled();
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
    expect(screen.getByText('Date and time cannot be blank, and must be a date in the future'));
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
    fireEvent.change(scheduleDate, { target: { value: formatDate(tomorrow) } });
    fireEvent.change(scheduleTime, { target: { value: '10:00' } });
    fireEvent.click(submitButton);
    const continueButton = await screen.findByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);
    expect(appendMock).toHaveBeenCalledWith('schedule', expect.stringContaining(formatDate(tomorrow)));
    await waitFor(() => {
      expect(postBulkEmailInstructorTask).toHaveBeenCalledWith(expect.any(FormData), expect.stringContaining('test'));
    });
  });
  test('will PATCH instead of POST when in edit mode', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onPatch().reply(200);
    const patchScheduledBulkEmailInstructorTask = jest.spyOn(bulkEmailFormApi, 'patchScheduledBulkEmailInstructorTask');
    const postBulkEmailInstructorTask = jest.spyOn(bulkEmailFormApi, 'postBulkEmailInstructorTask');
    render(
      renderBulkEmailFormContext({
        editMode: true,
        emailBody: 'test',
        emailSubject: 'test',
        emailRecipients: ['test'],
        scheduleDate: formatDate(tomorrow),
        scheduleTime: '10:00',
        schedulingId: 1,
        emailId: 1,
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
    await waitFor(() => {
      expect(patchScheduledBulkEmailInstructorTask).toHaveBeenCalledWith(
        expect.objectContaining({ email: expect.objectContaining({ id: 1, subject: 'test' }) }),
        'test',
        1,
      );
    });
    expect(postBulkEmailInstructorTask).not.toHaveBeenCalled();
  });
});
