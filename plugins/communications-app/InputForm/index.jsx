import PropTypes from 'prop-types';
import { Form, Container } from '@edx/paragon';

const InputForm = ({
  isValid, controlId, label, feedbackText,
}) => {
  const feedbackType = isValid ? 'valid' : 'invalid';
  return (
    <Form.Group isValid={isValid} controlId={controlId} data-testid="plugin-input" className="p-3 border border-success-300">
      <Form.Label className="h3 text-primary-500">{label}</Form.Label>
      <Container className="row">
        <Form.Control className="col-3" />
        <p className="col-8">@openedx-plugins/communications-app-input-form</p>
      </Container>
      <Form.Control.Feedback type={feedbackType}>
        {feedbackText}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

InputForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  feedbackText: PropTypes.string.isRequired,
};

export default InputForm;
