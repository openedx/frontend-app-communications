import React from 'react';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import BulkEmailContentHistory from './BulkEmailContentHistory';
import BulkEmailTaskHistory from './BulkEmailTaskHistory';
import messages from './messages';
import BulkEmailScheduledEmailsTable from './bulk-email-scheduled-emails-table';
import BulkEmailPendingTasksAlert from './BulkEmailPendingTasksAlert';

const BulkEmailTaskManager = ({ intl }) => (
  <div className="w-100">
    {getConfig().SCHEDULE_EMAIL_SECTION && (
    <div>
      <h2 className="h3 text-primary-500">{intl.formatMessage(messages.scheduledEmailsTableHeader)}</h2>
      <BulkEmailScheduledEmailsTable />
    </div>
    )}
    <div>
      <h2 className="h3 text-primary-500">{intl.formatMessage(messages.emailTaskHistoryHeader)}</h2>
      <BulkEmailContentHistory />
    </div>
    <div>
      <BulkEmailTaskHistory />
    </div>
    <div className="border-top border-primary-500 pt-4.5">
      <h2 className="h3 mb-4 text-primary-500">{intl.formatMessage(messages.pendingTasksHeader)}</h2>
      <BulkEmailPendingTasksAlert />
    </div>
  </div>
);

BulkEmailTaskManager.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BulkEmailTaskManager);
