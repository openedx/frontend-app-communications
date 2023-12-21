import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Icon } from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';

export default function BackToInstructor(props) {
  const { courseId } = props;

  return (
    <Button
      variant="tertiary"
      className="mb-4.5 ml-n4.5 text-primary-500"
      href={`${getConfig().LMS_BASE_URL}/courses/${courseId}/instructor#view-course-info`}
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
