import { appId } from '../../../../../constants';

export const scheduledEmailsQueryKeys = {
  all: [appId, 'scheduledEmails'],
  byCourse: (courseId) => [...scheduledEmailsQueryKeys.all, courseId],
  byCourseAndPage: (courseId, page) => [...scheduledEmailsQueryKeys.byCourse(courseId), page],
};
