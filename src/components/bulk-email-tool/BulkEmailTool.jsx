import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import BulkEmailRecepient from './BulkEmailRecepient';
import BulkEmailBody from './BulkEmailBody';
import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import Navigationtabs from '../navigation-tabs/NavigationTabs';
import { getCourseHomeCourseMetadata } from './api';

export default function BulkEmailTool() {
  const { courseId } = useParams();

  const [courseTabData, setCourseTabData] = useState([]);

  useEffect(() => {
    async function fetchTabData() {
      const data = await getCourseHomeCourseMetadata(courseId);
      const { tabs } = data;
      setCourseTabData([...tabs]);
    }
    fetchTabData();
  }, []);

  return (
    <div>
      <Navigationtabs courseId={courseId} tabData={courseTabData} />
      <div className="border border-primary-200">
        <div className="row">
          <BulkEmailRecepient courseId={courseId} />
        </div>
        <div className="row">
          <BulkEmailBody courseId={courseId} />
        </div>
        <div className="row">
          <BulkEmailTaskManager courseId={courseId} />
        </div>
      </div>
    </div>
  );
}
