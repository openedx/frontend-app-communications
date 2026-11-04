import PropTypes from 'prop-types';

import { getAppConfig, useIntl } from '@openedx/frontend-base';
import { appId } from '@src/constants';
import BulkEmailContentHistory from './BulkEmailContentHistory';
import BulkEmailTaskHistory from './BulkEmailTaskHistory';
import messages from './messages';
import BulkEmailScheduledEmailsTable from './bulk-email-scheduled-emails-table/BulkEmailScheduledEmailsTable';
import BulkEmailPendingTasksAlert from './BulkEmailPendingTasksAlert';

function BulkEmailTaskManager({ courseId }) {
  const intl = useIntl();
  return (
    <div className="w-100">
      {getAppConfig(appId)?.scheduleEmailSection && (
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
        <BulkEmailPendingTasksAlert courseId={courseId} />
      </div>
    </div>
  );
}

BulkEmailTaskManager.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default BulkEmailTaskManager;
