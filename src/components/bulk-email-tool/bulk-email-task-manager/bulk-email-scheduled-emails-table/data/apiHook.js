import { keepPreviousData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCommunicationsQuery } from '@src/data/query';
import { deleteScheduledBulkEmailInstructorTask, getScheduledBulkEmailIntructorTaskData } from './api';
import { scheduledEmailsQueryKeys } from './queryKeys';

export const useScheduledEmails = (courseId, page = 1) => (
  useCommunicationsQuery({
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
      queryClient.invalidateQueries({ queryKey: scheduledEmailsQueryKeys.byCourse(courseId) });
    },
  });
};
