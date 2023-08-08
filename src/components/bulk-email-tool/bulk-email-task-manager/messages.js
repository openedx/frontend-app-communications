import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* BulkEmailContentHistory.jsx Messages */
  errorFetchingEmailHistoryData: {
    id: 'bulk.email.content.history.table.alert.errorFetchingData',
    defaultMessage: 'An error occurred retrieving email history data for this course. Please try again later.',
  },
  noEmailData: {
    id: 'bulk.email.content.history.table.alert.noEmailData',
    defaultMessage: 'There is no email history for this course.',
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
  modalCloseButton: {
    id: 'bulk.email.tool.close.modalDialog.button',
    defaultMessage: 'Close',
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
    defaultMessage: 'Number Sent',
  },
  emailHistoryTableSectionButtonHeader: {
    id: 'bulk.email.content.history.table.button.header',
    defaultMessage: 'View the content of previously sent emails',
  },
  emailHistoryTableSectionButton: {
    id: 'bulk.email.content.history.table.button',
    defaultMessage: 'Show Sent Email History',
  },
  /* BulkEmailTaskManager.jsx messages */
  pendingTasksHeader: {
    id: 'bulk.email.pending.tasks.header',
    defaultMessage: 'Pending tasks has moved',
  },
  emailTaskHistoryHeader: {
    id: 'bulk.email.email.task.history.header',
    defaultMessage: 'Email Task History',
  },
  /* BulkEmailPendingTasks.jsx messages */
  pendingTaskSectionInfo: {
    id: 'bulk.email.pending.tasks.section.info',
    defaultMessage: 'Email actions run in the background. The status for any active tasks - including email tasks - appears in the table below.',
  },
  errorFetchingPendingTaskData: {
    id: 'bulk.email.pending.tasks.table.alert.errorFetchingData',
    defaultMessage: 'Error fetching running task data. This request will be retried automatically.',
  },
  noPendingTaskData: {
    id: 'bulk.email.pending.tasks.table.alert.noTaskData',
    defaultMessage: 'No tasks currently running.',
  },
  /* BulkEmailTaskHistory.jsx messages */
  emailTaskHistoryTableSectionButtonHeader: {
    id: 'bulk.email.task.history.table.button.header',
    defaultMessage: 'View the status for all email tasks created for this course',
  },
  emailTaskHistoryTableSectionButton: {
    id: 'bulk.email.task.history.table.button',
    defaultMessage: 'Show Email Task History',
  },
  errorFetchingTaskHistoryData: {
    id: 'bulk.email.task.history.table.alert.errorFetchingData',
    defaultMessage: 'Error fetching email task history data for this course. Please try again later.',
  },
  noTaskHistoryData: {
    id: 'bulk.email.task.history.table.alert.noTaskData',
    defaultMessage: 'There is no email task history for this course.',
  },
  /* Common Messages */
  taskHistoryTableColumnHeaderTaskType: {
    id: 'bulk.email.task.history.table.column.header.taskType',
    defaultMessage: 'Task Type',
  },
  taskHistoryTableColumnHeaderTaskInputs: {
    id: 'bulk.email.task.history.table.column.header.taskInputs',
    defaultMessage: 'Task Inputs',
  },
  taskHistoryTableColumnHeaderTaskId: {
    id: 'bulk.email.task.history.table.column.header.taskId',
    defaultMessage: 'Task Id',
  },
  taskHistoryTableColumnHeaderTaskRequester: {
    id: 'bulk.email.task.history.table.column.header.taskRequester',
    defaultMessage: 'Requester',
  },
  taskHistoryTableColumnHeaderTaskSubmittedDate: {
    id: 'bulk.email.task.history.table.column.header.taskSubmittedDate',
    defaultMessage: 'Submitted',
  },
  taskHistoryTableColumnHeaderTaskDuration: {
    id: 'bulk.email.task.history.table.column.header.taskDuration',
    defaultMessage: 'Duration (seconds)',
  },
  taskHistoryTableColumnHeaderTaskState: {
    id: 'bulk.email.task.history.table.column.header.taskState',
    defaultMessage: 'State',
  },
  taskHistoryTableColumnHeaderTaskStatus: {
    id: 'bulk.email.task.history.table.column.header.taskStatus',
    defaultMessage: 'Status',
  },
  taskHistoryTableColumnHeaderTaskProgress: {
    id: 'bulk.email.task.history.table.column.header.taskProgress',
    defaultMessage: 'Task Progress',
  },
  scheduledEmailsTableHeader: {
    id: 'bulk.email.scheduled.emails.table.header',
    defaultMessage: 'Scheduled emails',
  },
});

export default messages;
