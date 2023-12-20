import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

const SubjectForm = ({ formState, setFormState }) => {
  const intl = useIntl();
  const { subject, isFormSubmitted } = formState ?? {};
  const handleChangeEmailSubject = ({ target: { value } }) => {
    setFormState({ ...formState, subject: { value } });
  };

  const subjectValidation = subject.value.length > 0;

  return (
    <Form.Group controlId="emailSubject" className="my-5">
      <Form.Label className="h3 text-primary-500">{intl.formatMessage(messages.bulkEmailSubjectLabel)}</Form.Label>
      <Form.Control
        name="emailSubject"
        className="w-lg-50"
        onChange={handleChangeEmailSubject}
        value={subject.value}
      />
      { isFormSubmitted && !subjectValidation && (
      <Form.Control.Feedback className="px-3" hasIcon type="invalid">
        {intl.formatMessage(messages.bulkEmailFormSubjectError)}
      </Form.Control.Feedback>
      ) }
    </Form.Group>
  );
};

SubjectForm.defaultProps = {
  formState: {},
  setFormState: () => {},
};

SubjectForm.propTypes = {
  formState: PropTypes.shape({}),
  setFormState: PropTypes.func,
};

export default SubjectForm;
