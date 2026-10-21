import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, getSiteConfig } from '@openedx/frontend-base';
import { Button, Icon } from '@openedx/paragon';
import { ArrowBack } from '@openedx/paragon/icons';

export default function BackToInstructor(props) {
  const { courseId } = props;

  return (
    <Button
      variant="tertiary"
      className="mb-4.5 ml-n4.5 text-primary-500"
      href={`${getSiteConfig().lmsBaseUrl}/courses/${courseId}/instructor#view-course-info`}
    >
      <Icon
        src={ArrowBack}
        className="mr-2"
      />
      <FormattedMessage
        id="bulk.email.back.to.instructorDashboard"
        defaultMessage="Back to Instructor Dashboard"
        description="A link to take the user back to the instructor dashboard"
      />
    </Button>
  );
}

BackToInstructor.propTypes = {
  courseId: PropTypes.string.isRequired,
};
