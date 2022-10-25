import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getInstructorTasks } from './data/api';
import messages from './messages';
import useInterval from '../../../utils/useInterval';
import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';

const BulkEmailPendingTasks = ({ intl }) => {
  const { courseId } = useParams();

  const [instructorTaskData, setInstructorTaskData] = useState();
  const [errorRetrievingData, setErrorRetrievingData] = useState(false);

  /**
   * We use a custom hook (`useInterval`) here to setup a timer that will refresh the pending instructor task data
   * displayed in the table of this component.
   */
  useInterval(() => {
    async function fetchPendingInstructorTasksData() {
      setErrorRetrievingData(false);

      let data = null;
      try {
        data = await getInstructorTasks(courseId);
        if (data) {
          const { tasks } = data;
          setInstructorTaskData(tasks);
        }
      } catch (error) {
        setErrorRetrievingData(true);
      }
    }

    fetchPendingInstructorTasksData();
  }, 30000);

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
        errorRetrievingData={errorRetrievingData}
        tableData={instructorTaskData}
        tableDescription={intl.formatMessage(messages.pendingTaskSectionInfo)}
        alertWarningMessage={intl.formatMessage(messages.noPendingTaskData)}
        alertErrorMessage={intl.formatMessage(messages.errorFetchingPendingTaskData)}
        columns={tableColumns}
      />
    </div>
  );
};

BulkEmailPendingTasks.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailPendingTasks);
