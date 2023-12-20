import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import TextEditor from '@communications-app/src/components/bulk-email-tool/text-editor/TextEditor';

import messages from './messages';

const BodyForm = ({ formState, setFormState }) => {
  const intl = useIntl();
  const { body, isFormSubmitted = false } = formState ?? {};
  const handleChangeTextEditor = (value) => {
    setFormState({ ...formState, body: { value } });
  };

  const bodyValidation = body.value.length > 0;

  return (
    <Form.Group controlId="emailBody">
      <Form.Label className="h3 text-primary-500">{intl.formatMessage(messages.bodyFormFieldLabel)}</Form.Label>
      <TextEditor
        onChange={handleChangeTextEditor}
        value={body.value}
      />
      {isFormSubmitted && !bodyValidation && (
      <Form.Control.Feedback className="px-3" hasIcon type="invalid">
        {intl.formatMessage(messages.bodyFormFieldError)}
      </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

BodyForm.defaultProps = {
  formState: {},
  setFormState: () => {},
};

BodyForm.propTypes = {
  formState: PropTypes.shape({}),
  setFormState: PropTypes.func,
};

export default BodyForm;
