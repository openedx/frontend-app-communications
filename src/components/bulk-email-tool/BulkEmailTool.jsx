import React, { useRef } from 'react';

import { useParams } from 'react-router-dom';

import { ErrorPage } from '@edx/frontend-platform/react';
import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import NavigationTabs from '../navigation-tabs/NavigationTabs';
import BulkEmailForm from './bulk-email-form';
import { CourseMetadataContext } from '../page-container/PageContainer';

export default function BulkEmailTool() {
  const { courseId } = useParams();
  const textEditorRef = useRef();
  const copyTextToEditor = (body) => {
    if (textEditorRef?.current) {
      textEditorRef.current.setContent(body);
    }
  };

  return (
    <CourseMetadataContext.Consumer>
      {(courseMetadata) => (courseMetadata.isStaff ? (
        <div>
          <NavigationTabs courseId={courseId} tabData={courseMetadata.tabs} />
          <div>
            <div className="row">
              <BulkEmailForm courseId={courseId} cohorts={courseMetadata.cohorts} editorRef={textEditorRef} />
            </div>
            <div className="row py-5">
              <BulkEmailTaskManager courseId={courseId} copyTextToEditor={copyTextToEditor} />
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage />
      ))}
    </CourseMetadataContext.Consumer>
  );
}
