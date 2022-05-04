import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Form, Icon } from '@edx/paragon';
import { Event, WatchOutline } from '@edx/paragon/icons';
import useMobileResponsive from '../../../utils/useMobileResponsive';

function ScheduleEmailForm(props) {
  const isMobile = useMobileResponsive();
  const { isValid, onDateTimeChange, dateTime } = props;
  const { scheduleDate, scheduleTime } = dateTime;
  return (
    <Form.Group>
      <div className={classNames('d-flex', isMobile ? 'flex-column' : 'flex-row', 'my-3')}>
        <div className="w-lg-25 mx-2">
          <Form.Label>
            <FormattedMessage
              id="bulk.email.form.schedule.date"
              defaultMessage="Date"
              description="Label for the date portion of the email schedule form"
            />
          </Form.Label>
          <Form.Control
            type="date"
            trailingElement={<Icon src={Event} />}
            name="scheduleDate"
            data-testid="scheduleDate"
            onChange={onDateTimeChange}
            value={scheduleDate}
          />
        </div>
        <div className="w-lg-25 mx-2">
          <Form.Label>
            <FormattedMessage
              id="bulk.email.form.schedule.time"
              defaultMessage="Time"
              description="Label for the time portion of the email schedule form"
            />
          </Form.Label>
          <Form.Control
            type="time"
            trailingElement={<Icon src={WatchOutline} />}
            name="scheduleTime"
            data-testid="scheduleTime"
            onChange={onDateTimeChange}
            value={scheduleTime}
          />
        </div>
      </div>
      {!isValid && (
        <Form.Control.Feedback className="pb-2" hasIcon type="invalid">
          <FormattedMessage
            id="bulk.email.form.dateTime.error"
            defaultMessage="Date and time cannot be blank"
            description="An error message located under the date-time selector. Visible only on failure."
          />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

ScheduleEmailForm.defaultProps = {
  dateTime: {
    scheduleDate: '',
    scheduleTime: '',
  },
};

ScheduleEmailForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  onDateTimeChange: PropTypes.func.isRequired,
  dateTime: PropTypes.shape({
    scheduleDate: PropTypes.string,
    scheduleTime: PropTypes.string,
  }),
};

export default ScheduleEmailForm;
