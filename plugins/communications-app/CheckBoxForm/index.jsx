import PropTypes from 'prop-types';
import { Form, Container } from '@edx/paragon';

const CheckBoxForm = ({ isChecked, handleChange, label }) => (
  <Container className="my-4 border border-success-300 p-4">
    <Form.Checkbox checked={isChecked} onChange={handleChange}>
      {label}
    </Form.Checkbox>
  </Container>
);

CheckBoxForm.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckBoxForm;
