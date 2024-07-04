/* eslint-disable react/no-unstable-nested-components */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import {
  Button, Collapsible, Icon,
} from '@edx/paragon';
import { SpinnerSimple } from '@edx/paragon/icons';
import messages from './messages';
import { getSentEmailHistory } from './data/api';
import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';
import ViewEmailModal from './ViewEmailModal';

function BulkEmailContentHistory({ intl }) {
  const { courseId } = useParams();
  const [emailHistoryData, setEmailHistoryData] = useState();
  const [errorRetrievingData, setErrorRetrievingData] = useState(false);
  const [showHistoricalEmailContentTable, setShowHistoricalEmailContentTable] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState();

  /**
   * Async function that makes a REST API call to retrieve historical email message data sent by the bulk course email
   * tool from edx-platform.
   */
  async function fetchSentEmailHistoryData() {
    setErrorRetrievingData(false);
    setShowHistoricalEmailContentTable(false);

    let data = null;
    try {
      data = await getSentEmailHistory(courseId);
    } catch (error) {
      setErrorRetrievingData(true);
    }

    if (data) {
      const { emails } = data;
      setEmailHistoryData(emails);
    }

    setShowHistoricalEmailContentTable(true);
  }

  /**
   * This utility function transforms the data stored in `emailHistoryData` to make it easier to display in the Paragon
   * DataTable component. Some of the information we want displayed is in an inner object so we extract it and move it
   * up a level (the `subject` field). We also convert the `sent_to` data to be a String rather than an array to fix a
   * display bug in the table.
   */
  function transformDataForTable() {
    let tableData = [];
    if (emailHistoryData) {
      tableData = emailHistoryData.map((item) => ({
        ...item,
        subject: item.email.subject,
        sent_to: item.sent_to.join(', '),
      }));
    }
    return tableData;
  }

  /**
   * This function is responsible for setting the current `messageContent` state data. This will be the contents of a
   * previously sent email message from the bulk course email tool. This also toggles a modal to be visible to display
   * the message contents to the end user.
   */
  const onViewMessageClick = (tableData) => {
    setMessageContent(tableData);
    setIsMessageModalOpen(true);
  };

  const tableColumns = [
    {
      Header: `${intl.formatMessage(messages.emailHistoryTableColumnHeaderSubject)}`,
      accessor: 'subject',
    },
    {
      Header: `${intl.formatMessage(messages.emailHistoryTableColumnHeaderAuthor)}`,
      accessor: 'requester',
    },
    {
      Header: `${intl.formatMessage(messages.emailHistoryTableColumnHeaderRecipients)}`,
      accessor: 'sent_to',
    },
    {
      Header: `${intl.formatMessage(messages.emailHistoryTableColumnHeaderTimeSent)}`,
      accessor: 'created',
    },
    {
      Header: `${intl.formatMessage(messages.emailHistoryTableColumnHeaderNumberSent)}`,
      accessor: 'number_sent',
    },
  ];

  /**
   * Paragon's DataTable supports the ability to add extra columns that might not directly coincide with the data being
   * represented in the table. We are using an additional column to embed a button that will open a Modal to display the
   * contents of a previously sent message.
   */
  const additionalColumns = () => {
    const tableData = transformDataForTable();

    return [
      {
        id: 'view_message',
        Header: '',
        Cell: ({ row }) => (
          <Button variant="link" className="px-1" onClick={() => onViewMessageClick(tableData[row.index])}>
            {intl.formatMessage(messages.buttonViewMessage)}
            <span className="sr-only">&nbsp;{row.index}</span>
          </Button>
        ),
      },
    ];
  };

  return (
    <div>
      {messageContent && (
        <ViewEmailModal
          messageContent={messageContent}
          isOpen={isMessageModalOpen}
          setModalOpen={setIsMessageModalOpen}
        />
      )}
      <div>
        <p>{intl.formatMessage(messages.emailHistoryTableSectionButtonHeader)}</p>
        <Collapsible
          styling="card"
          title={intl.formatMessage(messages.emailHistoryTableSectionButton)}
          className="mb-3"
          // eslint-disable-next-line react/jsx-no-bind
          onOpen={fetchSentEmailHistoryData}
        >
          {showHistoricalEmailContentTable ? (
            <BulkEmailTaskManagerTable
              errorRetrievingData={errorRetrievingData}
              tableData={transformDataForTable()}
              tableDescription={intl.formatMessage(messages.emailHistoryTableViewMessageInstructions)}
              alertWarningMessage={intl.formatMessage(messages.noEmailData)}
              alertErrorMessage={intl.formatMessage(messages.errorFetchingEmailHistoryData)}
              columns={tableColumns}
              additionalColumns={additionalColumns()}
            />
          ) : (
            <Icon src={SpinnerSimple} className="icon-spin mx-auto" />
          )}
        </Collapsible>
      </div>
    </div>
  );
}

BulkEmailContentHistory.propTypes = {
  intl: intlShape.isRequired,
  row: PropTypes.shape({
    index: PropTypes.number,
  }),
};

BulkEmailContentHistory.defaultProps = {
  row: {},
};

export default injectIntl(BulkEmailContentHistory);
