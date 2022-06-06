import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* BulkEmailScheduledEmailsTable.jsx Messages */
  bulkEmailScheduledEmailsTableErrorHeader: {
    id: 'bulk.email.scheduled.emails.table.error.header',
    defaultMessage: 'Error',
  },

  bulkEmailScheduledEmailsTableError: {
    id: 'bulk.email.scheduled.emails.table.error',
    defaultMessage: 'An error occured while retrieving scheduled email information. Please try again later.',
    description: 'An error message that shows if the app is unable to display scheduled emails in the table',
  },
  bulkEmailScheduledEmailsTableSendDate: {
    id: 'bulk.email.scheduled.emails.table.sendDate',
    defaultMessage: 'Send date',
  },
  bulkEmailScheduledEmailsTableSendTo: {
    id: 'bulk.email.scheduled.emails.table.sendTo',
    defaultMessage: 'Send to',
  },
  bulkEmailScheduledEmailsTableSubject: {
    id: 'bulk.email.scheduled.emails.table.subject',
    defaultMessage: 'Subject',
  },
  bulkEmailScheduledEmailsTableAuthor: {
    id: 'bulk.email.scheduled.emails.table.Author',
    defaultMessage: 'Author',
  },
});

export default messages;
