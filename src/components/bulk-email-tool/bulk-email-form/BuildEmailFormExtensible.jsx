import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Form,
  Spinner,
  useToggle,
} from '@edx/paragon';
import { BulkEmailContext } from '../bulk-email-context';
import useMobileResponsive from '../../../utils/useMobileResponsive';
import PluggableComponent from '../../PluggableComponent';

function BuildEmailFormExtensible({ courseId, cohorts }) {
  const isMobile = useMobileResponsive();
  const [{ editor }] = useContext(BulkEmailContext);
  const [isTaskAlertOpen, openTaskAlert, closeTaskAlert] = useToggle(false);
  const [formState, setFormState] = useState({
    isFormValid: true,
    isFormSubmitted: false,
    scheduleValid: true,
    isScheduled: false,
    isEditMode: false,
    formStatus: 'default',
    isScheduleButtonClicked: false,
    courseId,
    cohorts,
    scheduleDate: '',
    scheduleTime: '',
    isScheduledSubmitted: false,
    emailId: '',
    schedulingId: '',
    emailRecipients: { value: [], isLoaded: false },
    subject: { value: '', isLoaded: false },
    body: { value: '', isLoaded: false },
  });

  useEffect(() => {
    if (editor.editMode) {
      const { emailRecipients, subject, body } = formState;
      const newRecipientsValue = { ...emailRecipients, value: editor.emailRecipients };
      const newSubjectValue = { ...subject, value: editor.emailSubject };
      const newBodyValue = { ...body, value: editor.emailBody };
      const newScheduleDate = editor.scheduleDate;
      const newScheduleTime = editor.scheduleTime;
      const newEmailId = editor.emailId;
      const newSchedulingId = editor.schedulingId;

      setFormState({
        ...formState,
        isEditMode: true,
        formStatus: 'reschedule',
        isScheduled: true,
        emailId: newEmailId,
        schedulingId: newSchedulingId,
        scheduleDate: newScheduleDate,
        scheduleTime: newScheduleTime,
        emailRecipients: newRecipientsValue,
        subject: newSubjectValue,
        body: newBodyValue,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.editMode, editor.emailRecipients, editor.emailSubject, editor.emailBody]);

  return (
    <div className={classNames('w-100 m-auto', !isMobile && 'p-4 border border-primary-200')}>
      <Form>

        <PluggableComponent
          id="build-email-form-tasks-alert-modal"
          as="communications-app-task-alert-modal"
          formState={formState}
          setFormState={setFormState}
          {...{ isTaskAlertOpen, openTaskAlert, closeTaskAlert }}
        />

        <PluggableComponent
          id="build-email-form-recipients-field"
          as="communications-app-recipients-checks"
          formState={formState}
          setFormState={setFormState}
        />

        <PluggableComponent
          id="build-email-form-subject-field"
          as="communications-app-subject-form"
          formState={formState}
          setFormState={setFormState}
        />

        <PluggableComponent
          id="build-email-form-body-field"
          as="communications-app-body-email-form"
          loadingComponent={(
            <Spinner
              id="loading-test"
              animation="grow"
              className="mie-3"
              screenReaderText="loading"
            />
           )}
          formState={formState}
          setFormState={setFormState}
        />

        <PluggableComponent
          id="build-email-form-instructions-form"
          as="communications-app-instructions-pro-freading"
          formState={formState}
          setFormState={setFormState}
        />

        <PluggableComponent
          id="build-email-form-schedule-section"
          as="communications-app-schedule-section"
          formState={formState}
          setFormState={setFormState}
          openTaskAlert={openTaskAlert}
        />

      </Form>
    </div>
  );
}

BuildEmailFormExtensible.defaultProps = {
  cohorts: [],
};

BuildEmailFormExtensible.propTypes = {
  courseId: PropTypes.string.isRequired,
  cohorts: PropTypes.arrayOf(PropTypes.string),
};

export default BuildEmailFormExtensible;
