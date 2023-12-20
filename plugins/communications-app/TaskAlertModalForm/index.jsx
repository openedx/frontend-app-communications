import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import TaskAlertModal from '@communications-app/src/components/bulk-email-tool/task-alert-modal';
import { getScheduledBulkEmailThunk } from '@communications-app/src/components/bulk-email-tool/bulk-email-task-manager/bulk-email-scheduled-emails-table/data/thunks';
import { BulkEmailContext } from '@communications-app/src/components/bulk-email-tool/bulk-email-context';

import { postBulkEmailInstructorTask, patchScheduledBulkEmailInstructorTask } from './api';
import { AlertMessage, EditMessage } from './AlertTypes';

const TaskAlertModalForm = ({
  formState,
  setFormState,
  isTaskAlertOpen,
  closeTaskAlert,
}) => {
  const [, dispatch] = useContext(BulkEmailContext);

  const {
    isScheduled,
    emailRecipients = { value: [] },
    scheduleDate = '',
    scheduleTime = '',
    isEditMode = false,
    subject,
    courseId = '',
    emailId = '',
    schedulingId = '',
    body,
    isScheduleButtonClicked = false,
    isFormSubmitted = false,
  } = formState ?? {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeFormStatus = useCallback((status) => setFormState({ ...formState, formStatus: status }), []);

  const handlePostEmailTask = async () => {
    const emailRecipientsValue = emailRecipients.value;
    const emailSubject = subject.value;
    const emailBody = body.value;

    const emailData = new FormData();
    emailData.append('action', 'send');
    emailData.append('send_to', JSON.stringify(emailRecipientsValue));
    emailData.append('subject', emailSubject);
    emailData.append('message', emailBody);

    if (isScheduled) {
      emailData.append('schedule', new Date(`${scheduleDate} ${scheduleTime}`).toISOString());
    }

    changeFormStatus('pending');

    try {
      await postBulkEmailInstructorTask(emailData, courseId);
      const newFormStatus = isScheduled ? 'completeSchedule' : 'complete';
      changeFormStatus(newFormStatus);
      setTimeout(() => changeFormStatus('default'), 3000);
    } catch {
      changeFormStatus('error');
    }
  };

  const handlePatchEmailTask = async () => {
    const emailRecipientsValue = emailRecipients.value;
    const emailSubject = subject.value;
    const emailBody = body.value;

    const emailData = {
      email: {
        targets: emailRecipientsValue,
        subject: emailSubject,
        message: emailBody,
        id: emailId,
      },
      schedule: isScheduled ? new Date(`${scheduleDate} ${scheduleTime}`).toISOString() : null,
    };

    changeFormStatus('pending');

    try {
      await patchScheduledBulkEmailInstructorTask(emailData, courseId, schedulingId);
      changeFormStatus('completeSchedule');
      setTimeout(() => changeFormStatus('default'), 3000);
    } catch {
      changeFormStatus('error');
    }
  };

  const createEmailTask = async () => {
    const isScheduleValid = isScheduled ? scheduleDate.length > 0 && scheduleTime.length > 0 : true;
    const isFormValid = emailRecipients.value.length > 0 && subject.value.length > 0
    && body.value.length > 0 && isScheduleValid;

    if (isFormValid && isEditMode) {
      await handlePatchEmailTask();
    }

    if (isFormValid && !isEditMode) {
      await handlePostEmailTask();
    }

    dispatch(getScheduledBulkEmailThunk(courseId, 1));
  };

  return (
    <TaskAlertModal
      isOpen={isTaskAlertOpen}
      alertMessage={isEditMode
        ? (
          <EditMessage
            subject={subject.value}
            emailRecipients={emailRecipients.value}
            {...{ scheduleDate, scheduleTime, isScheduled }}
          />
        )
        : (
          <AlertMessage
            subject={subject.value}
            emailRecipients={emailRecipients.value}
            isScheduled={isScheduled}
          />
        )}
      close={(event) => {
        closeTaskAlert();

        if (event.target.name === 'continue') {
          if (!isFormSubmitted) {
            setFormState({ ...formState, isFormSubmitted: true });
          }
          if (isScheduleButtonClicked) {
            setFormState({ ...formState, isScheduledSubmitted: true });
          }

          createEmailTask();
        }
      }}
    />
  );
};

TaskAlertModalForm.defaultProps = {
  formState: {},
  setFormState: () => {},
  openTaskAlert: () => {},
  closeTaskAlert: () => {},
  isTaskAlertOpen: false,
};

TaskAlertModalForm.propTypes = {
  formState: PropTypes.shape({}),
  setFormState: PropTypes.func,
  openTaskAlert: PropTypes.func,
  closeTaskAlert: PropTypes.func,
  isTaskAlertOpen: PropTypes.bool,

};

export default TaskAlertModalForm;
