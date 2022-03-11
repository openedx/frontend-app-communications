import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { LearningHeader as Header } from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import { Spinner } from '@edx/paragon';

import { getCohorts, getCourseHomeCourseMetadata } from './data/api';

export const CourseMetadataContext = React.createContext();

export default function PageContainer(props) {
  const { children } = props;
  const { courseId } = useParams();

  const [courseMetadata, setCourseMetadata] = useState();

  useEffect(() => {
    async function fetchCourseMetadata() {
      let metadataResponse;
      let cohortsResponse;

      try {
        metadataResponse = await getCourseHomeCourseMetadata(courseId);
        cohortsResponse = await getCohorts(courseId);
      } catch (e) {
        setCourseMetadata({
          org: '',
          number: '',
          title: '',
          isStaff: false,
          tabs: [],
          cohorts: [],
        });
        return;
      }

      const {
        org, number, title, tabs, is_staff: isStaff,
      } = metadataResponse;
      const { cohorts } = cohortsResponse;

      setCourseMetadata({
        org,
        number,
        title,
        isStaff,
        tabs: [...tabs],
        cohorts: cohorts.map(({ name }) => name),
      });
    }
    fetchCourseMetadata();
  }, []);

  if (courseMetadata) {
    return (
      <CourseMetadataContext.Provider value={courseMetadata}>
        <>
          <Header
            courseOrg={courseMetadata.org}
            courseNumber={courseMetadata.number}
            courseTitle={courseMetadata.title}
          />
          {children}
          <Footer />
        </>
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