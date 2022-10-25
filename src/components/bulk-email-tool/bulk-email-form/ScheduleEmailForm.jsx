import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Form } from '@edx/paragon';
import useMobileResponsive from '../../../utils/useMobileResponsive';

const ScheduleEmailForm = (props) => {
  const isMobile = useMobileResponsive();
  const { isValid, onDateTimeChange, dateTime } = props;
  const { date, time } = dateTime;
  return (
    <Form.Group>
      <div className={classNames('d-flex', isMobile ? 'flex-column' : 'flex-row', 'my-3')}>
        <div className="w-md-50 mx-2">
          <Form.Control
            type="date"
            name="scheduleDate"
            data-testid="scheduleDate"
            onChange={onDateTimeChange}
            value={date}
            floatingLabel={(
              <FormattedMessage
                id="bulk.email.form.schedule.date"
                defaultMessage="Send date"
                description="Label for the date portion of the email schedule form"
              />
            )}
          />
          <small className="text-gray-500 x-small">
            <FormattedMessage
              id="bulk.email.form.schedule.date.description"
              defaultMessage="Enter a start date, e.g. 11/27/2023"
            />
          </small>
        </div>
        <div className="w-md-50 mx-2">
          <Form.Control
            type="time"
            name="scheduleTime"
            data-testid="scheduleTime"
            onChange={onDateTimeChange}
            value={time}
            floatingLabel={(
              <FormattedMessage
                id="bulk.email.form.schedule.time"
                defaultMessage="Send time"
                description="Label for the time portion of the email schedule form"
              />
            )}
          />
          <small className="text-gray-500 x-small">
            <FormattedMessage
              id="bulk.email.form.schedule.time.description"
              defaultMessage="Enter a start time, e.g. 09:00 AM"
            />
          </small>
        </div>
      </div>
      {!isValid && (
        <Form.Control.Feedback className="pb-2" hasIcon type="invalid">
          <FormattedMessage
            id="bulk.email.form.dateTime.error"
            defaultMessage="Date and time cannot be blank, and must be a date in the future"
            description="An error message located under the date-time selector. Visible only on failure."
          />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

ScheduleEmailForm.defaultProps = {
  dateTime: {
    date: '',
    time: '',
  },
};

ScheduleEmailForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  onDateTimeChange: PropTypes.func.isRequired,
  dateTime: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
};

export default ScheduleEmailForm;
