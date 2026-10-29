import { useQuery } from '@tanstack/react-query';
import { getEmailTaskHistory, getInstructorTasks, getSentEmailHistory } from './api';
import { emailTaskHistoryQueryKeys, instructorTasksQueryKeys, sentEmailHistoryQueryKeys } from './queryKeys';

export const useSentEmailHistory = (courseId, { enabled = true } = {}) => (
  useQuery({
    queryKey: sentEmailHistoryQueryKeys.byCourse(courseId),
    queryFn: () => getSentEmailHistory(courseId),
    enabled: !!courseId && enabled,
  })
);

export const useEmailTaskHistory = (courseId, { enabled = true } = {}) => (
  useQuery({
    queryKey: emailTaskHistoryQueryKeys.byCourse(courseId),
    queryFn: () => getEmailTaskHistory(courseId),
    enabled: !!courseId && enabled,
  })
);

export const usePendingInstructorTasks = (courseId) => (
  useQuery({
    queryKey: instructorTasksQueryKeys.byCourse(courseId),
    queryFn: () => getInstructorTasks(courseId),
    enabled: !!courseId,
    refetchInterval: 30000,
  })
);
