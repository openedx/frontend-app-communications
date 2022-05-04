import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* BulkEmailForm.jsx Messages */
  bulkEmailSubmitButtonDefault: {
    id: 'bulk.email.submit.button.default',
    defaultMessage: 'Send Email',
  },
  bulkEmailSubmitButtonSchedule: {
    id: 'bulk.email.submit.button.schedule',
    defaultMessage: 'Schedule Email',
  },
  bulkEmailSubmitButtonPending: {
    id: 'bulk.email.submit.button.pending',
    defaultMessage: 'Submitting',
  },
  bulkEmailSubmitButtonComplete: {
    id: 'bulk.email.submit.button.send.complete',
    defaultMessage: 'Email Created',
  },
  bulkEmailSubmitButtonError: {
    id: 'bulk.email.submit.button.error',
    defaultMessage: 'Error',
  },
  bulkEmailSubmitButtonCompleteSchedule: {
    id: 'bulk.email.submit.button.schedule.complete',
    defaultMessage: 'Scheduling Done',
  },
  bulkEmailTaskAlertRecipients: {
    id: 'bulk.email.task.alert.recipients',
    defaultMessage: 'You are sending an email message with the subject {subject} to the following recipients:',
    description: 'A warning shown to the user after submitting the email, to confirm the email recipients.',
  },
  bulkEmailToolLabel: {
    id: 'bulk.email.tool.label',
    defaultMessage: 'Email',
    description: 'Tool label. Describes the function of the tool (to send email).',
  },
  bulkEmailSubjectLabel: {
    id: 'bulk.email.subject.label',
    defaultMessage: 'Subject:',
    description: 'Email subject line input label. Meant to have colon or equivilant punctuation.',
  },
  bulkEmailFormSubjectError: {
    id: 'bulk.email.form.subject.error',
    defaultMessage: 'A subject is required',
    description: 'An Error message located under the subject line. Visible only on failure.',
  },
  bulkEmailBodyLabel: {
    id: 'bulk.email.body.label',
    defaultMessage: 'Body:',
    description: 'Email Body label. Meant to have colon or equivilant punctuation.',
  },
  bulkEmailFormBodyError: {
    id: 'bulk.email.form.body.error',
    defaultMessage: 'The message cannot be blank',
    description: 'An error message located under the body editor. Visible only on failure.',
  },
  bulkEmailInstructionsProofreading: {
    id: 'bulk.email.instructions.proofreading',
    defaultMessage: 'We recommend sending learners no more than one email message per week. Before you send your email, review the text carefully and send it to yourself first, so that you can preview the formatting and make sure embedded images and links work correctly.',
    description: 'A set of instructions to give users a heads up about the formatting of the email they are about to send',
  },
  bulkEmailInstructionsCaution: { id: 'bulk.email.instructions.caution', defaultMessage: 'Caution!' },

  bulkEmailInstructionsCautionMessage: {
    id: 'bulk.email.instructions.caution.message',
    defaultMessage:
      ' When you select Send Email, your email message is added to the queue for sending, and cannot be cancelled.',
    description: 'A warning about how emails are sent out to users',
  },
  bulkEmailFormScheduleBox: {
    id: 'bulk.email.form.scheduleBox',
    defaultMessage: 'Schedule this email for a future date',
    description: 'Checkbox to schedule sending the email at a later date',
  },
  bulkEmailSendEmailButton: {
    id: 'bulk.email.send.email.button',
    defaultMessage: 'Send Email',
    description: 'Schedule/Send email button',
  },
  bulkEmailFormError: {
    id: 'bulk.email.form.error',
    defaultMessage: 'An error occured while attempting to send the email.',
    description: 'An Error message located under the submit button for the email form. Visible only on a failure.',
  },
});

export default messages;
