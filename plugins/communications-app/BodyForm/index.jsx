import React from 'react';
import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import TextEditor from '@communications-app/src/components/bulk-email-tool/text-editor/TextEditor';
import { useSelector, useDispatch } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BuildEmailFormExtensible/context';
import { actionCreators as formActions } from '@communications-app/src/components/bulk-email-tool/bulk-email-form/BuildEmailFormExtensible/context/reducer';

import messages from './messages';

const BodyForm = () => {
  const intl = useIntl();
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const { body, isFormSubmitted = false } = formData;

  const handleChangeTextEditor = (value) => {
    dispatch(formActions.updateForm({ body: value }));
  };

  const isBodyValid = body.length > 0;

  return (
    <Form.Group controlId="emailBody">
      <Form.Label className="h3 text-primary-500">{intl.formatMessage(messages.bodyFormFieldLabel)}</Form.Label>
      <TextEditor
        onChange={handleChangeTextEditor}
        value={body}
      />
      {isFormSubmitted && !isBodyValid && (
      <Form.Control.Feedback className="px-3" hasIcon type="invalid">
        {intl.formatMessage(messages.bodyFormFieldError)}
      </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default BodyForm;
