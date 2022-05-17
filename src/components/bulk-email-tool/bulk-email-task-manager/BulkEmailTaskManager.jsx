import React from 'react';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import BulkEmailContentHistory from './BulkEmailContentHistory';
import BulkEmailPendingTasks from './BulkEmailPendingTasks';
import BulkEmailTaskHistory from './BulkEmailTaskHistory';
import messages from './messages';
import BulkEmailScheduledEmailsTable from './bulk-email-scheduled-emails-table';

function BulkEmailTaskManager({ intl }) {
  return (
    <div>
      {getConfig().SCHEDULE_EMAIL_SECTION && (
        <div>
          <h2 className="h3">{intl.formatMessage(messages.scheduledEmailsTableHeader)}</h2>
          <BulkEmailScheduledEmailsTable />
        </div>
      )}
      <div>
        <h2 className="h3">{intl.formatMessage(messages.pendingTasksHeader)}</h2>
        <BulkEmailPendingTasks />
      </div>
      <div>
        <h2 className="h3">{intl.formatMessage(messages.emailTaskHistoryHeader)}</h2>
        <BulkEmailContentHistory />
      </div>
      <div>
        <BulkEmailTaskHistory />
      </div>
    </div>
  );
}

BulkEmailTaskManager.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailTaskManager);
