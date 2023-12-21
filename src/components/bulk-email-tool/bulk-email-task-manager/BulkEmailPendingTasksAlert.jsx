import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { Hyperlink, Alert } from '@edx/paragon';
import { WarningFilled } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

export default function BulkEmailPendingTasksAlert(props) {
  const { courseId } = props;

  return (
    <Alert variant="warning" icon={WarningFilled}>
      <FormattedMessage
        id="bulk.email.pending.tasks.description.one"
        defaultMessage="To view all pending tasks, including email, visit&nbsp;"
      />
      <Hyperlink
        destination={`${getConfig().LMS_BASE_URL}/courses/${courseId}/instructor#view-course-info`}
        target="_blank"
        isInline
        showLaunchIcon={false}
      >
        <FormattedMessage
          id="bulk.email.pending.tasks.link"
          defaultMessage="Course Info"
        />
      </Hyperlink>
      <FormattedMessage
        id="bulk.email.pending.tasks.description.two"
        defaultMessage="&nbsp;in the Instructor Dashboard."
      />
    </Alert>

  );
}

BulkEmailPendingTasksAlert.propTypes = {
  courseId: PropTypes.string.isRequired,
};
