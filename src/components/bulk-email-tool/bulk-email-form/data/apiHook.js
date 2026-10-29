import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchScheduledBulkEmailInstructorTask, postBulkEmailInstructorTask } from './api';
import { scheduledEmailsQueryKeys } from '../../bulk-email-task-manager/bulk-email-scheduled-emails-table/data/queryKeys';
import { instructorTasksQueryKeys } from '../../bulk-email-task-manager/data/queryKeys';

export const usePostBulkEmail = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emailData) => postBulkEmailInstructorTask(emailData, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduledEmailsQueryKeys.byCourse(courseId) });
    },
  });
};

export const useEditScheduledEmail = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ emailData, schedulingId }) => (
      patchScheduledBulkEmailInstructorTask(emailData, courseId, schedulingId)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduledEmailsQueryKeys.byCourse(courseId) });
      queryClient.invalidateQueries({ queryKey: instructorTasksQueryKeys.byCourse(courseId) });
    },
  });
};
