import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getEmailTaskHistory } from './api';

export default function BulkEmailTaskHistory() {
  const { courseId } = useParams();

  const [emailTaskHistoryData, setEmailTaskHistoryData] = useState(); // eslint-disable-line no-unused-vars

  useEffect(() => {
    async function fetchEmailTaskHistoryData() {
      const data = await getEmailTaskHistory(courseId);
      const { tasks } = data;
      setEmailTaskHistoryData(tasks);
    }
    fetchEmailTaskHistoryData();
  }, []);

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
