import React from 'react';
import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector, useDispatch } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BuildEmailFormExtensible/context';
import { actionCreators as formActions } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BuildEmailFormExtensible/context/reducer';

import messages from './messages';

const SubjectForm = () => {
  const intl = useIntl();
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const { subject, isFormSubmitted } = formData;

  const handleChangeEmailSubject = ({ target: { value } }) => {
    dispatch(formActions.updateForm({ subject: value }));
  };

  const isSubjectValid = subject.length > 0;

  return (
    <Form.Group controlId="emailSubject" className="my-5">
      <Form.Label className="h3 text-primary-500">{intl.formatMessage(messages.bulkEmailSubjectLabel)}</Form.Label>
      <Form.Control
        name="emailSubject"
        className="w-lg-50"
        onChange={handleChangeEmailSubject}
        value={subject}
      />
      { isFormSubmitted && !isSubjectValid && (
      <Form.Control.Feedback className="px-3" hasIcon type="invalid">
        {intl.formatMessage(messages.bulkEmailFormSubjectError)}
      </Form.Control.Feedback>
      ) }
    </Form.Group>
  );
};

export default SubjectForm;
