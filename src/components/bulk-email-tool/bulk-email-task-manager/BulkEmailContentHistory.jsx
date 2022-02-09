import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import {
  Button, Icon, Modal, StatefulButton,
} from '@edx/paragon';
import { SpinnerSimple } from '@edx/paragon/icons';
import messages from './messages';
import { getSentEmailHistory } from './data/api';
import BulkEmailTaskManagerTable from './BulkEmailHistoryTable';

export function BulkEmailContentHistory({ intl, copyTextToEditor }) {
  const { courseId } = useParams();
  const BUTTON_STATE = {
    DEFAULT: 'default',
    PENDING: 'pending',
    COMPLETE: 'complete',
  };
  const [emailHistoryData, setEmailHistoryData] = useState();
  const [errorRetrievingData, setErrorRetrievingData] = useState(false);
  const [showHistoricalEmailContentTable, setShowHistoricalEmailContentTable] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState();
  const [buttonState, setButtonState] = useState(BUTTON_STATE.DEFAULT);

  /**
   * Async function that makes a REST API call to retrieve historical email message data sent by the bulk course email
   * tool from edx-platform.
   */
  async function fetchSentEmailHistoryData() {
    setErrorRetrievingData(false);
    setShowHistoricalEmailContentTable(false);
    setButtonState(BUTTON_STATE.PENDING);

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
    setButtonState(BUTTON_STATE.COMPLETE);
  }

  /**
   * This utility function transforms the data stored in `emailHistoryData` to make it easier to display in the Paragon
   * DataTable component. Some of the information we want displayed is in an inner object so we extract it and move it
   * up a level (the `subject` field). We also convert the `sent_to` data to be a String rather than an array to fix a
   * display bug in the table.
   */
  function transformDataForTable() {
    let tableData = {};
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

  /**
   * Renders a modal that will display the contents of a single historical email message sent via the bulk course email
   * tool to a user.
   */
  const renderMessageModal = () => (
    <div>
      <Modal
        open={isMessageModalOpen}
        title=""
        body={(
          <div>
            <div className="d-flex flex-row">
              <p>{intl.formatMessage(messages.modalMessageSubject)}</p>
              <p className="pl-2">{messageContent.subject}</p>
            </div>
            <div className="d-flex flex-row">
              <p>{intl.formatMessage(messages.modalMessageSentBy)}</p>
              <p className="pl-2">{messageContent.requester}</p>
            </div>
            <div className="d-flex flex-row">
              <p>{intl.formatMessage(messages.modalMessageTimeSent)}</p>
              <p className="pl-2">{messageContent.created}</p>
            </div>
            <div className="d-flex flex-row">
              <p>{intl.formatMessage(messages.modalMessageSentTo)}</p>
              <p className="pl-2">{messageContent.sent_to}</p>
            </div>
            <hr className="py-2" />
            <div>
              <p>{intl.formatMessage(messages.modalMessageBody)}</p>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: messageContent.email.html_message }} />
            </div>
          </div>
        )}
        onClose={() => setIsMessageModalOpen(false)}
        buttons={[
          <Button onClick={() => {
            copyTextToEditor(messageContent.email.html_message);
            setIsMessageModalOpen(false);
          }}
          >
            <FormattedMessage
              id="bulk.email.tool.copy.message.button"
              defaultMessage="Copy to editor"
            />
          </Button>,
        ]}
      />
    </div>
  );

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
          </Button>
        ),
      },
    ];
  };

  return (
    <div>
      <div>{messageContent && renderMessageModal()}</div>
      <div>
        <p>{intl.formatMessage(messages.emailHistoryTableSectionButtonHeader)}</p>
        <StatefulButton
          className="btn btn-outline-primary mb-2"
          variant="outline-primary"
          type="submit"
          onClick={async () => {
            await fetchSentEmailHistoryData();
          }}
          labels={{
            default: `${intl.formatMessage(messages.emailHistoryTableSectionButton)}`,
            pending: `${intl.formatMessage(messages.emailHistoryTableSectionButton)}`,
            complete: `${intl.formatMessage(messages.emailHistoryTableSectionButton)}`,
          }}
          icons={{
            pending: <Icon src={SpinnerSimple} className="icon-spin" />,
          }}
          disabledStates={['error']}
          state={buttonState}
        >
          {intl.formatMessage(messages.emailHistoryTableSectionButton)}
        </StatefulButton>
        {showHistoricalEmailContentTable && (
          <BulkEmailTaskManagerTable
            errorRetrievingData={errorRetrievingData}
            tableData={transformDataForTable()}
            tableDescription={intl.formatMessage(messages.emailHistoryTableViewMessageInstructions)}
            alertWarningMessage={intl.formatMessage(messages.noEmailData)}
            alertErrorMessage={intl.formatMessage(messages.errorFetchingEmailHistoryData)}
            columns={tableColumns}
            additionalColumns={additionalColumns()}
          />
        )}
      </div>
    </div>
  );
}

BulkEmailContentHistory.propTypes = {
  intl: intlShape.isRequired,
  row: PropTypes.shape({
    index: PropTypes.number,
  }),
  copyTextToEditor: PropTypes.func.isRequired,
};

BulkEmailContentHistory.defaultProps = {
  row: {},
};

export default injectIntl(BulkEmailContentHistory);
