import {
  keepPreviousData, useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import { deleteScheduledBulkEmailInstructorTask, getScheduledBulkEmailIntructorTaskData } from './api';
import { scheduledEmailsQueryKeys } from './queryKeys';

export const useScheduledEmails = (courseId, page = 1) => (
  useQuery({
    queryKey: scheduledEmailsQueryKeys.byCourseAndPage(courseId, page),
    queryFn: () => getScheduledBulkEmailIntructorTaskData(courseId, page),
    enabled: !!courseId,
    placeholderData: keepPreviousData,
  })
);

export const useDeleteScheduledEmail = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (schedulingId) => deleteScheduledBulkEmailInstructorTask(courseId, schedulingId),
    onSuccess: () => {
      // The table decides which page to refetch, since the current one may no longer exist.
      queryClient.invalidateQueries({ queryKey: scheduledEmailsQueryKeys.byCourse(courseId), refetchType: 'none' });
    },
  });
};
