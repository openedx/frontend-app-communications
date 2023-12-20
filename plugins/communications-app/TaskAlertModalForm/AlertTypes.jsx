import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages.alerts';

export const AlertMessage = ({ emailRecipients, isScheduled, subject }) => {
  const intl = useIntl();
  return (
    <>
      <p>{intl.formatMessage(messages.TaskAlertModalAlertTypesRecipients, { subject })}</p>
      <ul className="list-unstyled">
        {emailRecipients.map((group) => (
          <li key={group}>{group}</li>
        ))}
      </ul>
      {!isScheduled && (
      <p>
        <strong>{intl.formatMessage(messages.TaskAlertModalAlertTypesInstructionCaption)}</strong>
        {intl.formatMessage(messages.TaskAlertModalAlertTypesInstructionCaptionMessage)}
      </p>
      )}
    </>
  );
};

AlertMessage.defaultProps = {
  emailRecipients: [],
};

AlertMessage.propTypes = {
  emailRecipients: PropTypes.arrayOf(PropTypes.string),
  isScheduled: PropTypes.bool.isRequired,
  subject: PropTypes.string.isRequired,
};

export const EditMessage = ({
  emailRecipients, isScheduled, scheduleDate, scheduleTime, subject,
}) => {
  const intl = useIntl();
  return (
    <>
      <p>
        {intl.formatMessage(messages.TaskAlertModalAlertTypesEditingDate, {
          dateTime: new Date(`${scheduleDate} ${scheduleTime}`).toLocaleString(),
        })}
      </p>
      <p>
        {intl.formatMessage(messages.TaskAlertModalAlertTypesEditingSubject, {
          subject,
        })}
      </p>
      <p>{intl.formatMessage(messages.TaskAlertModalAlertTypesEditingTo)}</p>
      <ul className="list-unstyled">
        {emailRecipients.map((group) => (
          <li key={group}>{group}</li>
        ))}
      </ul>
      <p>{intl.formatMessage(messages.TaskAlertModalAlertTypesEditingWarning)}</p>
      {!isScheduled && (
        <p>
          <strong>{intl.formatMessage(messages.TaskAlertModalAlertTypesInstructionCaption)}</strong>
          {intl.formatMessage(messages.TaskAlertModalAlertTypesInstructionCaptionMessage)}
        </p>
      )}
    </>
  );
};

EditMessage.defaultProps = {
  emailRecipients: [],
  scheduleDate: '',
  scheduleTime: '',
};

EditMessage.propTypes = {
  emailRecipients: PropTypes.arrayOf(PropTypes.string),
  isScheduled: PropTypes.bool.isRequired,
  scheduleDate: PropTypes.string,
  scheduleTime: PropTypes.string,
  subject: PropTypes.string.isRequired,
};
