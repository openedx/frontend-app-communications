import React from 'react';
import PropTypes from 'prop-types';
import { ActionRow, AlertModal, Button } from '@edx/paragon';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

function TaskAlertModal(props) {
  const {
    isOpen, close, alertMessage, intl,
  } = props;

  const messages = {
    taskAlertTitle: {
      id: 'bulk.email.task.alert.title',
      defaultMessage: 'Caution',
      description: 'Title in the header of the alert',
    },
  };
  return (
    <AlertModal
      title={intl.formatMessage(messages.taskAlertTitle)}
      isBlocking
      isOpen={isOpen}
      onClose={close}
      footerNode={(
        <ActionRow>
          <Button variant="tertiary" onClick={close} name="cancel">
            <FormattedMessage
              id="bulk.email.task.alert.cancel"
              defaultMessage="Cancel"
              description="Cancel button for the task alert"
            />
          </Button>
          <Button variant="primary" onClick={close} name="continue">
            <FormattedMessage
              id="bulk.email.form.recipients.Contine"
              defaultMessage="Continue"
              description="Continue button for the task alert"
            />
          </Button>
        </ActionRow>
      )}
    >
      {alertMessage}
    </AlertModal>
  );
}

TaskAlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  alertMessage: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TaskAlertModal);
