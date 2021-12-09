import React from 'react';
import { Container } from '@edx/paragon';
import InstructorToolbar from './InstructorToolbar';
import BulkEmailRecepient from './BulkEmailRecepient';
import BulkEmailBody from './BulkEmailBody';
import BulkEmailTaskManager from './BulkEmailTaskManager';

export default function BulkEmailTool() {
  return (
    <div>
      <Container>
        <div className="row">
          <InstructorToolbar />
        </div>
        <div className="row">
          <BulkEmailRecepient />
        </div>
        <div className="row">
          <BulkEmailBody />
        </div>
        <div className="row">
          <BulkEmailTaskManager />
        </div>
      </Container>
    </div>
  );
}
