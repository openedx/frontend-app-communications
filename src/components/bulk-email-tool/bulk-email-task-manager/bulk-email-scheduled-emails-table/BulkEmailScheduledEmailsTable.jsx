import React, { useCallback, useContext, useState } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Alert, DataTable, Icon, IconButton,
} from '@edx/paragon';
import { Info, Visibility } from '@edx/paragon/icons';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { BulkEmailContext } from '../../bulk-email-context';
import { getScheduledBulkEmailThunk } from './data/thunks';
import messages from './messages';
import ViewEmailModal from '../ViewEmailModal';

function flattenScheduledEmailsArray(emails) {
  return emails.map((email) => ({
    id: email.id,
    task: email.task,
    taskDue: new Date(email.taskDue).toLocaleString(),
    ...email.courseEmail,
    targets: email.courseEmail.targets.join(', '),
  }));
}

function BulkEmailScheduledEmailsTable({ intl }) {
  const { courseId } = useParams();
  const [{ scheduledEmailsTable }, dispatch] = useContext(BulkEmailContext);
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    messageContent: {},
  });

  const fetchTableData = useCallback((args) => {
    dispatch(getScheduledBulkEmailThunk(courseId, args.pageIndex + 1));
  }, []);

  const handleViewEmail = (row) => {
    setViewModal({
      isOpen: true,
      messageContent: {
        subject: row.original.subject,
        requester: row.original.sender,
        created: '',
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
          data={flattenScheduledEmailsArray(scheduledEmailsTable.results)}
          fetchData={fetchTableData}
          isPaginated
          manualPagination
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
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <>
                  <IconButton src={Visibility} iconAs={Icon} alt="View" onClick={() => handleViewEmail(row)} />
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
