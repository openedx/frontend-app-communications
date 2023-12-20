import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* AlertTypes.jsx Messages */
  TaskAlertModalAlertTypesRecipients: {
    id: 'task.alert.types.recipients',
    defaultMessage: 'You are sending an email message with the subject {subject} to the following recipients:',
    description: 'A warning shown to the user after submitting the email, to confirm the email recipients.',
  },
  TaskAlertModalAlertTypesInstructionCaption: {
    id: 'task.alert.types.caution',
    defaultMessage: 'Caution!',
    description: 'Checkbox to schedule sending the email at a later date',
  },
  TaskAlertModalAlertTypesInstructionCaptionMessage: {
    id: 'task.alert.types.caution.message',
    defaultMessage:
    ' When you select Send Email, you are creating a new email message that is added to the queue for sending, and cannot be cancelled.',
    description: 'A warning about how emails are sent out to users',
  },
  TaskAlertModalAlertTypesEditingDate: {
    id: 'task.alert.types.editing',
    defaultMessage: 'You are editing a scheduled email to be sent on: {dateTime}',
    description: 'This alert pops up before submitting when editing an email that has already been scheduled',
  },
  TaskAlertModalAlertTypesEditingSubject: {
    id: 'task.alert.types.subject',
    defaultMessage: 'with the subject: {subject}',
  },
  TaskAlertModalAlertTypesEditingTo: {
    id: 'task.alert.types.to',
    defaultMessage: 'to recipients:',
  },
  TaskAlertModalAlertTypesEditingWarning: {
    id: 'task.alert.types.warning',
    defaultMessage: 'This will not create a new scheduled email task and instead overwrite the one currently selected. Do you want to overwrite this scheduled email?',
    description: 'This alert pops up before submitting when editing an email that has already been scheduled',
  },
});

export default messages;
