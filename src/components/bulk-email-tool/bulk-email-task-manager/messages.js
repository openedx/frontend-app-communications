import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* BulkEmailContentHistory.jsx Messages */
  errorFetchingData: {
    id: 'bulk.email.content.history.table.alert.errorFetchingData',
    defaultMessage: 'An error occurred retrieving email history data for this course. Please try again later.',
  },
  noEmailData: {
    id: 'bulk.email.content.history.table.alert.noEmailData',
    defaultMessage: 'There is no email history for this course',
  },
  buttonViewMessage: {
    id: 'bulk.email.content.history.table.button.viewMessage',
    defaultMessage: 'View Message',
  },
  modalMessageSubject: {
    id: 'bulk.email.content.history.table.modal.subject',
    defaultMessage: 'Subject:',
  },
  modalMessageSentBy: {
    id: 'bulk.email.content.history.table.modal.sentBy',
    defaultMessage: 'Sent by:',
  },
  modalMessageTimeSent: {
    id: 'bulk.email.content.history.table.modal.timeSent',
    defaultMessage: 'Time sent:',
  },
  modalMessageSentTo: {
    id: 'bulk.email.content.history.table.modal.sentTo',
    defaultMessage: 'Sent to:',
  },
  modalMessageBody: {
    id: 'bulk.email.content.history.table.modal.messageBody',
    defaultMessage: 'Message:',
  },
  emailHistoryTableViewMessageInstructions: {
    id: 'bulk.email.content.history.table.viewMessageInstructions',
    defaultMessage: 'To read a sent email message, click the `View Message` button within the table.',
  },
  emailHistoryTableColumnHeaderSubject: {
    id: 'bulk.email.content.history.table.column.header.subject',
    defaultMessage: 'Subject',
  },
  emailHistoryTableColumnHeaderAuthor: {
    id: 'bulk.email.content.history.table.column.header.author',
    defaultMessage: 'Sent By',
  },
  emailHistoryTableColumnHeaderRecipients: {
    id: 'bulk.email.content.history.table.column.header.recipients',
    defaultMessage: 'Sent To',
  },
  emailHistoryTableColumnHeaderTimeSent: {
    id: 'bulk.email.content.history.table.column.header.timeSent',
    defaultMessage: 'Time Sent',
  },
  emailHistoryTableColumnHeaderNumberSent: {
    id: 'bulk.email.content.history.table.column.header.numberSent',
    defaultMessage: 'Subject',
  },
  emailHistoryTableColumnHeaderViewMessage: {
    id: 'bulk.email.content.history.table.column.header.viewMessage',
    defaultMessage: 'View Message',
  },
  emailHistoryTableSectionButtonHeader: {
    id: 'bulk.email.content.history.table.button.header',
    defaultMessage: 'To see the content of previously sent emails, click this button:',
  },
  emailHistoryTableSectionButton: {
    id: 'bulk.email.content.history.table.button',
    defaultMessage: 'Show Sent Email History',
  },
  /* BulkEmailTaskManager.jsx messages */
  /* BulkEmailPendingTasks.jsx messages */
  /* BulkEmailTaskHistory.jsx messages */
});

export default messages;
