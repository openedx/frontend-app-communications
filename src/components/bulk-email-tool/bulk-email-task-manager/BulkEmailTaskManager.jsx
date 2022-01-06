import React from 'react';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import BulkEmailContentHistory from './BulkEmailContentHistory';
import BulkEmailPendingTasks from './BulkEmailPendingTasks';
import BulkEmailTaskHistory from './BulkEmailTaskHistory';

export default function BulkEmailTaskManager() {
  return (
    <div className="px-5">
      <div>
        <h2 className="h3">
          <FormattedMessage
            id="bulk.email.pending.tasks.section.heading"
            defaultMessage="Pending Tasks"
            description="A section to see pending and executing Instructor Tasks"
          />
        </h2>
        <BulkEmailPendingTasks />
      </div>
      <div>
        <h2 className="h3">
          <FormattedMessage
            id="bulk.email.task.manager.heading"
            defaultMessage="Email Task History"
            description="Title of the Email task History section of the Bulk Course Email tool"
          />
        </h2>
        <BulkEmailContentHistory />
      </div>
      <div>
        <BulkEmailTaskHistory />
      </div>
    </div>
  );
}
