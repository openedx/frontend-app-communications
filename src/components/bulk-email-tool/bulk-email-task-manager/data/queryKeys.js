import { appId } from '../../../../constants';

export const sentEmailHistoryQueryKeys = {
  all: [appId, 'sentEmailHistory'],
  byCourse: (courseId) => [...sentEmailHistoryQueryKeys.all, courseId],
};

export const emailTaskHistoryQueryKeys = {
  all: [appId, 'emailTaskHistory'],
  byCourse: (courseId) => [...emailTaskHistoryQueryKeys.all, courseId],
};

export const instructorTasksQueryKeys = {
  all: [appId, 'instructorTasks'],
  byCourse: (courseId) => [...instructorTasksQueryKeys.all, courseId],
};
