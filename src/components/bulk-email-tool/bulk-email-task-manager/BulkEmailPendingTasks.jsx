import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getInstructorTasks } from './api';

export default function BulkEmailPendingTasks() {
  const { courseId } = useParams();

  const [instructorTaskData, setInstructorTaskData] = useState(); // eslint-disable-line no-unused-vars

  useEffect(() => {
    async function fetchPendingInstructorTasksData() {
      const data = await getInstructorTasks(courseId);
      const { tasks } = data;
      setInstructorTaskData(tasks);
    }
    fetchPendingInstructorTasksData();
  }, []);

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
