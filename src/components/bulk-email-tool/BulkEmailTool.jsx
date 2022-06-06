import React from 'react';

import { useParams } from 'react-router-dom';

import { ErrorPage } from '@edx/frontend-platform/react';
import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import NavigationTabs from '../navigation-tabs/NavigationTabs';
import BulkEmailForm from './bulk-email-form';
import { CourseMetadataContext } from '../page-container/PageContainer';
import { BulkEmailProvider } from './bulk-email-context';

export default function BulkEmailTool() {
  const { courseId } = useParams();

  return (
    <CourseMetadataContext.Consumer>
      {(courseMetadata) => (courseMetadata.originalUserIsStaff ? (
        <div>
          <NavigationTabs courseId={courseId} tabData={courseMetadata.tabs} />
          <BulkEmailProvider>
            <div>
              <div className="row">
                <BulkEmailForm courseId={courseId} cohorts={courseMetadata.cohorts} />
              </div>
              <div className="row py-5">
                <BulkEmailTaskManager courseId={courseId} />
              </div>
            </div>
          </BulkEmailProvider>
        </div>
      ) : (
        <ErrorPage />
      ))}
    </CourseMetadataContext.Consumer>
  );
}
