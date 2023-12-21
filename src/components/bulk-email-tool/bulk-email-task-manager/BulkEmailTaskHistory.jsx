import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { Icon, Collapsible } from '@edx/paragon';
import { SpinnerSimple } from '@edx/paragon/icons';
import { getEmailTaskHistory } from './data/api';
import messages from './messages';

import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';

import './bulkEmailTaskHistory.scss';

function BulkEmailTaskHistory({ intl }) {
  const { courseId } = useParams();

  const [emailTaskHistoryData, setEmailTaskHistoryData] = useState([]);
  const [showHistoricalTaskContentTable, setShowHistoricalTaskContentTable] = useState(false);
  const [errorRetrievingData, setErrorRetrievingData] = useState(false);

  /**
   * Async function that makes a REST API call to retrieve historical bulk email (Instructor) task data for display
   * within this component.
   */
  async function fetchEmailTaskHistoryData() {
    setErrorRetrievingData(false);
    setShowHistoricalTaskContentTable(false);

    let data = null;
    try {
      data = await getEmailTaskHistory(courseId);
    } catch (error) {
      setErrorRetrievingData(true);
    }

    if (data) {
      const { tasks } = data;
      setEmailTaskHistoryData(tasks);
    }

    setShowHistoricalTaskContentTable(true);
  }

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
    <div className="pb-4.5">
      <div>
        <p>
          {intl.formatMessage(messages.emailTaskHistoryTableSectionButtonHeader)}
        </p>
        <Collapsible
          styling="card"
          title={intl.formatMessage(messages.emailTaskHistoryTableSectionButton)}
          // eslint-disable-next-line react/jsx-no-bind
          onOpen={fetchEmailTaskHistoryData}
        >
          {showHistoricalTaskContentTable ? (
            <BulkEmailTaskManagerTable
              errorRetrievingData={errorRetrievingData}
              tableData={emailTaskHistoryData}
              alertWarningMessage={intl.formatMessage(messages.noTaskHistoryData)}
              alertErrorMessage={intl.formatMessage(messages.errorFetchingTaskHistoryData)}
              columns={tableColumns}
            />
          ) : (
            <Icon src={SpinnerSimple} className="icon-spin mx-auto" />
          )}
        </Collapsible>
      </div>
    </div>
  );
}

BulkEmailTaskHistory.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailTaskHistory);
