import React from 'react';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

export default function BulkEmailContentHistory() {
  return (
    <div>
      <div>
        <p>
          <FormattedMessage
            id="bulk.email.content.history.section.heading"
            defaultMessage="To see the content of previously sent emails, click this button:"
            description="Instructions for course staff and admins to view historical bulk course email content."
          />
        </p>
        <button type="button" className="btn btn-outline-primary mb-2">
          <FormattedMessage
            id="bulk.email.view.email.content.history.button"
            defaultMessage="Show Sent Email History"
            description="Button that displays a table with historical sent email data for this course-run"
          />
        </button>
      </div>
    </div>
  );
}
