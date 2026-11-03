import React from 'react';

import { useParams } from 'react-router-dom';

import { ErrorPage, FormattedMessage } from '@openedx/frontend-base';
import { Container } from '@openedx/paragon';
import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import BulkEmailForm from './bulk-email-form/BulkEmailForm';
import BulkEmailProvider from './bulk-email-context/BulkEmailProvider';
import { CourseMetadataContext } from '../page-container/PageContainer';
import BackToInstructor from '../navigation-tabs/BackToInstructor';

export default function BulkEmailTool() {
  const { courseId } = useParams();

  return (
    <CourseMetadataContext.Consumer>
      {(courseMetadata) => (courseMetadata.originalUserIsStaff ? (
        <BulkEmailProvider>
          <Container size="md" className="pt-4">
            <BackToInstructor courseId={courseId} />
            <div className="row pb-4.5">
              <h1 className="text-primary-500">
                <FormattedMessage
                  id="bulk.email.send.email.header"
                  defaultMessage="Send an email"
                  description="A label for email form"
                />
              </h1>
            </div>
            <div className="row">
              <BulkEmailForm
                courseId={courseId}
                cohorts={courseMetadata.cohorts}
                courseModes={courseMetadata.courseModes}
              />
            </div>
            <div className="row py-5">
              <BulkEmailTaskManager courseId={courseId} />
            </div>
          </Container>
        </BulkEmailProvider>
      ) : (
        <ErrorPage />
      ))}
    </CourseMetadataContext.Consumer>
  );
}
