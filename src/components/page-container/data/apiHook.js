import { useCommunicationsQuery } from '@src/data/query';
import { getCohorts, getCourseHomeCourseMetadata } from './api';
import { cohortsQueryKeys, courseMetadataQueryKeys } from './queryKeys';

export const useCourseMetadata = (courseId) => (
  useCommunicationsQuery({
    queryKey: courseMetadataQueryKeys.byCourse(courseId),
    queryFn: () => getCourseHomeCourseMetadata(courseId),
    enabled: !!courseId,
    refetchOnMount: false,
  })
);

export const useCohorts = (courseId) => (
  useCommunicationsQuery({
    queryKey: cohortsQueryKeys.byCourse(courseId),
    queryFn: () => getCohorts(courseId),
    enabled: !!courseId,
    refetchOnMount: false,
  })
);
