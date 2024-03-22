import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* index.jsx Messages */
  ScheduleSectionScheduleBox: {
    id: 'schedule.section.form.scheduleBox',
    defaultMessage: 'Schedule this email for a future date',
    description: 'Checkbox to schedule sending the email at a later date',
  },
  ScheduleSectionSubmitButtonDefault: {
    id: 'schedule.section.submit.button.default',
    defaultMessage: 'Send email',
  },
  ScheduleSectionSubmitFormError: {
    id: 'schedule.section.submit.error',
    defaultMessage: 'An error occurred while attempting to send the email.',
    description: 'An Error message located under the submit button for the email form. Visible only on a failure.',
  },
  ScheduleSectionSubmitFormSuccess: {
    id: 'schedule.section.form.success',
    defaultMessage: 'Email successfully created',
  },
  ScheduleSectionSubmitFormScheduledSuccess: {
    id: 'schedule.section.submit.scheduled.success',
    defaultMessage: 'Email successfully scheduled',
  },
  ScheduleSectionSubmitButtonSchedule: {
    id: 'schedule.section.submit.button.schedule',
    defaultMessage: 'Schedule Email',
  },
  ScheduleSectionSubmitButtonPending: {
    id: 'schedule.section.submit.button.pending',
    defaultMessage: 'Submitting',
  },
  ScheduleSectionSubmitButtonComplete: {
    id: 'schedule.section.submit.button.send.complete',
    defaultMessage: 'Email Created',
  },
  ScheduleSectionSubmitButtonError: {
    id: 'schedule.section.submit.button.error',
    defaultMessage: 'Error',
  },
  ScheduleSectionSubmitButtonCompleteSchedule: {
    id: 'schedule.section.submit.button.schedule.complete',
    defaultMessage: 'Scheduling Done',
  },
});

export default messages;
