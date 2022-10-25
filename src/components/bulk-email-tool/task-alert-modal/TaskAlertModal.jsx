import React from 'react';
import PropTypes from 'prop-types';
import { ActionRow, AlertModal, Button } from '@edx/paragon';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

const TaskAlertModal = (props) => {
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
            >
              { // FormattedMessage wraps the translated string in a <span/> by default. This was
                // causing strange click event target issues in safari. To solve this, we want to
                // wrap the string in a fragment instead of a span, so that the whole button considered
                // a "button" target, and not a "span inside a button"
                // eslint-disable-next-line react/jsx-no-useless-fragment
                msg => <>{msg}</>
              }
            </FormattedMessage>
          </Button>
        </ActionRow>
      )}
    >
      {alertMessage}
    </AlertModal>
  );
};

TaskAlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  alertMessage: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TaskAlertModal);
