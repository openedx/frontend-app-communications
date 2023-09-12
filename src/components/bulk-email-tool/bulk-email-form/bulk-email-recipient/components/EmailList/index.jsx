import React, { useState } from 'react';
import {
  Form, Chip, Container, Button,
} from '@edx/paragon';
import { Person, Close, SupervisedUserCircle } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from '../../../messages';

import { isValidEmail } from './utils';
import './styles.scss';

function EmailList(props) {
  const {
    handleEmailLearnersSelected, learnersEmailList, handleDeleteEmailLearnerSelected,
    intl,
  } = props;

  const [emailListAdded, setEmailListAdded] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState(false);

  const handleDeleteEmailSelected = (id) => {
    if (handleDeleteEmailLearnerSelected) {
      handleDeleteEmailLearnerSelected(id);
    }
  };

  const handleChangeEmailInput = ({ target: { value } }) => {
    setEmailInputValue(value);
    if (isValidEmail(value)) {
      setInvalidEmailError(false);
    }
  };

  const handleAddEmail = () => {
    if (!emailInputValue.length) { return; }
    if (!emailListAdded) {
      setEmailListAdded(true);
    }
    if (isValidEmail(emailInputValue)) {
      const emailFormatted = emailInputValue.toLocaleLowerCase();
      const currentDateTime = new Date().getTime();
      const data = { id: currentDateTime, email: emailFormatted };
      handleEmailLearnersSelected(data);
      setInvalidEmailError(false);
    } else {
      setInvalidEmailError(true);
    }
  };

  return (
    <Container className="col-12 my-3">
      <Form.Group controlId="emailIndividualLearners">
        <Form.Label className="mt-3" data-testid="learners-email-input-label">{intl.formatMessage(messages.bulkEmailTaskEmailLearnersInputLabel)}</Form.Label>
        <Container className="row">
          <Form.Control data-testid="learners-email-input" name="emailSubject" className="w-lg-50" onChange={handleChangeEmailInput} placeholder={intl.formatMessage(messages.bulkEmailTaskEmailLearnersInputPlaceholder)} />
          <Button data-testid="learners-email-add-button" variant="primary" iconAfter={SupervisedUserCircle} className="mb-2 mb-sm-0" onClick={handleAddEmail}>
            {intl.formatMessage(messages.bulkEmailTaskEmailLearnersAddEmailButton)}
          </Button>
        </Container>
        { invalidEmailError && (
        <Form.Control.Feedback className="px-3 mt-1" hasIcon type="invalid">
          {intl.formatMessage(messages.bulkEmailTaskEmailLearnersErrorMessage)}
        </Form.Control.Feedback>
        )}
      </Form.Group>
      <Container className="email-list">
        <Form.Label className="col-12" data-testid="learners-email-list-label">{intl.formatMessage(messages.bulkEmailTaskEmailLearnersListLabel)}</Form.Label>
        {learnersEmailList.map(({ id, email }) => (
          <Chip
            className="email-chip"
            iconBefore={Person}
            iconAfter={Close}
            onIconAfterClick={() => handleDeleteEmailSelected(id)}
            key={id}
            data-testid="email-list-chip"
          >
            {email}
          </Chip>
        ))}
      </Container>

    </Container>
  );
}

EmailList.defaultProps = {
  handleEmailLearnersSelected: () => {},
  handleDeleteEmailLearnerSelected: () => {},
  learnersEmailList: [],
};

EmailList.propTypes = {
  handleEmailLearnersSelected: PropTypes.func,
  handleDeleteEmailLearnerSelected: PropTypes.func,
  learnersEmailList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      email: PropTypes.string.isRequired,
    }),
  ),
  intl: intlShape.isRequired,
};

export default injectIntl(EmailList);
