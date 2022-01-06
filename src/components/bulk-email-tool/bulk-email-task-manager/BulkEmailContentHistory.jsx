import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getSentEmailHistory } from './api';

export default function BulkEmailContentHistory() {
  const { courseId } = useParams();

  const [emailHistoryData, setEmailHistoryData] = useState(); // eslint-disable-line no-unused-vars

  useEffect(() => {
    async function fetchSentEmailHistoryData() {
      const data = await getSentEmailHistory(courseId);
      const { emails } = data;
      setEmailHistoryData(emails);
    }
    fetchSentEmailHistoryData();
  }, []);

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
