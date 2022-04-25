import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { Icon, StatefulButton } from '@edx/paragon';
import { SpinnerSimple } from '@edx/paragon/icons';
import { getEmailTaskHistory } from './data/api';
import messages from './messages';

import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';

function BulkEmailTaskHistory({ intl }) {
  const { courseId } = useParams();
  const BUTTON_STATE = {
    DEFAULT: 'default',
    PENDING: 'pending',
    COMPLETE: 'complete',
  };

  const [emailTaskHistoryData, setEmailTaskHistoryData] = useState();
  const [showHistoricalTaskContentTable, setShowHistoricalTaskContentTable] = useState(false);
  const [errorRetrievingData, setErrorRetrievingData] = useState(false);
  const [buttonState, setButtonState] = useState(BUTTON_STATE.DEFAULT);

  /**
   * Async function that makes a REST API call to retrieve historical bulk email (Instructor) task data for display
   * within this component.
   */
  async function fetchEmailTaskHistoryData() {
    setErrorRetrievingData(false);
    setShowHistoricalTaskContentTable(false);
    setButtonState(BUTTON_STATE.PENDING);

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
    setButtonState(BUTTON_STATE.COMPLETE);
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
    <div>
      <div>
        <p>
          {intl.formatMessage(messages.emailTaskHistoryTableSectionButtonHeader)}
        </p>
        <StatefulButton
          className="btn btn-outline-primary mb-2"
          variant="outline-primary"
          type="submit"
          onClick={async () => { await fetchEmailTaskHistoryData(); }}
          labels={{
            default: `${intl.formatMessage(messages.emailTaskHistoryTableSectionButton)}`,
            pending: `${intl.formatMessage(messages.emailTaskHistoryTableSectionButton)}`,
            complete: `${intl.formatMessage(messages.emailTaskHistoryTableSectionButton)}`,
          }}
          icons={{
            pending: <Icon src={SpinnerSimple} className="icon-spin" />,
          }}
          disabledStates={['error']}
          state={buttonState}
        >
          {intl.formatMessage(messages.emailHistoryTableSectionButton)}
        </StatefulButton>
        {showHistoricalTaskContentTable && (
          <BulkEmailTaskManagerTable
            errorRetrievingData={errorRetrievingData}
            tableData={emailTaskHistoryData}
            alertWarningMessage={intl.formatMessage(messages.noTaskHistoryData)}
            alertErrorMessage={intl.formatMessage(messages.errorFetchingTaskHistoryData)}
            columns={tableColumns}
          />
        )}
      </div>
    </div>
  );
}

BulkEmailTaskHistory.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailTaskHistory);
