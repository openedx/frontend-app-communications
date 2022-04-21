import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, StatefulButton, useCheckboxSetValues, useToggle,
} from '@edx/paragon';
import {
  SpinnerSimple, Cancel, Send, Event, Check,
} from '@edx/paragon/icons';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import { getConfig } from '@edx/frontend-platform';
import TextEditor from '../text-editor/TextEditor';
import { postBulkEmail } from './api';
import BulkEmailRecipient from './bulk-email-recipient';
import TaskAlertModal from './TaskAlertModal';
import useTimeout from '../../../utils/useTimeout';
import useMobileResponsive from '../../../utils/useMobileResponsive';
import ScheduleEmailForm from './ScheduleEmailForm';
import messages from './messages';

export const FORM_SUBMIT_STATES = {
  DEFAULT: 'default',
  PENDING: 'pending',
  COMPLETE: 'complete',
  COMPLETE_SCHEDULE: 'completed_schedule',
  SCHEDULE: 'schedule',
  ERROR: 'error',
};

function BulkEmailForm(props) {
  const {
    courseId, cohorts, editorRef, intl,
  } = props;
  const [subject, setSubject] = useState('');
  const [dateTime, setDateTime] = useState({ scheduleDate: '', scheduleTime: '' });
  const [emailFormStatus, setEmailFormStatus] = useState(FORM_SUBMIT_STATES.DEFAULT);
  const [emailFormValidation, setEmailFormValidation] = useState({
    // set these as true on initialization, to prevent invalid messages from prematurely showing
    subject: true,
    body: true,
    recipients: true,
    schedule: true,
  });
  const [selectedRecipients, { add, remove }] = useCheckboxSetValues([]);
  const [isTaskAlertOpen, openTaskAlert, closeTaskAlert] = useToggle(false);
  const [isScheduled, toggleScheduled] = useState(false);
  const resetEmailForm = useTimeout(() => {
    if (isScheduled) {
      setEmailFormStatus(FORM_SUBMIT_STATES.SCHEDULE);
    } else {
      setEmailFormStatus(FORM_SUBMIT_STATES.DEFAULT);
    }
  }, 3000);
  const isMobile = useMobileResponsive();

  const onRecipientChange = (event) => {
    if (event.target.checked) {
      add(event.target.value);
    } else {
      remove(event.target.value);
    }
  };
  const onInit = (event, editor) => {
    editorRef.current = editor;
  };

  const onSubjectChange = (event) => setSubject(event.target.value);
  const onDateTimeChange = (event) => {
    const next = { [event.target.name]: event.target.value };
    setDateTime((prev) => ({ ...prev, ...next }));
  };

  const validateDateTime = (date, time) => {
    if (isScheduled) {
      return !!date && !!time;
    }
    return true;
  };

  const validateEmailForm = () => {
    const subjectValid = subject.length !== 0;
    const bodyValid = editorRef.current.getContent().length !== 0;
    const recipientsValid = selectedRecipients.length !== 0;
    const { scheduleDate, scheduleTime } = dateTime;
    const scheduleValid = validateDateTime(scheduleDate, scheduleTime);
    setEmailFormValidation({
      subject: subjectValid,
      recipients: recipientsValid,
      body: bodyValid,
      schedule: scheduleValid,
    });
    return subjectValid && bodyValid && recipientsValid && scheduleValid;
  };

  const createEmailTask = async () => {
    const emailData = new FormData();
    if (validateEmailForm()) {
      setEmailFormStatus(() => FORM_SUBMIT_STATES.PENDING);
      emailData.append('action', 'send');
      emailData.append('send_to', JSON.stringify(selectedRecipients));
      emailData.append('subject', subject);
      emailData.append('message', editorRef.current.getContent());
      if (isScheduled) {
        const { scheduleDate, scheduleTime } = dateTime;
        emailData.append('schedule', new Date(`${scheduleDate} ${scheduleTime}`).toISOString());
        emailData.append('browser_timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
      }
      let data;
      try {
        data = await postBulkEmail(emailData, courseId);
      } catch (e) {
        setEmailFormStatus(FORM_SUBMIT_STATES.ERROR);
        return;
      }
      if (data.status === 200) {
        if (isScheduled) {
          setEmailFormStatus(FORM_SUBMIT_STATES.COMPLETE_SCHEDULE);
        } else {
          setEmailFormStatus(FORM_SUBMIT_STATES.COMPLETE);
        }
        resetEmailForm();
      }
    }
  };

  useEffect(() => {
    if (isScheduled) {
      setEmailFormStatus(FORM_SUBMIT_STATES.SCHEDULE);
    } else {
      setEmailFormStatus(FORM_SUBMIT_STATES.DEFAULT);
    }
  }, [isScheduled]);

  return (
    <div className={classNames('w-100 m-auto p-lg-4 py-2.5', !isMobile && 'px-5 border border-primary-200')}>
      <TaskAlertModal
        isOpen={isTaskAlertOpen}
        alertMessage={(
          <>
            <p>{intl.formatMessage(messages.bulkEmailTaskAlertRecipients, { subject })}</p>
            <ul className="list-unstyled">
              {selectedRecipients.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
            {!isScheduled && (
              <p>
                <strong>{intl.formatMessage(messages.bulkEmailInstructionsCaution)}</strong>
                {intl.formatMessage(messages.bulkEmailInstructionsCautionMessage)}
              </p>
            )}
          </>
        )}
        close={(event) => {
          closeTaskAlert();
          if (event.target.name === 'continue') {
            createEmailTask();
          }
        }}
      />
      <Form>
        <p className="h2">{intl.formatMessage(messages.bulkEmailToolLabel)}</p>
        <BulkEmailRecipient
          selectedGroups={selectedRecipients}
          handleCheckboxes={onRecipientChange}
          additionalCohorts={cohorts}
          isValid={emailFormValidation.recipients}
        />
        <Form.Group controlId="emailSubject">
          <Form.Label>{intl.formatMessage(messages.bulkEmailSubjectLabel)}</Form.Label>
          <Form.Control name="subject" className="w-lg-50" onChange={onSubjectChange} />
          {!emailFormValidation.subject && (
            <Form.Control.Feedback className="px-3" hasIcon type="invalid">
              {intl.formatMessage(messages.bulkEmailFormSubjectError)}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="emailBody">
          <Form.Label>{intl.formatMessage(messages.bulkEmailBodyLabel)}</Form.Label>
          <TextEditor onInit={onInit} />
          {!emailFormValidation.body && (
            <Form.Control.Feedback className="px-3" hasIcon type="invalid">
              {intl.formatMessage(messages.bulkEmailFormBodyError)}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div>
          <p>{intl.formatMessage(messages.bulkEmailInstructionsProofreading)}</p>
        </div>
        <Form.Group>
          {getConfig().SCHEDULE_EMAIL_SECTION && (
            <div className="mb-3">
              <Form.Checkbox
                name="scheduleEmailBox"
                checked={isScheduled}
                onChange={() => toggleScheduled((prev) => !prev)}
                disabled={emailFormStatus === FORM_SUBMIT_STATES.PENDING}
              >
                {intl.formatMessage(messages.bulkEmailFormScheduleBox)}
              </Form.Checkbox>
            </div>
          )}
          {isScheduled && (
            <ScheduleEmailForm
              isValid={emailFormValidation.schedule}
              onDateTimeChange={onDateTimeChange}
              dateTime={dateTime}
            />
          )}
          <div
            className={classNames('d-flex', {
              'mt-n4.5': !isScheduled && !isMobile,
              'flex-row-reverse justify-content-between align-items-end': !isMobile,
              'border-top pt-2': isScheduled,
            })}
          >
            <StatefulButton
              variant="primary"
              onClick={(event) => {
                event.preventDefault();
                openTaskAlert();
              }}
              state={emailFormStatus}
              icons={{
                [FORM_SUBMIT_STATES.DEFAULT]: <Icon src={Send} />,
                [FORM_SUBMIT_STATES.SCHEDULE]: <Icon src={Event} />,
                [FORM_SUBMIT_STATES.PENDING]: <Icon src={SpinnerSimple} className="icon-spin" />,
                [FORM_SUBMIT_STATES.COMPLETE]: <Icon src={Check} />,
                [FORM_SUBMIT_STATES.COMPLETE_SCHEDULE]: <Icon src={Check} />,
                [FORM_SUBMIT_STATES.ERROR]: <Icon src={Cancel} />,
              }}
              labels={{
                [FORM_SUBMIT_STATES.DEFAULT]: intl.formatMessage(messages.bulkEmailSubmitButtonDefault),
                [FORM_SUBMIT_STATES.SCHEDULE]: intl.formatMessage(messages.bulkEmailSubmitButtonSchedule),
                [FORM_SUBMIT_STATES.PENDING]: intl.formatMessage(messages.bulkEmailSubmitButtonPending),
                [FORM_SUBMIT_STATES.COMPLETE]: intl.formatMessage(messages.bulkEmailSubmitButtonComplete),
                [FORM_SUBMIT_STATES.COMPLETE_SCHEDULE]: intl.formatMessage(
                  messages.bulkEmailSubmitButtonCompleteSchedule,
                ),
                [FORM_SUBMIT_STATES.ERROR]: intl.formatMessage(messages.bulkEmailSubmitButtonError),
              }}
              disabledStates={[
                FORM_SUBMIT_STATES.PENDING,
                FORM_SUBMIT_STATES.COMPLETE,
                FORM_SUBMIT_STATES.COMPLETE_SCHEDULE,
              ]}
            />
            {emailFormStatus === FORM_SUBMIT_STATES.ERROR && (
              <Form.Control.Feedback hasIcon={false} type="invalid">
                {intl.formatMessage(messages.bulkEmailFormError)}
              </Form.Control.Feedback>
            )}
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

BulkEmailForm.defaultProps = {
  cohorts: [],
};

BulkEmailForm.propTypes = {
  courseId: PropTypes.string.isRequired,
  cohorts: PropTypes.arrayOf(PropTypes.string),
  editorRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })])
    .isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailForm);
