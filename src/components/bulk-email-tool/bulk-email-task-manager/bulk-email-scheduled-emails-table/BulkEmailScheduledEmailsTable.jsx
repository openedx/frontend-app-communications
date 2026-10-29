/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */

import {
  useCallback, useMemo, useState,
} from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Alert, DataTable, Icon, IconButton, useToggle,
} from '@openedx/paragon';
import {
  Delete, Info, Visibility, Edit,
} from '@openedx/paragon/icons';
import { useParams } from 'react-router-dom';
import { useBulkEmailEditor } from '../../bulk-email-context/BulkEmailProvider';
import { useDeleteScheduledEmail, useScheduledEmails } from './data/apiHook';
import messages from './messages';
import ViewEmailModal from '../ViewEmailModal';
import TaskAlertModal from '../../task-alert-modal/TaskAlertModal';
import { formatDate, formatTime } from '../../../../utils/formatDateAndTime';
import { getDisplayTextFromRecipient } from '../../utils';

function flattenScheduledEmailsArray(intl, emails) {
  return emails.map((email) => ({
    schedulingId: email.id,
    emailId: email.courseEmail.id,
    task: email.task,
    taskDue: new Date(email.taskDue).toLocaleString(),
    taskDueUTC: email.taskDue,
    ...email.courseEmail,
    targets: email.courseEmail.targets.join(', '),
    targetsText: email.courseEmail.targets.map((recipient) => getDisplayTextFromRecipient(intl, recipient)).join(', '),
  }));
}

function BulkEmailScheduledEmailsTable() {
  const intl = useIntl();
  const { courseId } = useParams();
  const { copyToEditor } = useBulkEmailEditor();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data, isPending, isPlaceholderData, isError, refetch,
  } = useScheduledEmails(courseId, currentPage);
  const {
    mutate: deleteScheduledEmail, isPending: isDeleting, isError: isDeleteError,
  } = useDeleteScheduledEmail(courseId);
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    messageContent: {},
  });
  const [isConfirmModalOpen, openConfirmModal, closeConfirmModal] = useToggle();
  const [currentTask, setCurrentTask] = useState({});

  const tableData = useMemo(
    () => flattenScheduledEmailsArray(intl, data?.results ?? []),
    [intl, data],
  );

  const fetchTableData = useCallback(({ pageIndex }) => setCurrentPage(pageIndex + 1), []);

  const handleViewEmail = (row) => {
    setViewModal({
      isOpen: true,
      messageContent: {
        subject: row.original.subject,
        requester: row.original.sender,
        created: row.original.taskDue,
        email: {
          html_message: row.original.htmlMessage,
        },
        sent_to: row.original.targetsText,
      },
    });
  };
  if (isError || isDeleteError) {
    return (
      <div className="pb-4">
        <Alert variant="danger" icon={Info}>
          <Alert.Heading>{intl.formatMessage(messages.bulkEmailScheduledEmailsTableErrorHeader)}</Alert.Heading>
          <p>{intl.formatMessage(messages.bulkEmailScheduledEmailsTableError)}</p>
        </Alert>
      </div>
    );
  }

  const handleDeleteEmail = () => {
    const {
      row, pageIndex, page, previousPage,
    } = currentTask;
    deleteScheduledEmail(row.original.schedulingId, {
      onSuccess: () => {
        if (page.length === 1 && pageIndex !== 0) {
          previousPage();
        } else {
          refetch();
        }
      },
    });
  };

  const handleEditEmail = (row) => {
    const {
      original: {
        htmlMessage: emailBody, subject: emailSubject, taskDueUTC, targets, schedulingId, emailId,
      },
    } = row;
    const dateTime = new Date(taskDueUTC);
    const emailRecipients = targets.replaceAll('-', ':').split(', ');
    const scheduleDate = formatDate(dateTime);
    const scheduleTime = formatTime(dateTime);
    copyToEditor({
      emailId,
      emailBody,
      emailSubject,
      emailRecipients,
      scheduleDate,
      scheduleTime,
      schedulingId,
      editMode: true,
    });
  };
  return (
    <>
      <TaskAlertModal
        isOpen={isConfirmModalOpen}
        close={(event) => {
          closeConfirmModal();
          if (event.target.name === 'continue') {
            handleDeleteEmail();
          }
        }}
        alertMessage={intl.formatMessage(
          messages.bulkEmailScheduledEmailsTableConfirmDelete,
          { date: currentTask?.row?.original?.taskDue ?? '' },
        )}
      />
      {viewModal.isOpen && (
        <ViewEmailModal
          isOpen={viewModal.isOpen}
          setModalOpen={(open) => setViewModal({ isOpen: open })}
          messageContent={viewModal.messageContent}
        />
      )}
      <div className="pb-4">
        <DataTable
          isLoading={isPending || isPlaceholderData || isDeleting}
          itemCount={data?.count ?? 0}
          pageCount={data?.numPages ?? 0}
          data={tableData}
          isPaginated
          manualPagination
          fetchData={fetchTableData}
          initialState={{
            pageSize: 10,
            pageIndex: 0,
          }}
          columns={[
            {
              Header: intl.formatMessage(messages.bulkEmailScheduledEmailsTableSendDate),
              accessor: 'taskDue',
            },
            {
              Header: intl.formatMessage(messages.bulkEmailScheduledEmailsTableSendTo),
              accessor: 'targetsText',
            },
            {
              Header: intl.formatMessage(messages.bulkEmailScheduledEmailsTableSubject),
              accessor: 'subject',
            },
            {
              Header: intl.formatMessage(messages.bulkEmailScheduledEmailsTableAuthor),
              accessor: 'sender',
            },
          ]}
          additionalColumns={[
            {
              id: 'action',
              Header: 'Action',
              Cell: ({
                row, state, page, previousPage,
              }) => (
                <>
                  <IconButton src={Visibility} iconAs={Icon} alt="View" onClick={() => handleViewEmail(row)} />
                  <IconButton
                    src={Delete}
                    iconAs={Icon}
                    alt="Delete"
                    onClick={() => {
                      setCurrentTask({
                        row, pageIndex: state.pageIndex, page, previousPage,
                      });
                      openConfirmModal();
                    }}
                  />
                  <IconButton src={Edit} iconAs={Icon} alt="Edit" onClick={() => handleEditEmail(row)} />
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}

export default BulkEmailScheduledEmailsTable;
