/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, cleanup, act, fireEvent,
} from '../../../../setupTest';
import BulkEmailForm from '..';
import { postBulkEmail } from '../api';

jest.mock('../../text-editor/TextEditor');
jest.mock('../api', () => ({
  __esModule: true,
  postBulkEmail: jest.fn(() => ({ status: 200 })),
}));

describe('bulk-email-form', () => {
  beforeEach(() => jest.resetModules());
  afterEach(cleanup);
  test('it renders', () => {
    render(<BulkEmailForm courseId="test-course-id" />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });
  test('it shows a warning when clicking submit', async () => {
    render(<BulkEmailForm courseId="test-course-id" />);
    fireEvent.click(screen.getByText('Submit'));
    const warning = await screen.findByText('CAUTION!', { exact: false });
    expect(warning).toBeTruthy();
  });
  test('Prevent form POST if invalid', async () => {
    render(<BulkEmailForm courseId="test-course-id" />);
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('At least one recipient is required', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('A subject is required')).toBeInTheDocument();
  });
  test('Shows complete message on completed POST', async () => {
    render(<BulkEmailForm courseId="test-course-id" />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Myself' }));
    expect(screen.getByRole('checkbox', { name: 'Myself' })).toBeChecked();
    fireEvent.change(screen.getByRole('textbox', { name: 'Subject:' }), { target: { value: 'test subject' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText('Submitting')).toBeInTheDocument();
    expect(await screen.findByText('A task to send the emails has been successfully created!')).toBeInTheDocument();
  });
  test('Shows Error on failed POST', async () => {
    postBulkEmail.mockImplementation(() => {
      throw Error('api-response-error');
    });
    await act(async () => {
      render(<BulkEmailForm courseId="test-course-id" />);
      const subjectLine = screen.getByRole('textbox', { name: 'Subject:' });
      const recipient = screen.getByRole('checkbox', { name: 'Myself' });
      fireEvent.click(recipient);
      fireEvent.change(subjectLine, { target: { value: 'test subject' } });
      fireEvent.click(screen.getByText('Submit'));
      expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(await screen.findByText('Error')).toBeInTheDocument();
    });
  });
});
