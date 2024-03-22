import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { IntlProvider } from 'react-intl';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

import { BulkEmailProvider } from '../../bulk-email-context';
import cohortFactory from '../data/__factories__/bulkEmailFormCohort.factory';

import BulkEmailForm from '.';

// eslint-disable-next-line react/prop-types
jest.mock('../../text-editor/TextEditor', () => ({ value, onChange }) => (
  <textarea
    data-testid="textEditor"
    value={value}
    onChange={e => onChange(e.target.value)}
  />
));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({ getConfig: jest.fn() }));

getConfig.mockReturnValue({ LMS_BASE_URL: 'http://localhost', SCHEDULE_EMAIL_SECTION: true });

describe('BulkEmailForm', () => {
  const { cohorts } = cohortFactory.build();

  // eslint-disable-next-line react/prop-types
  const IntlProviderWrapper = ({ children }) => (
    <IntlProvider locale="en" messages={{}}>
      {children}
    </IntlProvider>
  );

  const RenderBulkEmailForm = () => (
    <IntlProviderWrapper>
      <BulkEmailProvider>
        <BulkEmailForm courseId="test" cohorts={cohorts} />
      </BulkEmailProvider>
    </IntlProviderWrapper>

  );

  test('renders the form and shows initial loading states', async () => {
    render(<RenderBulkEmailForm />);
    await waitFor(() => {
      expect(screen.getByText('Send to')).toBeTruthy();
      expect(screen.getByText('Subject')).toBeTruthy();
      expect(screen.getByText('Body')).toBeTruthy();
      expect(screen.getByText('Send email')).toBeTruthy();
    });
  });
  test('it shows a warning when clicking submit', async () => {
    render(<RenderBulkEmailForm />);
    await waitFor(async () => {
      fireEvent.click(screen.getByText('Send email'));
      const warning = await screen.findByText('CAUTION!', { exact: false });
      expect(warning).toBeTruthy();
    });
  });

  test('Prevent form POST if invalid', async () => {
    render(<RenderBulkEmailForm />);
    await waitFor(async () => {
      fireEvent.click(screen.getByText('Send email'));
      expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(await screen.findByText('At least one recipient is required', { exact: false })).toBeInTheDocument();
      expect(await screen.findByText('A subject is required')).toBeInTheDocument();
    });
  });

  test('Shows Error on failed POST', async () => {
    const instance = axios.create({
      baseURL: getConfig().LMS_BASE_URL,
      timeout: 100,
      headers: { 'X-Custom-Header': 'foobar' },
    });

    getAuthenticatedHttpClient.mockReturnValue(instance);
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock.onPost(`${getConfig().LMS_BASE_URL}/courses/test/instructor/api/send_email`).reply(100);

    render(<RenderBulkEmailForm />);

    await waitFor(async () => {
      expect(screen.getByText('Send email')).toBeTruthy();
      const subjectLine = screen.getByRole('textbox', { name: 'Subject' });
      const recipient = screen.getByRole('checkbox', { name: 'Myself' });
      fireEvent.click(recipient);
      fireEvent.change(subjectLine, { target: { value: 'test subject' } });
      fireEvent.change(screen.getByTestId('textEditor'), { target: { value: 'test body' } });
      fireEvent.click(screen.getByTestId('send-email-btn'));
      expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
      fireEvent.click(await screen.findByRole('button', { name: /continue/i }));
      expect(await screen.findByText('An error occurred while attempting to send the email.')).toBeInTheDocument();
    });
  });

  test('Checking "All Learners" disables each learner group', async () => {
    render(<RenderBulkEmailForm />);
    await waitFor(async () => {
      fireEvent.click(screen.getByRole('checkbox', { name: 'All Learners' }));
      const verifiedLearners = screen.getByRole('checkbox', { name: 'Learners in the verified certificate track' });
      const auditLearners = screen.getByRole('checkbox', { name: 'Learners in the audit track' });
      cohorts.forEach(cohort => expect(screen.getByRole('checkbox', { name: `Cohort: ${cohort}` })).toBeDisabled());
      expect(verifiedLearners).toBeDisabled();
      expect(auditLearners).toBeDisabled();
    });
  });

  test('Shows scheduling form when checkbox is checked and submit is changed', async () => {
    render(<RenderBulkEmailForm />);
    await waitFor(async () => {
      const scheduleCheckbox = screen.getByText('Schedule this email for a future date');
      fireEvent.click(scheduleCheckbox);
      expect(screen.getByText('Send time'));
      expect(screen.getByText('Send date'));
      expect(screen.getByText('Schedule Email'));
    });
  });

  test('Prevents sending email when scheduling inputs are empty', async () => {
    render(<RenderBulkEmailForm />);
    await waitFor(async () => {
      const scheduleCheckbox = screen.getByText('Schedule this email for a future date');
      fireEvent.click(scheduleCheckbox);
      const submitButton = await screen.findByText('Schedule Email');
      fireEvent.click(submitButton);
      const continueButton = await screen.findByRole('button', { name: /continue/i });
      fireEvent.click(continueButton);
      expect(screen.getByText('Date and time cannot be blank, and must be a date in the future'));
    });
  });
});
