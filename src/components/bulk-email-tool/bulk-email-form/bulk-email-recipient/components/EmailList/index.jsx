import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Form, Chip, Container } from '@edx/paragon';
import { Person, Close } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getLearnersEmailInstructorTask } from '../../../data/api';
import messages from '../../../messages';

import './styles.scss';

const SEARCH_URI = 'https://api.github.com/search/users';

function EmailList(props) {
  const {
    courseId, handleEmailSelected, emailList, handleDeleteEmail,
    intl,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  // Use this function when we are secure about the implementation
  // eslint-disable-next-line no-unused-vars
  const handleSearchEmailLearners = async (userEmail) => {
    setIsLoading(true);
    try {
      const response = await getLearnersEmailInstructorTask(courseId, userEmail);
      const { results } = response;
      const dataFormatted = results.map(({ user: { username, email } }) => ({ id: username, email }));
      setOptions(dataFormatted);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error autocomplete input', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const filterBy = () => true;
  const handleDeleteEmailSelected = (id) => {
    if (handleDeleteEmail) {
      handleDeleteEmail(id);
    }
  };
  return (
    <Container className="col-12 mt-3">
      <Form.Label className="mt-3" disabled="disabled" data-testid="learners-email-input-label">{intl.formatMessage(messages.bulkEmailTaskEmailLearnersInputLabel)}</Form.Label>
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-autocompleinput"
        isLoading={isLoading}
        labelKey="login"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        name="studentEmail"
        selected={inputValue}
        placeholder={intl.formatMessage(messages.bulkEmailTaskEmailLearnersInputPlaceholder)}
        onChange={(selected) => {
          setInputValue([]);
          if (handleEmailSelected) {
            handleEmailSelected(selected);
          }
        }}
        renderMenuItemChildren={(option) => (
          <>
            <img
              alt={option.login}
              src={option.avatar_url}
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <span data-testid="autocomplete-email-option">{option.login}</span>
          </>
        )}
      />
      <Container className="email-list">
        <Form.Label className="col-12" data-testid="learners-email-list-label">{intl.formatMessage(messages.bulkEmailTaskEmailLearnersListLabel)}</Form.Label>
        {emailList.map(({ id, email }) => (
          <Chip
            variant="dark"
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
  courseId: '',
  handleEmailSelected: () => {},
  handleDeleteEmail: () => {},
  emailList: [],
};

EmailList.propTypes = {
  courseId: PropTypes.string,
  handleEmailSelected: PropTypes.func,
  handleDeleteEmail: PropTypes.func,
  emailList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      email: PropTypes.string.isRequired,
    }),
  ),
  intl: intlShape.isRequired,
};

export default injectIntl(EmailList);
