/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, cleanup, fireEvent, initializeMockApp,
} from '../../../../setupTest';
import BulkEmailForm from '..';
import { postBulkEmail } from '../data/api';
import { BulkEmailProvider } from '../../bulk-email-context';

jest.mock('../../text-editor/TextEditor');
jest.mock('../data/api', () => ({
  __esModule: true,
  postBulkEmail: jest.fn(() => ({ status: 200 })),
}));
const appendMock = jest.spyOn(FormData.prototype, 'append');

function renderBulkEmailForm() {
  return (
    <BulkEmailProvider>
      <BulkEmailForm courseId="test-course-id" />
    </BulkEmailProvider>
  );
}

describe('bulk-email-form', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });

  beforeEach(() => jest.resetModules());
  afterEach(cleanup);
  test('it renders', () => {
    render(renderBulkEmailForm());
    expect(screen.getByText('Send Email')).toBeTruthy();
  });
  test('it shows a warning when clicking submit', async () => {
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByText('Send Email'));
    const warning = await screen.findByText('CAUTION!', { exact: false });
    expect(warning).toBeTruthy();
  });
  test('Prevent form POST if invalid', async () => {
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByText('Send Email'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('At least one recipient is required', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('A subject is required')).toBeInTheDocument();
  });
  test('Shows complete message on completed POST', async () => {
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));
    expect(screen.getByRole('checkbox', { name: 'Myself' })).toBeChecked();
    fireEvent.change(screen.getByRole('textbox', { name: 'Subject:' }), { target: { value: 'test subject' } });
    fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
    fireEvent.click(screen.getByText('Send Email'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('Submitting')).toBeInTheDocument();
    expect(await screen.findByText('Email Created')).toBeInTheDocument();
  });
  test('Shows Error on failed POST', async () => {
    postBulkEmail.mockImplementation(() => {
      throw Error('api-response-error');
    });
    render(renderBulkEmailForm());
    const subjectLine = screen.getByRole('textbox', { name: 'Subject:' });
    const recipient = screen.getByRole('checkbox', { name: 'Myself' });
    fireEvent.click(recipient);
    fireEvent.change(subjectLine, { target: { value: 'test subject' } });
    fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
    fireEvent.click(screen.getByText('Send Email'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('Error')).toBeInTheDocument();
  });
  test('Shows scheduling form when checkbox is checked and submit is changed', async () => {
    render(renderBulkEmailForm());
    const scheduleCheckbox = screen.getByText('Schedule this email for a future date');
    fireEvent.click(scheduleCheckbox);
    expect(screen.getByText('Time'));
    expect(screen.getByText('Date'));
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
    render(renderBulkEmailForm());
    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Subject:' }), { target: { value: 'test subject' } });
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
    expect(postBulkEmail).toHaveBeenCalledWith(expect.any(FormData), expect.stringContaining('test-course-id'));
  });
});
