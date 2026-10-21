import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { Spinner } from '@openedx/paragon';

import { useCohorts, useCourseMetadata } from './data/apiHook';

export const CourseMetadataContext = React.createContext();

const defaultCourseMetadata = {
  org: '',
  number: '',
  title: '',
  originalUserIsStaff: false,
  cohorts: [],
};

export default function PageContainer(props) {
  const { children } = props;
  const { courseId } = useParams();

  const { data: metadata, isLoading: isLoadingMetadata } = useCourseMetadata(courseId);
  const { data: cohortsData, isLoading: isLoadingCohorts } = useCohorts(courseId);

  const courseMetadata = useMemo(() => {
    const cohorts = cohortsData?.cohorts?.map(({ name }) => name) ?? [];
    if (!metadata) {
      return { ...defaultCourseMetadata, cohorts };
    }
    const {
      org, number, title, originalUserIsStaff, courseModes,
    } = metadata;
    return {
      org,
      number,
      title,
      originalUserIsStaff,
      courseModes,
      cohorts,
    };
  }, [metadata, cohortsData]);

  if (!isLoadingMetadata && !isLoadingCohorts) {
    return (
      <CourseMetadataContext.Provider value={courseMetadata}>
        <div className="pb-3 container">
          <main id="main-content">
            {children}
          </main>
        </div>
      </CourseMetadataContext.Provider>
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

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
