import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  StatefulButton,
  Button,
  Form,
  Icon,
  Toast,
} from '@edx/paragon';
import {
  SpinnerSimple,
  Cancel,
  Send,
  Event,
  Check,
} from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import ScheduleEmailForm from '@communications-app/src/components/bulk-email-tool/bulk-email-form/ScheduleEmailForm';
import useMobileResponsive from '@communications-app/src/utils/useMobileResponsive';
import { useSelector, useDispatch } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BuildEmailFormExtensible/context';
import { actionCreators as formActions } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BuildEmailFormExtensible/context/reducer';

import messages from './messages';

const formStatusToast = ['error', 'complete', 'completeSchedule'];

const ScheduleSection = ({ openTaskAlert }) => {
  const intl = useIntl();
  const isMobile = useMobileResponsive();
  const [scheduleInputChanged, isScheduleInputChanged] = useState(false);
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const {
    isScheduled,
    scheduleDate = '',
    scheduleTime = '',
    isEditMode,
    formStatus,
    isScheduledSubmitted = false,
  } = formData;

  const formStatusErrors = {
    error: intl.formatMessage(messages.ScheduleSectionSubmitFormError),
    complete: intl.formatMessage(messages.ScheduleSectionSubmitFormSuccess),
    completeSchedule: intl.formatMessage(messages.ScheduleSectionSubmitFormScheduledSuccess),
  };

  const handleChangeScheduled = () => {
    const newSchedule = !isScheduled;
    const newFormStatus = newSchedule ? 'schedule' : 'default';
    dispatch(formActions.updateForm({ formStatus: newFormStatus, isScheduled: newSchedule }));
  };

  const handleScheduleDate = ({ target: { name, value } }) => {
    dispatch(formActions.updateForm({ [name]: value }));
    if (!scheduleInputChanged) {
      isScheduleInputChanged(true);
    }
  };

  const scheduleFields = isScheduledSubmitted ? scheduleDate.length > 0 && scheduleTime.length > 0
 && scheduleInputChanged : true;

  const checkIsValidSchedule = isScheduled ? scheduleFields : true;

  const handleResetFormValues = () => {
    dispatch(formActions.resetForm());
  };

  const handleCloseToast = () => {
    dispatch(formActions.updateForm({ formStatus: 'default' }));
  };

  return (
    <Form.Group>
      {getConfig().SCHEDULE_EMAIL_SECTION && (
      <div className="mb-3">
        <Form.Checkbox
          name="scheduleEmailBox"
          checked={isScheduled}
          onChange={handleChangeScheduled}
          disabled={formStatus === 'pending'}
        >
          {intl.formatMessage(messages.ScheduleSectionSubmitScheduleBox)}
        </Form.Checkbox>
      </div>
      )}

      {isScheduled && (
      <ScheduleEmailForm
        isValid={checkIsValidSchedule}
        onDateTimeChange={handleScheduleDate}
        dateTime={{ date: scheduleDate, time: scheduleTime }}
      />
      )}

      <div
        className={classNames('d-flex', {
          'mt-n4.5': !isScheduled && !isMobile,
          'flex-row-reverse align-items-end': !isMobile,
          'border-top pt-2': isScheduled,
        })}
      >

        {isEditMode && (
        <Button
          className="ml-2"
          variant="outline-brand"
          onClick={handleResetFormValues}
        >Cancel
        </Button>
        )}

        <StatefulButton
          className="send-email-btn"
          data-testid="send-email-btn"
          variant="primary"
          onClick={(event) => {
            event.preventDefault();
            if (formStatus === 'schedule' && !isScheduledSubmitted) {
              dispatch(formActions.updateForm({ isScheduleButtonClicked: true }));
            }
            openTaskAlert();
          }}
          state={formStatus}
          icons={{
            default: <Icon src={Send} />,
            schedule: <Icon src={Event} />,
            reschedule: <Icon src={Event} />,
            pending: <Icon src={SpinnerSimple} className="icon-spin" />,
            complete: <Icon src={Check} />,
            completeSchedule: <Icon src={Check} />,
            error: <Icon src={Cancel} />,
          }}
          labels={{
            default: intl.formatMessage(messages.ScheduleSectionSubmitButtonDefault),
            schedule: intl.formatMessage(messages.ScheduleSectionSubmitButtonSchedule),
            reschedule: intl.formatMessage(messages.ScheduleSectionSubmitButtonReschedule),
            pending: intl.formatMessage(messages.ScheduleSectionSubmitButtonPending),
            complete: intl.formatMessage(messages.ScheduleSectionSubmitButtonComplete),
            completeSchedule: intl.formatMessage(messages.ScheduleSectionSubmitButtonCompleteSchedule),
            error: intl.formatMessage(messages.ScheduleSectionSubmitButtonError),
          }}
          disabledStates={[
            'pending',
            'complete',
            'completeSchedule',
          ]}
        />

        <Toast
          show={formStatusToast.includes(formStatus)}
          onClose={handleCloseToast}
        >
          {formStatusErrors[formStatus] || ''}
        </Toast>
      </div>
    </Form.Group>
  );
};

ScheduleSection.defaultProps = {
  openTaskAlert: () => {},
};

ScheduleSection.propTypes = {
  openTaskAlert: PropTypes.func,
};

export default ScheduleSection;
