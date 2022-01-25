import React from 'react';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import BulkEmailContentHistory from './BulkEmailContentHistory';
import BulkEmailPendingTasks from './BulkEmailPendingTasks';
import BulkEmailTaskHistory from './BulkEmailTaskHistory';
import messages from './messages';

export function BulkEmailTaskManager({ intl }) {
  return (
    <div className="px-5">
      <div>
        <h2 className="h3">
          {intl.formatMessage(messages.pendingTasksHeader)}
        </h2>
        <BulkEmailPendingTasks />
      </div>
      <div>
        <h2 className="h3">
          {intl.formatMessage(messages.emailTaskHistoryHeader)}
        </h2>
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
