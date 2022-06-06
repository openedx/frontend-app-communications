import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from '@edx/paragon';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from './messages';
import { BulkEmailContext } from '../bulk-email-context';
import { copyToEditor } from '../bulk-email-form/data/actions';

function ViewEmailModal({
  intl, messageContent, isOpen, setModalOpen,
}) {
  const [, dispatch] = useContext(BulkEmailContext);
  return (
    <div>
      <Modal
        open={isOpen}
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
        onClose={() => setModalOpen(false)}
        buttons={[
          <Button
            onClick={() => {
              dispatch(copyToEditor(messageContent.email.html_message, messageContent.subject));
              setModalOpen(false);
            }}
          >
            <FormattedMessage id="bulk.email.tool.copy.message.button" defaultMessage="Copy to editor" />
          </Button>,
        ]}
      />
    </div>
  );
}

ViewEmailModal.propTypes = {
  intl: intlShape.isRequired,
  messageContent: PropTypes.shape({
    subject: PropTypes.string,
    requester: PropTypes.string,
    created: PropTypes.string,
    email: PropTypes.shape({
      html_message: PropTypes.string,
    }).isRequired,
    sent_to: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default injectIntl(ViewEmailModal);
