import React from 'react';
import PropTypes from 'prop-types';
import { ActionRow, Button, ModalDialog } from '@openedx/paragon';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import { useBulkEmailEditor } from '../bulk-email-context/BulkEmailProvider';

function ViewEmailModal({
  messageContent, isOpen, setModalOpen,
}) {
  const intl = useIntl();
  const { copyToEditor } = useBulkEmailEditor();
  return (
    <div>
      <ModalDialog
        isOpen={isOpen}
        onClose={() => setModalOpen(false)}
        hasCloseButton
      >
        <ModalDialog.Body>

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
        </ModalDialog.Body>
        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="link">
              <FormattedMessage id="bulk.email.tool.close.modalDialog.button" defaultMessage="Close" />
            </ModalDialog.CloseButton>
            <Button
              onClick={() => {
                copyToEditor({
                  emailBody: messageContent.email.html_message,
                  emailSubject: messageContent.subject,
                });
                setModalOpen(false);
              }}
              variant="primary"
            >
              <FormattedMessage id="bulk.email.tool.copy.message.button" defaultMessage="Copy to editor" />

            </Button>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </div>
  );
}

ViewEmailModal.propTypes = {
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

export default ViewEmailModal;
