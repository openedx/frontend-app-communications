import React from 'react';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

export default function BulkEmailPendingTasks() {
  return (
    <div>
      <p>
        <FormattedMessage
          id="bulk.email.pending.tasks.section.info"
          defaultMessage="Email actions run in the background. The status for any active tasks - including email tasks - appears in the table below"
          description="A section to see pending and executing Instructor Tasks"
        />
      </p>
    </div>
  );
}
