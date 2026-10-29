import { useQuery } from '@tanstack/react-query';
import { getCohorts, getCourseHomeCourseMetadata } from './api';
import { cohortsQueryKeys, courseMetadataQueryKeys } from './queryKeys';

export const useCourseMetadata = (courseId) => (
  useQuery({
    queryKey: courseMetadataQueryKeys.byCourse(courseId),
    queryFn: () => getCourseHomeCourseMetadata(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
);

export const useCohorts = (courseId) => (
  useQuery({
    queryKey: cohortsQueryKeys.byCourse(courseId),
    queryFn: () => getCohorts(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
);
