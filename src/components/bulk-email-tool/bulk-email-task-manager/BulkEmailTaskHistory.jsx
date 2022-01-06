import React from 'react';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

export default function BulkEmailTaskHistory() {
  return (
    <div>
      <div>
        <p>
          <FormattedMessage
            id="bulk.email.task.history.section.heading"
            defaultMessage="To see the status for all email tasks submitted for this course, click this button:"
            description="Instructions for course staff and admins to view historical bulk course email task data"
          />
        </p>
        <button type="button" className="btn btn-outline-primary mb-2">
          <FormattedMessage
            id="bulk.email.view.task.history.button"
            defaultMessage="Show Task Email History"
            description="Button that displays a table with historical bulk email task data for a course-run"
          />
        </button>
      </div>
    </div>
  );
}
