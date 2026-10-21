import React from 'react';
import { useParams } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';
import { usePendingInstructorTasks } from './data/apiHook';
import messages from './messages';
import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';

function BulkEmailPendingTasks() {
  const intl = useIntl();
  const { courseId } = useParams();
  const { data, isError } = usePendingInstructorTasks(courseId);

  const tableColumns = [
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskType)}`,
      accessor: 'task_type',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskInputs)}`,
      accessor: 'task_input',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskId)}`,
      accessor: 'task_id',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskRequester)}`,
      accessor: 'requester',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskSubmittedDate)}`,
      accessor: 'created',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskDuration)}`,
      accessor: 'duration_sec',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskState)}`,
      accessor: 'task_state',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskStatus)}`,
      accessor: 'status',
    },
    {
      Header: `${intl.formatMessage(messages.taskHistoryTableColumnHeaderTaskProgress)}`,
      accessor: 'task_message',
    },
  ];

  return (
    <div className="pb-4">
      <BulkEmailTaskManagerTable
        errorRetrievingData={isError}
        tableData={data?.tasks}
        tableDescription={intl.formatMessage(messages.pendingTaskSectionInfo)}
        alertWarningMessage={intl.formatMessage(messages.noPendingTaskData)}
        alertErrorMessage={intl.formatMessage(messages.errorFetchingPendingTaskData)}
        columns={tableColumns}
      />
    </div>
  );
}

export default BulkEmailPendingTasks;
