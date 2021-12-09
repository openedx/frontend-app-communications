import React from 'react';

import InstructorToolbar from './InstructorToolbar';
import BulkEmailRecepient from './BulkEmailRecepient';
import BulkEmailBody from './BulkEmailBody';
import BulkEmailTaskManager from './BulkEmailTaskManager';
import { useParams } from 'react-router-dom';

export default function BulkEmailTool() {
  const { courseId } = useParams();

  return (
    <div className="container m-auto">
      <div className="row">
        <InstructorToolbar courseId={courseId} />
      </div>
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
  );
}
