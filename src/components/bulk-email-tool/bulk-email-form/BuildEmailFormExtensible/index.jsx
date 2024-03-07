import { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  Form,
  Spinner,
  useToggle,
} from '@openedx/paragon';
import { BulkEmailContext } from '../../bulk-email-context';
import useMobileResponsive from '../../../../utils/useMobileResponsive';
import PluggableComponent from '../../../PluggableComponent';

import { withContextProvider, useDispatch } from './context';
import { actionCreators as formActions } from './context/reducer';

const BuildEmailFormExtensible = ({ courseId, cohorts, courseModes }) => {
  const isMobile = useMobileResponsive();
  const [{ editor }] = useContext(BulkEmailContext);
  const [isTaskAlertOpen, openTaskAlert, closeTaskAlert] = useToggle(false);
  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    /* istanbul ignore next */
    if (editor.editMode) {
      const newRecipientsValue = editor.emailRecipients;
      const newSubjectValue = editor.emailSubject;
      const newBodyValue = editor.emailBody;
      const newScheduleDate = editor.scheduleDate;
      const newScheduleTime = editor.scheduleTime;
      const newEmailId = editor.emailId;
      const newSchedulingId = editor.schedulingId;

      dispatch(formActions.updateForm({
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
      }));
    }
  }, [editor, dispatch]);

  return (
    <div className={classNames('w-100 m-auto', !isMobile && 'p-4 border border-primary-200')}>
      <Form>

        <PluggableComponent
          id="build-email-form-tasks-alert-modal"
          as="communications-app-task-alert-modal"
          courseId={courseId}
          {...{ isTaskAlertOpen, openTaskAlert, closeTaskAlert }}
        />

        <PluggableComponent
          id="build-email-form-recipients-field"
          as="communications-app-recipients-checks"
          cohorts={cohorts}
          courseId={courseId}
          courseModes={courseModes}
        />

        <PluggableComponent
          id="build-email-form-subject-field"
          as="communications-app-subject-form"
          courseId={courseId}
        />

        <PluggableComponent
          id="build-email-form-body-field"
          as="communications-app-body-email-form"
          courseId={courseId}
          loadingComponent={(
            <Spinner
              id="loading-test"
              animation="grow"
              className="mie-3"
              screenReaderText="loading"
            />
           )}
        />

        <PluggableComponent
          id="build-email-form-instructions-form"
          as="communications-app-instructions-pro-freading"
          courseId={courseId}
        />

        <PluggableComponent
          id="build-email-form-schedule-section"
          as="communications-app-schedule-section"
          courseId={courseId}
          openTaskAlert={openTaskAlert}
        />

      </Form>
    </div>
  );
};

BuildEmailFormExtensible.defaultProps = {
  cohorts: [],
  courseModes: [],
};

BuildEmailFormExtensible.propTypes = {
  courseId: PropTypes.string.isRequired,
  cohorts: PropTypes.arrayOf(PropTypes.string),
  courseModes: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default withContextProvider(BuildEmailFormExtensible);
