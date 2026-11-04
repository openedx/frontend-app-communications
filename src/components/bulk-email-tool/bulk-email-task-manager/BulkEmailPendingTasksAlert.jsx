import PropTypes from 'prop-types';

import { FormattedMessage, getSiteConfig } from '@openedx/frontend-base';
import { Hyperlink, Alert } from '@openedx/paragon';
import { WarningFilled } from '@openedx/paragon/icons';

export default function BulkEmailPendingTasksAlert(props) {
  const { courseId } = props;

  return (
    <Alert variant="warning" icon={WarningFilled}>
      <FormattedMessage
        id="bulk.email.pending.tasks.description.one"
        defaultMessage="To view all pending tasks, including email, visit&nbsp;"
      />
      <Hyperlink
        destination={`${getSiteConfig().lmsBaseUrl}/courses/${courseId}/instructor#view-course-info`}
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
