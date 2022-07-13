/* eslint-disable react/prop-types */
import React, {
  useCallback, useContext, useState, useEffect,
} from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Alert, DataTable, Icon, IconButton,
} from '@edx/paragon';
import {
  Delete, Info, Visibility, Edit,
} from '@edx/paragon/icons';
import { useParams } from 'react-router-dom';
import { BulkEmailContext } from '../../bulk-email-context';
import { deleteScheduledEmailThunk, getScheduledBulkEmailThunk } from './data/thunks';
import messages from './messages';
import ViewEmailModal from '../ViewEmailModal';
import { copyToEditor } from '../../bulk-email-form/data/actions';

function flattenScheduledEmailsArray(emails) {
  return emails.map((email) => ({
    schedulingId: email.id,
    emailId: email.courseEmail.id,
    task: email.task,
    taskDue: new Date(email.taskDue).toLocaleString(),
    ...email.courseEmail,
    targets: email.courseEmail.targets.join(', '),
  }));
}

function BulkEmailScheduledEmailsTable({ intl }) {
  const { courseId } = useParams();
  const [{ scheduledEmailsTable }, dispatch] = useContext(BulkEmailContext);
  const [tableData, setTableData] = useState([]);
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    messageContent: {},
  });

  useEffect(() => {
    setTableData(flattenScheduledEmailsArray(scheduledEmailsTable.results));
  }, [scheduledEmailsTable.results]);

  const fetchTableData = useCallback((args) => {
    dispatch(getScheduledBulkEmailThunk(courseId, args.pageIndex + 1));
  }, []);

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
        sent_to: row.original.targets,
      },
    });
  };
  if (scheduledEmailsTable.errorRetrievingData) {
    return (
      <div className="pb-4">
        <Alert variant="danger" icon={Info}>
          <Alert.Heading>{intl.formatMessage(messages.bulkEmailScheduledEmailsTableErrorHeader)}</Alert.Heading>
          <p>{intl.formatMessage(messages.bulkEmailScheduledEmailsTableError)}</p>
        </Alert>
      </div>
    );
  }

  const handleDeleteEmail = async (row, { pageIndex }, page, previousPage) => {
    await dispatch(deleteScheduledEmailThunk(courseId, row.original.schedulingId));
    if (page.length === 1 && pageIndex !== 0) {
      previousPage();
    } else {
      dispatch(getScheduledBulkEmailThunk(courseId, pageIndex + 1));
    }
  };

  const normalizeDigits = (value) => (value < 10 ? `0${value}` : value);
  const formatDate = (date) => {
    const day = normalizeDigits(date.getDate());
    const month = normalizeDigits(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
  const formatTime = (date) => {
    const hours = normalizeDigits(date.getHours());
    const mins = normalizeDigits(date.getMinutes());

    return `${hours}:${mins}`;
  };

  const handleEditEmail = (row) => {
    const {
      original: {
        htmlMessage: emailBody, subject: emailSubject, taskDue, targets, schedulingId, emailId,
      },
    } = row;
    const dateTime = new Date(taskDue);
    const emailRecipients = targets.replaceAll('-', ':').split(', ');
    const scheduleDate = formatDate(dateTime);
    const scheduleTime = formatTime(dateTime);
    dispatch(
      copyToEditor({
        emailId,
        emailBody,
        emailSubject,
        emailRecipients,
        scheduleDate,
        scheduleTime,
        schedulingId,
        editMode: true,
      }),
    );
  };
  return (
    <>
      {viewModal.isOpen && (
        <ViewEmailModal
          isOpen={viewModal.isOpen}
          setModalOpen={(open) => setViewModal({ isOpen: open })}
          messageContent={viewModal.messageContent}
        />
      )}
      <div className="pb-4">
        <DataTable
          isLoading={scheduledEmailsTable.isLoading}
          itemCount={scheduledEmailsTable.count}
          pageCount={scheduledEmailsTable.numPages}
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
              accessor: 'targets',
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
                    onClick={() => handleDeleteEmail(row, state, page, previousPage)}
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

BulkEmailScheduledEmailsTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailScheduledEmailsTable);
