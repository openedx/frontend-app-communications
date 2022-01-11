import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import {
  Alert, Button, DataTable, Modal,
} from '@edx/paragon';
import messages from './messages';
import { getSentEmailHistory } from './api';

export function BulkEmailContentHistory({ intl }) {
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
    let data = null;
    try {
      data = await getSentEmailHistory(courseId);
    } catch (error) {
      setErrorRetrievingData(true);
    }

    if (data) {
      const { emails } = data;
      setEmailHistoryData(emails);
      setShowHistoricalEmailContentTable(true);
    }
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
   * Render function for the email content history table. If an error occurs while attempting to fetch data from
   * edx-platform we will render this error instead of the table.
   */
  const renderError = () => (
    <div>
      <Alert variant="danger">
        <p className="font-weight-bold">
          {intl.formatMessage(messages.errorFetchingData)}
        </p>
      </Alert>
    </div>
  );

  /**
   * Render function for the email content history table. If there is no data to display in our table we will render
   * this informative message instead.
   */
  const renderEmpty = () => (
    <div className="pt-1">
      <Alert variant="warning">
        <p className="font-weight-bold">
          {intl.formatMessage(messages.noEmailData)}
        </p>
      </Alert>
    </div>
  );

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
              <p>
                {intl.formatMessage(messages.modalMessageSubject)}
              </p>
              <p className="pl-2">
                {messageContent.subject}
              </p>
            </div>
            <div className="d-flex flex-row">
              <p>
                {intl.formatMessage(messages.modalMessageSentBy)}
              </p>
              <p className="pl-2">
                {messageContent.requester}
              </p>
            </div>
            <div className="d-flex flex-row">
              <p>
                {intl.formatMessage(messages.modalMessageTimeSent)}
              </p>
              <p className="pl-2">
                {messageContent.created}
              </p>
            </div>
            <div className="d-flex flex-row">
              <p>
                {intl.formatMessage(messages.modalMessageSentTo)}
              </p>
              <p className="pl-2">
                {messageContent.sent_to}
              </p>
            </div>
            <hr className="py-2" />
            <div>
              <p>
                {intl.formatMessage(messages.modalMessageBody)}
              </p>
              <div dangerouslySetInnerHTML={{ __html: messageContent.email.html_message }} />
            </div>
          </div>
        )}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  );

  /**
   * Render function for the email content history table. This function is responsible for displaying data inside of
   * the table when the `Show Sent Email History` button is pressed on the page.
   */
  const renderTable = () => {
    // Do a little data manipulation to make it easier to display what we want in the table. Pull the email subject out
    // of the email data. Transforms the `sent_to` array to a string for easier display in our table.
    const tableData = emailHistoryData.map((item) => ({
      ...item,
      subject: item.email.subject,
      sent_to: item.sent_to.join(', '),
    }));

    return (
      <div className="pb-3">
        <p className="font-italic">
          {intl.formatMessage(messages.emailHistoryTableViewMessageInstructions)}
        </p>
        <DataTable
          itemCount={emailHistoryData.length}
          columns={[
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
          ]}
          data={tableData}
          additionalColumns={[
            {
              id: 'view_message',
              Header: `${intl.formatMessage(messages.emailHistoryTableColumnHeaderViewMessage)}`,
              Cell: ({ row }) => (
                <Button variant="link" className="px-1" onClick={() => onViewMessageClick(tableData[row.index])}>
                  {intl.formatMessage(messages.buttonViewMessage)}
                </Button>
              ),
            },
          ]}
        />
      </div>
    );
  };

  /**
   * Today there can be three states which the renderTableData function will handle:
   *   1. There was an error retrieving data from edx-platform and we can't display anything (for now).
   *   2. There is no email history for this course-run and we have nothing to display to the end user.
   *   3. We were able to receive historical email content and it will be presented in a table.
   */
  const renderTableData = () => {
    if (errorRetrievingData) {
      return renderError();
    }

    if (!emailHistoryData.length) {
      return renderEmpty();
    }

    return renderTable();
  };

  return (
    <div>
      <div>
        {messageContent && renderMessageModal()}
      </div>
      <div>
        <p>
          {intl.formatMessage(messages.emailHistoryTableSectionButtonHeader)}
        </p>
        <Button variant="outline-primary" className="btn btn-outline-primary mb-2" onClick={async () => { await fetchSentEmailHistoryData(); }}>
          {intl.formatMessage(messages.emailHistoryTableSectionButton)}
        </Button>
        {showHistoricalEmailContentTable && renderTableData()}
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
