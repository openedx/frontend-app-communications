import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { useParams } from 'react-router-dom';
import { Spinner } from '@edx/paragon';
import { ErrorPage } from '@edx/frontend-platform/react';
import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import Navigationtabs from '../navigation-tabs/NavigationTabs';
import { getCohorts, getCourseHomeCourseMetadata } from './data/api';
import useMobileResponsive from '../../utils/useMobileResponsive';
import BulkEmailForm from './bulk-email-form';

export default function BulkEmailTool() {
  const { courseId } = useParams();

  const [courseMetadata, setCourseMetadata] = useState();
  const isMobile = useMobileResponsive();

  useEffect(() => {
    async function fetchTabData() {
      let metadataResponse;
      let cohortsResponse;
      try {
        metadataResponse = await getCourseHomeCourseMetadata(courseId);
        cohortsResponse = await getCohorts(courseId);
      } catch (e) {
        setCourseMetadata({
          isStaff: false,
          tabs: [],
          cohorts: [],
        });
        return;
      }
      const { tabs, is_staff: isStaff } = metadataResponse;
      const { cohorts } = cohortsResponse;
      setCourseMetadata({
        isStaff,
        tabs: [...tabs],
        cohorts: cohorts.map(({ name }) => name),
      });
    }
    fetchTabData();
  }, []);

  if (courseMetadata) {
    return courseMetadata.isStaff ? (
      <div>
        <Navigationtabs courseId={courseId} tabData={courseMetadata.tabs} />
        <div className={classnames({ 'border border-primary-200': !isMobile })}>
          <div className="row">
            <BulkEmailForm courseId={courseId} cohorts={courseMetadata.cohorts} />
          </div>
          <div className="row">
            <BulkEmailTaskManager courseId={courseId} />
          </div>
        </div>
      </div>
    ) : (
      <ErrorPage />
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="primary"
        role="status"
        screenreadertext="loading"
        className="spinner-border spinner-border-lg text-primary p-5 m-5"
      />
    </div>
  );
}
