import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  /* BulkEmailScheduledEmailsTable.jsx Messages */
  bulkEmailScheduledEmailsTableErrorHeader: {
    id: 'bulk.email.scheduled.emails.table.error.header',
    defaultMessage: 'Error',
    description: 'Heading of the alert shown when scheduled emails could not be retrieved',
  },

  bulkEmailScheduledEmailsTableError: {
    id: 'bulk.email.scheduled.emails.table.error',
    defaultMessage: 'An error occured while retrieving scheduled email information. Please try again later.',
    description: 'An error message that shows if the app is unable to display scheduled emails in the table',
  },
  bulkEmailScheduledEmailsTableDeleteError: {
    id: 'bulk.email.scheduled.emails.table.delete.error',
    defaultMessage: 'An error occurred while deleting the scheduled email. Please try again.',
    description: 'An error message shown when a scheduled email cannot be deleted',
  },
  bulkEmailScheduledEmailsTableSendDate: {
    id: 'bulk.email.scheduled.emails.table.sendDate',
    defaultMessage: 'Send date',
    description: 'Column header for the date a scheduled email will be sent',
  },
  bulkEmailScheduledEmailsTableSendTo: {
    id: 'bulk.email.scheduled.emails.table.sendTo',
    defaultMessage: 'Send to',
    description: 'Column header for the recipients of a scheduled email',
  },
  bulkEmailScheduledEmailsTableSubject: {
    id: 'bulk.email.scheduled.emails.table.subject',
    defaultMessage: 'Subject',
    description: 'Column header for the subject of a scheduled email',
  },
  bulkEmailScheduledEmailsTableAuthor: {
    id: 'bulk.email.scheduled.emails.table.Author',
    defaultMessage: 'Author',
    description: 'Column header for the author of a scheduled email',
  },
  bulkEmailScheduledEmailsTableConfirmDelete: {
    id: 'bulk.email.scheduled.emails.table.confirm.delete',
    defaultMessage: 'You are deleting an email scheduled to be sent on {date}. The email will not be sent and the scheduling canceled. Are you sure?',
    description: 'Confirmation prompt shown before deleting a scheduled email',
  },
});

export default messages;
