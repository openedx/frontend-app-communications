import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useSelector, useDispatch } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BulkEmailForm/context';
import { actionCreators as formActions } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BulkEmailForm/context/reducer';

import './styles.scss';

const disableIsHasLearners = ['track', 'cohort'];
const recipientsFormDescription = 'A selectable choice from a list of potential email recipients';

const RecipientsForm = ({ cohorts: additionalCohorts, courseModes }) => {
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const { isEditMode, emailRecipients, isFormSubmitted } = formData;
  const hasCourseModes = courseModes.length > 1;

  const [selectedGroups, setSelectedGroups] = useState([]);
  const hasAllLearnersSelected = selectedGroups.some((group) => group === 'learners');

  const handleChangeCheckBoxes = ({ target: { value, checked } }) => {
    let newValue;

    if (checked) {
      const uniqueSet = new Set([...emailRecipients, value]);
      newValue = Array.from(uniqueSet);
    } else {
      newValue = emailRecipients.filter((item) => item !== value);
    }

    if (checked && value === 'learners') {
      newValue = newValue.filter(item => !disableIsHasLearners.some(disabled => item.includes(disabled)));
    }

    dispatch(formActions.updateForm({ emailRecipients: newValue }));
    setSelectedGroups(newValue);
  };

  useEffect(() => {
    setSelectedGroups(emailRecipients);
  }, [isEditMode, emailRecipients.length, emailRecipients]);

  return (
    <Form.Group>
      <Form.Label>
        <span className="h3 text-primary-500">
          <FormattedMessage
            id="bulk.email.form.recipients.sendLabel"
            defaultMessage="Send to"
            description="A label before the list of potential recipients"
          />
        </span>
      </Form.Label>
      <Form.CheckboxSet
        name="recipientGroups"
        className="flex-wrap flex-row recipient-groups w-100"
        onChange={handleChangeCheckBoxes}
        value={selectedGroups}
      >
        <Form.Checkbox
          key="myself"
          value="myself"
          className="mt-2.5 col col-lg-4 col-sm-6 col-12"
        >
          <FormattedMessage
            id="bulk.email.form.recipients.myself"
            defaultMessage="Myself"
            description={recipientsFormDescription}
          />
        </Form.Checkbox>
        <Form.Checkbox
          key="staff"
          value="staff"
          className="col col-lg-4 col-sm-6 col-12"
        >
          <FormattedMessage
            id="bulk.email.form.recipients.staff"
            defaultMessage="Staff/Administrators"
            description={recipientsFormDescription}
          />
        </Form.Checkbox>
        <Form.Checkbox
          key="track:verified"
          value="track:verified"
          disabled={hasAllLearnersSelected}
          className="col col-lg-4 col-sm-6 col-12"
        >
          <FormattedMessage
            id="bulk.email.form.recipients.verified"
            defaultMessage="Learners in the verified certificate track"
            description={recipientsFormDescription}
          />
        </Form.Checkbox>
        {
          // additional modes
          hasCourseModes
          && courseModes.map((courseMode) => (
            <Form.Checkbox
              key={`track:${courseMode.slug}`}
              value={`track:${courseMode.slug}`}
              disabled={hasAllLearnersSelected}
              className="col col-lg-4 col-sm-6 col-12"
            >
              <FormattedMessage
                id="bulk.email.form.mode.label"
                defaultMessage="Learners in the {courseModeName} Track"
                values={{ courseModeName: courseMode.name }}
              />
            </Form.Checkbox>
          ))
        }
        {
            // additional cohorts
            additionalCohorts
            && additionalCohorts.map((cohort) => (
              <Form.Checkbox
                key={cohort}
                value={`cohort:${cohort}`}
                disabled={hasAllLearnersSelected}
                className="col col-lg-4 col-sm-6 col-12"
              >
                <FormattedMessage
                  id="bulk.email.form.cohort.label"
                  defaultMessage="Cohort: {cohort}"
                  values={{ cohort }}
                />
              </Form.Checkbox>
            ))
          }
        <Form.Checkbox
          key="track:audit"
          value="track:audit"
          disabled={hasAllLearnersSelected}
          className="col col-lg-4 col-sm-6 col-12"
        >
          <FormattedMessage
            id="bulk.email.form.recipients.audit"
            defaultMessage="Learners in the audit track"
            description={recipientsFormDescription}
          />
        </Form.Checkbox>
        <Form.Checkbox
          key="learners"
          value="learners"
          className="col col-lg-4 col-sm-6 col-12"
        >
          <FormattedMessage
            id="bulk.email.form.recipients.learners"
            defaultMessage="All Learners"
            description={recipientsFormDescription}
          />
        </Form.Checkbox>
      </Form.CheckboxSet>
      { isFormSubmitted && selectedGroups.length === 0 && (
        <Form.Control.Feedback
          className="px-3"
          type="invalid"
          hasIcon
        >
          <FormattedMessage
            id="bulk.email.form.recipients.error"
            defaultMessage="At least one recipient is required"
            description="An Error message located under the recipients list. Visible only on failure"
          />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

RecipientsForm.defaultProps = {
  cohorts: [],
  courseModes: [],
};

RecipientsForm.propTypes = {
  cohorts: PropTypes.arrayOf(PropTypes.string),
  courseModes: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default RecipientsForm;
