import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  /* BulkEmailContentHistory.jsx Messages */
  errorFetchingEmailHistoryData: {
    id: 'bulk.email.content.history.table.alert.errorFetchingData',
    defaultMessage: 'An error occurred retrieving email history data for this course. Please try again later.',
    description: 'Error alert shown when the sent email history could not be retrieved',
  },
  noEmailData: {
    id: 'bulk.email.content.history.table.alert.noEmailData',
    defaultMessage: 'There is no email history for this course.',
    description: 'Alert shown when the course has no sent email history',
  },
  buttonViewMessage: {
    id: 'bulk.email.content.history.table.button.viewMessage',
    defaultMessage: 'View Message',
    description: 'Button in the email history table that opens a modal with the sent email content',
  },
  modalMessageSubject: {
    id: 'bulk.email.content.history.table.modal.subject',
    defaultMessage: 'Subject:',
    description: 'Label for the email subject in the view email modal',
  },
  modalMessageSentBy: {
    id: 'bulk.email.content.history.table.modal.sentBy',
    defaultMessage: 'Sent by:',
    description: 'Label for the email author in the view email modal',
  },
  modalMessageTimeSent: {
    id: 'bulk.email.content.history.table.modal.timeSent',
    defaultMessage: 'Time sent:',
    description: 'Label for the time the email was sent in the view email modal',
  },
  modalMessageSentTo: {
    id: 'bulk.email.content.history.table.modal.sentTo',
    defaultMessage: 'Sent to:',
    description: 'Label for the email recipients in the view email modal',
  },
  modalMessageBody: {
    id: 'bulk.email.content.history.table.modal.messageBody',
    defaultMessage: 'Message:',
    description: 'Label for the email body in the view email modal',
  },
  modalCloseButton: {
    id: 'bulk.email.tool.close.modalDialog.button',
    defaultMessage: 'Close',
    description: 'Button that closes the view email modal',
  },
  emailHistoryTableViewMessageInstructions: {
    id: 'bulk.email.content.history.table.viewMessageInstructions',
    defaultMessage: 'To read a sent email message, click the `View Message` button within the table.',
    description: 'Instructions explaining how to read a sent email from the email history table',
  },
  emailHistoryTableColumnHeaderSubject: {
    id: 'bulk.email.content.history.table.column.header.subject',
    defaultMessage: 'Subject',
    description: 'Column header for the email subject in the sent email history table',
  },
  emailHistoryTableColumnHeaderAuthor: {
    id: 'bulk.email.content.history.table.column.header.author',
    defaultMessage: 'Sent By',
    description: 'Column header for the email author in the sent email history table',
  },
  emailHistoryTableColumnHeaderRecipients: {
    id: 'bulk.email.content.history.table.column.header.recipients',
    defaultMessage: 'Sent To',
    description: 'Column header for the email recipients in the sent email history table',
  },
  emailHistoryTableColumnHeaderTimeSent: {
    id: 'bulk.email.content.history.table.column.header.timeSent',
    defaultMessage: 'Time Sent',
    description: 'Column header for the time the email was sent in the sent email history table',
  },
  emailHistoryTableColumnHeaderNumberSent: {
    id: 'bulk.email.content.history.table.column.header.numberSent',
    defaultMessage: 'Number Sent',
    description: 'Column header for the number of emails sent in the sent email history table',
  },
  emailHistoryTableSectionButtonHeader: {
    id: 'bulk.email.content.history.table.button.header',
    defaultMessage: 'View the content of previously sent emails',
    description: 'Text above the button that shows the sent email history',
  },
  emailHistoryTableSectionButton: {
    id: 'bulk.email.content.history.table.button',
    defaultMessage: 'Show Sent Email History',
    description: 'Button that loads and shows the sent email history table',
  },
  /* BulkEmailTaskManager.jsx messages */
  pendingTasksHeader: {
    id: 'bulk.email.pending.tasks.header',
    defaultMessage: 'Pending tasks has moved',
    description: 'Heading of the pending tasks section',
  },
  emailTaskHistoryHeader: {
    id: 'bulk.email.email.task.history.header',
    defaultMessage: 'Email Task History',
    description: 'Heading of the email task history section',
  },
  /* BulkEmailPendingTasks.jsx messages */
  pendingTaskSectionInfo: {
    id: 'bulk.email.pending.tasks.section.info',
    defaultMessage: 'Email actions run in the background. The status for any active tasks - including email tasks - appears in the table below.',
    description: 'Description of the pending tasks table',
  },
  errorFetchingPendingTaskData: {
    id: 'bulk.email.pending.tasks.table.alert.errorFetchingData',
    defaultMessage: 'Error fetching running task data. This request will be retried automatically.',
    description: 'Error alert shown when running task data could not be retrieved',
  },
  noPendingTaskData: {
    id: 'bulk.email.pending.tasks.table.alert.noTaskData',
    defaultMessage: 'No tasks currently running.',
    description: 'Alert shown when there are no running tasks',
  },
  /* BulkEmailTaskHistory.jsx messages */
  emailTaskHistoryTableSectionButtonHeader: {
    id: 'bulk.email.task.history.table.button.header',
    defaultMessage: 'View the status for all email tasks created for this course',
    description: 'Text above the button that shows the email task history',
  },
  emailTaskHistoryTableSectionButton: {
    id: 'bulk.email.task.history.table.button',
    defaultMessage: 'Show Email Task History',
    description: 'Button that loads and shows the email task history table',
  },
  errorFetchingTaskHistoryData: {
    id: 'bulk.email.task.history.table.alert.errorFetchingData',
    defaultMessage: 'Error fetching email task history data for this course. Please try again later.',
    description: 'Error alert shown when the email task history could not be retrieved',
  },
  noTaskHistoryData: {
    id: 'bulk.email.task.history.table.alert.noTaskData',
    defaultMessage: 'There is no email task history for this course.',
    description: 'Alert shown when the course has no email task history',
  },
  /* Common Messages */
  taskHistoryTableColumnHeaderTaskType: {
    id: 'bulk.email.task.history.table.column.header.taskType',
    defaultMessage: 'Task Type',
    description: 'Column header for the task type in the task tables',
  },
  taskHistoryTableColumnHeaderTaskInputs: {
    id: 'bulk.email.task.history.table.column.header.taskInputs',
    defaultMessage: 'Task Inputs',
    description: 'Column header for the task inputs in the task tables',
  },
  taskHistoryTableColumnHeaderTaskId: {
    id: 'bulk.email.task.history.table.column.header.taskId',
    defaultMessage: 'Task Id',
    description: 'Column header for the task ID in the task tables',
  },
  taskHistoryTableColumnHeaderTaskRequester: {
    id: 'bulk.email.task.history.table.column.header.taskRequester',
    defaultMessage: 'Requester',
    description: 'Column header for the user who requested the task in the task tables',
  },
  taskHistoryTableColumnHeaderTaskSubmittedDate: {
    id: 'bulk.email.task.history.table.column.header.taskSubmittedDate',
    defaultMessage: 'Submitted',
    description: 'Column header for the task submission date in the task tables',
  },
  taskHistoryTableColumnHeaderTaskDuration: {
    id: 'bulk.email.task.history.table.column.header.taskDuration',
    defaultMessage: 'Duration (seconds)',
    description: 'Column header for the task duration in seconds in the task tables',
  },
  taskHistoryTableColumnHeaderTaskState: {
    id: 'bulk.email.task.history.table.column.header.taskState',
    defaultMessage: 'State',
    description: 'Column header for the task state in the task tables',
  },
  taskHistoryTableColumnHeaderTaskStatus: {
    id: 'bulk.email.task.history.table.column.header.taskStatus',
    defaultMessage: 'Status',
    description: 'Column header for the task status in the task tables',
  },
  taskHistoryTableColumnHeaderTaskProgress: {
    id: 'bulk.email.task.history.table.column.header.taskProgress',
    defaultMessage: 'Task Progress',
    description: 'Column header for the task progress in the task tables',
  },
  scheduledEmailsTableHeader: {
    id: 'bulk.email.scheduled.emails.table.header',
    defaultMessage: 'Scheduled emails',
    description: 'Heading of the scheduled emails section',
  },
});

export default messages;
