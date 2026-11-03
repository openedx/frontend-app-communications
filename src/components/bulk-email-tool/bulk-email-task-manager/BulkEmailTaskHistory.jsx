import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Icon, Collapsible } from '@openedx/paragon';
import { SpinnerSimple } from '@openedx/paragon/icons';
import { useEmailTaskHistory } from './data/apiHook';
import messages from './messages';

import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';

import './bulkEmailTaskHistory.scss';

function BulkEmailTaskHistory() {
  const intl = useIntl();
  const { courseId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useEmailTaskHistory(courseId, { enabled: isOpen });

  const transformDataForTable = useMemo(() => {
    const tableData = data?.tasks?.map((item) => ({
      ...item,
      created: new Date(item.created).toLocaleString(),
    }));
    return tableData || [];
  }, [data]);

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
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          {!isLoading ? (
            <BulkEmailTaskManagerTable
              errorRetrievingData={isError}
              tableData={transformDataForTable}
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

export default BulkEmailTaskHistory;
