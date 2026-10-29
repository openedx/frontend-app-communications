import { appId } from '../../../constants';

export const courseMetadataQueryKeys = {
  all: [appId, 'courseMetadata'],
  byCourse: (courseId) => [...courseMetadataQueryKeys.all, courseId],
};

export const cohortsQueryKeys = {
  all: [appId, 'cohorts'],
  byCourse: (courseId) => [...cohortsQueryKeys.all, courseId],
};
